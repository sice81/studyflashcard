define(['angular'], function (angular) {
  'use strict';

  // Facebbok OAuth init
  window.fbAsyncInit = function () {
    FB.init({
      appId      : FACEBOOK_APP_ID, // Replace the App ID with yours
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  // Facebbok OAuth init - END

//  // Google OAuth Init
//  (function () {
//    var po = document.createElement('script');
//    po.type = 'text/javascript';
//    po.async = true;
//    po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
//    var s = document.getElementsByTagName('script')[0];
//    s.parentNode.insertBefore(po, s);
//  })();
//
//  function onLoadCallback() {
//    // Replace the API key with yours
//    gapi.client.setApiKey('AIzaSyC5JgBIrjOGKDAIZLcsVHvgkjjGkkrZTqk');
//    gapi.client.load('plus', 'v1', function () {
//    });
//  }
//  // Google Oauth Init - END
});
