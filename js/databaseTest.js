app.controller('MyController', function($scope, $http) {

    $scope.login = function() {
        console.log($scope.user);
        $http({
            method : 'POST',
            url : 'login',
            data : $scope.user,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
            console.log(data);
        }).error(function(data) {
            console.log(data);
        });
        console.log("POST done");
    };
});