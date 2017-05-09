<<<<<<< HEAD
var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
    $scope.contactID = "";
	$scope.orgID = "";
	$scope.role = "";
	$scope.firstName = "Alexander";
	$scope.midName = "Simon";
    $scope.lastName = "Poe";
	$scope.nameTitle = "";
	$scope.nameSufx = "";
	$scope.addLine1 = "";
	$scope.addLine2 = "";
	$scope.addCity = "";
	$scope.addState = "";
	$scope.addPost = "";
	$scope.addCountry = "";
	$scope.phoneOff = "";
	$scope.phoneMobl = "";
	$scope.phoneHome = "";
	$scope.email = "";
	$scope.emailAlt = "";
	
	//$scope.fullName = function() {
    //   	return $scope.firstName + " " + $scope.lastName;
    //};
});

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});
=======
var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
    $scope.contactID = "";
	$scope.orgID = "";
	$scope.role = "";
	$scope.firstName = "Alexander";
	$scope.midName = "Simon";
    $scope.lastName = "Poe";
	$scope.nameTitle = "";
	$scope.nameSufx = "";
	$scope.addLine1 = "";
	$scope.addLine2 = "";
	$scope.addCity = "";
	$scope.addState = "";
	$scope.addPost = "";
	$scope.addCountry = "";
	$scope.phoneOff = "";
	$scope.phoneMobl = "";
	$scope.phoneHome = "";
	$scope.email = "";
	$scope.emailAlt = "";
	
	//$scope.fullName = function() {
    //   	return $scope.firstName + " " + $scope.lastName;
    //};
});

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});
>>>>>>> 18281110013624400916c9c61ad7f74dae21e4e3
