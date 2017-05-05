var app = angular.module('myApp', []);

var types = {
	'rel_id': "Integer",
	'dir_id': "String",
	'rel_by': "Integer",
	'rel_date': 'TimeStamp',
	'recv_by': 'Integer',
	'recv_date': 'TimeStamp',
	'rel_cntry_cd': 'String',
}
/////////////////////////////// Directive to clear fields when they are empty (set them from "" to null)//////////////////////(
app.directive('deleteIfEmpty', function () {
    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch("ngModel", function (newValue, oldValue) {
                if (typeof scope.ngModel !== 'undefined' && scope.ngModel.length === 0) {
                    delete scope.ngModel;
                }
            });
        }
    };
});

$(document).ready(function(){
	$('#rel_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#dir_id').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#rel_by').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#rel_date').tooltip({'trigger':'focus', 'title': 'Required Field.  Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'right'});
	$('#recv_by').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#recv_date').tooltip({'trigger':'focus', 'title': 'Required Field. Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'right'});
	$('#rel_cntry_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	
});

app.controller('searchCtrl', function($scope) {
    $scope.searchParameter = "";
	$scope.searchKeyword = "";
});

app.controller('resultsCtrl', function($scope, $http) { //On button click this function will populate table
	////// GET RESULTS //////
	$scope.myFunction = function() {
		var pageData = {
			table: 'releases', //CHANGE THIS TO NAME OF TABLE (CHECK ACCESS FOR TABLE NAME)
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
			$('#search').collapse("show");
		}, function (error) {
				console.log(error);
		});	
	}
	////// END RESULTS //////
	////// Clear search filter ////// ************************************** Add this to all pages, adapt it to the filter inputs on the page
	$scope.clearFilters = function () {
		delete $scope.f.rel_id;
		delete $scope.f.dir_id;
		delete $scope.f.rel_by;
		delete $scope.f.rel_date;
		delete $scope.f.recv_by;
		delete $scope.f.recv_date;
		delete $scope.f.rel_cntry_cd;

	}
	////// End clear search filters //////
	////// EDITING RESULTS //////
	$scope.newField = {};
    $scope.editing = false;

	$scope.editResults = function(field) {
		$scope.editing = $scope.myResults.indexOf(field);
		$scope.newField = angular.copy(field);
		
		$('.edit_rel_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_dir_id').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_rel_by').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_rel_date').tooltip({'trigger':'focus', 'title': 'Required Field.  Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'bottom'});
		$('.edit_recv_by').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_recv_date').tooltip({'trigger':'focus', 'title': 'Required Field. Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'bottom'});
		$('.edit_rel_cntry_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
	
	}

	$scope.saveField = function(index) {		
		var editData = {
			'table': 'releases',
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
				'table': 'releases', 
			};
			
			addData.values = {
				'rel_id': $scope.rel_id,
				'dir_id': $scope.dir_id,
				'rel_by': $scope.rel_by,
				'rel_date': $scope.rel_date,
				'recv_by': $scope.recv_by,
				'recv_date': $scope.recv_date,
				'rel_cntry_cd': $scope.rel_cntry_cd,
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
	}	
});


