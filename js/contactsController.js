var app = angular.module('myApp', []);


app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	$scope.myFunction = function() {
		var pageData = {
			table: 'contacts', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
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
	
	$scope.newField = {};
    $scope.editing = false;

	$scope.editResults = function(field) {
		$scope.editing = $scope.myResults.indexOf(field);
		$scope.newField = angular.copy(field);
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'contacts',
		}
		
		editData.original = $scope.newField;
		editData.updated = $scope.myResults[$scope.editing];
		
		if ($scope.editing !== false) {
			//$scope.myResults[$scope.editing] = $scope.newField;
			//$scope.editing = false;
			console.log(editData);
			
			$http({
				method : 'POST',
				url : 'DatabaseEditHandler',
				contentType: 'application/json',
				data : editData,
			})
			
		}       
	};

	$scope.cancel = function(index) {
		if ($scope.editing !== false) {
			$scope.myResults[$scope.editing] = $scope.newField;
			$scope.editing = false;
		}
	};
	
	
});

app.controller('addCtrl', function($scope, $http) { 
	$scope.addFunction = function() {
		
		//CHANGE THESE: ORDER ORDER IS (NAME OF COLUMN FROM DATABASE): $SCOPE.(NAME OF COLUMN FROM DATABASE)
		var addData = {
			'table': 'contacts', 
			'cont_id': $scope.contactID,
			'cont_org_id': $scope.orgID,
			'cont_role_cd': $scope.role,
			'cont_first_name': $scope.firstName,
			'cont_middle_name': $scope.midName,
			'cont_last_name': $scope.lastName,
			'cont_name_title': $scope.nameTitle,
			'cont_name_suffix': $scope.nameSufx,
			'cont_addr1': $scope.addLine1,
			'cont_addr2': $scope.addLine2,
			'cont_city': $scope.addCity,
			'cont_state_prov_cd': $scope.addState,
			'cont_post_cd': $scope.addPost,
			'cont_cntry_cd': $scope.addCity,
			'cont_office_phone': $scope.phoneOff,
			'cont_mobile_phone': $scope.phoneMobl,
			'cont_home_phone': $scope.phoneHome,
			'cont_email': $scope.email,
			'cont_alt_email': $scope.emailAlt,
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


