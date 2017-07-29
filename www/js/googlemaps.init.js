angular.module('googlemaps.init', [])

.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBmhTGwWs7REhMTvJk8e7trdsmBmjTToEU',
        libraries: 'weather,geometry,visualization'
    });
}])

.directive('creatorMapComponent', ['uiGmapGoogleMapApi', '$timeout',

    /*
        Do not remove this directive, it is what powers the Creator Drag & Drop Component.
    */


    function(uiGmapGoogleMapApi, $timeout) {

        return {
            restrict: 'E',
            link: function($scope, $element, $attr, _c, transclude) {
            
                $scope.map = {};
                
                if ($attr.marker=="true"){
                    $scope.map.marker = {
                        id: 0
                    }
                }
                

                    
                    uiGmapGoogleMapApi.then(function(maps){

                        function setupMap(lat, lng){
                            
                            $scope.map.zoom = parseInt($attr.zoom);
                            $timeout(function(){
                                $scope.map.center = {
                                    latitude: lat,
                                    longitude: lng
                                };  
                            });
                            
                            $scope.map.options = JSON.parse($attr.options);
                            
                            if ($attr.marker=="true"){
                                $scope.map.marker.coords = {
                                    latitude: lat,
                                    longitude: lng
                                }
                            }
                        }
                        if($scope.cliente.Cliente.lat && $scope.cliente.Cliente.lon){
                           setupMap($scope.cliente.Cliente.lat, $scope.cliente.Cliente.lon); 
                        }
                        else {
                            navigator.geolocation.getCurrentPosition(function(pos) {
                                setupMap(pos.coords.latitude , pos.coords.longitude);
                            }, function(error) {
                              alert('Unable to get location: ' + error.message);
                            });
                        }

                        
                        
                              
                        
                    });
                            

            
            }
      
        };
}]);