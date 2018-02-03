/* **********************************************
     Begin util.js
********************************************** */
export default () => {

  window.SNCJM == undefined && (window.SNCJM = {});
  (function () {
    SNCJM.util = function () {
      this.EVENT_TYPE_CLICK = "touchstart click";
      this.A = Math.PI / 180
    };
    var e = SNCJM.util.prototype;
    e.random = function (e, t) {
      e < 0 && e--;
      return ~~(Math.random() * (t + 1 - e) + e)
    };
    e.hit = function (e) {
      return this.random(0, e - 1) == 0
    };
    e.range = function (e) {
      return this.random(-e, e)
    };
    e.map = function (e, t, n, r, i) {
      if (e < r) return t;
      if (e > i) return n;
      var s = (n - t) / (i - r);
      return (e - r) * s + t
    };
    e.radian = function (e) {
      return e * this.A
    };
    e.degree = function (e) {
      return e / this.A
    };
    e.decimal = function (e, t) {
      e = String(e);
      var n = e.indexOf(".");
      if (t == 0) return e.split(".")[0];
      if (n == -1) {
        e += ".";
        for (var r = 0; r < t; r++) e += "0";
        return e
      }
      e = e.substr(0, n) + e.substr(n, t + 1);
      return e
    };
    e.floor = function (e, t, n) {
      return Math.min(n, Math.max(e, t))
    };
    e.strReverse = function (e) {
      var t = "",
        n = e.length;
      for (var r = 1; r <= n; r++) t += e.substr(-r, 1);
      return t
    };
    e.shuffle = function (e) {
      var t = e.length;
      while (--t) {
        var n = Math.floor(Math.random() * (t + 1));
        if (t == n) continue;
        var r = e[t];
        e[t] = e[n];
        e[n] = r
      }
    };
    e.sliceNull = function (e) {
      var t = [],
        n = e.length;
      for (var r = 0; r < n; r++) e[r] != null && t.push(e[r]);
      return t
    };
    e.sort = function (e, t, n) {
      n == undefined && (n = !1);
      n ? e.sort(function (e, n) {
        return n[t] - e[t]
      }) : e.sort(function (e, n) {
        return e[t] - n[t]
      })
    };
    e.addUnique = function (e) {
      return e + "?date=" + (new Date).getTime()
    };
    e.getRandomColor = function () {
      var e = Math.floor(Math.random() * 16777215).toString(16);
      for (count = e.length; count < 6; count++) e = "0" + e;
      e = "#" + e;
      return e
    };
    e.stop = function (e) {
      if (e.length == 0) return;
      var t = e.queue().length;
      for (var n = 0; n < t; n++) e.stop()
    };
    e.buttonMode = function (e) {
      $("body").css("cursor", e ? "pointer" : "default")
    };
    e.getQuery = function (e) {
      e = e.replace(/[€[]/, "€€€[").replace(/[€]]/, "€€€]");
      var t = new RegExp("[€€?&]" + e + "=([^&#]*)"),
        n = t.exec(window.location.href);
      return n == null ? "" : n[1]
    };
    e.hash = function () {
      return location.hash.replace("#", "")
    };
    e.isSmt = function () {
      return navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPod") > 0 || navigator.userAgent.indexOf("Android") > 0
    };
    e.isAndroid = function () {
      return navigator.userAgent.indexOf("Android") > 0
    };
    e.isIe = function () {
      var e, t = 3,
        n = document.createElement("div");
      while (n.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->", n.getElementsByTagName("i")[0]);
      return t > 4 ? t : e
    };
    e.isIe8Under = function () {
      var e = navigator.appVersion.toLowerCase();
      e = e.indexOf("msie") > -1 ? parseInt(e.replace(/.*msie[ ]/, "").match(/^[0-9]+/)) : 0;
      return e <= 8 && e != 0
    };
    e.isIe6 = function () {
      return typeof document.documentElement.style.maxHeight != "undefined" ? !1 : !0
    };
    e.isIpad = function () {
      return navigator.userAgent.indexOf("iPad") > 0
    };
    e.isWin = function () {
      return navigator.platform.indexOf("Win") != -1
    };
    e.getCookie = function (e) {
      if (document.cookie == undefined || document.cookie == null) return null;
      var t = document.cookie.split("; "),
        n = t.length;
      for (var r = 0; r < n; r++) {
        var i = t[r].split("=");
        if (i[0] == e) return i[1]
      }
      return null
    };
    e.setCookie = function (e, t) {
      document.cookie = e + "=" + t
    };
    e.useFixed = function () {
      var e = document.body;
      if (document.createElement && e && e.appendChild && e.removeChild) {
        var t = document.createElement("div");
        if (!t.getBoundingClientRect) return null;
        t.innerHTML = "x";
        t.style.cssText = "position:fixed;top:100px;";
        e.appendChild(t);
        var n = e.style.height,
          r = e.scrollTop;
        e.style.height = "3000px";
        e.scrollTop = 500;
        var i = t.getBoundingClientRect().top;
        e.style.height = n;
        var s = i === 100;
        e.removeChild(t);
        e.scrollTop = r;
        return s
      }
      return !1
    };
    e.tag = function (e, t, n) {
      t == undefined && (t = []);
      n == undefined && (n = !0);
      var r = "<" + e,
        i = t.length;
      for (var s = 0; s < i; s++) r += " " + t[s].name + "=" + t[s].val;
      r += ">";
      n && (r += "</" + e + ">");
      return r
    };
    e.translate = function (e, t) {
      e == undefined && (e = 0);
      t == undefined && (t = 0);
      return "translate(" + e + "px," + t + "px)"
    };
    e.translateX = function (e) {
      e == undefined && (e = 0);
      return "translateX(" + e + "px)"
    };
    e.translateY = function (e) {
      e == undefined && (e = 0);
      return "translateY(" + e + "px)"
    };
    e.translate3d = function (e, t, n, r) {
      e == undefined && (e = 0);
      t == undefined && (t = 0);
      n == undefined && (n = 0);
      r == undefined && (r = !0);
      return r ? "translate3d(" + e + "px," + t + "px," + n + "px)" : "translate(" + e + "px," + t + "px)"
    };
    e.rotate = function (e) {
      e == undefined && (e = 0);
      return "rotate(" + e + "deg)"
    };
    e.rotateX = function (e) {
      e == undefined && (e = 0);
      return "rotateX(" + e + "deg)"
    };
    e.rotateY = function (e) {
      e == undefined && (e = 0);
      return "rotateY(" + e + "deg)"
    };
    e.rotateZ = function (e) {
      e == undefined && (e = 0);
      return "rotateZ(" + e + "deg)"
    };
    e.scale3d = function (e, t, n) {
      e == undefined && (e = 1);
      t == undefined && (t = 0);
      n == undefined && (n = 0);
      return "scale3d(" + e + "," + t + "," + n + ")"
    };
    e.scaleX = function (e) {
      e == undefined && (e = 1);
      return "scaleX(" + e + ")"
    };
    e.scaleY = function (e) {
      e == undefined && (e = 1);
      return "scaleY(" + e + ")"
    };
    e.getVendorCss = function (e, t) {
      var n = {};
      n["-moz-" + e] = t;
      n["-webkit-" + e] = t;
      n["-o-" + e] = t;
      n["-ms-" + e] = t;
      n[e] = t;
      return n
    }
  })();
  window._util = new SNCJM.util;
  // end of SNCJ----------------------------------------------------------------

  window.IKERYOU == undefined && (window.IKERYOU = {});
  (function () {
    IKERYOU.sin = function (e, t, n, r, i) {
      this.base = e == undefined ? 0 : e;
      this.min = t == undefined ? 0 : t;
      this.max = n == undefined ? 0 : n;
      this.speed = r == undefined ? 0 : r;
      this.angle = i == undefined ? 0 : i;
      this.val = 0;
      this.update()
    };
    var e = IKERYOU.sin.prototype;
    e.update = function () {
      this.angle += this.speed;
      this.angle > 360 && (this.angle = this.angle - 360);
      this.val = this.base + this.map(Math.sin(this.angle * (Math.PI / 180)), this.min, this.max, -1, 1);
      return this.val
    };
    e.map = function (e, t, n, r, i) {
      if (e < r) return t;
      if (e > i) return n;
      var s = (n - t) / (i - r);
      return (e - r) * s + t
    }
  })();
  (function () {
    IKERYOU.colorRGB = function (e, t, n, r) {
      this.r = e & 255;
      this.g = t & 255;
      this.b = n & 255;
      this.a = r == undefined ? 1 : r
    };
    var e = IKERYOU.colorRGB.prototype;
    e.getColor = function () {
      return this.r << 16 | this.g << 8 | this.b
    };
    e.getColorStr = function (e) {
      e = e == undefined ? "#" : e;
      return e + this.getColor().toString(16)
    };
    e.setColor = function (e) {
      this.r = e >> 16 & 255;
      this.g = e >> 8 & 255;
      this.b = e & 255
    };
    e.setGray = function (e) {
      this.r = this.g = this.b = e & 255
    }
  })();
  (function () {
    IKERYOU.colorHSV = function (e, t, n, r) {
      e = e == undefined ? 0 : e;
      t = t == undefined ? 1 : t;
      n = n == undefined ? 1 : n;
      this.h = e;
      this.s;
      t > 1 ? this.s = 1 : t < 0 ? this.s = 0 : this.s = t;
      this.v;
      n > 1 ? this.v = 1 : n < 0 ? this.v = 0 : this.v = n;
      this.a = r == undefined ? 1 : r
    };
    var e = IKERYOU.colorHSV.prototype;
    e.getColor = function () {
      var e, t, n;
      if (this.s > 0) {
        var r = (this.h < 0 ? this.h % 360 + 360 : this.h % 360) / 60;
        if (r < 1) {
          e = Math.round(255 * this.v);
          t = Math.round(255 * this.v * (1 - this.s * (1 - r)));
          n = Math.round(255 * this.v * (1 - this.s))
        } else if (r < 2) {
          e = Math.round(255 * this.v * (1 - this.s * (r - 1)));
          t = Math.round(255 * this.v);
          n = Math.round(255 * this.v * (1 - this.s))
        } else if (r < 3) {
          e = Math.round(255 * this.v * (1 - this.s));
          t = Math.round(255 * this.v);
          n = Math.round(255 * this.v * (1 - this.s * (3 - r)))
        } else if (r < 4) {
          e = Math.round(255 * this.v * (1 - this.s));
          t = Math.round(255 * this.v * (1 - this.s * (r - 3)));
          n = Math.round(255 * this.v)
        } else if (r < 5) {
          e = Math.round(255 * this.v * (1 - this.s * (5 - r)));
          t = Math.round(255 * this.v * (1 - this.s));
          n = Math.round(255 * this.v)
        } else {
          e = Math.round(255 * this.v);
          t = Math.round(255 * this.v * (1 - this.s));
          n = Math.round(255 * this.v * (1 - this.s * (r - 5)))
        }
      } else e = t = n = Math.round(255 * this.v);
      return e << 16 | t << 8 | n
    };
    e.getColorStr = function (e) {
      e = e == undefined ? "#" : e;
      return e + this.getColor().toString(16)
    };
    e.setColor = function (e) {
      var t = e >> 16 & 255,
        n = e >> 8 & 255,
        r = e & 255;
      if (t != n || t != r)
        if (n > r)
          if (t > n) {
            this.v = t / 255;
            this.s = (t - r) / t;
            this.h = 60 * (n - r) / (t - r)
          } else if (t < r) {
        this.v = n / 255;
        this.s = (n - t) / n;
        this.h = 60 * (r - t) / (n - t) + 120
      } else {
        this.v = n / 255;
        this.s = (n - r) / n;
        this.h = 60 * (r - t) / (n - r) + 120
      } else if (t > r) {
        this.v = t / 255;
        this.s = (t - n) / t;
        this.h = 60 * (n - r) / (t - n);
        this.h < 0 && (this.h += 360)
      } else if (t < n) {
        this.v = r / 255;
        this.s = (r - t) / r;
        this.h = 60 * (t - n) / (r - t) + 240
      } else {
        this.v = r / 255;
        this.s = (r - n) / r;
        this.h = 60 * (t - n) / (r - n) + 240
      } else {
        this.h = this.s = 0;
        this.v = t / 255
      }
    }
  })();
  window.IKERYOU == undefined && (window.IKERYOU = {});
  (function () {
    IKERYOU.float = function (e, t) {
      this.target = e;
      this.para = t;
      this.sinList = [];
      this._list = {};
      if (this.para == undefined) return;
      var n = this.para.length;
      for (var r = 0; r < n; r++) {
        var i = this.para[r],
          s = new IKERYOU.sin(this.target[i.target], -i.range * .5, i.range * .5, i.speed);
        this.sinList.push(s);
        this._list[i.target] = s
      }
    };
    var e = IKERYOU.float.prototype;
    e.update = function (e) {
      var t = this.sinList.length;
      for (var n = 0; n < t; n++)
        if (e == undefined || !this._check(e, this.para[n].target)) this.target[this.para[n].target] = this.sinList[n].update()
    };
    e.setBaseVal = function (e) {
      var t = e.length;
      for (var n = 0; n < t; n++) {
        var r = e[n];
        this._list[r.target].base = r.base
      }
    };
    e._check = function (e, t) {
      var n = e.length;
      for (var r = 0; r < n; r++)
        if (e[r] == t) return !0;
      return !1
    }
  })();
  (function () {
    IKERYOU.spring = function (e, t) {
      this.target = e;
      this.para = t;
      if (this.para == undefined) return;
      var n = this.para.length;
      for (var r = 0; r < n; r++) {
        var i = this.para[r];
        i.cnt = 0;
        i.cnt2 = 0;
        i.v = 0;
        i.interval == undefined && (i.interval = 10);
        i.backCnt == undefined && (i.backCnt = 3);
        i.wait == undefined && (i.wait = 0);
        i.power == undefined && (i.power = .5);
        i.start == undefined && (i.start = this.target[i.target])
      }
    };
    var e = IKERYOU.spring.prototype;
    e.update = function () {
      var e = this.para.length;
      for (var t = 0; t < e; t++) {
        var n = this.para[t];
        if (n.cnt2 > n.wait) {
          var r = n.end;
          if (++n.cnt >= n.backCnt) {
            r = n.start;
            n.cnt >= n.backCnt + n.interval && (n.cnt = 0)
          }
          n.v += (r - this.target[n.target]) * n.power;
          this.target[n.target] += n.v *= n.power
        } else n.cnt2++
      }
    }
  })();
  (function () {
    IKERYOU.randomMove = function (e, t, n, r, i) {
      this._target = e;
      this._interval = t;
      this._isRandom = this._interval == -1;
      this._isManual = this._interval == -2;
      this._intervalMin = r;
      this._intervalMax = i;
      this._isPlaying = !1;
      this._cnt = 0;
      this._isRandom && (this._interval = iMath.random(this._intervalMin, this._intervalMax));
      this._para = n;
      var s = this._para.length;
      for (var o = 0; o < s; o++) {
        var u = this._para[o];
        u.type == undefined && (u.type = 0);
        u.ease == undefined && (u.ease = .5);
        u.inEase == undefined && (u.inEase = .5);
        u.outEase == undefined && (u.outEase = .5);
        u.outCnt == undefined && (u.outCnt = 3);
        u.startTgV == undefined && (u.startTgV = 1.2);
        u.value = this._target[u.target];
        u.cnt = 0
      }
      this.resetPara()
    };
    var e = IKERYOU.randomMove.prototype;
    e.update = function () {
      if (this._isPlaying) {
        var e = this._para.length;
        for (var t = 0; t < e; t++) {
          var n = this._para[t];
          switch (n.type) {
          case 0:
            this._target[n.target] += (n.tgValue - this._target[n.target]) * n.ease;
            if (Math.abs(n.tgValue - this._target[n.target]) < .5) {
              this.resetPara();
              return
            }
            break;
          case 1:
            if (++n.cnt < n.outCnt) this._target[n.target] += (n.tgValue2 - this._target[n.target]) * n.inEase;
            else {
              this._target[n.target] += (n.tgValue - this._target[n.target]) * n.outEase;
              if (Math.abs(n.tgValue - this._target[n.target]) < .5) {
                this.resetPara();
                return
              }
            }
          }
        }
      } else !this._isManual && ++this._cnt >= this._interval && (this._isPlaying = !0)
    };
    e.resetPara = function () {
      var e = this._para.length;
      for (var t = 0; t < e; t++) {
        var n = this._para[t],
          r = iMath.random(n.rangeMin, n.rangeMax);
        iMath.hit(2) && (r *= -1);
        switch (n.type) {
        case 0:
          n.tgValue = n.value + r;
          break;
        case 1:
          n.tgValue = n.value + r;
          n.tgValue2 = n.tgValue * n.startTgV;
          n.cnt = 0
        }
      }
      this._isPlaying = !1;
      this._cnt = 0;
      this._isRandom && (this._interval = iMath.random(this._intervalMin, this._intervalMax))
    };
    e.start = function () {
      this.resetPara();
      this._isPlaying = !0
    }
  })();
  (function () {
    IKERYOU.springShow = function (e, t) {
      this.target = e;
      this.para = t;
      if (this.para == undefined) return;
      var n = this.para.length;
      for (var r = 0; r < n; r++) {
        var i = this.para[r];
        i.cnt = 0;
        i.v = 0;
        i.end = !1;
        i.time == undefined && (i.time = 30);
        i.wait == undefined && (i.wait = 0);
        i.power == undefined && (i.power = .5)
      }
    };
    var e = IKERYOU.springShow.prototype;
    e.update = function () {
      var e = this.para.length;
      for (var t = 0; t < e; t++) {
        var n = this.para[t];
        if (!n.end && ++n.cnt > n.wait) {
          n.v += (n.val - this.target[n.target]) * n.power;
          this.target[n.target] += n.v *= n.power;
          if (n.cnt >= n.wait + n.time) {
            this.target[n.target] = n.val;
            n.end = !0
          }
        }
      }
    }
  })();
  (function () {
    IKERYOU.easingShow = function (e, t) {
      this.target = e;
      this.para = t;
      if (this.para == undefined) return;
      var n = this.para.length;
      for (var r = 0; r < n; r++) {
        var i = this.para[r];
        i.cnt = 0;
        i.end = !1;
        i.d == undefined && (i.d = .5);
        i.wait == undefined && (i.wait = 0);
        i.ease == undefined && (i.ease = .5)
      }
    };
    var e = IKERYOU.easingShow.prototype;
    e.update = function () {
      var e = this.para.length;
      for (var t = 0; t < e; t++) {
        var n = this.para[t];
        if (!n.end && ++n.cnt > n.wait) {
          this.target[n.target] += (n.val - this.target[n.target]) * n.ease;
          if (Math.abs(n.val - this.target[n.target]) < n.d) {
            this.target[n.target] = n.val;
            n.end = !0
          }
        }
      }
    };
    e.isEnd = function () {
      var e = !0,
        t = this.para.length;
      for (var n = 0; n < t; n++) {
        var r = this.para[n];
        r.end || (e = !1)
      }
      return e
    }
  })();
  this.SNCJM == undefined && (SNCJM = {});
  (function () {
    SNCJM.imgLoader = function (e, t) {
      this._list = e;
      this._num = t == undefined ? 1 : t;
      this._onComplete;
      this._onProgress;
      this.imgList = {};
      this.loadedNum = 0;
      this.loaded = !1
    };
    var e = SNCJM.imgLoader.prototype;
    e.start = function (e, t) {
      this._onComplete = e;
      this._onProgress = t;
      this._load()
    };
    e.getImg = function (e) {
      return e == undefined ? this.imgList[this._list[0].id] : this.imgList[e]
    };
    e.imgNum = function () {
      return this.imgList.length
    };
    e._load = function () {
      var e = this.loadedNum,
        t = Math.min(e + this._num, this._list.length);
      for (var n = e; n < t; n++) {
        var r = new Image,
          i = this._list[n];
        r.src = i.url;
        r.imgLoader = this;
        r.imgLoaderId = i.id;
        r.onload = function () {
          this.orgWidth = this.width;
          this.orgHeight = this.height;
          this.imgLoader._loadedImg(this.imgLoaderId)
        };
        this.imgList[i.id] = r
      }
    };
    e._loadedImg = function (e) {
      this.loadedNum++;
      this._onProgress != null && this._onProgress.target[this._onProgress.func](this.loadedNum / this._list.length);
      if (this.loadedNum >= this._list.length) {
        this.loaded = !0;
        this._onComplete != null && this._onComplete.target[this._onComplete.func]();
        return
      }
      this.loadedNum % this._num == 0 && this._load()
    }
  })();


}
