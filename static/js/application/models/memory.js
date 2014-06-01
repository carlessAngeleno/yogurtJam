App.Memory = DS.Model.extend({
  // title: DS.attr('string'),
  // isCompleted: DS.attr('boolean')
  story: DS.attr('string'), 
  tag1: DS.attr('string'), 
  title: DS.attr('string'), 
  video_id: DS.attr('string'), 
  g_place: DS.attr('string'), 
  lat: DS.attr('number'), 
  lng: DS.attr('number'), 
  artist: DS.attr('string'), 
  time_added: DS.attr('string'), 
  memoryDateShare: DS.attr('string'),
  likes: DS.attr('number'),
  dislikes: DS.attr('number')
});

// // FIXTURE
// App.Memory.FIXTURES = [
//   // {"story": "1", "tag1": "sdfs", "title": "firework", "video_id": "QGJuMBdaqIw", "g_place": "Hotel Cir S", "id": 1, "lat": 32.7589995, "lng": -117.1763604, "artist": "katy perry", "time_added": "2013-05-17 05:42:30", "memoryDateShare": "2014-05-01 00:00:00"}, 
//   // {"story": "4", "tag1": "sdfs", "title": "firework", "video_id": "QGJuMBdaqIw", "g_place": "Hotel Cir S", "id": 4, "lat": 32.7589995, "lng": -117.1763604, "artist": "katy perry", "time_added": "2013-05-17 05:42:30", "memoryDateShare": "2014-05-01 00:00:00"},
//   // {"story": "5", "tag1": "sdfs", "title": "firework", "video_id": "QGJuMBdaqIw", "g_place": "Hotel Cir S", "id": 5, "lat": 32.7589995, "lng": -117.1763604, "artist": "katy perry", "time_added": "2013-05-17 05:42:30", "memoryDateShare": "2014-05-01 00:00:00"}, 
//   // {"story": "2", "tag1": "sdfs", "title": "firework", "video_id": "QGJuMBdaqIw", "g_place": "Hotel Cir S", "id": 2, "lat": 32.7589995, "lng": -117.1763604, "artist": "katy perry", "time_added": "2013-05-17 05:42:30", "memoryDateShare": "2014-05-01 00:00:00"}, 
//   // {"story": "3", "tag1": "sdfs", "title": "firework", "video_id": "QGJuMBdaqIw", "g_place": "Hotel Cir S", "id": 3, "lat": 32.7589995, "lng": -117.1763604, "artist": "katy perry", "time_added": "2013-05-17 05:42:30", "memoryDateShare": "2014-05-01 00:00:00"},   
//   // {"story": "6", "tag1": "sdfs", "title": "firework", "video_id": "QGJuMBdaqIw", "g_place": "Hotel Cir S", "id": 6, "lat": 32.7589995, "lng": -117.1763604, "artist": "katy perry", "time_added": "2013-05-17 05:42:30", "memoryDateShare": "2014-05-01 00:00:00"}  
// ];