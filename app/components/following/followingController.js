myApp.controller('followingController', ['$scope', '$http', 'URL','$cookies','$location', function ($scope, $http, URL,$cookies,$location) {
    var self=$scope;
    var sessionString = $cookies.get('sessionString');
    var url = $location.path().split('/');
    if(url.length==3 && url[2]!="")
      $scope.username = url[2];
    else {
      $scope.username = $cookies.get('username');
    }

    $http({
        url: "http://silo.soic.indiana.edu:54545/getUserFollowers",
        method: "POST",
        data: {
          'username':self.username,
          'sessionString': sessionString
      },

    }).then(function success(response){
      if(response.status == 200){
        if(response.data.status == false && response.data.msg!=undefined && response.data.msg!="")
          alert(response.data.msg);
        else{
          self.followerInfo = response.data.msg.userInfo;
        }
      }
    },
    function error(response){

    }
    );

}]);
