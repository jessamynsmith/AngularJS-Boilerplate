/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService', '$timeout', '$geolocation', 'uiGmapGoogleMapApi'];


  function MainController(LocalStorage, QueryService, $timeout, $geolocation, uiGmapGoogleMapApi) {

    // 'controller as' syntax
    var self = this;

    self.markers = [];
    self.infoVisible = false;
    self.infoBusiness = {};

    // Initialize and show infoWindow for business
    self.showInfo = function(marker, eventName, markerModel) {
      self.infoBusiness = markerModel;
      self.infoVisible = true;
    };

    // Hide infoWindow when 'x' is clicked
    self.hideInfo = function() {
      self.infoVisible = false;
    };

    var initializeMap = function(position) {
      console.log('init');
      if (!position) {
        // Default to downtown Toronto
        position = {
          coords: {
            latitude: 43.6722780,
            longitude: -79.3745125
          }
        };
      }

      self.map = {
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        zoom: 16
      };

      // Make info window for marker show up above marker
      self.windowOptions = {
        pixelOffset: {
          height: -32,
          width: 0
        }
      };
    };

    uiGmapGoogleMapApi.then(function(maps) {
      // Don't pass timeout parameter here; that is handled by setTimeout below
      $geolocation.getCurrentPosition({}).then(function(position) {
          initializeMap(position);
        },
        function(error) {
          console.log(error);
          initializeMap();
        });
    });

    // Deal with case where user does not make a selection
    $timeout(function() {
      if (!self.map) {
        console.log("No confirmation from user, using fallback");
        initializeMap();
      }
    }, 5000);


    ////////////  function definitions


    /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }


})();
