var app = angular.module('myApp', []);

$(document).ready(function(){
	$('#dev_id').tooltip({'trigger':'focus', 'title': 'Required Field. Must be an integer with 9 digits or less.', 'placement': 'right'});
	$('#dev_type').tooltip({'trigger':'focus', 'title': 'Required Field. Must be a string shorter than 256 characters.', 'placement': 'right'});
	$('#dev_desc').tooltip({'trigger':'focus', 'title': 'Required Field. Must be a string shorter than 256 characters.', 'placement': 'right'});
	$('#dev_owner_id').tooltip({'trigger':'focus', 'title': 'Required Field. Must be an integer with 9 digits or less.', 'placement': 'right'});
	$('#dev_user_id').tooltip({'trigger':'focus', 'title': 'Required Field. Must be an integer with 9 digits or less.', 'placement': 'right'});
	$('#dev_sn').tooltip({'trigger':'focus', 'title': 'Must be a string shorter than 256 characters.', 'placement': 'right'});
});
	
var types = {
	'dev_id': 'Integer',
	'dev_type': 'String',
	'dev_desc': 'String',
	'dev_owner_id': 'Integer',
	'dev_user_id': 'Integer',
	'dev_sn': 'String',	
}

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
	$scope.myFunction = function() {
		
		var pageData = {
			table: 'devices', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
		};		
		
		$http({
			method : 'POST',
			url : 'DatabaseSearchHandler',
			contentType: 'application/json',
			data : pageData,
		})
		.then(function (response) {
			$scope.myResults = response.data;

			console.log($scope.myResults);
			console.log('Data loaded.');
		}, function (error) {
				console.log(error);
		});	
	}
	////// END RESULTS //////
	
	$scope.refreshSearch = function() {
		var pageData = {
			table: 'devices', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
		};		
		
		$http({
			method : 'POST',
			url : 'DatabaseSearchHandler',
			contentType: 'application/json',
			data : pageData,
		})
		.then(function (response) {
			$scope.myResults = response.data;
			
			console.log($scope.myResults);
			console.log('Data loaded.');
		}, function (error) {
				console.log(error);
		});	
		
	}
	
	////// EDITING RESULTS //////
	$scope.newField = {};
    $scope.editing = false;

	$scope.editResults = function(field) {
		
		$('#edit_dev_id').tooltip({'trigger':'focus', 'title': 'Required Field. Must be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('#edit_dev_type').tooltip({'trigger':'focus', 'title': 'Required Field. Must be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('#edit_dev_desc').tooltip({'trigger':'focus', 'title': 'Required Field. Must be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('#edit_dev_owner_id').tooltip({'trigger':'focus', 'title': 'Required Field. Must be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('#edit_dev_user_id').tooltip({'trigger':'focus', 'title': 'Required Field. Must be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('#edit_dev_sn').tooltip({'trigger':'focus', 'title': 'Must be a string shorter than 256 characters.', 'placement': 'bottom'});
		
		$scope.editing = $scope.myResults.indexOf(field);
		$scope.newField = angular.copy(field);
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'devices',
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
		if ($scope.addForm.$invalid ) {
			$('#addErrorsModal').modal('show');
		} else {
			//CHANGE THESE: ORDER ORDER IS (NAME OF COLUMN FROM DATABASE): $SCOPE.(NAME OF COLUMN FROM DATABASE)
			var addData = {
				'table': 'devices', 
			};
			
			addData.values = {
				'dev_id': $scope.dev_id,
				'dev_type': $scope.dev_type,
				'dev_desc': $scope.dev_desc,
				'dev_owner_id': $scope.dev_owner_id,
				'dev_user_id': $scope.dev_user_id,
				'dev_sn': $scope.dev_sn,
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
				console.log(addData);
				}, function (error) {
					console.log(error);
			});	
		}
	}	
});


