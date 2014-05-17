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
      $.getJSON('http://127.0.0.1:8000/yogurtjam/default/api/memory?artist=' + artist + '&title=' + title + 'firework')
        .then(function(response) {
          markers = response.memories;
          initialize();
          $("#search_tab").hide();
      })
    },

    searchYoutube: function() {
      // switch tabs
      $('#select_video').show();
      $("#gsvb_modal").modal();
      $('#video_section_share').show();          
      $('#share_tab_final_submit').hide;

      var title = $("#title_share").val();
      var artist = $("#artist_share").val();

      // GSVideoBar
      LoadVideoBar(title, artist, "player_container_share");

      // simulate a click on the first thumnail so user doesn't have to
      setTimeout(function(){
        $('.resultDiv_gsvb img[vspace$="1"]')[0].click();
      }, 1000);
      
      return false;        
    },

    confirmLocation: function() {
        alert(title);
        alert(artist);
        // switch tabs
        $('#share_tab_final_submit').show();
        $('#share_tab_select_location').hide();         
    },    

    insertMemory: function() {      
      $.post(
        "http://127.0.0.1:8000/yogurtjam/default/api/memory",
        { 
          "story": "new", 
          "tag1": "sdfs", 
          "title": "new_firework", 
          "video_id": "QGJuMBdaqIw", 
          "g_place": "Hotel Cir S", 
          "lat": 32.7589995, 
          "lng": -117.1763604, 
          "artist": "katy perry", 
          "time_added": "2013-05-17 05:42:30", 
          "memoryDateShare": "2014-05-01 00:00:00"
        }
      )
      .done(function(data) {
        alert("Data Loaded");
      });
    }
  }
});