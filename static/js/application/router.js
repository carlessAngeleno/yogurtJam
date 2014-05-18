Memories.Router.map(function() {
  this.resource('memories', { path: '/' }, function() {
    this.resource('memories.share', {path: '/share'}, function() {
    	this.route('song');
    	this.route('location');
    	this.route('story');
    })
  });
});

Memories.MemoriesRoute = Ember.Route.extend({
  model: function() {
    // // Load from api
    // return $.getJSON('http://127.0.0.1:8000/yogurtjam/default/api/memory?artist=katy%20perry&title=firework')
    //   .then(function(response) {
    //     return response.memories;
    // })
    return this.store.find('memory');
  }
});

Memories.MemoriesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
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