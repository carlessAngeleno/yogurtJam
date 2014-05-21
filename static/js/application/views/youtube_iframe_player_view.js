Memories.YoutubeIframePlayerView = Ember.View.extend({
  didInsertElement: function() {
    player = new YT.Player(this.$().attr('id'), {
        height: '260',
        width: '360'
    });

    this.$().hide();
  }
});

Ember.Handlebars.helper('youtube-iframe-player', Memories.YoutubeIframePlayerView);