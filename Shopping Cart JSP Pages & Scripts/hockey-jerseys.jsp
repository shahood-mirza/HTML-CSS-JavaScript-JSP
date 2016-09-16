<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Athletes Association™</title>
    <link href="styles.css" rel="stylesheet" type="text/css" />

		function MM_swapImgRestore() { //v3.0
		  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
		}
		function MM_preloadImages() { //v3.0
		  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
			var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
			if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
		}
		
		function MM_findObj(n, d) { //v4.01
		  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
			d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
		  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
		  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
		  if(!x && d.getElementById) x=d.getElementById(n); return x;
		}
		
		function MM_swapImage() { //v3.0
		  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
		   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
		}
	</script>
</head>
<body onload="MM_preloadImages('Pictures/Basketball_Faded.png','Pictures/Hockey_Faded.png','Pictures/Football_Faded.png','Pictures/Soccer _Faded.png','Pictures/Tennis_Faded.png','Pictures/Basketball.jpg','Pictures/Hockey.jpeg','Pictures/Football.jpg','Pictures/Soccer.jpg','Pictures/Tennis.jpg')">
<center>
<div style="display:block; float:none; clear:both; width:782px; background-color:#FFF" align="center">
	<div class="regDiv" style="float:none; clear:both; margin:0;">
    	HEADER CONTENT
    </div>
    <div style="clear:both; display:block; margin:3px;">
        <div class="regDiv">
            <img src="Pictures/Football_Banner.png" alt="" width="150" height="475" />
        </div>
        <div class="regDiv">
			<div class="regDiv" style="clear:both">
                <div class="regDiv" style="clear:left;">
                    <a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Basketball','','Pictures/Basketball_Faded.png',1)"><img src="Pictures/Basketball.jpg" alt="" name="Basketball" width="220" height="150" border="0" id="Basketball" /></a>
                </div>
                <div class="regDiv" style="clear:right;">
                    <a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Hockey','','Pictures/Hockey_Faded.png',1)"><img src="Pictures/Hockey.jpeg" alt="" name="Hockey" width="220" height="150" border="0" id="Hockey" /></a>
                </div>
            </div>
            <div class="regDiv" style="clear:both">
                <div class="regDiv" style="clear:left;">
                    <a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Football','','Pictures/Football_Faded.png',1)"><img src="Pictures/Football.jpg" alt="" name="Football" width="220" height="150" border="0" id="Football" /></a>
                </div>
                <div class="regDiv" style="clear:right;">
                    <a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Soccer','','Pictures/Soccer _Faded.png',1)"><img src="Pictures/Soccer.jpg" alt="" name="Soccer" width="220" height="150" border="0" id="Soccer" /></a>
                </div>
            </div>
            <div class="regDiv" style="clear:both">
                <div class="regDiv" style="clear:left;">
                    <a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Tennis','','Pictures/Tennis_Faded.png',1)"><img src="Pictures/Tennis.jpg" alt="" name="Tennis" width="220" height="150" border="0" id="Tennis" /></a>
                </div>
                <div class="regDiv" style="clear:right;">
                    <img src="Pictures/Discount.jpg" alt="" width="220" height="150" />
                </div>
            </div>
        </div>
        <div class="regDiv">
            <img src="Pictures/Soccer_Banner.png" alt="" width="150" height="475" />
        </div>
    </div>
   	<div class="regDiv" style="float:none; clear:both; margin:0;">
    	FOOTER CONTENT
    </div>
</div>
</center>
</body>
</html>