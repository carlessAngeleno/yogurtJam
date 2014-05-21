Memories.GoogleMapView = Ember.View.extend({

  didInsertElement: function() {
    // Options for map
    var usa_lat_lng = new google.maps.LatLng(40.044437, -96.554509);    // Coordinate for center of the US

    var mapOptions = {        
      center: usa_lat_lng,
      zoom: 4,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }               
    };

    // Create map (note global)
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

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
  }
});

Ember.Handlebars.helper('google-map', Memories.GoogleMapView);