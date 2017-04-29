var app = angular.module('myApp', []);

var types = {
	'org_id': "Integer",
	'org_type_cd': "String",
	'org_name': "String",
	'org_div': "String",
	'org_addr1': "String",
	'org_addr2': "String",
	'org_city': "String",
	'org_state_prov_cd': "String",
	'org_post_cd': "String",
	'org_cntry_cd': "String",
	'cage_cd': "String",
}

$(document).ready(function(){
	$('#org_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#org_type_cd').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 50 characters.', 'placement': 'right'});
	$('#org_name').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_div').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_addr1').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_addr2').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_city').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_state_prov_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_post_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#org_cntry_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cage_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	
});

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
	$scope.myFunction = function() {
		var pageData = {
			table: 'organizations', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
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
		
		$('.edit_org_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_org_type_cd').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 50 characters.', 'placement': 'bottom'});
		$('.edit_org_name').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_div').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_addr1').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_addr2').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_city').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_state_prov_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_post_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_org_cntry_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cage_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
			
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'organizations',
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
			'table': 'organizations', 
		};
		
		addData.values = {
			'org_id': $scope.org_id,
			'org_type_cd': $scope.org_type_cd,
			'org_name': $scope.org_name,
			'org_div': $scope.org_div,
			'org_addr1': $scope.org_addr1,
			'org_addr2': $scope.org_addr2,
			'org_city': $scope.org_city,
			'org_state_prov_cd': $scope.org_state_prov_cd,
			'org_post_cd': $scope.org_post_cd,
			'org_cntry_cd': $scope.org_cntry_cd,
			'cage_cd': $scope.cage_cd,
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


