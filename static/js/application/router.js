App.Router.map(function() {
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
      'centerMapSingle', 
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