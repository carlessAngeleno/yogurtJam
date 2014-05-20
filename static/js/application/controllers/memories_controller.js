Memories.MemoriesController = Ember.ArrayController.extend({

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
      var title = this.get('newTitle');
      var artist = this.get('newArtist');

      $.getJSON('/yogurtjam/default/api/memory?artist=' + artist + '&title=' + title)
        .then(function(response) {          
          markers = response.memories;          
          Memories.Memory.store.unloadAll(Memories.Memory);
          Memories.Memory.store.pushMany('memory', markers);
          drawOnMap(markers);
          // $("#search_tab").hide();
      });
    },

    searchYoutube: function() {
      // switch tabs
      // $('#select_video').show();
      $("#gsvb_modal").modal({backdrop: false});
      // $('#video_section_share').show();          
      $('#share_tab_final_submit').hide;

      var title = this.get('newTitle');
      var artist = this.get('newArtist');

      // GSVideoBar
      LoadVideoBar(title, artist, "player_container_share");

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
      video_id = video_url.substr(
          video_url.indexOf("watch?v=") + 8, 
          video_url.length
      );
      this.set('video_id', video_id);
    },

    confirmLocation: function() {
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

      var placeholder = this;

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
        // initialize();
        placeholder.send('searchMemories');
      });
    },

    // resetShare: function() {
    //   $("#share_tab").hide();
    //   $("#search_tab").show();
    //   $('.content_display').show();  
    //   clearAll();       
    // },    

    resetSearch: function() {
      // $("#search_tab").hide();
      // $("#share_tab").show();
      // $('#share_tab_final_submit').hide();
      // $('#share_tab_select_location').hide();
      // $('#video_section_share').hide();        
      // $('.content_display').hide();  
      // clearAll();    
      // player.stopVideo();
      // $("#player").hide();         
    }
  }
});