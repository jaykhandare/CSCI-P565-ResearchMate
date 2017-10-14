var myApp = angular.module('loginApp',['ngCookies']);
myApp.config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});
myApp.controller('loginController',function($scope,$http, $location, $cookies, $cookieStore) {
  var self=$scope;
  onSignIn = function(googleUser){
    var profile = googleUser.getBasicProfile();
  }
    $scope.submit = function(){
      var username = $scope.username;
      var password = $scope.pwd;
      $http({
        url: "http://silo.soic.indiana.edu:54545/verifyLogin",
        method: "POST",
        data: {
          'username':username,
          'password':password
      },

      }).then(function success(response){
        if(response.status==200){
          if(response.data.status=="false"){
            if(response.data.msg!="")
              alert(response.data.msg)
          }
          else{
            $cookies.put('sessionString', response.data.msg)
          }
        }
      },
      function error(response){
        alert("Error occured while authenticating user");
      }
    );
  };
    /**
     * [sendUsername Function that accepts email address and sends username if authentic user]
     * @type {[Useremail]}
     */
    $scope.sendUsername = function(){
      var email = $scope.useremail;
      if(email.trim()!=""){
        $http({
          url: "http://silo.soic.indiana.edu:54545/forgetUsername",
          method: "POST",
          data: {
            'email':email,
        },

        }).then(function success(response){
          if(response.status==200){
            if(response.data.status=="false"){
              if(response.data.msg!="")
                alert(response.data.msg)
            }
            else{
              alert("Please check your email for username")
            }
          }
        },
        function error(response){
          alert("Error occured while sending username");
        }
      );
      }
      else{
        alert("Please enter email address");
      }
    };

    /**
     * [sendPassword Function that accepts either email or username and sends password reset link to user]
     * @type {[type]}
     */
    $scope.sendPassword = function(){
      var email = $scope.pwdemail.trim();
      var username = $scope.pwdusername.trim();
      if(email!="" || username!=""){
        var input = email?email!="":username;
        $http({
          url: "http://silo.soic.indiana.edu:54545/forgetPassword",
          method: "POST",
          data: {
            'input':input,
        },

        }).then(function success(response){
          if(response.status==200){
            if(response.data.status=="false"){
              if(response.data.msg!="")
                alert(response.data.msg)
            }
            else{
              alert("Please check your email to reset your password")
            }
          }
        },
        function error(response){
          alert("Error occured while sending password");
        }
      );
      }
      else{
        alert("Please enter email address");
      }
    };

    /**
     * [updatePassword Function to update the password]
     * @type {[type]}
     */
    $scope.updatePassword = function(){
      var password = $scope.password.trim();
      var repassword = $scope.repassword.trim();
      var sessionStr = $location.search().sessionstring;
      if(sessionStr == undefined || sessionStr.trim()==""){
        alert("Unable to get session string");
        return;
      }
      if(password!="" && repassword!=""){
        if(password==repassword){
          $http({
            url: "http://silo.soic.indiana.edu:54545/updatePassword",
            method: "POST",
            data: {
              'sessionString':sessionString,
              'password': password
          },

          }).then(function success(response){
            if(response.status==200){
              if(response.data.status=="false"){
                if(response.data.msg!="")
                  alert(response.data.msg)
              }
              else{
                alert("Please check your email to reset your password")
              }
            }
          },
          function error(response){
            alert("Error occured while updating password");
          }
        );
        }
        else{
          alert("Password does not match");
        }
      }
      else {
        alert("Please enter password");
      }
    }

    /**
     * [redirectSignup Function to redirect user to sign up page]
     * @return {[type]} [description]
     */
    $scope.redirectSignup = function(){
      window.location.href = "../signup/signup.html";
    } // end of redirectSignup fucntion

});
