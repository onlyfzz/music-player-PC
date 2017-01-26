/**
 *创建歌单
 */
(function(){
    var $createBt = $('.left-create-list').find('.add'),
        $expendBt = $('.left-create-list').find('.down'),
        $listTit = $('.left-create-list').find('.dd-item'),
        $inputDd = $('.create-input'),
        $input = $inputDd.find('form'),
        $newCreateList = $('div.new-create-list');

    function getTime() {
        var time = new Date(),
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            day = time.getDate();
        time = year + '-' + month + '-' + day;
        return time;
    }
    function creList() {
        var val = $input.find('input').val().trim();
        $input.find('input').val('');
        $inputDd.hide();

        if (val!=='') {
            var time = getTime(),
                index = $('.dd-item').size();

            var data = {};
            data.time = time;
            data.index = index;
            data.title = val;
            songList.unshift(data);

            render.renderList();
            $listHtml = $newCreateList.find('.main-right-songList').first();
            $('.right-sup').hide();
            $listHtml.show();
            showRemind('歌单创建成功');                     
        }
    }

    //绑定各种事件
    (function event() {
        $createBt.click(function(e) {
            e.stopPropagation();
            $inputDd.show();
        });

        $expendBt.click(function(e) {
            e.stopPropagation();
            $listTit.slideToggle();
        });

        $input.click(function(e) {
            e.stopPropagation();
        });

        $('.container').click(function() {
            $inputDd.hide();
        });

        $input.submit(function(e) {
            e.preventDefault();
            creList();
        });
    })();   
})();