Memories.GPlacesInputView = Ember.TextField.extend({
  didInsertElement: function() {
    var acOptions = {
        types: ['establishment', 'geocode']
    };    
    var autocomplete = new google.maps.places.Autocomplete(
        this.$()[0],
        acOptions
    );    
    this.$().focus();
  }
});

Ember.Handlebars.helper('g-places-input', Memories.GPlacesInputView);