angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(username, password) {
    console.log(username);
    console.log(password);
    if (username == 'Hayyu' && password == 'password') {
      $state.go('tab.dash');
    } 
  };
  
})

.controller('SearchCtrl', function($scope) {

})

.controller('UploadCtrl', function($scope, Camera, $cordovaImagePicker, $ionicPlatform) {
  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.uri = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  }

  $ionicPlatform.ready(function() {
    $scope.pickPhoto = function() {
      var options = {
        maximumImagesCount: 1,
        width: 320,
        height: 320,
        quality: 75
      };

      $cordovaImagePicker.getPictures(options).then(function (results) {
        for (var i = 0; i < results.length; i++) {
          $scope.uri = results[i];
        }
      }, function(err) {
        console.err(err);
      });
    };
  });

  
});

