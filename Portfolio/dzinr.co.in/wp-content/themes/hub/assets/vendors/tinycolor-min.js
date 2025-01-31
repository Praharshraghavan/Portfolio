// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// 2016-07-07, Brian Grinstead, MIT License
! function(t) {
    function e(t, n) {
        if (t = t ? t : "", n = n || {}, t instanceof e) return t;
        if (!(this instanceof e)) return new e(t, n);
        var a = r(t);
        this._originalInput = t, this._r = a.r, this._g = a.g, this._b = a.b, this._a = a.a, this._roundA = $(100 * this._a) / 100, this._format = n.format || a.format, this._gradientType = n.gradientType, this._r < 1 && (this._r = $(this._r)), this._g < 1 && (this._g = $(this._g)), this._b < 1 && (this._b = $(this._b)), this._ok = a.ok, this._tc_id = P++
    }

    function r(t) {
        var e = {
                r: 0,
                g: 0,
                b: 0
            },
            r = 1,
            a = null,
            s = null,
            f = null,
            h = !1,
            l = !1;
        return "string" == typeof t && (t = E(t)), "object" == typeof t && (z(t.r) && z(t.g) && z(t.b) ? (e = n(t.r, t.g, t.b), h = !0, l = "%" === String(t.r).substr(-1) ? "prgb" : "rgb") : z(t.h) && z(t.s) && z(t.v) ? (a = I(t.s), s = I(t.v), e = o(t.h, a, s), h = !0, l = "hsv") : z(t.h) && z(t.s) && z(t.l) && (a = I(t.s), f = I(t.l), e = i(t.h, a, f), h = !0, l = "hsl"), t.hasOwnProperty("a") && (r = t.a)), r = S(r), {
            ok: h,
            format: t.format || l,
            r: D(255, U(e.r, 0)),
            g: D(255, U(e.g, 0)),
            b: D(255, U(e.b, 0)),
            a: r
        }
    }

    function n(t, e, r) {
        return {
            r: 255 * H(t, 255),
            g: 255 * H(e, 255),
            b: 255 * H(r, 255)
        }
    }

    function a(t, e, r) {
        t = H(t, 255), e = H(e, 255), r = H(r, 255);
        var n, a, i = U(t, e, r),
            s = D(t, e, r),
            o = (i + s) / 2;
        if (i == s) n = a = 0;
        else {
            var f = i - s;
            switch (a = o > .5 ? f / (2 - i - s) : f / (i + s), i) {
                case t:
                    n = (e - r) / f + (r > e ? 6 : 0);
                    break;
                case e:
                    n = (r - t) / f + 2;
                    break;
                case r:
                    n = (t - e) / f + 4
            }
            n /= 6
        }
        return {
            h: n,
            s: a,
            l: o
        }
    }

    function i(t, e, r) {
        function n(t, e, r) {
            return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? t + 6 * (e - t) * r : .5 > r ? e : 2 / 3 > r ? t + (e - t) * (2 / 3 - r) * 6 : t
        }
        var a, i, s;
        if (t = H(t, 360), e = H(e, 100), r = H(r, 100), 0 === e) a = i = s = r;
        else {
            var o = .5 > r ? r * (1 + e) : r + e - r * e,
                f = 2 * r - o;
            a = n(f, o, t + 1 / 3), i = n(f, o, t), s = n(f, o, t - 1 / 3)
        }
        return {
            r: 255 * a,
            g: 255 * i,
            b: 255 * s
        }
    }

    function s(t, e, r) {
        t = H(t, 255), e = H(e, 255), r = H(r, 255);
        var n, a, i = U(t, e, r),
            s = D(t, e, r),
            o = i,
            f = i - s;
        if (a = 0 === i ? 0 : f / i, i == s) n = 0;
        else {
            switch (i) {
                case t:
                    n = (e - r) / f + (r > e ? 6 : 0);
                    break;
                case e:
                    n = (r - t) / f + 2;
                    break;
                case r:
                    n = (t - e) / f + 4
            }
            n /= 6
        }
        return {
            h: n,
            s: a,
            v: o
        }
    }

    function o(e, r, n) {
        e = 6 * H(e, 360), r = H(r, 100), n = H(n, 100);
        var a = t.floor(e),
            i = e - a,
            s = n * (1 - r),
            o = n * (1 - i * r),
            f = n * (1 - (1 - i) * r),
            h = a % 6,
            l = [n, o, s, s, f, n][h],
            u = [f, n, n, o, s, s][h],
            c = [s, s, f, n, n, o][h];
        return {
            r: 255 * l,
            g: 255 * u,
            b: 255 * c
        }
    }

    function f(t, e, r, n) {
        var a = [M($(t).toString(16)), M($(e).toString(16)), M($(r).toString(16))];
        return n && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("")
    }

    function h(t, e, r, n, a) {
        var i = [M($(t).toString(16)), M($(e).toString(16)), M($(r).toString(16)), M(L(n))];
        return a && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) && i[3].charAt(0) == i[3].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0) : i.join("")
    }

    function l(t, e, r, n) {
        var a = [M(L(n)), M($(t).toString(16)), M($(e).toString(16)), M($(r).toString(16))];
        return a.join("")
    }

    function u(t, r) {
        r = 0 === r ? 0 : r || 10;
        var n = e(t).toHsl();
        return n.s -= r / 100, n.s = R(n.s), e(n)
    }

    function c(t, r) {
        r = 0 === r ? 0 : r || 10;
        var n = e(t).toHsl();
        return n.s += r / 100, n.s = R(n.s), e(n)
    }

    function g(t) {
        return e(t).desaturate(100)
    }

    function b(t, r) {
        r = 0 === r ? 0 : r || 10;
        var n = e(t).toHsl();
        return n.l += r / 100, n.l = R(n.l), e(n)
    }

    function d(t, r) {
        r = 0 === r ? 0 : r || 10;
        var n = e(t).toRgb();
        return n.r = U(0, D(255, n.r - $(255 * -(r / 100)))), n.g = U(0, D(255, n.g - $(255 * -(r / 100)))), n.b = U(0, D(255, n.b - $(255 * -(r / 100)))), e(n)
    }

    function _(t, r) {
        r = 0 === r ? 0 : r || 10;
        var n = e(t).toHsl();
        return n.l -= r / 100, n.l = R(n.l), e(n)
    }

    function p(t, r) {
        var n = e(t).toHsl(),
            a = (n.h + r) % 360;
        return n.h = 0 > a ? 360 + a : a, e(n)
    }

    function m(t) {
        var r = e(t).toHsl();
        return r.h = (r.h + 180) % 360, e(r)
    }

    function v(t) {
        var r = e(t).toHsl(),
            n = r.h;
        return [e(t), e({
            h: (n + 120) % 360,
            s: r.s,
            l: r.l
        }), e({
            h: (n + 240) % 360,
            s: r.s,
            l: r.l
        })]
    }

    function y(t) {
        var r = e(t).toHsl(),
            n = r.h;
        return [e(t), e({
            h: (n + 90) % 360,
            s: r.s,
            l: r.l
        }), e({
            h: (n + 180) % 360,
            s: r.s,
            l: r.l
        }), e({
            h: (n + 270) % 360,
            s: r.s,
            l: r.l
        })]
    }

    function A(t) {
        var r = e(t).toHsl(),
            n = r.h;
        return [e(t), e({
            h: (n + 72) % 360,
            s: r.s,
            l: r.l
        }), e({
            h: (n + 216) % 360,
            s: r.s,
            l: r.l
        })]
    }

    function x(t, r, n) {
        r = r || 6, n = n || 30;
        var a = e(t).toHsl(),
            i = 360 / n,
            s = [e(t)];
        for (a.h = (a.h - (i * r >> 1) + 720) % 360; --r;) a.h = (a.h + i) % 360, s.push(e(a));
        return s
    }

    function k(t, r) {
        r = r || 6;
        for (var n = e(t).toHsv(), a = n.h, i = n.s, s = n.v, o = [], f = 1 / r; r--;) o.push(e({
            h: a,
            s: i,
            v: s
        })), s = (s + f) % 1;
        return o
    }

    function w(t) {
        var e = {};
        for (var r in t) t.hasOwnProperty(r) && (e[t[r]] = r);
        return e
    }

    function S(t) {
        return t = parseFloat(t), (isNaN(t) || 0 > t || t > 1) && (t = 1), t
    }

    function H(e, r) {
        C(e) && (e = "100%");
        var n = q(e);
        return e = D(r, U(0, parseFloat(e))), n && (e = parseInt(e * r, 10) / 100), t.abs(e - r) < 1e-6 ? 1 : e % r / parseFloat(r)
    }

    function R(t) {
        return D(1, U(0, t))
    }

    function F(t) {
        return parseInt(t, 16)
    }

    function C(t) {
        return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
    }

    function q(t) {
        return "string" == typeof t && -1 != t.indexOf("%")
    }

    function M(t) {
        return 1 == t.length ? "0" + t : "" + t
    }

    function I(t) {
        return 1 >= t && (t = 100 * t + "%"), t
    }

    function L(e) {
        return t.round(255 * parseFloat(e)).toString(16)
    }

    function N(t) {
        return F(t) / 255
    }

    function z(t) {
        return !!X.CSS_UNIT.exec(t)
    }

    function E(t) {
        t = t.replace(j, "").replace(O, "").toLowerCase();
        var e = !1;
        if (G[t]) t = G[t], e = !0;
        else if ("transparent" == t) return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
        };
        var r;
        return (r = X.rgb.exec(t)) ? {
            r: r[1],
            g: r[2],
            b: r[3]
        } : (r = X.rgba.exec(t)) ? {
            r: r[1],
            g: r[2],
            b: r[3],
            a: r[4]
        } : (r = X.hsl.exec(t)) ? {
            h: r[1],
            s: r[2],
            l: r[3]
        } : (r = X.hsla.exec(t)) ? {
            h: r[1],
            s: r[2],
            l: r[3],
            a: r[4]
        } : (r = X.hsv.exec(t)) ? {
            h: r[1],
            s: r[2],
            v: r[3]
        } : (r = X.hsva.exec(t)) ? {
            h: r[1],
            s: r[2],
            v: r[3],
            a: r[4]
        } : (r = X.hex8.exec(t)) ? {
            r: F(r[1]),
            g: F(r[2]),
            b: F(r[3]),
            a: N(r[4]),
            format: e ? "name" : "hex8"
        } : (r = X.hex6.exec(t)) ? {
            r: F(r[1]),
            g: F(r[2]),
            b: F(r[3]),
            format: e ? "name" : "hex"
        } : (r = X.hex4.exec(t)) ? {
            r: F(r[1] + "" + r[1]),
            g: F(r[2] + "" + r[2]),
            b: F(r[3] + "" + r[3]),
            a: N(r[4] + "" + r[4]),
            format: e ? "name" : "hex8"
        } : (r = X.hex3.exec(t)) ? {
            r: F(r[1] + "" + r[1]),
            g: F(r[2] + "" + r[2]),
            b: F(r[3] + "" + r[3]),
            format: e ? "name" : "hex"
        } : !1
    }

    function T(t) {
        var e, r;
        return t = t || {
            level: "AA",
            size: "small"
        }, e = (t.level || "AA").toUpperCase(), r = (t.size || "small").toLowerCase(), "AA" !== e && "AAA" !== e && (e = "AA"), "small" !== r && "large" !== r && (r = "small"), {
            level: e,
            size: r
        }
    }
    var j = /^\s+/,
        O = /\s+$/,
        P = 0,
        $ = t.round,
        D = t.min,
        U = t.max,
        B = t.random;
    e.prototype = {
        isDark: function() {
            return this.getBrightness() < 128
        },
        isLight: function() {
            return !this.isDark()
        },
        isValid: function() {
            return this._ok
        },
        getOriginalInput: function() {
            return this._originalInput
        },
        getFormat: function() {
            return this._format
        },
        getAlpha: function() {
            return this._a
        },
        getBrightness: function() {
            var t = this.toRgb();
            return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3
        },
        getLuminance: function() {
            var e, r, n, a, i, s, o = this.toRgb();
            return e = o.r / 255, r = o.g / 255, n = o.b / 255, a = .03928 >= e ? e / 12.92 : t.pow((e + .055) / 1.055, 2.4), i = .03928 >= r ? r / 12.92 : t.pow((r + .055) / 1.055, 2.4), s = .03928 >= n ? n / 12.92 : t.pow((n + .055) / 1.055, 2.4), .2126 * a + .7152 * i + .0722 * s
        },
        setAlpha: function(t) {
            return this._a = S(t), this._roundA = $(100 * this._a) / 100, this
        },
        toHsv: function() {
            var t = s(this._r, this._g, this._b);
            return {
                h: 360 * t.h,
                s: t.s,
                v: t.v,
                a: this._a
            }
        },
        toHsvString: function() {
            var t = s(this._r, this._g, this._b),
                e = $(360 * t.h),
                r = $(100 * t.s),
                n = $(100 * t.v);
            return 1 == this._a ? "hsv(" + e + ", " + r + "%, " + n + "%)" : "hsva(" + e + ", " + r + "%, " + n + "%, " + this._roundA + ")"
        },
        toHsl: function() {
            var t = a(this._r, this._g, this._b);
            return {
                h: 360 * t.h,
                s: t.s,
                l: t.l,
                a: this._a
            }
        },
        toHslString: function() {
            var t = a(this._r, this._g, this._b),
                e = $(360 * t.h),
                r = $(100 * t.s),
                n = $(100 * t.l);
            return 1 == this._a ? "hsl(" + e + ", " + r + "%, " + n + "%)" : "hsla(" + e + ", " + r + "%, " + n + "%, " + this._roundA + ")"
        },
        toHex: function(t) {
            return f(this._r, this._g, this._b, t)
        },
        toHexString: function(t) {
            return "#" + this.toHex(t)
        },
        toHex8: function(t) {
            return h(this._r, this._g, this._b, this._a, t)
        },
        toHex8String: function(t) {
            return "#" + this.toHex8(t)
        },
        toRgb: function() {
            return {
                r: $(this._r),
                g: $(this._g),
                b: $(this._b),
                a: this._a
            }
        },
        toRgbString: function() {
            return 1 == this._a ? "rgb(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ")" : "rgba(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ", " + this._roundA + ")"
        },
        toPercentageRgb: function() {
            return {
                r: $(100 * H(this._r, 255)) + "%",
                g: $(100 * H(this._g, 255)) + "%",
                b: $(100 * H(this._b, 255)) + "%",
                a: this._a
            }
        },
        toPercentageRgbString: function() {
            return 1 == this._a ? "rgb(" + $(100 * H(this._r, 255)) + "%, " + $(100 * H(this._g, 255)) + "%, " + $(100 * H(this._b, 255)) + "%)" : "rgba(" + $(100 * H(this._r, 255)) + "%, " + $(100 * H(this._g, 255)) + "%, " + $(100 * H(this._b, 255)) + "%, " + this._roundA + ")"
        },
        toName: function() {
            return 0 === this._a ? "transparent" : this._a < 1 ? !1 : V[f(this._r, this._g, this._b, !0)] || !1
        },
        toFilter: function(t) {
            var r = "#" + l(this._r, this._g, this._b, this._a),
                n = r,
                a = this._gradientType ? "GradientType = 1, " : "";
            if (t) {
                var i = e(t);
                n = "#" + l(i._r, i._g, i._b, i._a)
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + a + "startColorstr=" + r + ",endColorstr=" + n + ")"
        },
        toString: function(t) {
            var e = !!t;
            t = t || this._format;
            var r = !1,
                n = this._a < 1 && this._a >= 0,
                a = !e && n && ("hex" === t || "hex6" === t || "hex3" === t || "hex4" === t || "hex8" === t || "name" === t);
            return a ? "name" === t && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === t && (r = this.toRgbString()), "prgb" === t && (r = this.toPercentageRgbString()), "hex" !== t && "hex6" !== t || (r = this.toHexString()), "hex3" === t && (r = this.toHexString(!0)), "hex4" === t && (r = this.toHex8String(!0)), "hex8" === t && (r = this.toHex8String()), "name" === t && (r = this.toName()), "hsl" === t && (r = this.toHslString()), "hsv" === t && (r = this.toHsvString()), r || this.toHexString())
        },
        clone: function() {
            return e(this.toString())
        },
        _applyModification: function(t, e) {
            var r = t.apply(null, [this].concat([].slice.call(e)));
            return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this
        },
        lighten: function() {
            return this._applyModification(b, arguments)
        },
        brighten: function() {
            return this._applyModification(d, arguments)
        },
        darken: function() {
            return this._applyModification(_, arguments)
        },
        desaturate: function() {
            return this._applyModification(u, arguments)
        },
        saturate: function() {
            return this._applyModification(c, arguments)
        },
        greyscale: function() {
            return this._applyModification(g, arguments)
        },
        spin: function() {
            return this._applyModification(p, arguments)
        },
        _applyCombination: function(t, e) {
            return t.apply(null, [this].concat([].slice.call(e)))
        },
        analogous: function() {
            return this._applyCombination(x, arguments)
        },
        complement: function() {
            return this._applyCombination(m, arguments)
        },
        monochromatic: function() {
            return this._applyCombination(k, arguments)
        },
        splitcomplement: function() {
            return this._applyCombination(A, arguments)
        },
        triad: function() {
            return this._applyCombination(v, arguments)
        },
        tetrad: function() {
            return this._applyCombination(y, arguments)
        }
    }, e.fromRatio = function(t, r) {
        if ("object" == typeof t) {
            var n = {};
            for (var a in t) t.hasOwnProperty(a) && ("a" === a ? n[a] = t[a] : n[a] = I(t[a]));
            t = n
        }
        return e(t, r)
    }, e.equals = function(t, r) {
        return t && r ? e(t).toRgbString() == e(r).toRgbString() : !1
    }, e.random = function() {
        return e.fromRatio({
            r: B(),
            g: B(),
            b: B()
        })
    }, e.mix = function(t, r, n) {
        n = 0 === n ? 0 : n || 50;
        var a = e(t).toRgb(),
            i = e(r).toRgb(),
            s = n / 100,
            o = {
                r: (i.r - a.r) * s + a.r,
                g: (i.g - a.g) * s + a.g,
                b: (i.b - a.b) * s + a.b,
                a: (i.a - a.a) * s + a.a
            };
        return e(o)
    }, e.readability = function(r, n) {
        var a = e(r),
            i = e(n);
        return (t.max(a.getLuminance(), i.getLuminance()) + .05) / (t.min(a.getLuminance(), i.getLuminance()) + .05)
    }, e.isReadable = function(t, r, n) {
        var a, i, s = e.readability(t, r);
        switch (i = !1, a = T(n), a.level + a.size) {
            case "AAsmall":
            case "AAAlarge":
                i = s >= 4.5;
                break;
            case "AAlarge":
                i = s >= 3;
                break;
            case "AAAsmall":
                i = s >= 7
        }
        return i
    }, e.mostReadable = function(t, r, n) {
        var a, i, s, o, f = null,
            h = 0;
        n = n || {}, i = n.includeFallbackColors, s = n.level, o = n.size;
        for (var l = 0; l < r.length; l++) a = e.readability(t, r[l]), a > h && (h = a, f = e(r[l]));
        return e.isReadable(t, f, {
            level: s,
            size: o
        }) || !i ? f : (n.includeFallbackColors = !1, e.mostReadable(t, ["#fff", "#000"], n))
    };
    var G = e.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            rebeccapurple: "663399",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        },
        V = e.hexNames = w(G),
        X = function() {
            var t = "[-\\+]?\\d+%?",
                e = "[-\\+]?\\d*\\.\\d+%?",
                r = "(?:" + e + ")|(?:" + t + ")",
                n = "[\\s|\\(]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")\\s*\\)?",
                a = "[\\s|\\(]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")\\s*\\)?";
            return {
                CSS_UNIT: new RegExp(r),
                rgb: new RegExp("rgb" + n),
                rgba: new RegExp("rgba" + a),
                hsl: new RegExp("hsl" + n),
                hsla: new RegExp("hsla" + a),
                hsv: new RegExp("hsv" + n),
                hsva: new RegExp("hsva" + a),
                hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            }
        }();
    "undefined" != typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd ? define(function() {
        return e
    }) : window.tinycolor = e
}(Math);