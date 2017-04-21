var app = angular.module('myApp', []);

var types = {
	'contr_id': 'String',
	'contr_org_id': 'Integer',
	'contr_end_cust_id': 'Integer',
	'contr_type_cd': 'String',
	'prime_contr_id': 'Integer',
	'prime_contract_no': 'String',
	'contr_prog_cd': 'String',
	'contr_vehicle_cd': 'String',
	'contr_sec_level_cd': 'String',
	'contr_info_safe_level_cd': 'String',
	'contr_open_date': 'TimeStamp',
	'contr_close_date': 'TimeStamp',
	'is_open': 'Boolean',
	'exemptions': 'String',
	'dd254_recv': 'Boolean',
	'dd254_date': 'TimeStamp',
}

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
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
	
	////// END RESULTS //////
	
	
	///// REFRESH RESULTS //////
	$scope.refreshSearch = function() {
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
	///// END REFRESH RESULTS
	
	
	////// EDITING RESULTS //////
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
		
		editData.original =	$scope.newField;
		editData.updated = $scope.myResults[$scope.editing];
		editData.types = types;
		
		//$scope.myResults[$scope.editing] = $scope.newField;
		//$scope.editing = false;
		console.log(editData);
			
		$http({
			method : 'POST',
			url : 'DatabaseUpdateHandler',
			contentType: 'application/json',
			data : editData,
		})
			       
	};

	$scope.cancel = function(index) {
		if ($scope.editing !== false) {
			$scope.myResults[$scope.editing] = $scope.newField;
			$scope.editing = false;
		}
	};
	////// END EDITING RESULTS //////
});

app.controller('addCtrl', function($scope, $http) { 
	
	$scope.addFunction = function() {
		
		//CHANGE THESE: ORDER ORDER IS (NAME OF COLUMN FROM DATABASE): $SCOPE.(NAME OF COLUMN FROM DATABASE)
		var addData = {
			'table': 'contracts',
		};
		
		addData.values = {
			'contr_id': $scope.contr_id,
			'contr_org_id': $scope.contr_org_id,
			'contr_end_cust_id': $scope.contr_end_cust_id,
			'contr_type_cd': $scope.contr_type_cd,
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
		}
		addData.types = types;
		
		$http({
			method : 'POST',
			url : 'DatabaseInsertHandler',
			contentType: 'application/json',
			data : addData,
		})
		.then(function (response) {
			//$scope.myResults = response.data;
			console.log('Item Added.');
			console.log(addData);
			}, function (error) {
				console.log(error);
		});	
		
	}	
});


