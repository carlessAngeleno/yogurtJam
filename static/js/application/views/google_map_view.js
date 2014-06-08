App.GoogleMapView = Ember.View.extend({
  didInsertElement: function () {
    this.draw();
  },

  draw: function() {
    // Options for map
    var usa_lat_lng = new google.maps.LatLng(40.044437, -96.554509);    // Coordinate for center of the US

    var mapOptions = {        
      center: usa_lat_lng,
      zoom: 4,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }               
    };

    var map = new google.maps.Map(this.$()[0], mapOptions);
    this.get('controller').set('g_map', map);
    App.set('g_map', map);

    // Style for map
    var styles = [
      {
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          { "saturation": -29 },
          { "visibility": "on" }
        ]
      },{
        "featureType": "water",
        "stylers": [
          { "saturation": -59 },
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "administrative",
        "stylers": [
          { "visibility": "on" }
        ]
      },{
        "featureType": "road.highway",
        "stylers": [
          { "saturation": -59 },
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "road.arterial",
        "stylers": [
          { "visibility": "on" },
          { "saturation": -44 }
        ]
      },{
        "featureType": "road.local",
        "stylers": [
          { "visibility": "simplified" },
          { "saturation": -15 }
        ]
      },{
        "featureType": "transit",
        "stylers": [
          { "visibility": "on" },
          { "saturation": -33 }
        ]
      },{
        "featureType": "poi",
        "stylers": [
          { "saturation": -59 },
          { "visibility": "on" }
        ]
      },{
        "featureType": "poi.park",
        "stylers": [
          { "visibility": "on" },
          { "saturation": 12 }
        ]
      }
    ];

    var styledMap = new google.maps.StyledMapType(
      styles,
      {name: "Styled Map"}
    );

    //Associate styled map
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    this.drawOnMap(App.markers);

    if (App.needToMove) {
      this.moveMapToNew();
    }

  },

  drawOnMap: function(markers) {

      function panAndZoom(map, position) {
        $.when(map.panTo(position)).then(function() {
          window.setTimeout(function() {map.setZoom(14);}, 1000)
        })      
      }

      var map = App.get('g_map');
      var player = this.get('player');

      var infowindow = new google.maps.InfoWindow({
          maxWidth: 240
      });      
      // if data (memories) were fed in the form of an array called "markers", plan them 
      // global array "current_markers" - used to keep track of planted markers and clear maps throughout the website        
      var current_markers = [];

      // for every element in the "markers" array
      for (i = 0; i < markers.length; i++) {  
          
          // plant a marker on the map using lat/long coordinates
          var marker = new google.maps.Marker({
              map: map,
              clickable: true,
              position: new google.maps.LatLng(markers[i].lat, markers[i].lng)                                            
          });
          
          // add the marker to the current_markers array (so we can remove them later by referring to this)
          current_markers.push(marker)
          
          // plant info (pulled from db) into each marker
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {  

                  // map focuses onto marker
                  panAndZoom(map, marker.position)
                  // map.panTo(marker.position);
                  // map.setZoom(14);


                  // display infowindow                  
                  infowindow.setContent(
                      '<div><strong>' 
                      //+ markers[i].m_month + '/' + markers[i].m_year + ' - ' + markers[i].g_place 
                      + markers[i].memoryDateShare.split(" ")[0]
                      + '</strong><br>' 
                      + markers[i].g_place + '<br></div>'
                      // + markers[i].story + '<br><br>'
                      // + '<div style="font-style:italic; font-size:8pt;"> shared:' + markers[i].time_added + '</div>'
                  );                
                  infowindow.open(map, marker);

                  window.location.href = "#/memory/" + markers[i].id;  
            
              }
          })(marker, i));
      } 
  },

  moveMapToNew: function() {
    var position = new google.maps.LatLng(App.newLat, App.newLng);
    var g_map = App.get('g_map');
    
    $.when(g_map.setZoom(5)).then(function() {
      window.setTimeout(function() {panAndZoom(g_map, position);}, 1000)
    })
    
    function panAndZoom(map, position) {
      $.when(map.panTo(position)).then(function() {
        window.setTimeout(function() {map.setZoom(14);}, 1000)
      })      
    }
  },  

});

Ember.Handlebars.helper('google-map', App.GoogleMapView);