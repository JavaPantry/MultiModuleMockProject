<html>
<head>

<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" -->
<!-- taglib prefix="s" uri="/struts-tags" -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- page import="ca.canon.fast.constants.GlobalConstant" -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252"/>
<META http-equiv="Content-Style-Type" content="text/css"/>
<META HTTP-EQUIV="pragma" CONTENT="no-cache"/>
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"/>
<META HTTP-EQUIV="expires" CONTENT="-1"/>

<title>ExtJs 4.2.1. front-end in Spring Boot</title>

<script type="text/javascript">
var welcomeUserName		= 'Welcome, '+ 'guest';//'${username}';
var FaST_Version_Number = 'v 0.0.1';
var isProductAccessible	=  false;//'${isProd}';
var isDealerAccessible	=  false;//'${isDealer}';
var isSaleAccessible	=  false;//'${isSale}';
var isCompanyAccessible	=  false;//'${isCompany}';
var ProductSavedTag = '';
var ProductSubmittedTag = '';
</script>


<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/js/extjs-4.2.1/resources/css/ext-all.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/extjs-4.2.1/ext-all-debug-w-comments.js"></script>
<!-- <link rel="stylesheet" type="text/css" href="/MockRestBootExtJs/resources/js/extjs-4.2.1/resources/css/ext-all.css"/>
<script type="text/javascript" src="/MockRestBootExtJs/resources/js/extjs-4.2.1/ext-all-debug-w-comments.js"></script>
 -->
<!-- 
<link rel="stylesheet" type="text/css" href="/fast-web/resources/js/extjs-4.2.1/resources/css/ext-all.css"/>
<script type="text/javascript" src="/fast-web/resources/js/extjs-5.1.0/build/ext-all-debug.js"></script>
-->

<!-- <link rel="stylesheet" type="text/css" href="resources/fast/css/app.css"/> -->
<script type="text/javascript" src="${pageContext.request.contextPath}/app.js"></script>   

</head>

<body>
<script>
document.write("Loading Demo "+FaST_Version_Number+'<p>with ExtJs 4.2.1. front-end in Spring Boot');
</script>
</body>
</html>