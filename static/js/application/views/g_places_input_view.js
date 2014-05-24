Memories.GPlacesInputView = Ember.TextField.extend({
  didInsertElement: function() {

    var map = this.get('controller').get('g_map');
    
    var acOptions = {
      types: ['establishment', 'geocode']
    };    
    autocomplete = new google.maps.places.Autocomplete(
      this.$()[0],
      acOptions
    );   
    autocomplete.bindTo('bounds', map);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        
      var infoWindow = new google.maps.InfoWindow();
        
      // plant new marker  
      var marker = new google.maps.Marker({
        map: map
      });
      
      // extract place info
      var place = autocomplete.getPlace();
      
      // map focuses onto place         
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } 
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // take down place's location (lat/long)
      var new_place_lat_lng = place.geometry.location;
  
      // put a marker on the location 
      marker.setPosition(new_place_lat_lng);
      
      // infowindow to pop up will have the name of the place
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
     
      infoWindow.open(map, marker);

      google.maps.event.addListener(marker,'click',function(e){
        infoWindow.open(map, marker);
      });    
    });
    this.$().focus();
  }
});

Ember.Handlebars.helper('g-places-input', Memories.GPlacesInputView);