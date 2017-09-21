

//搜索
$(function () {
    $(".sea").click(function () {
        $(".seaPage").css({
            width:'100%',
            height:'100%'
        })
    })
    $(".close").click(function () {
        $(".seaPage").css({
            width:0,
            height:0
        })
    })
})



//history
$(function () {
    let big = $('.history')
    let banner = $('.hisBox');
    let images = $('.hisBox>li');
    let btns = $('.history>main>.line>.cicle');
    let flag = true;
    let next = now =0;
    let widths = banner.innerWidth();

    btns.click(function(){
        let i= $(this).index('.history>main>.line>.cicle');
        next =i;
        if(next>now){
            if(flag){
                flag = false;
                if(next == images.length){
                    next =0;
                }

                images.eq(next).css({left:`${-widths}px`});
                images.eq(now).animate({left:`${widths}px`},1000);
                btns.eq(now).removeClass('ciclepush');
                btns.eq(next).addClass('ciclepush');
                images.eq(next).animate({left:0},1000,function(){
                    flag = true;
                });
                now = next;
            }


        }else if(next<now){
            if(flag){
                flag=false;

                if(next < 0){
                    next =images.length-1;
                }
                images.eq(next).css({left:`${widths}px`});
                images.eq(now).animate({left:`${-widths}px`},1000);
                btns.eq(now).removeClass('ciclepush');
                btns.eq(next).addClass('ciclepush');
                images.eq(next).animate({left:0},1000,function(){
                    flag = true;
                });
                now = next;
            }
        }else if(next == now){
            return;
        }
    })


})


//team
$(function(){
    let section = $('.boxT');
    let zhanshi = $('.boxT>ul');
    let num = 0;

    // 计算大盒子的宽度
    let childNum = zhanshi.children().length;
    let childW = zhanshi.children().eq(0).outerWidth(true);
    let boxW = childNum*childW;
    zhanshi.css('width',`${boxW}px`);

    // let maxN = boxW/1210;

    let rightL = $('.back');
    console.log(rightL)
    let rightR = $('.forword');

    rightR.click(function(){
        childW = zhanshi.children().eq(0).outerWidth(true);
        moves('r')

    })
    rightL.click(function(){
        childW = zhanshi.children().eq(0).outerWidth(true);
        moves('l')

    })

    let flag = true;
    let t=setInterval(moveT,3000)
    section.hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(moveT,3000)
    })
    function moveT(){
        if(flag){
            moves('r')
        }else{
            moves('l')
        }
    }
    function moves(dir){
        if(dir == 'r'){
            if(num == childNum/2){
                flag = false;
                return;
            }
            num++;
        }else if(dir == 'l'){
            if(num == 0){
                flag = true;
                return;
            }
            num--;
        }
        zhanshi.css({marginLeft:`${-num*childW}px`});
    }

})