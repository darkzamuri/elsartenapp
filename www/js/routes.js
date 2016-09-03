angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('clientes', {
    url: '/clientes',
    templateUrl: 'templates/clientes.html',
    controller: 'clientesCtrl'
  })

  .state('cambiarContraseA', {
    url: '/contrasena',
    templateUrl: 'templates/cambiarContraseA.html',
    controller: 'cambiarContraseACtrl'
  })

  .state('facturasVencidas', {
    url: '/deudas',
    templateUrl: 'templates/facturasVencidas.html',
    controller: 'facturasVencidasCtrl'
  })

  .state('elSartN', {
    url: '/inicio',
    templateUrl: 'templates/elSartN.html',
    controller: 'elSartNCtrl'
  })

  .state('tabsController.cliente', {
    url: '/cliente/:idCliente',
    views: {
      'tab1': {
        templateUrl: 'templates/cliente.html',
        controller: 'clienteCtrl'
      }
    }
  })

  .state('tabsController.detalleProducto', {
    url: '/detalleproducto',
    views: {
      'tab1': {
        templateUrl: 'templates/detalleProducto.html',
        controller: 'detalleProductoCtrl'
      }
    }
  })

  .state('tabsController.productos', {
    url: '/productos',
    views: {
      'tab1': {
        templateUrl: 'templates/productos.html',
        controller: 'productosCtrl'
      }
    }
  })

  .state('olvidContraseA', {
    url: '/olvidoclave',
    templateUrl: 'templates/olvidContraseA.html',
    controller: 'olvidContraseACtrl'
  })

  .state('detalleDeFactura', {
    url: '/factura',
    templateUrl: 'templates/detalleDeFactura.html',
    controller: 'detalleDeFacturaCtrl'
  })

  .state('tabsController.detalleCotizacion', {
    url: '/cotizacion',
    views: {
      'tab1': {
        templateUrl: 'templates/detalleCotizacion.html',
        controller: 'detalleCotizacionCtrl'
      }
    }
  })

  .state('detalleVendedor', {
    url: '/venedor',
    templateUrl: 'templates/detalleVendedor.html',
    controller: 'detalleVendedorCtrl'
  })

  .state('cotizacionesClientes', {
    url: '/cotizaciones',
    templateUrl: 'templates/cotizacionesClientes.html',
    controller: 'cotizacionesClientesCtrl'
  })

  .state('tabsController.ubicacionDeCliente', {
    url: '/ubicacion',
    views: {
      'tab2': {
        templateUrl: 'templates/ubicacionDeCliente.html',
        controller: 'ubicacionDeClienteCtrl'
      }
    }
  })

  .state('tabsController.detallesCliente', {
    url: '/detallecliente',
    views: {
      'tab3': {
        templateUrl: 'templates/detallesCliente.html',
        controller: 'detallesClienteCtrl'
      }
    }
  })

  .state('tabsController.agendarCliente', {
    url: '/agendarcliente/:idCliente',
    views: {
      'tab1': {
        templateUrl: 'templates/agendarCliente.html',
        controller: 'agendarClienteCtrl'
      }
    }
  })

  .state('agregarCliente', {
    url: '/agregarcliente',
    templateUrl: 'templates/agregarCliente.html',
    controller: 'agregarClienteCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});