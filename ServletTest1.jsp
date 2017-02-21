<!doctype html>
<html ng-app="myApp">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>

</head>
	<body>
      <form action="ServletTest" method="POST" target="_blank">
         <input type="checkbox" name="maths" checked="checked" /> Maths
         <input type="checkbox" name="physics"  /> Physics
         <input type="checkbox" name="chemistry" checked="checked" /> 
                                                Chemistry
         <input type="submit" value="Select Subject" />
      </form>
   </body>
</html>