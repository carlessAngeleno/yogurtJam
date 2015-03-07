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


function showResponse(sel, response) {

  

  $('#' + sel).append('<div id="test-video-wrapper"></div>');
  var player = new YT.Player('lala', {
    height: '260',
    width: '360',
    events: {
      'onReady' : onPlayerReady
    }    
  });
  var results = $('<div class="row-fluid"></div>');
  $('#' + sel).append(results);

  function onPlayerReady(event) {
    $(event.target.a).show();
  }

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
      foo = videoId;
      console.log(player.getVideoEmbedCode());
    })    
    results.append(item);
  })

  // var thumbnail = $('<img>').attr(
  //   'src', 
  //   response['items'][0]['snippet']['thumbnails']['default']['url']
  // ); 
  // $('#' + sel).append(thumbnail);
  // var responseString = JSON.stringify(response, '', 2);
  // document.getElementById(sel).innerHTML += responseString;
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