// Generated by CoffeeScript 1.6.1
(function () {
  console.log(_util)
  var e, t = this,
    n = {}.hasOwnProperty,
    r = function (e, t) {               // e：子クラス、t：親クラス
      function i() {                    // 子クラスをコンストラクタにして親クラスのprototypeを引き継いだクラスを定義し
        this.constructor = e            // その一時的に定義したクラスインスタンスを子クラスのprototypeに代入し継承している
      }
      for (var r in t) n.call(t, r) && (e[r] = t[r]);
      i.prototype = t.prototype;
      e.prototype = new i;
      e.__super__ = t.prototype;
      return e
    };
  e = this;
  e.LUANA = {};
  e.LUANA_CLASS = {};

  e.LUANA_CLASS.baseMain = function () {
    function t() {
      var e = this;
      this._checkWebFont = function () {
        return t.prototype._checkWebFont.apply(e, arguments)
      };
      this._checkSoundSwf = function () {
        return t.prototype._checkSoundSwf.apply(e, arguments)
      };
      this._setupSoundSwf = function () {
        return t.prototype._setupSoundSwf.apply(e, arguments)
      };
      this._resize = function () {
        return t.prototype._resize.apply(e, arguments)
      };
      this._update = function () {
        return t.prototype._update.apply(e, arguments)
      };
      this._updateList = [];
      this._resizeList = [];
      this.ws = {
        w: 0,
        h: 0,
        oldW: -1,
        oldH: -1
      };
      this.ms = {
        x: 0,
        y: 0,
        oldX: 0,
        oldY: 0
      };
      // this._stats;
      this.isStopBgm = !0;
      this.isWebfont = !1;
      this._webFont = {}
    }
    t.prototype._init = function () {
      // e.LUANA.conf.STATS && this._setStats();
      setInterval(this._update, 1e3 / 30);      //e.LUANA.conf.FPS
      $(window).bind("resize", this._resize);
      this._resize();
      // e.LUANA.conf.IS_SMT || $(".hoverAction").hover(function (e) {
      //   var t;
      //   t = $(this).attr("src");
      //   return $(this).attr("src", t.replace("_off", "_on"))
      // }, function (e) {
      //   var t;
      //   t = $(this).attr("src");
      //   return $(this).attr("src", t.replace("_on", "_off"))
      // });
      // return setTimeout(this._setupSoundSwf, 2e3)
    };
    t.prototype._update = function () {
      var t, n, r, i, s;
      s = this._updateList;
      for (t = r = 0, i = s.length; r < i; t = ++r) {
        n = s[t];
        n()
      }
      // if (e.LUANA.conf.STATS) return this._stats.update()
    };
    t.prototype.addUpdate = function (e) {
      return this._updateList.push(e)
    };
    t.prototype.delUpdate = function (e) {
      var t, n, r, i, s, o;
      t = [];
      o = this._updateList;
      for (n = i = 0, s = o.length; i < s; n = ++i) {
        r = o[n];
        r !== e && t.push(r)
      }
      return this._updateList = t
    };
    t.prototype._resize = function () {
      var e, t, n, r, i, s, o;
      r = $(window).width();
      e = $(window).height();
      if (r !== this.ws.oldW || e !== this.ws.oldH) {
        this.ws.w = r;
        this.ws.h = e;
        o = this._resizeList;
        for (t = i = 0, s = o.length; i < s; t = ++i) {
          n = o[t];
          n()
        }
      }
      this.ws.oldW = r;
      return this.ws.oldH = e
    };
    t.prototype.addResize = function (e, t) {
      this._resizeList.push(e);
      if (t != null && t) return e()
    };
    t.prototype.delResize = function (e) {
      var t, n, r, i, s, o;
      t = [];
      o = this._resizeList;
      for (n = i = 0, s = o.length; i < s; n = ++i) {
        r = o[n];
        r !== e && t.push(r)
      }
      return this._resizeList = t
    };
    // t.prototype._setStats = function () {
    //   this._stats = new Stats;
    //   this._stats.domElement.style.position = "fixed";
    //   this._stats.domElement.style.left = "0px";
    //   this._stats.domElement.style.top = "0px";
    //   return document.body.appendChild(this._stats.domElement)
    // };
    // t.prototype.setup = function () {};
    // t.prototype._setupSoundSwf = function () {
    //   var t, n;
    //   if (typeof swfobject == "undefined" || swfobject === null) return;
    //   $("body").prepend(_util.tag("div", [{
    //     name: "id",
    //     val: e.LUANA.conf.SOUND_SWF_ID
    //   }]));
    //   $("#" + e.LUANA.conf.SOUND_SWF_ID).css({
    //     position: "absolute",
    //     top: -10,
    //     left: -10
    //   });
    //   n = {
    //     scale: "noScale",
    //     salign: "lt",
    //     menu: "false",
    //     allowScriptAccess: "always",
    //     wmode: "transparent"
    //   };
    //   t = {
    //     id: e.LUANA.conf.SOUND_SWF_ID,
    //     name: e.LUANA.conf.SOUND_SWF_ID
    //   };
    //   swfobject.embedSWF(e.LUANA.conf.SOUND_SWF, e.LUANA.conf.SOUND_SWF_ID, "1", "1", "10.0.0", "", {}, n, t);
    //   return this.addUpdate(this._checkSoundSwf)
    // };
    // t.prototype._checkSoundSwf = function () {
    //   var t;
    //   t = $("#" + e.LUANA.conf.SOUND_SWF_ID)[0];
    //   if (t != null && t.onLoadSite != null && t.onLoadSite(this.isStopBgm) === "ok") return this.delUpdate(this._checkSoundSwf)
    // };
    // t.prototype.ctrlBgm = function (t) {
    //   var n;
    //   n = $("#" + e.LUANA.conf.SOUND_SWF_ID)[0];
    //   n != null && n.ctrlBgm != null && n.ctrlBgm(t);
    //   return _util.setCookie(e.LUANA.conf.COOKIE_SOUND, t)
    // };
    // t.prototype.playSe = function (t) {
    //   var n;
    //   n = $("#" + e.LUANA.conf.SOUND_SWF_ID)[0];
    //   if (n != null && n.playSe != null) return n.playSe(t)
    // };
    // t.prototype.loadWebFontCss = function () {
    //   var t = this;
    //   if (!e.LUANA.conf.IS_WEBFONT_IE && e.LUANA.conf.IS_IE) return;
    //   $("body").append("<div id='webfontCheck'>LUANA</div>");
    //   $("#webfontCheck").css({
    //     position: "absolute",
    //     top: -100,
    //     left: -100,
    //     color: "#FFFFFF"
    //   }).addClass("preFont");
    //   this._webFont.w = $("#webfontCheck").width();
    //   this._webFont.h = $("#webfontCheck").height();
    //   this._webFont.flg = !1;
    //   return setTimeout(function () {
    //     var n, r, i;
    //     n = e.LUANA.conf.IS_IE ? "/luana/css/common/webfont2.css" : "/luana/css/common/webfont.css";
    //     i = document.createElement("link");
    //     i.href = n;
    //     i.rel = "stylesheet";
    //     i.type = "text/css";
    //     r = document.getElementsByTagName("head")[0];
    //     r.appendChild(i);
    //     return setTimeout(function () {
    //       return t.addUpdate(t._checkWebFont)
    //     }, 500)
    //   }, 500)
    // };
    // t.prototype._checkWebFont = function () {
    //   if (!this._webFont.flg) {
    //     if (parseInt($("#webfontCheck").width()) === 0 || e.LUANA.conf.IS_IE) {
    //       this._webFont.w = 0;
    //       this._webFont.flg = !0;
    //       $("#webfontCheck").removeClass("preFont").addClass("luanaFont");
    //       if (e.LUANA.conf.IS_IE) {
    //         this.isWebfont = !0;
    //         $("#webfontCheck").remove();
    //         this.delUpdate(this._checkWebFont)
    //       }
    //     }
    //     return
    //   }
    //   if ($("#webfontCheck").width() !== this._webFont.w || $("#webfontCheck").height() !== this._webFont.h) {
    //     this.isWebfont = !0;
    //     $("#webfontCheck").remove();
    //     return this.delUpdate(this._checkWebFont)
    //   }
    // };
    return t
  }();

  e.LUANA_CLASS.main = function (t) {
    function n() {
      n.__super__.constructor.call(this);
      // this.util;
      this.con;
      this._init()
    }
    r(n, t);
    n.prototype.setup = function () {
      // this.util = new e.LUANA_CLASS.util;
      return this.con = new e.LUANA_CLASS.contentsView
    };
    return n
  }(e.LUANA_CLASS.baseMain);

  e.LUANA_CLASS.contentsView = function () {
    function t() {
      var n = this;
      this._completePanel = function () {
        return t.prototype._completePanel.apply(n, arguments)
      };
      this._completeHeader = function () {
        return t.prototype._completeHeader.apply(n, arguments)
      };
      this.resize = function () {
        return t.prototype.resize.apply(n, arguments)
      };
      this.update = function () {
        return t.prototype.update.apply(n, arguments)
      };
      this._elm;
      this._header;
      this._menu;
      this._info;
      this._panel;
      this._footer;
      this._loading;
      this._preLoader;
      /* this._preImages = [      プリロード用画像パス配列
        e.LUANA.conf.IMGDIR_CMN + "header/leaf/1.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/2.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/3.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/4.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/5.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/6.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/7.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/8.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/9.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/10.png", e.LUANA.conf.IMGDIR_CMN + "header/leaf/11.png", e.LUANA.conf.IMGDIR_CMN + "header/sound/sound0.png", e.LUANA.conf.IMGDIR_CMN + "header/sound/sound1.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt0_off.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt0_on.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt1_off.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt1_on.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt2_off.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt2_on.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt3_off.png", e.LUANA.conf.IMGDIR_CMN + "panel/menu/txt3_on.png", e.LUANA.conf.IMGDIR_TOP + "info/download_off.png", e.LUANA.conf.IMGDIR_TOP + "info/download_on.png", e.LUANA.conf.IMGDIR_TOP + "info/present_off.png", e.LUANA.conf.IMGDIR_TOP + "info/present_on.png", e.LUANA.conf.IMGDIR_TOP + "info/info0.png", e.LUANA.conf.IMGDIR_TOP + "info/info2.png", e.LUANA.conf.IMGDIR_TOP + "menu/about_off.png", e.LUANA.conf.IMGDIR_TOP + "menu/about_on.png", e.LUANA.conf.IMGDIR_TOP + "menu/board_off.png", e.LUANA.conf.IMGDIR_TOP + "menu/board_on.png", e.LUANA.conf.IMGDIR_TOP + "menu/cm_off.png", e.LUANA.conf.IMGDIR_TOP + "menu/cm_on.png", e.LUANA.conf.IMGDIR_TOP + "menu/menu0.png", e.LUANA.conf.IMGDIR_TOP + "menu/menu1.png", e.LUANA.conf.IMGDIR_TOP + "menu/spot_off.png", e.LUANA.conf.IMGDIR_TOP + "menu/spot_on.png", e.LUANA.conf.IMGDIR_TOP + "fb_on.png", e.LUANA.conf.IMGDIR_TOP + "fb_off.png"

      ];*/
      this._cmnFooter;
      this._fb;
      this._init()
    }
    t.prototype._init = function () {
      var t, n, r, i, s, o;
      $("body").css("overflow-x", "hidden");
      this._elm = $("#effectLayer");
      this._elm.css({
        position: "absolute",
        top: 60,
        zIndex: -9999
      });
      // this._cmnFooter = $("#ccCommonFooter");
      // this._cmnFooter.css({
      //   position: "absolute",
      //   top: e.LUANA.conf.MIN_HEIGHT,
      //   left: 0
      // });
      // if (e.LUANA.conf.ANIMATE) {
      //   // this._loading = new e.LUANA_CLASS.loading($("body"), "luanaLoading");
      //   // this._loading.add();
      //   n = [];
      //   o = this._preImages;
      //   for (t = i = 0, s = o.length; i < s; t = ++i) {
      //     r = o[t];
      //     n.push({
      //       url: r,
      //       id: t
      //     })
      //   }
      //   this._preLoader = new SNCJM.imgLoader(n, 5);
      //   return this._preLoader.start({
      //     target: this,
      //     func: "add"
      //   })
      // }
      return this.add()
    };
    t.prototype.add = function () {
      // if (this._loading != null) {
      //   this._loading.del();
      //   this._loading = null
      // }
      // this._header = new e.LUANA_CLASS.headerView("header");
      // this._header.onComplete = this._completeHeader;
      // this._header.add();
      // this._menu = new e.LUANA_CLASS.menuView("menu");
      // this._menu.add();
      // this._info = new e.LUANA_CLASS.infoView("info");
      // this._info.add();

      t = new e.LUANA_CLASS.effectView($("#effectContainer"), "effect");    // 本来this._header.onCompleteハンドラ内で実行されるものだが
      return t.add()                                            // headerは追加しないで効果だけを発言するようにここに持ってきた

      e.LUANA.main.addResize(this.resize, !0);
      return $("body").css("overflow-x", "visible")
    };
    t.prototype.update = function () {};
    t.prototype.resize = function () {
      var t, n;
      n = e.LUANA.main.ws.w;
      t = e.LUANA.main.ws.h;
      return this._elm.css({
        left: ~~(n * .5)
      })
    };
    // t.prototype._completeHeader = function () {
    //   var t;
    //   if (this._panel == null) {
    //     this._panel = new e.LUANA_CLASS.panelView(this._elm, "panel", 4);
    //     this._panel.onCompetePanel = this._completePanel;
    //     this._panel.add();
    //     if (e.LUANA.conf.ANIMATE) {
    //       t = new e.LUANA_CLASS.effectView($("body"), "effect");
    //       return t.add()
    //     }
    //   }
    // };
    // t.prototype._completePanel = function () {
    //   var t, n = this;
    //   if (this._footer == null) {
    //     this._footer = new e.LUANA_CLASS.footerView("footer");
    //     this._footer.add();
    //     setTimeout(function () {
    //       return e.LUANA.main.loadWebFontCss()
    //     }, 3e3)
    //   }
    //   t = this._panel.getPanelsHeight() + 270;
    //   this._footer.setPoint(0, t);
    //   this._cmnFooter.css({
    //     top: t + 408
    //   });
    //   if (this._fb == null) {
    //     this._fb = new e.LUANA_CLASS.fbView($("body"));
    //     return this._fb.add()
    //   }
    // };
    return t
  }();

  $(window).load(function () {
    // e.LUANA.conf = new e.LUANA_CLASS.conf;
    e.LUANA.main = new e.LUANA_CLASS.main;
    return e.LUANA.main.setup()
  });

  // e.LUANA_CLASS.conf = function () {
  //   function e() {
  //     this.TEST = !1;
  //     this.STATS = !1;
  //     this.LOCAL = !1;
  //     this.FPS = 30;
  //     this.IS_SMT = _util.isSmt();
  //     this.IS_ADR = _util.isAndroid();
  //     this.IS_WIN = _util.isWin();
  //     this.IS_IPAD = _util.isIpad();
  //     this.IS_IE = _util.isIe();
  //     this.IS_IE8 = _util.isIe8Under();
  //     this.IS_IE6 = _util.isIe6();
  //     this.IS_RATINA = window.devicePixelRatio != null && window.devicePixelRatio > 1;
  //     this.IS_USE3D = Modernizr.csstransforms3d;
  //     this.ANIMATE = this.IS_IE8 ? !1 : !0;
  //     this.CURRENT_DIR = "/luana/";
  //     this.IMGDIR_CMN = this.CURRENT_DIR + "images/common/";
  //     this.IMGDIR_TOP = this.CURRENT_DIR + "images/index/";
  //     this.IMGDIR_ABOUT = this.CURRENT_DIR + "images/product/";
  //     this.IMGDIR_SPOT = this.CURRENT_DIR + "images/spot/";
  //     this.IMGDIR_SPOT_TEASER = this.CURRENT_DIR + "images/spot/teaser/";
  //     this.IMGDIR_TVCM = this.CURRENT_DIR + "images/cm/";
  //     this.IMGDIR_MUSIC = this.CURRENT_DIR + "images/music/";
  //     this.ID_TOP = -1;
  //     this.ID_ABOUT = 0;
  //     this.ID_BOARD = 1;
  //     this.ID_SPOT = 2;
  //     this.ID_TVCM = 3;
  //     this.ID_MUSIC = 4;
  //     this.CONTENTS_WIDTH = 1e3;
  //     this.DATA_PANEL = this.CURRENT_DIR + "js/data.js";
  //     this.FIRST_PANEL_NUM = this.IS_IE ? 4 : 8;
  //     this.PANEL_WIDTH = 225;
  //     this.PANEL_IMG_WIDTH = 195;
  //     this.PANEL_NEWS_WIDTH = this.PANEL_WIDTH;
  //     this.PANEL_NEWS_HEIGHT = 230;
  //     this.PANEL_GIF_WIDTH = 200;
  //     this.PANEL_GIF_HEIGHT = 200;
  //     this.PANEL_MARGIN_X = 20;
  //     this.PANEL_MARGIN_Y = 20;
  //     this.FONT_COLOR = ["#cb5218", "#328d27", "#d78a00", "#60a6c8"];
  //     this.LINK_SNS = [];
  //     this.LINK_SNS[this.ID_ABOUT] = {
  //       t: "https://twitter.com/intent/tweet?text=%e3%80%90LUANA%e3%81%ae%e3%81%93%e3%81%a0%e3%82%8f%e3%82%8a%e3%80%91%e3%81%84%e3%81%a4%e3%81%a7%e3%82%82%e3%81%a9%e3%81%93%e3%81%a7%e3%82%82%e3%80%81%e7%b4%a0%e6%9d%90%e6%9c%ac%e6%9d%a5%e3%81%ae%e5%91%b3%e3%82%92%e3%82%86%e3%81%a3%e3%81%8f%e3%82%8a%e6%a5%bd%e3%81%97%e3%82%80%e3%81%9f%e3%82%81%e3%81%ae%e3%81%93%e3%81%a0%e3%82%8f%e3%82%8a%e3%82%92%e7%b4%b9%e4%bb%8b%e3%81%97%e3%81%be%e3%81%99%e2%99%aa%20http%3a%2f%2fluana%2dcafe%2ejp%2fproduct%2f%20%23LUANAcafe",
  //       f: "http://www.facebook.com/sharer/sharer.php?u=http://luana-cafe.jp/product/",
  //       m: "https://mixi.jp/share.pl?mode=login&u=http://luana-cafe.jp/product/"
  //     };
  //     this.LINK_SNS[this.ID_SPOT] = {
  //       t: "https://twitter.com/intent/tweet?text=%e3%80%90LUANA%20%e3%81%a9%e3%81%93%e3%81%a7%e3%82%82%e3%82%ab%e3%83%95%e3%82%a7%e6%b0%97%e5%88%86%e3%82%b9%e3%83%9d%e3%83%83%e3%83%88%e3%80%91%e3%81%8a%e5%ae%b6%e3%82%84%e8%81%b7%e5%a0%b4%e3%82%84%e3%81%8a%e5%a4%96%e3%81%a7%e3%82%82%e3%80%81%e3%81%82%e3%81%aa%e3%81%9f%e3%81%8c%e3%82%ab%e3%83%95%e3%82%a7%e3%81%ae%e3%82%88%e3%81%86%e3%81%ab%e3%83%aa%e3%83%a9%e3%83%83%e3%82%af%e3%82%b9%e3%81%a7%e3%81%8d%e3%82%8b%e5%a0%b4%e6%89%80%e3%82%92%e6%92%ae%e5%bd%b1%e3%81%97%e3%81%a6%e3%81%8f%e3%81%a0%e3%81%95%e3%81%84%e2%99%aa%20%20http%3a%2f%2fluana%2dcafe%2ejp%2fspot%2f%20%23LUANAcafe",
  //       f: "http://www.facebook.com/sharer/sharer.php?u=http://luana-cafe.jp/spot/",
  //       m: "https://mixi.jp/share.pl?mode=login&u=http://luana-cafe.jp/spot/"
  //     };
  //     this.LINK_SNS[this.ID_TVCM] = {
  //       t: "https://twitter.com/intent/tweet?text=%e3%80%90LUANA%20TVCM%e3%80%91%e6%89%8b%e4%bd%9c%e3%82%8a%e3%81%ae%e3%81%ac%e3%81%8f%e3%82%82%e3%82%8a%e3%81%8c%e6%84%9f%e3%81%98%e3%82%89%e3%82%8c%e3%82%8b%e3%80%81LUANA%e3%81%ae%e4%b8%96%e7%95%8c%e8%a6%b3%e3%82%92%e6%8f%8f%e3%81%84%e3%81%9fCM%e3%83%a0%e3%83%bc%e3%83%93%e3%83%bc%e3%82%92%e5%85%ac%e9%96%8b%e2%99%aa%20%20http%3a%2f%2fluana%2dcafe%2ejp%2fcm%2f%20%23LUANAcafe",
  //       f: "http://www.facebook.com/sharer/sharer.php?u=http://luana-cafe.jp/cm/",
  //       m: "https://mixi.jp/share.pl?mode=login&u=http://luana-cafe.jp/cm/"
  //     };
  //     this.LINK_SNS[this.ID_MUSIC] = {
  //       t: "https://twitter.com/intent/tweet?text=%e3%80%90LUANA%20music%20cafe%e3%80%91%e5%af%be%e8%b1%a1%e3%81%aeLUANA%ef%bc%88%e3%83%ab%e3%82%a2%e3%83%bc%e3%83%8a%ef%bc%89%e3%81%ab%e3%81%a4%e3%81%84%e3%81%a6%e3%82%8bQR%e3%82%b3%e3%83%bc%e3%83%89%e3%81%a7%e3%80%81%e3%80%8c%e3%83%ac%e3%82%b3%e3%83%81%e3%83%a7%e3%82%afBest%e3%80%8d%e3%81%a8LUANA%e5%8e%b3%e9%81%b8%e3%83%97%e3%83%ac%e3%82%a4%e3%83%aa%e3%82%b9%e3%83%88%e8%81%b4%e3%81%8d%e6%94%be%e9%a1%8c%e2%99%aa%20%20http%3a%2f%2fluana%2dcafe%2ejp%2fmusic%2f%20%23LUANAcafe",
  //       f: "http://www.facebook.com/sharer/sharer.php?u=http://luana-cafe.jp/music/",
  //       m: "https://mixi.jp/share.pl?mode=login&u=http://luana-cafe.jp/music/"
  //     };
  //     this.LINK_SNS_TOP = {
  //       t: "https://twitter.com/intent/tweet?text=%e3%80%90LUANA%ef%bc%88%e3%83%ab%e3%82%a2%e3%83%bc%e3%83%8a%ef%bc%89%e3%80%91%e3%82%ab%e3%83%95%e3%82%a7%e3%82%b9%e3%82%bf%e3%82%a4%e3%83%ab%e3%81%ae%e7%94%98%e3%81%8f%e3%81%aa%e3%81%84%e3%82%b3%e3%83%bc%e3%83%92%e3%83%bc%20%e6%96%b0%e7%99%bb%e5%a0%b4%e2%99%aa%20http%3a%2f%2fluana%2dcafe%2ejp%2f%20%23LUANAcafe",
  //       f: "http://www.facebook.com/sharer/sharer.php?u=http://luana-cafe.jp/",
  //       m: "https://mixi.jp/share.pl?mode=login&u=http://luana-cafe.jp/"
  //     };
  //     this.CHILD_MAIN_WIDTH = 715;
  //     this.CMN_FOOTER_Y = 800;
  //     this.MIN_HEIGHT = 1e3;
  //     this.SOUND_SWF = this.CURRENT_DIR + "js/sound.swf";
  //     this.SOUND_SWF_ID = "luanaSoundSwf";
  //     this.COOKIE_SOUND = "luanaSoundStatus";
  //     this.IS_WEBFONT_IE = this.IS_IE8 ? !1 : !0
  //   }
  //   return e
  // }();

  e.LUANA_CLASS.effectView = function () {
    function t(e, n) {
      var r = this;
      this.resize = function () {
        return t.prototype.resize.apply(r, arguments)
      };
      this.update = function () {
        return t.prototype.update.apply(r, arguments)
      };
      this._completeEffect = function () {
        return t.prototype._completeEffect.apply(r, arguments)
      };
      this._startEffect = function () {
        return t.prototype._startEffect.apply(r, arguments)
      };
      this._parent = e;
      this._elmId = n;
      this._elm;
      this._type = 0;
      this._delay = 10;   //15e3
      this._timer;
      this._effect;
      this._init()
    }
    t.prototype._init = function () {};
    t.prototype.add = function () {                       // 効果を載せるDOM生成
      this._parent.append(_util.tag("div", [{             // 動的生成のDOMを親にアペンド：親はインスタンスの引数の e
        name: "id",
        val: this._elmId
      }]));
      this._elm = $("#" + this._elmId);
      this._elm.css({
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999
      });
      this._type = 1;// this._type = _util.random(0, 1);
      return setTimeout(this._startEffect, 1e3)
    };
    t.prototype._startEffect = function () {
      if (this._effect != null) {
        this._effect.del();
        this._effect = null
      }
      this._type === 0 ? this._effect = new e.LUANA_CLASS.leafView(this._elm, this._elmId + "_leaf") : this._effect = new e.LUANA_CLASS.rainView(this._elm, this._elmId + "_rain");
      this._effect.add();
      return this._effect.onComplete = this._completeEffect
    };
    t.prototype._completeEffect = function () {
      this._type = 1;//this._type = this._type === 0 ? 1 : 0;     // this._type =  0; ずっと葉っぱにするとき
      if (this._timer != null) {
        clearTimeout(this._timer);
        this._timer = null
      }
      if (this._effect != null) {
        this._effect.del();
        this._effect = null
      }
      return this._timer = setTimeout(this._startEffect, this._delay)
    };
    t.prototype.update = function () {};
    t.prototype.resize = function () {};
    return t
  }();

  e.LUANA_CLASS.leafView = function () {
    function t(e, n) {
      var r = this;
      this.update = function () {
        return t.prototype.update.apply(r, arguments)
      };
      this._parent = e;
      this._elmId = n;
      this._elm;
      this._num = 10;
      this._isUpdate = !0;
      this._list = [];
      this.onComplete;
      this._init()
    }
    t.prototype._init = function () {
      if (!Modernizr.csstransforms3d) return this._num = 5
    };
    t.prototype.add = function () {
      var t, n, r, i, s, o;
      this._parent.append(_util.tag("div", [{
        name: "id",
        val: this._elmId
      }]));
      this._elm = $("#" + this._elmId);
      this._elm.css({
        position: "fixed",
        top: 0,
        left: 0
      });
      s = e.LUANA.main.ws.w;
      t = e.LUANA.main.ws.h;
      i = 50;
      n = 0;
      while (n < this._num) {
        o = n % 2 === 0 ? i : s - i;
        o += _util.range(200);
        r = new e.LUANA_CLASS.leafParts(this._elm, n);
        r.add(o, t + 300);
        this._list.push(r);
        n++
      }
      return e.LUANA.main.addUpdate(this.update)
    };
    t.prototype.update = function () {
      var e, t, n, r, i, s;
      if (!this._isUpdate) return;
      e = 0;
      s = this._list;
      for (t = r = 0, i = s.length; r < i; t = ++r) {
        n = s[t];
        n.update();
        n.checkDead() && e++
      }
      if (e >= this._list.length) {
        this._isUpdate = !1;
        if (this.onComplete != null) return this.onComplete()
      }
    };
    t.prototype._delParts = function () {
      var e, t, n, r, i;
      i = this._list;
      for (e = n = 0, r = i.length; n < r; e = ++n) {
        t = i[e];
        t.del();
        this._list[e] = null
      }
      return this._list = null
    };
    t.prototype.del = function () {
      e.LUANA.main.delUpdate(this.update);
      this._delParts();
      this._parent = null;
      if (this._elm != null) {
        this._elm.remove();
        this._elm = null
      }
      return this.onComplete = null
    };
    return t
  }();

  e.LUANA_CLASS.leafParts = function () {
    function t(e, n) {
      var r = this;
      this.checkDead = function () {
        return t.prototype.checkDead.apply(r, arguments)
      };
      this.update = function () {
        return t.prototype.update.apply(r, arguments)
      };
      this._parent = e;
      this._id = n;
      this._elmId = "effectLeaf" + n;
      this._elm;
      this._img;
      this._anm = {};
      this._float;
      this._use3d = Modernizr.csstransforms3d;
      this._init()
    }
    t.prototype._init = function () {};
    t.prototype.add = function (t, n) {
      var r;
      this._parent.append(_util.tag("div", [{
        name: "id",
        val: this._elmId
      }]));
      this._elm = $("#" + this._elmId);
      this._elm.css({
        position: "absolute",
        top: n,
        left: t
      });
      this._anm.x = _util.range(100);
      this._anm.y = _util.range(100);
      this._anm.r = _util.range(100);
      this._anm.s = _util.random(60, 100) / 100;
      this._anm.cnt = 0;
      this._anm.delay = _util.random(0, 20);
      this._anm.dead = !1;
      this._anm.bX = 0;
      this._anm.bY = 0;
      this._anm.spdX = _util.range(10) / 20;
      this._anm.spdY = 0;
      this._float = new IKERYOU.float(this._anm, [{
        target: "x",
        range: _util.random(250, 500),
        speed: _util.range(50) / 10
      }, {
        target: "y",
        range: _util.random(250, 300),
        speed: _util.range(50) / 10
      }, {
        target: "r",
        range: _util.random(20, 100),
        speed: _util.range(30) / 10
      }]);
      r = "./images/leaf" + String(_util.random(0, 3)) + ".png";
      this._elm.append(_util.tag("img", [{
        name: "src",
        val: r
      }, {
        name: "id",
        val: this._elmId + "_img"
      }]));
      this._img = $("#" + this._elmId + "_img");
      return this._img.css({
        position: "absolute",
        top: 0,
        left: 0
      })
    };
    t.prototype.update = function () {
      // if (this._anm.dead) return;
      if (this._anm.bY > e.LUANA.main.ws.h + 100) {								// if (this._anm.dead) { return; }　元は、個別に雨粒を見て、デッドの場合、他の雨粒も全部デッドになるまでreturnしていた
        this._anm.spdY = 0;																			// デッド判定で縦位置とスピードをもとに戻し、
        this._anm.bY = 0;
        var maxRange = $(window).width();
        this._img.css({left: _util.random(-100, maxRange)});						// 横位置はランダムに変更する（対象は雨粒画像のラッパー要素のthis.img）
        return;
      }
      this._float.update();
      if (++this._anm.cnt >= this._anm.delay) {
        this._anm.spdY += .35;
        this._anm.bY -= this._anm.spdY;
        this._anm.bX += this._anm.spdX;
        this._elm.css(_util.getVendorCss("transform", _util.translate3d(this._anm.bX, this._anm.bY, 0, this._use3d)));
        this._anm.bY < -(e.LUANA.main.ws.h + 800) && (this._anm.dead = !0)
      }
      return this._img.css(_util.getVendorCss("transform", _util.rotate(this._anm.r) + " " + _util.translate3d(this._anm.x, this._anm.y) + _util.scaleX(this._anm.s) + " " + _util.scaleY(this._anm.s)))
    };
    t.prototype.checkDead = function () {
      return this._anm.dead
    };
    t.prototype.del = function () {
      if (this._img != null) {
        this._img.remove();
        this._img = null
      }
      if (this._elm != null) {
        this._elm.remove();
        this._elm = null
      }
      this._anm = null;
      this._float = null;
      return this._parent = null
    };
    return t
  }();

  e.LUANA_CLASS.rainView = function () {
    function t(e, n) {
      var r = this;
      this.update = function () {
        return t.prototype.update.apply(r, arguments)
      };
      this._parent = e;
      this._elmId = n;
      this._elm;
      this._num = 7;
      this._isUpdate = !0;
      this._list = [];
      this.onComplete;
      this._init()
    }
    t.prototype._init = function () {
      if (!Modernizr.csstransforms3d) return this._num = 4
    };
    t.prototype.add = function () {
      var t, n, r, i, s;
      this._parent.append(_util.tag("div", [{
        name: "id",
        val: this._elmId
      }]));
      this._elm = $("#" + this._elmId);
      this._elm.css({
        position: "absolute",
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
      });
      // s = e.LUANA.main.ws.w;
      s = 200;                          // 効果発現範囲を全画面幅から特定コンテナ要素幅にした
      t = e.LUANA.main.ws.h;
      r = s / this._num;
      n = 0;
      while (n < this._num) {
        i = new e.LUANA_CLASS.rainParts(this._elm, n);
        i.add(n * r + _util.range(200), (-380 + _util.range(300)));
        // console.log(Math.abs(_util.range(100)))
        this._list.push(i);
        n++
      }
      return e.LUANA.main.addUpdate(this.update)
    };
    t.prototype.update = function () {
      var e, t, n, r, i, s;
      if (!this._isUpdate) return;
      e = 0;
      s = this._list;
      for (t = r = 0, i = s.length; r < i; t = ++r) {
        n = s[t];
        n.update();
        n.checkDead() && e++
      }
      if (e >= this._list.length) {
        this._isUpdate = !1;
        if (this.onComplete != null) return this.onComplete()
      }
    };
    t.prototype._delParts = function () {
      var e, t, n, r, i;
      i = this._list;
      for (e = n = 0, r = i.length; n < r; e = ++n) {
        t = i[e];
        t.del();
        this._list[e] = null
      }
      return this._list = null
    };
    t.prototype.del = function () {
      e.LUANA.main.delUpdate(this.update);
      this._delParts();
      this._parent = null;
      if (this._elm != null) {
        this._elm.remove();
        this._elm = null
      }
      return this.onComplete = null
    };
    return t
  }();
  e.LUANA_CLASS.rainParts = function () {
    function t(e, n) {
      var r = this;
      this.checkDead = function () {
        return t.prototype.checkDead.apply(r, arguments)
      };
      this.update = function () {
        return t.prototype.update.apply(r, arguments)
      };
      this._parent = e;
      this._id = n;
      this._elmId = "effectRain" + n;
      this._elm;
      this._img;
      this._anm = {};
      this._float;
      this._use3d = Modernizr.csstransforms3d;
      this._init()
    }
    t.prototype._init = function () {};
    t.prototype.add = function (t, n) {
      var r;
      this._parent.append(_util.tag("div", [{
        name: "id",
        val: this._elmId
      }]));
      this._elm = $("#" + this._elmId);
      this._elm.css({
        position: "absolute",
        top: n,
        left: t
      });
      this._anm.s = _util.random(30, 50) / 100;
      this._anm.r = _util.range(10);
      this._anm.cnt = 0;
      this._anm.delay = _util.random(0, 100);
      this._anm.dead = !1;
      this._anm.bY = 0;
      this._anm.spdY = 0;
      this._float = new IKERYOU.float(this._anm, [{
        target: "r",
        range: _util.random(5, 10),
        speed: _util.range(10) / 10
      }]);
      r = "./images/effect/rain" + String(_util.random(0, 3)) + ".png";
      this._elm.append(_util.tag("img", [{
        name: "src",
        val: r
      }, {
        name: "id",
        val: this._elmId + "_img"
      }]));
      this._img = $("#" + this._elmId + "_img");
      this._img.css({
        position: "absolute",
        top: 0,
        left: 0
      });
      return this._img.css(_util.getVendorCss("transform", _util.scaleX(this._anm.s) + " " + _util.scaleY(this._anm.s)))
    };
    t.prototype.update = function () {
      if (this._anm.dead) return;
      this._float.update();
      if (++this._anm.cnt >= this._anm.delay) {
        this._anm.spdY += .5;
        this._anm.bY += this._anm.spdY;
        this._elm.css(_util.getVendorCss("transform", _util.translate3d(0, this._anm.bY, 0, this._use3d)));
        this._anm.bY > e.LUANA.main.ws.h + 300 && (this._anm.dead = !0)
      }
      return this._img.css(_util.getVendorCss("transform", _util.rotate(this._anm.r) + " " + _util.translate3d(this._anm.x, this._anm.y) + _util.scaleX(this._anm.s) + " " + _util.scaleY(this._anm.s)))
    };
    t.prototype.checkDead = function () {
      return this._anm.dead
    };
    t.prototype.del = function () {
      if (this._img != null) {
        this._img.remove();
        this._img = null
      }
      if (this._elm != null) {
        this._elm.remove();
        this._elm = null
      }
      this._anm = null;
      this._float = null;
      return this._parent = null
    };
    return t
  }();


  // e.LUANA_CLASS.util = function () {
  //   function e() {
  //     var t = this;
  //     this.isMouseContentsBottom = function (n) {
  //       return e.prototype.isMouseContentsBottom.apply(t, arguments)
  //     }
  //   }
  //   e.prototype.isMouseContentsBottom = function (e) {
  //     var t, n, r;
  //     e == null && (e = 0);
  //     t = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
  //     n = Math.max($("body").scrollTop(), $("html").scrollTop());
  //     r = $(window).height();
  //     return n + e >= t - r ? !0 : !1
  //   };
  //   e.prototype.mouseOver = function (e) {
  //     var t, n, r, i, s;
  //     n = e.data == null || e.data.change == null ? !0 : e.data.change;
  //     s = e.data == null || e.data.top == null ? -5 : e.data.top;
  //     i = e.data == null || e.data.time == null ? 800 : e.data.time;
  //     t = e.data == null || e.data.animate == null ? !0 : e.data.animate;
  //     _util.buttonMode(!0);
  //     if (n) {
  //       r = $(this).attr("src");
  //       $(this).attr("src", r.replace("_off", "_on"))
  //     }
  //     if (t) {
  //       _util.stop($(this));
  //       return $(this).css("top", s).animate({
  //         top: 0
  //       }, i, "easeOutElastic")
  //     }
  //   };
  //   e.prototype.mouseOut = function (e) {
  //     var t, n, r, i, s;
  //     n = e.data == null || e.data.change == null ? !0 : e.data.change;
  //     s = e.data == null || e.data.top == null ? -5 : e.data.top;
  //     i = e.data == null || e.data.time == null ? 800 : e.data.time;
  //     t = e.data == null || e.data.animate == null ? !0 : e.data.animate;
  //     _util.buttonMode(!1);
  //     if (n) {
  //       r = $(this).attr("src");
  //       $(this).attr("src", r.replace("_on", "_off"))
  //     }
  //     if (t) {
  //       _util.stop($(this));
  //       return $(this).css("top", s).animate({
  //         top: 0
  //       }, i, "easeOutElastic")
  //     }
  //   };
  //   e.prototype.mouseOver2 = function (e) {
  //     var t, n;
  //     n = e.data == null || e.data.time == null ? 20 : e.data.time;
  //     t = e.data == null || e.data.opacity == null ? .5 : e.data.opacity;
  //     _util.buttonMode(!0);
  //     _util.stop($(this));
  //     return $(this).animate({
  //       opacity: t
  //     }, n)
  //   };
  //   e.prototype.mouseOut2 = function (e) {
  //     var t;
  //     t = e.data == null || e.data.time == null ? 200 : e.data.time;
  //     _util.buttonMode(!1);
  //     _util.stop($(this));
  //     return $(this).animate({
  //       opacity: 1
  //     }, t)
  //   };
  //   e.prototype.mouseOver3 = function (e) {
  //     var t, n, r, i, s, o, u, a;
  //     n = e.data == null || e.data.change == null ? !0 : e.data.change;
  //     s = e.data == null || e.data.offsetX == null ? 0 : e.data.offsetX;
  //     o = e.data == null || e.data.offsetY == null ? 5 : e.data.offsetY;
  //     a = e.data == null || e.data.time == null ? 20 : e.data.time;
  //     r = e.data == null || e.data.easing == null ? "linear" : e.data.easing;
  //     t = e.data == null || e.data.animate == null ? !0 : e.data.animate;
  //     i = $(this);
  //     _util.buttonMode(!0);
  //     if (n) {
  //       u = i.attr("src");
  //       i.attr("src", u.replace("_off", "_on"))
  //     }
  //     if (t) {
  //       _util.stop(i);
  //       return i.animate({
  //         marginTop: o,
  //         marginLeft: s
  //       }, a, r)
  //     }
  //   };
  //   e.prototype.mouseOut3 = function (e) {
  //     var t, n, r, i, s, o, u, a;
  //     n = e.data == null || e.data.change == null ? !0 : e.data.change;
  //     s = e.data == null || e.data.offsetX == null ? 0 : e.data.offsetX;
  //     o = e.data == null || e.data.offsetY == null ? 0 : e.data.offsetY;
  //     a = e.data == null || e.data.time == null ? 100 : e.data.time;
  //     r = e.data == null || e.data.easing == null ? "linear" : e.data.easing;
  //     t = e.data == null || e.data.animate == null ? !0 : e.data.animate;
  //     i = $(this);
  //     _util.buttonMode(!1);
  //     if (n) {
  //       u = i.attr("src");
  //       i.attr("src", u.replace("_on", "_off"))
  //     }
  //     if (t) {
  //       _util.stop(i);
  //       return i.animate({
  //         marginTop: o,
  //         marginLeft: s
  //       }, a, r)
  //     }
  //   };
  //   e.prototype.setLog = function (e) {
  //     var t;
  //     t = {
  //       domain: "c.cocacola.co.jp",
  //       title: document.title,
  //       name: e
  //     };
  //     typeof dcsMultiTrack != "undefined" && dcsMultiTrack !== null && dcsMultiTrack("DCS.dcssip", t.domain, "DCS.dcsuri", t.name, "WT.ti", t.title, "WT.cg_n", "", "WT.cg_s", "");
  //     if (typeof _gaq != "undefined" && _gaq !== null) return _gaq.push(["_trackEvent", t.title, t.name])
  //   };
  //   return e
  // }();

  var words = document.getElementsByClassName('word');
  var wordArray = [];
  var currentWord = 0;

  words[currentWord].style.opacity = 1;
  for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
  }

  function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
      nw[i].className = 'letter behind';
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
  }

  function animateLetterOut(cw, i) {
    setTimeout(function() {
  		cw[i].className = 'letter out';
    }, i*80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(function() {
  		nw[i].className = 'letter in';
    }, 340+(i*80));
  }

  function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
      var letter = document.createElement('span');
      letter.className = 'letter';
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }

  changeWord();
  setInterval(changeWord, 4000);


}).call(this);
