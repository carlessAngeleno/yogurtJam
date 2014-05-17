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


// $.post(
//   "http://127.0.0.1:8000/yogurtjam/default/api/memory",
//   { 
//     "story": "dfs", 
//     "tag1": "sdfs", 
//     "title": "firework", 
//     "video_id": "QGJuMBdaqIw", 
//     "g_place": "Hotel Cir S", 
//     "lat": 32.7589995, 
//     "lng": -117.1763604, 
//     "artist": "katy perry", 
//     "time_added": "2013-05-17 05:42:30", 
//     "memoryDateShare": "2014-05-01 00:00:00"
//   }
// )
// .done(function(data) {
//   alert("Data Loaded");
// });

