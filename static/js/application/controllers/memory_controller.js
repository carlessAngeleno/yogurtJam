App.MemoryController = Ember.ObjectController.extend({
  needs: "memories",

  actions: {
    zoomOut: function() {
      var g_map = App.get('g_map');      
      g_map.setZoom(g_map.zoom - 3);
    },

    centerMap: function() {
      var position = new google.maps.LatLng(this.get('lat'), this.get('lng'));
      var g_map = App.get('g_map');
      g_map.panTo(position);
    },

    moveMapToNew: function() {      
      var position = new google.maps.LatLng(this.get('lat'), this.get('lng'));
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

    like: function() {

      if (!this.get('didClickLike')) {
        var that = this;
        $.post(
          "/yogurtjam/default/like/memory",
          { 
            "id": this.get('id')
          }
        )
        .done(function(data) {
          that.set('likes', data);
          that.set('didClickLike', true);
        });
      }
    },

    dislike: function() {

      if (!this.get('didClickDislike')) {
        var that = this;
        $.post(
          "/yogurtjam/default/dislike/memory",
          { 
            "id": this.get('id')
          }
        )
        .done(function(data) {
          that.set('dislikes', data);
          that.set('didClickDislike', true);
        });
      }
    }
        
  },  // end of actions



  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')

});