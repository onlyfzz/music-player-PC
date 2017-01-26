
/*搜索界面*/
(function() {
    /*tab切换*/
    var searchNav = $('.search-nav'),
        searchItem = $('.main-right-search').find('.search-item');
    tab(searchNav,searchItem);

    /**
     *跨域获得搜索资源
     *渲染歌曲搜索结果
     */
    var $searchForm     = $('.search').find('.search-form'),    //搜索表单
        $searchText     = $searchForm.find('.search-txt'),      //搜索框
        $rightSearch    = $('.main-right-search'),          
        $searchTit_text = $rightSearch.find('.search-text'),    //搜索内容
        $searchNum      = $rightSearch.find('.search-songsNum'),//搜索出的歌曲数目
        $searchResult   = $rightSearch.find('.search-result'),  //搜索结果
        $mainRight      = $('.right-sup');

    $searchForm.on('submit',function(e) {
        e.preventDefault();
        var searchVal = $searchText.val().trim();
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
                    var num = data.result.songCount;
                    $searchNum.text(num);
                    var songs = data.result.songs,
                        resultHtml = '';
                        resultHtml = '<table>'+
                                        '<tr class="result-head">'+
                                            '<th class="operate">操作</th>'+
                                            '<th class="name">音乐标题</th>'+
                                            '<th class="singer">歌手</th>'+
                                            '<th class="album">专辑</th>'+
                                        '</tr>';
                    for(var i = 0; i < data.result.songs.length; i++) {
                        var j;
                        i < 9 ? j = '0' + (i+1) : j = i+1;
                        resultHtml += '<tr data-src='+songs[i].audio+' data-img='+songs[i].album.picUrl+'>'+
                                        '<td><span class="num">'+j+'</span>'+
                                            '<i class="iconfont icon-xihuan"></i>'+
                                            '<i class="iconfont icon-xiazai"></i>'+
                                        '</td>'+
                                        '<td class="song-name">'+songs[i].name+'</td>'+
                                        '<td class="song-singer">'+songs[i].artists[0].name+'</td>'+
                                        '<td>'+songs[i].album.name+'</td>'+
                                    '</tr>';
                    }
                    resultHtml += '</table>';
                    $searchResult.html(resultHtml);
                }
            });
        }
    });
})();