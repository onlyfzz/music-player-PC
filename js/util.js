 
 var songList = [],       //存储创建的歌单
     songs = [],          //存储添加的我喜欢的音乐
     playedSongs = [];    //存储播放过的音乐

/**
 *(工具对象1)
 *实现本地存储     
 *@param{string} key 传入存储或想要提取的key值
 *@param{string} value 传入想要存储的值
 *return{object} 返回实现存取功能的对象
 */
var store = function() {
   var obj = {};
   obj.save = function(key, value) {
       var str = JSON.stringify(value);
       localStorage.setItem(key, str);
   };
   obj.get = function(key) {
       var str = localStorage.getItem(key);
       return JSON.parse(str);
   };
   obj.clear = function() {
       localStorage.clear();
   };
   obj.remove = function(key) {
       localStorage.removeItem(key);
   };
   return obj;
}();

/**
 *(工具对象2)
 *实现各种渲染功能
 *render对象来存储各种渲染函数
 *return{Object} 返回具有渲染功能的对象
 */
var render = function() {
   var renderObj = {
       // 渲染我喜欢的音乐歌单列表
       renderSong:function() {
           var $likeList = $('.like-list'),
               $listNum = $likeList.find('.listNum'),
               $likeSong = $likeList.find('.songList-tb').find('table'),
               trHtml = '',
               j = 0;

           $likeSong.find('tr:gt(0)').remove();
           for(var i = 0; i < songs.length; i++) {
               i < 9 ? j = '0' + (i + 1) : j = i;
               trHtml += '<tr data-src='+songs[i].src+' data-img='+songs[i].img+' data-index='+i+'>'+
                       '<td><span class="num">'+j+'</span>'+
                           '<i class="iconfont icon-xihuan"></i>'+
                           '<i class="iconfont icon-xiazai"></i>'+
                       '</td>'+
                       '<td class="song-name">'+songs[i].name+'</td>'+
                       '<td class="song-singer">'+songs[i].singer+'</td>'+
                       '<td>'+songs[i].album+'</td>'+
                   '</tr>';
           }
           $listNum.text(songs.length);
           $likeSong.append(trHtml);
       },
       // 渲染新创建的歌单
       renderList:function() {         
           var $inputDd = $('.create-input'),
               $likeList = $('.like-list'),
               $newCreateTit = $('div.new-create-tit'),
               $newCreateList = $('div.new-create-list'),
               listTit = '',
               listHtml = '';

           $newCreateTit.html('');
           $newCreateList.html('');
           if (songList.length > 0) {
               for(var i = 0; i < songList.length; i++) {          
                   listTit += '<dd class="new-song-list dd-item" data-pointer='+i+' data-index='+songList[i].index+'>'+songList[i].title+'</dd>';
                   listHtml += '<div class="right-sup main-right-songList" data-pointer='+i+' data-index='+songList[i].index+'>'+
                           '<div class="songList-top clearfix">'+
                               '<div class="img-left">'+
                                   '<img class="girl" src="imgs/song/cd.jpg" alt="背景">'+
                               '</div>'+
                               '<div class="info-right">'+
                                   '<div><span class="info-list">歌单</span><span class="songListName">'+songList[i].title+
                                       '</span><img class="edit" src="imgs/song/bianji.png" alt="更改" title="更改信息"></div>'+
                                   '<div class="create-info">'+
                                       '<span class="username">Mr_fzz</span>'+
                                       '<span class="createTime">'+songList[i].time+'创建</span>'+
                                   '</div>'+
                                   '<div class="edit-info">'+
                                       '<span> 标签 ：</span>'+
                                       '<span class="edit"> '+(songList[i].label||'添加标签')+'</span>'+
                                   '</div>'+
                                   '<div class="edit-info">'+
                                       '<span> 简介 ：</span>'+
                                       '<span class="edit"> '+(songList[i].desc||'添加简介')+'</span>'+
                                   '</div>'+
                               '</div>'+
                               '<span class="listNum">0</span>'+
                           '</div>'+
                           '<div class="song-list-nav">'+
                               '<ul class="clearfix">'+
                                   '<li><a class="active" data-index="0" href="#">歌曲列表</a></li>'+
                                   '<li><a data-index="1" href="#">评论</a></li>'+
                                   '<li><a data-index="2" href="#">收藏者</a></li>'+
                               '</ul>'+
                           '</div>'+
                           '<div class="songList-tb search-result">'+
                               '<table>'+
                                   '<tr class="result-head">'+
                                       '<th class="operate">操作</th>'+
                                       '<th class="name">音乐标题</th>'+
                                       '<th class="singer">歌手</th>'+
                                       '<th class="album">专辑</th>'+
                                   '</tr>'+
                               '</table>'+
                           '</div>'+
                       '</div>';
               }
           }
           $newCreateTit.html(listTit);
           $newCreateList.html(listHtml);
           store.save('songList',songList);

           $newCreateList.find('.edit').click(function() {
               var index = $(this).parents('.main-right-songList').data('pointer');
               render.renderListDetail(index);
           });
       },
       //渲染新创建的歌单详细信息
       renderListDetail:function(index){
           var list = songList[index],
               $DetailContainer = $('.list-detail-container'),
               $rightSup = $('.right-sup'),
               $listDetail = $('<div class="new-list-detail">'+
                       '<h2>编辑歌单信息</h2>'+
                       '<div class="detail-cont">'+
                           '<div class="list-name">'+
                               '<label><span>歌单名：</span>'+
                               '<input class="list-name-text" type="text" autofocus value='+(list.title||'')+'></label>'+
                           '</div>'+
                           '<div class="list-label">'+
                               '<label><span>标签：</span>'+
                               '<input class="list-label-text" type="text" value='+(list.label||'')+'></label>'+
                           '</div>'+
                           '<div class="list-info">'+
                               '<label><span>介绍：</span><textarea  class="list-desc" type="text" >'+(list.desc||'')+'</textarea>'+
                           '</div>'+
                           '<div class="bt-group">'+
                               '<button class="save">保存</button>'+
                               '<button class="cancel">取消</button>'+
                           '</div>'+
                       '</div>'+
                   '</div>');
           $DetailContainer.html('');
           $listDetail.appendTo($DetailContainer);
           $DetailContainer.show();
           $rightSup.hide();

           var $save = $listDetail.find('.save'),
               $cancel = $listDetail.find('.cancel'),
               $listName = $listDetail.find('.list-name-text'),
               $listDesc = $listDetail.find('.list-desc'),
               $listLabel = $listDetail.find('.list-label-text');

           function showItem() {
               var $rightSup = $('.right-sup'),
                   $ddItem = $('.dd-item');
               $rightSup.each(function() {
                   if ($(this).data('pointer') == index) {
                       $(this).show();
                       var itemIndex = $(this).data('index');
                       $ddItem.each(function() {
                           $(this).removeClass('active');
                           if ($(this).data('index') == itemIndex) {
                               $(this).addClass('active');
                           }
                       });
                   }
               });
           }
           $cancel.click(function() {
               $DetailContainer.hide();
               showItem();
           });

           $save.click(function() {
               $DetailContainer.hide();
               var titVal = $listName.val(),
                   labelVal = $listLabel.val(),
                   descVal = $listDesc.val();
               if (titVal !== '' || descVal !== '' || labelVal !== '') {
                   var obj = {};
                   obj.title = titVal;
                   obj.label = labelVal;
                   obj.desc = descVal;
                   update(index, songList, obj);
                   render.renderList();
               }
               showItem();
           });
       },
       //渲染Audio和播放列表
       renderAudio:function() {
           var $audio = $('#audio'),
               $playedList = $('#played-list'),
               $listNum = $playedList.find('.list-num'),
               $listDetail = $playedList.find('table');
           $audio.find('source:not(.inherent)').remove();
           $listDetail.find('tr:not(.inherent)').remove();
           var audioHtml = '',
               listHtml = '';
           if (playedSongs.length > 0) {
               for(var i = 0; i < playedSongs.length; i++){
                   audioHtml += '<source src='+playedSongs[i].src+
                         ' data-img='+playedSongs[i].img+
                         ' data-name='+playedSongs[i].name+
                         ' data-singer='+playedSongs[i].singer+'>';

                   listHtml += '<tr data-src='+playedSongs[i].src+' data-img='+playedSongs[i].img+'>'+
                                   '<td class="song-name">'+playedSongs[i].name+'</td>'+
                                   '<td class="song-singer">'+playedSongs[i].singer+'</td>'+
                             '</tr>';
               }
           }
           $listNum.text(playedSongs.length+2);
           $audio.prepend(audioHtml);
           $listDetail.prepend(listHtml);
           store.save('playedSongs',playedSongs);
       },
       // 渲染左侧音乐信息
       renderInfo:function(src,name,singer) {
           var $songImg    =   $('#songImg'),
               $songName   =   $('#songName'),
               $songSinger =   $('#songSinger');

           $songImg.attr('src', src);
           $songName.text(name);
           $songSinger.text(singer);
       }
   };
   return renderObj;
}();

 /**
  *tab切换函数  (工具函数)
  *@param{jQueryObj} nav 传入ul列表的父div
  *@param{jQueryObj} item 传入被切换的元素集合 
  */
function tab(nav,item) {
    var navItem = nav.find('a');
    //让所有的navItem移除样式,让索引为index的item显示
    function change(index) {
        for(var i = 0; i < navItem.length; i++) {
            navItem.eq(i).removeClass('active');
            item.eq(i).hide();
        }
        item.eq(index).show();
    } 
    //用事件代理,调用change(),并且给当前的a添加样式
    nav.on('click','a',function(e) {
        e.stopPropagation();
        var index = $(this).data('index');
        change(index);
        $(this).addClass('active');
    });
}

/*扩展存储的数据 (工具函数)*/
function update(index,arr,data) {
    arr[index] = $.extend(arr[index], data);   
}

/**
 *显示提醒消息,淡入淡出(工具函数)
 *@param{string} msg 传入想要显示的消息
 */
function showRemind(msg) {
    var $remindMsg = $('.remind-msg'),
        $msg=$remindMsg.find('p');

    $msg.text(msg);
    $remindMsg.fadeIn(400).fadeOut(2000);   
}

