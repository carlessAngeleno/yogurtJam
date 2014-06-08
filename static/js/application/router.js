App.Router.map(function() {
  this.resource('memories', { path: '/' }, function() {
    this.resource('artists', { path: '/artists/:artist' }, function() {
      this.resource('songs', { path: '/songs/:title' }, function() {
        this.resource('stories', { path: '/stories/:memory_id'});
      })
    })
  });  
  this.resource('share', {path: '/share'}, function() {
    this.route('song');
    this.route('location');
    this.route('story');
  })  
  this.resource('memory', { path: '/memory/:memory_id' });
  this.resource('results');
});

App.MemoriesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('memory');
  }
});

App.MemoriesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

App.ArtistsRoute = Ember.Route.extend({
  model: function(params) {
     var that = this;
     return $.getJSON('/yogurtjam/default/api/memory?artist=' + params.artist)
        .then(function(response) {   
          var markers = response.memories; 
          App.set('markers', markers);
          that.store.unloadAll(App.Memory);
          that.store.pushMany('memory', markers);    
          return markers;
     });
  },
  controllerName: 'Memories'
});

App.SongsRoute = Ember.Route.extend({
  model: function(params) {
    var filtered = [];
    App.markers.forEach(function(data) {
      // console.log(params.title);
      if (data.title === params.title) {
        filtered.pushObject(data);
      }
    });     
    App.set('markers', filtered);
    this.store.unloadAll(App.Memory);
    this.store.pushMany('memory', filtered);      
    return filtered;
  },
  controllerName: 'Memories'
});

// App.StoriesRoute = Ember.Route.extend({
//   model: function(params) {

//     var filtered = [];
//     App.markers.forEach(function(data) {
//       if (data.id === +params.memory_id) {
//         filtered.pushObject(data);
//       }
//     });     
//     App.set('markers', filtered);
//     this.store.unloadAll(App.Memory);
//     this.store.pushMany('memory', filtered);      
//     return this.store.find('memory', params.memory_id);
//   },

//   // setupController: function(controller, model) {
//   //     this.controllerFor('memory').setProperties({isNew:true,content:model});
//   // },
//   renderTemplate: function() {
//       this.render('memory')         
//   },  
//   // controllerName: 'Memory'
//   setupController: function(controller, model) {
//     debugger;
//     this._super(controller, model);
//     var currentId = this.get('context').id;
//     var markers = this.controllerFor('memories').get('model').get('content');    

//     $.when(findOthers(markers)).then(function(ids) {
//       var index = Math.floor(Math.random() * (ids.length));
//       var newId = ids[index];
//       controller.set('next', newId);
//     });
// // // debugger;
// //     this.controllerFor('memory').send(
// //       'moveMapToNew', 
// //       this.get('context')[0].lat,
// //       this.get('context')[0].lng
// //       // model.get('lat'), 
// //       // model.get('lng')
// //     );

//     function findOthers(markers) {
//       return $.map(markers, function(marker) {
//         if (marker.id !== currentId) {
//           return marker.id;
//         }
//       });
//     }    
//   }  
// });

App.StoriesRoute = Ember.Route.extend({
  model: function(params) {
    var filtered = [];
    App.markers.forEach(function(data) {
      if (data.id === +params.memory_id) {
        filtered.pushObject(data);
      }
    });     
    App.set('markers', filtered);
    return this.store.find('memory', params.memory_id);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    var currentId = this.get('context').id;
    var markers = this.controllerFor('memories').get('model').get('content');    

    $.when(findOthers(markers)).then(function(ids) {
      var index = Math.floor(Math.random() * (ids.length));
      var newId = ids[index];
      controller.set('next', newId);
    });
// debugger;
    // this.controllerFor('memory').send(
    //   'moveMapToNew', 
    //   this.controllerFor('memory').get('model').get('lat'), 
    //   this.controllerFor('memory').get('model').get('lng')
    // );

    function findOthers(markers) {
      return $.map(markers, function(marker) {
        if (marker.id !== currentId) {
          return marker.id;
        }
      });
    }    
  }  
});



App.StoriesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('stories');
  },
  controllerName: 'Memory'
});

App.ResultsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('memory');
  },
  controllerName: 'Memories'
});

App.ShareRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories',
  beforeModel: function() {
    this.transitionTo('share.song');
  }
});

App.ShareSongRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

App.ShareLocationRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

App.ShareStoryRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

App.MemoryRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('memory', params.memory_id);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    var currentId = this.get('context').id;
    var markers = this.controllerFor('memories').get('model').get('content');    

    $.when(findOthers(markers)).then(function(ids) {
      var index = Math.floor(Math.random() * (ids.length));
      var newId = ids[index];
      controller.set('next', newId);
    });
// debugger;
    this.controllerFor('memory').send(
      'moveMapToNew', 
      this.controllerFor('memory').get('model').get('lat'), 
      this.controllerFor('memory').get('model').get('lng')
    );

    function findOthers(markers) {
      return $.map(markers, function(marker) {
        if (marker.id !== currentId) {
          return marker.id;
        }
      });
    }    
  }  
});