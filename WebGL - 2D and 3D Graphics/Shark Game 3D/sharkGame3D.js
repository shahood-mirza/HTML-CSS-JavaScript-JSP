/*
 * GAME: SHARKSHOOTER 3D
 */
var canvas;
var gl;

var program;

/////////////////////////////////////////////////////////
var turn = 0.0;
var turnDir = false;

var atheta = 0.0;
var theta = 0.0;
var thetaLoc;
var faceUp = false;
var faceDown = false;
var faceFwd = false;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;
var first = true;

var vBuffer, vPosition, vColor, cBuffer;
var t, t1, t2, t3, t4;

var usrDir = 1;
var sharkDir = 0;

var sharkDir1 = false;
var sharkDir2 = false;
var sharkDir3 = false;
var sharkDir4 = false;
var sharkDir5 = false;
var sharkDir6 = false;

var sharkShot = true;
var sharkCount = 0;

var sharksOut = 0;
var sharksAtOnce = 1;

var globalCount = 15;
var count1 = globalCount;
var count2 = globalCount;
var count3 = globalCount;
var count4 = globalCount;
var count5 = globalCount;
var count6 = globalCount;
var counter = setInterval(timer, 1000); // 1000 will run it every 1 second

var delay = 1;
var warningSound = new Audio('Sonic_Drowning.mp3');

/////////////////////////////////////////////////////////

var NumVertices = 252; // (36+144+72) for cube + 6 sharks&3features + 12 lasers)

var pointsArray = [];
var colorsArray = [];

var vertices = [
    // square in front using two triangles (index 0-3)
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    // square in back using two triangles (index 4-7)
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    // front shark (index 8-23)
    vec4(-0.15, -0.15, 0.49, 1.0),
    vec4(-0.15, 0.15, 0.49, 1.0),
    vec4(0.15, 0.15, 0.49, 1.0),
    vec4(0.15, -0.15, 0.49, 1.0),
    // front shark fin1
    vec4(-0.15, -0.1, 0.49, 1.0),
    vec4(-0.15, 0.0, 0.49, 1.0),
    vec4(-0.25, 0.05, 0.49, 1.0),
    vec4(-0.25, 0.05, 0.49, 1.0),
    // front shark fin2
    vec4(0.15, -0.1, 0.49, 1.0),
    vec4(0.15, 0.0, 0.49, 1.0),
    vec4(0.25, 0.05, 0.49, 1.0),
    vec4(0.25, 0.05, 0.49, 1.0),
    //front shark fin3
    vec4(-0.05, 0.15, 0.49, 1.0),
    vec4(0.0, 0.35, 0.49, 1.0),
    vec4(0.0, 0.35, 0.49, 1.0),
    vec4(0.05, 0.15, 0.49, 1.0),
    /////////////////////////////////////////////////////////
    // back shark (index 24-39)
    vec4(-0.15, -0.15, -0.49, 1.0),
    vec4(-0.15, 0.15, -0.49, 1.0),
    vec4(0.15, 0.15, -0.49, 1.0),
    vec4(0.15, -0.15, -0.49, 1.0),
    // back shark fin1
    vec4(-0.15, -0.1, -0.49, 1.0),
    vec4(-0.15, 0.0, -0.49, 1.0),
    vec4(-0.25, 0.05, -0.49, 1.0),
    vec4(-0.25, 0.05, -0.49, 1.0),
    // back shark fin2
    vec4(0.15, -0.1, -0.49, 1.0),
    vec4(0.15, 0.0, -0.49, 1.0),
    vec4(0.25, 0.05, -0.49, 1.0),
    vec4(0.25, 0.05, -0.49, 1.0),
    // back shark fin3
    vec4(-0.05, 0.15, -0.49, 1.0),
    vec4(0.0, 0.35, -0.49, 1.0),
    vec4(0.0, 0.35, -0.49, 1.0),
    vec4(0.05, 0.15, -0.49, 1.0),
    /////////////////////////////////////////////////////////
    // right shark (index 40-55)
    vec4(0.49, 0.15, 0.15, 1.0),
    vec4(0.49, -0.15, 0.15, 1.0),
    vec4(0.49, -0.15, -0.15, 1.0),
    vec4(0.49, 0.15, -0.15, 1.0),
    // right shark fin1
    vec4(0.49, -0.1, -0.15, 1.0),
    vec4(0.49, 0.0, -0.15, 1.0),
    vec4(0.49, 0.05, -0.25, 1.0),
    vec4(0.49, 0.05, -0.25, 1.0),
    // right shark fin2
    vec4(0.49, -0.1, 0.15, 1.0),
    vec4(0.49, 0.0, 0.15, 1.0),
    vec4(0.49, 0.05, 0.25, 1.0),
    vec4(0.49, 0.05, 0.25, 1.0),
    // right shark fin3
    vec4(0.49, 0.15, -0.05, 1.0),
    vec4(0.49, 0.35, 0.0, 1.0),
    vec4(0.49, 0.35, 0.0, 1.0),
    vec4(0.49, 0.15, 0.05, 1.0),
    /////////////////////////////////////////////////////////
    // left shark (index 56-71)
    vec4(-0.49, 0.15, 0.15, 1.0),
    vec4(-0.49, -0.15, 0.15, 1.0),
    vec4(-0.49, -0.15, -0.15, 1.0),
    vec4(-0.49, 0.15, -0.15, 1.0),
    // left shark fin1
    vec4(-0.49, -0.1, -0.15, 1.0),
    vec4(-0.49, 0.0, -0.15, 1.0),
    vec4(-0.49, 0.05, -0.25, 1.0),
    vec4(-0.49, 0.05, -0.25, 1.0),
    // left shark fin2
    vec4(-0.49, -0.1, 0.15, 1.0),
    vec4(-0.49, 0.0, 0.15, 1.0),
    vec4(-0.49, 0.05, 0.25, 1.0),
    vec4(-0.49, 0.05, 0.25, 1.0),
    // left shark fin3
    vec4(-0.49, 0.15, -0.05, 1.0),
    vec4(-0.49, 0.35, 0.0, 1.0),
    vec4(-0.49, 0.35, 0.0, 1.0),
    vec4(-0.49, 0.15, 0.05, 1.0),
    /////////////////////////////////////////////////////////
    // top shark (index 72-87)
    vec4(0.15, 0.49, 0.15, 1.0),
    vec4(-0.15, 0.49, 0.15, 1.0),
    vec4(-0.15, 0.49, -0.15, 1.0),
    vec4(0.15, 0.49, -0.15, 1.0),
    // top shark fin1
    vec4(-0.15, 0.49, -0.1, 1.0),
    vec4(-0.15, 0.49, 0.0, 1.0),
    vec4(-0.25, 0.49, 0.05, 1.0),
    vec4(-0.25, 0.49, 0.05, 1.0),
    // top shark fin2
    vec4(0.15, 0.49, -0.1, 1.0),
    vec4(0.15, 0.49, 0.0, 1.0),
    vec4(0.25, 0.49, 0.05, 1.0),
    vec4(0.25, 0.49, 0.05, 1.0),
    // top shark fin3
    vec4(-0.05, 0.49, 0.15, 1.0),
    vec4(0.0, 0.49, 0.35, 1.0),
    vec4(0.0, 0.49, 0.35, 1.0),
    vec4(0.05, 0.49, 0.15, 1.0),
    /////////////////////////////////////////////////////////
    // bottom shark (index 88-103)
    vec4(0.15, -0.49, 0.15, 1.0),
    vec4(-0.15, -0.49, 0.15, 1.0),
    vec4(-0.15, -0.49, -0.15, 1.0),
    vec4(0.15, -0.49, -0.15, 1.0),
    // bottom shark fin1
    vec4(-0.15, -0.49, -0.1, 1.0),
    vec4(-0.15, -0.49, 0.0, 1.0),
    vec4(-0.25, -0.49, 0.05, 1.0),
    vec4(-0.25, -0.49, 0.05, 1.0),
    // bottom shark fin2
    vec4(0.15, -0.49, -0.1, 1.0),
    vec4(0.15, -0.49, 0.0, 1.0),
    vec4(0.25, -0.49, 0.05, 1.0),
    vec4(0.25, -0.49, 0.05, 1.0),
    // bottom shark fin3
    vec4(-0.05, -0.49, 0.15, 1.0),
    vec4(0.0, -0.49, 0.35, 1.0),
    vec4(0.0, -0.49, 0.35, 1.0),
    vec4(0.05, -0.49, 0.15, 1.0),
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    // laser back (index 104-107)
    vec4(0.1, -0.35, -0.49, 1.0),
    vec4(-0.1, -0.35, -0.49, 1.0),
    vec4(-0.035, -0.15, -0.49, 1.0),
    vec4(0.035, -0.15, -0.49, 1.0),
    // laser front (index 108-111)
    vec4(0.1, -0.35, 0.49, 1.0),
    vec4(-0.1, -0.35, 0.49, 1.0),
    vec4(-0.035, -0.15, 0.49, 1.0),
    vec4(0.035, -0.15, 0.49, 1.0),
    // laser right (index 112-115)
    vec4(0.49, -0.35, 0.1, 1.0),
    vec4(0.49, -0.35, -0.1, 1.0),
    vec4(0.49, -0.15, -0.035, 1.0),
    vec4(0.49, -0.15, 0.035, 1.0),
    // laser left (index 116-119)
    vec4(-0.49, -0.35, 0.1, 1.0),
    vec4(-0.49, -0.35, -0.1, 1.0),
    vec4(-0.49, -0.15, -0.035, 1.0),
    vec4(-0.49, -0.15, 0.035, 1.0),
    /////////////////////////////////////////////////////////
    // laser top1 (index 120-135)
    vec4(0.1, 0.49, -0.35, 1.0),
    vec4(-0.1, 0.49, -0.35, 1.0),
    vec4(-0.035, 0.49, -0.15, 1.0),
    vec4(0.035, 0.49, -0.15, 1.0),
    // laser top2
    vec4(0.1, 0.48, 0.35, 1.0),
    vec4(-0.1, 0.48, 0.35, 1.0),
    vec4(-0.035, 0.48, 0.15, 1.0),
    vec4(0.035, 0.48, 0.15, 1.0),
    // laser top3
    vec4(-0.35, 0.48, 0.1, 1.0),
    vec4(-0.35, 0.48, -0.1, 1.0),
    vec4(-0.15, 0.48, -0.035, 1.0),
    vec4(-0.15, 0.48, 0.035, 1.0),
    // laser top4
    vec4(0.35, 0.48, 0.1, 1.0),
    vec4(0.35, 0.48, -0.1, 1.0),
    vec4(0.15, 0.48, -0.035, 1.0),
    vec4(0.15, 0.48, 0.035, 1.0),
    /////////////////////////////////////////////////////////
    // laser bottom1 (index 136-151)
    vec4(0.1, -0.49, -0.35, 1.0),
    vec4(-0.1, -0.49, -0.35, 1.0),
    vec4(-0.035, -0.49, -0.15, 1.0),
    vec4(0.035, -0.49, -0.15, 1.0),
    // laser top2
    vec4(0.1, -0.48, 0.35, 1.0),
    vec4(-0.1, -0.48, 0.35, 1.0),
    vec4(-0.035, -0.48, 0.15, 1.0),
    vec4(0.035, -0.48, 0.15, 1.0),
    // laser top3
    vec4(-0.35, -0.48, 0.1, 1.0),
    vec4(-0.35, -0.48, -0.1, 1.0),
    vec4(-0.15, -0.48, -0.035, 1.0),
    vec4(-0.15, -0.48, 0.035, 1.0),
    // laser top4
    vec4(0.35, -0.48, 0.1, 1.0),
    vec4(0.35, -0.48, -0.1, 1.0),
    vec4(0.15, -0.48, -0.035, 1.0),
    vec4(0.15, -0.48, 0.035, 1.0)
    /////////////////////////////////////////////////////////
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), // (0) black
    vec4(1.0, 0.0, 0.0, 1.0), // (1) red
    vec4(1.0, 1.0, 0.0, 1.0), // (2) yellow
    vec4(0.0, 1.0, 0.0, 1.0), // (3) green
    vec4(0.0, 0.0, 1.0, 1.0), // (4) blue
    vec4(1.0, 0.0, 1.0, 1.0), // (5) magenta
    vec4(0.0, 1.0, 1.0, 1.0), // (6) cyan
    vec4(0.0, 0.0, 0.0, 0.6), // (7) gray
    vec4(1.0, 1.0, 1.0, 1.0), // (8) white
    vec4(0.0, 0.0, 1.0, 1.0), // (9) blue
    vec4(0.28, 0.24, 0.86, 1.0), // (10) purple
    vec4(0.95, 0.40, 0.71, 1.0), // (11) pink
    vec4(0.0, 0.01, 1.01, 1.0), // (12) blue2
    vec4(0.28, 0.24, 0.87, 1.0), // (13) purple2
    vec4(0.95, 0.40, 0.72, 1.0), // (14) pink2
    vec4(0.76, 0.76, 0.76, 1.0), // (15) shadow gray
];

var near = 0.55;
var far = 5.5;
var radius = 0.75;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0 * Math.PI / 180.0;

var fovy = 55.0; // Field-of-view in Y direction angle (in degrees)
var aspect; // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

function quad(a, b, c, d, e) {
    pointsArray.push(vertices[a]);
    colorsArray.push(vertexColors[e]);
    index++;

    pointsArray.push(vertices[b]);
    colorsArray.push(vertexColors[e]);
    index++;

    pointsArray.push(vertices[c]);
    colorsArray.push(vertexColors[e]);
    index++;

    pointsArray.push(vertices[a]);
    colorsArray.push(vertexColors[e]);
    index++;

    pointsArray.push(vertices[c]);
    colorsArray.push(vertexColors[e]);
    index++;

    pointsArray.push(vertices[d]);
    colorsArray.push(vertexColors[e]);
    index++;
}

function colorChange(startIndex, color) {
    index = startIndex;
    //var test = index.toString();
    //alert("Color Change Index: " + test);

    cBuffer = gl.createBuffer();

    for (i = 0; i < 6; i++) {
        colorsArray[index + i] = vertexColors[color];
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);
    }
    vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    index = 252;
}

function colorCube() {
    // cube
    quad(1, 0, 3, 2, 10); // 0-5 front
    quad(2, 3, 7, 6, 11); // 6-11 right
    quad(3, 0, 4, 7, 9); // 12-17 bottom
    quad(6, 5, 1, 2, 12); // 18-23 top
    quad(4, 5, 6, 7, 13); // 24-29 back
    quad(5, 4, 0, 1, 14); // 30-35 left

    // shark1 (front)
    quad(8, 9, 10, 11, 10); // 36-41
    quad(12, 13, 14, 15, 10); // 42-47
    quad(16, 17, 18, 19, 10); // 48-53
    quad(20, 21, 22, 23, 10); // 54-59
    // shark2 (back)
    quad(24, 25, 26, 27, 13); // 60-65
    quad(28, 29, 30, 31, 13); // 66-71
    quad(32, 33, 34, 35, 13); // 72-77
    quad(36, 37, 38, 39, 13); // 78-83
    // shark3 (right)
    quad(40, 41, 42, 43, 11); // 84-89
    quad(44, 45, 46, 47, 11); // 90-95
    quad(48, 49, 50, 51, 11); // 96-101
    quad(52, 53, 54, 55, 11); // 102-107
    // shark4 (left)
    quad(56, 57, 58, 59, 14); // 108-113
    quad(60, 61, 62, 63, 14); // 114-119
    quad(64, 65, 66, 67, 14); // 120-125
    quad(68, 69, 70, 71, 14); // 126-131
    // shark5 (top)
    quad(72, 73, 74, 75, 12); // 132-137
    quad(76, 77, 78, 79, 12); // 138-143
    quad(80, 81, 82, 83, 12); // 144-149
    quad(84, 85, 86, 87, 12); // 150-155
    // shark6 (bottom)
    quad(88, 89, 90, 91, 9); // 156-161
    quad(92, 93, 94, 95, 9); // 162-167
    quad(96, 97, 98, 99, 9); // 168-173
    quad(100, 101, 102, 103, 9); // 174-179

    // lasers (sides)
    quad(104, 105, 106, 107, 13); // 180-185 back
    quad(108, 109, 110, 111, 10); // 186-191 front
    quad(112, 113, 114, 115, 11); // 192-197 right
    quad(116, 117, 118, 119, 14); // 198-203 left
    // lasers (top x4)
    quad(120, 121, 122, 123, 12); // 204-209 Look Back-Up
    quad(124, 125, 126, 127, 12); // 210-215 Look Front-Up
    quad(128, 129, 130, 131, 12); // 216-221 Look Left-Up
    quad(132, 133, 134, 135, 12); // 222-227 Look Right-Up
    //lasers (bottom x4)
    quad(136, 137, 138, 139, 9); // 228-233 Look Back-Down
    quad(140, 141, 142, 143, 9); // 234-239 Look Front-Down
    quad(144, 145, 146, 147, 9); // 240-245 Look Right-Down
    quad(148, 149, 150, 151, 9); // 246-251 Look Left-Down
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);

    aspect = canvas.width / canvas.height;

    gl.clearColor(0.0, 0.64, 0.91, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // initial instructional popup displayed to player
    window.alert("-----SHARKSHOOTER 3D-----\n\n " +
        "Objective: Kill 20 Sharks to Win!!\n\n" +
        "How To Play: \n" +
        "1. Arrow Keys to Rotate User \n" +
        "2. Spacebar to Kill Sharks \n\n" +
        "Press OK to Begin!"
    );

    // Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    colorCube();

    // Color Buffer Setup
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Vertices Buffer Setup
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    ///////////////////////////////////////////////////////////////////////

    // Cases for key presses
    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch (key) {
            // right arrow key
            case '\'':
                if (phi == 0.00) // disable when facing up or down
                {
                    if (atheta <= 0.00)
                        atheta = Math.PI * 1.5;
                    else
                        atheta -= Math.PI * 0.5;
                    //usrDir = 1;
                }
                break;
                // left arrow key
            case '%':
                if (phi == 0.00) // disable when facing up or down
                {
                    if (atheta >= Math.PI * 1.5)
                        atheta = 0.00;
                    else
                        atheta += Math.PI * 0.5;
                    //usrDir = 3;
                }
                break;
                // flip view (face back of where currently facing)
            case 'F':
                if (phi == 0.00) // disable when facing up or down
                {
                    if (atheta == Math.PI)
                        atheta = 0.00;
                    else if (atheta == Math.PI * 1.5)
                        atheta = Math.PI * 0.5;
                    else
                        atheta += Math.PI;
                }
                break;
                // up arrow key
            case '&':
                if (phi == 0.00) {
                    faceUp = true;
                    if (theta == 0.00 || theta == Math.PI)
                        atheta += Math.PI * 0.45;
                } else {
                    faceFwd = true;
                    if (phi == Math.PI * 0.5 || phi == -Math.PI * 0.5)
                        atheta -= Math.PI * 0.45;
                }
                //usrDir = 2;
                break;
                // down arrow key
            case '(':
                if (phi == 0.00) {
                    faceDown = true;
                    if (theta == 0.00 || theta == Math.PI)
                        atheta += Math.PI * 0.45;
                } else {
                    faceFwd = true;
                    if (phi == Math.PI * 0.5 || phi == -Math.PI * 0.5)
                        atheta -= Math.PI * 0.45;
                }
                //usrDir = 4;
                break;
                // Space key to fire laser at shark
            case ' ':
                // fire in direction user is facing
                if (usrDir == 1) {
                    // back laser starts at index 180
                    if (sharkDir1) {
                        sharkDir1 = false;
                        sharksOut--;
                    }
                    colorChange(180, 1); // laser = red
                    setTimeout(function() {
                        colorChange(180, 13);
                    }, 150); //.15s delay then blue
                } else if (usrDir == 2) {
                    // left laser starts at index 198
                    if (sharkDir2) {
                        sharkDir2 = false;
                        sharksOut--;
                    }
                    colorChange(198, 1);
                    setTimeout(function() {
                        colorChange(198, 14);
                    }, 150);
                } else if (usrDir == 3) {
                    // front laser starts at index 186
                    if (sharkDir3) {
                        sharkDir3 = false;
                        sharksOut--;
                    }
                    colorChange(186, 1);
                    setTimeout(function() {
                        colorChange(186, 10);
                    }, 150);
                } else if (usrDir == 4) {
                    // right laser starts at index 192
                    if (sharkDir4) {
                        sharkDir4 = false;
                        sharksOut--;
                    }
                    colorChange(192, 1);
                    setTimeout(function() {
                        colorChange(192, 11);
                    }, 150);
                } else if (usrDir == 5) {
                    // bottom laser starts at index 228,234,240,246
                    if (sharkDir5) {
                        sharkDir5 = false;
                        sharksOut--;
                    }
                    // Look Front, then Down
                    if (phi == Math.PI * 0.5 && theta == Math.PI * 0.45) {
                        colorChange(234, 1);
                        setTimeout(function() {
                            colorChange(234, 9);
                        }, 150);
                    }
                    // Look Right, then Down
                    else if (phi == -Math.PI * 0.45 && theta == Math.PI * 1.5) {
                        colorChange(240, 1);
                        setTimeout(function() {
                            colorChange(240, 9);
                        }, 150);
                    }
                    // Look Left, then Down
                    else if (phi == Math.PI * 0.45 && theta == Math.PI * 0.5) {
                        colorChange(246, 1);
                        setTimeout(function() {
                            colorChange(246, 9);
                        }, 150);
                    }
                    // Look Back, then Down
                    else if (phi == -Math.PI * 0.5 && theta == Math.PI * 1.45) {
                        colorChange(228, 1);
                        setTimeout(function() {
                            colorChange(228, 9);
                        }, 150);
                    }
                } else if (usrDir == 6) {
                    // top laser starts at index 204,210,216,222
                    if (sharkDir6) {
                        sharkDir6 = false;
                        sharksOut--;
                    }
                    // Look Front, then Up
                    if (phi == -Math.PI * 0.5 && theta == Math.PI * 0.45) {
                        colorChange(204, 1);
                        setTimeout(function() {
                            colorChange(204, 12);
                        }, 150);
                    }
                    //Look Right, then Up
                    else if (phi == Math.PI * 0.45 && theta == Math.PI * 1.5) {
                        colorChange(222, 1);
                        setTimeout(function() {
                            colorChange(222, 12);
                        }, 150);
                    }
                    // Look Left, then Up
                    else if (phi == -Math.PI * 0.45 && theta == Math.PI * 0.5) {
                        colorChange(216, 1);
                        setTimeout(function() {
                            colorChange(210, 12);
                        }, 150);
                    }
                    // Look Back, then Up
                    else if (phi == Math.PI * 0.5 && theta == Math.PI * 1.45) {
                        colorChange(210, 1);
                        setTimeout(function() {
                            colorChange(216, 12);
                        }, 150);
                    }
                }
                break;
        }
    };

    ///////////////////////////////////////////////////////////////////////

    render();
}

var render = function() {

    if (faceUp) {
        // facing up from blue
        if (theta != atheta && atheta == Math.PI * 0.45) {
            phi = (-Math.PI * 0.5);
            theta += (Math.PI * 0.05);
        } else if (theta == atheta && atheta == Math.PI * 0.45)
            faceUp = false;
        // facing up from red
        else if (theta != atheta && atheta == Math.PI * 1.45) {
            phi = (Math.PI * 0.5);
            theta += (Math.PI * 0.05);
        } else if (theta == atheta && atheta == Math.PI * 1.45)
            faceUp = false;
        // facing up from purple
        else if (theta == Math.PI * 0.5 && phi != (-Math.PI * 0.45))
            phi -= (Math.PI * 0.05);
        else if (theta == Math.PI * 0.5 && phi == (-Math.PI * 0.45))
            faceUp = false;
        // facing up from yellow
        else if (theta == Math.PI * 1.5 && phi != (Math.PI * 0.45))
            phi += (Math.PI * 0.05);
        else if (theta == atheta && phi == Math.PI * 0.45)
            faceUp = false;

        usrDir = 6;
    } else if (faceDown) {
        // facing down from blue
        if (theta != atheta && atheta == Math.PI * 0.45) {
            phi = (Math.PI * 0.5);
            theta += (Math.PI * 0.05);
        } else if (theta == atheta && atheta == Math.PI * 0.45)
            faceDown = false;
        // facing down from red
        else if (theta != atheta && atheta == Math.PI * 1.45) {
            phi = (-Math.PI * 0.5);
            theta += (Math.PI * 0.05);
        } else if (theta == atheta && atheta == Math.PI * 1.45)
            faceDown = false;
        // facing down from purple
        else if (theta == Math.PI * 0.5 && phi != (Math.PI * 0.45))
            phi += (Math.PI * 0.05);
        else if (theta == Math.PI * 0.5 && phi == (Math.PI * 0.45))
            faceDown = false;
        // facing down from yellow
        else if (theta == Math.PI * 1.5 && phi != (-Math.PI * 0.45))
            phi -= (Math.PI * 0.05);
        else if (theta == atheta && phi == -Math.PI * 0.45)
            faceDown = false;

        usrDir = 5;
    } else if (faceFwd) {
        // return from blue
        if (theta != atheta && atheta == 0.00)
            theta -= (Math.PI * 0.05);
        else if (theta == atheta && atheta == 0.00) {
            faceFwd = false;
            phi = 0.00;
        }
        // return from red
        else if (theta != atheta && atheta == Math.PI)
            theta -= (Math.PI * 0.05);
        else if (theta == atheta && atheta == Math.PI) {
            faceFwd = false;
            phi = 0.00;
        }
        // return from purple or yellow
        else if (theta == Math.PI * 0.5 || theta == Math.PI * 1.5) {
            if (phi < 0.0)
                phi += (Math.PI * 0.05);
            else if (phi > 0.0)
                phi -= (Math.PI * 0.05);
            else
                faceFwd = false;
        }
    } else if (theta != atheta && atheta == 0.00) {
        // if moving from yellow to blue, we have to reset theta (circle)
        if (theta >= Math.PI * 1.5)
            if (theta >= Math.PI * 2)
                theta = 0.0;
            else
                theta += (Math.PI * 0.05);
        else if (theta < atheta)
            theta += (Math.PI * 0.05);
        else
            theta -= (Math.PI * 0.05);
    }
    // moving to face red
    else if (theta != atheta && atheta == Math.PI) {
        if (theta < atheta)
            theta += (Math.PI * 0.05);
        else
            theta -= (Math.PI * 0.05);
    }
    // moving to face purple
    else if (theta != atheta && atheta == Math.PI * 0.5) {
        if (theta < atheta)
            theta += (Math.PI * 0.05);
        else
            theta -= (Math.PI * 0.05);
    }
    // moving to face yellow
    else if (theta != atheta && atheta == Math.PI * 1.5) {
        // turn in correct direction when facing blue but moving to face yellow
        if (theta == 0.0)
            theta = (Math.PI * 2);
        else if (theta < atheta)
            theta += (Math.PI * 0.05);
        else
            theta -= (Math.PI * 0.05);
    }

    if (phi == 0.00) // determine where the player is facing (if not up or down)
    {
        if (theta == 0.00)
            usrDir = 1;
        else if (theta == Math.PI * 0.5)
            usrDir = 2;
        else if (theta == Math.PI)
            usrDir = 3;
        else if (theta == Math.PI * 1.5)
            usrDir = 4;
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(radius * Math.sin(theta) * Math.cos(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    for (var i = 0; i < index; i += 6) {
        gl.drawArrays(gl.TRIANGLES, i, 6);
    }

    SharkAttack();
    endGame();

    requestAnimFrame(render);
}

//function responsible for generation of sharks and corresponding logic
function SharkAttack() {

    if (sharksOut != sharksAtOnce) {
        setTimeout(function() {
            while (true) {
                //generate shark at random spot, only if shark not already there
                sharkDir = Math.floor(Math.random() * 6) + 1;
                if (sharkDir == 1 && !sharkDir1) {
                    sharkDir1 = true;
                    break;
                } else if (sharkDir == 2 && !sharkDir2) {
                    sharkDir2 = true;
                    break;
                } else if (sharkDir == 3 && !sharkDir3) {
                    sharkDir3 = true;
                    break;
                } else if (sharkDir == 4 && !sharkDir4) {
                    sharkDir4 = true;
                    break;
                } else if (sharkDir == 5 && !sharkDir5) {
                    sharkDir5 = true;
                    break;
                } else if (sharkDir == 6 && !sharkDir6) {
                    sharkDir6 = true;
                    break;
                }
            }
        }, 1000);
        sharksOut++;
        sharkCount++;
    }

    // code to make sharks appear/disappear as required
    if (sharkDir1) // back shark
    {
        colorChange(60, 7);
        colorChange(66, 7);
        colorChange(72, 7);
        colorChange(78, 7);

        colorChange(0, 15); // Front Wall Shadow
        colorChange(186, 15); // Laser Shadow

    } else if (!sharkDir1) {
        colorChange(60, 13);
        colorChange(66, 13);
        colorChange(72, 13);
        colorChange(78, 13);

        colorChange(0, 10); // Front Wall Normal
        colorChange(186, 10); // Laser Normal

    }

    if (sharkDir2) // left shark
    {
        colorChange(108, 7);
        colorChange(114, 7);
        colorChange(120, 7);
        colorChange(126, 7);

        colorChange(6, 15); // Right Wall Shadow
        colorChange(192, 15); // Laser Shadow

    } else if (!sharkDir2) {
        colorChange(108, 14);
        colorChange(114, 14);
        colorChange(120, 14);
        colorChange(126, 14);

        colorChange(6, 11); // Right Wall Normal
        colorChange(192, 11); // Laser Normal

    }

    if (sharkDir3) // front shark
    {
        colorChange(36, 7);
        colorChange(42, 7);
        colorChange(48, 7);
        colorChange(54, 7);

        colorChange(24, 15); // Back Wall Shadow
        colorChange(180, 15); // Laser Shadow

    } else if (!sharkDir3) {
        colorChange(36, 10);
        colorChange(42, 10);
        colorChange(48, 10);
        colorChange(54, 10);

        colorChange(24, 13); // Back Wall Normal
        colorChange(180, 13); // Laser Normal

    }

    if (sharkDir4) // right shark
    {
        colorChange(84, 7);
        colorChange(90, 7);
        colorChange(96, 7);
        colorChange(102, 7);

        colorChange(30, 15); // Left Wall Shadow
        colorChange(198, 15); // Laser Shadow

    } else if (!sharkDir4) {
        colorChange(84, 11);
        colorChange(90, 11);
        colorChange(96, 11);
        colorChange(102, 11);

        colorChange(30, 14); // Left Wall Normal
        colorChange(198, 14); // Laser Normal

    }

    if (sharkDir5) // bottom shark
    {
        colorChange(156, 7);
        colorChange(162, 7);
        colorChange(168, 7);
        colorChange(174, 7);

        colorChange(18, 15); // Top Wall Shadow
        colorChange(204, 15); // Lasers Shadow
        colorChange(210, 15);
        colorChange(216, 15);
        colorChange(222, 15);

    } else if (!sharkDir5) {
        colorChange(156, 9);
        colorChange(162, 9);
        colorChange(168, 9);
        colorChange(174, 9);

        colorChange(18, 12); // Top Wall Normal
        colorChange(204, 12); // Lasers Normal
        colorChange(210, 12);
        colorChange(216, 12);
        colorChange(222, 12);

    }

    if (sharkDir6) // top shark
    {
        colorChange(132, 7);
        colorChange(138, 7);
        colorChange(144, 7);
        colorChange(150, 7);

        colorChange(12, 15); // Bottom Wall Shadow
        colorChange(228, 15); // Lasers Shadow
        colorChange(234, 15);
        colorChange(240, 15);
        colorChange(246, 15);

    } else if (!sharkDir6) {
        colorChange(132, 12);
        colorChange(138, 12);
        colorChange(144, 12);
        colorChange(150, 12);

        colorChange(12, 9); // Bottom Wall Normal
        colorChange(228, 9); // Lasers Normal
        colorChange(234, 9);
        colorChange(240, 9);
        colorChange(246, 9);

    }
}

// function responsible for maintaining game timer
function timer() {
    // Back Wall
    if (sharkDir1) {
        count1--; // each wall/boundary has independent timer

        // calculates an alpha value and re-applies new color to wall (transparency effect)
        var alpha = (1 / globalCount) * count1;
        vertexColors[13] = vec4(0.28, 0.24, 0.87, alpha);
        colorChange(24, 13);

        // checks count to ensure whether game over or more sharks can be generated
        if (count1 == 0)
            clearInterval(counter);
    }
    // Left Wall
    if (sharkDir2) {
        count2--;

        var alpha = (1 / globalCount) * count2;
        vertexColors[14] = vec4(0.95, 0.40, 0.72, alpha);
        colorChange(30, 14);

        if (count2 == 0)
            clearInterval(counter);
    }
    // Front Wall
    if (sharkDir3) {
        count3--;

        var alpha = (1 / globalCount) * count3;
        vertexColors[10] = vec4(0.28, 0.24, 0.86, alpha);
        colorChange(0, 10);

        if (count3 == 0)
            clearInterval(counter);
    }
    // Right Wall
    if (sharkDir4) {
        count4--;

        var alpha = (1 / globalCount) * count4;
        vertexColors[11] = vec4(0.95, 0.40, 0.71, alpha);
        colorChange(6, 11);

        if (count4 == 0)
            clearInterval(counter);
    }
    // Bottom Wall
    if (sharkDir5) {
        count5--;

        var alpha = (1 / globalCount) * count5;
        vertexColors[9] = vec4(0.0, 0.0, 1.0, alpha);
        colorChange(12, 9);

        if (count5 == 0)
            clearInterval(counter);
    }
    // Top Wall
    if (sharkDir6) {
        count6--;

        var alpha = (1 / globalCount) * count6;
        vertexColors[12] = vec4(0.0, 0.01, 1.01, alpha);
        colorChange(18, 12);

        if (count6 == 0)
            clearInterval(counter);
    }

    if ((count1 + count2 + count3 + count4 + count5 + count6) <= 30)
        warningSound.play();
}

//function to alert user and wrap-up game play
function endGame() {
    //update score if game is over
    document.getElementById("score").innerHTML = count1 + count2 + count3 + count4 + count5 + count6;
    document.getElementById("sharksKilled").innerHTML = sharkCount - sharksAtOnce;

    //the difficulty pre-increases the shark count, need total-1 to get the right win result
    if (count1 == 0 || count2 == 0 || count3 == 0 || count4 == 0 || count5 == 0 || count6 == 0 ||
        sharkCount > (20 + sharksAtOnce - 1)) {
        // End of game popups to indicate results
        var score = count1 + count2 + count3 + count4 + count5 + count6;

        if (sharkCount > (20 + sharksAtOnce - 1)) {
            warningSound.pause(); //stop warning music
            window.alert("YOU WIN!");
        } else {
            warningSound.currentTime = 12.26; //forward to the losing sound
            window.alert("YOU LOSE!");
        }
        window.alert("-----GAME OVER-----\n\n" +
            "--Your Score is: " + score + "--\n Sharks Killed: " + (sharkCount - sharksAtOnce) + "\n\n" + "Press OK to Try Again!");
        location.reload();
    }
}