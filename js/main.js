
 /*初始化*/
 init();

 /**
  *初始化函数
  *将存储的数据取出,并渲染页面
  */
 function init() {
    songList = store.get('songList') || [];
    songs = store.get('songs') || [];
    playedSongs = store.get('playedSongs') || [];
    render.renderList();
    render.renderSong();
    render.renderAudio();
 }

 /*改变默认的滑动条样式*/
(function($) {
    $(document).ready(function() {
        $(".main-left").mCustomScrollbar({
            theme: 'dark-2'
        });
        $(".main-right").mCustomScrollbar({
            theme: 'dark-2'
        });
    });
})(jQuery);

/*开启轮播图*/
$('.poster').carousel();

panel.findMusicTab();
panel.leftListTab();
panel.loginPanel();
panel.recommendedList();

 






