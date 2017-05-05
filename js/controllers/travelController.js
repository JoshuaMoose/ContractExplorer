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
	$('#travel_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'right'});
	$('#contr_id').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#destination').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#travel_begin_date').tooltip({'trigger':'focus', 'title': 'Required Field.  Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'right'});
	$('#travel_end_date').tooltip({'trigger':'focus', 'title': 'Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'right'});
	$('#tech_restrict_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	$('#recv_travel_brief').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'right'});
	
});

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
			$('#search').collapse("show");
		}, function (error) {
				console.log(error);
		});	
	}
	////// END RESULTS //////
	////// Clear search filter ////// ************************************** Add this to all pages, adapt it to the filter inputs on the page
	$scope.clearFilters = function () {
		delete $scope.f.travel_id;
		delete $scope.f.contr_id;
		delete $scope.f.destination;
		delete $scope.f.travel_begin_date;
		delete $scope.f.travel_end_date;
		delete $scope.f.tech_restrict_cd;
		delete $scope.f.recv_travel_brief;
	}
	////// End clear search filters //////
	////// EDITING RESULTS //////
	$scope.newField = {};
    $scope.editing = false;

	$scope.editResults = function(field) {
		$scope.editing = $scope.myResults.indexOf(field);
		$scope.newField = angular.copy(field);
		
		$('.edit_travel_id').tooltip({'trigger':'focus', 'title': 'Required Field. Should be an integer with 9 digits or less.', 'placement': 'bottom'});
		$('.edit_contr_id').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_destination').tooltip({'trigger':'focus', 'title': 'Required Field. Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_travel_begin_date').tooltip({'trigger':'focus', 'title': 'Required Field.  Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'bottom'});
		$('.edit_travel_end_date').tooltip({'trigger':'focus', 'title': 'Timestamp in the format of yyyy-dd-mm hh:mm:ss.', 'placement': 'bottom'});
		$('.edit_tech_restrict_cd').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
		$('.edit_recv_travel_brief').tooltip({'trigger':'focus', 'title': 'Should be a string shorter than 256 characters.', 'placement': 'bottom'});
	
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
		
		if ($scope.addForm.$invalid ) {
			$('#addErrorsModal').modal('show');
		} else {
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
		
	}	
});


