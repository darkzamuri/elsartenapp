angular.module('app.controllers', ['ionic.cloud', 'angular-repeat-n', 'chart.js'])
  .config(function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });

    // Configure all doughnut charts
    ChartJsProvider.setOptions('doughnut', {
      cutoutPercentage: 60
    });
    ChartJsProvider.setOptions('bubble', {
      tooltips: {
        enabled: true
      }
    });
  })
  .controller('loginCtrl', ['$scope', '$stateParams', '$ionicPopup', '$timeout', '$http', '$rootScope', '$state', '$cordovaSQLite', '$ionicPopup', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope ,$stateParams, $ionicPopup, $timeout, $http, $rootScope, $state, $cordovaSQLite, $ionicPopup) {

      if (localStorage.getItem('username')) {
        $state.go('elSartN');
      }

      $scope.login = function(data) {

        //localStorage.setItem('webroot', 'http://localhost/el_sarten/');
        localStorage.setItem('webroot', 'http://elsarten.dyndns-home.com:8080/el_sarten/');

        var link = localStorage.getItem('webroot') + 'loginMo';

        if (data) {

          if (!data.password) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: 'Debe ingresar una contraseña'
            });
          } else if (!data.username) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: 'Debe ingresar un usuario'
            });
          } else {
            $http.post(link, {
              User: {
                email: data.username,
                password: data.password
              }
            }).then(function(res) {
              console.log(res.data.codigo);
              if (res.data.codigo == 200) {

                localStorage.setItem("username", res.data.user.User.username);
                localStorage.setItem("co_ven", res.data.vendedor.Vendedore.co_ven.trim());
                localStorage.setItem("user_id", res.data.user.User.id);

              // window.FirebasePlugin.getToken(function(token) {
                // save this server-side and use it to push notifications to this device
              //$http.post(localStorage.getItem('webroot')+'addPushToken', {user_id : res.data.user.User.id , pushtoken : token}).then(function (res){

                  $state.go('elSartN');

              //});

                //      }, function(error) {
                  //       console.error(error);
                //$state.go('elSartN');
              //});

              } else {
                $ionicPopup.alert({
                  title: 'Mensaje',
                  template: res.data.mensaje
                });
              }

            });
          }

        } else {
          $ionicPopup.alert({
            title: 'Mensaje',
            template: 'Campos vacios'
          });
        }
      }

    }
  ])

  .controller('clientesCtrl', ['$scope', '$stateParams', '$http', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {

      var link = localStorage.getItem('webroot') + 'Clientes/getClientes/' + localStorage.getItem("user_id");
      var link2 = localStorage.getItem('webroot') + 'Clientes/searchCliente/' + localStorage.getItem("user_id");
      var link3 = localStorage.getItem('webroot') + 'Zonas/getZonas/';
      $scope.zonas = {};
      $scope.cliente = {
        zona : '',
        search : ''
      };
      $http({
        method: 'GET',
        url: link3
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.Zonas = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.clientes = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.search = function() {
        if(!$scope.cliente.zona){
          $scope.cliente.zona = ''; 
        }
        $http({
          method: 'GET',
          url: link2 + '/' + $scope.cliente.search + '/' + $scope.cliente.zona
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.clientes = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }

    }
  ])

  .controller('cambiarContraseACtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicPopup) {

      $scope.guardarContrasena = function(data) {
        var userId = localStorage.getItem("user_id");
        var link = localStorage.getItem('webroot') + '/changeUserPasswordMovil/' + userId;

        if (data.password == data.cpassword) {
          $http.post(link, {
            User: data
          }).then(function(res) {

            if (res.code == 200) {
              $ionicPopup.alert({
                title: 'Mensaje',
                template: res.data.mensaje
              });
            } else {
              $ionicPopup.alert({
                title: 'Mensaje',
                template: res.data.mensaje
              });
            }
          });
        } else {
          $ionicPopup.alert({
            title: 'Mensaje',
            template: 'Las contraseña no son iguales'
          });
        }
      }
    }
  ])
  .controller('facturasVencidasCtrl', ['$scope', '$stateParams', '$http', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      var idUser = localStorage.getItem('user_id');
      var link = localStorage.getItem('webroot') + 'Facturas/getFacturasVencidas/' + idUser;

      $scope.facturas = {};
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.facturas = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }
  ])

  .controller('elSartNCtrl', ['$scope', '$stateParams', '$http', '$state', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $state) {
      var myElements = document.querySelectorAll(".header-item");

      myElements[0].style.display = 'block';
      
      $scope.username = localStorage.getItem("username");
      var idVendedor = localStorage.getItem("co_ven");
      $scope.clientes = {};
      $scope.date = moment().format('LLLL');
      // Simple GET request example:
      var link = localStorage.getItem('webroot') + 'Clientes/getClientesHoy/' + localStorage.getItem("user_id");
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.clientes = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.loadData = function() {
        var coVen = localStorage.getItem("co_ven");
        var link3 = localStorage.getItem('webroot') + 'Vendedores/getVendedor/' + localStorage.getItem("user_id");
        var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        $scope.vendedor = {};
        $scope.data = [];
        $scope.labels = [];
        var x = 0;
        $http({
          method: 'GET',
          url: link3
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.vendedor = response.data;
          angular.forEach(response.data.FacturaAno, function(value, key) {

            $scope.labels.push(meses[value[0].mes - 1]);
            $scope.data.push(parseInt(value[0].cuantas));
            x++;
            
          });

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }

    }
  ])

  .controller('clienteCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', '$ionicPopup', '$location', '$timeout', '$state', '$cordovaGeolocation', '$cordovaLaunchNavigator', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicModal, $ionicPopup, $location, $timeout, $state, $cordovaGeolocation, $cordovaLaunchNavigator) {

      var idCliente = $stateParams.idCliente;
      $scope.idCliente = idCliente;
      var link = localStorage.getItem('webroot') + 'Clientes/getCliente/' + idCliente;
      var link2 = localStorage.getItem('webroot') + 'Clientes/updateCliente/';
      $scope.clientes = {};
      $scope.clientes.img_url = "http://placehold.it/350x150";
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.clientes = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.subir = function() {
        angular.element("#fileInput").trigger('click');
      }

      $scope.openModal = function() {
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });

      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });

      $scope.updateCliente = function(data) {

        $http.post(link2, {
          Cliente: data
        }).then(function(res) {

          if (res.code = 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
            $scope.closeModal();
          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });
      }

      $scope.upload = function(file) {

        var link3 = localStorage.getItem('webroot') + 'Clientes/uploadFile/';
        $http.post(link3, {
          file: file,
          cliente_id: idCliente
        }).then(function(res) {

          if (res.code == 200) {

            location.reload();
          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });
      };

      $scope.openMap = function() {
        var destination = [40.7127837, -74.00594130000002];
        var start = "Trento";
        $cordovaLaunchNavigator.navigate(destination, start).then(function() {
          console.log("Navigator launched");
        }, function(err) {
          console.error(err);
        });
      }

    }
  ])

  .controller('detalleProductoCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      var idProducto = $stateParams.idProducto;
      var link = localStorage.getItem('webroot') + 'Articulos/getArticulo/' + idProducto;

      $scope.producto = {};
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.producto = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }
  ])

  .controller('productosCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicPopup, $state) {

      var link = localStorage.getItem('webroot') + 'Articulos/getArticulos';

      $scope.webroot = localStorage.getItem('webroot');
      $scope.productos = {};
      $scope.pagination = {};
      $scope.co_cli = 0;
      var co_cli = $stateParams.co_cli;
      var page = $stateParams.page;
      var link2 = localStorage.getItem('webroot') + 'Articulos/getArticulos';

      if (co_cli) {
        $scope.co_cli = co_cli;
      }
      if (page) {

        var link = localStorage.getItem('webroot') + 'Articulos/getArticulos/page:' + page;

      } else {
        var link = localStorage.getItem('webroot') + 'Articulos/getArticulos';

      }
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.productos = response.data.data;
        $scope.pagination = response.data.pagination;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.search = function(data) {
        $http({
          method: 'GET',
          url: link2 + '/' + data.search
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.productos = response.data.data;
          $scope.pagination = response.data.pagination;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
      $scope.addProducto = function(data) {

        var link2 = localStorage.getItem('webroot') + 'Cotizaciones/addArticulo/' + co_cli + '/' + data.co_art + '/' + data.cantidad;

        $http({
          method: 'GET',
          url: link2
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if (response.code = 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: response.data.mensaje
            });

          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: response.data.mensaje
            });
          }

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }

    }
  ])

  .controller('olvidContraseACtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicPopup) {
      var link = localStorage.getItem('webroot') + '/forgotPasswordMovil';

      $scope.recuperar = function(data) {
        $http.post(link, {
          User: data
        }).then(function(res) {

          if (res.code == 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });
      }

    }
  ])

  .controller('detalleDeFacturaCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      var idFactura = $stateParams.idFactura;
      var link = localStorage.getItem('webroot') + 'Facturas/getFacturaDetalle/' + idFactura;

      $scope.factura = {};
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.factura = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }
  ])

  .controller('detalleCotizacionCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicPopup, $state) {

      var co_cli = $stateParams.co_cli;
      $scope.idCliente = co_cli;
      var link = localStorage.getItem('webroot') + 'Cotizaciones/getCotizaciones/' + co_cli;

      $scope.productos = {};
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.productos = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.getTotal = function() {

        var total = 0;
        angular.forEach($scope.productos, function(value, index) {
          total += (value.Cotizacione.cantidad * value.Articulo.precio);
        });
        return total;
      }

      $scope.enviarCotizacion = function(){
        var link2 = localStorage.getItem('webroot') + 'presupuestos/addApp';

        $http.post(link2, {
          co_cli : co_cli,
          productos : $scope.productos
        }).then(function(res) {

          if (res.code = 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });

          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });
      }
      $scope.deleteProducto = function(data) {

        var link2 = localStorage.getItem('webroot') + 'Cotizaciones/deleteArticulo/' + data.id;

        $http({
          method: 'GET',
          url: link2
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if (response.code = 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: response.data.mensaje
            });
            $state.reload();

          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: response.data.mensaje
            });
          }

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    }
  ])

  .controller('detalleVendedorCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      var coVen = localStorage.getItem("co_ven");
      var link = localStorage.getItem('webroot') + 'Vendedores/getVendedor/' + coVen;

      $scope.vendedor = {};
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.vendedor = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }
  ])

  .controller('cotizacionesClientesCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      var link = localStorage.getItem('webroot') + 'Clientes/getClientes/' + localStorage.getItem("co_ven");

      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.clientes = response.data;
        console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.search = function(data) {
        $http({
          method: 'GET',
          url: link + '/' + data.search
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.clientes = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }

    }
  ])

  .controller('ubicacionDeClienteCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', '$http', '$ionicPopup', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, uiGmapGoogleMapApi, $http, $ionicPopup, $timeout) {
      var idCliente = $stateParams.idCliente;
      var link2 = localStorage.getItem('webroot') + 'Clientes/updateCliente/' + idCliente;
      var link = localStorage.getItem('webroot') + 'Clientes/getCliente/' + idCliente;
      $scope.cliente = {};
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.cliente = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.updateCliente = function(data) {

        $http.post(link2, {
          Cliente: {
            lat: data.latitude,
            lon: data.longitude
          }
        }).then(function(res) {

          if (res.code = 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });

          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });
      }

    }
  ])

  .controller('detallesClienteCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {

      var idCliente = $stateParams.idCliente;

      var link = localStorage.getItem('webroot') + 'Clientes/getCliente/' + idCliente;

      $scope.cliente = {};
      $scope.facturas = {};
      $scope.data = {};

      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.data = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
        
        



    }
  ])

  .controller('tabsCtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location) {
      var idCliente = $stateParams.idCliente;
      $scope.idCliente = idCliente;
    }
  ])

  .controller('agendarClienteCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$cordovaCalendar', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicPopup, $cordovaCalendar) {

      var idCliente = $stateParams.idCliente;
      var idUser = localStorage.getItem("user_id");

      var link = localStorage.getItem('webroot') + 'Citas/getCitasC/' + idCliente;
      var link2 = localStorage.getItem('webroot') + 'Citas/guardarCita';
      $scope.cita = {};
      $scope.cita.cliente_id = idCliente;
      $scope.cita.user_id = idUser;
      $http({
        method: 'GET',
        url: link
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.citas = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      $scope.guardarCita = function(data) {

        $http.post(link2, {
          Cita: data
        }).then(function(res) {

          if (res.code == 200) {

            $state.go('cliente/' + idCliente);
          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });

        $cordovaCalendar.createEvent({
          title: data.comentario,
          //location: event.location,
          notes: data.comentario,
          //startDate: data.date,
          //endDate: endsAt
          startDate: new Date(data.date),
          endDate: new Date(data.date)
        }).then(function(result) {
          // success
          $ionicPopup.alert({
            title: 'Mensaje',
            template: 'Agregada al Calendario'
          });
        }, function(err) {
          // alert('Oops, something went wrong');
        });
      }

    }
  ])

  .controller('agregarClienteCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicPopup, $state) {

      var link = localStorage.getItem('webroot') + 'Clientes/addCliente/';
      var link2 = localStorage.getItem('webroot') + 'Zonas/getZonas/';
      $http({
        method: 'GET',
        url: link2
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.Zonas = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.addCliente = function(data) {

        data.co_ven = localStorage.getItem('co_ven');
        $http.post(link, {
          Cliente: data
        }).then(function(res) {

          if (res.code = 200) {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
            $state.go('clientes');
          } else {
            $ionicPopup.alert({
              title: 'Mensaje',
              template: res.data.mensaje
            });
          }
        });
      }

    }
  ])
  .controller('logout', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {

      $scope.logout = function() {
        console.log(1);
      }
    }
  ])