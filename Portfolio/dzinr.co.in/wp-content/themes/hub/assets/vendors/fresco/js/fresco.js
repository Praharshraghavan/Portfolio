/**
 * MODIFIED BY LIQUID THEMES
 * Fresco - A Beautiful Responsive Lightbox - v2.3.2
 * (c) 2012-2021 Nick Stakenburg
 *
 * https://github.com/staaky/fresco
 *
 * @license: https://creativecommons.org/licenses/by/4.0
 */
! function(i, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : i.Fresco = e(jQuery)
}(this, (function($) {
    function baseToString(i) {
        return "string" == typeof i ? i : null == i ? "" : i + ""
    }

    function Timers() {
        return this.initialize.apply(this, _slice.call(arguments))
    }

    function getURIData(i) {
        var e = {
            type: "image"
        };
        return $.each(Types, (function(t, s) {
            var n = s.data(i);
            n && ((e = n).type = t, e.url = i)
        })), e
    }

    function detectExtension(i) {
        var e = (i || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/);
        return e ? e[1].toLowerCase() : null
    }

    function View() {
        this.initialize.apply(this, _slice.call(arguments))
    }

    function Thumbnail() {
        this.initialize.apply(this, _slice.call(arguments))
    }
    var Fresco = {};
    $.extend(Fresco, {
        version: "2.3.2"
    }), Fresco.Skins = {
        fresco: {}
    };
    var Bounds = {
            viewport: function() {
                var i = {
                    width: $(window).width()
                };
                if (Browser.MobileSafari || Browser.Android && Browser.Gecko) {
                    var e = document.documentElement.clientWidth / window.innerWidth;
                    i.height = window.innerHeight * e
                } else i.height = $(window).height();
                return i
            }
        },
        Browser = function(i) {
            function e(e) {
                var t = new RegExp(e + "([\\d.]+)").exec(i);
                return !t || parseFloat(t[1])
            }
            return {
                IE: !(!window.attachEvent || -1 !== i.indexOf("Opera")) && e("MSIE "),
                Opera: i.indexOf("Opera") > -1 && (!!window.opera && opera.version && parseFloat(opera.version()) || 7.55),
                WebKit: i.indexOf("AppleWebKit/") > -1 && e("AppleWebKit/"),
                Gecko: i.indexOf("Gecko") > -1 && -1 === i.indexOf("KHTML") && e("rv:"),
                MobileSafari: !!i.match(/Apple.*Mobile.*Safari/),
                Chrome: i.indexOf("Chrome") > -1 && e("Chrome/"),
                ChromeMobile: i.indexOf("CrMo") > -1 && e("CrMo/"),
                Android: i.indexOf("Android") > -1 && e("Android "),
                IEMobile: i.indexOf("IEMobile") > -1 && e("IEMobile/")
            }
        }(navigator.userAgent),
        _slice = Array.prototype.slice,
        _ = {
            isElement: function(i) {
                return i && 1 === i.nodeType
            },
            String: {
                capitalize: function(i) {
                    return (i = baseToString(i)) && i.charAt(0).toUpperCase() + i.slice(1)
                }
            }
        };
    ! function() {
        function i(i) {
            var e;
            if (i && i.originalEvent && (i.originalEvent.wheelDelta ? e = i.originalEvent.wheelDelta / 120 : i.originalEvent.detail && (e = -i.originalEvent.detail / 3), e)) {
                var t = $.Event("fresco:mousewheel");
                $(i.target).trigger(t, e), t.isPropagationStopped() && i.stopPropagation(), t.isDefaultPrevented() && i.preventDefault()
            }
        }
        $(document.documentElement).on("mousewheel DOMMouseScroll", i)
    }();
    var Fit = {
        within: function(i, e, t) {
            for (var s = $.extend({
                    height: !0,
                    width: !0
                }, t || {}), n = $.extend({}, e), o = 1, a = 5, h = {
                    width: s.width,
                    height: s.height
                }; a > 0 && (h.width && n.width > i.width || h.height && n.height > i.height);) {
                var r = 1,
                    d = 1;
                h.width && n.width > i.width && (r = i.width / n.width), h.height && n.height > i.height && (d = i.height / n.height), o = Math.min(r, d), n = {
                    width: e.width * o,
                    height: e.height * o
                }, a--
            }
            return n.width = Math.max(n.width, 0), n.height = Math.max(n.height, 0), n
        }
    };
    $.extend($.easing, {
        frescoEaseInCubic: function(i, e, t, s, n) {
            return s * (e /= n) * e * e + t
        },
        frescoEaseInSine: function(i, e, t, s, n) {
            return -s * Math.cos(e / n * (Math.PI / 2)) + s + t
        },
        frescoEaseOutSine: function(i, e, t, s, n) {
            return s * Math.sin(e / n * (Math.PI / 2)) + t
        }
    });
    var Support = function() {
        function i(i) {
            return t(i, "prefix")
        }

        function e(i, e) {
            for (var t in i)
                if (void 0 !== s.style[i[t]]) return "prefix" !== e || i[t];
            return !1
        }

        function t(i, t) {
            var s = i.charAt(0).toUpperCase() + i.substr(1),
                o;
            return e((i + " " + n.join(s + " ") + s).split(" "), t)
        }
        var s = document.createElement("div"),
            n = "Webkit Moz O ms Khtml".split(" "),
            o;
        return {
            canvas: (o = document.createElement("canvas"), !(!o.getContext || !o.getContext("2d"))),
            css: {
                animation: t("animation"),
                transform: t("transform"),
                prefixed: i
            },
            svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            touch: function() {
                try {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
                } catch (i) {
                    return !1
                }
            }()
        }
    }();
    Support.detectMobileTouch = function() {
        Support.mobileTouch = Support.touch && (Browser.MobileSafari || Browser.Android || Browser.IEMobile || Browser.ChromeMobile || !/^(Win|Mac|Linux)/.test(navigator.platform))
    }, Support.detectMobileTouch();
    var ImageReady = function() {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments))
    };
    $.extend(ImageReady.prototype, {
        supports: {
            naturalWidth: "naturalWidth" in new Image
        },
        initialize: function(i, e, t, s) {
            this.img = $(i)[0], this.successCallback = e, this.errorCallback = t, this.isLoaded = !1, this.options = $.extend({
                method: "naturalWidth",
                pollFallbackAfter: 1e3
            }, s || {}), this.supports.naturalWidth && "onload" !== this.options.method ? this.img.complete && void 0 !== this.img.naturalWidth ? setTimeout(function() {
                this.img.naturalWidth > 0 ? this.success() : this.error()
            }.bind(this)) : ($(this.img).bind("error", function() {
                setTimeout(function() {
                    this.error()
                }.bind(this))
            }.bind(this)), this.intervals = [
                [1e3, 10],
                [2e3, 50],
                [4e3, 100],
                [2e4, 500]
            ], this._ipos = 0, this._time = 0, this._delay = this.intervals[this._ipos][1], this.poll()) : setTimeout(this.fallback.bind(this))
        },
        poll: function() {
            this._polling = setTimeout(function() {
                if (this.img.naturalWidth > 0) this.success();
                else {
                    if (this._time += this._delay, this.options.pollFallbackAfter && this._time >= this.options.pollFallbackAfter && !this._usedPollFallback && (this._usedPollFallback = !0, this.fallback()), this._time > this.intervals[this._ipos][0]) {
                        if (!this.intervals[this._ipos + 1]) return void this.error();
                        this._ipos++, this._delay = this.intervals[this._ipos][1]
                    }
                    this.poll()
                }
            }.bind(this), this._delay)
        },
        fallback: function() {
            var i = new Image;
            this._fallbackImg = i, i.onload = function() {
                i.onload = function() {}, this.supports.naturalWidth || (this.img.naturalWidth = i.width, this.img.naturalHeight = i.height), this.success()
            }.bind(this), i.onerror = this.error.bind(this), i.src = this.img.src
        },
        abort: function() {
            this._fallbackImg && (this._fallbackImg.onload = function() {}), this._polling && (clearTimeout(this._polling), this._polling = null)
        },
        success: function() {
            this._calledSuccess || (this._calledSuccess = !0, this.isLoaded = !0, this.successCallback(this))
        },
        error: function() {
            this._calledError || (this._calledError = !0, this.abort(), this.errorCallback && this.errorCallback(this))
        }
    }), $.extend(Timers.prototype, {
        initialize: function() {
            this._timers = {}
        },
        set: function(i, e, t) {
            this._timers[i] = setTimeout(e, t)
        },
        get: function(i) {
            return this._timers[i]
        },
        clear: function(i) {
            i ? this._timers[i] && (clearTimeout(this._timers[i]), delete this._timers[i]) : this.clearAll()
        },
        clearAll: function() {
            $.each(this._timers, (function(i, e) {
                clearTimeout(e)
            })), this._timers = {}
        }
    });
    var Type = {
            isVideo: function(i) {
                return /^(youtube|vimeo)$/.test(i)
            }
        },
        Types = {
            image: {
                extensions: "bmp gif jpeg jpg png webp",
                detect: function(i) {
                    return $.inArray(detectExtension(i), this.extensions.split(" ")) > -1
                },
                data: function(i) {
                    return !!this.detect() && {
                        extension: detectExtension(i)
                    }
                }
            },
            vimeo: {
                detect: function(i) {
                    var e = /(vimeo\.com)\/([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(i);
                    return !(!e || !e[2]) && e[2]
                },
                data: function(i) {
                    var e = this.detect(i);
                    return !!e && {
                        id: e
                    }
                }
            },
            youtube: {
                detect: function(i) {
                    var e = /(youtube\.com|youtu\.be)\/watch\?(?=.*vi?=([a-zA-Z0-9-_]+))(?:\S+)?$/.exec(i);
                    return e && e[2] ? e[2] : !(!(e = /(youtube\.com|youtu\.be)\/(vi?\/|u\/|embed\/)?([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(i)) || !e[3]) && e[3]
                },
                data: function(i) {
                    var e = this.detect(i);
                    return !!e && {
                        id: e
                    }
                }
            }
        },
        VimeoThumbnail = function() {
            var i = function() {
                return this.initialize.apply(this, _slice.call(arguments))
            };
            $.extend(i.prototype, {
                initialize: function(i, e, t) {
                    this.url = i, this.successCallback = e, this.errorCallback = t, this.load()
                },
                load: function() {
                    var i = e.get(this.url);
                    if (i) return this.successCallback(i.data.url);
                    var t = "http" + (window.location && "https:" === window.location.protocol ? "s" : "") + ":",
                        s = getURIData(this.url).id;
                    this._xhr = $.getJSON(t + "//vimeo.com/api/oembed.json?url=" + t + "//vimeo.com/" + s + "&callback=?", function(i) {
                        if (i && i.thumbnail_url) {
                            var t = {
                                url: i.thumbnail_url
                            };
                            e.set(this.url, t), this.successCallback(t.url)
                        } else this.errorCallback()
                    }.bind(this))
                },
                abort: function() {
                    this._xhr && (this._xhr.abort(), this._xhr = null)
                }
            });
            var e = {
                cache: [],
                get: function(i) {
                    for (var e = null, t = 0; t < this.cache.length; t++) this.cache[t] && this.cache[t].url === i && (e = this.cache[t]);
                    return e
                },
                set: function(i, e) {
                    this.remove(i), this.cache.push({
                        url: i,
                        data: e
                    })
                },
                remove: function(i) {
                    for (var e = 0; e < this.cache.length; e++) this.cache[e] && this.cache[e].url === i && delete this.cache[e]
                }
            };
            return i
        }(),
        VimeoReady = function() {
            var i = function() {
                return this.initialize.apply(this, _slice.call(arguments))
            };
            $.extend(i.prototype, {
                initialize: function(i, e) {
                    this.url = i, this.callback = e, this.load()
                },
                load: function() {
                    var i = e.get(this.url);
                    if (i) return this.callback(i.data);
                    var t = "http" + (window.location && "https:" === window.location.protocol ? "s" : "") + ":",
                        s = getURIData(this.url).id;
                    this._xhr = $.getJSON(t + "//vimeo.com/api/oembed.json?url=" + t + "//vimeo.com/" + s + "&maxwidth=9999999&maxheight=9999999&callback=?", function(i) {
                        var t = {
                            dimensions: {
                                width: i.width,
                                height: i.height
                            }
                        };
                        e.set(this.url, t), this.callback && this.callback(t)
                    }.bind(this))
                },
                abort: function() {
                    this._xhr && (this._xhr.abort(), this._xhr = null)
                }
            });
            var e = {
                cache: [],
                get: function(i) {
                    for (var e = null, t = 0; t < this.cache.length; t++) this.cache[t] && this.cache[t].url === i && (e = this.cache[t]);
                    return e
                },
                set: function(i, e) {
                    this.remove(i), this.cache.push({
                        url: i,
                        data: e
                    })
                },
                remove: function(i) {
                    for (var e = 0; e < this.cache.length; e++) this.cache[e] && this.cache[e].url === i && delete this.cache[e]
                }
            };
            return i
        }(),
        Options = {
            defaults: {
                effects: {
                    content: {
                        show: 0,
                        hide: 0
                    },
                    spinner: {
                        show: 150,
                        hide: 150
                    },
                    window: {
                        show: 440,
                        hide: 300
                    },
                    thumbnail: {
                        show: 300,
                        delay: 150
                    },
                    thumbnails: {
                        slide: 0
                    }
                },
                keyboard: {
                    left: !0,
                    right: !0,
                    esc: !0
                },
                loadedMethod: "naturalWidth",
                loop: !1,
                onClick: "previous-next",
                overflow: !1,
                overlay: {
                    close: !0
                },
                preload: [1, 2],
                position: !0,
                skin: "fresco",
                spinner: !0,
                spinnerDelay: 300,
                sync: !0,
                thumbnails: "horizontal",
                ui: "outside",
                uiDelay: 3e3,
                vimeo: {
                    autoplay: 1,
                    api: 1,
                    title: 1,
                    byline: 1,
                    portrait: 0,
                    loop: 0
                },
                youtube: {
                    autoplay: 1,
                    controls: 1,
                    enablejsapi: 1,
                    hd: 1,
                    iv_load_policy: 3,
                    loop: 0,
                    modestbranding: 1,
                    rel: 0,
                    vq: "hd1080"
                },
                initialTypeOptions: {
                    image: {},
                    vimeo: {
                        width: 1280
                    },
                    youtube: {
                        width: 1280,
                        height: 720
                    }
                }
            },
            create: function(i, e, t) {
                t = t || {}, (i = i || {}).skin = i.skin || this.defaults.skin;
                var s = i.skin ? $.extend({}, Fresco.Skins[i.skin] || Fresco.Skins[this.defaults.skin]) : {},
                    n = $.extend(!0, {}, this.defaults, s);
                n.initialTypeOptions && (e && n.initialTypeOptions[e] && (n = $.extend(!0, {}, n.initialTypeOptions[e], n)), delete n.initialTypeOptions);
                var o = $.extend(!0, {}, n, i);
                if (Support.mobileTouch && "inside" === o.ui && (o.ui = "outside"), (!o.effects || Browser.IE && Browser.IE < 9) && (o.effects = {}, $.each(this.defaults.effects, (function(i, e) {
                        $.each(o.effects[i] = $.extend({}, e), (function(e) {
                            o.effects[i][e] = 0
                        }))
                    })), o.spinner = !1), o.keyboard && ("boolean" == typeof o.keyboard && (o.keyboard = {}, $.each(this.defaults.keyboard, (function(i, e) {
                        o.keyboard[i] = !0
                    }))), "vimeo" !== e && "youtube" !== e || $.extend(o.keyboard, {
                        left: !1,
                        right: !1
                    })), !o.overflow || Support.mobileTouch ? o.overflow = {
                        x: !1,
                        y: !1
                    } : "boolean" == typeof o.overflow && (o.overflow = {
                        x: !1,
                        y: !0
                    }), "vimeo" !== e && "youtube" !== e || (o.overlap = !1), (Browser.IE && Browser.IE < 9 || Support.mobileTouch) && (o.thumbnail = !1, o.thumbnails = !1), "youtube" !== e && (o.width && !o.maxWidth && (o.maxWidth = o.width), o.height && !o.maxHeight && (o.maxHeight = o.height)), !o.thumbnail && "boolean" != typeof o.thumbnail) {
                    var a = !1;
                    switch (e) {
                        case "youtube":
                            var h;
                            a = "http" + (window.location && "https:" === window.location.protocol ? "s" : "") + ":" + "//img.youtube.com/vi/" + t.id + "/0.jpg";
                            break;
                        case "image":
                        case "vimeo":
                            a = !0;
                            break
                    }
                    o.thumbnail = a
                }
                return o
            }
        },
        Overlay = {
            initialize: function() {
                this.build(), this.visible = !1
            },
            build: function() {
                this.element = $("<div>").addClass("fr-overlay").hide().append($("<div>").addClass("fr-overlay-background")), this.element.on("click", function() {
                    var i = Pages.page;
                    i && i.view && i.view.options.overlay && !i.view.options.overlay.close || Window.hide()
                }.bind(this)), Support.mobileTouch && this.element.addClass("fr-mobile-touch"), this.element.on("fresco:mousewheel", (function(i) {
                    i.preventDefault()
                }))
            },
            setSkin: function(i) {
                this.skin && this.element.removeClass("fr-overlay-skin-" + this.skin), this.element.addClass("fr-overlay-skin-" + i), this.skin = i
            },
            attach: function() {
                $(document.body).append(this.element)
            },
            detach: function() {
                this.element.detach()
            },
            show: function(i, e) {
                if (this.visible) i && i();
                else {
                    this.visible = !0, this.attach(), this.max();
                    var t = Pages.page && Pages.page.view.options.effects.window.show || 0,
                        s = ("number" == typeof e ? e : t) || 0;
                    this.element.stop(!0).fadeTo(s, 1, i)
                }
            },
            hide: function(i, e) {
                if (this.visible) {
                    var t = Pages.page && Pages.page.view.options.effects.window.hide || 0,
                        s = ("number" == typeof e ? e : t) || 0;
                    this.element.stop(!0).fadeOut(s || 0, function() {
                        this.detach(), this.visible = !1, i && i()
                    }.bind(this))
                } else i && i()
            },
            getScrollDimensions: function() {
                var i = {};
                return $.each(["width", "height"], (function(e, t) {
                    var s = t.substr(0, 1).toUpperCase() + t.substr(1),
                        n = document.documentElement;
                    i[t] = (Browser.IE ? Math.max(n["offset" + s], n["scroll" + s]) : Browser.WebKit ? document.body["scroll" + s] : n["scroll" + s]) || 0
                })), i
            },
            max: function() {
                var i;
                if (Browser.MobileSafari && Browser.WebKit && Browser.WebKit < 533.18 && (i = this.getScrollDimensions(), this.element.css(i)), Browser.IE && Browser.IE < 9) {
                    var e = Bounds.viewport();
                    this.element.css({
                        height: e.height,
                        width: e.width
                    })
                }
                Support.mobileTouch && !i && this.element.css({
                    height: this.getScrollDimensions().height
                })
            }
        },
        Window = {
            initialize: function() {
                this.queues = [], this.queues.hide = $({}), this.pages = [], this._tracking = [], this._first = !0, this.timers = new Timers, this.build(), this.setSkin(Options.defaults.skin)
            },
            build: function() {
                if (this.element = $("<div>").addClass("fr-window fr-measured").hide().append(this._box = $("<div>").addClass("fr-box").append(this._pages = $("<div>").addClass("fr-pages"))).append(this._thumbnails = $("<div>").addClass("fr-thumbnails")), Overlay.initialize(), Pages.initialize(this._pages), Thumbnails.initialize(this._thumbnails), Spinner.initialize(), UI.initialize(), this.element.addClass("fr" + (Support.mobileTouch ? "" : "-no") + "-mobile-touch"), this.element.addClass("fr" + (Support.svg ? "" : "-no") + "-svg"), Browser.IE)
                    for (var i = 7; i <= 9; i++) Browser.IE < i && this.element.addClass("fr-ltIE" + i);
                this.element.on("fresco:mousewheel", (function(i) {
                    i.preventDefault()
                }))
            },
            attach: function() {
                this._attached || ($(document.body).append(this.element), this._attached = !0)
            },
            detach: function() {
                this._attached && (this.element.detach(), this._attached = !1)
            },
            setSkin: function(i) {
                this._skin && this.element.removeClass("fr-window-skin-" + this._skin), this.element.addClass("fr-window-skin-" + i), Overlay.setSkin(i), this._skin = i
            },
            setShowingType: function(i) {
                this._showingType !== i && (this._showingType && (this.element.removeClass("fr-showing-type-" + this._showingType), Type.isVideo(this._showingType) && this.element.removeClass("fr-showing-type-video")), this.element.addClass("fr-showing-type-" + i), Type.isVideo(i) && this.element.addClass("fr-showing-type-video"), this._showingType = i)
            },
            startObservingResize: function() {
                this._onWindowResizeHandler || $(window).on("resize orientationchange", this._onWindowResizeHandler = this._onWindowResize.bind(this))
            },
            stopObservingResize: function() {
                this._onWindowResizeHandler && ($(window).off("resize orientationchange", this._onWindowResizeHandler), this._onWindowResizeHandler = null)
            },
            _onScroll: function() {
                Support.mobileTouch && this.timers.set("scroll", this.adjustToScroll.bind(this), 0)
            },
            _onWindowResize: function() {
                var i;
                (i = Pages.page) && (Thumbnails.fitToViewport(), this.updateBoxDimensions(), i.fitToBox(), UI.update(), UI.adjustPrevNext(null, 0), Spinner.center(), Overlay.max(), UI._onWindowResize(), this._onScroll())
            },
            adjustToScroll: function() {
                Support.mobileTouch && this.element.css({
                    top: $(window).scrollTop()
                })
            },
            getBoxDimensions: function() {
                return this._boxDimensions
            },
            updateBoxDimensions: function() {
                var i;
                if (i = Pages.page) {
                    var e = Bounds.viewport(),
                        t = Thumbnails.getDimensions(),
                        s = "horizontal" === Thumbnails._orientation;
                    this._boxDimensions = {
                        width: s ? e.width : e.width - t.width,
                        height: s ? e.height - t.height : e.height
                    }, this._boxPosition = {
                        top: 0,
                        left: s ? 0 : t.width
                    }, this._box.css($.extend({}, this._boxDimensions, this._boxPosition))
                }
            },
            show: function(i, e) {
                if (this.visible) i && i();
                else {
                    this.visible = !0, this.opening = !0, this.attach(), this.timers.clear("show-window"), this.timers.clear("hide-overlay"), this.adjustToScroll();
                    var t = ("number" == typeof e ? e : Pages.page && Pages.page.view.options.effects.window.show) || 0,
                        s = 2;
                    Overlay[Pages.page && Pages.page.view.options.overlay ? "show" : "hide"]((function() {
                        i && --s < 1 && i()
                    }), t), this.timers.set("show-window", function() {
                        this._show(function() {
                            this.opening = !1, i && --s < 1 && i()
                        }.bind(this), t)
                    }.bind(this), t > 1 ? Math.min(.5 * t, 50) : 1)
                }
            },
            _show: function(i, e) {
                var t = ("number" == typeof e ? e : Pages.page && Pages.page.view.options.effects.window.show) || 0;
                this.element.stop(!0).fadeTo(t, 1, i)
            },
            hide: function(i) {
                if (this.view) {
                    var e = this.queues.hide;
                    e.queue([]), this.timers.clear("show-window"), this.timers.clear("hide-overlay");
                    var t = Pages.page ? Pages.page.view.options.effects.window.hide : 0;
                    e.queue(function(i) {
                        Pages.stop(), Spinner.hide(), i()
                    }.bind(this)), e.queue(function(i) {
                        UI.disable(), UI.hide(null, t), Keyboard.disable(), i()
                    }.bind(this)), e.queue(function(i) {
                        var e = 2;
                        this._hide((function() {
                            --e < 1 && i()
                        }), t), this.timers.set("hide-overlay", function() {
                            Overlay.hide((function() {
                                --e < 1 && i()
                            }), t)
                        }.bind(this), t > 1 ? Math.min(.5 * t, 150) : 1), this._first = !0
                    }.bind(this)), e.queue(function(i) {
                        this._reset(), this.stopObservingResize(), Pages.removeAll(), Thumbnails.clear(), this.timers.clear(), this._position = -1;
                        var e = Pages.page && Pages.page.view.options.afterHide;
                        "function" == typeof e && e.call(Fresco), this.view = null, this.opening = !1, this.closing = !1, this.detach(), i()
                    }.bind(this)), "function" == typeof i && e.queue(function(e) {
                        i(), e()
                    }.bind(this))
                }
            },
            _hide: function(i, e) {
                var t = ("number" == typeof e ? e : Pages.page && Pages.page.view.options.effects.window.hide) || 0;
                this.element.stop(!0).fadeOut(t, i)
            },
            load: function(i, e) {
                this.views = i, this.attach(), Thumbnails.load(i), Pages.load(i), this.startObservingResize(), e && this.setPosition(e)
            },
            setPosition: function(i, e) {
                this._position = i, this.view = this.views[i - 1], this.stopHideQueue(), this.page = Pages.show(i, function() {
                    e && e()
                }.bind(this))
            },
            stopHideQueue: function() {
                this.queues.hide.queue([])
            },
            _reset: function() {
                this.visible = !1, UI.hide(null, 0), UI.reset()
            },
            mayPrevious: function() {
                return this.view && this.view.options.loop && this.views && this.views.length > 1 || 1 !== this._position
            },
            previous: function(i) {
                var e = this.mayPrevious();
                (i || e) && this.setPosition(this.getSurroundingIndexes().previous)
            },
            mayNext: function() {
                var i = this.views && this.views.length > 1;
                return this.view && this.view.options.loop && i || i && 1 !== this.getSurroundingIndexes().next
            },
            next: function(i) {
                var e = this.mayNext();
                (i || e) && this.setPosition(this.getSurroundingIndexes().next)
            },
            getSurroundingIndexes: function() {
                if (!this.views) return {};
                var i = this._position,
                    e = this.views.length,
                    t, s;
                return {
                    previous: i <= 1 ? e : i - 1,
                    next: i >= e ? 1 : i + 1
                }
            }
        },
        Keyboard = {
            enabled: !1,
            keyCode: {
                left: 37,
                right: 39,
                esc: 27
            },
            enable: function(i) {
                this.disable(), i && ($(document).on("keydown", this._onKeyDownHandler = this.onKeyDown.bind(this)).on("keyup", this._onKeyUpHandler = this.onKeyUp.bind(this)), this.enabled = i)
            },
            disable: function() {
                this.enabled = !1, this._onKeyUpHandler && ($(document).off("keyup", this._onKeyUpHandler).off("keydown", this._onKeyDownHandler), this._onKeyUpHandler = this._onKeyDownHandler = null)
            },
            onKeyDown: function(i) {
                if (this.enabled) {
                    var e = this.getKeyByKeyCode(i.keyCode);
                    if (e && (!e || !this.enabled || this.enabled[e])) switch (i.preventDefault(), i.stopPropagation(), e) {
                        case "left":
                            Window.previous();
                            break;
                        case "right":
                            Window.next();
                            break
                    }
                }
            },
            onKeyUp: function(i) {
                if (this.enabled) {
                    var e = this.getKeyByKeyCode(i.keyCode);
                    if (e && (!e || !this.enabled || this.enabled[e])) switch (e) {
                        case "esc":
                            Window.hide();
                            break
                    }
                }
            },
            getKeyByKeyCode: function(i) {
                for (var e in this.keyCode)
                    if (this.keyCode[e] === i) return e;
                return null
            }
        },
        Page = function() {
            function i() {
                return this.initialize.apply(this, _slice.call(arguments))
            }
            var e = 0,
                t = {},
                s = $("<div>").addClass("fr-stroke fr-stroke-top fr-stroke-horizontal").append($("<div>").addClass("fr-stroke-color")).add($("<div>").addClass("fr-stroke fr-stroke-bottom fr-stroke-horizontal").append($("<div>").addClass("fr-stroke-color"))).add($("<div>").addClass("fr-stroke fr-stroke-left fr-stroke-vertical").append($("<div>").addClass("fr-stroke-color"))).add($("<div>").addClass("fr-stroke fr-stroke-right fr-stroke-vertical").append($("<div>").addClass("fr-stroke-color")));
            return $.extend(i.prototype, {
                initialize: function(i, t, s) {
                    this.view = i, this.dimensions = {
                        width: 0,
                        height: 0
                    }, this.uid = e++, this._position = t, this._total = s, this._fullClick = !1, this._visible = !1, this.queues = {}, this.queues.showhide = $({})
                },
                create: function() {
                    if (!this._created) {
                        Pages.element.append(this.element = $("<div>").addClass("fr-page").append(this.container = $("<div>").addClass("fr-container")).css({
                            opacity: 0
                        }).hide());
                        var i = this.view.options.position && this._total > 1;
                        if (i && this.element.addClass("fr-has-position"), (this.view.caption || i) && (this.element.append(this.info = $("<div>").addClass("fr-info").append($("<div>").addClass("fr-info-background")).append(s.clone(!0)).append(this.infoPadder = $("<div>").addClass("fr-info-padder"))), i && (this.element.addClass("fr-has-position"), this.infoPadder.append(this.pos = $("<div>").addClass("fr-position").append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total)))), this.view.caption && this.infoPadder.append(this.caption = $("<div>").addClass("fr-caption").html(this.view.caption))), this.container.append(this.background = $("<div>").addClass("fr-content-background")).append(this.content = $("<div>").addClass("fr-content")), "image" == this.view.type && (this.content.append(this.image = $("<img>").addClass("fr-content-element").attr({
                                src: this.view.url
                            })), this.content.append(s.clone(!0))), i && "outside" == this.view.options.ui && this.container.append(this.positionOutside = $("<div>").addClass("fr-position-outside").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total))), "inside" == this.view.options.ui) {
                            this.content.append(this.previousInside = $("<div>").addClass("fr-side fr-side-previous fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this.nextInside = $("<div>").addClass("fr-side fr-side-next fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this.closeInside = $("<div>").addClass("fr-close fr-toggle-ui").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), (this.view.caption || i && this.view.grouped.caption) && (this.content.append(this.infoInside = $("<div>").addClass("fr-info fr-toggle-ui").append($("<div>").addClass("fr-info-background")).append(s.clone(!0)).append(this.infoPadderInside = $("<div>").addClass("fr-info-padder"))), i && this.infoPadderInside.append(this.posInside = $("<div>").addClass("fr-position").append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total))), this.view.caption && this.infoPadderInside.append(this.captionInside = $("<div>").addClass("fr-caption").html(this.view.caption))), this.view.caption || !i || this.view.grouped.caption || this.content.append(this.positionInside = $("<div>").addClass("fr-position-inside fr-toggle-ui").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total)));
                            var e = this.view.options.loop && this._total > 1 || 1 != this._position,
                                t = this.view.options.loop && this._total > 1 || this._position < this._total;
                            this.previousInside[(e ? "remove" : "add") + "Class"]("fr-side-disabled"), this.nextInside[(t ? "remove" : "add") + "Class"]("fr-side-disabled")
                        }
                        $.each(["x", "y"], function(i, e) {
                            this.view.options.overflow[e] && this.element.addClass("fr-overflow-" + e)
                        }.bind(this)), this.element.addClass("fr-type-" + this.view.type), Type.isVideo(this.view.type) && this.element.addClass("fr-type-video"), this._total < 2 && this.element.addClass("fr-no-sides"), this._created = !0
                    }
                },
                _getSurroundingPages: function() {
                    var i;
                    if (!(i = this.view.options.preload)) return [];
                    for (var e = [], t = Math.max(1, this._position - i[0]), s = Math.min(this._position + i[1], this._total), n = this._position, o = n; o <= s; o++) {
                        var a;
                        (a = Pages.pages[o - 1])._position != n && e.push(a)
                    }
                    for (var o = n; o >= t; o--) {
                        var a;
                        (a = Pages.pages[o - 1])._position != n && e.push(a)
                    }
                    return e
                },
                preloadSurroundingImages: function() {
                    var i = this._getSurroundingPages();
                    $.each(i, function(i, e) {
                        e.preload()
                    }.bind(this))
                },
                preload: function() {
                    this.preloading || this.preloaded || "image" != this.view.type || !this.view.options.preload || this.loaded || (this.create(), this.preloading = !0, this.preloadReady = new ImageReady(this.image[0], function(i) {
                        this.loaded = !0, t[this.view.url] = !0, this.preloading = !1, this.preloaded = !0, this.dimensions = {
                            width: i.img.naturalWidth,
                            height: i.img.naturalHeight
                        }
                    }.bind(this), null, {
                        method: "naturalWidth"
                    }))
                },
                load: function(i, e) {
                    if (this.create(), this.loaded) i && i();
                    else switch (this.abort(), this.loading = !0, this.view.options.spinner && (this._spinnerDelay = setTimeout(function() {
                        Spinner.show()
                    }.bind(this), this.view.options.spinnerDelay || 0)), this.view.type) {
                        case "image":
                            if (this.error) return void(i && i());
                            this.imageReady = new ImageReady(this.image[0], function(e) {
                                this._markAsLoaded(), this.setDimensions({
                                    width: e.img.naturalWidth,
                                    height: e.img.naturalHeight
                                }), i && i()
                            }.bind(this), function() {
                                this._markAsLoaded(), this.image.hide(), this.content.prepend(this.error = $("<div>").addClass("fr-error fr-content-element").append($("<div>").addClass("fr-error-icon"))), this.element.addClass("fr-has-error"), this.setDimensions({
                                    width: this.error.outerWidth(),
                                    height: this.error.outerHeight()
                                }), this.error.css({
                                    width: "100%",
                                    height: "100%"
                                }), i && i()
                            }.bind(this), {
                                method: this.view.options.loadedMethod
                            });
                            break;
                        case "vimeo":
                            this.vimeoReady = new VimeoReady(this.view.url, function(e) {
                                this._markAsLoaded(), this.setDimensions({
                                    width: e.dimensions.width,
                                    height: e.dimensions.height
                                }), i && i()
                            }.bind(this));
                            break;
                        case "youtube":
                            this._markAsLoaded(), this.setDimensions({
                                width: this.view.options.width,
                                height: this.view.options.height
                            }), i && i();
                            break
                    }
                },
                setDimensions: function(i) {
                    if (this.dimensions = i, this.view.options.maxWidth || this.view.options.maxHeight) {
                        var e = this.view.options,
                            t = {
                                width: e.maxWidth ? e.maxWidth : this.dimensions.width,
                                height: e.maxHeight ? e.maxHeight : this.dimensions.height
                            };
                        this.dimensions = Fit.within(t, this.dimensions)
                    }
                },
                _markAsLoaded: function() {
                    this._abortSpinnerDelay(), this.loading = !1, this.loaded = !0, t[this.view.url] = !0, Spinner.hide(null, null, this._position)
                },
                isVideo: function() {
                    return Type.isVideo(this.view.type)
                },
                insertVideo: function(i) {
                    if (!this.playerIframe && this.isVideo()) {
                        var e = "http" + (window.location && "https:" === window.location.protocol ? "s" : "") + ":",
                            t = $.extend({}, this.view.options[this.view.type] || {}),
                            s = $.param(t),
                            n, o = {
                                vimeo: e + "//player.vimeo.com/video/{id}?{queryString}",
                                youtube: e + "//www.youtube.com/embed/{id}?{queryString}"
                            }[this.view.type].replace("{id}", this.view._data.id).replace("{queryString}", s);
                        this.content.prepend(this.playerIframe = $("<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen>").addClass("fr-content-element").attr({
                            src: o,
                            height: this._contentDimensions.height,
                            width: this._contentDimensions.width,
                            frameborder: 0
                        })), i && i()
                    } else i && i()
                },
                raise: function() {
                    var i = Pages.element[0].lastChild;
                    i && i === this.element[0] || Pages.element.append(this.element)
                },
                show: function(i) {
                    var e = this.queues.showhide;
                    e.queue([]), e.queue(function(i) {
                        var e = this.view.options.spinner && !t[this.view.url];
                        Spinner._visible && !e && Spinner.hide(), Pages.stopInactive(), i()
                    }.bind(this)), e.queue(function(i) {
                        this.updateUI(), UI.set(this._ui), i()
                    }.bind(this)), e.queue(function(i) {
                        Keyboard.enable(this.view.options.keyboard), i()
                    }.bind(this)), e.queue(function(i) {
                        Spinner.setSkin(this.view.options.skin), this.load(function() {
                            this.preloadSurroundingImages(), i()
                        }.bind(this))
                    }.bind(this)), e.queue(function(i) {
                        this.raise(), Window.setSkin(this.view.options.skin), UI.enable(), this.fitToBox(), Window.adjustToScroll(), i()
                    }.bind(this)), this.isVideo() && e.queue(function(i) {
                        this.insertVideo((function() {
                            i()
                        }))
                    }.bind(this)), this.view.options.sync || e.queue(function(i) {
                        Pages.hideInactive(i)
                    }.bind(this)), e.queue(function(i) {
                        var e = 3,
                            t = this.view.options.effects.content.show;
                        Window.setShowingType(this.view.type), Window.visible || (t = this.view.options.effects.window.show, "function" == typeof this.view.options.onShow && this.view.options.onShow.call(Fresco)), this.view.options.sync && (e++, Pages.hideInactive((function() {
                            --e < 1 && i()
                        }))), Window.show((function() {
                            --e < 1 && i()
                        }), this.view.options.effects.window.show), this._show((function() {
                            --e < 1 && i()
                        }), t), UI.adjustPrevNext((function() {
                            --e < 1 && i()
                        }), Window._first ? 0 : t), Window._first ? (UI.show(null, 0), Window._first = !1) : UI.show(null, 0);
                        var s = this.view.options.afterPosition;
                        "function" == typeof s && s.call(Fresco, this._position)
                    }.bind(this)), e.queue(function(e) {
                        this._visible = !0, i && i(), e()
                    }.bind(this))
                },
                _show: function(i, e) {
                    var t = Window.visible ? "number" == typeof e ? e : this.view.options.effects.content.show : 0;
                    this.element.stop(!0).show().fadeTo(t || 0, 1, i)
                },
                hide: function(i, e) {
                    if (this.element) {
                        this.removeVideo(), this.abort();
                        var t = "number" == typeof e ? e : this.view.options.effects.content.hide;
                        this.isVideo() && (t = 0), this.element.stop(!0).fadeTo(t, 0, "frescoEaseInCubic", function() {
                            this.element.hide(), this._visible = !1, Pages.removeTracking(this._position), i && i()
                        }.bind(this))
                    } else i && i()
                },
                stop: function() {
                    var i;
                    this.queues.showhide.queue([]), this.element && this.element.stop(!0), this.abort()
                },
                removeVideo: function() {
                    this.playerIframe && (this.playerIframe[0].src = "//about:blank", this.playerIframe.remove(), this.playerIframe = null)
                },
                remove: function() {
                    this.stop(), this.removeVideo(), this.element && this.element.remove(), this._track && (Pages.removeTracking(this._position), this._track = !1), this.preloadReady && (this.preloadReady.abort(), this.preloadReady = null, this.preloading = null, this.preloaded = null), this._visible = !1, this.removed = !0
                },
                abort: function() {
                    this.imageReady && (this.imageReady.abort(), this.imageReady = null), this.vimeoReady && (this.vimeoReady.abort(), this.vimeoReady = null), this._abortSpinnerDelay(), this.loading = !1
                },
                _abortSpinnerDelay: function() {
                    this._spinnerDelay && (clearTimeout(this._spinnerDelay), this._spinnerDelay = null)
                },
                _getInfoHeight: function(i) {
                    var e = this.view.options.position && this._total > 1;
                    switch (this._ui) {
                        case "fullclick":
                        case "inside":
                            if (!this.view.caption && !e) return 0;
                            break;
                        case "outside":
                            if (!this.view.caption) return 0;
                            break
                    }
                    var t = "inside" === this._ui ? this.infoInside : this.info;
                    "outside" === this._ui && (i = Math.min(i, Window._boxDimensions.width));
                    var s, n = t[0].style.width;
                    return "inside" !== this._ui && "fullclick" !== this._ui || (n = "100%"), t.css({
                        width: i + "px"
                    }), s = parseFloat(t.outerHeight()), t.css({
                        width: n
                    }), s
                },
                _whileVisible: function(i, e) {
                    var t = [],
                        s = Window.element.add(this.element);
                    e && (s = s.add(e)), $.each(s, (function(i, e) {
                        var s;
                        $(e).is(":visible") || t.push($(e).show())
                    }));
                    var n = this.element.hasClass("fr-no-caption");
                    this.element.removeClass("fr-no-caption");
                    var o = this.element.hasClass("fr-has-caption");
                    this.element.addClass("fr-has-caption"), Window.element.css({
                        visibility: "hidden"
                    }), i(), Window.element.css({
                        visibility: "visible"
                    }), n && this.element.addClass("fr-no-caption"), o || this.element.removeClass("fr-has-caption"), $.each(t, (function(i, e) {
                        e.hide()
                    }))
                },
                updateForced: function() {
                    this.create(), this._fullClick = this.view.options.fullClick, this._noOverflow = !1, parseInt(this.element.css("min-width")) > 0 && (this._fullClick = !0), parseInt(this.element.css("min-height")) > 0 && (this._noOverflow = !0)
                },
                updateUI: function() {
                    this.updateForced();
                    var i = this._fullClick ? "fullclick" : this.view.options.ui;
                    this._ui && this.element.removeClass("fr-ui-" + this._ui), this.element.addClass("fr-ui-" + i), this._ui = i
                },
                fitToBox: function() {
                    if (this.content) {
                        var i = this.element,
                            e = $.extend({}, Window.getBoxDimensions()),
                            t = $.extend({}, this.dimensions),
                            s = this.container;
                        this.updateUI();
                        var n = {
                            left: parseInt(s.css("padding-left")),
                            top: parseInt(s.css("padding-top"))
                        };
                        if ("outside" === this._ui && this._positionOutside) {
                            var o = 0;
                            this._whileVisible(function() {
                                this._positionOutside.is(":visible") && (o = this._positionOutside.outerWidth(!0))
                            }.bind(this)), o > n.left && (n.left = o)
                        }
                        e.width -= 2 * n.left, e.height -= 2 * n.top;
                        var a = {
                                width: !0,
                                height: !!this._noOverflow || !this.view.options.overflow.y
                            },
                            h = Fit.within(e, t, a),
                            r = $.extend({}, h),
                            d = this.content,
                            l = 0,
                            u, c = "inside" === this._ui,
                            f = c ? this.infoInside : this.info,
                            p = c ? this.captionInside : this.caption,
                            v = c ? this.posInside : this.pos,
                            m = !!p,
                            g;
                        switch (this._ui) {
                            case "outside":
                                var _ = $.extend({}, r);
                                this.caption && (g = this.caption, this._whileVisible(function() {
                                    for (var i = 0, t = 2; i < 2;) {
                                        l = this._getInfoHeight(r.width);
                                        var s = e.height - r.height;
                                        s < l && (r = Fit.within({
                                            width: r.width,
                                            height: Math.max(r.height - (l - s), 0)
                                        }, r, a)), i++
                                    }
                                    l = this._getInfoHeight(r.width);
                                    var n = .5;
                                    (!this.view.options.overflow.y && l + r.height > e.height || f && "none" === f.css("display") || l >= n * r.height) && (m = !1, l = 0, r = _)
                                }.bind(this), g)), f && f.css({
                                    width: r.width + "px"
                                }), u = {
                                    width: r.width,
                                    height: r.height + l
                                };
                                break;
                            case "inside":
                                this.caption && (g = p, this._whileVisible(function() {
                                    var i = .45;
                                    (l = this._getInfoHeight(r.width)) >= i * r.height && (m = !1, l = 0)
                                }.bind(this), g)), u = r;
                                break;
                            case "fullclick":
                                var b = [];
                                p && b.push(p), this._whileVisible(function() {
                                    if ((p || v) && f.css({
                                            width: "100%"
                                        }), l = this._getInfoHeight(Window._boxDimensions.width), p && l > .5 * e.height)
                                        if (m = !1, v) {
                                            var i = this.caption.is(":visible");
                                            this.caption.hide(), l = this._getInfoHeight(Window._boxDimensions.width), i && this.caption.show()
                                        } else l = 0;
                                    r = Fit.within({
                                        width: e.width,
                                        height: Math.max(0, e.height - l)
                                    }, r, a), u = r
                                }.bind(this), b), this.content.css({
                                    "padding-bottom": 0
                                });
                                break
                        }
                        p && p[m ? "show" : "hide"](), this.element[(m ? "remove" : "add") + "Class"]("fr-no-caption"), this.element[(m ? "add" : "remove") + "Class"]("fr-has-caption"), this.content.css(r), this.background.css(u), this.playerIframe && this.playerIframe.attr(r), this.overlap = {
                            y: u.height + ("fullclick" === this._ui ? l : 0) - Window._boxDimensions.height,
                            x: 0
                        }, this._track = !this._noOverflow && this.view.options.overflow.y && this.overlap.y > 0, this._infoHeight = l, this._padding = n, this._contentDimensions = r, this._backgroundDimensions = u, Pages[(this._track ? "set" : "remove") + "Tracking"](this._position), this.position()
                    }
                },
                position: function() {
                    if (this.content) {
                        var i = this._contentDimensions,
                            e = this._backgroundDimensions,
                            t = {
                                top: .5 * Window._boxDimensions.height - .5 * e.height,
                                left: .5 * Window._boxDimensions.width - .5 * e.width
                            },
                            s = {
                                top: t.top + i.height,
                                left: t.left
                            },
                            n = 0,
                            o = "inside" === this._ui ? this.infoInside : this.info;
                        switch (this._ui) {
                            case "fullclick":
                                t.top = .5 * (Window._boxDimensions.height - this._infoHeight) - .5 * e.height, s = {
                                    top: Window._boxDimensions.height - this._infoHeight,
                                    left: 0,
                                    bottom: "auto"
                                }, n = this._infoHeight;
                                break;
                            case "inside":
                                s = {
                                    top: "auto",
                                    left: 0,
                                    bottom: 0
                                };
                                break
                        }
                        if (this.overlap.y > 0) {
                            var a = Pages.getXYP();
                            switch (t.top = 0 - a.y * this.overlap.y, this._ui) {
                                case "outside":
                                case "fullclick":
                                    s.top = Window._boxDimensions.height - this._infoHeight;
                                    break;
                                case "inside":
                                    var h = t.top + i.height - Window._boxDimensions.height,
                                        r = -1 * t.top;
                                    if (s.bottom = h, this.closeInside.css({
                                            top: r
                                        }), this._total > 1) {
                                        var d = Window.element.is(":visible");
                                        d || Window.element.show();
                                        var l = this.previousInside.attr("style");
                                        this.previousInside.removeAttr("style");
                                        var u = parseInt(this.previousInside.css("margin-top"));
                                        this.previousInside.attr({
                                            style: l
                                        }), d || Window.element.hide();
                                        var c = this.previousInside.add(this.nextInside),
                                            f = .5 * this.overlap.y;
                                        c.css({
                                            "margin-top": u + (r - f)
                                        }), this.positionInside && this.positionInside.css({
                                            bottom: h
                                        })
                                    }
                                    break
                            }
                        } else "inside" === this._ui && this.element.find(".fr-info, .fr-side, .fr-close, .fr-position-inside").removeAttr("style");
                        o && o.css(s), this.container.css({
                            bottom: n
                        }), this.content.css(t), this.background.css(t)
                    }
                }
            }), i
        }(),
        Pages = {
            initialize: function(i) {
                this.element = i, this.pages = [], this.uid = 1, this._tracking = []
            },
            load: function(i) {
                this.views = i, this.removeAll(), $.each(i, function(i, e) {
                    this.pages.push(new Page(e, i + 1, this.views.length))
                }.bind(this))
            },
            show: function(i, e) {
                var t = this.pages[i - 1];
                this.page && this.page.uid === t.uid || (this.page = t, Thumbnails.show(i), Window.updateBoxDimensions(), t.show(function() {
                    e && e()
                }.bind(this)))
            },
            getPositionInActivePageGroup: function(i) {
                var e = 0;
                return $.each(this.pages, (function(t, s) {
                    s.view.element && s.view.element === i && (e = t + 1)
                })), e
            },
            getLoadingCount: function() {
                var i = 0;
                return $.each(this.pages, (function(e, t) {
                    t.loading && i++
                })), i
            },
            removeAll: function() {
                $.each(this.pages, (function(i, e) {
                    e.remove()
                })), this.pages = []
            },
            hideInactive: function(i, e) {
                var t = [];
                $.each(this.pages, function(i, e) {
                    e.uid !== this.page.uid && t.push(e)
                }.bind(this));
                var s = 0 + t.length;
                return s < 1 ? i && i() : $.each(t, (function(t, n) {
                    n.hide((function() {
                        i && --s < 1 && i()
                    }), e)
                })), t.length
            },
            stopInactive: function() {
                $.each(this.pages, function(i, e) {
                    e.uid !== this.page.uid && e.stop()
                }.bind(this))
            },
            stop: function() {
                $.each(this.pages, (function(i, e) {
                    e.stop()
                }))
            },
            handleTracking: function(i) {
                Browser.IE && Browser.IE < 9 ? (this.setXY({
                    x: i.pageX,
                    y: i.pageY
                }), this.updatePositions()) : this._tracking_timer = setTimeout(function() {
                    this.setXY({
                        x: i.pageX,
                        y: i.pageY
                    }), this.updatePositions()
                }.bind(this), 30)
            },
            clearTrackingTimer: function() {
                this._tracking_timer && (clearTimeout(this._tracking_timer), this._tracking_timer = null)
            },
            startTracking: function() {
                Support.mobileTouch || this._handleTracking || $(document.documentElement).on("mousemove", this._handleTracking = this.handleTracking.bind(this))
            },
            stopTracking: function() {
                !Support.mobileTouch && this._handleTracking && ($(document.documentElement).off("mousemove", this._handleTracking), this._handleTracking = null, this.clearTrackingTimer())
            },
            setTracking: function(i) {
                this.isTracking(i) || (this._tracking.push(this.pages[i - 1]), 1 === this._tracking.length && this.startTracking())
            },
            clearTracking: function() {
                this._tracking = []
            },
            removeTracking: function(i) {
                this._tracking = $.grep(this._tracking, (function(e) {
                    return e._position !== i
                })), this._tracking.length < 1 && this.stopTracking()
            },
            isTracking: function(i) {
                var e = !1;
                return $.each(this._tracking, (function(t, s) {
                    if (s._position === i) return e = !0, !1
                })), e
            },
            setXY: function(i) {
                this._xy = i
            },
            getXYP: function() {
                var i = Pages.page,
                    e = $.extend({}, Window._boxDimensions),
                    t = $.extend({}, this._xy);
                t.y -= $(window).scrollTop(), i && ("outside" === i._ui || "fullclick" === i._ui) && i._infoHeight > 0 && (e.height -= i._infoHeight), t.y -= Window._boxPosition.top;
                var s = {
                        x: 0,
                        y: Math.min(Math.max(t.y / e.height, 0), 1)
                    },
                    n = 20,
                    o = {
                        x: "width",
                        y: "height"
                    },
                    a = {};
                return $.each("y".split(" "), function(i, t) {
                    a[t] = Math.min(Math.max(n / e[o[t]], 0), 1), s[t] *= 1 + 2 * a[t], s[t] -= a[t], s[t] = Math.min(Math.max(s[t], 0), 1)
                }.bind(this)), this.setXYP(s), this._xyp
            },
            setXYP: function(i) {
                this._xyp = i
            },
            updatePositions: function() {
                this._tracking.length < 1 || $.each(this._tracking, (function(i, e) {
                    e.position()
                }))
            }
        };
    $.extend(View.prototype, {
        initialize: function(object, argument_1) {
            var options = argument_1 || {},
                data = {};
            if ("string" == typeof object) object = {
                url: object
            };
            else if (object && 1 === object.nodeType) {
                var element = $(object);
                object = {
                    element: element[0],
                    url: element.attr("href"),
                    caption: element.attr("data-fresco-caption"),
                    group: element.attr("data-fresco-group"),
                    extension: element.attr("data-fresco-extension"),
                    type: element.attr("data-fresco-type"),
                    options: element.attr("data-fresco-options") && eval("({" + element.attr("data-fresco-options") + "})") || {}
                }
            }
            return object && (object.extension || (object.extension = detectExtension(object.url)), object.type || (data = getURIData(object.url), object._data = data, object.type = data.type)), object._data || (object._data = getURIData(object.url)), object && object.options ? object.options = $.extend(!0, $.extend({}, options), $.extend({}, object.options)) : object.options = $.extend({}, options), object.options = Options.create(object.options, object.type, object._data), $.extend(this, object), this
        }
    });
    var Spinner = {
            supported: Support.css.transform && Support.css.animation,
            initialize: function(i) {
                this.element = $("<div>").addClass("fr-spinner").hide();
                for (var e = 1; e <= 12; e++) this.element.append($("<div>").addClass("fr-spin-" + e));
                this.element.on("click", function() {
                    Window.hide()
                }.bind(this)), this.element.on("fresco:mousewheel", (function(i) {
                    i.preventDefault()
                }))
            },
            setSkin: function(i) {
                this.supported && (this._skin && this.element.removeClass("fr-spinner-skin-" + this._skin), this.updateDimensions(), this.element.addClass("fr-spinner-skin-" + i), this._skin = i)
            },
            updateDimensions: function() {
                var i = this._attached;
                i || this.attach(), this._dimensions = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, i || this.detach()
            },
            attach: function() {
                this._attached || ($(document.body).append(this.element), this._attached = !0)
            },
            detach: function() {
                this._attached && (this.element.detach(), this._attached = !1)
            },
            show: function(i, e) {
                this._visible = !0, this.attach(), this.center();
                var t = Pages.page && Pages.page.view.options.effects.spinner.show || 0,
                    s = ("number" == typeof e ? e : t) || 0;
                this.element.stop(!0).fadeTo(s, 1, i)
            },
            hide: function(i, e, t) {
                this._visible = !1;
                var s = Pages.page && Pages.page.view.options.effects.spinner.hide || 0,
                    n = ("number" == typeof e ? e : s) || 0;
                this.element.stop(!0).fadeOut(n || 0, function() {
                    this.detach(), i && i()
                }.bind(this))
            },
            center: function() {
                if (this.supported) {
                    this._dimensions || this.updateDimensions();
                    var i = Pages.page,
                        e = 0;
                    i && "fullclick" === i._ui && i._whileVisible((function() {
                        e = i._getInfoHeight(Window._boxDimensions.width)
                    })), this.element.css({
                        top: Window._boxPosition.top + .5 * Window._boxDimensions.height - .5 * this._dimensions.height - .5 * e,
                        left: Window._boxPosition.left + .5 * Window._boxDimensions.width - .5 * this._dimensions.width
                    })
                }
            }
        },
        _Fresco = {
            _disabled: !1,
            _fallback: !0,
            initialize: function() {
                Window.initialize(), this._disabled || this.startDelegating()
            },
            startDelegating: function() {
                this._delegateHandler || $(document.documentElement).on("click", ".fresco[href]", this._delegateHandler = this.delegate.bind(this)).on("click", this._setClickXYHandler = this.setClickXY.bind(this))
            },
            stopDelegating: function() {
                this._delegateHandler && ($(document.documentElement).off("click", ".fresco[href]", this._delegateHandler).off("click", this._setClickXYHandler), this._setClickXYHandler = null, this._delegateHandler = null)
            },
            setClickXY: function(i) {
                Pages.setXY({
                    x: i.pageX,
                    y: i.pageY
                })
            },
            delegate: function(i) {
                if (!this._disabled) {
                    i.stopPropagation(), i.preventDefault();
                    var e = i.currentTarget;
                    this.setClickXY(i), _Fresco.show(e)
                }
            },
            show: function(object, argument_1, argument_2) {
                if (this._disabled) this.showFallback.apply(_Fresco, _slice.call(arguments));
                else {
                    var options = argument_1 || {},
                        position = argument_2;
                    argument_1 && "number" == typeof argument_1 && (position = argument_1, options = {});
                    var views = [],
                        object_type, isElement = _.isElement(object);
                    switch (object_type = typeof object) {
                        case "string":
                        case "object":
                            var view = new View(object, options),
                                _dgo = "data-fresco-group-options",
                                groupOptions = {};
                            if (view.group) {
                                if (isElement) {
                                    var elements = $('.fresco[data-fresco-group="' + $(object).attr("data-fresco-group") + '"]');
                                    elements.filter("[" + _dgo + "]").each((function(i, element) {
                                        $.extend(groupOptions, eval("({" + ($(element).attr(_dgo) || "") + "})"))
                                    })), elements.each((function(i, e) {
                                        position || e !== object || (position = i + 1), views.push(new View(e, $.extend({}, groupOptions, options)))
                                    }))
                                }
                            } else isElement && $(object).is("[" + _dgo + "]") && ($.extend(groupOptions, eval("({" + ($(object).attr(_dgo) || "") + "})")), view = new View(object, $.extend({}, groupOptions, options))), views.push(view);
                            break;
                        case "array":
                            $.each(object, (function(i, e) {
                                var t = new View(e, options);
                                views.push(t)
                            }));
                            break
                    }
                    var groupExtend = {
                            grouped: {
                                caption: !1
                            }
                        },
                        firstUI = views[0].options.ui,
                        positionInAPG;
                    $.each(views, (function(i, e) {
                        e.caption && (groupExtend.grouped.caption = !0), i > 0 && e.options.ui !== firstUI && (e.options.ui = firstUI)
                    })), $.each(views, (function(i, e) {
                        e = $.extend(e, groupExtend)
                    })), (!position || position < 1) && (position = 1), position > views.length && (position = views.length), isElement && (positionInAPG = Pages.getPositionInActivePageGroup(object)) ? Window.setPosition(positionInAPG) : Window.load(views, position)
                }
            },
            showFallback: function() {
                function i(e) {
                    var t, s = typeof e;
                    return t = "string" === s ? e : "array" === s && e[0] ? i(e[0]) : _.isElement(e) && $(e).attr("href") ? $(e).attr("href") : !!e.url && e.url
                }
                return function(e) {
                    if (this._fallback) {
                        var t = i(e);
                        t && (window.location.href = t)
                    }
                }
            }()
        };
    $.extend(Fresco, {
        show: function(i) {
            return _Fresco.show.apply(_Fresco, _slice.call(arguments)), this
        },
        hide: function() {
            return Window.hide(), this
        },
        disable: function() {
            return _Fresco.stopDelegating(), _Fresco._disabled = !0, this
        },
        enable: function() {
            return _Fresco._disabled = !1, _Fresco.startDelegating(), this
        },
        fallback: function(i) {
            return _Fresco._fallback = i, this
        },
        setDefaultSkin: function(i) {
            return Options.defaults.skin = i, this
        }
    }), (Browser.IE && Browser.IE < 7 || "number" == typeof Browser.Android && Browser.Android < 3 || Browser.MobileSafari && "number" == typeof Browser.WebKit && Browser.WebKit < 533.18) && (_Fresco.show = _Fresco.showFallback);
    var Thumbnails = {
        initialize: function(i) {
            this.element = i, this._thumbnails = [], this._orientation = "vertical", this._vars = {
                thumbnail: {},
                thumbnailFrame: {},
                thumbnails: {}
            }, this.build(), this.startObserving()
        },
        build: function() {
            this.element.append(this.wrapper = $("<div>").addClass("fr-thumbnails-wrapper").append(this._slider = $("<div>").addClass("fr-thumbnails-slider").append(this._previous = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-previous").append(this._previous_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon")))).append(this._thumbs = $("<div>").addClass("fr-thumbnails-thumbs").append(this._slide = $("<div>").addClass("fr-thumbnails-slide"))).append(this._next = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-next").append(this._next_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon"))))))
        },
        startObserving: function() {
            this._slider.delegate(".fr-thumbnail", "click", function(i) {
                i.stopPropagation();
                var e = $(i.target).closest(".fr-thumbnail")[0],
                    t = e && $(e).data("fr-position");
                t && (this.setActive(t), Window.setPosition(t))
            }.bind(this)), this._slider.bind("click", (function(i) {
                i.stopPropagation()
            })), this._previous.bind("click", this.previousPage.bind(this)), this._next.bind("click", this.nextPage.bind(this))
        },
        load: function(i) {
            this.clear();
            var e = "horizontal",
                t = !1;
            $.each(i, function(i, s) {
                "vertical" === s.options.thumbnails && (e = "vertical"), s.options.thumbnails || (t = !0)
            }.bind(this)), this.setOrientation(e), this._disabledGroup = t, $.each(i, function(i, e) {
                this._thumbnails.push(new Thumbnail(e, i + 1))
            }.bind(this)), this.fitToViewport()
        },
        clear: function() {
            $.each(this._thumbnails, (function(i, e) {
                e.remove()
            })), this._thumbnails = [], this._position = -1, this._page = -1
        },
        setOrientation: function(i) {
            this._orientation && Window.element.removeClass("fr-thumbnails-" + this._orientation), Window.element.addClass("fr-thumbnails-" + i), this._orientation = i
        },
        disable: function() {
            Window.element.removeClass("fr-thumbnails-enabled").addClass("fr-thumbnails-disabled"), this._disabled = !0
        },
        enable: function() {
            Window.element.removeClass("fr-thumbnails-disabled").addClass("fr-thumbnails-enabled"), this._disabled = !1
        },
        enabled: function() {
            return !this._disabled
        },
        disabled: function() {
            return this._disabled
        },
        updateVars: function() {
            var i = Window.element,
                e = this._vars,
                t, s = "horizontal" === this._orientation,
                n = s ? "top" : "left",
                o = s ? "left" : "top",
                a = s ? "bottom" : "left",
                h = s ? "top" : "right",
                r = s ? "width" : "height",
                d = s ? "height" : "width",
                l = {
                    left: "right",
                    right: "left",
                    top: "bottom",
                    bottom: "top"
                };
            this.element.removeClass("fr-thumbnails-measured");
            var u = i.is(":visible");
            if (u || i.show(), this.disabled() && this.enable(), !this.element.is(":visible") || this._thumbnails.length < 2 || this._disabledGroup) return this.disable(), $.extend(this._vars.thumbnails, {
                width: 0,
                height: 0
            }), u || i.hide(), void this.element.addClass("fr-thumbnails-measured");
            this.enable();
            var c = this._previous,
                f = this._next,
                p = Bounds.viewport(),
                v = this.element["inner" + _.String.capitalize(d)](),
                m = parseInt(this._thumbs.css("padding-" + n)) || 0,
                g = Math.max(v - 2 * m, 0),
                b = parseInt(this._thumbs.css("padding-" + o)) || 0,
                w = (parseInt(this.element.css("margin-" + a)) || 0) + (parseInt(this.element.css("margin-" + h)) || 0);
            $.extend(e.thumbnails, {
                height: v + w,
                width: p[s ? "width" : "height"],
                paddingTop: m
            }), $.extend(e.thumbnail, {
                height: g,
                width: g
            }), $.extend(e.thumbnailFrame, {
                width: g + 2 * b,
                height: v
            }), e.sides = {
                previous: {
                    width: f["inner" + _.String.capitalize(r)](),
                    marginLeft: parseInt(c.css("margin-" + o)) || 0,
                    marginRight: parseInt(c.css("margin-" + l[o])) || 0
                },
                next: {
                    width: f["inner" + _.String.capitalize(r)](),
                    marginLeft: parseInt(f.css("margin-" + o)) || 0,
                    marginRight: parseInt(f.css("margin-" + l[o])) || 0
                }
            };
            var y = p[r],
                k = e.thumbnailFrame.width,
                x = this._thumbnails.length;
            e.thumbnails.width = y, e.sides.enabled = x * k / y > 1;
            var C = y,
                S = e.sides,
                W = S.previous,
                M = S.next,
                T = W.marginLeft + W.width + W.marginRight + M.marginLeft + M.width + M.marginRight;
            e.sides.enabled && (C -= T);
            var I = x * k;
            I < (C = Math.floor(C / k) * k) && (C = I);
            var P = C + (e.sides.enabled ? T : 0);
            e.ipp = Math.round(C / k), this._mode = "page", e.ipp <= 1 && (C = y, P = y, e.sides.enabled = !1, this._mode = "center"), e.pages = Math.ceil(x * k / C), e.wrapper = {
                width: P + 1,
                height: v
            }, e.thumbs = {
                width: C,
                height: v
            }, e.slide = {
                width: x * k + 1,
                height: v
            }, u || i.hide(), this.element.addClass("fr-thumbnails-measured")
        },
        hide: function() {
            this.disable(), this.thumbnails.hide(), this._visible = !1
        },
        getDimensions: function() {
            var i = "horizontal" === this._orientation;
            return {
                width: i ? this._vars.thumbnails.width : this._vars.thumbnails.height,
                height: i ? this._vars.thumbnails.height : this._vars.thumbnails.width
            }
        },
        fitToViewport: function() {
            if (this.updateVars(), !this.disabled()) {
                var i = $.extend({}, this._vars),
                    e = "horizontal" === this._orientation;
                $.each(this._thumbnails, (function(i, e) {
                    e.resize()
                })), this._previous[i.sides.enabled ? "show" : "hide"](), this._next[i.sides.enabled ? "show" : "hide"](), this._thumbs.css({
                    width: i.thumbs[e ? "width" : "height"],
                    height: i.thumbs[e ? "height" : "width"]
                }), this._slide.css({
                    width: i.slide[e ? "width" : "height"],
                    height: i.slide[e ? "height" : "width"]
                });
                var t = {
                    width: i.wrapper[e ? "width" : "height"],
                    height: i.wrapper[e ? "height" : "width"]
                };
                t["margin-" + (e ? "left" : "top")] = Math.round(-.5 * i.wrapper.width) + "px", t["margin-" + (e ? "top" : "left")] = 0, this.wrapper.css(t), this._position && this.moveTo(this._position, !0)
            }
        },
        moveToPage: function(i) {
            if (!(i < 1 || i > this._vars.pages || i === this._page)) {
                var e = this._vars.ipp * (i - 1) + 1;
                this.moveTo(e)
            }
        },
        previousPage: function() {
            this.moveToPage(this._page - 1)
        },
        nextPage: function() {
            this.moveToPage(this._page + 1)
        },
        show: function(i) {
            var e = this._position < 0;
            i < 1 && (i = 1);
            var t = this._thumbnails.length;
            i > t && (i = t), this._position = i, this.setActive(i), "page" === this._mode && this._page === Math.ceil(i / this._vars.ipp) || this.moveTo(i, e)
        },
        moveTo: function(i, e) {
            if (this.updateVars(), !this.disabled()) {
                var t, s = "horizontal" === this._orientation,
                    n, o = .5 * Bounds.viewport()[s ? "width" : "height"],
                    a = this._vars.thumbnailFrame.width,
                    h;
                if ("page" === this._mode) {
                    h = Math.ceil(i / this._vars.ipp), this._page = h, t = a * (this._page - 1) * this._vars.ipp * -1;
                    var r = "fr-thumbnails-side-button-disabled";
                    this._previous_button[(h < 2 ? "add" : "remove") + "Class"](r), this._next_button[(h >= this._vars.pages ? "add" : "remove") + "Class"](r)
                } else t = o + -1 * (a * (i - 1) + .5 * a);
                h = Pages.page;
                var d = {},
                    l = {};
                d[s ? "top" : "left"] = 0, l[s ? "left" : "top"] = t + "px", this._slide.stop(!0).css(d).animate(l, e ? 0 : h && h.view.options.effects.thumbnails.slide || 0, function() {
                    this.loadCurrentPage()
                }.bind(this))
            }
        },
        loadCurrentPage: function() {
            var i, e;
            if (this._position && this._vars.thumbnailFrame.width && !(this._thumbnails.length < 1)) {
                if ("page" === this._mode) {
                    if (this._page < 1) return;
                    i = (this._page - 1) * this._vars.ipp + 1, e = Math.min(i - 1 + this._vars.ipp, this._thumbnails.length)
                } else {
                    var t = Math.ceil(this._vars.thumbnails.width / this._vars.thumbnailFrame.width);
                    i = Math.max(Math.floor(Math.max(this._position - .5 * t, 0)), 1), e = Math.ceil(Math.min(this._position + .5 * t)), this._thumbnails.length < e && (e = this._thumbnails.length)
                }
                for (var s = i; s <= e; s++) this._thumbnails[s - 1].load()
            }
        },
        setActive: function(i) {
            this._slide.find(".fr-thumbnail-active").removeClass("fr-thumbnail-active");
            var e = i && this._thumbnails[i - 1];
            e && e.activate()
        },
        refresh: function() {
            this._position && this.setPosition(this._position)
        }
    };
    $.extend(Thumbnail.prototype, {
        initialize: function(i, e) {
            this.view = i, this._position = e, this.preBuild()
        },
        preBuild: function() {
            this.thumbnail = $("<div>").addClass("fr-thumbnail").data("fr-position", this._position)
        },
        build: function() {
            if (!this.thumbnailFrame) {
                var i = this.view.options;
                Thumbnails._slide.append(this.thumbnailFrame = $("<div>").addClass("fr-thumbnail-frame").append(this.thumbnail.append(this.thumbnailWrapper = $("<div>").addClass("fr-thumbnail-wrapper")))), "image" === this.view.type && this.thumbnail.addClass("fr-load-thumbnail").data("thumbnail", {
                    view: this.view,
                    src: i.thumbnail || this.view.url
                });
                var e = i.thumbnail && i.thumbnail.icon,
                    t;
                e && this.thumbnail.append($("<div>").addClass("fr-thumbnail-icon fr-thumbnail-icon-" + e)), this.thumbnail.append(t = $("<div>").addClass("fr-thumbnail-overlay").append($("<div>").addClass("fr-thumbnail-overlay-background")).append(this.loading = $("<div>").addClass("fr-thumbnail-loading").append($("<div>").addClass("fr-thumbnail-loading-background")).append(this.spinner = $("<div>").addClass("fr-thumbnail-spinner").hide().append($("<div>").addClass("fr-thumbnail-spinner-spin")))).append($("<div>").addClass("fr-thumbnail-overlay-border"))), this.thumbnail.append($("<div>").addClass("fr-thumbnail-state")), this.resize()
            }
        },
        remove: function() {
            this.thumbnailFrame && (this.thumbnailFrame.remove(), this.thumbnailFrame = null, this.image = null), this.ready && (this.ready.abort(), this.ready = null), this.vimeoThumbnail && (this.vimeoThumbnail.abort(), this.vimeoThumbnail = null), this._loading = !1, this._removed = !0, this.view = null, this._clearDelay()
        },
        load: function() {
            if (!(this._loaded || this._loading || this._removed)) {
                this.thumbnailWrapper || this.build(), this._loading = !0;
                var i = this.view.options.thumbnail,
                    e = i && "boolean" == typeof i ? this.view.url : i || this.view.url;
                if (this._url = e, e)
                    if ("vimeo" === this.view.type)
                        if (e === i) this._url = e, this._load(this._url);
                        else switch (this.view.type) {
                            case "vimeo":
                                this.vimeoThumbnail = new VimeoThumbnail(this.view.url, function(i) {
                                    this._url = i, this._load(i)
                                }.bind(this), function() {
                                    this._error()
                                }.bind(this));
                                break
                        } else this._load(this._url)
            }
        },
        activate: function() {
            this.thumbnail.addClass("fr-thumbnail-active")
        },
        _load: function(i) {
            this.thumbnailWrapper.prepend(this.image = $("<img>").addClass("fr-thumbnail-image").attr({
                src: i
            }).css({
                opacity: 1e-4
            })), this.fadeInSpinner(), this.ready = new ImageReady(this.image[0], function(i) {
                var e = i.img;
                this.thumbnailFrame && this._loading && (this._loaded = !0, this._loading = !1, this._dimensions = {
                    width: e.naturalWidth,
                    height: e.naturalHeight
                }, this.resize(), this.show())
            }.bind(this), function() {
                this._error()
            }.bind(this), {
                method: this.view.options.loadedMethod
            })
        },
        _error: function() {
            this._loaded = !0, this._loading = !1, this.thumbnail.addClass("fr-thumbnail-error"), this.image && this.image.hide(), this.thumbnailWrapper.append($("<div>").addClass("fr-thumbnail-image")), this.show()
        },
        fadeInSpinner: function() {
            if (Spinner.supported && this.view.options.spinner) {
                this._clearDelay();
                var i = this.view.options.effects.thumbnail;
                this._delay = setTimeout(function() {
                    this.spinner.stop(!0).fadeTo(i.show || 0, 1)
                }.bind(this), this.view.options.spinnerDelay || 0)
            }
        },
        show: function() {
            this._clearDelay();
            var i = this.view.options.effects.thumbnail;
            this.loading.stop(!0).delay(i.delay).fadeTo(i.show, 0)
        },
        _clearDelay: function() {
            this._delay && (clearTimeout(this._delay), this._delay = null)
        },
        resize: function() {
            if (this.thumbnailFrame) {
                var i = "horizontal" === Thumbnails._orientation;
                if (this.thumbnailFrame.css({
                        width: Thumbnails._vars.thumbnailFrame[i ? "width" : "height"],
                        height: Thumbnails._vars.thumbnailFrame[i ? "height" : "width"]
                    }), this.thumbnailFrame.css({
                        top: i ? 0 : Thumbnails._vars.thumbnailFrame.width * (this._position - 1),
                        left: i ? Thumbnails._vars.thumbnailFrame.width * (this._position - 1) : 0
                    }), this.thumbnailWrapper) {
                    var e = Thumbnails._vars.thumbnail;
                    if (this.thumbnail.css({
                            width: e.width,
                            height: e.height,
                            "margin-top": Math.round(-.5 * e.height),
                            "margin-left": Math.round(-.5 * e.width),
                            "margin-bottom": 0,
                            "margin-right": 0
                        }), this._dimensions) {
                        var t = {
                                width: e.width,
                                height: e.height
                            },
                            s = Math.max(t.width, t.height),
                            n, o = $.extend({}, this._dimensions);
                        if (o.width > t.width && o.height > t.height) {
                            var a = 1,
                                h = 1;
                            (n = Fit.within(t, o)).width < t.width && (a = t.width / n.width), n.height < t.height && (h = t.height / n.height);
                            var r = Math.max(a, h);
                            r > 1 && (n.width *= r, n.height *= r), $.each("width height".split(" "), (function(i, e) {
                                n[e] = Math.round(n[e])
                            }))
                        } else n = Fit.within(this._dimensions, o.width < t.width || o.height < t.height ? {
                            width: s,
                            height: s
                        } : t);
                        var d = Math.round(.5 * t.width - .5 * n.width),
                            l = Math.round(.5 * t.height - .5 * n.height);
                        this.image.removeAttr("style").css($.extend({}, n, {
                            top: l,
                            left: d
                        }))
                    }
                }
            }
        }
    });
    var UI = {
        _modes: ["fullclick", "outside", "inside"],
        _ui: !1,
        _validClickTargetSelector: [".fr-content-element", ".fr-content", ".fr-content > .fr-stroke", ".fr-content > .fr-stroke .fr-stroke-color"].join(", "),
        initialize: function(i) {
            $.each(this._modes, function(i, e) {
                this[e].initialize()
            }.bind(this)), Window.element.addClass("fr-ui-inside-hidden fr-ui-fullclick-hidden")
        },
        set: function(i) {
            this._ui && (Window.element.removeClass("fr-window-ui-" + this._ui), Overlay.element.removeClass("fr-overlay-ui-" + this._ui)), Window.element.addClass("fr-window-ui-" + i), Overlay.element.addClass("fr-overlay-ui-" + i), this._enabled && this._ui && this._ui !== i && (this[this._ui].disable(), this[i].enable(), UI[i].show()), this._ui = i
        },
        _onWindowResize: function() {
            Support.mobileTouch && this.show()
        },
        enable: function() {
            $.each(this._modes, function(i, e) {
                UI[e][e === this._ui ? "enable" : "disable"]()
            }.bind(this)), this._enabled = !0
        },
        disable: function() {
            $.each(this._modes, function(i, e) {
                UI[e].disable()
            }.bind(this)), this._enabled = !1
        },
        adjustPrevNext: function(i, e) {
            UI[this._ui].adjustPrevNext(i, e)
        },
        show: function(i, e) {
            UI[this._ui].show(i, e)
        },
        hide: function(i, e) {
            UI[this._ui].hide(i, e)
        },
        reset: function() {
            $.each(this._modes, function(i, e) {
                UI[e].reset()
            }.bind(this))
        },
        update: function() {
            var i = Pages.page;
            i && this.set(i._ui)
        }
    };
    return UI.fullclick = {
        initialize: function() {
            this.build(), this._scrollLeft = -1
        },
        build: function() {
            Window._box.append(this._previous = $("<div>").addClass("fr-side fr-side-previous fr-side-previous-fullclick fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._next = $("<div>").addClass("fr-side fr-side-next fr-side-next-fullclick fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._close = $("<div>").addClass("fr-close fr-close-fullclick").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).hide(), this._close.on("click", function(i) {
                i.preventDefault(), Window.hide()
            }.bind(this)), this._previous.on("click", function(i) {
                Window.previous(), this._onMouseMove(i)
            }.bind(this)), this._next.on("click", function(i) {
                Window.next(), this._onMouseMove(i)
            }.bind(this))
        },
        enable: function() {
            this.bind()
        },
        disable: function() {
            this.unbind()
        },
        reset: function() {
            Window.timers.clear("ui-fullclick"), this._x = -1, this._y = -1, this._scrollLeft = -1, this.resetPrevNext(), this._onMouseLeave()
        },
        resetPrevNext: function() {
            var i;
            this._previous.add(this._next).stop(!0).removeAttr("style")
        },
        bind: function() {
            this._onMouseUpHandler || (this.unbind(), Window._pages.on("mouseup", ".fr-container", this._onMouseUpHandler = this._onMouseUp.bind(this)), Support.mobileTouch || (Window.element.on("mouseenter", this._showHandler = this.show.bind(this)).on("mouseleave", this._hideHandler = this.hide.bind(this)), Window.element.on("mousemove", this._mousemoveHandler = function(i) {
                var e = i.pageX,
                    t = i.pageY;
                this._hoveringSideButton || t === this._y && e === this._x || (this._x = e, this._y = t, this.show(), this.startTimer())
            }.bind(this)), Window._pages.on("mousemove", ".fr-container", this._onMouseMoveHandler = this._onMouseMove.bind(this)).on("mouseleave", ".fr-container", this._onMouseLeaveHandler = this._onMouseLeave.bind(this)).on("mouseenter", ".fr-container", this._onMouseEnterHandler = this._onMouseEnter.bind(this)), Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = this._onSideMouseEnter.bind(this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = this._onSideMouseLeave.bind(this)), $(window).on("scroll", this._onScrollHandler = this._onScroll.bind(this))))
        },
        unbind: function() {
            this._onMouseUpHandler && (Window._pages.off("mouseup", ".fr-container", this._onMouseUpHandler), this._onMouseUpHandler = null, this._showHandler && (Window.element.off("mouseenter", this._showHandler).off("mouseleave", this._hideHandler).off("mousemove", this._mousemoveHandler), Window._pages.off("mousemove", ".fr-container", this._onMouseMoveHandler).off("mouseleave", ".fr-container", this._onMouseLeaveHandler).off("mouseenter", ".fr-container", this._onMouseEnterHandler), Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), $(window).off("scroll", this._onScrollHandler), this._showHandler = null))
        },
        adjustPrevNext: function(i, e) {
            var t = Pages.page;
            if (t) {
                var s = Window.element.is(":visible");
                s || Window.element.show();
                var n = this._previous.attr("style");
                this._previous.removeAttr("style");
                var o = parseInt(this._previous.css("margin-top"));
                this._previous.attr({
                    style: n
                }), s || Window.element.hide();
                var a = t._infoHeight || 0,
                    h = this._previous.add(this._next),
                    r = {
                        "margin-top": o - .5 * a
                    },
                    d = "number" == typeof e ? e : Pages.page && Pages.page.view.options.effects.content.show || 0;
                this.opening && (d = 0), h.stop(!0).animate(r, d, i), this._previous[(Window.mayPrevious() ? "remove" : "add") + "Class"]("fr-side-disabled"), this._next[(Window.mayNext() ? "remove" : "add") + "Class"]("fr-side-disabled"), h[(t._total < 2 ? "add" : "remove") + "Class"]("fr-side-hidden"), i && i()
            } else i && i()
        },
        _onScroll: function() {
            this._scrollLeft = $(window).scrollLeft()
        },
        _onMouseMove: function(i) {
            if (!Support.mobileTouch) {
                var e = this._getEventSide(i),
                    t = _.String.capitalize(e),
                    s = !!e && Window["may" + t]();
                if (e !== this._hoveringSide || s !== this._mayClickHoveringSide) switch (this._hoveringSide = e, this._mayClickHoveringSide = s, Window._box[(s ? "add" : "remove") + "Class"]("fr-hovering-clickable"), e) {
                    case "previous":
                        Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
                        break;
                    case "next":
                        Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous");
                        break
                }
            }
        },
        _onMouseLeave: function(i) {
            Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), this._hoveringSide = !1
        },
        _onMouseUp: function(i) {
            if (!(i.which > 1))
                if (1 !== Pages.pages.length) {
                    var e = this._getEventSide(i);
                    Window[e](), this._onMouseMove(i)
                } else Window.hide()
        },
        _onMouseEnter: function(i) {
            this._onMouseMove(i)
        },
        _getEventSide: function(i) {
            var e = this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(),
                t, s;
            return i.pageX - Window._boxPosition.left - this._scrollLeft < .5 * Window._boxDimensions.width ? "previous" : "next"
        },
        _onSideMouseEnter: function(i) {
            this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(i), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)](), this.clearTimer()
        },
        _onSideMouseLeave: function(i) {
            this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1, this.startTimer()
        },
        show: function(i) {
            if (this._visible) return this.startTimer(), void("function" == typeof i && i());
            this._visible = !0, this.startTimer(), Window.element.addClass("fr-visible-fullclick-ui").removeClass("fr-hidden-fullclick-ui"), Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).show(), "function" == typeof i && i()
        },
        hide: function(i) {
            var e = Pages.page && Pages.page.view.type;
            this._visible && (!e || "youtube" !== e && "vimeo" !== e) ? (this._visible = !1, Window.element.removeClass("fr-visible-fullclick-ui").addClass("fr-hidden-fullclick-ui"), "function" === $.type(i) && i()) : "function" == typeof i && i()
        },
        clearTimer: function() {
            Support.mobileTouch || Window.timers.clear("ui-fullclick")
        },
        startTimer: function() {
            Support.mobileTouch || (this.clearTimer(), Window.timers.set("ui-fullclick", function() {
                this.hide()
            }.bind(this), Window.view ? Window.view.options.uiDelay : 0))
        }
    }, UI.inside = {
        initialize: function() {},
        enable: function() {
            this.bind()
        },
        disable: function() {
            this.unbind()
        },
        bind: function() {
            this._onMouseUpHandler || (this.unbind(), Window._pages.on("mouseup", ".fr-content", this._onMouseUpHandler = this._onMouseUp.bind(this)), Window._pages.on("click", ".fr-content .fr-close", function(i) {
                i.preventDefault(), Window.hide()
            }.bind(this)).on("click", ".fr-content .fr-side-previous", function(i) {
                Window.previous(), this._onMouseMove(i)
            }.bind(this)).on("click", ".fr-content .fr-side-next", function(i) {
                Window.next(), this._onMouseMove(i)
            }.bind(this)), Window.element.on("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler = this._delegateOverlayClose.bind(this)), Support.mobileTouch || (Window.element.on("mouseenter", ".fr-content", this._showHandler = this.show.bind(this)).on("mouseleave", ".fr-content", this._hideHandler = this.hide.bind(this)),
                Window.element.on("mousemove", ".fr-content", this._mousemoveHandler = function(i) {
                    var e = i.pageX,
                        t = i.pageY;
                    this._hoveringSideButton || t === this._y && e === this._x || (this._x = e, this._y = t, this.show(), this.startTimer())
                }.bind(this)), Window._pages.on("mousemove", ".fr-info, .fr-close", function(i) {
                    i.stopPropagation(), this._onMouseLeave(i)
                }.bind(this)), Window._pages.on("mousemove", ".fr-info", function() {
                    this.clearTimer()
                }.bind(this)), Window._pages.on("mousemove", ".fr-content", this._onMouseMoveHandler = this._onMouseMove.bind(this)).on("mouseleave", ".fr-content", this._onMouseLeaveHandler = this._onMouseLeave.bind(this)).on("mouseenter", ".fr-content", this._onMouseEnterHandler = this._onMouseEnter.bind(this)), Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = this._onSideMouseEnter.bind(this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = this._onSideMouseLeave.bind(this)), $(window).on("scroll", this._onScrollHandler = this._onScroll.bind(this))))
        },
        unbind: function() {
            this._onMouseUpHandler && (Window._pages.off("mouseup", ".fr-content", this._onMouseUpHandler), this._onMouseUpHandler = null, Window._pages.off("click", ".fr-content .fr-close").off("click", ".fr-content .fr-side-previous").off("click", ".fr-content .fr-side-next"), Window.element.off("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler), this._showHandler && (Window.element.off("mouseenter", ".fr-content", this._showHandler).off("mouseleave", ".fr-content", this._hideHandler).off("mousemove", ".fr-content", this._mousemoveHandler), Window._pages.off("mousemove", ".fr-info, .fr-close"), Window._pages.off("mousemove", ".fr-info"), Window._pages.off("mousemove", ".fr-content-element", this._onMouseMoveHandler).off("mouseleave", ".fr-content", this._onMouseLeaveHandler).off("mouseenter", ".fr-content", this._onMouseEnterHandler), Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), $(window).off("scroll", this._onScrollHandler), this._showHandler = null))
        },
        reset: function() {
            Window.timers.clear("ui-fullclick"), this._x = -1, this._y = -1, this._scrollLeft = -1, this._hoveringSide = !1, this._onMouseLeave()
        },
        adjustPrevNext: function(i) {
            i && i()
        },
        _onScroll: function() {
            this._scrollLeft = $(window).scrollLeft()
        },
        _delegateOverlayClose: function(i) {
            var e = Pages.page;
            e && e.view.options.overlay && !e.view.options.overlay.close || $(i.target).is(".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper") && (i.preventDefault(), i.stopPropagation(), Window.hide())
        },
        _onMouseMove: function(i) {
            if (!Support.mobileTouch) {
                var e = this._getEventSide(i),
                    t = _.String.capitalize(e),
                    s = !!e && Window["may" + t]();
                if ((1 === Pages.pages.length || Pages.page && "close" === Pages.page.view.options.onClick) && (e = !1), e !== this._hoveringSide || s !== this._mayClickHoveringSide)
                    if (this._hoveringSide = e, this._mayClickHoveringSide = s, e) switch (Window._box[(s ? "add" : "remove") + "Class"]("fr-hovering-clickable"), e) {
                        case "previous":
                            Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
                            break;
                        case "next":
                            Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous");
                            break
                    } else Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next")
            }
        },
        _onMouseLeave: function(i) {
            Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), this._hoveringSide = !1
        },
        _onMouseUp: function(i) {
            if (!(i.which > 1) && $(i.target).is(UI._validClickTargetSelector))
                if (1 === Pages.pages.length || Pages.page && "close" === Pages.page.view.options.onClick) Window.hide();
                else {
                    var e = this._getEventSide(i);
                    Window[e](), this._onMouseMove(i)
                }
        },
        _onMouseEnter: function(i) {
            this._onMouseMove(i)
        },
        _getEventSide: function(i) {
            var e = this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(),
                t, s;
            return i.pageX - Window._boxPosition.left - this._scrollLeft < .5 * Window._boxDimensions.width ? "previous" : "next"
        },
        _onSideMouseEnter: function(i) {
            this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(i), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)](), this.clearTimer()
        },
        _onSideMouseLeave: function(i) {
            this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1, this.startTimer()
        },
        show: function(i) {
            if (this._visible) return this.startTimer(), void("function" == typeof i && i());
            this._visible = !0, this.startTimer(), Window.element.addClass("fr-visible-inside-ui").removeClass("fr-hidden-inside-ui"), "function" == typeof i && i()
        },
        hide: function(i) {
            this._visible ? (this._visible = !1, Window.element.removeClass("fr-visible-inside-ui").addClass("fr-hidden-inside-ui"), "function" == typeof i && i()) : "function" == typeof i && i()
        },
        clearTimer: function() {
            Support.mobileTouch || Window.timers.clear("ui-inside")
        },
        startTimer: function() {
            Support.mobileTouch || (this.clearTimer(), Window.timers.set("ui-inside", function() {
                this.hide()
            }.bind(this), Window.view ? Window.view.options.uiDelay : 0))
        }
    }, UI.outside = {
        initialize: function() {
            this.build(), this._scrollLeft = -1
        },
        build: function() {
            Window._box.append(this._previous = $("<div>").addClass("fr-side fr-side-previous fr-side-previous-outside").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._next = $("<div>").addClass("fr-side fr-side-next fr-side-next-outside").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._close = $("<div>").addClass("fr-close fr-close-outside").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).hide(), this._close.on("click", function(i) {
                i.preventDefault(), Window.hide()
            }.bind(this)), this._previous.on("click", function(i) {
                Window.previous(), this._onMouseMove(i)
            }.bind(this)), this._next.on("click", function(i) {
                Window.next(), this._onMouseMove(i)
            }.bind(this))
        },
        enable: function() {
            this.bind()
        },
        disable: function() {
            this.unbind()
        },
        reset: function() {
            Window.timers.clear("ui-outside"), this._x = -1, this._y = -1, this._scrollLeft = -1, this._onMouseLeave()
        },
        bind: function() {
            this._onMouseUpHandler || (this.unbind(), Window.element.on("mouseup", ".fr-content", this._onMouseUpHandler = this._onMouseUp.bind(this)), Window.element.on("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler = this._delegateOverlayClose.bind(this)), Support.mobileTouch || (Window._pages.on("mousemove", ".fr-content", this._onMouseMoveHandler = this._onMouseMove.bind(this)).on("mouseleave", ".fr-content", this._onMouseLeaveHandler = this._onMouseLeave.bind(this)).on("mouseenter", ".fr-content", this._onMouseEnterHandler = this._onMouseEnter.bind(this)), Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = this._onSideMouseEnter.bind(this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = this._onSideMouseLeave.bind(this)), $(window).on("scroll", this._onScrollHandler = this._onScroll.bind(this))))
        },
        unbind: function() {
            this._onMouseUpHandler && (Window.element.off("mouseup", ".fr-content", this._onMouseUpHandler), this._onMouseUpHandler = null, Window.element.off("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler), this._onMouseMoveHandler && (Window._pages.off("mousemove", ".fr-content", this._onMouseMoveHandler).off("mouseleave", ".fr-content", this._onMouseLeaveHandler).off("mouseenter", ".fr-content", this._onMouseEnterHandler), Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), $(window).off("scroll", this._onScrollHandler), this._onMouseMoveHandler = null))
        },
        adjustPrevNext: function(i, e) {
            var t = Pages.page;
            if (t) {
                var s = this._previous.add(this._next);
                this._previous[(Window.mayPrevious() ? "remove" : "add") + "Class"]("fr-side-disabled"), this._next[(Window.mayNext() ? "remove" : "add") + "Class"]("fr-side-disabled"), s[(t._total < 2 ? "add" : "remove") + "Class"]("fr-side-hidden"), i && i()
            } else i && i()
        },
        _onScroll: function() {
            this._scrollLeft = $(window).scrollLeft()
        },
        _delegateOverlayClose: function(i) {
            var e = Pages.page;
            e && e.view.options.overlay && !e.view.options.overlay.close || $(i.target).is(".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper") && (i.preventDefault(), i.stopPropagation(), Window.hide())
        },
        _onMouseMove: function(i) {
            if (!Support.mobileTouch) {
                var e = this._getEventSide(i),
                    t = _.String.capitalize(e),
                    s = !!e && Window["may" + t]();
                if ((1 === Pages.pages.length || Pages.page && "close" === Pages.page.view.options.onClick) && (e = !1), e !== this._hoveringSide || s !== this._mayClickHoveringSide)
                    if (this._hoveringSide = e, this._mayClickHoveringSide = s, e) switch (Window._box[(s ? "add" : "remove") + "Class"]("fr-hovering-clickable"), e) {
                        case "previous":
                            Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
                            break;
                        case "next":
                            Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous");
                            break
                    } else Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next")
            }
        },
        _onMouseLeave: function(i) {
            Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), this._hoveringSide = !1
        },
        _onMouseUp: function(i) {
            if (!(i.which > 1) && $(i.target).is(UI._validClickTargetSelector))
                if (1 === Pages.pages.length || Pages.page && "close" === Pages.page.view.options.onClick) Window.hide();
                else {
                    var e = this._getEventSide(i);
                    Window[e](), this._onMouseMove(i)
                }
        },
        _onMouseEnter: function(i) {
            this._onMouseMove(i)
        },
        _getEventSide: function(i) {
            var e = this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(),
                t, s;
            return i.pageX - Window._boxPosition.left - this._scrollLeft < .5 * Window._boxDimensions.width ? "previous" : "next"
        },
        show: function() {
            Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).show()
        },
        hide: function() {},
        _onSideMouseEnter: function(i) {
            this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(i), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)]()
        },
        _onSideMouseLeave: function(i) {
            this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1
        },
        clearTimer: function() {}
    }, $((function() {
        _Fresco.initialize()
    })), Fresco
}));