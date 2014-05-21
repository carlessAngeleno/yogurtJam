// show player on initial load
$(document).ready(function() {          
   $("#player").hide();
})

// draws map and plants markers
function initialize() {

    // Options for map
    var usa_lat_lng = new google.maps.LatLng(40.044437, -96.554509);    // Coordinate for center of the US

    var mapOptions = {        
        center: usa_lat_lng,
        zoom: 4,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }               
    };

    // Create map (note global)
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // Style for map
    var styles = [
      {
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          { "saturation": -29 },
          { "visibility": "on" }
        ]
      },{
        "featureType": "water",
        "stylers": [
          { "saturation": -59 },
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "administrative",
        "stylers": [
          { "visibility": "on" }
        ]
      },{
        "featureType": "road.highway",
        "stylers": [
          { "saturation": -59 },
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "road.arterial",
        "stylers": [
          { "visibility": "on" },
          { "saturation": -44 }
        ]
      },{
        "featureType": "road.local",
        "stylers": [
          { "visibility": "simplified" },
          { "saturation": -15 }
        ]
      },{
        "featureType": "transit",
        "stylers": [
          { "visibility": "on" },
          { "saturation": -33 }
        ]
      },{
        "featureType": "poi",
        "stylers": [
          { "saturation": -59 },
          { "visibility": "on" }
        ]
      },{
        "featureType": "poi.park",
        "stylers": [
          { "visibility": "on" },
          { "saturation": 12 }
        ]
      }
    ];

    var styledMap = new google.maps.StyledMapType(
        styles,
        {name: "Styled Map"}
    );

    //Associate styled map
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
};
  
function drawOnMap(markers) {
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 240
    });      
    // if data (memories) were fed in the form of an array called "markers", plan them 
    // global array "current_markers" - used to keep track of planted markers and clear maps throughout the website        
    current_markers = [];

    // for every element in the "markers" array
    for (i = 0; i < markers.length; i++) {  
        
        // plant a marker on the map using lat/long coordinates
        var marker = new google.maps.Marker({
            map: map,
            clickable: true,
            position: new google.maps.LatLng(markers[i].lat, markers[i].lng)                                            
        });
        
        // add the marker to the current_markers array (so we can remove them later by referring to this)
        current_markers.push(marker)
        
        // plant info (pulled from db) into each marker
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {  

                // map focuses onto marker
                map.setCenter(marker.position);
                map.setZoom(17);


                // display infowindow                  
                infowindow.setContent(
                    '<div><strong>' 
                    //+ markers[i].m_month + '/' + markers[i].m_year + ' - ' + markers[i].g_place 
                    + markers[i].memoryDateShare.split(" ")[0]
                    + '</strong><br>' 
                    + markers[i].g_place + '<br>'
                    + markers[i].story + '<br><br>'
                    + '<div style="font-style:italic; font-size:8pt;"> shared:' + markers[i].time_added + '</div>'
                );                
                infowindow.open(map, marker);
                               
                // marker's relationship with youtube player
                // extract the id of video currently playing (always between "watch?v=" and "&feature" strings in the url)
                var currently_playing = player.getVideoUrl();
                var currently_playing = currently_playing.substr(
                    currently_playing.indexOf("v=") + 2, 
                    11
                );
                
                // if the video associated with this marker is different than one currently playing (including empty value = none playing)                  
                    
                if (currently_playing !== markers[i].video_id) {
                    // load and play the new video
                    $("#player").show();
                    player.loadVideoById(markers[i].video_id);
                }
            }
        })(marker, i));
    } 
}
 

/*
*
*   function to load GSVideoBar
*       
*
*/
function LoadVideoBar(title, artist, yt_player_name) {
    // initialize
    var videoBar;
    var barContainer = document.getElementById("videoBar");
    var player_container_search = document.getElementById(yt_player_name);

    // config video bar; search is done using title and artist as keywords
    var options = {
        largeResultSet : true,
        autoExecuteList : {
            cycleTime : GSvideoBar.CYCLE_TIME_SHORT,
            cycleMode : GSvideoBar.CYCLE_MODE_LINEAR,
            executeList : [ 
                title, 
                artist,
                title + " " + artist,
                artist + " " + title 
            ]          
        },
        horizontal : true,
        thumbnailSize : GSvideoBar.THUMBNAILS_SMALL       
    }

    videoBar = new GSvideoBar(barContainer,  player_container_search, options);
}

/*
*
*   youtube player-related code 
*       
*
*/
// create YT player to be held in the search tab
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// config
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '260',
        width: '360'
    });
} 

/*
*
*   tab-related code
*       
*
*/
//Tab-menu interface feature
$(document).ready(function() {      
    // if user click away from the search tab to the share tab 
    $('#myTab a[href="#share_tab"]').click(function() {  
        // remove any video that might currently be playing on the search tab
        player.stopVideo();
        //$("#player").hide(); 
    });
});   

$(document).ready(function() {
    // click on the tab switches view
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })
});  

$("#myTab").click(function() {   
    player.stopVideo();
});