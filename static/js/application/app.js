// show player on initial load
$(document).ready(function() {          
   $("#player").hide();

    // create YT player
    var player;
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Need this function to talk to the API
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '260',
            width: '360'
        });
    }    
})