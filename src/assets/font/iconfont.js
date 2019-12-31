!(function(l) {
  var e,
    d =
      '<svg><symbol id="iconsky-file" viewBox="0 0 1024 1024"><path d="M1021.296 798.414H2.704V196.24h942.8c41.92 0 75.944 33.596 75.944 74.992v527.182h-0.152zM639.288 196.24c0-69.44-56.96-125.682-127.286-125.682H2.706V196.24h636.58z" fill="#DB8916" ></path><path d="M129.992 630.586V253.534h764.02v377.052z" fill="#FFFFFF" ></path><path d="M1021.296 878.054V389.716c0-34.646-28.554-62.84-63.642-62.84H66.348c-35.088 0-63.642 28.194-63.642 62.84v488.188c0 42.746 35.086 77.54 78.528 77.54H942.92c43.29 0.15 78.378-34.644 78.378-77.39z" fill="#FFA818" ></path></symbol></svg>',
    t = (e = document.getElementsByTagName("script"))[
      e.length - 1
    ].getAttribute("data-injectcss");
  if (t && !l.__iconfont__svg__cssinject__) {
    l.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
        setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener("DOMContentLoaded", t, !1), e();
        };
        document.addEventListener("DOMContentLoaded", t, !1);
      }
    else
      document.attachEvent &&
        ((i = e),
        (o = l.document),
        (c = !1),
        (d = function() {
          try {
            o.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(d, 50);
          }
          n();
        })(),
        (o.onreadystatechange = function() {
          "complete" == o.readyState && ((o.onreadystatechange = null), n());
        }));
    function n() {
      c || ((c = !0), i());
    }
    var i, o, c, d;
  })(function() {
    var e, t, n, i, o, c;
    ((e = document.createElement("div")).innerHTML = d),
      (d = null),
      (t = e.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (n = t),
        (i = document.body).firstChild
          ? ((o = n), (c = i.firstChild).parentNode.insertBefore(o, c))
          : i.appendChild(n));
  });
})(window);
