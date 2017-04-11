var app = angular.module('myApp', []);

var types = {
	'travel_id': 'Integer',
	'contr_id': 'String',
	'destination': 'String',
	'travel_begin_date': 'TimeStamp',
	'travel_end_date': 'TimeStamp',
	'tech_restrict_cd': 'String',
	'recv_travel_brief': 'String',
}

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
	$scope.myFunction = function() {
		var pageData = {
			table: 'travel', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
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
	
	////// EDITING RESULTS //////
	$scope.newField = {};
    $scope.editing = false;

	$scope.editResults = function(field) {
		$scope.editing = $scope.myResults.indexOf(field);
		$scope.newField = angular.copy(field);
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'travel',
		}
		
		editData.original =	$scope.newField;
		editData.updated = $scope.myResults[$scope.editing];
		editData.types = types;
		
		if ($scope.editing !== false) {
			//$scope.myResults[$scope.editing] = $scope.newField;
			//$scope.editing = false;
			console.log(editData);
			
			$http({
				method : 'POST',
				url : 'DatabaseUpdateHandler',
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
	////// END EDITING RESULTS //////
	
});

app.controller('addCtrl', function($scope, $http) { 
	$scope.addFunction = function() {
		
		//CHANGE THESE: ORDER ORDER IS (NAME OF COLUMN FROM DATABASE): $SCOPE.(NAME OF COLUMN FROM DATABASE)
		var addData = {
			'table': 'travel', 
		};
		
		addData.values = {
			'travel_id': $scope.travel_id,
			'contr_id': $scope.contr_id,
			'destination': $scope.destination,
			'travel_begin_date': $scope.travel_begin_date,
			'travel_end_date': $scope.travel_end_date,
			'tech_restrict_cd': $scope.tech_restrict_cd,
			'recv_travel_brief': $scope.recv_travel_brief,
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
			}, function (error) {
				console.log(error);
		});	
		
	}	
});


