angular.module('starter', ['ionic', 'ngCordova', 'ionic.service.core', 'ionic.service.analytics', 'ionic.service.push', 'ionic.service.deploy'])
  .config(function($ionicAppProvider) {

    // Our app is already uploaded to apps.ionic.io
    // So lets grab the app ID and the API Key
    // http://docs.ionic.io/v1.0/docs/io-quick-start
    $ionicAppProvider.identify({
      app_id: 'ca7fc129',
      api_key: 'e9dd29d32fe789eaa4018e35375ffb90c48977ffcae7bdc2',
    });

  })
  .run(function($ionicDeploy, $ionicPlatform, $ionicAnalytics, $ionicPush, $ionicUser) {
    $ionicPlatform.ready(function() {

      // We can start to regester for analytics
      // by just callionic $ionicAnalytics.register()
      // with this, we can start track by attaching this directive
      // to the body element, <body ng-app="starter" ion-track-auto="">
      // or start to track specific events with ion-track-[event]
      // We can even pass in data,  ion-track-data="{location: 'Beantown';}"
      // http://docs.ionic.io/v1.0/docs/analytics-from-scratch
      $ionicAnalytics.register();

      // The term users is used loosely here.
      // This is just a way to  collect some data
      // about the people using the app.
      // We can start to add some promises if you want
      // but that is optional.
      // http://docs.ionic.io/v2.0/docs/user-quick-start
      $ionicUser.identify({
          user_id: device.uuid,
          name: 'Name',
        }).then(function() {

        }),
        function(err) {

        };

      // Ionic Push provides many options that you can configure
      // when registering fro push. All of these are optional and
      // can be skipped by calling $ionicPush.register();
      // $ionicPush.register({
      //   canShowAlert: true, //Can pushes show an alert on your screen?
      //   canSetBadge: true, //Can pushes update app icon badges?
      //   canPlaySound: true, //Can notifications play a sound?
      //   canRunActionsOnWake: true, //Can run actions outside the app,
      //   onNotification: function(notification) {
      //     // Handle new push notifications here
      //     // console.log(notification);
      //     return true;
      //   }
      // });
      //
      // http://docs.ionic.io/v1.0/docs/push-from-scratch
      $ionicPush.register();
    });
  })

.controller('MainCtrl', function($scope, $ionicDeploy, $ionicLoading) {
  // Update app code with new release from Ionic Deploy
  // Deploy allows us to fetch new code from the apps server
  // and bypass the app store submission process. This allows
  // changes to be made quickly and not wait for your app to be
  // approved.
  // Deploy can start a watch for any new updates to be uploaded
  // or can be called directly to check for updates. The dowloading
  // and handling of the update is all managed through a native pluing
  // http://docs.ionic.io/v1.0/docs/deploy-from-scratch
  $scope.doUpdate = function() {
    $ionicLoading.show();
    $ionicDeploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
      $ionicLoading.hide();
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {

    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    $ionicLoading.show();
    $ionicDeploy.check().then(function(hasUpdate) {
      $ionicLoading.hide();
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      $ionicLoading.hide();
    });
  };
});
