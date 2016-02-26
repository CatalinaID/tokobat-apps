angular.module('starter.services', [])


.factory('ConnService', function($http, $q, $timeout) {
    var connectionEstablished = false;
    
    return {
        processPromise:function(promise) {
            return promise.then(
                function(response) {
                    if (typeof response.data == 'object') {
                        // correct response
                        connectionEstablished = true;
                        return response.data;
                    } 
                    else {
                        // invalid response
                        connectionEstablished = false;
                        return null;
                    }
                }, 
                function (response) {
                    // promise cannot be fulfilled
                    connectionEstablished = false;
                    return null;
                }
            );
        },
        
        isConnectionEstablished:function() {
            return connectionEstablished;
        }
    };
})

.factory('RestService', function($http,$q, ConnService, $rootScope) {
    //var REST_URL = 'http://192.168.43.116:8080/bandung-poi-api/';
    var REST_URL = 'http://tokobat-api.mybluemix.net/';
    //var REST_URL = 'http://localhost:8080/bandung-poi-api/';
    var URL = {
               'APOTEK_LIST' : REST_URL + '/apotek/list',
            };
    return {
        apotekList : function() {
            return ConnService.processPromise($http.get(URL['APOTEK_LIST']));
        },
    };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.factory('Pesanan', function() {
  var pesanan = {
    nama: '',
    apotek: '',
    uriimage: '',
  };
  return {
    getDetails: function() {
      return pesanan;
    },
    setDetails: function(nama, apotek) {
      
    },
    setNamaPesanan: function(_nama) {
      pesanan.nama = _nama;
    },
    getNamaPesanan: function() {
      return pesanan.nama;
    },
    setUriImage: function(_uri) {
      pesanan.uriimage = _uri;
    }, 
  };
})

.factory('ListPesanan', function() {
  var listpesanan = [];
  return {
    addToList: function(namaobat, jmlobat) {
      var pesanan = {
        nama: namaobat,
        jml: jmlobat,
      };
      listpesanan.push(pesanan);
    },
    getList: function() {
      return listpesanan;
    },
  };
});
