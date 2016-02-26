angular.module('starter.controllers',['uiGmapgoogle-maps', 'ngCordova'])

.controller('DashCtrl', function($scope) {
  
})

.controller('TransaksiCtrl', function($scope, Transaksi, ListTransaksi) {
  $scope.listtrans = ListTransaksi.getList();
  
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

.controller('GenerikCtrl', function($scope, Pesanan, ListPesanan) {
  $scope.psn = {};

  $scope.orders = ListPesanan.getList();
  $scope.setUpPesanan = function(name){
    console.log(name);
    Pesanan.setNamaPesanan(name);
    Pesanan.setUriImage($scope.uri);
  }

  $scope.addPesanan = function() {
    console.log($scope.psn.namaObat, $scope.psn.jmlObat);
    ListPesanan.addToList($scope.psn.namaObat, $scope.psn.jmlObat);
    console.log($scope.orders.length);
    $scope.psn.namaObat = " ";
    $scope.psn.jmlObat = " ";
  }

})

.controller('UploadCtrl', function($scope, Camera, $cordovaImagePicker, $ionicPlatform, Pesanan, RestService, ConnService) {
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
  })

  $scope.setUpPesanan = function(name){
    console.log(name);
    Pesanan.setNamaPesanan(name);
    Pesanan.setUriImage($scope.uri);
  }
  
})

.controller('FindApotekCtrl', function($scope, $state, Pesanan, RestService, ConnService, uiGmapGoogleMapApi) {
  $scope.namaPesanan = Pesanan.getNamaPesanan();

  var options = {timeout: 10000, enableHighAccuracy: true};
  var infowindow;
  $scope.circle;
  $scope.mylat;
  $scope.mylng;
  var pmarkersbound = [];
   $scope.apotekMarkers = [];

  $scope.loadLocation = function () { 
    RestService.apotekList().then( function (data) {
        $scope.apoteks = data;
         $scope.find();
    })
  };

  $scope.setMap = function() {
    $scope.mylat  = -6.224184;
        $scope.mylng = 106.807889;
        $scope.mylocation = {
          id: 0,
          coords: {
            latitude: $scope.mylat,
            longitude: $scope.lng,
          },
          options: { draggable: false,
            labelContent: "My Location",
                labelAnchor: "20 0",
                labelClass: "marker-labels",
               //icon: {url: "./img/marker.png" ,scaledSize: new google.maps.Size(30, 44)},
             },
        };
        $scope.map = {center: {latitude: $scope.mylat, longitude: $scope.mylng }, zoom: 14, bounds: {} };
        $scope.circle = 
        {
          id: 1,
          center: {
              latitude: $scope.mylat,
              longitude: $scope.mylng
          },
          radius: 1300,
          stroke: {
              color: '#07D5DC',
              weight: 1,
              opacity: 1
          },
          fill: {
              color: '#fff',
              opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: true, // optional: defaults to false
          clickable: true, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: true, // optional: defaults to true
          control: {},
          
          events:{
            radius_changed: function(){
                //$scope.apotekMarkers = [];  $scope.apotekMarkers.length=0;
                //pmarkersbound = []; pmarkersbound.length=0;
                $scope.find();
                
            },
            dragend: function(){
                //$scope.apotekMarkers = [];  $scope.apotekMarkers.length=0;
                //pmarkersbound = []; pmarkersbound.length=0;
                $scope.find();
                
            }
          } 
        };
        $scope.loadLocation();
        $scope.mylocation.coords.latitude = $scope.mylat;
        $scope.mylocation.coords.longitude = $scope.mylng;

  }

  $scope.setMap();
  /*

  $cordovaGeolocation
    .getCurrentPosition(options)
    .then(function (position) {
     //$scope.mylat  = position.coords.latitude;
     //$scope.mylng = position.coords.longitude;
        $scope.mylat  = -6.2243222;
        $scope.mylng = 107.8055823;
        $scope.mylocation = {
          id: 0,
          coords: {
            latitude: $scope.mylat,
            longitude: $scope.lng,
          },
          options: { draggable: false,
            labelContent: "My Location",
                labelAnchor: "20 0",
                labelClass: "marker-labels",
               //icon: {url: "./img/marker.png" ,scaledSize: new google.maps.Size(30, 44)},
             },
        };
        $scope.map = {center: {latitude: $scope.mylat, longitude: $scope.mylng }, zoom: 14, bounds: {} };
        $scope.circle = 
        {
          id: 1,
          center: {
              latitude: $scope.mylat,
              longitude: $scope.mylng
          },
          radius: 1300,
          stroke: {
              color: '#07D5DC',
              weight: 1,
              opacity: 1
          },
          fill: {
              color: '#fff',
              opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: true, // optional: defaults to false
          clickable: true, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: true, // optional: defaults to true
          control: {},
          
          events:{
            radius_changed: function(){
                //$scope.apotekMarkers = [];  $scope.apotekMarkers.length=0;
                //pmarkersbound = []; pmarkersbound.length=0;
                $scope.find();
                
            },
            dragend: function(){
                //$scope.apotekMarkers = [];  $scope.apotekMarkers.length=0;
                //pmarkersbound = []; pmarkersbound.length=0;
                $scope.find();
                
            }
          } 
        };
         $scope.loadLocation();
        $scope.mylocation.coords.latitude = $scope.mylat;
        $scope.mylocation.coords.longitude = $scope.mylng;

    }, function(err) {
      // error
      alert('Error fetching position');
    }); */


    var createMarker = function(i, scp, img, idKey) {
     
      if (idKey == null) {
        idKey = "id";
      }
      var ret = {
        id: i,
        latitude: scp[i].lat,
        longitude:  scp[i].lng,
        labelContent: scp[i].name,
        labelAnchor: "20 0",
        icon:{url: img, scaledSize: new google.maps.Size(30, 44) },
       
      };
      ret[idKey] = i;
      return ret;
    };


    var rad = function(x) {
      return x * Math.PI / 180;
    };

    var getDistance = function(p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat() - p1.lat());
      var dLong = rad(p2.lng() - p1.lng());
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    };

    $scope.find = function() {

      $scope.apotekMarkers = [];  $scope.apotekMarkers.length=0;
      
      var p2 = new google.maps.LatLng($scope.circle.center.latitude, $scope.circle.center.longitude);

       pmarkersbound = []; pmarkersbound.length=0;
          for (var i = 0; i < $scope.apoteks.length; i++) { 
            console.log("APOTEK "+$scope.apoteks[i].name)
              var p1 = new google.maps.LatLng($scope.apoteks[i].lat, $scope.apoteks[i].lng);
              if (getDistance(p1, p2)<$scope.circle.radius) {
                 console.log("MASUK "+$scope.apoteks[i].name)
                  pmarkersbound.push(createMarker(i, $scope.apoteks, "./img/hospital.png" ));
              }
          }
          $scope.apotekMarkers = pmarkersbound; 
       
    };
})

.controller('AddNoteCtrl', function($scope, Pesanan) {
  $scope.namaPesanan = Pesanan.getNamaPesanan();
});
