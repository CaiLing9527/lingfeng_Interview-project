window.onload=function(){

var liNodes=document.querySelectorAll('#headerMain .headerNav li')
var arrow=document.querySelector('#headerMain .arrow')
var upNodes=document.querySelectorAll('#headerMain .headerNav li .up')

var header=document.querySelector('#header')
var content=document.querySelector('#content')
var contentList=content.querySelector('.list')
var contentLi=contentList.querySelectorAll('li');

var aboutUl=document.querySelectorAll('#content .list .about .about3 .item>ul')


headerBind()
//图片炸裂 
// 效果有问题？
// picBoom()
// function picBoom(){
//     for(var i=0;i<aboutUl.length;i++){
//         changImg(aboutUl[i])
//     }
//     function changImg(ul){
//         var w=ul.offsetWidth/2;var h=ul.offsetHeight/2;var imgSrc=ul.dataset.src;
//         for(var j=0;j<4;j++){
//             // 创建li元素
//             var linode=document.createElement('li')
//             // 创建imgnode元素
//             var imgNode=new Image();

//             linode.style.width=w+'px';linode.style.height=h+'px';imgNode.src=imgSrc;
            
//             imgNode.style.top=-Math.floor(j/2)*h+'px';
//             imgNode.style.left=-(j%2)*w+'px';
//             ul.appendChild(linode)
//             linode.appendChild(imgNode)
//         }
//         var imgNodes=ul.querySelectorAll('img')
//     //    var imgNodes = aboutUl.querySelectorAll('li>img')

//         ul.onmouseenter=function(){
//             liNodes[0].style.top=h+'px';
//             liNodes[1].style.left=-2*w+'px';
//             liNodes[2].style.left=w+'px';
//             liNodes[3].style.top=-2*h+'px';

//         }
       
//         ul.onmouseleave=function(){
//             liNodes[0].style.top=0+'px';
//             liNodes[1].style.left=-w+'px';
//             liNodes[2].style.left=0+'px';
//             liNodes[3].style.top=-h+'px';
//         }
//     }
// }





    // 滚动下标    
var timer=null
var now=0;
    window.onresize=function(){
        contentBind();
        arrow.style.left=liNodes[now].getBoundingClientRect().left+
        liNodes[now].offsetWidth/2-arrow.offsetWidth/2+'px';
        // 屏幕切换
        contentList.style.top=-now*(document.documentElement.clientHeight-header.offsetHeight)+'px';

    }


    // 滚轮事件
    // ie/chrome兼容
document.onmousewheel=function(event){
                                    clearTimeout(timer);
                                    timer=setTimeout(function(){fun(event)},200)
                                        }
//firefox
if(document.addEventListener){document.addEventListener('DOMMouseScroll',function(event){
                                    clearTimeout(timer);
                                    timer=setTimeout(function(){fun(event)},200)        
                                        })}
    // // ie/chrome兼容
    // document.onmousewheel=fun;
    //     //firefox
    // if(document.addEventListener){document.addEventListener('DOMMouseScroll',fun)};
function fun(event){
        event=event || window.event;
        var flag='';
        if(event.wheelDelta){
            // ie+chrome
            if(event.wheelDelta>0){flag='up'}else{flag='down'}
        }
        else if(event.detail){
            // fire fox
            if(event.detail<0){flag='up'}else{flag='down'}
        }
        switch(flag){
            case 'up':
                if(now>0){now--}
                        move(now);
                        break;
            case 'down':
                if(now<liNodes.length-1){now++}
                        move(now);
                        break;
        }
        event.preventDefault && event.preventDefault();
        return false;
    }  



 // 设置内容区高度
 contentBind()
 function contentBind(){
     content.style.height=document.documentElement.clientHeight-header.clientHeight+'px';
         for(var i=0;i<contentLi.length;i++){
            contentLi[i].style.height=document.documentElement.clientHeight-header.clientHeight+'px';;
             }
 }




// 导航条交互
function headerBind(){
    upNodes[0].style.width='100%';
    arrow.style.left=liNodes[0].getBoundingClientRect().left+liNodes[0].offsetWidth/2-arrow.offsetWidth/2+'px';
    for(var i = 0;i<liNodes.length;i++){
    // 作用：是给li[i]节点对象创建一个index属性，该属性的值为i,当然你也可以写成li[i].abcd=i;
    // 用处：dis[this.index ].className="active";获取当前的div[i]节点
        liNodes[i].index=i;
            liNodes[i].onclick=function(){
                now=this.index;
                move(now)
                // // 清除UP的宽度
                //     for(var j=0;j<upNodes.length;j++){
                //         upNodes[j].style.width='';
                //     }
                //     // this下的UP宽度为100%
                //     upNodes[this.index].style.width = '100%';
                //     // this下arrow的位置变化
                //     arrow.style.left=liNodes[this.index].getBoundingClientRect().left+liNodes[this.index].offsetWidth/2-arrow.offsetWidth/2+'px';
                //     // 屏幕切换
                //     contentList.style.top=-this.index*(document.documentElement.clientHeight-header.offsetHeight)+'px'
                } 
    }
}
 


    function move(now){
    for(var b=0;b<upNodes.length;b++){
        upNodes[b].style.width='';
    }
    upNodes[now].style.width='100%';
    arrow.style.left=liNodes[now].getBoundingClientRect().left+liNodes[now].offsetWidth/2-arrow.offsetWidth/2+'px';
    contentList.style.top=-now*(document.documentElement.clientHeight-header.offsetHeight)+'px'
}
}