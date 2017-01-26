/**
 *广告轮播图
 */
(function($) {
    /**
     *@param{jQ-Object} poster  传入轮播的对象
     *@param{Object} setting 传入想要的配置
     */
    function Carousel(poster, setting) {
        var self = this;
        this.poster = poster;
        this.postItem = poster.find('li');            //包裹图片的li
        this.postBt = poster.find('.poster-bt');      //左右切换按钮
        this.firstItem = this.postItem.first();       //第一张图片
        this.lastItem = this.postItem.last();         //最后一张图片
        this.rotateFlag = true;                       //不可连续点击轮播
        this.prev = poster.find('.poster-bt-prev');   //左切换按钮
        this.next = poster.find('.poster-bt-next');   //右切换按钮
        //默认设置
        this.setting = {
                        posterWidth:    540,        //第一张图片的宽度
                        posterHeight:   200,        //第一张图片的高度
                        scale:          0.95,       //其他图片的缩放比例
                        speed:          500,        //轮播速度
                        vertical:       "bottom",   //对齐方式
                        autoPlay:       true,       //是否自动轮播
                        playDelay:      2000        //轮播间隔时间
        };
        $.extend(this.setting,setting);
        //下一张
        this.next.click(function(e) {
            e.stopPropagation();
            if (self.rotateFlag === true) {
                self.rotateFlag = false;
                self.rotate('right');
            }   
        });
        //上一张
        this.prev.click(function(e) {
            e.stopPropagation();
            if (self.rotateFlag === true) {
                self.rotateFlag = false;
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
        this.setOthers();
    }
    Carousel.prototype = {
        constructor : Carousel,
        //轮播
        play:function() {
            var _this = this;
            this.timer = setInterval(function() {
                _this.next.click();
            },this.setting.playDelay);
        },
        //暂停轮播
        stop:function() {
            clearInterval(this.timer);
        },
        /**
         *动画函数
         *每一张图片继承上一张的状态
         *轮播完成后将rotateFlag设置为true
         */
        rotate:function(dir) {
            var _this = this,
                zIndexArr = [];
            if (dir == 'right') {
                this.postItem.each(function() {
                    var $this = $(this),
                        prev = $this.prev().get(0) ? $this.prev() : _this.lastItem;
                    zIndexArr.push(prev.css('zIndex'));
                    $this.animate({
                        width:      prev.width(),
                        height:     prev.height(),
                        opacity:    prev.css('opacity'),
                        left:       prev.css('left'),
                        top:        prev.css('top')
                    },function() {
                        _this.rotateFlag = true;
                    });
                });
                //z-index不使用动画,否则过渡不流畅
                this.postItem.each(function(i) {
                    $(this).css('zIndex', zIndexArr[i]);
                });
            }
            if (dir=='left') {
                this.postItem.each(function() {
                    var $this = $(this),
                        next = $this.next().get(0) ? $this.next() : _this.firstItem;
                    zIndexArr.push(next.css('zIndex'));
                    $this.animate({
                        width:      next.width(),
                        height:     next.height(),
                        opacity:    next.css('opacity'),
                        left:       next.css('left'),
                        top:        next.css('top')
                    },function() {
                        _this.rotateFlag = true;
                    });
                });
                this.postItem.each(function(i) {
                    $(this).css('zIndex', zIndexArr[i]);
                });
            }
        },
        //设置第一张图片的宽高
        setSetting:function() {
            this.firstItem.css({
                width: this.setting.posterWidth,
                height: this.setting.posterHeight
            });
        },
        //设置对齐方式
        setVerticalAlign:function(height) {
            var vertical = this.setting.vertical,
                top = 0;
            if (vertical == 'top') {
                top = 0;
            }else if (vertical == 'middle') {
                top = (this.setting.posterHeight - height) / 2;
            }else if (vertical == 'bottom') {
                top = this.setting.posterHeight - height;
            }
            return top;
        },
        //设置除第一张图片外其他图片的状态
        //将图片分为左右两部分
        setOthers:function() {
            var _this = this,
                others = this.postItem.slice(1),
                sliceNum = others.size() / 2,
                rightOthers = others.slice(0, sliceNum),
                leftOthers = others.slice(sliceNum),
                level = Math.floor(this.postItem.size() / 2);

            /*
             *firstW      第一个幻灯片的宽度
             *firstH      第一个幻灯片的高度
             *dis         后面的幻灯片超出的距离
             */
            var firstW = this.firstItem.width(),
                firstH = this.firstItem.height(),
                dis = (this.poster.width() - firstW) / 2,
                fixW = firstW;

            //右侧递减
            rightOthers.each(function(i) {
                firstH = Math.floor(firstH * _this.setting.scale);
                level--;
                var j = i;
                $(this).css({
                    zIndex:     level,
                    width:      firstW,
                    height:     firstH,
                    opacity:    1 / (++j),
                    left:       dis,
                    top:        _this.setVerticalAlign(firstH)
                });
            });

            var lw = rightOthers.last().width(),
                lh = rightOthers.last().height(),
                flag = sliceNum,
                leftOthersNum = leftOthers.size();
            //左侧获得右侧最后一张图片的状态,然后递加
            leftOthers.each(function(i) {
                $(this).css({
                    zIndex:     i,
                    width:      lw,
                    height:     lh,
                    opacity:    1 / (flag--),
                    left:       -dis,
                    top:        _this.setVerticalAlign(lh)
                });
                lh = lh / _this.setting.scale;
            });
        }
    };  
    $.fn.extend({
        carousel: function(setting) {
            return this.each(function() {
                new Carousel($(this), setting);
            });
        }
    });
})(jQuery);
