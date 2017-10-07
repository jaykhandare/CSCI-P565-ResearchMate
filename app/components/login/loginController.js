var myApp = angular.module('loginApp',[]);

myApp.controller('loginController', ['$scope','$http','$location', function($scope,$http, $location) {
  var self=$scope;
    $scope.submit = function(){
      console.log($scope.email);
      console.log($scope.pwd);
      $http.get('https://jsonplaceholder.typicode.com/posts/1').then(function(response) {


      });
    }

    $scope.redirectSignup = function(){
      window.location.href = "../signup/signup.html";
    } // end of redirectSignup fucntion


}]);
