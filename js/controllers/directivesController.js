var app = angular.module('myApp', []);

var types = {
	'dir_id': "String",
	'dir_contr_id': "String",
	'dir_desc': "String",
	'dir_issued_by': "Integer",
	'dir_issued_date': "TimeStamp",
	'dir_recv_by': "Integer",
	'dir_recv_date': "TimeStamp",
}

$(document).ready(function(){
	$('#dir_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#dir_contr_id').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#dir_desc').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#dir_issued_by').tooltip({'trigger':'focus', 'title': 'Required Field.  Should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#dir_issued_date').tooltip({'trigger':'focus', 'title': 'Required Field. Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'right'});
	$('#dir_recv_by').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#dir_recv_date').tooltip({'trigger':'focus', 'title': 'Required Field. Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'right'});
	
});

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
	$scope.myFunction = function() {
		var pageData = {
			table: 'directives', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
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
		
		$('.edit_dir_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_dir_contr_id').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_dir_desc').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_dir_issued_by').tooltip({'trigger':'focus', 'title': 'Required Field.  Should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_dir_issued_date').tooltip({'trigger':'focus', 'title': 'Required Field. Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'bottom'});
		$('.edit_dir_recv_by').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_dir_recv_date').tooltip({'trigger':'focus', 'title': 'Required Field. Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'bottom'});
	
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'directives',
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
			'table': 'contacts', 
		};
		
		addData.values = {
			'dir_id': $scope.dir_id,
			'dir_contr_id': $scope.dir_contr_id,
			'dir_desc': $scope.dir_desc,
			'dir_issued_by': $scope.dir_issued_by,
			'dir_issued_date': $scope.dir_issued_date,
			'dir_recv_by': $scope.dir_recv_by,
			'dir_recv_date': $scope.dir_recv_date,
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


