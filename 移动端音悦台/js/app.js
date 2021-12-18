
// 全局代码
(function(){
    // 阻止默认行为
    app.addEventListener('touchstart',function(e){
        // 阻止浏览器默认行为
        e.preventDefault()
    })  
    // 移动端适配
    // 先获取屏幕宽  
    document.documentElement.style.fontSize=document.documentElement.clientWidth/10+'px';
    window.onresize=function(){
        document.documentElement.style.fontSize=document.documentElement.clientWidth/10+'px';
    }
}());

// 头部逻辑
(function(){
    var app=document.querySelector('#app');
    var menu=document.querySelector('#header .up .menu');
    var zhezhao=document.querySelector('#header  .zhezhao');

    // 绑定事件
    menu.addEventListener('touchstart',function(){
        // menu和遮罩 显示状态改变
        this.classList.toggle('open');
        zhezhao.classList.toggle('open');
    })

    // input获得焦点
    var input=document.querySelector('#header .down input');
    input.addEventListener('touchstart',function(e){
         //    阻止冒泡
        e.stopPropagation()
    })
    // input失去得焦点
    app.addEventListener('touchstart',function(e){
        // 失去焦点
        input.blur();
    })
}());

// 导航逻辑
(function(){
    var nav=document.querySelector('#nav');
    var wrap=nav.querySelector('.wrap')
    //检测导航是否在移动 
    var isMove=false;

    // touchStart逻辑
    nav.addEventListener('touchstart',function(e){
        // 获得触点初始值+获得包裹元素初始值
        this.x=e.touches[0].clientX;
        this.left=transformCSS(wrap,'translateX');
        // 过渡+触摸开始时间
        wrap.style.transition='none';
        this.startTime=Date.now();
    });

    // touchMove逻辑
    nav.addEventListener('touchmove',function(e){
         //    设置修改
        this._x=e.touches[0].clientX;
        var newLeft=this._x-this.x+this.left;

        //   // ?不知道什么?
        // if(newLeft>0){newLeft=(this._x-this.x)/2}
        // var minTranslateX=nav.offsetWidth-wrap.offsetWidth;
        // if(newLeft<minTranslateX){
        //     newLeft=minTranslateX+(this._x-this.x)/2
        // }

        transformCSS(wrap,'translateX',newLeft)        
        // 判断导航移动时,是否超过3PX;
        if(Math.abs(this._x-this.x)>3){isMove=true}
    });

    // touchend逻辑
    nav.addEventListener('touchend',function(e){
        // 获取当前的wrap的translateX
        var translateX=transformCSS(wrap,'translateX')
        //获取触摸的位移即手指最后离开屏幕的的值
        this._x=e.changedTouches[0].clientX;
        // 计算位移
        var dirsX=this._x-this.x
        // 获取触摸结束的时间
        this.endTime=Date.now();
        var dirsTime=this.endTime-this.startTime;
        // 通过求取速度+速度有方向
        var v=dirsX/dirsTime;
        // 过渡的切换
        var s=v*120;
        translateX+=s;
        transformCSS(wrap,'translateX',translateX)
        wrap.style.transition='o.3s ease-out'
        // 判断位置是否越界
                // 左边过界
        if(translateX>0){
            wrap.style.transition='0.3s cubic-bezier(.21,.68,.42,1.77)';
            transformCSS(wrap,'translateX',0)
        }
                // 右边过界
        var minTranslateX=nav.offsetWidth-wrap.offsetWidth;
        if(translateX<minTranslateX){
            wrap.style.transition='0.3s cubic-bezier(.21,.68,.42,1.77)'
            transformCSS(wrap,'translateX',minTranslateX)
        }
        isMove=false;
    })

     // 结束LI背景变色
     var navItems=nav.querySelectorAll('li');
     navItems.forEach(function(item){
         item.addEventListener('touchend',function(){
             if(isMove) return;
             navItems.forEach(function(v){
                 v.classList.remove('active')
             })
             this.classList.add('active');
         })
     })
}());

// 轮播图逻辑
;(function(){
    new Swiper('#swiper')
}())

// 内容区逻辑+滑页
;(function () {
    //获取楼层元素
    var floors = document.querySelectorAll('.floor');

    floors.forEach(function (floor) {
        //获取楼层元素
        //点击导航 修改 底部边框元素的位置
        var movedBorder = floor.querySelector('.moved-border');
        //获取导航元素
        var navItems = floor.querySelectorAll('.nav-item');
        //获取幻灯片元素的wrapper
        var wrapper = floor.querySelector('.swiper-wrapper');
        var container = floor.querySelector('.container');
        var swiperSlides = floor.querySelectorAll('.swiper-slide');
        //绑定事件
        navItems.forEach(function (item, key) {
            //将下标存入到元素对象中
            // console.log(key);
            item.key = key;
            item.addEventListener('touchstart', function () {
                //切换底部边框元素的位置
                // transformCSS(movedBorder, 'translateX', 100);
                // 0   1    2    N
                // 0   41   82   41*N
                // N
                // var index = this.getAttribute('index');
                // var index = this.dataset.index;
                //获取下标   =>  translateX
                var translateX = this.key*movedBorder.offsetWidth;
                //设置位移
                transformCSS(movedBorder, 'translateX', translateX);
                //幻灯片切换   1   -360   2 -720   3 ....
                // 调用 swiper switchSlide 方法  index
                s.container.switchSlide(this.key);
            });
        });

        var s = new Swiper(container, {
            loop: false,
            auto: false,
            pagination: false,
            callback: {
                end: function () {
                    //切换border的位置
                    //如何知道当前显示的幻灯片的下标呢 ???
                    //获取当前 wrapper 元素的 translateX 的值
                    //方法一
                    var translateX = transformCSS(wrapper, 'translateX');
                    var index = -translateX / container.offsetWidth;

                    //方法二
                    var index = s.getIndex();

                    //倒推出 index 的值  0  0   1  -375    2  -750   3 -1125
                    transformCSS(movedBorder, 'translateX', index * movedBorder.offsetWidth);

                    //加载当前幻灯片的内容
                    setTimeout(function () {
                        //获取第一张幻灯片的内容  内容已经 备好
                        var firstSwiperSlide = floor.querySelector('.swiper-slide');

                        //检测当前的幻灯片是否已经加载
                        var hasLoaded = swiperSlides[index].getAttribute('has-loaded');

                        //没有加载
                        if (hasLoaded == '0') {
                            //给哪张幻灯片设置 写 ajax 请求 并处理 ajax 请求回数据
                            swiperSlides[index].innerHTML = firstSwiperSlide.innerHTML;
                            //发送 ajax 请求
                            // $.get('http://localhost:3000/music', function (data) {
                            //     console.log(data);
                            //     //将数据呈现在网页中
                            //     // cloneNode
                            //     var mv = document.querySelector('.mv');
                            //
                            //     for (var i = 0; i < data.song_list.length; i++) {
                            //         var m = mv.cloneNode(true);
                            //         //修改节点的数据
                            //         // 修改图片路径
                            //         m.querySelector('img').src = data.song_list[i].album_500_500;
                            //         m.querySelector('h4').innerHTML = data.song_list[i].title;
                            //         //将 m 元素插入到 幻灯片中
                            //         swiperSlides[index].appendChild(m);
                            //     }
                            //     //移除loading元素
                            //     swiperSlides[index].removeChild(swiperSlides[index].querySelector('.loading'));
                            // }, 'json');

                            //标识当前幻灯片加载完毕
                            swiperSlides[index].setAttribute('has-loaded', 1);
                        }
                    }, 2000)
                },
                move: function () {
                    console.log('move');
                }
            }
        });
    });


}());


// 页面滚动
(function(){
    var touchScroll=new Touchscroll('#app','.wrapperApp',{
        width:4,        
        bg: 'rgb(52,69,78)'
    })
}())
