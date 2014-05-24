Memories.YoutubeIframePlayerView = Ember.View.extend({
  didInsertElement: function() {
    var player = new YT.Player(this.$().attr('id'), {
        height: '260',
        width: '360'
    });
    this.get('controller').set('player', player); 
  }
});

Ember.Handlebars.helper('youtube-iframe-player', Memories.YoutubeIframePlayerView);