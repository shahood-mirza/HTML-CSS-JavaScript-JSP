<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Athletes Association™</title>
    <link href="styles.css" rel="stylesheet" type="text/css" />
    <link href="SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet" type="text/css" />
	<script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
</head>
<body>
<center>
<div style="display:block; float:none; clear:both; width:782px; background-color:#FFF" align="center">
	<div class="regDiv" style="float:none; clear:both; margin:0;">
    	<%@ include file="/WEB-INF/header.jsp" %>	<!-- THIS INCLUDES THE HEADER -->
    </div>
    
    <div style="clear:both; display:block; margin:10px; margin-bottom:50px; margin-top:20px;">
    	<div class="regDiv" style="text-align:center; float:none;">
		<center>
        <br /><br /><br />
			<h3>My Shopping Cart</h3>
			<%
				ArrayList<Cart> arr = da.getCart(u.getId());
			%>
				Number of Items in Cart: <%= arr.size() %>
			<table border="1" style="border:2px solid #666">
            <tr>
            <td></td>
            <td></td>
            <td>User ID</td>
            <td>Product #</td>
            <td>Description</td>
            <td>Qty.</td>
            <td>Subtotal</td>
            </tr>
            
			<%
				String bg = "999999";
				for (int i=0; i<arr.size(); i++)
				{
					if (i%2 == 0)
						bg = "999999";
					else
						bg = "CCCCCC";
					Cart singleItem = arr.get(i);
					
					out.println("<tr bgcolor='#"+bg+"'>");
					out.println("<td><a href=\"update-user.jsp?id="+singleItem.getId()+"\">Update</a></td>");
					out.println("<td><a href=\"DeleteUser?id="+singleItem.getId()+"\">Delete</a></td>");
					out.println("<td>"+singleItem.getId()+"</td>");
					out.println("<td>"+singleItem.getProdno()+"</td>");
					out.println("<td>"+singleItem.getProddesc()+"</td>");
					out.println("<td>"+singleItem.getOrderqty()+"</td>");
					out.println("<td>"+singleItem.getSubtotal()+"</td>");
					out.println("</tr>");
				}
			%>
			</table>
		</center>
        <br /><br /><br /><br /><br />
        </div>
    </div>
   	<div class="regDiv" style="float:none; clear:both; margin:0;">
    	<%@ include file="/WEB-INF/footer.jsp" %>	<!-- THIS INCLUDES THE FOOTER -->
        <br />
    </div>
</div>
</center>
</body>
</html>