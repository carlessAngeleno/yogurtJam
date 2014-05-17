// show player on initial load
$(document).ready(function() {          
   $("#player").hide();
})

// draws map and plants markers
function initialize() {

    // Create an array of styles.
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

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(
        styles,
        {name: "Styled Map"}
    );

    // create map object
    // store center coordinate of the US
    var usa_lat_lng = new google.maps.LatLng(40.044437, -96.554509);

    // options for the map we will be creating (US centered)
    var mapOptions = {        
        center: usa_lat_lng,
        zoom: 4,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }               
    };

    // global variable called map (global since this website uses only one map)
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    // insert Google Places search capability
    // set autocomplete options to show only establishments
    var acOptions = {
        types: ['establishment', 'geocode']
    };
    
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),acOptions
    );
    
    autocomplete.bindTo('bounds', map);

    //once user types into Google Places text box and selects a location, pull relevant info
       
    // infowindow object (i.e. pop-up window in Google Maps)
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 240
    });   
    
    // once place "changes" (user selects location using the autocomplete text box)   
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        
        var infoWindow = new google.maps.InfoWindow();
        
        // plant new marker  
        var marker = new google.maps.Marker({
            map: map
        });
        
        // extract place info
        var place = autocomplete.getPlace();
        
        // map focuses onto place         
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } 
        else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // take down place's location (lat/long)
        var new_place_lat_lng = place.geometry.location;
    
        // put a marker on the location 
        marker.setPosition(new_place_lat_lng);
        
        // infowindow to pop up will have the name of the place
        infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
       
        infoWindow.open(map, marker);

        google.maps.event.addListener(marker,'click',function(e){
            infoWindow.open(map, marker);
        });
        
        // we save into lat and lng vars if user confirms this is the right place         
        $("#select_place_button").click(function() {         
            new_place_lat = new_place_lat_lng.lat(); 
            new_place_lng = new_place_lat_lng.lng();
            new_place_g_place = place.name;            
        });        
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
};

/*
*
*   search memory
*       pulls relevant videos from database when user submits search form
*
*/
$(document).ready(function() {     
    // when user clicks on search button
    $("#search_button").click(function() {               
        // make sure that if a video was already playing we remove it first
        player.stopVideo();
        //$("#player").hide();
        // clear map by removing all current markers from map
        //for (var i = 0; i < current_markers.length; i++) {
        //    current_markers[i].setMap(null);
        //}          
        
        // store input as variables
        var title = $("#title_search").val();
        var artist = $("#artist_search").val();

        // rawDateMin = $("#memoryDateMin").val();
        // rawDateMax = $("#memoryDateMax").val();

        // memoryDateMin = $("#memoryDateMin").val().split("/");
        // memoryDateMax = $("#memoryDateMax").val().split("/");        
        // var minMonth = parseInt(memoryDateMin[0]);
        // var minDate = parseInt(memoryDateMin[1]);
        // var minYear = parseInt(memoryDateMin[2]);
        
        // var maxMonth = parseInt(memoryDateMax[0]);
        // var maxDate = parseInt(memoryDateMax[1]);
        // var maxYear = parseInt(memoryDateMax[2]);

        // console.log(memoryDateMin);
        // console.log(memoryDateMax);
        // console.log(maxMonth);
        // console.log({
        //         title: title,
        //         artist: artist,
        //         //memoryDateMin: memoryDateMin,
        //         //memoryDateMax: memoryDateMax
        //         rawDateMin: rawDateMin,
        //         rawDateMax: rawDateMax,
        //         minMonth: minMonth,
        //         minDate: minDate,
        //         minYear: minYear,
        //         maxMonth: maxMonth,
        //         maxDate: maxDate,
        //         maxYear: maxYear
        //     })


        $.ajax({        
            url: '/yogurtjam/video_search/searchVideos',
            type: 'POST',
            data: {
                title: title,
                artist: artist
                // ,
                //memoryDateMin: memoryDateMin,
                //memoryDateMax: memoryDateMax
                // rawDateMin: rawDateMin,
                // rawDateMax: rawDateMax,
                // minMonth: minMonth,
                // minDate: minDate,
                // minYear: minYear,
                // maxMonth: maxMonth,
                // maxDate: maxDate,
                // maxYear: maxYear
            },
            dataType: "json",
            success: function(response) {               
                markers = response;
                //player.loadVideoById(response);
                // plant the new markers
                initialize();
                $("#search_tab").hide();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }          
        });

        // not actually making POST, so have to return false
        return false; 
    });      
});


/*
*
*   share memory
*       inserts user submission into database
*
*/
$(document).ready(function() { 
    // when user clicks on share button
    $("#share_button").click(function() {

        // take care of tabs
        $('#share_tab_select_video').show();
        $('#select_video').hide();
        $('#video_selection_share').hide();
        $('#share_tab_final_submit').hide();

        // clear map by removing all current markers
        for (var i = 0; i < current_markers.length; i++) {
            current_markers[i].setMap(null);
        }
        
        // store input as variables
        var title = $("#title_share").val();
        var artist = $("#artist_share").val();
        var lat = new_place_lat;
        var lng = new_place_lng;
        var g_place = new_place_g_place;
        // var month = $("#month_share").val();        
        // var year = $("#year_share").val();
        var story = $("#story_share").val();        
        var tag1 = $("#tag1_share").val(); 

        var memoryDateShare = $("#memoryDateShare").val(); 

        // use stored variables to send ajax request
        // (which validates input, inserts it into the "memory" table in SQL database, 
        //  and pulls all memories with the same title and artist as user's input)
        $.ajax({
        
            url: '/yogurtjam/video_share/shareVideos',
            type: 'POST',
            data: {
                title: title,
                artist: artist,
                video_id: video_id,
                lat: lat,
                lng: lng,
                g_place: g_place,
                memoryDateShare: memoryDateShare,
                // month: 1,
                // year: 1,
                story: story,
                tag1: tag1
            },
            dataType: "json",
            success: function(response) {             
                markers = response;
                $("#search_mode").click();                  
                initialize();                                
                // change the title of the website to match the title of the song
                //$("#title").text(title + " - " + artist);                  
                // direct user to the search tab                
                //$('#myTab a[href="#search_tab"]').tab('show');
            }              
        }); 

        return false; 
    });         
});      

/*
*
*   auxiliary functions for share memory
*       
*
*/
// $(document).ready(function() {
//     // once video selected (while filling out share form)
//     $("#select_video").click(function() { 

//         // switch tabs
//         $('#share_tab_select_location').show();
//         $('#share_tab_select_video').hide();
//         $('#share_tab_final_submit').hide();

//         // parse video_url and store video's unique id (by YT)
//         // as a global that can be used by other functions
//         var video_url = $("a.title_gsvb").attr("href");
//         video_id = video_url.substr(
//             video_url.indexOf("watch?v=") + 8, 
//             video_url.length
//         );
//         $("#share_button").show();
//     });
// });
 

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

// have YT player hidden at first so user doesn't get confused by empty container
// $("#player").hide();

//helper functions
// function stopVideo() {
//    player.stopVideo();
// }

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

$(document).ready(function() {
    $('#search_button').click(function () {        
          $("input[type=text], textarea").val("");
    })
})

$(document).ready(function() {
    $("#search_mode").click();
    
    // click on the tab switches view
    $("#share_mode").click(function () {
    $("#search_tab").hide();
      $("#share_tab").show();
        $('#share_tab_final_submit').hide();
        $('#share_tab_select_location').hide();
        $('#video_section_share').hide();        
        $('.content_display').hide();  
        clearAll();
  })
    // click on the tab switches view
    $("#search_mode").click(function () {
    $("#share_tab").hide();
      $("#search_tab").show();
        $('.content_display').show();  
        clearAll();        
    })
});

function clearAll() {
    
    player.stopVideo();
    $("#player").hide();

    for (var i = 0; i < current_markers.length; i++) {
        current_markers[i].setMap(null);
    }

    $("input[type=text], textarea").val("");
};



// datepicker
// $(function() {
    // $( "#memoryDateMin" ).datepicker({
    //     defaultDate: "+1w",
    //     changeYear: true,
    //     changeMonth: true,
    //     numberOfMonths: 1,
    //     onClose: function( selectedDate ) {
    //         $( "#memoryDateMax" ).datepicker( "option", "minDate", selectedDate );
    //     }
    // });

    // $( "#memoryDateMax" ).datepicker({
    //     defaultDate: "+1w",
    //     changeYear: true,      
    //     changeMonth: true,
    //     numberOfMonths: 1,
    //     onClose: function( selectedDate ) {
    //         $( "#memoryDateMin" ).datepicker( "option", "maxDate", selectedDate );
    //     }
    // });

    // $( "#memoryDateShare" ).datepicker({
        // defaultDate: "+1w",
        // changeYear: true,      
        // changeMonth: true,
        // numberOfMonths: 1,
        // onClose: function( selectedDate ) {
        //     $( "#memoryDateMin" ).datepicker( "option", "maxDate", selectedDate );
        // }
    // });

    // // auto-populate date range
    // var today = new Date();
    // var dd = today.getDate();
    // var min_dd = 1;

    // var mm = today.getMonth()+1; //January is 0!

    // var yyyy = today.getFullYear();
    
    // if (dd < 10) {dd = '0' + dd} 
    
    // if (mm < 10) {mm = '0' + mm} 
    
    // today = mm + '/' + dd + '/' + yyyy;
    // var min_day = mm + '/' + min_dd + '/' + (yyyy - 1);

    // $("#memoryDateMin").val(min_day);
    // $("#memoryDateMax").val(today);

// });