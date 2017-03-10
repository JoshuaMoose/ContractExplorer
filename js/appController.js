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

app.controller('resultsCtrl', function($scope, $http) {
	$scope.myFunction = function() {
		$http.post("DatabaseSearchHandler")
		.then(function (response) {
			$scope.myResults = response.data;

			console.log('Data loaded.');
			}, function (error) {
				console.log(error);
		});	
	}
	
});

app.controller('initCtrl', function($scope, $http) {
	var pageData = 'contacts';
	
	$scope.init = function() {
		$http({
			method : 'POST',
			url : 'DatabaseSearchHandler',
			contentType: 'application/json',
			data : pageData,
		})	
		.then(function (response) {
			$scope.myResults = response.data;

			console.log('Data loaded.');
			}, function (error) {
				console.log(error);
		});	
	}
	$scope.init();
	
	
});


