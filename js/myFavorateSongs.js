/**
*点击搜索结果爱心图标,添加歌曲进歌单(我喜欢的音乐)
*/
(function(){
   var searchResult = $('#search-result'),
       $remindMsg = $('.remind-msg'),
       $msg = $remindMsg.find('p'),
       $likeSong = $('.songList-tb').find('table');

   //创建新的数据存储对象,并将对象推进数组
   searchResult.on('click','i.icon-xihuan',function() {
       var $tr = $(this).parent().parent(),
           song = {};

       song.src    =   $tr.data('src');
       song.img    =   $tr.data('img');
       song.name   =   $tr.find('.song-name').text();
       song.singer =   $tr.find('td').eq(2).text();
       song.album  =   $tr.find('td').eq(3).text();

       songs.unshift(song);
       render.renderSong();
       showRemind('已添加到我喜欢的音乐');
       store.save('songs',songs);
   });
})();

/**
*从我喜欢的音乐中移除歌曲(点击爱心图标)
*/
(function() {
   var $likeList = $('.like-list');
   $likeList.on('click', '.icon-xihuan', function() {
       var index = $(this).parents('tr').data('index');
       songs.splice(index, 1);
       render.renderSong();
       store.save('songs', songs);
   });
})();