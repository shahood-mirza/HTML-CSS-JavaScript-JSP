<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Athletes Association™</title>
    <link href="styles.css" rel="stylesheet" type="text/css" />
    <link href="SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet" type="text/css" />
	<script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
    <script type = "text/javascript">
	function submitForm()
	{
		if(document.AddToCart.onsubmit && !document.AddToCart.onsubmit())
	    {
        	return;
    	}
		document.AddToCart.submit();
	}
</script>
</head>
<body>
<center>
<div style="display:block; float:none; clear:both; width:782px; background-color:#FFF" align="center">
	<div class="regDiv" style="float:none; clear:both; margin:0;">
    	<%@ include file="/WEB-INF/header.jsp" %>	<!-- THIS INCLUDES THE HEADER -->
    </div>
    <div style="clear:both; display:block; margin:3px;">
    	<div class="regDiv" style="clear:both; margin-bottom:5px;">
        	<img src="Pictures/reebok_main_banner.jpg" width="770" height="112" />
        </div>
        <div class="regDiv" style="clear:both; margin-bottom:15px; font-size:8pt;">
		<a href="#">Home</a> / <a href="#">Hockey</a> / <a href="#">Team Jerseys</a> / Maple Leafs</div>
    	<div class="regDiv" style="clear:left;">
	        <img src="Pictures/toronto-maple-leafs-home-jersey-rbk.jpg" width="275" height="275" /><br />
          <span><p><strong><a href="Pictures/toronto-maple-leafs-home-jersey-rbk.jpg" target="_blank">View Full Size Image</a></strong></p>
            </span>
        </div>
        <div class="regDiv" style="clear:right; width:55%; font-size:24px; font-weight:bold; text-align:left;">
        	Reebok EDGE Toronto Maple Leafs<br />Authentic Home Jersey
        </div>
		<div class="regDiv" style="clear:right; width:55%; height:25px; font-size:15px; font-weight:bold; text-align:left; margin-top:25px;">
        <form action="AddToCart" method="post" name="AddToCart">
            	<input type="hidden" name="prodno" value="0001" />
            	<input type="hidden" name="userid" value="<%= u.getId() %>" />
				Our Price: $329.99
                <a href="javascript:submitForm(this.form)">
                	<img src="Pictures/add-to-cart-small.png" width="109" height="25" border="0" style="margin-left:20px;"/>
                </a>
          </form>
        </div>
  	  <div class="regDiv" style="clear:right; width:55%; text-align:justify; margin-top:15px;">
			<p>
				This Reebok® EDGE hockey jersey replicates the player worn Pro-cut jersey in fabric, trim and team design. It's made of double knit polyester and has four-way stretch mesh, which provides a balance of ventilation and range of motion in the underarm and back areas. The jersey is designed with a combination of direct embroidery and appliqué twill graphics.
            </p>
	    </div>
        <fieldset class="regDiv" style="text-align:left; font-size:9pt; width:55%; margin-top: 10px; margin-bottom:10px; border:1px #666 solid;">
        <legend><h3>Features</h3></legend>
	        <ul class="features">
                <li>100% double knit polyester</li>
                <li>Custom or blank jersey</li>
                <li>Spandex four-way stretch pique core body</li>
                <li>PlayDry® performance Lycratalic collar</li>
                <li>Water repellent Bead Away™ X-trafil fabric is placed on the high-abrasion shoulder and elbow areas</li>
                <li>Official team graphics on chest and shoulder crests (where applicable) are designed with a combination of direct embroidery and appliqué twill</li>
                <li>NHL® shield patch is sewn on the bottom front of the collar fabric insert</li>
                <li>Authentic tie down "fight" strap attached inside back of jersey</li>
                <li>Reinforced stitching on all seams and hems</li>
                <li>Decorated in the team colors</li>
                <li>Officially licensed</li>
                <li>Made in Canada</li>
            </ul>
        </fieldset>
    </div>
   	<div class="regDiv" style="float:none; clear:both; margin:0;">
    	<%@ include file="/WEB-INF/footer.jsp" %>	<!-- THIS INCLUDES THE FOOTER -->
    </div>
</div>
</center>
</body>
</html>