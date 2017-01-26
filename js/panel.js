var panel = {
    /*发现音乐tab切换*/
    findMusicTab: function() { 
        var searchNav = $('.main-right-findMusic').find('.right-nav'),
            searchItem = $('.main-right-findMusic').find('.main-right-item');
        tab(searchNav, searchItem);
    },
    /*左侧列表点击右侧切换*/
    leftListTab: function() {
        var mainLeft = $('.main-left');

        mainLeft.on('click','.dd-item',function() {
            var searchNav = $('.dd-item'),
                rightSup = $('.right-sup'),
                index = $(this).data('index');

            rightSup.hide();
            for(var i = 0; i < searchNav.size(); i++) {
                searchNav.eq(i).removeClass('active');
                if (rightSup.eq(i).data('index') == index) {
                    rightSup.eq(i).show();
                }
            }
            $(this).addClass('active');
        });
    },
    /*登录面板点击出现*/
    loginPanel: function() {
        var $rightLogin = $('.right-login'),
            $loginPanel = $rightLogin.find('.login-panel'),
            $container = $('.container');

        $rightLogin.click(function(e) {
            e.stopPropagation();
            $loginPanel.show();
        });
        $loginPanel.click(function(e) {
            e.stopPropagation();
            $(this).hide();
        });
        $container.click(function() {
            $loginPanel.hide();
        });
    },
    /*推荐歌单*/
    recommendedList: function() {
        var $listItem = $('.recommend-song').find('.list-item'), //list-item
            $week = $('.recommend-song').find('.week'),          //星期
            $day = $('.recommend-song').find('.day'),            //日期
            timer;
        //更新日期
        (function time() {
            var date = new Date(),
                week = '星期' + ('日一二三四五六'.charAt(date.getDay()));
                day = date.getDate();

            $week.text(week);
            $day.text(day); 
        })();

        $listItem.hover(function() {
            $(this).find('.list-item-top').slideDown();
        }, function() {
            $(this).find('.list-item-top').slideUp();
        });
    }
};
