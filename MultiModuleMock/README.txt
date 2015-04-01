Parent project used to build the Multi-module Mock Project

*** BUILD ***

To build the complete fast package, you need 3 projects (Git/CVS modules):

MultiModuleMock
MultiModuleMockService
MultiModuleMockWeb


==========================================================================
Sporcic
\extjs-spring-sample-master\
src\main\webapp\WEB-INF\web.xml -> WEB-INF/spring/webmvc-config.xml
				-> WEB-INF/spring/applicationContext-jdbc.xml -> applicationContext-dataSource.xml
				-> WEB-INF\classes/log4j.properties
WebApplicationInitializer (see: http://www.intertech.com/Blog/how-to-use-springs-webapplicationinitializer/)
----------------------------------------------------------------------------------------------------
kielczewsky
\example-spring-boot-mvc\
		\src\main\resources\application.properties  (see: spring.profiles.active)
		\src\main\resources\messages.properties
		\src\main\resources\logback.xml (see: http://logback.qos.ch/index.html)
Application.java -> SpringBootServletInitializer

--------------------
spring-data-jpa vs spring-data