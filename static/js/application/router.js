Memories.Router.map(function() {
  this.resource('memories', { path: '/' });
});

// Load from api
Memories.MemoriesRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('http://127.0.0.1:8000/yogurtjam/default/api/memory?artist=katy%20perry&title=firework')
      .then(function(response) {
        return response.memories;
    })
  }
});