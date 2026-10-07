/* hero.js - the MSX-DOS2 screen in the hero of the home page.
 *
 * Plays the screens in the JSON beside it, one after another: each
 * command is typed, then its output printed line by line, the way the
 * tools print it. "Adding", "Replacing" and "Extracting" lines count up
 * their percentage before OK, and a (Y/N) question waits and is answered.
 * Then the screen slides away and the next one comes in. The dots under
 * the screen choose one. While the pointer is over the screen, or it has
 * the focus, it does not move on to the next.
 * With "reduce motion" set, each screen is shown whole, without typing,
 * and the screens change without sliding.
 */
(function () {
  var fig = document.getElementById("carousel");
  if (!fig) return;
  var screens = JSON.parse(fig.querySelector(".screens").textContent);
  var pre = fig.querySelector("pre");
  var cap = fig.querySelector(".cap");
  var fmt = fig.querySelector(".fmt");
  var dots = fig.querySelectorAll(".dots button");
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HOLD = still ? 9000 : 4000;   // ms the finished screen stays
  var cur = 0, run = 0, hover = false;

  // Waits ms, unless a newer run has started; then the old one stops.
  function wait(ms, id) {
    return new Promise(function (ok, stop) {
      setTimeout(function () { id === run ? ok() : stop("old"); }, ms);
    });
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function span(cls, text) {
    var s = document.createElement("span");
    s.className = cls; s.textContent = text || "";
    pre.appendChild(s); return s;
  }
  function text(t) { var n = document.createTextNode(t); pre.appendChild(n); return n; }
  function scroll() { pre.parentNode.scrollTop = pre.parentNode.scrollHeight; }

  var cursor = document.createElement("span");
  cursor.className = "cursor";
  function park() { pre.appendChild(cursor); scroll(); }

  function pct(n) { return (n < 10 ? "  " : n < 100 ? " " : "") + n + "%"; }

  // Prints one line of output.
  async function line(l, id) {
    var m = /^(Adding|Replacing|Extracting) (.*) OK$/.exec(l);
    if (m && !/\\$/.test(m[2])) {          // a file, not a directory
      text(m[1] + " " + m[2] + " ");
      var n = text(pct(0)); park();
      var p = 0;
      while (p < 100) {
        await wait(rnd(60, 140), id);
        p = Math.min(100, p + Math.round(rnd(12, 45)));
        n.data = pct(p);
      }
      await wait(120, id);
      n.data = "OK";
    } else if ((m = /^(.*\(Y\/N\) )(Y|N)$/.exec(l))) {
      text(m[1]); park();
      await wait(1100, id);
      text(m[2]);
    } else {
      text(l);
    }
    text("\n"); park();
    await wait(m ? 90 : rnd(25, 55), id);
  }

  async function play(i, id) {
    var s = screens[i];
    pre.textContent = "";
    for (var k = 0; k < s.steps.length; k++) {
      var st = s.steps[k];
      span("pr", st.p);
      var c = span("cmd"); park();
      await wait(k ? 500 : 700, id);
      for (var j = 0; j < st.c.length; j++) {
        c.textContent += st.c[j]; park();
        await wait(rnd(45, 110), id);
      }
      await wait(380, id);
      text("\n"); park();
      await wait(250, id);
      var out = st.o.split("\n");
      for (var j = 0; j < out.length; j++) await line(out[j], id);
      text("\n");
    }
    span("pr", s.steps[0].p); park();
  }

  function show(i) {      // the whole screen at once
    var s = screens[i];
    pre.textContent = "";
    s.steps.forEach(function (st) {
      span("pr", st.p); span("cmd", st.c); text("\n" + st.o + "\n\n");
    });
    span("pr", s.steps[0].p); park();
  }

  function label(i) {
    cap.textContent = screens[i].caption;
    fmt.textContent = screens[i].format;
    dots.forEach(function (d, k) {
      if (k === i) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
    fig.style.setProperty("--hold", (HOLD / 1000) + "s");
  }

  async function go(i, first) {
    var id = ++run;
    try {
      if (!still && !first) {
        fig.classList.add("leaving");
        await wait(420, id);
      }
      cur = i; label(i);
      fig.classList.remove("leaving");
      fig.classList.remove("done");
      if (still) show(i); else await play(i, id);
      fig.classList.add("done");
      await wait(HOLD, id);
      while (hover) await wait(300, id);
      go((cur + 1) % screens.length);
    } catch (e) { if (e !== "old") throw e; }
  }

  dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); }); });
  function hold(on) { hover = on; fig.classList.toggle("paused", on); }
  fig.addEventListener("mouseenter", function () { hold(true); });
  fig.addEventListener("mouseleave", function () { hold(false); });
  fig.addEventListener("focusin", function () { hold(true); });
  fig.addEventListener("focusout", function () { hold(false); });

  fig.classList.add("live");
  go(0, true);
})();
