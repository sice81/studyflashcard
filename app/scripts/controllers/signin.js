define(['angular', 'app', 'oauth-facebook'], function (angular, app) {
  'use strict';

  app.controller('SigninCtrl', function ($rootScope, $scope, $state, $http, $window, $httpParamSerializerJQLike, SessionService, $ionicLoading) {
    console.log('SigninCtrl');

    function req(accessToken, userId) {
      return $http({
        url: API_URL + 'api/auth/facebook',
        method: 'POST',
        data: $httpParamSerializerJQLike({accessToken: accessToken, userId: userId}), // Make sure to inject the service
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
        }
      });
    }

    function goLogin() {
      FB.login(function (response) {
        console.log('FB.login', response);

        var status = response.status;
        var auth = response.authResponse;

        if (auth) {
          if (status === 'connected') {
            req(auth.accessToken, auth.userID);
          } else {
            console.log('status=' + status);
          }
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, {scope: 'email,user_photos,user_videos'});
    }

    $scope.signInFacebook = function () {
      FB.getLoginStatus(function (response) {
        console.log('FB.getLoginStatus', response);

        $ionicLoading.show({
          template: '인증 중 입니다.'
        });

        var status = response.status;
        var auth = response.authResponse;

        if (auth) {
          if (status === 'connected') {
            req(auth.accessToken, auth.userID)
              .success(function (response) {
                if (response.result) {
                  SessionService.isAnonymus = false;
                  SessionService.saveUserId(response.userId);
                  SessionService.saveToken(response.accessToken);
                  //$state.go('tab.dashboard');
                  //$rootScope.$broadcast('login:hide');
                  $window.location.reload(true);
                }
              })
              .error(function(){
                $ionicLoading.show();
              })
              .finally(function(){
                $ionicLoading.hide();
              });
          } else {
            goLogin();
          }
        } else {
          goLogin();
        }
      });

      function getUserInfo() {
        // get basic info
        FB.api('/me', function (response) {
          console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
          // get profile picture
          FB.api('/me/picture?type=normal', function (picResponse) {
            console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
            response.imageUrl = picResponse.data.url;
            // store data to DB - Call to API
            // Todo
            // After posting user data to server successfully store user data locally
            var user = {};
            user.name = response.name;
            user.email = response.email;
            if (response.gender) {
              response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
            } else {
              user.gender = '';
            }
            user.profilePic = picResponse.data.url;
            $cookieStore.put('userInfo', user);
            $state.go('dashboard');

          });
        });
      }
    };

    // Google Plus Login
    $scope.signInGooglePlus = function () {
      var myParams = {
        // Replace client id with yours
        'clientid': '839793195861-odtomkdotvo8riocvafprum6n1903s2h.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': loginCallback,
        'approvalprompt': 'force',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
      };
      gapi.auth.signIn(myParams);

      function loginCallback(result) {
        if (result['status']['signed_in']) {
          var request = gapi.client.plus.people.get({'userId': 'me'});
          request.execute(function (resp) {
            console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
            var userEmail;
            if (resp['emails']) {
              for (var i = 0; i < resp['emails'].length; i++) {
                if (resp['emails'][i]['type'] == 'account') {
                  userEmail = resp['emails'][i]['value'];
                }
              }
            }
            // store data to DB
            var user = {};
            user.name = resp.displayName;
            user.email = userEmail;
            if (resp.gender) {
              resp.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
            } else {
              user.gender = '';
            }
            user.profilePic = resp.image.url;
            $cookieStore.put('userInfo', user);
            $state.go('dashboard');
          });
        }
      }
    };
    // END Google Plus Login

    $scope.signIn = function (user) {
      //$state.go('tab.dashboard');

      $http({
        url: 'http://127.0.0.1:8080/api/auth/signin',
        method: "POST",
        data: {userId: user.userId, password: user.password},
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });

      //$http.post('http://127.0.0.1:8080/api/auth/siginin', {userId: user.userId, password: user.password}).
      //  success(function (data, status, headers, config) {
      //  }).
      //  error(function (data, status, headers, config) {
      //  });
    };
  });
});
