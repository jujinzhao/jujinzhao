
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
//轮播图
$(function(){
    let banner = $('.banBox');
    let images = $('.banBox>li');
    let btns = $('.btns');
    let forward = $('.banBox .forword');
    let back = $('.banBox .back');
    let flag = true;
    let next = now =0;
    let widths = banner.innerWidth();

    forward.click(function(){
        move('r');
    })
    back.click(function(){
        move('l');
    })
    let t = setInterval(function(){
        move('r');
    },3000)
    banner.hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(function(){
            move('r')
        },3000)
    })
    btns.mouseenter(function(){
        let i= $(this).index('.btns');

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
    function move(dir){
        if(flag){
            flag = false;
            if(dir=='r'){
                next++;
                if(next == images.length){
                    next =0;
                }

                images.eq(next).css({left:`${-widths}px`});
                images.eq(now).animate({left:`${widths}px`},1000);

            }else if(dir == 'l'){
                next--;
                if(next < 0){
                    next =images.length-1;
                }
                images.eq(next).css({left:`${widths}px`});
                images.eq(now).animate({left:`${-widths}px`},1000);

            }
            btns.eq(now).removeClass('ciclepush');
            btns.eq(next).addClass('ciclepush');
            images.eq(next).animate({left:0},1000,function(){
                flag = true;
            });
            now = next;
        }


    }
})
//banner文字
$(function () {

    $(".banBox>span:first-of-type").animate({
        top:"180px",

    },'slow').show();

})
$(function () {

    $(".banBox>span:nth-of-type(2)").show().animate({
        top:"230px",

    },'slow');

})
$(function () {

    $(".banBox>span:nth-of-type(3)").animate({
        left:0,
        right:0,
        marginLeft:"auto",
        marginRight:"auto",
        display:"block"
    },'slow')

})

//welcome
$(function () {
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".wel").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy){
            if(flag){
                flag=!flag;

                $('.wel>main>.list').animate({
                    left:0
                },1000).show();
                $('.wel>main>.del').animate({
                    right:0
                },1000).show();

            }
        }else{
            if(!flag){
                $('.wel>main>.list').animate({
                    left:-500
                },1000).hide();
                $(".wel>main>.del").animate({
                    right:-500
                },1000).hide();
                flag=!flag;
            }
        }
    })


    $(".wel>main>.list>li").click(function () {
        let i = $(this).index();
        $(".wel>main>.del>li").hide().eq(i).show();
        $(".wel>main>.list>li").css({
            borderColor:"#CCCCCC"
        }).eq(i).css({
            borderColor:"#0aa6e8"
        })
    })
})

//精品
$(function () {
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".good").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy){
            if(flag){
                flag=!flag;

                $('.good>.one').animate({
                    marginTop:0
                },1000).show();


            }
        }else{
            if(!flag){
                $('.good>.one').animate({
                    left:-400
                },1000).hide();

                flag=!flag;
            }
        }
    })
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".good").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy+400){
            if(flag){
                flag=!flag;


                $('.good>.two').animate({
                    marginTop:0
                },1000).show();

            }
        }else{
            if(!flag){

                $(".good>.tow").animate({
                    marginTop:400
                },1000).hide();
                flag=!flag;
            }
        }
    })
})
//评论
$(function () {
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".Testimonials").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy+400){
            if(flag){
                flag=!flag;

                $('.Testimonials .say').show('slow').animate({
                    marginTop:30
                },1000);

            }
        }else{
            if(!flag){

                $(".Testimonials .say").animate({
                    marginTop:-100
                },1000).hide();
                flag=!flag;
            }
        }
    })
})
//Events
$(function () {
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".Testimonials").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy+100){
            setTimeout(function () {
                if(flag){
                    flag=!flag;

                    $('.eveO>li:first-of-type').show('slow').animate({
                        marginLeft:0
                    },1000);
                    $('.eveO>li:last-of-type').show('slow').animate({
                        marginRight:0
                    },1000);

                    $('.eveS>li:first-of-type').show('slow').animate({
                        marginRight:150
                    },1000);
                    $('.eveS>li:last-of-type').show('slow').animate({
                        marginLeft:150
                    },1000);

                }
            },1000)

        }else{
            if(!flag){

                $(".eveO>li:first-of-type").animate({
                    marginLeft:-600
                },1000).hide();
                $('.eveO>li:last-of-type').show('slow').animate({
                    marginRight:-600
                },1000);
                $(".eveS>li:first-of-type").animate({
                    marginRight:1000
                },1000).hide();
                $('.eveS>li:last-of-type').show('slow').animate({
                    marginLeft:1000
                },1000);
                flag=!flag;
            }
        }
    })
})

//team
$(function () {
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".team").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy+100){
            if(flag){
                flag=!flag;
                $(".team>main>ul>li").fadeIn('slow');
            }
        }else{
            if(!flag){
                $(".team>main>ul>li").fadeout('slow');

                flag=!flag;
            }
        }
    })
})
//move
$(function () {
    $(window).scroll(function () {
        let st = $(document.documentElement).scrollTop();
        let oy = $(".move").offset().top;
        let cy = window.innerHeight;
        let flag = true;
        if(st+cy>oy+100){
            if(flag){
                flag=!flag;
                $(".move>ul").fadeIn('slow');
            }
        }else{
            if(!flag){
                $(".move>ul").fadeout('slow');

                flag=!flag;
            }
        }
    })
    let now = 0;
    let next = 0;
    let images=$(".move>ul>li");
    let widths = images.width();
    let flag = true;

    let t = setInterval(function(){
        move('r');
    },3000)
    function move(dir){
        if(flag){
            flag = false;
            if(dir=='r'){
                next++;
                if(next == images.length){
                    next =0;
                }

                images.eq(next).css({left:`${-widths}px`});
                images.eq(now).animate({left:`${widths}px`},1000);

            }else if(dir == 'l'){
                next--;
                if(next < 0){
                    next =images.length-1;
                }
                images.eq(next).css({left:`${widths}px`});
                images.eq(now).animate({left:`${-widths}px`},1000);

            }
            images.eq(next).animate({left:0},1000,function(){
                flag = true;
            });
            now = next;

        }


    }

})