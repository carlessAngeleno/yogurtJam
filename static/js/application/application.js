window.Memories = Ember.Application.create({
  // rootElement: "#main_body",
    LOG_TRANSITIONS: true,
    ready: function() {
      // create YT player
      var player;
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api"
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      // Need this function to talk to the API
      function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
              height: '260',
              width: '360'
          });
      }         
    }
});

// Memories.ApplicationAdapter = DS.FixtureAdapter.extend();
Memories.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'yogurtJam-emberjs'
});