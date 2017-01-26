/**
*播放设置
*/
var player=function() {
   var $audio      =   $('#audio'),
       audio       =   $audio[0],                          //audio
       $songList   =   $audio.find('source'),              //source列表
       $playBt     =   $('img.play'),                      //播放按钮
       $prevBt     =   $('.play-left').find('.prev'),      //上一首
       $nextBt     =   $('.play-left').find('.next'),      //下一首
       $progress   =   $('.play-mid').find('.progress'),   //歌曲总长度条
       $buffered   =   $progress.find('.buffered'),        //缓冲条
       $played     =   $progress.find('.played'),          //已播放长度条
       $progressBt =   $progress.find('.progress-bt'),     //播放进度按钮
       $playRight  =   $('.play-right'),                   
       $voice      =   $playRight.find('.voice'),          //声音总长度条
       $voicePro   =   $playRight.find('.voice-pro'),      //声音长度条
       $muteBt     =   $playRight.find('.voice-bt'),       //静音按钮
       $voiceBt    =   $playRight.find('.progress-bt'),    //声音长度按钮
       $circuBt    =   $playRight.find('.circulation'),    //循环模式按钮
       bufferedtime,
       playedtime,
       index=1;

       audio.volume = 0.5;   //默认声音为0.5

   var playerObj = {
       //播放
       play: function() {
           audio.play();
           this.showTime();
           this.buffered();
           this.playTime();
           $playBt.attr({
               'src'       : 'imgs/song/pause.png',
               'title'     : '暂停'
           });
       },
       //暂停
       pause: function() {
           audio.pause();
           this.clearTime();
           $playBt.attr({
               'src'       : 'imgs/song/play.png',
               'title'     : '播放'
           });
       },
       /**
        *改变播放歌曲
        *@param{string} order 传入命令(next或者prev)
        */
       changeSong: function(order) {
           if (order == 'next') {
               //如果&&之前结果为false,则执行前面的代码,如果为true,则执行之后的代码
               ++index > $songList.length && (index = 1);
           }else{
               --index < 1 && (index = $songList.length);
           }

           var currentSong = $songList.eq(index - 1),
               currentSrc = currentSong.attr('src'),
               img = currentSong.data('img'),
               name = currentSong.data('name'),
               singer = currentSong.data('singer');

           render.renderInfo(img, name, singer);
           $audio.attr('src', currentSrc);
           this.clearTime();
           this.play();
       },
       //点击改变正在播放的时间
       playPoint: function(e){ 
           var x = e.pageX - $this.offset().left,
               percent = x / $progress.width();
           audio.currentTime = audio.duration * percent;
           $played.css('width', x);
           $progressBt.css('left', x);
       },
       //改变声音大小
       voicePoint: function(e) {
           var x = e.pageX - $this.offset().left,
               percent = x / $this.width();
           audio.volume = percent.toFixed(1);
           $voicePro.css('width',x);
           $voiceBt.css('left', x);
       },
       //清除定时器
       clearTime: function(){
           clearInterval(bufferedtime);
           clearInterval(playedtime);
       },
       //显示缓冲的长度
       buffered: function(){
           bufferedtime = setInterval(function(){
               var buffered,
                   percent;
               audio.readyState == 4 && (buffered = audio.buffered.end(0));
               percent = buffered / audio.duration;
               var width = percent * $progress.width();
               $buffered.width(width);
               if (percent == 1) {
                   clearInterval(bufferedtime);
               }
           },1000);
       },
       //显示歌曲的总时间
       showTime: function(){
           setTimeout(function(){
               var m = audio.duration / 60,
                   s = audio.duration % 60,
                   $m = $('.end-time').find('.m'),
                   $s = $('.end-time').find('.s');
               if (s < 10 || m < 10) {
                   if (s < 10) {
                       if (m < 10) {
                           $m.text('0' + parseInt(m) + ':');
                       }else {
                           $m.text(parseInt(m) + ':');
                       }
                       $s.text('0' + parseInt(s));
                   }
                   if (m < 10) {
                       if (s < 10) {
                           $s.text('0' + parseInt(s));
                       }else {
                           $s.text(parseInt(s));
                       }
                       $m.text('0' + parseInt(m) + ':');
                   }
               }else {
                   $m.text(parseInt(m) + ':');
                   $s.text(parseInt(s));
               }
           },500);
       },
       //显示歌曲正在播放的时间
       playTime: function(){
           playedtime = setInterval(function(){
               var percent,
                   width,
                   currentTime = audio.currentTime,
                   $m = $('.play-time').find('.m'),
                   $s = $('.play-time').find('.s'),
                   m = currentTime / 60,
                   s = currentTime % 60;

               if (s < 10 || m < 10) {
                   if (s < 10) {
                       if (m < 10) {
                           $m.text('0' + parseInt(m) + ':');
                       }else {
                           $m.text(parseInt(m) + ':');
                       }
                       $s.text('0' + parseInt(s));
                   }
                   if (m < 10) {
                       if (s < 10) {
                           $s.text('0' + parseInt(s));
                       }else {
                           $s.text(parseInt(s) + ':');
                       }
                       $m.text('0' + parseInt(m) + ':');
                   }
               }else {
                   $m.text(parseInt(m) + ':');
                   $s.text(parseInt(s));
               }
               percent = currentTime / audio.duration;
               width = $progress.width() * percent;
               $played.css('width', width);
               $progressBt.css('left', width);
               //播放结束清除定时间
               if (audio.ended) {
                   clearInterval(playedtime);
                   //单曲循环还是列表循环
                   if (!audio.loop) {
                       $nextBt.click();
                   }                           
               }
           },1000);
       },
       //绑定各种事件
       event: function() {
           var _this = this;
           //播放或者暂停
           $playBt.click(function() {
               if (audio.paused) {
                   _this.play();                   
               }else{
                   _this.pause();
               }
           });
           //上一首
           $prevBt.click(function() {
               _this.changeSong('prev');
           });
           //下一首
           $nextBt.click(function() {
               _this.changeSong('next');
           });
           //点击改变正在播放的进度
           $progress.click(function(e) {
               $this = $(this);
               _this.playPoint(e);
           });
           //点击改变声音
           $voice.click(function(e) {
               $this = $(this);
               _this.voicePoint(e);
           });
           //静音按钮点击
           $muteBt.click(function() {
               if (audio.muted) {
                   audio.muted = false;
                   $(this).attr({
                       src   : 'imgs/song/voice.png',
                       title : '静音'
                   });
               }else {
                   audio.muted = true;
                   $(this).attr({
                       src   : 'imgs/song/mute.png',
                       title : '恢复音量'
                   });
               }
           });
           //循环按钮点击
           $circuBt.click(function() {
               if (audio.loop) {
                   audio.loop = false;
                   $(this).attr({
                       src  : 'imgs/song/xunhuan1.png',
                       title : '列表循环'
                   });
               }else{
                   audio.loop = true;
                   $(this).attr({
                       src  : 'imgs/song/xunhuan2.png',
                       title : '单曲循环'
                   });
               }
           });
       }
   };
   playerObj.event();
   playerObj.showTime();
   return playerObj;
}();