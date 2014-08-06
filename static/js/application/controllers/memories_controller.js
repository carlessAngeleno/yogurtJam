App.MemoriesController = Ember.ArrayController.extend({
  needs: "memory",
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },

    searchMemories: function() {
                // debugger;
      var title = this.get('newTitle');
      var artist = this.get('newArtist');
      var scope = this;

      $.getJSON('/yogurtjam/default/api/memory?artist=' + artist + '&title=' + title)
        .then(function(response) {          
          var markers = response.memories;          
          scope.store.unloadAll(App.Memory);
          scope.store.pushMany('memory', markers);    
          scope.drawOnMap(markers);
      });
    },

    searchYoutube: function() {
      $("#gsvb_modal").modal({backdrop: true});

      var title = this.get('newTitle');
      var artist = this.get('newArtist');

      // GSVideoBar
      this.loadVideoBar(title, artist, "player_container_share");

      // simulate a click on the first thumnail so user doesn't have to
      setTimeout(function(){
        $('.resultDiv_gsvb img[vspace$="1"]')[0].click();
      }, 1000);
      
      return false;        
    },
    
    selectVideo: function() {
      // parse video_url and store video's unique id (by YT)
      // as a global that can be used by other functions
      var video_url = $("a.title_gsvb").attr("href");
      var video_id = video_url.substr(
          video_url.indexOf("watch?v=") + 8, 
          video_url.length
      );
      this.set('video_id', video_id);
    },

    confirmLocation: function() {
        var autocomplete = this.get('autocomplete');
        var place = autocomplete.getPlace();
        var new_place_lat_lng = place.geometry.location;
        this.set('lat', new_place_lat_lng.lat()); 
        this.set('lng', new_place_lat_lng.lng());
        this.set('g_place', place.name);
    },    

    insertMemory: function() {     

      function formatDate(raw) {        
        var parts = raw.split('/');
        var formatted = parts[2] + '-' + parts[0] + '-' + parts[1]
        return formatted +  ' 00:00:00';
      }

      var scope = this;

      $.post(
        "/yogurtjam/default/api/memory",
        { 
          "story": this.get('newStory'), 
          "tag1": this.get('newTags'), 
          "title": this.get('newTitle'), 
          "video_id": this.get('video_id'), 
          "g_place": this.get('g_place'), 
          "lat": this.get('lat'),
          "lng": this.get('lng'),
          "artist": this.get('newArtist'),
          "memoryDateShare": formatDate(this.get('newMemoryDate'))
        }
      )
      .done(function(data) {
        scope.send('searchMemories');
      });
    },

    pickRandomMemory: function() {
      var that = this;
      var markers = this.get('model').get('content');

      $.when(findIds(markers)).then(function(ids) {
        var index = Math.floor(Math.random() * (ids.length));
        var newId = ids[index];
        that.transitionToRoute('memory', newId);
      });

      function findIds(markers) {
        return $.map(markers, function(marker) {
            return marker.id;
        });
      }   
    }

  }, // end of actions

  drawOnMap: function(markers) {

      function panAndZoom(map, position) {
        $.when(map.panTo(position)).then(function() {
          window.setTimeout(function() {map.setZoom(14);}, 1000)
        })      
      }

      var map = this.get('g_map');
      var player = this.get('player');

      var infowindow = new google.maps.InfoWindow({
          maxWidth: 240
      });      
      // if data (memories) were fed in the form of an array called "markers", plan them 
      // global array "current_markers" - used to keep track of planted markers and clear maps throughout the website        
      var current_markers = [];

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
                  panAndZoom(map, marker.position)
                  // map.panTo(marker.position);
                  // map.setZoom(14);


                  // display infowindow                  
                  infowindow.setContent(
                      '<div><strong>' 
                      //+ markers[i].m_month + '/' + markers[i].m_year + ' - ' + markers[i].g_place 
                      + markers[i].memoryDateShare.split(" ")[0]
                      + '</strong><br>' 
                      + markers[i].g_place + '<br></div>'
                      // + markers[i].story + '<br><br>'
                      // + '<div style="font-style:italic; font-size:8pt;"> shared:' + markers[i].time_added + '</div>'
                  );                
                  infowindow.open(map, marker);

                  window.location.href = "#/artists/" + markers[i].artist + "/songs/" + markers[i].title + "/memory/" + markers[i].id;              
              }
          })(marker, i));
      } 
  },

  loadVideoBar: function(title, artist, yt_player_name) {
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
  },

  two: 2,

  mapSel: "#map_canvas"

});