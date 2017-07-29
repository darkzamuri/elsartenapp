angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('tabsController', {
    url: '/page1/:idCliente',
    templateUrl: 'templates/tabsController.html',
    abstract:true,
    controller : 'tabsCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('clientes', {
    url: '/clientes',
    templateUrl: 'templates/clientes.html',
    controller: 'clientesCtrl',
    cache: false,
  })

  .state('cambiarContraseA', {
    url: '/contrasena',
    templateUrl: 'templates/cambiarContraseA.html',
    controller: 'cambiarContraseACtrl'
  })

  .state('facturasVencidas', {
    url: '/deudas',
    templateUrl: 'templates/facturasVencidas.html',
    controller: 'facturasVencidasCtrl',
    cache: false,
  })

  .state('elSartN', {
    url: '/inicio',
    templateUrl: 'templates/elSartN.html',
    controller: 'elSartNCtrl',
    cache: false,
  })

  .state('cliente', {
    url: '/cliente/:idCliente',
    templateUrl: 'templates/cliente.html',
    controller: 'clienteCtrl',
    cache: false,
  })

  .state('detalleProducto', {
    url: '/detalleproducto/:idProducto',
    templateUrl: 'templates/detalleProducto.html',
    controller: 'detalleProductoCtrl',
    cache: false,
  })

  .state('productos', {
    url: '/productos/:page/:co_cli',
    templateUrl: 'templates/productos.html',
    controller: 'productosCtrl',
    cache: false,
  })

  .state('olvidContraseA', {
    url: '/olvidoclave',
    templateUrl: 'templates/olvidContraseA.html',
    controller: 'olvidContraseACtrl',
    cache: false,
  })

  .state('detalleDeFactura', {
    url: '/factura/:idFactura',
    templateUrl: 'templates/detalleDeFactura.html',
    controller: 'detalleDeFacturaCtrl',
    cache: false,
  })

  .state('detalleCotizacion', {
    url: '/cotizacion/:co_cli',
    templateUrl: 'templates/detalleCotizacion.html',
    controller: 'detalleCotizacionCtrl',
    cache: false,
  })

  .state('detalleVendedor', {
    url: '/venedor',
    templateUrl: 'templates/detalleVendedor.html',
    controller: 'detalleVendedorCtrl',
    cache: false,
  })

  .state('cotizacionesClientes', {
    url: '/cotizaciones/:co_cli',
    templateUrl: 'templates/cotizacionesClientes.html',
    controller: 'cotizacionesClientesCtrl',
    cache: false,
  })

  .state('ubicacionDeCliente', {
    url: '/ubicacion/:idCliente',
    templateUrl: 'templates/ubicacionDeCliente.html',
    controller: 'ubicacionDeClienteCtrl',
    cache: false,
  })

  .state('detallesCliente', {
    url: '/detallecliente/:idCliente',
    templateUrl: 'templates/detallesCliente.html',
    controller: 'detallesClienteCtrl',
    cache: false,     
  })

  .state('agendarCliente', {
    url: '/agendarcliente/:idCliente',
    templateUrl: 'templates/agendarCliente.html',
    controller: 'agendarClienteCtrl',
    cache: false,
  })

  .state('agregarCliente', {
    url: '/agregarcliente',
    templateUrl: 'templates/agregarCliente.html',
    controller: 'agregarClienteCtrl',
    cache: false,
  })

  .state('datosSarten', {
    url: '/datosSarten',
    templateUrl: 'templates/datosSarten.html',
    cache: false,
  })


$urlRouterProvider.otherwise('/login')

  

});