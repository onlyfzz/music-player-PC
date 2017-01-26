/**
 *给创建的歌单添加右键点击菜单
 */
 (function() {
    var $newCreate = $('dl.left-create-list'),
        $newCreateTit = $('.new-create-tit'),
        $titItem = $newCreate.find('.dd-item'),
        $titMenu = $('#new-menu'),
        $likedd = $('.likeMusic'),
        $likeMenu = $('#like-menu'),
        $playBt = $likeMenu.find('.play'),
        $nextBt = $likeMenu.find('.next'),
        $delete = $titMenu.find('.delete'),
        $edit = $titMenu.find('.edit'),
        $rightSup = $('.right-sup'),
        audio = $('#audio')[0],
        index = 0;
    //右键点击我喜欢的音乐显示菜单
    $likedd.on('contextmenu',function(e) {
        e.preventDefault();
        var y = e.pageY;
        $likeMenu.css('top',y).show();
    });
    //播放
    $playBt.click(function() {
        if (songs.length > 0) {
            for(var i = songs.length - 1; i >= 0; i--) {
                playedSongs.unshift(songs[i]);
            }
            var src = playedSongs[0].src,
                img = playedSongs[0].img,
                name = playedSongs[0].name,
                singer = playedSongs[0].singer;
            audio.src = playedSongs[0].src;
            player.play();
            render.renderInfo(img,name,singer);
            render.renderAudio();
        }
    });
    //下一首
    $nextBt.click(function() {
        audio.changeSong('next');
    });
    //新建的歌单右键点击显示
    $newCreateTit.on('contextmenu','.dd-item',function(e) {
        e.preventDefault();
        index = $(this).data('pointer');
        var y = e.pageY - $titMenu.height() - 20;
        $titMenu.css('top',y).show();
    });
    //点击其他地方菜单隐藏
    $('.container').click(function() {
        $titMenu.hide();
        $likeMenu.hide();
    });
    //删除新建歌单
    $delete.click(function() {
        deleteList();
    });
    //编辑新建歌单
    $edit.click(function() {
        render.renderListDetail(index);
    });

    //删除歌单
    function deleteList() {
        songList.splice(index, 1);
        render.renderList();
        var $item = $('.likeMusic'),
            pointer = $item.data('index');
        showRemind('歌单已被删除');
        $item.addClass('active');
        $rightSup.each(function() {
            if ($(this).data('index') == pointer) {
                $(this).show();
            }
        });
    }
 })();