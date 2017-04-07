var app = angular.module('myApp', []);


app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	$scope.myFunction = function() {
		var pageData = {
			table: 'contracts', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
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
			'table': 'contracts',
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
			'table': 'contracts', 
			'contr_id': $scope.contr_id,
			'contr_org_id': $scope.contr_org_id,
			'contr_end_cust_id': $scope.contr_end_cust_id,
			'cont_type_cd': $scope.contr_type_cd,
			'prime_contr_id': $scope.prime_contr_id,
			'prime_contract_no': $scope.prime_contract_no,
			'contr_prog_cd': $scope.contr_prog_cd,
			'contr_vehicle_cd': $scope.contr_vehicle_cd,
			'contr_sec_level_cd': $scope.contr_sec_level_cd,
			'contr_info_safe_level_cd': $scope.contr_info_safe_level_cd,
			'contr_open_date': $scope.contr_open_date,
			'contr_close_date': $scope.contr_close_date,
			'is_open': $scope.is_open,
			'exemptions': $scope.exemptions,
			'dd254_recv': $scope.dd254_recv,
			'dd254_date': $scope.dd254_date,
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


