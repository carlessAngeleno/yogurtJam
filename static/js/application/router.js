Memories.Router.map(function() {
  this.resource('memories', { path: '/' });
});

// ... additional lines truncated for brevity ...
Memories.MemoriesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('memory');
  }
});