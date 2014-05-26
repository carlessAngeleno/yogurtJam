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
  }
});