Memories.Router.map(function() {
  this.resource('memories', { path: '/' }, function() {
    this.route('results');
    this.resource('memories.display', { path: '/display/:id' });
    this.resource('memories.share', {path: '/share'}, function() {
    	this.route('song');
    	this.route('location');
    	this.route('story');
    })
  });
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

Memories.MemoriesResultsRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.MemoriesDisplayRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('memory', params.id);
  }
});

Memories.MemoriesShareRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.MemoriesShareSongRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.MemoriesShareLocationRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});

Memories.MemoriesShareStoryRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});