angular.module('starter.services', [])

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
})

.factory('Transaksi', function() {
  var transaksi = {
    id: '',
    nama: '',
    statusT: '',
    tanggal: '',
    detail: '',
  }
  return {
    getTransaksi: function() {
      return transaksi;
    },
    setTransaksi: function(_nama, _status, _tanggal, _detail) {
      transaksi.nama = _nama;
      transaksi.statusT = _status;
      transaksi.tanggal = _tanggal;
      transaksi.detail = _detail; 
    },
    getStatusT: function() {
      return transaksi.statusT;
    }
  };
})

.factory('ListTransaksi', function(Transaksi) {
  var listTransaksi = [{
    id: 0,
    nama: 'Order 1',
    statusT: 'DECLINED',
    tanggal: '19-2-2015',
    detail: 'Obat Cacing (2)',
  }, {
    id: 1,
    nama: 'Order 2',
    statusT: 'FINISHED',
    tanggal: '17-4-2015',
    detail: 'Konidin (4), Komix (3)',
  }, {
    id: 2,
    nama: 'Order 3',
    statusT: 'PAID',
    tanggal: '31-5-2015',
    detail: 'Entrostop (1)',
  }, {
    id: 3,
    nama: 'Order 4',
    statusT: 'ACCEPTED',
    tanggal: '2-9-2015',
    detail: 'EnervonC (2), Antangin (5)',
  }, {
    id: 4,
    nama: 'Order 5',
    statusT: 'WAITING',
    tanggal: '18-10-2015',
    detail: 'OBH Herbal (1)',
  },

  ];
  return {
    addToList: function(trans) {
      listTransaksi.push(trans);
    },
    getList: function() {
      return listTransaksi;
    },
    remove: function(trans) {
      listTransaksi.splice(listTransaksi.indexOf(trans), 1);
    },
  };
});
