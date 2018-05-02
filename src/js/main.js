// メニュールーレットの空き部分を右下４５度にしたら最初のページはNo.4なので、liタグもcurrentNumも４に合わせる
$(document).ready(function(){

  var disneyInterval;

  (function() {

    //  toTopアイコン表示関連 ↓↓↓↓↓↓↓↓
    var scrolltotop={
    	setting: {startline:888, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]}, //startline：１ページ分の高さ以上にスクロールしたら表示する
    	controlHTML: '<img src="./img/toTopIcon.png" style="width:113px; height:238px" />',
    	controlattrs: {offsetx:0, offsety:0}, //ウィンドウ右下からのオフセット
    	anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

    	state: {isvisible:false, shouldvisible:false},

    	scrollup:function(){
    		if (!this.cssfixedsupport) //if control is positioned using JavaScript
    			this.$control.css({opacity:0}) //hide control immediately after clicking it
    		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
    		if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists
    			dest=jQuery('#'+dest).offset().top
    		else
    			dest=0
    		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
    	},

    	keepfixed:function(){
    		var $window=jQuery(window)
    		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
    		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
    		this.$control.css({left:controlx+'px', top:controly+'px'})
    	},

    	togglecontrol:function(){
    		var scrolltop=jQuery(window).scrollTop()
    		if (!this.cssfixedsupport)
    			this.keepfixed()
    		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false	//ここで表示・非表示判定
    		if (this.state.shouldvisible && !this.state.isvisible){
    			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
    			this.state.isvisible=true
    		}
    		else if (this.state.shouldvisible==false && this.state.isvisible){
    			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
    			this.state.isvisible=false
    		}
    	},

    	init:function(){
    		jQuery(document).ready(function($){
    			var mainobj=scrolltotop
    			var iebrws=document.all
    			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
    			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
    			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
    				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', top:190, left: 0, opacity:0, cursor:'pointer'})
    				.attr({title:'このページの上に戻る'})
    				.click(function(){
                currentNum = 1;
                $('#roulette').removeAttr('class').addClass("number-" + currentNum);
                mainobj.scrollup();
                // var target = $('#page2');
                // var targetPoint = target.offset().top -80;
                // $('html,body').animate({
                //   scrollTop: targetPoint
                // }, 1000);
                location.hash = "";
                return false;              //
            })
    				.appendTo('body')
    			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text
    				mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text
    			mainobj.togglecontrol()
    			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
    				mainobj.scrollup()
    				return false
    			})
    			$(window).bind('scroll resize', function(e){
    				mainobj.togglecontrol()
    			})
    		})
    	}
    }
      //  toTopアイコン表示関連 ↑↑↑↑↑↑↑↑↑↑

    var currentNum = 1;
    var directMenu = false;
    $('#roulette').removeAttr('class').addClass("number-1");
    $('.star').on('click', function() {                                   //ダイレクトメニューの出し入れ
      if (!directMenu) {
        directMenu = true;
        $('#directMenu ul').css('display','block');
      } else {
        directMenu = false;
        $('#directMenu ul').css('display','none');
      }
    });
    $('li.directMenuPiece').on('click', function () {
      var index = $('li.directMenuPiece').index(this) + 1;
      currentNum = index;
      location.hash = "";                                                 // メニュークリックでハッシュあれば削除（'prettyPhoto'とか残ってくるので）
      $('#roulette').removeAttr('class').addClass("number-" + currentNum);
      var target = $('#page' + currentNum);
      target = target.length ? target : $('[id=' + target + ']');
      if (target.length) {
        var targetPoint = target.offset().top -50;
        $('html,body').animate({
          scrollTop: targetPoint
        }, 1000);
        return false;
      }
    });
    $('#back').on('click', function() {                                 //進む・戻るボタン
      if(currentNum <= 1){
        currentNum = 12;
      } else {
        currentNum = (currentNum - 1) % 12;
      }
      $('#roulette').removeAttr('class').addClass("number-" + currentNum);
      return true
    });
    $('#forward').on('click', function() {
      if(currentNum == 11){
        currentNum = 12;                  //余りでは１２がだせないのでこうしておく
      } else if(currentNum == 12){
        currentNum = 1;                   //余りでは０になるのでこうしておく
      }else { currentNum = (currentNum + 1) % 12;
      }
      $('#roulette').removeAttr('class').addClass("number-" + currentNum);
      return true;
    });
    $("#roulette").on('webkitAnimationStart', function(){
      if (directMenu) {
        directMenu = false;
        $('#directMenu ul').css('display','none');
      }
      return $('.star').removeAttr('class').addClass("star rotate");
    });
    $("#roulette").on('webkitAnimationEnd', function(){
        return $('.star').removeAttr('class').addClass("star");
    });

    scrolltotop.init();         // 「ページトップへ戻る」初期化

      var context = document.getElementById( 'rouletteContainer' );
      // var cover = $( '.rouletteCover', context );
      var roulette = $( '#roulette', context );

                                                                      //ルーレット停止後、メニュークリック＝clickされたコマを検出するのではなくcurrentNumで管理
      roulette
      .on( 'click', function( e ) {
          if (((e.clientX > 75) && (e.clientX < 310)) && ((e.clientY > 85) && (e.clientY < 200))) {
            // cover.css( { display: 'none' } );                  カバーを一瞬、非表示にして位置を取得してルーレットのどのコマがクリックされたかを調べる方法は正確に動作しなかったのでcurrentNumで代用している
            // var elem = document.elementFromPoint( e.pageX, e.pageY );
            // cover.css( { display: 'inline' } );
            var target = $('#page' + currentNum);
            target = target.length ? target : $('[id=' + target + ']'); //$('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              var targetPoint = target.offset().top -50;
              $('html,body').animate({
                scrollTop: targetPoint  //target.offset().top;
              }, 1000);
              return false;
            }

            // if ( elem.tagName === 'LI' ) {                   クリックされたルーレットのコマはz-indxの関係で正確に取れなかった
            //   $('#roulette li').each(function(index) {       しかし実際は現時点の 'currentNum' で移動すればいい
            //     if(this === elem){
            //       console.log(index);
            //     }
            //   });
            // }
        }
      });

      $('.touinJoho_wrapper').on( 'click', function( e ) {      // 当院情報（２ページめへ）のゾウのクリック
        currentNum = 2;
        $('#roulette').removeAttr('class').addClass("number-" + currentNum);
        var target = $('#page2');
        var targetPoint = target.offset().top -80;
        $('html,body').animate({
          scrollTop: targetPoint
        }, 1000);
        return false;
      });
      $('.cloud').click(function() {
        window.location.href = 'http://slc-mie.com/mainORG.htm';
      });
      if (!window.localStorage) {                              // ルーレットメニュー説明モーダル表示
          return;
      }else{
        var t = window.localStorage.getItem("todo-first20170319");
        if (t === null || t=== 'true') {                      //初回またはチェック無しで表示
          $('.modal-window').show();
        } else {
          $('.modal-window').hide();
        }
      }

      // $('.bbs_wrapper').on( 'click', function( e ) {          // bbs用切り株のクリックTEST
      //   alert("!!");
      // })

      //------------------------------------------------------ここから「.call(this)」#343までプリローダー処理
      var ua,
      win=window,
      doc=document,
      $win=$(win),
      $doc=$(doc),
      resolution={W:win.screen.width,H:win.screen.height},
      dpi=win.screen.deviceXDPI,
      dpr=win.devicePixelRatio,
      $loadingOverlay=$("#loadingOverlay"),
      isPageLoaded=false,
      sections=new Array(),
      timer=false,
      messageForIE6="現在お使いのブラウザでは、当サイトを正常に閲覧することが出来ません。<br>お手数ですが、最新のブラウザをインストールしてご覧ください。";

      $(function(){
      	var preloadImg=new Array(),																			//読み込むべき画像を配列に格納
      	host=(location.protocol+"//"+location.hostname+location.pathname).replace("index_j.htm",""),
      	reg=new RegExp('url\\(|\\)|\\s|"|('+host.replace("/","\\/")+")","g");
      	ua=new UA_tool();
      	if(ua.browser==="ie"){if(dpi>=168){$("body").addClass("rheia")}if(ua.version===6){$("#wrapper").hide();$("body").append('<div id="notice">'+messageForIE6+"</div>");return false}if(ua.version===7){$("#navi").find("li").each(function(i,el){var $$=$(el).find("a");$$.css({"text-indent":0}).wrapInner("<span></span>");$$.find("span").css({filter:"alpha(opacity=0)",zoom:1,cursor:"pointer"})})}
      		if(win.PIE&&ua.version<9){$("div.page").each(function(){PIE.attach(this)})}
      	}else{
      		if(dpr==2){$("body").addClass("retina")}
      	}
      	if(resolution.W>=2500){$("body").addClass("classic")}
      	preloadImg[0]="./img/slc600.png";
      	preloadImg[1]="./img/rCover.png";
      	preloadImg[2]="./img/modalPic.png";
      	preloadImg[3]="./img/page1/P1bg.png";
      	preloadImg[4]="./img/page1/p1BGfinal.png";
      	setPreloader(preloadImg);																				//プリローダーの準備：引数に読み込むべき画像配列：大きい順に主要なもの
      	init()																													//イントロ文言アニメ
      });

      function init(){
      	$win.load(function(){																						//読込完了でプリローダー除去＆スキップボタン付加
      			isPageLoaded=true;																					//ここはページ読み込み直後に来る（イントロが流れる前：btn-skipは追加されるが最初は不可視）
      			$("body").find("#preLoad").remove();
      		});
      }

      function setPreloader(loadImg){																	//読み込み予定画像群が引数
      	var now_percent=0,
      	displaying_percent=0;																					//"Loading"の文字と横棒のbar追加
      	$loadingOverlay.find(".inner").prepend('<div id="loader">Loading... <span id="load-text">0%</span><div id="bar"><span></span></div></div>');
      	Array.prototype.remove=function(element){
      		for(var i=0,len=this.length;i<len;i++){
      			if(this[i]==element){this.splice(i,1)}
      		}
      	};
      	function preload(images,progress){														/*画像配列と「進捗表示陽関数：progress」を引数でもらっている*/
      		var total=images.length;
      		$(images).each(
      			function(){
      				var src=this;
      				$("<img/>").attr("src",src+"?"+new Date().getTime()).load(
      					function(){images.remove(src);
      						progress(total,total-images.length)								/*配列から済画像を除外後、総数から残配列数引いて済数を求めている*/
      					}
      				)
      			}
      		)
      	}
      	preload(loadImg,function(total,loaded){now_percent=Math.ceil(100*loaded/total)});		/*読み込み済み割合計算関数を引数にして上のpreload関数を呼ぶ*/

      	var timer=win.setInterval(function(){
      		if(displaying_percent>=100){
      			win.clearInterval(timer);
      			$("#loadingOverlay").fadeOut("slow",function(){});			/* 本来、プリローダーを消してイントロムービーに移行するところだが、イントロレイヤ自体を消してトップページに行く*/
      		}else{
      			if(displaying_percent<now_percent){
      				displaying_percent++;
      				$("#load-text").html(displaying_percent+"%");
      				$("#bar span").css("width",displaying_percent+"%")
      			}
      		}
      	},10)
      }

      var UA_tool=function(){
      	var os="other",
      	browser="other",
      	version=1,
      	mobile="",
      	ua=win.navigator.userAgent.toLowerCase();
      	if(ua.indexOf("win")!=-1){
      		this.os="win"
      	}else{
      		if(ua.indexOf("mac")!=-1){
      			this.os="mac"}
      	}

      	if(ua.indexOf("msie")!=-1){
      		this.browser="ie";
      		var av=win.navigator.appVersion.toLowerCase();
      		if(av.indexOf("msie 6.")!=-1){
      			this.version=6
      		}else{
      			if(av.indexOf("msie 7.")!=-1){
      				this.version=7
      			}else{
      				if(av.indexOf("msie 8.")!=-1){
      					this.version=8
      				}else{
      					if(av.indexOf("msie 9.")!=-1){
      						this.version=9
      					}else{this.version=999}
      				}
      			          }
      		           }
      	}else{
      		if(ua.indexOf("chrome")!=-1){
      			this.browser="chrome"
      		}else{
      			if(ua.indexOf("safari")!=-1){
      				this.browser="safari"
      			}else{
      				if(ua.indexOf("firefox")!=-1){
      					this.browser="firefox"
      				}
      			}
      		}
      	}

      	if(ua.indexOf("iphone")!=-1){
      		this.mobile="iphone"
      	}else{
      		if(ua.indexOf("ipad")!=-1){
      			this.mobile="ipad"
      		}else{
      			if(ua.indexOf("android")!=-1){
      				this.mobile="android"
      			}
      		}
      	}
      };


  }).call(this);





    var speed = 300;                                        // どのブラウザも初期ページ読み込み時、fixed要素分を考慮して（＝あるものとして）page1上辺をその下の位置に来るようだ
    var target = $("#page1");                               // しかし他のPageから戻る時#page1がブラウザの上辺になりtopObiの分、上に上がった形での表示になる←対策としてスクロールで戻る時、page1ならtopにマージンをtopObi分（120px）取る形で戻すか・・・
    var position = target.offset().top;
    // $('body,html').animate({scrollTop:position}, speed, 'swing');



    $('.neverShow').click(function(e){                      // ルーレットメニュー説明モーダル画面
      if ($(this).prop('checked')) {                        // 非表示＝false
        window.localStorage.setItem("todo-first20170319", false);
      } else {
        window.localStorage.setItem("todo-first20170319", true);
      }
    });
    $('.closeBTN').click(function(e){
      $('.modal-window').hide();
    });

    $('.topObi_container1').hover(                                 // topObi内リンクボタンアニメ用
      function(){$(".topObi_container1 .flip-back").removeClass("perspectiveDownReturn");$(".topObi_container1 .flip-back").addClass("perspectiveDown");},
      function(){
        $(".topObi_container1 .flip-back").removeClass("perspectiveDown");
        $(".topObi_container1 .flip-back").addClass("perspectiveDownReturn");
      }
    )
    $(".topObi_container1 .flip-back").on('webkitAnimationEnd', function(){
      if($(".topObi_container1 .flip-back").hasClass('perspectiveDownReturn')){
          return $(".topObi_container1 .flip-back").removeClass('perspectiveDownReturn');
      }
    });

    $('.topObi_container2').hover(
      function(){$(".topObi_container2 .flip-back").removeClass("perspectiveDownReturn");$(".topObi_container2 .flip-back").addClass("perspectiveDown");},
      function(){
        $(".topObi_container2 .flip-back").removeClass("perspectiveDown");
        $(".topObi_container2 .flip-back").addClass("perspectiveDownReturn");
      }
    )
    $(".topObi_container2 .flip-back").on('webkitAnimationEnd', function(){
      if($(".topObi_container2 .flip-back").hasClass('perspectiveDownReturn')){
          return $(".topObi_container2 .flip-back").removeClass('perspectiveDownReturn');
      }
    });

    $('.topObi_container3').hover(
      function(){$(".topObi_container3 .flip-back").removeClass("perspectiveDownReturn");$(".topObi_container3 .flip-back").addClass("perspectiveDown");},
      function(){
        $(".topObi_container3 .flip-back").removeClass("perspectiveDown");
        $(".topObi_container3 .flip-back").addClass("perspectiveDownReturn");
      }
    )
    $(".topObi_container3 .flip-back").on('webkitAnimationEnd', function(){
      if($(".topObi_container3 .flip-back").hasClass('perspectiveDownReturn')){
          return $(".topObi_container3 .flip-back").removeClass('perspectiveDownReturn');
      }
    });

    $('.topObi_container4').hover(
      function(){$(".topObi_container4 .flip-back").removeClass("perspectiveDownReturn");$(".topObi_container4 .flip-back").addClass("perspectiveDown");},
      function(){
        $(".topObi_container4 .flip-back").removeClass("perspectiveDown");
        $(".topObi_container4 .flip-back").addClass("perspectiveDownReturn");
      }
    )
    $(".topObi_container4 .flip-back").on('webkitAnimationEnd', function(){
      if($(".topObi_container4 .flip-back").hasClass('perspectiveDownReturn')){
          return $(".topObi_container4 .flip-back").removeClass('perspectiveDownReturn');
      }
    });

    $('.topObi_container5').hover(
      function(){$(".topObi_container5 .flip-back").removeClass("perspectiveDownReturn");$(".topObi_container5 .flip-back").addClass("perspectiveDown");},
      function(){
        $(".topObi_container5 .flip-back").removeClass("perspectiveDown");
        $(".topObi_container5 .flip-back").addClass("perspectiveDownReturn");
      }
    )
    $(".topObi_container5 .flip-back").on('webkitAnimationEnd', function(){
      if($(".topObi_container5 .flip-back").hasClass('perspectiveDownReturn')){
          return $(".topObi_container5 .flip-back").removeClass('perspectiveDownReturn');
      }
    });

    $('.topObi_container6').hover(
      function(){$(".topObi_container6 .flip-back").removeClass("perspectiveDownReturn");$(".topObi_container6 .flip-back").addClass("perspectiveDown");},
      function(){
        $(".topObi_container6 .flip-back").removeClass("perspectiveDown");
        $(".topObi_container6 .flip-back").addClass("perspectiveDownReturn");
      }
    )
    $(".topObi_container6 .flip-back").on('webkitAnimationEnd', function(){
      if($(".topObi_container6 .flip-back").hasClass('perspectiveDownReturn')){
          return $(".topObi_container6 .flip-back").removeClass('perspectiveDownReturn');
      }
    });

    $('#usagi').click(function () {
      if ($('#CarouselSpace').css('opacity') == "0") {
          $('#CarouselSpace').css('opacity', '1');
        } else {
          // alert("1!");
          $('#CarouselSpace').css('opacity', '0');
        }
      return false;
    });

    $('#gaikanContainer').hover(
      function(){$(".box").removeClass("perspectiveUpReturn");$(".box").addClass("perspectiveUp");},
      function(){
        $(".box").removeClass("perspectiveUp");
        $(".box").addClass("perspectiveUpReturn");
      }
    )
    $('div#access').live('pageshow',function(){                                     // GoogleMap
      var myLatlng = new google.maps.LatLng(34.867661,136.519077);
      var myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), myOptions);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
      });
    });


    var d = new Date();                                                            // カレンダーカルーセル(jquery.sliderProのコマンド部)
    var startMonth =  d.getMonth()%12;
    // console.log(startMonth);
    $( '#slc_cal' ).sliderPro({
      buttons: false, //スライダーのページャを表示する
      startSlide: startMonth, //最初のスライドを指定する
      arrows: false, //左右の矢印ボタンを表示する
      width: 300, //横幅を設定する
      height: 312, //高さを設定する
      autoplay: false, //自動再生の設定
      loop: false,
      visibleSize: '100%', //前後のスライドを表示するかの設定
    });

    $('.LinkNavBnr').mouseover(function(){                            //リンクフリップ
  		$('.LinkNav').css("display","block");
  	}).mouseout(function(){
  		$('.LinkNav').css("display","");
  	});


    $(function() {                                                    /* Page3 助産師外来 jyosannsi */
    	$('.list-mv03').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    		if(isInView){
    			$(this).stop().addClass('mv03');
    		}
    		else{
    			$(this).stop().removeClass('mv03');
    		}
    	});
    });

                                            /* ハロウィンパーティクル文字トリガー部*/
    $(".sparkley:first").sparkleh();        // first と last でベースの効果を作成して
    $(".sparkley:last").sparkleh({          // 追加のパーティクルを下の $('h1') で設定している
      color: "rainbow",
      count: 100,
      overlap: 10
    });
    $("h1").sparkleh({
      count: 80,
      color: ["#ff0080","#ff0080","#0000FF"]
    });

}); /* end of $(document).ready() */


$(function() {

});

                                          /* ハロウィンパーティクル文字表示用jQuery拡張関数部*/
$.fn.sparkleh = function( options ) {
  return this.each( function(k,v) {
    var $this = $(v).css("position","relative");
    var settings = $.extend({
      width: $this.outerWidth(),
      height: $this.outerHeight(),
      color: "#FFFFFF",
      count: 30,
      overlap: 0,
      speed: 1
    }, options );
    var sparkle = new Sparkle( $this, settings );
    sparkle.over();
    // $this.on({
    //   "mouseover focus" : function(e) {
    //     sparkle.over();
    //   },
    //   "mouseout blur" : function(e) {
    //     sparkle.out();
    //   }
    // });
  });
}

function Sparkle( $parent, options ) {
  this.options = options;
  this.init( $parent );
}

Sparkle.prototype = {
  "init" : function( $parent ) {
    var _this = this;
    this.$canvas =
      $("<canvas>")
        .addClass("sparkle-canvas")
        .css({
          position: "absolute",
          top: "-"+_this.options.overlap+"px",
          left: "-"+_this.options.overlap+"px",
          "pointer-events": "none"
        })
        .appendTo($parent);
    this.canvas = this.$canvas[0];
    this.context = this.canvas.getContext("2d");
    this.sprite = new Image();
    this.sprites = [0,6,13,20];
    this.sprite.src = this.datauri;
    this.canvas.width = this.options.width + ( this.options.overlap * 2);
    this.canvas.height = this.options.height + ( this.options.overlap * 2);
    this.particles = this.createSparkles( this.canvas.width , this.canvas.height );
    this.anim = null;
    this.fade = false;
  },
  "createSparkles" : function( w , h ) {
    var holder = [];
    for( var i = 0; i < this.options.count; i++ ) {
      var color = this.options.color;
      if( this.options.color == "rainbow" ) {
        color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
      } else if( $.type(this.options.color) === "array" ) {
        color = this.options.color[ Math.floor(Math.random()*this.options.color.length) ];
      }
      holder[i] = {
        position: {
          x: Math.floor(Math.random()*w),
          y: Math.floor(Math.random()*h)
        },
        style: this.sprites[ Math.floor(Math.random()*4) ],
        delta: {
          x: Math.floor(Math.random() * 1000) - 500,
          y: Math.floor(Math.random() * 1000) - 500
        },
        size: parseFloat((Math.random()*2).toFixed(2)),
        color: color
      };
    }
    return holder;
  },

  "draw" : function( time, fade ) {
    var ctx = this.context;
    ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    for( var i = 0; i < this.options.count; i++ ) {
      var derpicle = this.particles[i];
      var modulus = Math.floor(Math.random()*7);
      if( Math.floor(time) % modulus === 0 ) {
        derpicle.style = this.sprites[ Math.floor(Math.random()*4) ];
      }
      ctx.save();
      ctx.globalAlpha = derpicle.opacity;
      ctx.drawImage(this.sprite, derpicle.style, 0, 7, 7, derpicle.position.x, derpicle.position.y, 7, 7);
      if( this.options.color ) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = derpicle.color;
        ctx.fillRect(derpicle.position.x, derpicle.position.y, 7, 7);
      }
      ctx.restore();
    }
  },
  "update" : function() {
     var _this = this;
     this.anim = window.requestAnimationFrame( function(time) {
       for( var i = 0; i < _this.options.count; i++ ) {
         var u = _this.particles[i];
         var randX = ( Math.random() > Math.random()*2 );
         var randY = ( Math.random() > Math.random()*3 );
         if( randX ) {
           u.position.x += ((u.delta.x * _this.options.speed) / 1500);
         }
         if( !randY ) {
           u.position.y -= ((u.delta.y * _this.options.speed) / 800);
         }
         if( u.position.x > _this.canvas.width ) {
           u.position.x = -7;
         } else if ( u.position.x < -7 ) {
           u.position.x = _this.canvas.width;
         }
         if( u.position.y > _this.canvas.height ) {
           u.position.y = -7;
           u.position.x = Math.floor(Math.random()*_this.canvas.width);
         } else if ( u.position.y < -7 ) {
           u.position.y = _this.canvas.height;
           u.position.x = Math.floor(Math.random()*_this.canvas.width);
         }
         if( _this.fade ) {
           u.opacity -= 0.02;
         } else {
           u.opacity -= 0.005;
         }
         if( u.opacity <= 0 ) {
           u.opacity = ( _this.fade ) ? 0 : 1;
         }
       }
       _this.draw( time );
       if( _this.fade ) {
         _this.fadeCount -= 1;
         if( _this.fadeCount < 0 ) {
           window.cancelAnimationFrame( _this.anim );
         } else {
           _this.update();
         }
       } else {
         _this.update();
       }
     });
  },
  "cancel" : function() {
    this.fadeCount = 100;
  },
  "over" : function() {
    window.cancelAnimationFrame( this.anim );
    for( var i = 0; i < this.options.count; i++ ) {
      this.particles[i].opacity = Math.random();
    }
    this.fade = false;
    this.update();
  },
  "out" : function() {
    this.fade = true;
    this.cancel();
  },
  "datauri" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg=="
};

// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length,
      blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  elems.bind('load.imgloaded',function(){
      if (--len <= 0 && this.src !== blank){
        elems.unbind('load.imgloaded');
        callback.call(elems,this);
      }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from https://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
     }
  });
  return this;
};
