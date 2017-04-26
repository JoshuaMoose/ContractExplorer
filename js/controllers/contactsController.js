var app = angular.module('myApp', []);

$(document).ready(function(){
	$('#cont_id').tooltip({'trigger':'focus', 'title': 'Required Field. should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#cont_org_id').tooltip({'trigger':'focus', 'title': 'Required Field. should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#cont_role_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_first_name').tooltip({'trigger':'focus', 'title': 'Required Field. should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_middle_name').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_last_name').tooltip({'trigger':'focus', 'title': 'Required Field. should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_name_title').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_name_suffix').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_addr1').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_addr2').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_city').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_state_prov_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_post_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_cntry_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_office_phone').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_mobile_phone').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_home_phone').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#cont_email').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});	
	$('#cont_alt_email').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	
});

var types = {
	'cont_id': "Integer",
	'cont_org_id': "Integer",
	'cont_role_cd': "String",
	'cont_first_name': "String",
	'cont_middle_name': "String",
	'cont_last_name': "String",
	'cont_name_title': "String",
	'cont_name_suffix': "String",
	'cont_addr1': "String",
	'cont_addr2': "String",
	'cont_city': "String",
	'cont_state_prov_cd': "String",
	'cont_post_cd': "String",
	'cont_cntry_cd': "String",
	'cont_office_phone': "String",
	'cont_mobile_phone': "String",
	'cont_home_phone': "String",
	'cont_email': "String",
	'cont_alt_email': "String",
}

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
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
	////// END RESULTS //////
	
	$scope.refreshSearch = function() {
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
		$('.edit_cont_id').tooltip({'trigger':'focus', 'title': 'Required Field. should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_cont_org_id').tooltip({'trigger':'focus', 'title': 'Required Field. should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_cont_role_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_first_name').tooltip({'trigger':'focus', 'title': 'Required Field. should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_middle_name').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_last_name').tooltip({'trigger':'focus', 'title': 'Required Field. should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_name_title').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_name_suffix').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_addr1').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_addr2').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_city').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_state_prov_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_post_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_cntry_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_office_phone').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_mobile_phone').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_home_phone').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_cont_email').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});	
		$('.edit_cont_alt_email').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		
		
		$scope.editing = $scope.myResults.indexOf(field);
		$scope.newField = angular.copy(field);
		$scope.myResults.editing = false;
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'contacts',
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
				'table': 'contacts', 
			};
			
			addData.values = {
				'cont_id': $scope.cont_id,
				'cont_org_id': $scope.cont_org_id,
				'cont_role_cd': $scope.cont_role_cd,
				'cont_first_name': $scope.cont_first_name,
				'cont_middle_name': $scope.cont_middle_name,
				'cont_last_name': $scope.cont_last_name,
				'cont_name_title': $scope.cont_name_title,
				'cont_name_suffix': $scope.cont_name_suffix,
				'cont_addr1': $scope.cont_addr1,
				'cont_addr2': $scope.cont_addr2,
				'cont_city': $scope.cont_city,
				'cont_state_prov_cd': $scope.cont_state_prov_cd,
				'cont_post_cd': $scope.cont_post_cd,
				'cont_cntry_cd': $scope.cont_cntry_cd,
				'cont_office_phone': $scope.cont_office_phone,
				'cont_mobile_phone': $scope.cont_mobile_phone,
				'cont_home_phone': $scope.cont_home_phone,
				'cont_email': $scope.cont_email,
				'cont_alt_email': $scope.cont_alt_email,
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
				$('#addSuccessModal').modal('show');
				
				$scope.cont_id = null;
				$scope.cont_org_id = null;
				$scope.cont_role_cd = null;
				$scope.cont_first_name = null;
				$scope.cont_middle_name = null;
				$scope.cont_last_name = null;
				$scope.cont_name_title = null;
				$scope.cont_name_suffix = null;
				$scope.cont_addr1 = null;
				$scope.cont_addr2 = null;
				$scope.cont_city = null;
				$scope.cont_state_prov_cd = null;
				$scope.cont_post_cd = null;
				$scope.cont_cntry_cd = null;
				$scope.cont_office_phone = null;
				$scope.cont_mobile_phone = null;
				$scope.cont_home_phone = null;
				$scope.cont_email = null;
				$scope.cont_alt_email = null;
				
				}, function (error) {
					console.log(error);
			});	
		}
	}	
});


