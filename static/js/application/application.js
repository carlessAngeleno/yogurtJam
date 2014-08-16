window.App = Ember.Application.create({
  // rootElement: "#main_body",
    LOG_TRANSITIONS: true,
    ready: function() {
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api"
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);      
    },
    fill_space: function(raw) {
    	return raw.replace(/ /g, '_');
    }
});

// Memories.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'yogurtJam-emberjs'
});