Memories.YoutubeIframePlayerView = Ember.View.extend({
  
  video_idBinding: 'controller.content.video_id',

  didInsertElement: function() {
    var video_id = this.get('video_id');

    var player = new YT.Player(this.$().attr('id'), {
      height: '260',
      width: '360',
      events: {
        'onReady' : onPlayerReady
      }
    });

    this.set('player', player);

    function onPlayerReady(event) {
      event.target.loadVideoById(video_id);
      $(event.target.a).show();
    }
  },
  load: function(player, video_id) {
    var video_id = this.get('video_id');
    var player = this.get('player');

    player.loadVideoById(video_id);   

  }.observes('video_id') 
});