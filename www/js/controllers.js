angular.module('app.controllers', [])
        
.controller('loginCtrl', ['$scope', '$stateParams','$ionicPopup' , '$timeout' , '$http', '$rootScope' , '$state',  // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $ionicPopup , $timeout , $http , $rootScope, $state) {

	
	$scope.login = function(data) {
		
			
            var link = 'http://localhost/elsartenbackend/loginMo';
            
            if(data){

	            if(!data.password){
	            	$ionicPopup.alert({
				     title: 'Mensaje',
				     template: 'Debe ingresar una contraseña'
				   	});
	            }
	            else if (!data.username){
	            	$ionicPopup.alert({
				     title: 'Mensaje',
				     template: 'Debe ingresar un usuario'
				   	});
	            }
	            else {
	            	$http.post(link, {User : {email : data.username , password : data.password}}).then(function (res){
			            if(res.data.codigo == 200){
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
						   	localStorage.setItem("username", res.data.user.User.username);
						   	localStorage.setItem("co_ven", res.data.vendedor.Vendedore.co_ven);
						   	localStorage.setItem("user_id", res.data.user.User.id);
						   	$state.go('elSartN');

						   	//$location.path('/HomePage');
			            }
			            else {
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
			            }
			            
		        	});
	            }
	        
	        }
	        else {
	        	$ionicPopup.alert({
			     title: 'Mensaje',
			     template: 'Campos vacios'
			   	});
	        }
	}	

}])
   
.controller('clientesCtrl', ['$scope', '$stateParams', '$http', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http) {
	
	var link = 'http://localhost/elsartenbackend/Clientes/getClientes/'+localStorage.getItem("co_ven");
	
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

	$scope.search = function(data){
	$http({
	  method: 'GET',
	  url: link+'/'+data.search
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.clientes = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	}



}])
   
.controller('cambiarContraseACtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('facturasVencidasCtrl', ['$scope', '$stateParams','$http', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http) {
	var link = 'http://localhost/elsartenbackend/Facturas/getFacturas';
	
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

}])
   
.controller('elSartNCtrl', ['$scope', '$stateParams' , '$http', '$state', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http , $state) {
	var myElements = document.querySelectorAll(".header-item");
	myElements[0].style.display = 'block';
	$scope.username = localStorage.getItem("username");
	$scope.clientes = {};
	$scope.date = moment().format('LLLL');
	// Simple GET request example:
	var link = 'http://localhost/elsartenbackend/Clientes/getClientes/'+ localStorage.getItem("co_ven") + '/dia';
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

	
				
}])
   
.controller('clienteCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', '$ionicPopup', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http , $ionicModal , $ionicPopup) {

	var idCliente = $stateParams.idCliente;
	var link = 'http://localhost/elsartenbackend/Clientes/getCliente/'+ idCliente;
	var link2 = 'http://localhost/elsartenbackend/Clientes/updateCliente/';
	$scope.clientes = {};
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

   $scope.updateCliente = function(data){

		
		$http.post(link2, {Cliente : data}).then(function (res){
			            
			            if(res.code = 200){
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
						   	$scope.closeModal();
			            }
			            else {
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
			            }
		});
	}

	

}])
   
.controller('detalleProductoCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {
	var idProducto = $stateParams.idProducto;
	var link = 'http://localhost/elsartenbackend/Articulos/getArticulo/'+idProducto;
	
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

}])
   
.controller('productosCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http) {
	
	var link = 'http://localhost/elsartenbackend/Articulos/getArticulos';
	
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

	$scope.search = function(data){
	$http({
	  method: 'GET',
	  url: link+'/'+data.search
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.productos = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	}

}])
   
.controller('olvidContraseACtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detalleDeFacturaCtrl', ['$scope', '$stateParams', '$htpp',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http) {
	var idFactura = $stateParams.idFactura;
	var link = 'http://localhost/elsartenbackend/Facturas/getFactura';
	
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

}])
   
.controller('detalleCotizacionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detalleVendedorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cotizacionesClientesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ubicacionDeClienteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detallesClienteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var idCliente = $stateParams.idCliente;
	var link = 'http://localhost/elsartenbackend/Clientes/getCliente/'+ idCliente;
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

}])
   
.controller('agendarClienteCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http , $ionicPopup) {

	
	var idCliente = $stateParams.idCliente;
	var idUser = localStorage.getItem("user_id");
	
	var link = 'http://localhost/elsartenbackend/Citas/getCitasC/'+ idCliente;
	var link2 = 'http://localhost/elsartenbackend/Citas/guardarCita';
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

	$scope.guardarCita = function(data){

		
		$http.post(link2, {Cita : data}).then(function (res){
			            
			            if(res.code == 200){
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
						   	
			            }
			            else {
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
			            }
		});
	}


}])
   
.controller('agregarClienteCtrl', ['$scope', '$stateParams','$http','$ionicPopup' ,'$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http ,$ionicPopup , $state) {

	var link = 'http://localhost/elsartenbackend/Clientes/addCliente/';
	var link2 = 'http://localhost/elsartenbackend/Zonas/getZonas/';
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
	$scope.addCliente = function(data){

		data.co_ven = localStorage.getItem('co_ven');
		$http.post(link, {Cliente : data}).then(function (res){
			            
			            if(res.code = 200){
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
						   	$state.go('clientes');
			            }
			            else {
			            	$ionicPopup.alert({
						     title: 'Mensaje',
						     template: res.data.mensaje
						   	});
			            }
		});
	}

}])
 