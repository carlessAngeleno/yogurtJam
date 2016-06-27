window.App = Ember.Application.create({
  // rootElement: "#main_body",
    LOG_TRANSITIONS: true,
    ready: function() {     
    },
    fill_space: function(raw) {
    	return filled = raw.replace(/ /g, '_').toLowerCase();
    }
});

// Memories.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'yogurtJam-emberjs'
});


function showResponse(sel, response) {

  function onPlayerReady(event) {
    $(event.target.a).show();
  }

  // Refresh
  $('#' + sel).empty();
  $('#lala').remove();
  $('#foofoo').append('<div id="lala"></div>');

  // Create player
  var player = new YT.Player('lala', {
    height: '260',
    width: '360',
    events: {
      'onReady' : onPlayerReady
    }    
  });
  $('button.close.video-search').click(function() {
    debugger;
    player.stopVideo();
  })

  var results = $('<div class="search-results row-fluid"></div>');
  $('#' + sel).append(results);

  $.each(response['items'], function(k, v) {
    var videoId = v['id']['videoId'];
    var img = v['snippet']['thumbnails']['default']['url'];
    var thumbnail = $('<img>').attr('src', img)
                        .width(100)
                        .addClass('yj-thumbnail');
    thumbnail = $('<div class="span3"><div>').append(thumbnail);
    var item = $('<div class="row-fluid"></div>').append(thumbnail);
    var desc = $(
      '<div class="span8"><b>' + 
      v['snippet']['title'] + 
      '</b><br/>by ' + v['snippet']['channelTitle'] + '<br/>' +
      moment(v['snippet']['publishedAt']).fromNow() + '<br/>' +
      '<small>' + v['snippet']['description'] + '</small>' +
      '</div>'
    );
    item.append(desc);
    item.attr('style', 'padding-bottom: 10px;');
    item.click(function() {
      player.loadVideoById(videoId);
      YT_VIDEO_ID_DUMMY_GLOBAL = videoId;
    })    
    results.append(item);
  })
}

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyD20oMc2u7d9zWaQwt7yrw_AZSVmbdpfEQ');
}

function searchYoutubeApi(query) {
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: query,
    maxResults: 50
  });
  request.execute(onSearchResponse);
}

function onSearchResponse(response) {
  var sel = 'player_container_share';
  showResponse(sel, response);
}