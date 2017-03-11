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

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	$scope.myFunction = function() {
		var pageData = {
			table: 'contacts', //currently only table is used by the search handler
		};
		
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
	
});

app.controller('initCtrl', function($scope, $http) { //On page load, this conroller populates the table
	var pageData = {
		table: 'contacts',
	};
	
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

app.controller('addContactCtrl', function($scope, $http) { 
	$scope.addFunction = function() {
		var addData = {
			table: 'contacts', 
			cont_id: $scope.contactID,
			cont_org_id: $scope.orgID,
			cont_role_cd: $scope.role,
			cont_first_name: $scope.firstName,
			cont_middle_name: $scope.midName,
			cont_last_name: $scope.lastName,
			cont_name_title: $scope.nameTitle,
			cont_name_suffix: $scope.nameSufx,
			cont_addr1: $scope.addLine1,
			cont_addr2: $scope.addLine2,
			cont_city: $scope.addCity,
			cont_state_prov_cd: $scope.addState,
			cont_post_cd: $scope.addPost,
			cont_cntry_cd: $scope.addCity,
			cont_office_phone: $scope.phoneOff,
			cont_mobile_phone: $scope.phoneMobl,
			cont_home_phone: $scope.phoneHome,
			cont_email: $scope.email,
			cont_alt_email: $scope.emailAlt,
		};
		
		$http({
			method : 'POST',
			url : 'DatabaseAddHandler',
			contentType: 'application/json',
			data : addData,
		})
		.then(function (response) {
			//$scope.myResults = response.data;
			console.log('Item Added.');
			}, function (error) {
				console.log(error);
		});	
	}
	
});


