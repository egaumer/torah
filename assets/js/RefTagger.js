!function(e, t) {
    e.refTaggerCallback || (e.refTagger = t())
}(this, function() {
    var e, t, o;
    return function(n) {
        function r(e, t) {
            return k.call(e, t)
        }
        function s(e, t) {
            var o, n, r, s, i, a, l, c, d, h, p, u = t && t.split("/"), f = T.map, g = f && f["*"] || {};
            if (e && "." === e.charAt(0))
                if (t) {
                    for (u = u.slice(0, u.length - 1),
                    e = e.split("/"),
                    i = e.length - 1,
                    T.nodeIdCompat && L.test(e[i]) && (e[i] = e[i].replace(L, "")),
                    e = u.concat(e),
                    d = 0; d < e.length; d += 1)
                        if (p = e[d],
                        "." === p)
                            e.splice(d, 1),
                            d -= 1;
                        else if (".." === p) {
                            if (1 === d && (".." === e[2] || ".." === e[0]))
                                break;
                            d > 0 && (e.splice(d - 1, 2),
                            d -= 2)
                        }
                    e = e.join("/")
                } else
                    0 === e.indexOf("./") && (e = e.substring(2));
            if ((u || g) && f) {
                for (o = e.split("/"),
                d = o.length; d > 0; d -= 1) {
                    if (n = o.slice(0, d).join("/"),
                    u)
                        for (h = u.length; h > 0; h -= 1)
                            if (r = f[u.slice(0, h).join("/")],
                            r && (r = r[n])) {
                                s = r,
                                a = d;
                                break
                            }
                    if (s)
                        break;
                    !l && g && g[n] && (l = g[n],
                    c = d)
                }
                !s && l && (s = l,
                a = c),
                s && (o.splice(0, a, s),
                e = o.join("/"))
            }
            return e
        }
        function i(e, t) {
            return function() {
                return u.apply(n, y.call(arguments, 0).concat([e, t]))
            }
        }
        function a(e) {
            return function(t) {
                return s(t, e)
            }
        }
        function l(e) {
            return function(t) {
                m[e] = t
            }
        }
        function c(e) {
            if (r(b, e)) {
                var t = b[e];
                delete b[e],
                v[e] = !0,
                p.apply(n, t)
            }
            if (!r(m, e) && !r(v, e))
                throw new Error("No " + e);
            return m[e]
        }
        function d(e) {
            var t, o = e ? e.indexOf("!") : -1;
            return o > -1 && (t = e.substring(0, o),
            e = e.substring(o + 1, e.length)),
            [t, e]
        }
        function h(e) {
            return function() {
                return T && T.config && T.config[e] || {}
            }
        }
        var p, u, f, g, m = {}, b = {}, T = {}, v = {}, k = Object.prototype.hasOwnProperty, y = [].slice, L = /\.js$/;
        f = function(e, t) {
            var o, n = d(e), r = n[0];
            return e = n[1],
            r && (r = s(r, t),
            o = c(r)),
            r ? e = o && o.normalize ? o.normalize(e, a(t)) : s(e, t) : (e = s(e, t),
            n = d(e),
            r = n[0],
            e = n[1],
            r && (o = c(r))),
            {
                f: r ? r + "!" + e : e,
                n: e,
                pr: r,
                p: o
            }
        }
        ,
        g = {
            require: function(e) {
                return i(e)
            },
            exports: function(e) {
                var t = m[e];
                return "undefined" != typeof t ? t : m[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: m[e],
                    config: h(e)
                }
            }
        },
        p = function(e, t, o, s) {
            var a, d, h, p, u, T, k = [], y = typeof o;
            if (s = s || e,
            "undefined" === y || "function" === y) {
                for (t = !t.length && o.length ? ["require", "exports", "module"] : t,
                u = 0; u < t.length; u += 1)
                    if (p = f(t[u], s),
                    d = p.f,
                    "require" === d)
                        k[u] = g.require(e);
                    else if ("exports" === d)
                        k[u] = g.exports(e),
                        T = !0;
                    else if ("module" === d)
                        a = k[u] = g.module(e);
                    else if (r(m, d) || r(b, d) || r(v, d))
                        k[u] = c(d);
                    else {
                        if (!p.p)
                            throw new Error(e + " missing " + d);
                        p.p.load(p.n, i(s, !0), l(d), {}),
                        k[u] = m[d]
                    }
                h = o ? o.apply(m[e], k) : void 0,
                e && (a && a.exports !== n && a.exports !== m[e] ? m[e] = a.exports : h === n && T || (m[e] = h))
            } else
                e && (m[e] = o)
        }
        ,
        e = t = u = function(e, t, o, r, s) {
            if ("string" == typeof e)
                return g[e] ? g[e](t) : c(f(e, t).f);
            if (!e.splice) {
                if (T = e,
                T.deps && u(T.deps, T.callback),
                !t)
                    return;
                t.splice ? (e = t,
                t = o,
                o = null) : e = n
            }
            return t = t || function() {}
            ,
            "function" == typeof o && (o = r,
            r = s),
            r ? p(n, e, t, o) : setTimeout(function() {
                p(n, e, t, o)
            }, 4),
            u
        }
        ,
        u.config = function(e) {
            return u(e)
        }
        ,
        e._defined = m,
        o = function(e, t, o) {
            t.splice || (o = t,
            t = []),
            r(m, e) || r(b, e) || (b[e] = [e, t, o])
        }
        ,
        o.amd = {
            jQuery: !0
        }
    }(),
    o("......\node_modulesalmondalmond.js", function() {}),
    o("config", {
        brandSite: "https://www.logos.com/reftagger?utm_source=web&utm_medium=linktologos&utm_content=reftaggertooltip&utm_campaign=biblia",
        readers: {
            biblia: "https://biblia.com",
            "bible.faithlife": "https://bible.faithlife.com"
        },
        loggerBaseUri: "api.reftagger.com/util/v2/log",
        noSearchTags: {
            applet: !0,
            hr: !0,
            head: !0,
            img: !0,
            input: !0,
            meta: !0,
            script: !0,
            select: !0,
            textarea: !0
        },
        createTooltipDelay: 250,
        removeTooltipDelay: 300,
        defaultSettings: {
            addLibronixDLSLink: !1,
            addLogosLink: !1,
            appendIconToLibLinks: !1,
            appendIconToLogosLinks: !1,
            bibleReader: "biblia",
            bibleVersion: "",
            caseInsensitive: !1,
            convertHyperlinks: !1,
            cssOverride: !1,
            customStyle: null,
            disableInlineCss: !1,
            dropShadow: !0,
            enableSharingPopups: !0,
            hyperlinkTestList: [],
            libronixBibleVersion: "",
            libronixLinkIcon: null,
            linksOpenNewWindow: !0,
            logosBibleVersion: "",
            logosLinkIcon: "dark",
            nonce: null,
            noSearchClassNames: [],
            noSearchTagNames: ["h1", "h2", "h3"],
            rootNode: null,
            roundCorners: !1,
            socialSharing: ["twitter", "facebook"],
            tagAutomatically: !0,
            tagChapters: !1,
            tooltipStyle: "light",
            useTooltip: !0
        },
        socialSharing: {
            twitter: {
                id: "rtTwitter",
                link: "https://twitter.com/intent/tweet?url=",
                windowSettings: "width=420,height=488",
                title: "Twitter"
            },
            facebook: {
                id: "rtFacebook",
                link: "https://www.facebook.com/sharer/sharer.php?u=",
                windowSettings: "width=626,height=436",
                title: "Facebook"
            }
        }
    }),
    o("root", [], function() {
        return this
    }),
    o("versions", {
        bibliaVersionAbbreviations: {
            dar: "darby",
            nasb: "nasb95",
            gw: "godsword",
            kjv21: "kjv1900",
            nivuk: "niv",
            kar: "hu-bible",
            byz: "byzprsd",
            kjv: "kjv1900",
            net: "gs-netbible",
            s21: "ec-sbgbibs212007"
        },
        supportedVersions: ["AB", "ASV", "CEV", "DARBY", "DAR", "ESV", "GRMNBBLGBRSTZNG", "GW", "HCSB", "KJ21", "KJV", "LSG", "NASB", "NCV", "NET", "NIRV", "NIV", "NIVUK", "NKJV", "NLT", "NLV", "NRSV", "MESSAGE", "S21", "TNIV", "WE", "WNT", "YLT", "TNIV", "NIRV", "TNIV", "NASB", "WESTCOTT", "CHASAOT", "STEPHENS", "AV 1873", "KJV APOC", "ELZEVIR", "IT-DIODATI1649", "TISCH", "TISCHENDORF", "CS-KR1579", "TR1881", "TR1894MR", "TR1550MR", "KAR", "BYZ", "LEB", "RVR60", "KO-KRV", "vulgataclem", "douayrheims", "nvi", "grmnbblschl2000", "bbl1819txtrcpts", "bbl1914rvscrrgd", "bbls1885vlgtltn", "hlybbltrdshndtn", "hlybblsmpshndtn", "CSB", "NTV"]
    }),
    o("nls/readerQueryParams", {}),
    o("passageManager", ["config", "versions", "nls/readerQueryParams"], function(e, t, o) {
        "use strict";
        function n(e, t) {
            return e + "-" + (t || "")
        }
        function r(e) {
            return e = (e || "").toLowerCase(),
            "default" === e && (e = ""),
            t.bibliaVersionAbbreviations[e] || e
        }
        function s(t) {
            return e.readers[t] || e.readers.biblia
        }
        function i(e, t, i, u) {
            var f, g, m, b, T;
            if (t = r(t),
            i = s(i),
            f = n(e, t),
            l.hasOwnProperty(f))
                u && u(l[f]);
            else if (c.hasOwnProperty(f))
                u && c[f].push(u);
            else {
                c[f] = u ? [u] : [],
                m = ["https:", "//reftagger.bibliacdn.com", "/bible/", t ? encodeURIComponent(t) + "/" : "", encodeURIComponent(e), "?target=reftagger&callback=refTaggerCallback&noInlineStyle=true"];
                for (b in o)
                    o.hasOwnProperty(b) && Array.prototype.push.apply(m, ["&", b, "=", encodeURIComponent(o[b])]);
                g = m.join(""),
                p[f] = setTimeout(function() {
                    var e, t = h[f], o = c[f], n = o.length;
                    for (t.parentNode.removeChild(t),
                    e = 0; n > e; e++)
                        o[e]();
                    delete c[f]
                }, 5e3),
                T = a.createElement("script"),
                T.src = g,
                d.insertBefore(T, d.firstChild),
                h[f] = T
            }
        }
        var a = window.document
          , l = {}
          , c = {}
          , d = a.getElementsByTagName("head")[0]
          , h = {}
          , p = {};
        return window.refTaggerCallback = function(e) {
            var t, o, r, s = e.requestedVersion, i = e.requestedReference, a = n(i, s), d = c[a];
            if (l[a] = e,
            d) {
                for (t = h[a],
                t.parentNode.removeChild(t),
                r = d.length,
                clearTimeout(p[a]),
                o = 0; r > o; o++)
                    d[o](e);
                delete c[a]
            }
        }
        ,
        {
            getPassage: i,
            getVersion: r,
            getBibleReader: s
        }
    }),
    o("util/classNames", {
        classNames: {
            tooltip: "rtTooltip",
            tooltipContainer: "rtContainer",
            tooltipHeader: "rtTooltipHeader",
            tooltipBody: "rtTooltipBody",
            tooltipReference: "rtTooltipReference",
            tooltipVersion: "rtTooltipVersion",
            tooltipFooter: "rtTooltipFooter",
            tooltipBrandLink: "rtTooltipBrandLink",
            tooltipLogosIcon: "rtTooltipLogosIcon",
            tooltipMoreLink: "rtTooltipMoreLink",
            tooltipDropShadow: "rtTooltipDropShadow",
            tooltipRoundedCorners: "rtTooltipRoundedCorners",
            bibleRef: "rtBibleRef"
        }
    }),
    o("util/dom", ["root"], function(e) {
        "use strict";
        function t(t) {
            var o = e.document
              , n = o.body
              , r = {};
            return t ? "number" == typeof t.scrollLeft && (t.scrollLeft || t.scrollTop) ? (r.x = t.scrollLeft,
            r.y = t.scrollTop) : r = null : (r.x = e.pageXOffset || n.scrollLeft || o.documentElement.scrollLeft,
            r.y = e.pageYOffset || n.scrollTop || o.documentElement.scrollTop),
            r
        }
        function o(e) {
            var t = e
              , o = {
                x: 0,
                y: 0
            }
              , n = {
                x: 0,
                y: 0
            };
            if ("number" == typeof e.offsetLeft) {
                for (; e; )
                    o.x += e.offsetLeft,
                    o.y += e.offsetTop,
                    e = e.offsetParent;
                for (; t && t !== l && t !== a.documentElement; )
                    n.y += t.scrollTop || 0,
                    n.x += t.scrollLeft || 0,
                    t = t.parentNode;
                o.x -= n.x,
                o.y -= n.y
            }
            return o
        }
        function n() {
            var o = t()
              , n = {
                width: e.innerWidth || l.clientWidth || a.documentElement.clientWidth,
                height: e.innerHeight || l.clientHeight || a.documentElement.clientHeight
            };
            return o && (n.x = o.x,
            n.y = o.y),
            n
        }
        function r(e, t) {
            t.parentNode.insertBefore(a.createTextNode(e), t)
        }
        function s(e, t) {
            var o, n = a.createElement(e);
            t = t || {};
            for (o in t)
                n[o] = t[o];
            return n
        }
        function i(e, t) {
            var o;
            t = t || {};
            for (o in t)
                "undefined" != typeof e.style[o] && (e.style[o] = t[o]);
            return e
        }
        var a = e.document
          , l = a.body;
        return {
            applyStyles: i,
            createElement: s,
            getElementAbsoluteOffset: o,
            getElementOffset: t,
            getWindowSize: n,
            insertTextNode: r
        }
    }),
    o("nls/resourceStrings", {
        tooltip: {
            loading: "Loading...",
            more: "more &raquo;",
            brandMessage1: "Powered by",
            brandMessage2: "Logos Reftagger",
            errorHeader: "Sorry",
            errorBody: "This reference could not be loaded at this time.",
            shareOn: "Share on "
        },
        logosLinkTitle: "Open in Logos Bible Software (if available)",
        normalizeReference: function(e) {
            return e.replace(/(\s|\r?\n)+/g, " ").replace(/:/g, ".").replace(/^(\d+)\.+/, "$1").replace("brief", "")
        }
    }),
    o("libs/text", ["module"], function(e) {
        "use strict";
        var o, n, r, s, i = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], a = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, c = "undefined" != typeof location && location.href, d = c && location.protocol && location.protocol.replace(/\:/, ""), h = c && location.hostname, p = c && (location.port || void 0), u = {}, f = e.config && e.config() || {};
        return o = {
            version: "2.0.7",
            strip: function(e) {
                if (e) {
                    e = e.replace(a, "");
                    var t = e.match(l);
                    t && (e = t[1])
                } else
                    e = "";
                return e
            },
            jsEscape: function(e) {
                return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            },
            createXhr: f.createXhr || function() {
                var e, t, o;
                if ("undefined" != typeof XMLHttpRequest)
                    return new XMLHttpRequest;
                if ("undefined" != typeof ActiveXObject)
                    for (t = 0; 3 > t; t += 1) {
                        o = i[t];
                        try {
                            e = new ActiveXObject(o)
                        } catch (n) {}
                        if (e) {
                            i = [o];
                            break
                        }
                    }
                return e
            }
            ,
            parseName: function(e) {
                var t, o, n, r = !1, s = e.indexOf("."), i = 0 === e.indexOf("./") || 0 === e.indexOf("../");
                return -1 !== s && (!i || s > 1) ? (t = e.substring(0, s),
                o = e.substring(s + 1, e.length)) : t = e,
                n = o || t,
                s = n.indexOf("!"),
                -1 !== s && (r = "strip" === n.substring(s + 1),
                n = n.substring(0, s),
                o ? o = n : t = n),
                {
                    moduleName: t,
                    ext: o,
                    strip: r
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(e, t, n, r) {
                var s, i, a, l = o.xdRegExp.exec(e);
                return l ? (s = l[2],
                i = l[3],
                i = i.split(":"),
                a = i[1],
                i = i[0],
                !(s && s !== t || i && i.toLowerCase() !== n.toLowerCase() || (a || i) && a !== r)) : !0
            },
            finishLoad: function(e, t, n, r) {
                n = t ? o.strip(n) : n,
                f.isBuild && (u[e] = n),
                r(n)
            },
            load: function(e, t, n, r) {
                if (r.isBuild && !r.inlineText)
                    return void n();
                f.isBuild = r.isBuild;
                var s = o.parseName(e)
                  , i = s.moduleName + (s.ext ? "." + s.ext : "")
                  , a = t.toUrl(i)
                  , l = f.useXhr || o.useXhr;
                !c || l(a, d, h, p) ? o.get(a, function(t) {
                    o.finishLoad(e, s.strip, t, n)
                }, function(e) {
                    n.error && n.error(e)
                }) : t([i], function(e) {
                    o.finishLoad(s.moduleName + "." + s.ext, s.strip, e, n)
                })
            },
            write: function(e, t, n, r) {
                if (u.hasOwnProperty(t)) {
                    var s = o.jsEscape(u[t]);
                    n.asModule(e + "!" + t, "define(function () { return '" + s + "';});\n")
                }
            },
            writeFile: function(e, t, n, r, s) {
                var i = o.parseName(t)
                  , a = i.ext ? "." + i.ext : ""
                  , l = i.moduleName + a
                  , c = n.toUrl(i.moduleName + a) + ".js";
                o.load(l, n, function(t) {
                    var n = function(e) {
                        return r(c, e)
                    };
                    n.asModule = function(e, t) {
                        return r.asModule(e, c, t)
                    }
                    ,
                    o.write(e, l, n, s)
                }, s)
            }
        },
        "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node ? (n = t.nodeRequire("fs"),
        o.get = function(e, t, o) {
            try {
                var r = n.readFileSync(e, "utf8");
                0 === r.indexOf("\ufeff") && (r = r.substring(1)),
                t(r)
            } catch (s) {
                o(s)
            }
        }
        ) : "xhr" === f.env || !f.env && o.createXhr() ? o.get = function(e, t, n, r) {
            var s, i = o.createXhr();
            if (i.open("GET", e, !0),
            r)
                for (s in r)
                    r.hasOwnProperty(s) && i.setRequestHeader(s.toLowerCase(), r[s]);
            f.onXhr && f.onXhr(i, e),
            i.onreadystatechange = function(o) {
                var r, s;
                4 === i.readyState && (r = i.status,
                r > 399 && 600 > r ? (s = new Error(e + " HTTP status: " + r),
                s.xhr = i,
                n(s)) : t(i.responseText),
                f.onXhrComplete && f.onXhrComplete(i, e))
            }
            ,
            i.send(null)
        }
        : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? o.get = function(e, t) {
            var o, n, r = "utf-8", s = new java.io.File(e), i = java.lang.System.getProperty("line.separator"), a = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),r)), l = "";
            try {
                for (o = new java.lang.StringBuffer,
                n = a.readLine(),
                n && n.length() && 65279 === n.charAt(0) && (n = n.substring(1)),
                null !== n && o.append(n); null !== (n = a.readLine()); )
                    o.append(i),
                    o.append(n);
                l = String(o.toString())
            } finally {
                a.close()
            }
            t(l)
        }
        : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (r = Components.classes,
        s = Components.interfaces,
        Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),
        o.get = function(e, t) {
            var o, n, i = {}, a = new FileUtils.File(e);
            try {
                o = r["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream),
                o.init(a, 1, 0, !1),
                n = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream),
                n.init(o, "utf-8", o.available(), s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),
                n.readString(o.available(), i),
                n.close(),
                o.close(),
                t(i.value)
            } catch (l) {
                throw new Error((a && a.path || "") + ": " + l)
            }
        }
        ),
        o
    }),
    o("libs/text!util/tooltipTemplate", [], function() {
        return '<div class="{{tooltipContainer}}">\n	<div class="{{tooltipHeader}}">{{reference}} {{version}} {{socialContent}}</div>\n	<div class="{{tooltipBody}}">{{content}}</div>\n	<div class="{{tooltipFooter}}">\n		<div class="{{tooltipBrandLink}}">\n			<a href="{{brandSite}}" target="_blank" rel="noopener">\n				<span>{{brandMessage1}}</span>\n				<svg class="{{tooltipLogosIcon}}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n					<path d="M13.8229 0.65213H2.17707C0.974612 0.65213 0 1.62674 0 2.8292V14.4753C0 14.8024 0.0722751 15.1125 0.20139 15.3909L3.83009 11.7712C3.87419 11.7198 3.87419 11.6441 3.83009 11.5926C2.51493 9.71274 2.61415 7.18654 4.07289 5.41567C5.53138 3.64481 7.99167 3.06318 10.0889 3.99369C12.1861 4.9242 13.4059 7.13827 13.0715 9.4082C12.7373 11.6781 10.9312 13.4468 8.65464 13.7332H8.66763C7.36937 13.8993 6.05715 13.557 5.00511 12.7782C4.95195 12.7333 4.87428 12.7333 4.82136 12.7782L1.1885 16.4157C1.48519 16.5671 1.82109 16.6526 2.17683 16.6526H13.8229C15.0251 16.6526 16 15.678 16 14.4755V2.8292C16 1.62699 15.0254 0.65213 13.8229 0.65213Z" fill="#AAAAAA"/>\n					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8427 8.65222C11.8427 10.7607 10.1333 12.4701 8.02487 12.4701C5.9164 12.4701 4.20703 10.7607 4.20703 8.65222C4.20703 6.54375 5.9164 4.83438 8.02487 4.83438C10.1333 4.83438 11.8427 6.54375 11.8427 8.65222ZM7.50488 6.50478H8.50488V7.50478H9.77508V8.50478H8.50488V11.0048H7.50488V8.50478L6.27508 8.50478V7.50478H7.50488V6.50478Z" fill="#AAAAAA"/>\n				</svg>	\n				<span>{{brandMessage2}}</span>\n			</a>\n		</div>\n		{{footer}}\n	</div>\n</div>'
    }),
    o("tooltips", ["config", "root", "util/classNames", "util/dom", "passageManager", "nls/resourceStrings", "nls/readerQueryParams", "libs/text!util/tooltipTemplate"], function(e, t, o, n, r, s, i, a) {
        "use strict";
        function l(e, t, o, n, r) {
            var s = {
                x: t.x + o.tooltipOffsetX,
                y: t.y - r
            };
            return s.x += n,
            s.x > e.width + e.x - o.tooltipEdgePadding && (s.x = e.width + e.x - o.tooltipOffsetX - o.tooltipEdgePadding),
            s.x < 0 && (s.x = 0),
            s.y < e.y && (t.y + r + o.tooltipOffsetY > e.height + e.y ? s.y = e.y : s.y = t.y + o.tooltipOffsetY),
            s.x -= n + 3,
            s.x < 0 && (s.x = 0),
            s
        }
        function c(e, t, o) {
            var n, s, a = r.getBibleReader(o) + "/bible/", l = [];
            for (s in i)
                i.hasOwnProperty(s) && l.push(s + "=" + i[s]);
            return t = r.getVersion(t),
            n = [a, t ? t + "/" : "", e.replace(/:/g, ".")],
            l.length && n.push("?" + l.join("&")),
            encodeURI(n.join("").replace(/(\s|\r?\n)+/g, " "))
        }
        function d(e) {
            return L.replace("{{reference}}", e.reference || "").replace("{{version}}", e.version || "").replace("{{content}}", e.content || "").replace("{{footer}}", e.footer || "").replace("{{socialContent}}", e.socialContent || "")
        }
        function h() {
            return null !== y
        }
        function p(e, t) {
            var r = n.createElement("div", {
                className: o.classNames.tooltip + " " + e.tooltipStyle + " " + (e.includeDropShadow ? o.classNames.tooltipDropShadow : "") + " " + (e.includeRoundedCorners ? o.classNames.tooltipRoundedCorners : ""),
                onmouseover: T,
                onmouseout: g
            });
            return r.innerHTML = d(t),
            r
        }
        function u(r, i, a) {
            function l() {
                var o, i, l, c = a.socialSharing.length;
                for (i = 0; c > i; i++)
                    if (l = a.socialSharing[i],
                    e.socialSharing.hasOwnProperty(l)) {
                        var h = a.customStyle && a.customStyle.heading && a.customStyle.heading.iconStyle
                          , p = h || a.tooltipStyle;
                        o = n.createElement("a", {
                            className: "rtTooltipSocialIcon " + p,
                            id: e.socialSharing[l].id,
                            href: e.socialSharing[l].link + encodeURIComponent(r.url),
                            title: s.tooltip.shareOn + e.socialSharing[l].title,
                            target: "_blank",
                            rel: "noopener",
                            innerHTML: " "
                        }),
                        a.enableSharingPopups && (o.setAttribute("data-window-settings", e.socialSharing[l].windowSettings),
                        o.addEventListener && o.addEventListener("click", function() {
                            t.open(this.href, "", this.getAttribute("data-window-settings"))
                        }, !1)),
                        d.appendChild(o)
                    }
                return d.outerHTML
            }
            var d = n.createElement("div", {
                className: "rtTooltipSocial"
            })
              , h = c(i.reference, i.version, i.bibleReader)
              , p = {
                reference: "",
                version: "",
                content: "",
                footer: "",
                socialContent: ""
            };
            return r ? (p.content = r.content,
            p.footer = '<a class="' + o.classNames.tooltipMoreLink + '" href="' + h + '" target="_blank" rel="noopener">' + s.tooltip.more + "</a>",
            p.reference = r.reference,
            p.version = "(" + r.version + ")",
            a.socialSharing && a.socialSharing.length && (p.socialContent = l())) : (p.content = "<p>" + s.tooltip.errorBody + "</p>",
            p.reference = s.tooltip.errorHeader),
            p
        }
        function f(e, o, i) {
            var a, c, h, f, g = {
                tooltipOffsetX: 15,
                tooltipOffsetY: 25,
                tooltipEdgePadding: 10,
                elementLocation: n.getElementAbsoluteOffset(e),
                windowSize: n.getWindowSize()
            };
            if (i)
                for (a in g)
                    i.hasOwnProperty(a) && (g[a] = i[a]);
            y && b(),
            c = p(i, {
                reference: s.tooltip.loading
            }),
            c.addEventListener && c.addEventListener("touchstart", function(e) {
                e.stopPropagation()
            }, !1),
            f = c.offsetHeight,
            t.document.body.appendChild(c),
            h = l(g.windowSize, g.elementLocation, g, c.offsetWidth, c.offsetHeight),
            c = n.applyStyles(c, {
                position: "absolute",
                top: h.y + "px",
                left: h.x + "px",
                zIndex: "9999999"
            }),
            r.getPassage(o.reference, o.version, o.bibleReader, function(e) {
                var t = u(e, o, i);
                c.innerHTML = d(t),
                c.offsetHeight > f && (h = l(g.windowSize, g.elementLocation, g, c.offsetWidth, c.offsetHeight),
                c = n.applyStyles(c, {
                    top: h.y + "px",
                    left: h.x + "px"
                }))
            }),
            y = c
        }
        function g() {
            var t = y;
            k[t] || (k[t] = setTimeout(function() {
                m(t)
            }, e.removeTooltipDelay))
        }
        function m(e) {
            v(e),
            e && e.parentNode && e.parentNode.removeChild(e),
            e === y && (y = null)
        }
        function b() {
            m(y)
        }
        function T() {
            v(y)
        }
        function v(e) {
            t.clearTimeout(k[y]),
            delete k[e]
        }
        var k = {}
          , y = null
          , L = a.replace("{{tooltipContainer}}", o.classNames.tooltipContainer).replace("{{tooltipHeader}}", o.classNames.tooltipHeader).replace("{{tooltipBody}}", o.classNames.tooltipBody).replace("{{tooltipFooter}}", o.classNames.tooltipFooter).replace("{{tooltipBrandLink}}", o.classNames.tooltipBrandLink).replace("{{tooltipMoreLink}}", o.classNames.tooltipMoreLink).replace("{{brandMessage1}}", s.tooltip.brandMessage1).replace("{{tooltipLogosIcon}}", o.classNames.tooltipLogosIcon).replace("{{brandMessage2}}", s.tooltip.brandMessage2).replace("{{brandSite}}", e.brandSite);
        return {
            create: f,
            remove: g,
            cancelRemove: T,
            reset: b,
            isTooltipOpen: h,
            generateLink: c,
            getTooltipDiv: p,
            getTooltipContentsFromPassage: u
        }
    }),
    o("nls/continuationPhrases", {
        phrases: ["and", "or", "&", "&amp;"]
    }),
    o("nls/referenceRegexesCore", {
        seriesBookRegExp: "(?:(C(?:h(?:r(?:on(?:icles)?)?)?|o(?:r(?:inthians)?)?)|E(?:s(?:d(?:r(?:as)?)?)?|z(?:r(?:a)?)?)|J(?:hn|n|o(?:h(?:n)?)?)?|K(?:efa|g(?:dms|s)|i(?:n(?:g(?:doms|s))?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|P(?:e(?:t(?:er)?)?|t)?|S(?:a(?:m(?:uel)?)?|m)?|T(?:h(?:es(?:s(?:alonians)?)?)?|i(?:m(?:othy)?)?)|Yochanan|nd\\s(?:C(?:h(?:r(?:on(?:icles)?)?)?|o(?:r(?:inthians)?)?)|Es(?:d(?:r(?:as)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|P(?:e(?:t(?:er)?)?|t)?|S(?:a(?:m(?:uel)?)?|m)?|T(?:h(?:es(?:s(?:alonians)?)?)?|i(?:m(?:othy)?)?))|rd\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|st\\s(?:C(?:h(?:r(?:on(?:icles)?)?)?|o(?:r(?:inthians)?)?)|Es(?:d(?:r(?:as)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|P(?:e(?:t(?:er)?)?|t)?|S(?:a(?:m(?:uel)?)?|m)?|T(?:h(?:es(?:s(?:alonians)?)?)?|i(?:m(?:othy)?)?))|th\\s(?:Ez(?:r(?:a)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)))",
        singleChapterBookRegExp: "(?:('Ovadyah|Ob(?:ad(?:iah)?)?|ʿOvadyah|‘Ovadyah)|(Azariah|Pr(?:\\sAz|Azar|ayer\\sof\\sAzariah)|S(?:gThree|ong(?:\\s(?:Thr|of\\s(?:Thr(?:ee(?:\\s(?:Children|Jews|Youths))?)?|the\\sThree\\sHoly\\sChildren))|Thr))|The\\sSong\\sof\\s(?:Three\\s(?:Jews|Youths)|the\\sThree\\sHoly\\sChildren))|(Sus(?:anna)?)|(Bel(?:\\sand\\sthe\\sDragon)?)|(P(?:Ma|r(?:\\s(?:Man|of\\sMan)|Man|ayer\\sof\\sManasse(?:h|s))))|(Add(?:\\sPs(?:alm)?|itional\\sPsalm)|Ps(?:\\s151|151|a(?:\\s151|151|lm(?:\\s151|151|s(?:\\s151|151)))|lm(?:\\s151|151)|m(?:\\s151|151)|s(?:\\s151|151))|ψ(?:\\s151|151))|(Ep(?:\\sLao(?:d)?|Lao|ist(?:\\sLaodiceans|le\\s(?:Laodiceans|to\\s(?:Laodiceans|the\\sLaodiceans))))|Laod(?:iceans)?)|(P(?:h(?:ile(?:m(?:on)?)?|lm|m)|m))|(2(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|nd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|II(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Second\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(3(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|rd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|III(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Third\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(J(?:d|ud(?:e)?)|Y(?:'hudah|ʾhudah|’hudah)))",
        standardBookRegExp: "((B(?:'resheet|ʾresheet|’resheet)|G(?:e(?:n(?:esis)?)?|n))|(Ex(?:o(?:d(?:us)?)?)?|Sh(?:'mot|ʾmot|’mot))|(L(?:e(?:v(?:iticus)?)?|v)|Vayikra)|(B(?:'midbar|ʾmidbar|’midbar)|N(?:b|m|u(?:m(?:b(?:ers)?)?)?))|(D(?:'varim|e(?:ut(?:eronomy)?)?|t|ʾvarim|’varim))|(J(?:os(?:h(?:ua)?)?|sh)|Y(?:'hoshua|ʾhoshua|’hoshua))|(J(?:dg(?:s)?|g|udg(?:es)?)|Shof(?:'tim|ʾtim|’tim))|(R(?:th|u(?:t(?:h)?)?))|(1(?:\\s(?:K(?:gdms|ingdoms)|S(?:a(?:m(?:uel)?)?|m)?)|S(?:a(?:m(?:uel)?)?|m)?|st\\sS(?:a(?:m(?:uel)?)?|m)?)|First\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|I(?:\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|S(?:am(?:uel)?|m))|Sh(?:'mu'el\\sAlef|ʾmuʾel\\sAlef|’mu’el\\sAlef))|(2(?:\\s(?:K(?:gdms|ingdoms)|S(?:a(?:m(?:uel)?)?|m)?)|S(?:a(?:m(?:uel)?)?|m)?|nd\\sS(?:a(?:m(?:uel)?)?|m)?)|II(?:\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|S(?:a(?:m(?:uel)?)?|m)?)|S(?:econd\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|h(?:'mu'el\\sBet|ʾmuʾel\\sBet|’mu’el\\sBet)))|(1(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|st\\sK(?:gs|i(?:n(?:gs)?)?)?)|3\\sK(?:gdms|ingdoms)|First\\sK(?:gs|i(?:n(?:gs)?)?)?|I(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|II\\sKingdoms|K(?:gs|i(?:n(?:gs)?)?)?)|M(?:'lakhim\\sAlef|ʾlakhim\\sAlef|’lakhim\\sAlef)|Third\\sKingdoms)|(2(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|nd\\sK(?:gs|i(?:n(?:gs)?)?)?)|4\\sK(?:gdms|ingdoms)|Fourth\\sKingdoms|I(?:I(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|II\\sKingdoms|K(?:gs|i(?:n(?:gs)?)?)?)|V\\sKingdoms)|M(?:'lakhim\\sBet|ʾlakhim\\sBet|’lakhim\\sBet)|Second\\sK(?:gs|i(?:n(?:gs)?)?)?)|(1(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?|st\\sCh(?:r(?:on(?:icles)?)?)?)|Divrei-HaYamim\\sAlef|First\\sCh(?:r(?:on(?:icles)?)?)?|I(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?))|(2(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?|nd\\sCh(?:r(?:on(?:icles)?)?)?)|Divrei-HaYamim\\sBet|II(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?)|Second\\sCh(?:r(?:on(?:icles)?)?)?)|('Ezra|Ez(?:r(?:a)?)?|ʿEzra|‘Ezra)|(Ne(?:chemyah|h(?:em(?:iah)?)?)?)|(Es(?:t(?:er|h(?:er)?)?)?)|(Iyov|J(?:b|ob))|(Ps(?:a(?:lm(?:s)?)?|lm|m|s)?|Tehillim|ψ)|(Mishlei|Pr(?:o(?:v(?:erbs)?)?|v)?)|(Ec(?:c(?:l(?:es(?:iastes)?)?)?)?|Kohelet|Qoh(?:eleth)?)|(Cant(?:\\.|icle(?:\\sof\\sCanticles|s))?|S(?:OS|S|hir-HaShirim|o(?:ng(?:\\sof\\sSo(?:l(?:omon)?|ngs))?)?))|(Is(?:a(?:i(?:ah)?)?)?|Yesha(?:'yahu|ʿyahu|‘yahu))|(J(?:e(?:r(?:em(?:iah)?)?)?|r)|Yirmeyahu)|(Eikhah|La(?:m(?:entations)?)?)|(Ez(?:e(?:k(?:iel)?)?|k)|Yechezk(?:'el|ʾel|’el))|(D(?:a(?:n(?:i(?:'el|el|ʾel|’el))?)?|n))|(Ho(?:s(?:ea|hea)?)?)|(J(?:l|oe(?:l)?)|Yo(?:'el|ʾel|’el))|('Amos|Am(?:os)?|ʿAmos|‘Amos)|('Ovadyah|Ob(?:ad(?:iah)?)?|ʿOvadyah|‘Ovadyah)|(J(?:nh|on(?:ah)?)|Yonah)|(M(?:c|i(?:c(?:ah)?|khah)))|(Na(?:chum|h(?:um)?)?)|(H(?:a(?:b(?:akkuk)?|vakuk)|b))|(Tz(?:'fanyah|ʾfanyah|’fanyah)|Z(?:ep(?:h(?:aniah)?)?|p))|(H(?:ag(?:ai|gai)?|g))|(Z(?:'kharyah|c|ec(?:h(?:ariah)?)?|ʾkharyah|’kharyah))|(M(?:al(?:'akhi|achi|ʾakhi|’akhi)?|l))|(T(?:b|ob(?:it)?))|(J(?:dt(?:h)?|th|udith))|(A(?:Es|dd(?:\\sEs(?:th)?|\\.\\sEs(?:th)?|Esth|itions\\sto\\sEsther))|G(?:k(?:\\sEs(?:th)?|Es)|reek\\sEsther)|Rest\\sof\\sEsther|The\\sRest\\sof\\sEsther)|(W(?:is(?:d(?:\\sof\\sSol|\\.\\sof\\sSol|om(?:\\sof\\sSolomon)?))?|s))|(Ben\\sSira(?:h)?|Eccl(?:esiasticus|us)|Sir(?:a(?:ch|h)?)?|Wisdom\\sof\\sBen\\sSira(?:h)?)|(Bar(?:uch)?)|(Ep(?:\\sJer|Jer|ist(?:\\sJer|le\\s(?:Jeremiah|of\\sJeremiah)))|L(?:Je|et(?:\\sJer|Jer|ter\\sof\\sJeremiah)|tr\\sJer))|(Azariah|Pr(?:\\sAz|Azar|ayer\\sof\\sAzariah)|S(?:gThree|ong(?:\\s(?:Thr|of\\s(?:Thr(?:ee(?:\\s(?:Children|Jews|Youths))?)?|the\\sThree\\sHoly\\sChildren))|Thr))|The\\sSong\\sof\\s(?:Three\\s(?:Jews|Youths)|the\\sThree\\sHoly\\sChildren))|(Sus(?:anna)?)|(Bel(?:\\sand\\sthe\\sDragon)?)|(1(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|st\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|First\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|I(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?))|(2(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|nd\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|II(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|Second\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|(1(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?|st\\sEs(?:d(?:r(?:as)?)?)?)|First\\sEs(?:d(?:r(?:as)?)?)?|I(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?))|(P(?:Ma|r(?:\\s(?:Man|of\\sMan)|Man|ayer\\sof\\sManasse(?:h|s))))|(Add(?:\\sPs(?:alm)?|itional\\sPsalm)|Ps(?:\\s151|151|a(?:\\s151|151|lm(?:\\s151|151|s(?:\\s151|151)))|lm(?:\\s151|151)|m(?:\\s151|151)|s(?:\\s151|151))|ψ(?:\\s151|151))|(3(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|rd\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|III(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|Third\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|(2(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?|nd\\sEs(?:d(?:r(?:as)?)?)?)|4(?:\\sEz(?:r(?:a)?)?|Ez(?:r(?:a)?)?|th\\sEz(?:r(?:a)?)?)|Fourth\\sEz(?:r(?:a)?)?|I(?:I(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?|II(?:\\sEz(?:r(?:a)?)?|Ez(?:r(?:a)?)?))|V(?:\\sEz(?:r(?:a)?)?|Ez(?:r(?:a)?)?))|Second\\sEs(?:d(?:r(?:as)?)?)?)|(4(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|th\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|Fourth\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|I(?:III(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|V(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)))|(Ode(?:s)?)|(Ps(?:\\sSol(?:\\.|omon)?|\\.\\sSol(?:\\.|omon)?|Sol|alms\\sof\\sSol(?:\\.|omon)?|s(?:\\sSol(?:\\.|omon)?|\\.\\sSol(?:omon)?|Sol))|The\\sPsalms\\sof\\sSolomon)|(Ep(?:\\sLao(?:d)?|Lao|ist(?:\\sLaodiceans|le\\s(?:Laodiceans|to\\s(?:Laodiceans|the\\sLaodiceans))))|Laod(?:iceans)?)|(M(?:at(?:\\.|t(?:h(?:ew)?|ityahu)?)?|t))|(M(?:ar(?:k)?|k|r(?:k)?))|(L(?:k(?:e)?|u(?:k(?:e)?)?))|(J(?:hn|n(?:o)?|oh(?:n)?)|Yochanan)|(Ac(?:t(?:s)?)?)|(R(?:m|o(?:m(?:ans)?)?))|(1(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?|st\\sCo(?:r(?:inthians)?)?)|First\\sCo(?:r(?:inthians)?)?|I(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?))|(2(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?|nd\\sCo(?:r(?:inthians)?)?)|II(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?)|Second\\sCo(?:r(?:inthians)?)?)|(Ga(?:l(?:atians)?)?)|(Ep(?:h(?:es(?:ians)?)?)?)|(P(?:h(?:il(?:ippians)?|p)|p))|(Co(?:l(?:ossians)?)?)|(1(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?|st\\sTh(?:es(?:s(?:alonians)?)?)?)|First\\sTh(?:es(?:s(?:alonians)?)?)?|I(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?))|(2(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?|nd\\sTh(?:es(?:s(?:alonians)?)?)?)|II(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?)|Second\\sTh(?:es(?:s(?:alonians)?)?)?)|(1(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?|st\\sTi(?:m(?:othy)?)?)|First\\sTi(?:m(?:othy)?)?|I(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?))|(2(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?|nd\\sTi(?:m(?:othy)?)?)|II(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?)|Second\\sTi(?:m(?:othy)?)?)|(T(?:i(?:t(?:us)?)?|t))|(P(?:h(?:ile(?:m(?:on)?)?|lm|m)|m))|(He(?:b(?:r(?:ews)?)?)?|Messianic\\sJews)|(J(?:a(?:m(?:es)?|s)|m)|Ya(?:'akov|ʿakov|‘akov))|(1(?:\\s(?:Kefa|P(?:e(?:t(?:er)?)?|t)?)|P(?:e(?:t(?:er)?)?|t)?|st\\sP(?:e(?:t(?:er)?)?|t)?)|First\\sP(?:e(?:t(?:er)?)?|t)?|I(?:\\sP(?:e(?:t(?:er)?)?|t)?|P(?:e(?:t(?:er)?)?|t)?))|(2(?:\\s(?:Kefa|P(?:e(?:t(?:er)?)?|t)?)|P(?:e(?:t(?:er)?)?|t)?|nd\\sP(?:e(?:t(?:er)?)?|t)?)|II(?:\\sP(?:e(?:t(?:er)?)?|t)?|P(?:e(?:t(?:er)?)?|t)?)|Second\\sP(?:e(?:t(?:er)?)?|t)?)|(1(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|st\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|First\\sJ(?:hn|n|o(?:h(?:n)?)?)?|I(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?))|(2(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|nd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|II(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Second\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(3(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|rd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|III(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Third\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(J(?:d|ud(?:e)?)|Y(?:'hudah|ʾhudah|’hudah))|(R(?:e(?:v(?:elation)?)?|v)|The\\sRevelation))",
        abbreviations: ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kings", "2 Kings", "1 Chron", "2 Chron", "Ezra", "Neh", "Esther", "Job", "Ps", "Prov", "Eccles", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Micah", "Nah", "Hab", "Zeph", "Haggai", "Zech", "Mal", "Tobit", "Jdth", "Gk Esth", "Wis", "Sirach", "Baruch", "Let Jer", "Song of Three", "Susanna", "Bel", "1 Macc", "2 Macc", "1 Esdr", "Pr of Man", "Ps 151", "3 Macc", "2 Esdr", "4 Macc", "Odes", "Ps Solomon", "Laodiceans", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Philem", "Heb", "James", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev"],
        singleChapterIndexes: [30, 46, 47, 48, 52, 53, 59, 77, 83, 84, 85]
    }),
    o("referenceRegexes", ["versions", "nls/continuationPhrases", "nls/referenceRegexesCore"], function(e, t, o) {
        return {
            chapterReferenceRegExp: "\\b\\s\\d+(?![\\.:])\\b",
            referenceQuickTest: "((\\d{1,3})(?:(?:\\s?\\:\\s?|\\.)(\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?))?)|" + o.singleChapterBookRegExp,
            referenceRegExp: "(\\W|^)(" + o.standardBookRegExp + "(?:\\.?\\s*(\\d{1,3})(?:(?:\\s?\\:\\s?|\\.)(\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?))?(\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?((?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?(?!\\s*" + o.seriesBookRegExp + "(?:\\W)))?)|" + o.singleChapterBookRegExp + "\\s*\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?)([,.]?\\s?(?:" + e.supportedVersions.join("|") + ")|[,.]?\\s?[(](?:" + e.supportedVersions.join("|") + ")[)])?",
            bookContinuationRegExp: "^((?:(?:[,;\\.]+)?\\s?(?:" + t.phrases.join("|") + ")?)\\s*(?:(?:(?:cf|Cf|CF|cp|Cp|CP)[.,]?\\s?(?:v(?:v|ss?)?[.]?)?)[.,]?\\s*)?)((\\d{1,3})(?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?)?)",
            chapterContinuationRegExp: "^((?:(?:[,;\\.]+)?\\s?(?:" + t.phrases.join("|") + ")?)\\s*(?:(?:(?:cf|Cf|CF|cp|Cp|CP)[.,]?\\s?(?:v(?:v|ss?)?[.]?)?)[.,]?\\s*)?)(\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?)(?!\\s*" + o.seriesBookRegExp + "(?=\\W|\\d|$))",
            abbreviations: o.abbreviations,
            singleChapterIndexes: o.singleChapterIndexes
        }
    }),
    o("util/color", {
        hexToRgb: function(e) {
            return e ? {
                r: parseInt(e.slice(1, 3), 16),
                g: parseInt(e.slice(3, 5), 16),
                b: parseInt(e.slice(5, 7), 16)
            } : null
        },
        rgbToHex: function(e) {
            function t(e) {
                var t = e.toString(16);
                return ("0" + t).substr(t.length - 1, 2)
            }
            return e ? "#" + t(e.r) + t(e.g) + t(e.b) : null
        },
        hslToRgb: function(e) {
            function t(e, t, o) {
                return 0 > o && (o += 1),
                o > 1 && (o -= 1),
                1 / 6 > o ? e + 6 * (t - e) * o : .5 > o ? t : 2 / 3 > o ? e + (t - e) * (2 / 3 - o) * 6 : e
            }
            var o, n, r, s, i, a = e.h, l = e.s, c = e.l;
            return 0 === l ? o = n = r = c : (s = .5 > c ? c * (1 + l) : c + l - c * l,
            i = 2 * c - s,
            o = t(i, s, a + 1 / 3),
            n = t(i, s, a),
            r = t(i, s, a - 1 / 3)),
            {
                r: Math.round(255 * o),
                g: Math.round(255 * n),
                b: Math.round(255 * r)
            }
        },
        rgbToHsl: function(e) {
            var t, o, n = e.r / 255, r = e.g / 255, s = e.b / 255, i = Math.max(n, r, s), a = Math.min(n, r, s), l = (i + a) / 2;
            if (i == a)
                t = o = 0;
            else {
                var c = i - a;
                switch (o = l > .5 ? c / (2 - i - a) : c / (i + a),
                i) {
                case n:
                    t = (r - s) / c + (s > r ? 6 : 0);
                    break;
                case r:
                    t = (s - n) / c + 2;
                    break;
                case s:
                    t = (n - r) / c + 4
                }
                t /= 6
            }
            return {
                h: t,
                s: o,
                l: l
            }
        }
    }),
    o("libs/text!css/default", [], function() {
        return ".rtTooltipHeader{font-family:Arial,Helvetica,serif}.rtTooltipBody{font-family:Helvetica,Arial,serif}.rtTooltipBody .ch-ref{font-weight:700}.rtTooltipFooter{font-family:Helvetica,Arial,serif}.rtTooltipDropShadow .rtContainer{-webkit-box-shadow:0 0 6px 0 #444;-moz-box-shadow:0 0 6px 0 #444;box-shadow:0 0 6px 0 #444}.rtTooltipRoundedCorners .rtContainer{-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;overflow:hidden}.rtTooltipFooter a{font-family:Helvetica,Arial,serif;font-weight:400}.rtTooltipBrandLink a:hover,.rtTooltipBrandLink a:link,.rtTooltipBrandLink a:visited,.rtTooltipMoreLink:hover,.rtTooltipMoreLink:link,.rtTooltipMoreLink:visited{text-decoration:none}.rtLight .rtContainer{background:#fff}.rtLight .rtTooltipHeader{background:#e7e7e7;color:#333}.rtLight .rtTooltipBody{color:#666}.rtLight .rtTooltipBrandLink a:link,.rtLight .rtTooltipBrandLink a:visited{color:#ccc}.rtLight .rtTooltipBrandLink a:hover{color:#666}.rtLight .rtTooltipBrandLink .rtTooltipLogosIcon path{fill:#aaa}.rtLight .rtTooltipBrandLink a:hover .rtTooltipLogosIcon path{fill:#444}.rtLight .rtTooltipMoreLink:link,.rtLight .rtTooltipMoreLink:visited{color:#0080FF}.rtLight .rtTooltipMoreLink:hover{color:#66B2FF}.rtDark .rtContainer{background:#555}.rtDark .rtTooltipHeader{background:#888;color:#eee}.rtDark .rtTooltipBody{color:#fff}.rtDark .rtTooltipBrandLink a:link,.rtDark .rtTooltipBrandLink a:visited{color:#999}.rtDark .rtTooltipBrandLink a:hover{color:#eee}.rtDark .rtTooltipBrandLink .rtTooltipLogosIcon path{fill:#aaa}.rtDark .rtTooltipBrandLink a:hover .rtTooltipLogosIcon path{fill:#fff}.rtDark .rtTooltipMoreLink:link,.rtDark .rtTooltipMoreLink:visited{color:#fff}.rtDark .rtTooltipMoreLink:hover{color:#ccc}.rtTooltipSocialIcon{background:url(https://api.reftagger.com/v2/social-icons.png)}";
    }),
    o("libs/text!css/layout", [], function() {
        return ".rtTooltip{text-align:left;text-indent:0;width:400px;min-height:140px;z-index:99;max-width:100%}.rtTooltip div{text-align:left}.rtTooltipHeader{border:0;font-size:14px;font-weight:700;line-height:32px;height:32px;margin:0;padding:0 20px 0 15px}.rtTooltipBody{border:0;line-height:1.4;font-size:14px;margin:0;min-height:40px;padding:19px 20px 0 15px}.rtTooltipBody .ch-ref,.rtTooltipBody .verse-ref{font-size:85%;position:relative;top:-1px}.rtTooltipBody .font-style-italic{font-style:italic}.rtTooltipBody .font-style-normal{font-style:normal}.rtTooltipBody .font-caps-all-caps{text-transform:uppercase}.rtTooltipBody .font-caps-all-small-caps{text-transform:uppercase;font-variant:small-caps}.rtTooltipBody .font-caps-small-caps{font-variant:small-caps}.rtTooltipBody .font-caps-normal{text-transform:none;font-variant:normal}.rtTooltipFooter{border:0;font-size:14px;line-height:14px;letter-spacing:normal;padding:22px 32px 12px 15px;text-align:left}.rtTooltipFooter div{text-align:right}.rtTooltipFooter .rtTooltipMoreLink{float:right}.rtTooltipFooter .rtTooltipBrandLink{display:inline-block;margin-right:20px;font-size:10px;text-transform:uppercase}.rtTooltipFooter .rtTooltipBrandLink a{column-gap:4px;letter-spacing:1px;font-weight:600}.rtTooltipFooter .rtTooltipBrandLink .rtTooltipLogosIcon{vertical-align:-.4em}.rtTooltipSocial{float:right}.rtTooltip .rtTooltipSocialIcon{display:inline-block;margin-top:8px;height:19px;width:21px}.rtTooltip,.rtTooltip a,.rtTooltipBody p,.rtTooltipBody span{letter-spacing:normal;margin:0;padding:0}.rtLibronix img{float:none}.libronixLinkImage{border:0;float:none;margin:0 0 0 4px;padding:0}.rtTooltipSocialIcon#rtFacebook:hover{background-position:0 -95px}.rtTooltipSocialIcon#rtFacebook{background-position:0 -76px}.rtTooltipSocialIcon#rtTwitter:hover{background-position:0 -171px}.rtTooltipSocialIcon#rtTwitter{background-position:0 -152px}.rtTooltipSocialIcon.rtDark#rtFacebook:hover{background-position:0 -133px}.rtTooltipSocialIcon.rtDark#rtFacebook{background-position:0 -114px}.rtTooltipSocialIcon.rtDark#rtTwitter:hover{background-position:0 -209px}.rtTooltipSocialIcon.rtDark#rtTwitter{background-position:0 -190px}"
    }),
    o("cssLoader", ["util/classNames", "util/dom", "util/color", "libs/text!css/default", "libs/text!css/layout"], function(e, t, o, n, r) {
        "use strict";
        return {
            loadCss: function(s, i) {
                function a() {
                    var e = document.getElementById("rt-tooltip-styles");
                    e && e.parentElement.removeChild(e)
                }
                function l(t) {
                    function n(e) {
                        return e.split(";")[0]
                    }
                    function r(e) {
                        var t = /^#(\w{3}|\w{6})$/;
                        return t.test(e) ? e.replace(/^#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3") : (window.console && window.console.warn && window.console.warn("Invalid color value provided to Reftagger. Must be in hex format."),
                        "")
                    }
                    function s(e, t, o) {
                        var r, s, i = "\n" + e + "{";
                        for (r = 0,
                        s = o.length; s > r; r++)
                            t[o[r]] && (i += o[r].replace(/([A-Z])/g, "-$1").toLowerCase() + ":" + n(t[o[r]]) + " !important;");
                        return i + "}\n"
                    }
                    function i(e) {
                        var t = o.rgbToHsl(o.hexToRgb(r(e)));
                        return o.rgbToHex(o.hslToRgb({
                            h: t.h,
                            s: t.s,
                            l: Math.min(t.l + .2 * (t.l < .6 ? 1 : -1), 1)
                        }))
                    }
                    var a, l, c, d = "", h = ["backgroundColor", "fontSize", "lineHeight", "fontWeight", "color", "fontFamily"];
                    if (t.heading) {
                        if (a = r(t.heading.backgroundColor)) {
                            l = o.hexToRgb(a);
                            var p = (l.r + l.g + l.b) / 3 < 170;
                            t.heading.iconStyle = p ? "rtDark" : "rtLight"
                        }
                        d += s("." + e.classNames.tooltipHeader, t.heading, h)
                    }
                    return t.body && (d += s("." + e.classNames.tooltipBody + ", ." + e.classNames.tooltipFooter, t.body, h.slice(1)),
                    c = r(t.body.moreLink && t.body.moreLink.color),
                    c && (d += s("." + e.classNames.tooltipMoreLink, t.body.moreLink, ["color"]),
                    d += "\n." + e.classNames.tooltipMoreLink + ":hover{color:" + i(t.body.moreLink.color) + " !important}\n")),
                    d
                }
                var c = t.createElement("style", {
                    id: "rt-tooltip-styles",
                    type: "text/css",
                    nonce: i.nonce
                })
                  , d = r;
                i.cssOverride || 0 === window.location.hostname.toLowerCase().indexOf("theresurgence.com") || (d += n),
                i.customStyle && (d += l(i.customStyle)),
                c.styleSheet ? c.styleSheet.cssText = d : c.innerHTML = d,
                a(),
                s.insertBefore(c, s.firstChild)
            }
        }
    }),
    o("util/version", {
        version: 2
    }),
    o("util/settings", {
        getSettingsOrDefaults: function(e, t) {
            var o, n = {};
            if (e = e || window.refTagger && window.refTagger.settings)
                for (o in t)
                    t.hasOwnProperty(o) && (n[o] = void 0 !== e[o] ? e[o] : t[o]);
            return n
        }
    }),
    o("main", ["config", "root", "passageManager", "tooltips", "referenceRegexes", "cssLoader", "util/classNames", "util/version", "util/settings", "util/dom", "nls/resourceStrings"], function(e, t, o, n, r, s, i, a, l, c, d) {
        "use strict";
        function h(e) {
            return d.normalizeReference(e)
        }
        function p() {
            (new Image).src = [V, "://", e.loggerBaseUri, "?", "documentUrl=", encodeURIComponent(R.location), "&referenceCount=", +H.referenceCount, "&microreferenceCount=", +H.markedBibleReferenceCount, "&bibleVersion=", encodeURIComponent(F.bibleVersion), "&usesLibronixLinks=", !!F.addLogosLink, "&usesTooltips=", !!F.useTooltip, "&applicationVersion=", a.version, "&rand=", Math.random().toString().substring(10)].join("")
        }
        function u() {
            var e, t, o, n = /lbsRefTaggerPrefs=(?:((?:\w|\d){2,5})\.(true|false))/.exec(R.cookie), r = R.getElementById("lbsRefTaggerCP");
            if (n && (F.bibleVersion = n[1],
            F.addLogosLink = "true" === n[2]),
            null !== r) {
                for (e = R.getElementById("lbsVersion"),
                t = e.length,
                o = 0; t > o; o++)
                    if (e.options[o].outerText === (F.bibleVersion || "default").toUpperCase()) {
                        e.selectedIndex = o;
                        break
                    }
                F.addLogosLink && (R.getElementById("lbsUseLibronixLinks").checked = "true")
            }
        }
        function f(e) {
            var o;
            for (e = e || t.event,
            o = e.target || e.srcElement; "a" !== o.tagName.toLowerCase(); )
                o = o.parentNode;
            return o
        }
        function g(e) {
            var t = f(e);
            o.getPassage(t.getAttribute("data-reference"), t.getAttribute("data-version"), F.bibleReader)
        }
        function m(t) {
            function r() {
                n.create(i, a, {
                    enableSharingPopups: F.enableSharingPopups,
                    socialSharing: F.socialSharing,
                    tooltipStyle: "dark" === F.tooltipStyle ? "rtDark" : "rtLight",
                    includeDropShadow: F.dropShadow,
                    includeRoundedCorners: F.roundCorners
                })
            }
            var s = 20
              , i = f(t)
              , a = {
                reference: i.getAttribute("data-reference").replace(/\s/g, ""),
                version: i.getAttribute("data-version"),
                bibleReader: F.bibleReader
            };
            P = O ? setTimeout(r, 1) : setTimeout(function() {
                o.getPassage(a.reference, a.version, a.bibleReader),
                P = setTimeout(r, e.createTooltipDelay - s)
            }, s)
        }
        function b() {
            O || (t.clearTimeout(P),
            n.remove())
        }
        function T(e, t, n, r) {
            var s;
            e = h(e),
            t = o.getVersion(t || F.bibleVersion),
            s = v(R.createElement("a"), e, t),
            s.innerHTML = n,
            r.parentNode.insertBefore(s, r),
            F.addLogosLink && k(r, e.replace(/(\d)\s*(?:[a-z]|ff)(\W|$)|/g, "$1$2").replace(/\s+/g, "").replace(/[‒–—―]+/g, "-")),
            H.referenceCount++
        }
        function v(e, t, o) {
            return z.test(e.className) || (e.className += (e.className.length ? " " : "") + i.classNames.bibleRef),
            e.href = n.generateLink(t, o, F.bibleReader),
            e.setAttribute("data-reference", t),
            e.setAttribute("data-version", o),
            e.setAttribute("data-purpose", "bible-reference"),
            F.linksOpenNewWindow && (e.target = "_blank",
            e.rel = "noopener"),
            F.useTooltip && (e.addEventListener ? (e.addEventListener("mouseover", m, !1),
            e.addEventListener("mouseout", b, !1),
            e.addEventListener("touchstart", g, !1),
            e.addEventListener("click", function(e) {
                O && e.target !== n.openTooltipAnchor && (e.preventDefault(),
                n.openTooltipAnchor || m.call(this, e))
            }, !1)) : e.attachEvent && (e.attachEvent("onmouseover", m),
            e.attachEvent("onmouseout", b))),
            e
        }
        function k(e, t) {
            var o, n, r = F.logosBibleVersion || F.libronixBibleVersion, s = V + "://www.logos.com/images/Corporate/LibronixLink_" + ("light" === (F.libronixLinkIcon || F.logosLinkIcon).toLowerCase() ? "light" : "dark") + ".png", i = c.createElement("img", {
                src: s,
                border: 0,
                title: d.logosLinkTitle,
                className: "libronixLinkImage",
                align: "bottom"
            });
            t ? (n = "libronixdls:keylink|ref=[en]bible:" + t,
            r && "default" !== r.toLowerCase() && (n += "|res=LLS:" + r.toUpperCase()),
            o = c.createElement("a", {
                href: n,
                className: "rtLibronix"
            }),
            o.appendChild(i),
            e.parentNode.insertBefore(o, e)) : e.appendChild(i)
        }
        function y(e, t, o, n, s, i, a) {
            var l, d, p, u, f, g, m, b, k, L, x, R = !1, B = 0, N = F.bibleVersion, P = null, A = r.abbreviations, J = A.length;
            return o && (p = w.exec(e),
            p && (l = o,
            d = p[3],
            b = l + " " + p[2],
            g = p[1],
            f = e.substr(p.index + p[0].length))),
            n && !p && (p = E.exec(e),
            p && (l = o,
            d = n,
            b = i ? l + " " + p[2] : l + " " + d + ":" + p[2],
            R = I.test(b),
            g = p[1],
            f = e.substr(p.index + p[0].length))),
            !p && C.test(e) && (p = S.exec(e),
            p && (u = p.length,
            l = p[3],
            d = p[4 + J],
            b = p[2],
            k = p.indexOf(l, 4) - 4,
            L = A[k],
            -1 !== M.indexOf(k) ? (d = 1,
            R = !1) : R = I.test(b),
            g = e.substr(0, p.index) + p[1],
            f = e.substr(p.index + p[0].length),
            p[u - 1] && (P = p[u - 1],
            N = P.replace(/\W/g, "")))),
            p ? (m = p[0].substr((p[1] || "").length),
            R && !F.tagChapters ? (c.insertTextNode(g + m, t),
            B = y(f, t, null, null, N === F.bibleVersion ? null : N, !1)) : 155 >= d && (l = l || o,
            L = L || l,
            x = L + b.substr(l.length),
            a ? (N = N || F.bibleVersion,
            v(a, h(x), N)) : (c.insertTextNode(g, t),
            T(x, N, null === P ? p[2] : p[2] + P, t),
            B = y(f, t, l, d, N === F.bibleVersion ? null : N, R),
            B += F.addLogosLink ? 3 : 2))) : e !== t.nodeValue && (e && s != e && c.insertTextNode(e, t),
            t.parentNode.removeChild(t)),
            B
        }
        function L(e, t, o) {
            var n, r, s, i, a, l, c, d = (e.tagName || "").toLowerCase(), p = e.className && e.className.split ? e.className.split(" ") : [], u = e.href && e.href.toLowerCase ? e.href.toLowerCase() : "", f = p.length, g = 0, m = !1, b = /^libronixdls:/i, C = 0, S = 0;
            if (o = o || 0,
            o > J)
                return 0;
            for (s = 0; f > s; s++)
                if (D.noSearchClasses.hasOwnProperty(p[s].toLowerCase()))
                    return C;
            if (D.noSearchTags[d])
                return C;
            if (3 === e.nodeType)
                return C = y(e.nodeValue, e, null, null, null, !1, t);
            if (t = null,
            "a" === d) {
                if (b.test(e.href))
                    !F.appendIconToLibLinks && !F.appendIconToLogosLinks || e.lastChild && e.lastChild.tagName && "img" === e.lastChild.tagName.toLowerCase() || k(e, null);
                else if (z.test(e.className))
                    i = e.getAttribute("data-reference"),
                    a = e.getAttribute("data-version"),
                    i && v(e, h(i), a || F.bibleVersion);
                else if (/bibleref/i.test(e.className))
                    m = x(e, function(e, t, o) {
                        n = h(t),
                        v(e, n, o)
                    });
                else if (F.convertHyperlinks && 1 === e.childNodes.length && 3 === e.firstChild.nodeType)
                    for (F.hyperlinkTestList.length || (t = e),
                    l = F.hyperlinkTestList.length,
                    c = 0; l > c; c++)
                        if (-1 !== u.indexOf(F.hyperlinkTestList[c].toLowerCase())) {
                            t = e;
                            break
                        }
                if (null === t)
                    return C
            } else
                "cite" === d && -1 !== e.className.toLowerCase().indexOf("bibleref") && (m = x(e, function(e, t, o) {
                    T(t, o, e.innerHTML, e.firstChild),
                    e.removeChild(e.lastChild)
                }));
            if (!m)
                for (r = e.childNodes; S > g || g < (S = r ? r.length : 0); )
                    g += L(r[g], t, o + 1) + 1;
            return C
        }
        function x(e, t) {
            var o, n, r, s = !1;
            return H.markedBibleReferenceCount++,
            e.title && e.childNodes.length <= 1 && (o = /^([A-Z]{2,5})[\s:]/.exec(e.title),
            o ? (r = e.title.replace(o[1], "").trim(),
            n = o[1]) : (r = e.title,
            n = F.bibleVersion),
            t(e, r, n),
            s = !0),
            s
        }
        var C, S, w, E, I, M, R = t.document, B = R.body, N = R.getElementsByTagName("head")[0], P = null, A = !1, J = 200, H = {
            referenceCount: 0,
            markedBibleReferenceCount: 0
        }, O = !1, V = "https:" === R.location.protocol ? "https" : "http", z = new RegExp(i.classNames.bibleRef,"i"), F = {}, D = {
            lbsSavePrefs: function() {
                var e = R.getElementById("lbsRefTaggerCP")
                  , o = R.getElementById("lbsVersion")
                  , n = R.getElementById("lbsUseLibronixLinks")
                  , r = o ? o.value : "ESV"
                  , s = n ? !!n.checked : !1
                  , i = new Date;
                if (!e)
                    throw new Error("No Reftagger control panel found.");
                i.setFullYear(i.getFullYear() + 10),
                R.cookie = "lbsRefTaggerPrefs=" + r + "." + s + ";expires=" + i.toGMTString() + ";path=/",
                t.location.reload()
            },
            Init: function(t, o) {
                var i, a, c, d;
                if (!D.Initialized || o) {
                    for (F = l.getSettingsOrDefaults(t, e.defaultSettings),
                    R.addEventListener && R.addEventListener("touchstart", function(e) {
                        O = !0,
                        !z.test(e.target.className) && n.isTooltipOpen() && n.reset()
                    }, !1),
                    F.disableInlineCss || s.loadCss(N, F),
                    u(),
                    D.noSearchTags = {
                        textarea: !0,
                        input: !0,
                        script: !0
                    },
                    c = F.noSearchTagNames.length,
                    i = 0; c > i; i++)
                        d = F.noSearchTagNames[i],
                        D.noSearchTags[d] = !0;
                    for (D.noSearchClasses = [],
                    a = F.noSearchClassNames.length,
                    i = 0; a > i; i++)
                        D.noSearchClasses[F.noSearchClassNames[i].toLowerCase()] = !0;
                    C = new RegExp(r.referenceQuickTest,"i"),
                    S = new RegExp(r.referenceRegExp,F.caseInsensitive ? "i" : ""),
                    w = new RegExp(r.bookContinuationRegExp),
                    E = new RegExp(r.chapterContinuationRegExp,F.caseInsensitive ? "i" : ""),
                    I = new RegExp(r.chapterReferenceRegExp,"i"),
                    M = r.singleChapterIndexes,
                    D.Initialized = !0
                }
            },
            tag: function(e) {
                F.addLogosLink = F.addLogosLink || F.addLibronixDLSLink,
                D.Initialized || D.Init(),
                L(e || F.rootNode || B),
                A || (p(),
                A = !0)
            }
        };

        return D.init = D.Init,
        D.regexes = r,
        t.refTagger && t.refTagger.settings && t.refTagger.settings.tagAutomatically !== !1 && D.tag(),
        D
    }),
    t("main");
});



