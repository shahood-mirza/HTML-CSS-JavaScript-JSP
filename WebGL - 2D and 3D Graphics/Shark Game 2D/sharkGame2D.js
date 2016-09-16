/*
 * GAME: SHARKSHOOTER 2D
 */

var canvas;
var gl;

var turn = 0.0;
var turnDir = false;

var atheta = 0.0;
var theta = 0.0;
var thetaLoc;

var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;
var first = true;

var vBuffer, vPosition, vColor, cBuffer;
var t, t1, t2, t3, t4;

// colors (R,G,B,A) | A=transparency
var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 0.6 ),  // gray
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 0.0, 0.64,0.91,1.0 )   // background blue
];

var usrDir = 1;
var sharkDir = 0;

var sharkDir1 = false;
var sharkDir2 = false;
var sharkDir3 = false;
var sharkDir4 = false;

var sharkShot = true;
var sharkCount = 0;

var sharksOut = 0;
var sharksAtOnce = 1;

var globalCount = 15;
var count1 = globalCount;
var count2 = globalCount;
var count3 = globalCount;
var count4 = globalCount;
var counter = setInterval(timer, 1000);    // 1000 will run it every 1 second

var delay = 1;
var warningSound = new Audio('Sonic_Drowning.mp3');

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.64, 0.91,1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    thetaLoc = gl.getUniformLocation( program, "theta" );
    
    // initial instructional popup displayed to player
    window.alert("-----SHARKSHOOTER 2D-----\n\n " +
                 "Objective: Kill 45 Sharks to Win!!\n\n" +
                 "How To Play: \n" +
                 "1. Arrow Keys to Rotate User \n" +
                 "2. Spacebar to Kill Sharks \n\n" +
                 "Press OK to Begin!"
                );
    
    ///////////////////////////////////////////////////////////////////////

    // Vertices Buffer Setup
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Color Buffer Setup    
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    
    ///////////////////////////////////////////////////////////////////////
    
    // WALLS
    makeShape(-0.6 , 0.6,
              -0.55,-0.6,
              -0.6 ,-0.6,
              -0.55, 0.6,
                 5);             // bottom (index: 4-11)
    makeShape(  0.6,-0.6,
               0.55, 0.6,
               0.6 , 0.6,
               0.55,-0.6,
                 5);             // top (index: 12-19)
    makeShape( -0.6, 0.6,
                0.6,0.55,
               -0.6,0.55,
                0.6, 0.6,
                 5);             // right (index: 20-27)
    makeShape(  0.6, -0.6,
               -0.6,-0.55,
                0.6,-0.55,
               -0.6, -0.6,
                 5);             // left (index: 28-35)
    
    // SHARKS
    makeShape( -0.8, 0.05,
               -0.7,-0.05,
               -0.8,-0.05,
               -0.7, 0.05,
                 8);             // bottom (index: 36-43)
    makeShape( -0.7, 0.05,
              -0.65,  0.0,
               -0.7,-0.05,
              -0.65,  0.0,
                 8);            // bottom head (index: 44-51)
    makeShape(-0.85, 0.04,
              -0.73,  0.0,
              -0.85,-0.04,
              -0.73,  0.0,
                 8);            // bottom tail (index: 52-59)
    
    makeShape(  0.8,-0.05,
                0.7, 0.05,
                0.8, 0.05,
                0.7,-0.05,
                 8);            // top (index 60-67)
    makeShape(  0.7,-0.05,
               0.65,  0.0,
                0.7, 0.05,
               0.65,  0.0,
                 8);            // top head (index 68-75)
    makeShape( 0.85,-0.04,
               0.73,  0.0,
               0.85, 0.04,
               0.73,  0.0,
                 8);            // top tail (index: 76-83)
 
    makeShape(-0.05,  0.7,
               0.05,  0.8,
              -0.05,  0.8,
               0.05,  0.7,
                 8);            // right (index: 84-91)
    makeShape(  0.0, 0.65,
              -0.05,  0.7,
                0.0, 0.65,
               0.05,  0.7,
                 8);            // right head (index: 92-99)
    makeShape(  0.0, 0.73,
              -0.05, 0.85,
                0.0, 0.73,
               0.05, 0.85,
                 8);            // right tail (index: 100-107)
    
    makeShape( 0.05, -0.7,
              -0.05, -0.8,
               0.05, -0.8,
              -0.05, -0.7,
                 8);            // left (index: 108-115)
    makeShape(  0.0,-0.65,
               0.05, -0.7,
                0.0,-0.65,
              -0.05, -0.7,
                 8);            // left head (index: 116-123)
    makeShape(  0.0, -0.73,
                 0.05, -0.85,
                  0.0, -0.73,
                -0.05, -0.85,
                 8);            // left tail (index: 124-131)
    
    // LASERS
    makeShape( 0.005,-0.1,
              -0.005,-0.65,
               0.005,-0.65,
              -0.005,-0.2,
                  8);           // left (index: 132-139)
    makeShape(-0.005, 0.1,
               0.005, 0.65,
              -0.005, 0.65,
               0.005, 0.2,
                  8);           // right (index: 140-147)
    makeShape( 0.65,-0.005,
               0.1, 0.005,
               0.65, 0.005,
               0.2,-0.005,
                8);             // top (index: 148-155)
    makeShape(-0.65, 0.005,
              -0.1,-0.005,
              -0.65,-0.005,
              -0.2, 0.005,
                8);             // bottom (index: 156-163)
    
    // USER (triangle)
    makeShape( 0.0,   0.1,
               0.0,  0.05,
             -0.05,   0.0,
              0.05,   0.0,
                2);                // centered at origin (index: 164-166)
        
    ///////////////////////////////////////////////////////////////////////
    
    // Cases for key presses
    window.onkeydown = function(event)
    {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          // right arrow key
          case '\'':
            atheta = 0.00;
            usrDir = 1;
            break;
          // up arrow key
          case '&':
            atheta = Math.PI*0.5;
            usrDir = 2;
            break;
          // left arrow key
          case '%':
            atheta = Math.PI;
            usrDir = 3;
            break;
          // down arrow key
          case '(':
            atheta = Math.PI*1.5;
            usrDir = 4;
            break;
          // Space key to fire laser at shark
          case ' ':
              // fire in direction user is facing
              if (usrDir == 1)
              {
                  // right laser starts at index 140 to 147
                  if(sharkDir1)
                  {
                      sharkDir1 = false;
                      sharksOut--;
                  }
                  colorChange(140,166,4);    // laser = green
                  setTimeout(function() { colorChange(140,166,8); }, 150); //.15s delay then blue
              }
              else if (usrDir == 2)
              {
                  // top laser starts at index 148 to 155
                  if(sharkDir2)
                  {
                      sharkDir2 = false;
                      sharksOut--;
                  }
                  colorChange(148,166,4);
                  setTimeout(function() { colorChange(148,166,8); }, 150);
              }
              else if (usrDir == 3)
              {
                  // left laser starts at index 132 to 139
                  if(sharkDir3)
                  {
                      sharkDir3 = false;
                      sharksOut--;
                  }
                  colorChange(132,166,4);
                  setTimeout(function() { colorChange(132,166,8); }, 150);
              }
              else if (usrDir == 4)
              {
                  // bottom laser starts at index 156 to 163
                  if(sharkDir4)
                  {
                      sharkDir4 = false;
                      sharksOut--;
                  }
                  colorChange(156,166,4);
                  setTimeout(function() { colorChange(156,166,8); }, 150);
              }
            break;  
        }
    };
    
    render();
}

function render()
{    
    //document.getElementById("atheta").innerHTML = atheta;
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    if(theta != atheta && atheta == 0.00)
    {
        // if moving from down to right, we have to reset theta (circle)
        if(theta >= Math.PI*1.5)
            if (theta >= Math.PI*2)
                theta = 0.0;
            else
                theta += (Math.PI*0.1);
        else if (theta < atheta)
            theta += (Math.PI*0.1);
        else
            theta -= (Math.PI*0.1);
    }
    // moving to face left
    else if(theta != atheta && atheta == Math.PI)
    {
        if (theta < atheta)
            theta += (Math.PI*0.1);
        else
            theta -= (Math.PI*0.1);
    }
    // moving to face up
    else if(theta != atheta && atheta == Math.PI*0.5)
    {
        if (theta < atheta)
            theta += (Math.PI*0.1);
        else
            theta -= (Math.PI*0.1);
    }
    // moving to face down
    else if(theta != atheta && atheta == Math.PI*1.5)
    {
        //turn in correct direction when facing right but moving to face down
        if(theta == 0.0)
            theta = (Math.PI*2);
        else if (theta < atheta)
            theta += (Math.PI*0.1);
        else
            theta -= (Math.PI*0.1);
    }
    
    //document.getElementById("theta").innerHTML = theta;
    
    // loop to draw shapes on canvas as well as allow user movement
    for(var i = 0; i<index; i+=4)
    {
    	//make sure only the triangle rotates
        if (i > 162)
            gl.uniform1f(thetaLoc, theta);
        //allow sharks to display a motion
        else if ((i > 35 && i < 53) || (i > 107 && i < 125) || (i > 59 && i < 77) || (i > 83 && i < 101))
        {
        	if(turnDir)
        		gl.uniform1f(thetaLoc, turn=turn+0.001);
        	else
        		gl.uniform1f(thetaLoc, turn=turn-0.001);
        	if(turn >= 0.1)
        		turnDir = false;
        	else if (turn <= -0.1)
        		turnDir = true;
        }
        else
            gl.uniform1f(thetaLoc, 0);
        
        gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
    }
    
    SharkAttack();
    endGame();

    setTimeout( function (){requestAnimFrame(render);}, delay );
}

// takes a start/end index and new color for shape to apply
function colorChange(startIndex, endIndex, colorNum)
{
    index=startIndex;
    t = vec4(colors[colorNum]);
    colorBuffer(t);
    index=endIndex;
}

// creating shapes taking FOUR (x,y) values and a color index
function makeShape(x1,y1,x2,y2,x3,y3,x4,y4,color)
{
    // binding buffers and setting up vertex coordinates
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
    t1 = [vec2(x1,y1)]
    index += 4;
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    t2 = [vec2(x2,y2)];
    t3 = [vec2(x3,y3)];
    t4 = [vec2(x4,y4)];
    
    // vertex buffer applied
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t1));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+1), flatten(t3));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+2), flatten(t2));
    
    //  minor index variation for user triangle
    if(x4==0.1 && y4==0.0)
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+2), flatten(t4));
    else
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+3), flatten(t4));
    
    // color buffer applied
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    t = vec4(colors[color]);
    colorBuffer(t);
    index += 4;
}

// Color buffer application
function colorBuffer(t)
{
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index), flatten(t));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+1), flatten(t));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+2), flatten(t));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+3), flatten(t));
}

// function responsible for generation of sharks and corresponding logic
function SharkAttack()
{
    //document.getElementById("sharkDir").innerHTML = sharksOut;
    //document.getElementById("usrDir").innerHTML = sharkCount;
    
    if(sharksOut != sharksAtOnce)
    {
        setTimeout( function()
        {
            while(true)
            {
                sharkDir = Math.floor(Math.random() * 4) + 1;
                if (sharkDir == 1 && !sharkDir1)
                {
                    sharkDir1 = true;
                    break;
                }
                else if (sharkDir == 2 && !sharkDir2)
                {
                    sharkDir2 = true;
                    break;
                }
                else if (sharkDir == 3 && !sharkDir3)
                {
                    sharkDir3 = true;
                    break;
                }
                else if (sharkDir == 4 && !sharkDir4)
                {
                    sharkDir4 = true;
                    break;
                }
            }
        }, 1000 );
        sharksOut++;
        sharkCount++;
    }
    
    // code to make sharks appear/disappear as required
    if(sharkDir1)    // right shark
    {
        colorChange(84,166,1);
        colorChange(92,166,1);
        colorChange(100,166,1);
        
    }
    else if (!sharkDir1)
    {
        colorChange(84,166,8);
        colorChange(92,166,8);
        colorChange(100,166,8);
    }
    
    if(sharkDir2)    // top shark
    {
        colorChange(60,166,1);
        colorChange(68,166,1);
        colorChange(76,166,1);
    }
    else if (!sharkDir2)
    {
        colorChange(60,166,8);
        colorChange(68,166,8);
        colorChange(76,166,8);
    }
    
    if(sharkDir3)    // left shark
    {
        colorChange(108,166,1);
        colorChange(116,166,1);
        colorChange(124,166,1);
    }
    else if (!sharkDir3)
    {
        colorChange(108,166,8);
        colorChange(116,166,8);
        colorChange(124,166,8);
    }
    
    if(sharkDir4)    // bottom shark
    {
        colorChange(36,166,1);
        colorChange(44,166,1);
        colorChange(52,166,1);
    }
    else if (!sharkDir4)
    {
        colorChange(36,166,8);
        colorChange(44,166,8);
        colorChange(52,166,8);
    }
}

// function responsible for maintaining game timer
function timer()
{
    if (sharkDir1)
    {
        count1--;    // each wall/boundary has independent timer
        
        // calculates an alpha value and re-applies new color to wall (transparency effect)
        var alpha = (1/globalCount)*count1;
        colors[5] = vec4( 0.0, 0.0, 1.0, alpha );
        colorChange(20,102,5);
        
        // checks count to ensure whether game over or more sharks can be generated
        if (count1 == 0)
            clearInterval(counter);
        else if (((count1 % (globalCount / 5)) == 0) && sharksAtOnce !=4)
            sharksAtOnce++;
    }
    if (sharkDir2)
    {
        count2--;
        
        var alpha = (1/globalCount)*count2;
        colors[5] = vec4( 0.0, 0.0, 1.0, alpha );
        colorChange(12,102,5);
        
        if (count2 == 0)
            clearInterval(counter);
        else if (((count2 % (globalCount / 5)) == 0) && sharksAtOnce !=4)
            sharksAtOnce++;
    }
    if (sharkDir3)
    {
        count3--;
        
        var alpha = (1/globalCount)*count3;
        colors[5] = vec4( 0.0, 0.0, 1.0, alpha );
        colorChange(28,102,5);
        
        if (count3 == 0)
            clearInterval(counter);
        else if (((count3 % (globalCount / 5)) == 0) && sharksAtOnce !=4)
            sharksAtOnce++;
    }
    if (sharkDir4)
    {
        count4--;
        
        var alpha = (1/globalCount)*count4;
        colors[5] = vec4( 0.0, 0.0, 1.0, alpha );
        colorChange(4,102,5);
        
        if (count4 == 0)
            clearInterval(counter);
        else if (((count4 % (globalCount / 5)) == 0) && sharksAtOnce !=4)
            sharksAtOnce++;
    }
    
    if ((count1 + count2 + count3 + count4) <= 30)
        warningSound.play();
}

// function to alert user and wrap-up game play
function endGame()
{
	//update score if game is over
	document.getElementById("score").innerHTML = count1+count2+count3+count4;
    document.getElementById("sharksKilled").innerHTML = sharkCount-sharksAtOnce;
    
    //the difficulty pre-increases the shark count, need total-1 to get the right win result
    if(count1 == 0 || count2 == 0 || count3 == 0 || count4 == 0 || sharkCount > (45+sharksAtOnce-1) )
    {
        // End of game popups to indicate results
        var score = count1 + count2 + count3 + count4;

        if (sharkCount > (45+sharksAtOnce-1))
        {
        	warningSound.pause(); //stop warning music
            window.alert("YOU WIN!");
        }   
        else
        {
        	warningSound.currentTime = 12.26; //forward to the losing sound
            window.alert("YOU LOSE!");
        }
        window.alert("-----GAME OVER-----\n\n" +
            "--Your Score is: " + score + "--\n Sharks Killed: " + (sharkCount-sharksAtOnce) + "\n\n"
            + "Press OK to Try Again!");
        location.reload();
    }
}