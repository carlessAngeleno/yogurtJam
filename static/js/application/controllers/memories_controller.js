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
    }
  }
});