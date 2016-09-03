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
						   	localStorage.setItem("user_id" res.data.user.User.id);
						   	$state.go('elSartN');
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
   
.controller('cambiarContraseACtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('facturasVencidasCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('elSartNCtrl', ['$scope', '$stateParams' , '$http', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams , $http) {
	$scope.username = localStorage.getItem("username");
	$scope.clientes = {};
	// Simple GET request example:
	var link = 'http://localhost/elsartenbackend/Clientes/getClientes/'+ localStorage.getItem("co_ven");
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
   
.controller('detalleProductoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('productosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('olvidContraseACtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detalleDeFacturaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


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
   
.controller('agregarClienteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 