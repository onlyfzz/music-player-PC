
 /**
  *(工具对象1)
  *实现本地存储	  
  *@param{string} key 传入存储或想要提取的key值
  *@param{string} value 传入想要存储的值
  *return{object} 返回实现存取功能的对象
  */
 var store=function(){
 	var obj={};
 	obj.save=function(key,value){
 		var str=JSON.stringify(value);
 		localStorage.setItem(key,str);
 	};
 	obj.get=function(key){
 		var str=localStorage.getItem(key);
 		return JSON.parse(str);
 	};
 	obj.clear=function(){
 		localStorage.clear();
 	};
 	obj.remove=function(key){
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
 var render=function(){
 	var renderObj={
 		// 渲染我喜欢的音乐歌单列表
 		renderSong:function(){
		  	var $likeList=$('.like-list'),
		  		$listNum=$likeList.find('.listNum'),
		  		$likeSong=$likeList.find('.songList-tb').find('table'),
		  		trHtml='',
		  		j=0;

		  	$likeSong.find('tr:gt(0)').remove();
		  	for(var i=0;i<songs.length;i++){
		  		i<9? j='0'+(i+1) : j=i;
		  		trHtml+='<tr data-src='+songs[i].src+' data-img='+songs[i].img+' data-index='+i+'>'+
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
		renderList:function(){			
			var $inputDd=$('.create-input'),
				$likeList=$('.like-list'),
				$newCreateTit=$('div.new-create-tit'),
				$newCreateList=$('div.new-create-list'),
				listTit='',
				listHtml='';

			$newCreateTit.html('');
			$newCreateList.html('');
			if (songList.length>0) {
				for(var i=0;i<songList.length;i++){			
					listTit+='<dd class="new-song-list dd-item" data-pointer='+i+' data-index='+songList[i].index+'>'+songList[i].title+'</dd>';
					listHtml+='<div class="right-sup main-right-songList" data-pointer='+i+' data-index='+songList[i].index+'>'+
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

			$newCreateList.find('.edit').click(function(){
				var index=$(this).parents('.main-right-songList').data('pointer');
				render.renderListDetail(index);
			});
		},
		//渲染新创建的歌单详细信息
		renderListDetail:function(index){
		 	var list=songList[index],
		 		$DetailContainer=$('.list-detail-container'),
		 		$rightSup=$('.right-sup'),
		 	 	$listDetail=$('<div class="new-list-detail">'+
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

		 	var $save=$listDetail.find('.save'),
		 		$cancel=$listDetail.find('.cancel'),
		 		$listName=$listDetail.find('.list-name-text'),
		 		$listDesc=$listDetail.find('.list-desc'),
		 		$listLabel=$listDetail.find('.list-label-text');

		 	function showItem(){
		 		var $rightSup=$('.right-sup'),
		 			$ddItem=$('.dd-item');
		 		$rightSup.each(function(){
		 			if ($(this).data('pointer')==index) {
		 				$(this).show();
		 				var itemIndex=$(this).data('index');
		 				$ddItem.each(function(){
		 					$(this).removeClass('active');
		 					if ($(this).data('index')==itemIndex) {
		 						$(this).addClass('active');
		 					}
		 				});
		 			}
		 		});
		 	}
		 	$cancel.click(function(){
		 		$DetailContainer.hide();
		 		showItem();
		 	});

		 	$save.click(function(){
		 		$DetailContainer.hide();
		 		var titVal=$listName.val(),
		 			labelVal=$listLabel.val(),
		 			descVal=$listDesc.val();
		 		if (titVal!==''||descVal!==''||labelVal!=='') {
		 			var obj={};
		 			obj.title=titVal;
		 			obj.label=labelVal;
		 			obj.desc=descVal;
		 			update(index, songList, obj);
		 			render.renderList();
		 		}
		 		showItem();
		 	});
		},
		//渲染Audio和播放列表
		renderAudio:function(){
		  	var $audio = $('#audio'),
		  		$playedList=$('#played-list'),
		  		$listNum=$playedList.find('.list-num'),
		  		$listDetail=$playedList.find('table');
		  	$audio.find('source:not(.inherent)').remove();
		  	$listDetail.find('tr:not(.inherent)').remove();
		  	var audioHtml='',
		  		listHtml='';
		  	if (playedSongs.length>0) {
			  	for(var i=0;i<playedSongs.length;i++){
			  		audioHtml+='<source src='+playedSongs[i].src+
			  			  ' data-img='+playedSongs[i].img+
			  			  ' data-name='+playedSongs[i].name+
			  			  ' data-singer='+playedSongs[i].singer+'>';

			  		listHtml+='<tr data-src='+playedSongs[i].src+' data-img='+playedSongs[i].img+'>'+
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
		renderInfo:function(src,name,singer){
		  	var $songImg	=	$('#songImg'),
		  		$songName 	=	$('#songName'),
		  		$songSinger =	$('#songSinger');

		  	$songImg.attr('src', src);
		  	$songName.text(name);
		  	$songSinger.text(singer);
		}
 	};
 	return renderObj;
 }();

 var songList=[],       //存储创建的歌单
     songs=[],          //存储添加的我喜欢的音乐
     playedSongs=[];	//存储播放过的音乐

 //初始化
 init();
 /**
  *初始化函数
  *将存储的数据取出,并渲染页面
  */
 function init(){
 	songList=store.get('songList')||[];
 	songs=store.get('songs')||[];
 	playedSongs=store.get('playedSongs')||[];
 	render.renderList();
 	render.renderSong();
 	render.renderAudio();
 }

 /**
  *tab切换函数	(工具函数)
  *@param{jQueryObj} nav 传入ul列表的父div
  *@param{jQueryObj} item 传入被切换的元素集合 
  */
function tab(nav,item){
	var navItem=nav.find('a');
	//让所有的navItem移除样式,让索引为index的item显示
	function change(index){
	 	for(var i=0;i<navItem.length;i++){
	 		navItem.eq(i).removeClass('active');
	 		item.eq(i).hide();
	 	}
	 	item.eq(index).show();
	} 
	//用事件代理,调用change(),并且给当前的a添加样式
	nav.on('click','a',function(e){
		e.stopPropagation();
	 	var index=$(this).data('index');
	 	change(index);
	 	$(this).addClass('active');
	});
}

/*扩展存储的数据 (工具函数)*/
function update(index,arr,data){
	arr[index]=$.extend(arr[index],data);	
}

/**
 *显示提醒消息,淡入淡出(工具函数)
 *@param{string} msg 传入想要显示的消息
 */
function showRemind(msg){
	var $remindMsg=$('.remind-msg'),
		$msg=$remindMsg.find('p');

	$msg.text(msg);
	$remindMsg.fadeIn(400).fadeOut(2000);	
}

/*搜索界面tab切换*/
(function(){
	var searchNav=$('.search-nav'),
	 	searchItem=$('.main-right-search').find('.search-item');
	tab(searchNav,searchItem);
})();

/*发现音乐tab切换*/
(function(){
	var searchNav=$('.main-right-findMusic').find('.right-nav'),
	 	searchItem=$('.main-right-findMusic').find('.main-right-item');
	tab(searchNav,searchItem);
})();

/*左侧列表点击右侧切换*/
(function(){
 	var	mainLeft=$('.main-left');

 	mainLeft.on('click','.dd-item',function(){
 		var searchNav=$('.dd-item'),
 			rightSup=$('.right-sup'),
 			index=$(this).data('index');

 		rightSup.hide();
 		for(var i=0;i<searchNav.size();i++){
 			searchNav.eq(i).removeClass('active');
 			if (rightSup.eq(i).data('index')==index) {
 				rightSup.eq(i).show();
 			}
 		}
 		$(this).addClass('active');
 	});
})();

/*登录面板点击出现*/
(function(){
	var $rightLogin=$('.right-login'),
		$loginPanel=$rightLogin.find('.login-panel'),
		$container=$('.container');

	$rightLogin.click(function(e){
		e.stopPropagation();
		$loginPanel.show();
	});
	$loginPanel.click(function(e) {
		e.stopPropagation();
		$(this).hide();
	});
	$container.click(function(){
		$loginPanel.hide();
	});
})();

 /**
 *改变默认的滑动条样式
 */
(function($){
    $(document).ready(function(){
        $(".main-left").mCustomScrollbar({
        	theme: 'dark-2'
        });
        $(".main-right").mCustomScrollbar({
        	theme: 'dark-2'
        });
    });
})(jQuery);

/**
 *广告轮播图
 */
var poster=function(){
	/**
	 *@param{jQ-Object} poster 	传入轮播的对象
	 *@param{Object} setting 传入想要的配置
	 */
 	function Carousel(poster,setting){
 		var self=this;
 		this.poster=poster;
 		this.postItem=poster.find('li'); 		//包裹图片的li
 		this.postBt=poster.find('.poster-bt');		//左右切换按钮
 		this.firstItem=this.postItem.first();		//第一张图片
 		this.lastItem=this.postItem.last();		//最后一张图片
 		this.rotateFlag=true;				//不可连续点击轮播
 		this.prev=poster.find('.poster-bt-prev');	//左切换按钮
 		this.next=poster.find('.poster-bt-next');	//右切换按钮
 		//默认设置
 		this.setting={
			 			posterWidth: 	540,			//第一张图片的宽度
			 			posterHeight: 	200,			//第一张图片的高度
			 			scale: 			0.95,		//其他图片的缩放比例
			 			speed: 			500,		//轮播速度
			 			vertical: 		"bottom",   	//对齐方式
			 			autoPlay: 		true,		//是否自动轮播
			 			playDelay: 		2000		//轮播间隔时间
 		};
 		$.extend(this.setting,setting);
 		//下一张
 		this.next.click(function(e){
 			e.stopPropagation();
 			if (self.rotateFlag===true) {
 				self.rotateFlag=false;
 				self.rotate('right');
 			}	
 		});
 		//上一张
 		this.prev.click(function(e){
 			e.stopPropagation();
 			if (self.rotateFlag===true) {
 				self.rotateFlag=false;
 				self.rotate('left');
 			}	
 		});
 		//自动轮播
 		if (this.setting.autoPlay) {
 			this.play();
 			poster.hover(function() {
 				self.postBt.show();
 				self.stop();
 			}, function() {
 				self.postBt.hide();
 				self.play();
 			});
 		}
 	}
 	Carousel.prototype = {
		constructor : Carousel,
 		//轮播
 		play:function(){
 			var _this=this;
 			this.timer=setInterval(function(){
 				_this.next.click();
 			},this.setting.playDelay);
 		},
 		//暂停轮播
 		stop:function(){
 			clearInterval(this.timer);
 		},
 		/**
 		 *动画函数
 		 *每一张图片继承上一张的状态
 		 *轮播完成后将rotateFlag设置为true
 		 */
 		rotate:function(dir){
 			var _this=this,
 				zIndexArr=[];
 			if (dir=='right') {
 				this.postItem.each(function() {
 					var $this=$(this),
 						prev=$this.prev().get(0)?$this.prev():_this.lastItem;
 					zIndexArr.push(prev.css('zIndex'));
 					$this.animate({
 						width: 		prev.width(),
 						height: 	prev.height(),
 						opacity: 	prev.css('opacity'),
 						left: 		prev.css('left'),
 						top: 		prev.css('top')
 					},function(){
 						_this.rotateFlag=true;
 					});
 				});
 				//z-index不使用动画,否则过渡不流畅
 				this.postItem.each(function(i) {
 					$(this).css('zIndex', zIndexArr[i]);
 				});
 			}
 			if (dir=='left') {
 				this.postItem.each(function() {
 					var $this=$(this),
 						next=$this.next().get(0)?$this.next():_this.firstItem;
 					zIndexArr.push(next.css('zIndex'));
 					$this.animate({
 						width: 		next.width(),
 						height: 	next.height(),
 						opacity: 	next.css('opacity'),
 						left: 		next.css('left'),
 						top: 		next.css('top')
 					},function(){
 						_this.rotateFlag=true;
 					});
 				});
 				this.postItem.each(function(i) {
 					$(this).css('zIndex', zIndexArr[i]);
 				});
 			}
 		},
 		//设置第一张图片的宽高
 		setSetting:function(){
 			this.firstItem.css({
 				width: this.setting.posterWidth,
 				height: this.setting.posterHeight
 			});
 		},
 		//设置对齐方式
 		setVerticalAlign:function(height){
 			var vertical=this.setting.vertical,
 				top=0;
 			if (vertical=='top') {
 				top=0;
 			}else if (vertical=='middle') {
 				top=(this.setting.posterHeight-height)/2;
 			}else if (vertical=='bottom') {
 				top=this.setting.posterHeight-height;
 			}
 			return top;
 		},
 		//设置除第一张图片外其他图片的状态
 		//将图片分为左右两部分
 		setOthers:function(){
 			var _this=this,
 				others=this.postItem.slice(1),
 				sliceNum=others.size()/2,
 				rightOthers=others.slice(0,sliceNum),
 				leftOthers=others.slice(sliceNum),
 				level=Math.floor(this.postItem.size()/2);

 			/*
			 *firstW 	  第一个幻灯片的宽度
			 *firstH 	  第一个幻灯片的高度
			 *dis	 	  后面的幻灯片超出的距离
 			 */
 			var firstW=this.firstItem.width(),
 				firstH=this.firstItem.height(),
 				dis=(this.poster.width()-firstW)/2,
 				fixW=firstW;

 			//右侧递减
 			rightOthers.each(function(i) {
 				firstH=Math.floor(firstH*_this.setting.scale);
 				level--;
 				var j=i;
 				$(this).css({
 					zIndex: 	level,
 					width:  	firstW,
 					height: 	firstH,
 					opacity: 	1/(++j),
 					left: 		dis,
 					top: 		_this.setVerticalAlign(firstH)
 				});
 			});

 			var lw=rightOthers.last().width(),
 				lh=rightOthers.last().height(),
 				flag=sliceNum,
 				leftOthersNum=leftOthers.size();
 			//左侧获得右侧最后一张图片的状态,然后递加
 			leftOthers.each(function(i) {
 				$(this).css({
 					zIndex: 	i,
 					width:  	lw,
 					height: 	lh,
 					opacity: 	1/(flag--),
 					left: 		-dis,
 					top: 		_this.setVerticalAlign(lh)
 				});
 				lh=lh/_this.setting.scale;
 			});
 		}
 	};	
 	var carousol=new Carousel($('.poster'));
 	carousol.setOthers();
 	return carousol;
}();

 /**
  *推荐歌单
  */
(function(){
 	var $listItem=$('.recommend-song').find('.list-item'),		  //list-item
 		$week=$('.recommend-song').find('.week'),		  //星期
 		$day=$('.recommend-song').find('.day'),			  //日期
 		timer;
 	//更新日期
 	(function time(){
 		var date=new Date(),
 			week='星期'+('日一二三四五六'.charAt(date.getDay()));
 			day=date.getDate();

 		$week.text(week);
 		$day.text(day);	
 	})();

 	$listItem.hover(function() {
		$(this).find('.list-item-top').slideDown();
 	}, function() {
 		$(this).find('.list-item-top').slideUp();
 	});
})();

 /**
  *跨域获得搜索资源
  *渲染歌曲搜索结果
  */
(function(){
  	var $searchForm 	= $('.search').find('.search-form'),	//搜索表单
  		$searchText 	= $searchForm.find('.search-txt'), 	//搜索框
  		$rightSearch 	= $('.main-right-search'),			
  		$searchTit_text = $rightSearch.find('.search-text'),	//搜索内容
  		$searchNum 		= $rightSearch.find('.search-songsNum'),//搜索出的歌曲数目
  		$searchResult 	= $rightSearch.find('.search-result'),	//搜索结果
  		$mainRight 		=$('.right-sup');

  	$searchForm.on('submit',function(e){
  		e.preventDefault();
  		var searchVal=$searchText.val().trim();
  		if (searchVal) {
  			$mainRight.hide();
  			$rightSearch.show();
  			$.ajax({
  				url: 'http://s.music.163.com/search/get/',
  				type: 'Post',
  				dataType: 'jsonp',
  				data: {
  					's' : searchVal,
  					'limit' : 100,
  					'offset' : 0,
  					'type' : 1
  				},
  				success:function(data){
  					$searchTit_text.text('"'+searchVal+'"');
  					var num=data.result.songCount;
  					$searchNum.text(num);
  					var songs=data.result.songs,
  						resultHtml='';
						resultHtml='<table>'+
										'<tr class="result-head">'+
											'<th class="operate">操作</th>'+
											'<th class="name">音乐标题</th>'+
											'<th class="singer">歌手</th>'+
											'<th class="album">专辑</th>'+
										'</tr>';
  					for(var i=0;i<data.result.songs.length;i++){
  						var j;
  						i<9? j='0'+(i+1) : j=i+1;
  						resultHtml+='<tr data-src='+songs[i].audio+' data-img='+songs[i].album.picUrl+'>'+
										'<td><span class="num">'+j+'</span>'+
											'<i class="iconfont icon-xihuan"></i>'+
											'<i class="iconfont icon-xiazai"></i>'+
										'</td>'+
										'<td class="song-name">'+songs[i].name+'</td>'+
										'<td class="song-singer">'+songs[i].artists[0].name+'</td>'+
										'<td>'+songs[i].album.name+'</td>'+
									'</tr>';
  					}
  					resultHtml+='</table>';
  					$searchResult.html(resultHtml);
  				}
  			});
  		}
  	});
})();
/**
 *创建歌单
 */
(function(){
	var $createBt=$('.left-create-list').find('.add'),
		$expendBt=$('.left-create-list').find('.down'),
		$listTit=$('.left-create-list').find('.dd-item'),
		$inputDd=$('.create-input'),
		$input=$inputDd.find('form'),
		$newCreateList=$('div.new-create-list');

	function getTime(){
		var time=new Date(),
			year=time.getFullYear(),
			month=time.getMonth()+1,
			day=time.getDate();
		time=year+'-'+month+'-'+day;
		return time;
	}
	function creList(){
		var val=$input.find('input').val().trim();
		$input.find('input').val('');
		$inputDd.hide();

		if (val!=='') {
			var time=getTime(),
				index=$('.dd-item').size();

			var data={};
			data.time=time;
			data.index=index;
			data.title=val;
			songList.unshift(data);

			render.renderList();
			$listHtml=$newCreateList.find('.main-right-songList').first();
			$('.right-sup').hide();
			$listHtml.show();
			showRemind('歌单创建成功');					  
		}
	}

	//绑定各种事件
	(function event(){
		$createBt.click(function(e){
			e.stopPropagation();
			$inputDd.show();
		});

		$expendBt.click(function(e){
			e.stopPropagation();
			$listTit.slideToggle();
		});

		$input.click(function(e){
			e.stopPropagation();
		});

		$('.container').click(function(){
			$inputDd.hide();
		});

		$input.submit(function(e){
			e.preventDefault();
			creList();
		});
	})();	
})();

/**
 *给创建的歌单添加右键点击菜单
 */
 (function(){
 	var $newCreate=$('dl.left-create-list'),
 		$newCreateTit=$('.new-create-tit'),
 		$titItem=$newCreate.find('.dd-item'),
 		$titMenu=$('#new-menu'),
 		$likedd=$('.likeMusic'),
 		$likeMenu=$('#like-menu'),
 		$playBt=$likeMenu.find('.play'),
 		$nextBt=$likeMenu.find('.next'),
 		$delete=$titMenu.find('.delete'),
 		$edit=$titMenu.find('.edit'),
 		$rightSup=$('.right-sup'),
 		audio=$('#audio')[0],
 		index=0;
 	//右键点击我喜欢的音乐显示菜单
 	$likedd.on('contextmenu',function(e){
 		e.preventDefault();
 		var y=e.pageY;
 		$likeMenu.css('top',y).show();
 	});
 	//播放
 	$playBt.click(function(){
 		if (songs.length>0) {
 			console.log(songs.length);
 			for(var i=songs.length-1;i>=0;i--){
 				playedSongs.unshift(songs[i]);
 			}
 			var src=playedSongs[0].src,
 				img=playedSongs[0].img,
 				name=playedSongs[0].name,
 				singer=playedSongs[0].singer;
 			audio.src=playedSongs[0].src;
 			player.play();
 			render.renderInfo(img,name,singer);
 			render.renderAudio();
 		}
 	});
 	//下一首
 	$nextBt.click(function(){
 		audio.changeSong('next');
 	});
 	//新建的歌单右键点击显示
 	$newCreateTit.on('contextmenu','.dd-item',function(e){
 		e.preventDefault();
 		index=$(this).data('pointer');
 		var y=e.pageY-$titMenu.height()-20;
 		$titMenu.css('top',y).show();
 	});
 	//点击其他地方菜单隐藏
 	$('.container').click(function(){
 		$titMenu.hide();
 		$likeMenu.hide();
 	});
 	//删除新建歌单
 	$delete.click(function(){
 		deleteList();
 	});
 	//编辑新建歌单
 	$edit.click(function(){
 		render.renderListDetail(index);
 	});

 	//删除歌单
 	function deleteList(){
 		songList.splice(index,1);
 		render.renderList();
 		var $item=$('.likeMusic'),
 			pointer=$item.data('index');
 		showRemind('歌单已被删除');
 		$item.addClass('active');
 		$rightSup.each(function() {
 			if ($(this).data('index')==pointer) {
 				$(this).show();
 			}
 		});
 	}
 })();

 /**
 *点击搜索结果爱心图标,添加歌曲进歌单(我喜欢的音乐)
 */
 (function(){
 	var searchResult=$('#search-result'),
 		$remindMsg=$('.remind-msg'),
 		$msg=$remindMsg.find('p'),
 		$likeSong=$('.songList-tb').find('table');

 	//创建新的数据存储对象,并将对象推进数组
 	searchResult.on('click','i.icon-xihuan',function(){
 		var $tr=$(this).parent().parent(),
 			song={};

 		song.src=		$tr.data('src');
 		song.img=		$tr.data('img');
 		song.name=		$tr.find('.song-name').text();
 		song.singer=		$tr.find('td').eq(2).text();
 		song.album=		$tr.find('td').eq(3).text();

 		songs.unshift(song);
 		render.renderSong();
 		showRemind('已添加到我喜欢的音乐');
 		store.save('songs',songs);
 	});
 })();

 /**
 *从我喜欢的音乐中移除歌曲(点击爱心图标)
 */
 (function(){
 	$likeList=$('.like-list');
 	$likeList.on('click','.icon-xihuan',function(){
 		index=$(this).data('index');
 		songs.splice(index,1);
 		render.renderSong();
 		store.save('songs',songs);
 	});
 })();

  /**
  *点击播放并添加进播放列表
  */
  (function(){
  	var $mainRight=$('.main-right'),
  		$listDetail=$('.list-detail'),
  		$songPlay=$('.song-play'),
  		audio=$('#audio')[0];
  	$listDetail.on('click','tr',function(){
  		var src=$(this).data('src'),
  		    img=$(this).data('img'),
  		    name=$(this).find('.song-name').text(),
  		    singer=$(this).find('.song-singer').text();
  		audio.src=src;
  		player.play();
  		render.renderInfo(img,name,singer);
  	});
  	$mainRight.on('dblclick','tr',function(){
  		if (!$(this).data('src')) {
  			return;
  		}
  		var played={};
  		played.src=$(this).data('src');
  		played.img=$(this).data('img');
  		played.name=$(this).find('.song-name').text();
  		played.singer=$(this).find('.song-singer').text();

  		playedSongs.unshift(played);
  		render.renderAudio();
  		audio.src=played.src;
  		player.play();
  		render.renderInfo(played.img,played.name,played.singer);
  	});
  })(); 
 /**
  *播放列表
  */
  (function(){
  	var $playedListBt=$('.play-right').find('.playedList-Bt'),
  		$playedList=$('#played-list'),
  		$closeBt=$playedList.find('.close'),
  		$clear=$playedList.find('.clear');
  	$playedListBt.click(function(){
  		$playedList.toggle();
  	});
  	$closeBt.click(function(){
  		$playedList.hide();
  	});
  	$clear.click(function(){
  		playedSongs=[];
  		render.renderAudio();
  	});
  })();

 /**
 *播放设置
 */
 var player=function(){
 	var $audio 		= 	$('#audio'),
		audio   	= 	$audio[0],				//audio
		$songList   	= 	$audio.find('source'),			//source列表
		$playBt    	= 	$('img.play'),				//播放按钮
		$prevBt    	= 	$('.play-left').find('.prev'),		//上一首
		$nextBt    	= 	$('.play-left').find('.next'),		//下一首
		$progress   	= 	$('.play-mid').find('.progress'),	//歌曲总长度条
		$buffered  	= 	$progress.find('.buffered'),		//缓冲条
		$played     	= 	$progress.find('.played'),		//已播放长度条
		$progressBt	= 	$progress.find('.progress-bt'),		//播放进度按钮
		$playRight 	= 	$('.play-right'),					
		$voice      	= 	$playRight.find('.voice'),		//声音总长度条
		$voicePro  	= 	$playRight.find('.voice-pro'),		//声音长度条
		$muteBt     	= 	$playRight.find('.voice-bt'),		//静音按钮
		$voiceBt    	= 	$playRight.find('.progress-bt'),	//声音长度按钮
		$circuBt    	= 	$playRight.find('.circulation'),	//循环模式按钮
		bufferedtime,
		playedtime,
		index=1;

		audio.volume=0.5;	//默认声音为0.5

 	var playerObj={
 		//播放
 		play : function(){
 			audio.play();
 			this.showTime();
 			this.buffered();
 			this.playTime();
 			$playBt.attr({
 				'src' 		: 'imgs/song/pause.png',
 				'title'		: '暂停'
 			});
 		},
 		//暂停
 		pause : function(){
 			audio.pause();
 			this.clearTime();
 			$playBt.attr({
 				'src'		: 'imgs/song/play.png',
 				'title'		: '播放'
 			});
 		},
 		/**
 		 *改变播放歌曲
 		 *@param{string} order 传入命令(next或者prev)
 		 */
 		changeSong : function(order){
 			if (order=='next') {
 				//如果&&之前结果为false,则执行前面的代码,如果为true,则执行之后的代码
 				++index>$songList.length&&(index=1);
 			}else{
 				--index<1&&(index=$songList.length);
 			}

 			var currentSong=$songList.eq(index-1),
 				currentSrc=currentSong.attr('src'),
 				img=currentSong.data('img'),
 				name=currentSong.data('name'),
 				singer=currentSong.data('singer');

 			render.renderInfo(img,name,singer);
 			$audio.attr('src', currentSrc);
 			this.clearTime();
 			this.play();
 		},
 		//点击改变正在播放的时间
 		playPoint : function(e){
 			var x=e.pageX-$this.offset().left,
 				percent=x/$progress.width();
 			audio.currentTime=audio.duration*percent;
 			$played.css('width',x);
 			$progressBt.css('left', x);
 		},
 		//改变声音大小
 		voicePoint : function(e){
 			var x=e.pageX-$this.offset().left,
 				percent=x/$this.width();
 			audio.volume=percent.toFixed(1);
 			$voicePro.css('width',x);
 			$voiceBt.css('left', x);
 		},
 		//清除定时器
 		clearTime : function(){
 			clearInterval(bufferedtime);
 			clearInterval(playedtime);
 		},
 		//显示缓冲的长度
 		buffered : function(){
 			bufferedtime=setInterval(function(){
 				var buffered,
 					percent;
 				audio.readyState==4&&(buffered=audio.buffered.end(0));
 				percent=buffered/audio.duration;
 				var width=percent*$progress.width();
 				$buffered.width(width);
 				if (percent==1) {
 					clearInterval(bufferedtime);
 				}
 			},1000);
 		},
 		//显示歌曲的总时间
 		showTime : function(){
 			setTimeout(function(){
	 			var m=audio.duration/60,
	 				s=audio.duration%60,
	 				$m=$('.end-time').find('.m'),
	 				$s=$('.end-time').find('.s');
	 			if (s<10||m<10) {
					if (s<10) {
						if (m<10) {
							$m.text('0'+parseInt(m)+':');
						}else{
							$m.text(parseInt(m)+':');
						}
						$s.text('0'+parseInt(s));
					}
					if (m<10) {
						if (s<10) {
							$s.text('0'+parseInt(s));
						}else{
							$s.text(parseInt(s));
						}
						$m.text('0'+parseInt(m)+':');
					}
				}else{
					$m.text(parseInt(m)+':');
					$s.text(parseInt(s));
				}
 			},500);
 		},
 		//显示歌曲正在播放的时间
 		playTime : function(){
 			playedtime=setInterval(function(){
 				var percent,
 					width,
 					currentTime=audio.currentTime,
 					$m=$('.play-time').find('.m'),
 					$s=$('.play-time').find('.s'),
 					m=currentTime/60,
 					s=currentTime%60;

				if (s<10||m<10) {
					if (s<10) {
						if (m<10) {
							$m.text('0'+parseInt(m)+':');
						}else{
							$m.text(parseInt(m)+':');
						}
						$s.text('0'+parseInt(s));
					}
					if (m<10) {
						if (s<10) {
							$s.text('0'+parseInt(s));
						}else{
							$s.text(parseInt(s)+':');
						}
						$m.text('0'+parseInt(m)+':');
					}
				}else{
					$m.text(parseInt(m)+':');
					$s.text(parseInt(s));
				}
 				percent=currentTime/audio.duration;
 				width=$progress.width()*percent;
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
 		event : function(){
 			var _this=this;
 			//播放或者暂停
 			$playBt.click(function(){
	 			if (audio.paused) {
	 				_this.play();	 				
	 			}else{
	 				_this.pause();
	 			}
 			});
 			//上一首
 			$prevBt.click(function(){
 				_this.changeSong('prev');
 			});
 			//下一首
 			$nextBt.click(function(){
 				_this.changeSong('next');
 			});
 			//点击改变正在播放的进度
 			$progress.click(function(e){
 				$this=$(this);
 				_this.playPoint(e);
 			});
 			//点击改变声音
 			$voice.click(function(e){
 				$this=$(this);
 				_this.voicePoint(e);
 			});
 			//静音按钮点击
 			$muteBt.click(function(){
 				if (audio.muted) {
 					audio.muted=false;
 					$(this).attr({
	 					src   : 'imgs/song/voice.png',
	 					title : '静音'
 					});
 				}else{
 					audio.muted=true;
	 				$(this).attr({
	 					src   : 'imgs/song/mute.png',
	 					title : '恢复音量'
	 				});
 				}
 			});
 			//循环按钮点击
 			$circuBt.click(function(){
 				if (audio.loop) {
 					audio.loop=false;
 					$(this).attr({
 						src  : 'imgs/song/xunhuan1.png',
 						title : '列表循环'
 					});
 				}else{
 					audio.loop=true;
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




