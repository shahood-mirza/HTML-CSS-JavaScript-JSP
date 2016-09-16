<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Untitled Document</title>
	<style type="text/css">
	    .regDiv {display:block; float:left; margin-top:3px;margin-left:3px;margin-right:3px;}
    </style>
	<script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
	<link href="SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet" type="text/css" />
</head>

<body>
<%@ page import="buslogic.*,java.util.*" %>
<% String user = (String) session.getAttribute("user");  %>
<%
	DataAccess da = new DataAccess();
	User u = da.getUserInfo(user);
%>
<div class="regDiv" style="width:782px; background-color:#E5E5E5; margin:0;">
	<div class="regDiv">
  		<a href="home.jsp"><img src="Pictures/Logo.png" title="Go to Athletes Association Home" width="100" height="138" border="0" style="margin-top:10px;"/></a>
	</div>
	<div class="regDiv" style="clear:none;">
	    <center>
  			<img src="Pictures/Title-trns.png" alt="" width="449" height="104" align="middle" style="margin-top:10px; margin-left:16px; margin-right:10px;" />
        	<!--  THIS IS THE CODE FOR THE SCRIPTSOCKET SEARCH BAR!!!!!!!! -->
			<form action="http://www.scriptsocket.com/cgi-bin/search/find.cgi" method="get">
				<input type="hidden" name="u" value="joe3412">
				<input type="text" name="k" size=30 maxlength="100">
				<input type="submit" value="Search">
			</form>
        </center>
	</div>
  	<div class="regDiv" style="height:138px; float:left; clear:none; text-align:center">
  		<div style="display:block; margin:0px; margin-top:15px;">
            <span style="font-family:Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #000; margin:0;">
                <%
				if(user==null || user=="") {
					%>
						<a href="create-account.jsp" title="Create an account">Register</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="login.jsp" title="Click to login">Login</a>
					<%
				} 
				else {
					%>
						Welcome <%out.print(u.getFname()); %>!<br>
						<a href="SignOut">Log Out</a><br><br>
						<a href="mycart.jsp" target="_self"><img src="Pictures/cart.png"  title="My Shopping Cart" width="61.3" height="23.3" border="0" /></a>
					<%
				}
			%>
            </span>
	    </div>
    	<div class="regDiv" style="display:block; width:100%; text-align:center; margin-top:15px;">
            <a href="http://www.youtube.com/" target="_blank"><img src="Pictures/youtube_icon.png" title="Go To YouTube" width="40" height="40" border="0" /></a>
            <a href="http://www.facebook.com/" target="_blank"><img src="Pictures/facebook_icon.png" title="Go To Facebook" width="40" height="40" border="0" /></a>
            <a href="http://www.twitter.com/" target="_blank"><img src="Pictures/twitter_icon.png" title="Go To Twitter" width="40" height="40" border="0" /></a>
	    </div>
	</div>
    <div style="clear:both; margin-left:7px; margin-top:160px;">
		<ul id="MenuBar1" class="MenuBarHorizontal">
        	<li><a class="MenuBarItemSubmenu" href="#">BASKETBALL</a>
	            <ul>
	            	<li><a href="#">Jerseys</a></li>
	              	<li><a href="#">Footwear</a></li>
	              	<li><a href="#">Basketballs</a></li>
	              	<li><a href="#">Accessories</a></li>
	            </ul>
			</li>
        	<li><a href="#" class="MenuBarItemSubmenu">HOCKEY</a>
				<ul>
              		<li><a href="product.jsp">Jerseys</a></li>
              		<li><a href="#">Ice Skates</a></li>
              		<li><a href="#">Equipment</a></li>
              		<li><a href="#">Helmets</a></li>
              		<li><a href="#">Sticks</a></li>
            	</ul>
          	</li>
          	<li><a class="MenuBarItemSubmenu" href="#">FOOTBALL</a>
            	<ul>
	                <li><a href="#">Jerseys</a></li>
                	<li><a href="#">Cleats</a></li>
                	<li><a href="#">Equipment</a></li>
                	<li><a href="#">Helmets</a></li>
	              	<li><a href="#">Footballs</a></li>
            	</ul>
          	</li>
          	<li><a href="#" class="MenuBarItemSubmenu">SOCCER</a>
	            <ul>
                	<li><a href="#">Jerseys</a></li>
                	<li><a href="#">Cleats</a></li>
	                <li><a href="#">Equipment</a></li>
             		<li><a href="#">Soccer Balls</a></li>
        		</ul>
        	</li>
        	<li><a href="#" class="MenuBarItemSubmenu">TENNIS</a>
	            <ul>
            		<li><a href="#">Apparel</a></li>
                	<li><a href="#">Footwear</a></li>
            		<li><a href="#">Raquets</a></li>
            		<li><a href="#">Tennis Balls</a></li>
            	</ul>
			</li>
			<li><a href="#">DEALS</a></li>
        </ul>
        <script type="text/javascript">
			var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {imgDown:"SpryAssets/SpryMenuBarDownHover.gif", imgRight:"SpryAssets/SpryMenuBarRightHover.gif"});
        </script>
    </div>
</div>
</body>
</html>