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


// Helper function to display JavaScript value on HTML page.
function showResponse(sel, response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById(sel).innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
  // This API key is intended for use only in this lesson.
  // See http://goo.gl/PdPA1 to get a key for your own applications.
  gapi.client.setApiKey('AIzaSyD20oMc2u7d9zWaQwt7yrw_AZSVmbdpfEQ');
}

function searchYoutubeApi(query) {
  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: query,
  });
  
  // Send the request to the API server,
  // and invoke onSearchRepsonse() with the response.
  request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
  var sel = 'player_container_share';
  showResponse(sel, response);
}