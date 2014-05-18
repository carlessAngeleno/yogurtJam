Memories.Router.map(function() {
  this.resource('memories', { path: '/' }, function() {
    this.route('share');
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
  }
});

Memories.MemoriesShareRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('memories');
  },
  controllerName: 'Memories'
});