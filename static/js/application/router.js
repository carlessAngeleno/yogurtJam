Memories.Router.map(function() {
  this.resource('memories', { path: '/' }, function() {
  });  
  this.resource('share', {path: '/share'}, function() {
    this.route('song');
    this.route('location');
    this.route('story');
  })  
  this.resource('memory', { path: '/memory/:memory_id' });
  this.resource('results');
});

Memories.MemoriesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('memory');
  }
});

Memories.MemoriesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.ResultsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('memory');
  },
  controllerName: 'Memories'
});

Memories.ShareRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories',
  beforeModel: function() {
    this.transitionTo('share.song');
  }
});

Memories.ShareSongRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.ShareLocationRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.ShareStoryRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.MemoryRoute = Ember.Route.extend({
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

    function findOthers(markers) {
      return $.map(markers, function(marker) {
        if (marker.id !== currentId) {
          return marker.id;
        }
      });
    }    
  }  
});