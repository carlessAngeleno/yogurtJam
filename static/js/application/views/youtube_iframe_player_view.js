Memories.YoutubeIframePlayerView = Ember.View.extend({
  didInsertElement: function() {
    player = new YT.Player('player', {
        height: '260',
        width: '360'
    });

    this.$().hide();
  }
});

Ember.Handlebars.helper('youtube-iframe-player', Memories.YoutubeIframePlayerView);