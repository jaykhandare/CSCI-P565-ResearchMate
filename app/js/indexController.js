myApp.controller('indexController', ['$scope','$location','$cookies', function ($scope, $location,$cookies) {
  $scope.searchQuery = function(){

    if($scope.searchStr.indexOf('=')!=-1){
      alert("Possible attempt of SQL Injection. Request blocked!");
      return;

    }
    $location.path("/search/").search({'searchStr':$scope.searchStr})
  };
  var url = $location.path().split('/');
  $scope.username = url[2];

 $scope.redirectChat = function(){
   $location.path('/chat/'+$scope.username);
 }
 
  $scope.signOut = function() {

window.location.href="http://localhost/researchmate";
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        auth2.disconnect();
        console.log('User signed out.');

      });
    }


}]);
