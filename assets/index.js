import { e as J, T as D, i as j } from "./chunk.js";
const A = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const n of s.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerpolicy && (s.referrerPolicy = o.referrerpolicy),
      o.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = a(o);
    fetch(o.href, s);
  }
};
A();
async function P() {
  var e = await fetch("https://tamilwordledb.herokuapp.com/allwords"),
    t = await e.json();
  (f = t.wordslist), (W = t.words);
}
async function $(e) {
  var t = await fetch("https://tamilwordledb.herokuapp.com/search?word=" + e, {
      method: "GET",
    }),
    a = await t.json();
  return a.valid === !0;
}
function C() {
  var e = new Date(),
    t = new Date(e.getFullYear(), 0, 0),
    a = e - t,
    r = 1e3 * 60 * 60 * 24,
    o = Math.floor(a / r);
  return f[o];
}
function y(e) {
  D({
    text: e,
    duration: 3e3,
    gravity: "top",
    position: "center",
    stopOnFocus: !0,
    style: { background: "white", color: "black", fontWeight: "bold" },
  }).showToast();
}
function b(e) {
  e.forEach((t) => {
    t.classList.add("shake"),
      t.addEventListener(
        "animationend",
        function () {
          t.classList.remove("shake");
        },
        { once: !0 }
      );
  });
}
function z() {
  var e = [];
  if (JSON.parse(localStorage.getItem("keyboard")))
    return (e = JSON.parse(localStorage.getItem("keyboard")).letters), e;
  for (
    i.forEach((s) => {
      e.includes(s) || e.push(s);
    });
    e.length < 26;

  ) {
    var t = f[Math.floor(Math.random() * f.length)];
    if (t.filter((n) => i.includes(n)).length != 0) {
      for (var a in t)
        if (!e.includes(t[a]))
          if (e.length < 26) e.push(t[a]);
          else break;
    }
  }
  let r = e
    .map((s) => ({ value: s, sort: Math.random() }))
    .sort((s, n) => s.sort - n.sort)
    .map(({ value: s }) => s);
  for (var o = [], a = 0; a < 26; a++) o.push(null);
  return (
    localStorage.setItem("keyboard", JSON.stringify({ letters: r, state: o })),
    r
  );
}
function G() {
  v(),
    setTimeout(() => {
      document.querySelector(".helper").style.opacity = 1;
    }, 10),
    (document.querySelector(".helper").style.display = "flex");
}
function K() {
  (document.querySelector(".helper").style.opacity = 0),
    setTimeout(() => {
      document.querySelector(".helper").style.display = "none";
    }, 500),
    JSON.parse(localStorage.getItem("tamilWordle")).status !== "Win" &&
      JSON.parse(localStorage.getItem("tamilWordle")).status !== "Lose" &&
      d();
}
function R(e) {
  var t = document.getElementById("helper-trans-switch"),
    a = document.querySelector(".contentcontainer"),
    r = document.getElementById("howtoplay");
  (a.style.opacity = 0),
    (r.style.opacity = 0),
    setTimeout(() => {
      t.checked
        ? ((a.innerHTML = re),
          (a.style.opacity = 1),
          (r.innerHTML =
            "\u0BB5\u0BBF\u0BA4\u0BBF\u0BAE\u0BC1\u0BB1\u0BC8\u0B95\u0BB3\u0BCD"),
          (r.style.opacity = 1))
        : ((a.innerHTML = q),
          (a.style.opacity = 1),
          (r.innerHTML = "How to play"),
          (r.style.opacity = 1));
    }, 500);
}
function F() {
  v(),
    setTimeout(() => {
      document.querySelector(".statistics").style.opacity = 1;
    }, 10),
    (document.querySelector(".statistics").style.display = "flex");
}
function Y() {
  (document.querySelector(".statistics").style.opacity = 0),
    setTimeout(() => {
      document.querySelector(".statistics").style.display = "none";
    }, 500),
    JSON.parse(localStorage.getItem("tamilWordle")).status !== "Win" &&
      JSON.parse(localStorage.getItem("tamilWordle")).status !== "Lose" &&
      d();
}
var l = (e) => ("0" + e).slice(-2);
function U() {
  setInterval(() => {
    var e = J(new Date()).getTime(),
      t = new Date().getTime(),
      a = e - t,
      r = Math.floor((a % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
      o = Math.floor((a % (1e3 * 60 * 60)) / (1e3 * 60)),
      s = Math.floor((a % (1e3 * 60)) / 1e3);
    document.querySelector(".clock").innerHTML = l(r) + ":" + l(o) + ":" + l(s);
  }, 1e3);
}
async function V() {
  var e = JSON.parse(localStorage.getItem("tamilWordle")),
    t = JSON.parse(localStorage.getItem("tamilWordleStats")).lastWinTimeTaken,
    a = new Date(),
    r = new Date(a.getFullYear(), 0, 0),
    o = a - r,
    s = 1e3 * 60 * 60 * 24,
    n = Math.floor(o / s),
    M = e["data-states"],
    B = e.gameState;
  if (e.status === "Win") var S = B.filter((c) => c !== "").length;
  if (e.status === "Lose") var S = "X";
  var m = `\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD Wordle ${n} ${S}/5 

Time Taken ${t}

`;
  if (
    (M.forEach((c) => {
      c != null &&
        c.forEach((H) => {
          switch (H) {
            case "correct":
              m += "\u{1F7E2}";
              break;
            case "incorrect":
              m += "\u26AA";
              break;
            case "incorrect-location":
              m += "\u{1F7E1}";
              break;
          }
        }),
        c != null &&
          (m += `
`);
    }),
    navigator.share &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))
  )
    try {
      await navigator.share({ text: m });
    } catch (c) {
      console.log(c);
    }
  else navigator.clipboard.writeText(m), y("Copied to clipboard");
}
function X(e) {
  var t = "<div class='overlayloader'><div class='spinner'></div></div>",
    a = JSON.parse(localStorage.getItem("keyboard")).state;
  for (let r in e)
    (t += `<button class="${
      a[r] != null ? a[r] + " key" : "key"
    }" data-key="${decodeURIComponent(e[r])}">${decodeURIComponent(
      e[r]
    )}</button>`),
      (r == 9 || r == 18) && (t += "<div class='space'></div>"),
      r == 18 && (t += '<button data-enter class="key special">Enter</button>');
  return (
    (t += `<button data-delete aria-label='Delete Key' class="key special">
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
  </svg>
  </button>`),
    t
  );
}
function I(e) {
  if (e.target.matches("[data-key]")) {
    T(e.target.dataset.key);
    return;
  }
  if (e.target.matches("[data-enter]")) {
    O();
    return;
  }
  if (e.target.matches("[data-delete]")) {
    E();
    return;
  }
}
function L(e) {
  if (e.key == "Backspace") {
    E();
    return;
  }
  if (e.key == "Enter") {
    O();
    return;
  }
  if (e.key.match(/^[a-z]$/)) {
    T(u[oe.indexOf(e.key.toLowerCase())]);
    return;
  }
}
function T(e) {
  if (g().length > 3) return;
  var t = JSON.parse(localStorage.getItem("timer"));
  t || localStorage.setItem("timer", JSON.stringify(new Date().getTime()));
  const a = p.querySelector(":not([data-letter])");
  (a.dataset.letter = e), (a.textContent = e), (a.dataset.state = "active");
}
function E() {
  const e = g()[g().length - 1];
  e != null &&
    ((e.textContent = ""), delete e.dataset.letter, delete e.dataset.state);
}
function Q(e, t, a, r) {
  const o = e.dataset.letter,
    s = N.querySelector(`[data-key="${o}"]`);
  setTimeout(() => {
    e.classList.add("reveal");
  }, (t * 500) / 2),
    e.addEventListener(
      "transitionend",
      () => {
        const n = JSON.parse(localStorage.getItem("keyboard"));
        e.classList.remove("reveal"),
          i[t] === o
            ? ((e.dataset.state = "correct"),
              s.classList.add("correct"),
              (n.state[u.indexOf(o)] = "correct"))
            : i.includes(o)
            ? ((e.dataset.state = "incorrect-location"),
              s.classList.add("incorrect-location"),
              (n.state[u.indexOf(o)] = "incorrect-location"))
            : ((e.dataset.state = "incorrect"),
              s.classList.add("incorrect"),
              (n.state[u.indexOf(o)] = "incorrect")),
          localStorage.setItem("keyboard", JSON.stringify(n)),
          t === i.length - 1 &&
            e.addEventListener(
              "transitionend",
              () => {
                d(), Z(r, a);
              },
              { once: !0 }
            );
      },
      { once: !0 }
    );
}
function k(e) {
  const t = JSON.parse(localStorage.getItem("tamilWordleStats"));
  t.played++, e === "win" ? (t.wins++, t.streak++) : (t.streak = 0);
  var a = j({
    start: JSON.parse(localStorage.getItem("timer")),
    end: new Date().getTime(),
  });
  a.hours > 0
    ? (t.lastWinTimeTaken =
        l(a.hours) + ":" + l(a.minutes) + ":" + l(a.seconds))
    : (t.lastWinTimeTaken = l(a.minutes) + ":" + l(a.seconds)),
    (document.getElementById("played").innerHTML = t.played),
    (document.getElementById("wins").innerHTML = t.wins),
    (document.getElementById("streaks").innerHTML = t.streak),
    (document.getElementById("timetaken").innerHTML = t.lastWinTimeTaken),
    localStorage.setItem("tamilWordleStats", JSON.stringify(t)),
    localStorage.removeItem("timer");
}
function h() {
  (document.querySelector(".statscontainer").style.display = "flex"),
    (document.querySelector(".statsbottombar").style.display = "flex"),
    (document.querySelector(".nostats").style.display = "none");
}
function Z(e, t) {
  var a = JSON.parse(localStorage.getItem("tamilWordle"));
  if (e.join("") === i.join("")) {
    y("You Win!"),
      _(t),
      v(),
      (a.status = "Win"),
      localStorage.setItem("tamilWordle", JSON.stringify(a)),
      k("win"),
      setTimeout(() => {
        h(), document.getElementById("statistics").click();
      }, 1500);
    return;
  }
  p.querySelectorAll(":not([data-letter])").length == 0 &&
    (y(i.join("")),
    (a.status = "Lose"),
    v(),
    k("lose"),
    setTimeout(() => {
      h(), document.getElementById("statistics").click();
    }, 1500)),
    localStorage.setItem("tamilWordle", JSON.stringify(a));
}
function _(e) {
  e.forEach((t, a) => {
    setTimeout(() => {
      t.classList.add("winAnimate"),
        t.addEventListener(
          "animationend",
          function () {
            t.classList.remove("winAnimate");
          },
          { once: !0 }
        );
    }, (a * 500) / 5);
  });
}
function ee(e) {
  var t = JSON.parse(localStorage.getItem("tamilWordle")),
    a = t.gameState.indexOf("");
  t.gameState[a] = e;
  var r = [];
  e.forEach((o, s) => {
    i[s] === o
      ? r.push("correct")
      : i.includes(o)
      ? r.push("incorrect-location")
      : r.push("incorrect");
  }),
    (t["data-states"][a] = r),
    (t.status = "Progress"),
    localStorage.setItem("tamilWordle", JSON.stringify(t));
}
async function O() {
  var e = document.querySelector(".overlayloader");
  v();
  const t = [...g()];
  if (t.length !== 4) {
    y("Not enough letters"), b(t), d();
    return;
  } else {
    var a = t.map((o) => o.dataset.letter);
    if (!W.includes(a.join(""))) {
      e.style.display = "flex";
      var r = await $(a.join(""));
      if (((e.style.display = "none"), !r)) {
        y("Not in word list"), b(t), d();
        return;
      }
    }
    ee(a),
      g().forEach((...o) => {
        Q(...o, a);
      });
  }
}
function d() {
  document.addEventListener("click", I),
    document.addEventListener("keydown", L);
}
function v() {
  document.removeEventListener("click", I),
    document.removeEventListener("keydown", L);
}
function w() {
  localStorage.removeItem("tamilWordle"), localStorage.removeItem("keyboard");
  var e = {
    gameState: ["", "", "", "", ""],
    "data-states": [null, null, null, null, null],
    status: "Initiated",
    answer: i,
    expires: String(new Date()).slice(0, 15),
  };
  if (
    (localStorage.setItem("tamilWordle", JSON.stringify(e)),
    !localStorage.getItem("tamilWordleStats"))
  ) {
    var t = { played: 0, wins: 0, streak: 0, lastWinTimeTaken: 0 };
    localStorage.setItem("tamilWordleStats", JSON.stringify(t)),
      (document.getElementById("played").innerHTML = t.played),
      (document.getElementById("wins").innerHTML = t.wins),
      (document.getElementById("streaks").innerHTML = t.streak);
  }
}
async function x(e) {
  return new Promise((t) => setTimeout(t, e));
}
function te() {
  var e = localStorage.getItem("mode");
  e === "light"
    ? (document.body.classList.add("darkmode"),
      document.querySelector(".modeSwitch").classList.remove("day"),
      document.querySelector(".moon").classList.remove("sun"),
      localStorage.setItem("mode", "dark"))
    : (document.querySelector(".modeSwitch").classList.add("day"),
      document.querySelector(".moon").classList.add("sun"),
      document.body.classList.remove("darkmode"),
      localStorage.setItem("mode", "light"));
}
function ae(e) {
  e === "dark"
    ? (document.body.classList.add("darkmode"),
      document.querySelector(".modeSwitch").classList.remove("day"),
      document.querySelector(".moon").classList.remove("sun"),
      localStorage.setItem("mode", "dark"))
    : (document.querySelector(".modeSwitch").classList.add("day"),
      document.querySelector(".moon").classList.add("sun"),
      document.body.classList.remove("darkmode"),
      localStorage.setItem("mode", "light"));
}
var f = [],
  W = [],
  i,
  u;
const oe = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ],
  q = `<p>
Guess the WORDLE in five tries. <br />
<br />
Each guess must be a valid four-letter tamil word.Hit the enter
button to submit.<br />
<br />
After each guess, the color of the tiles will change to show how
close your guess was to the word.
<div style="border-bottom: 1px solid #3a3a3c;  margin:10px;"></div>

<strong>Examples 
</strong> 
<div class="example"> 
<div class="box helperbox"  data-state="correct">\u0B9A\u0BBF</div>
<div class="box helperbox" >\u0B99\u0BCD</div>
<div class="box helperbox" >\u0B95</div>
<div class="box helperbox" >\u0BAE\u0BCD</div>
</div>

The letter <strong>\u0B9A\u0BBF</strong> is in the word and in the correct spot.

<div class="example"> 
<div class="box helperbox" >\u0BB5\u0BBF</div>
<div class="box helperbox" data-state="incorrect-location">\u0BB5</div>
<div class="box helperbox" >\u0B9A\u0BBE</div>
<div class="box helperbox" >\u0BAF\u0BBF</div>
</div>
The letter <strong>\u0BB5</strong> is in the word but in the wrong spot.

<div class="example"> 
<div class="box helperbox" >\u0B9A</div>
<div class="box helperbox" >\u0B9F\u0BCD </div>
<div class="box helperbox" data-state="incorrect" >\u0B9F</div>
<div class="box helperbox" >\u0BAE\u0BCD</div>
</div>

The letter \u0B9F  is not in the word in any spot. 
<div style="border-bottom: 1px solid #3a3a3c; margin:10px;"></div>

<strong>
A new WORDLE will be available each day!
</strong>
</p>`,
  re = `
<p>
\u0B90\u0BA8\u0BCD\u0BA4\u0BC1 \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BC1\u0BAA\u0BBF\u0B9F\u0BBF\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. <br />
          <br />
          \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0B85\u0BA9\u0BC1\u0BAE\u0BBE\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0B92\u0BB0\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBE\u0B95\u0BC1\u0BAE\u0BCD.<br />
          <br />
          \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAA\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD, \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0B9F\u0BCD\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BB5\u0BA3\u0BCD\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1\u0BB5\u0BBE\u0BB1\u0BC1 \u0BAE\u0BBE\u0BB1\u0BC1\u0BAE\u0BCD.
          <div style="border-bottom: 1px solid #3a3a3c;  margin:10px;"></div>
          
          <strong>\u0B89\u0BA4\u0BBE\u0BB0\u0BA3\u0BAE\u0BBE\u0B95 
          </strong> 
          <div class="example"> 
            <div class="box helperbox"  data-state="correct">\u0B9A\u0BBF</div>
            <div class="box helperbox" >\u0B99\u0BCD</div>
            <div class="box helperbox" >\u0B95</div>
            <div class="box helperbox" >\u0BAE\u0BCD</div>
          </div>
            
          <strong>\u0B9A\u0BBF</strong> \u0B8E\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1, \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BBF\u0B95\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0B87\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.
        
          <div class="example"> 
            <div class="box helperbox" >\u0BB5\u0BBF</div>
            <div class="box helperbox" data-state="incorrect-location">\u0BB5</div>
            <div class="box helperbox" >\u0B9A\u0BBE</div>
            <div class="box helperbox" >\u0BAF\u0BBF</div>
          </div>
          <strong>\u0BB5</strong> \u0B8E\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1; \u0B86\u0BA9\u0BBE\u0BB2\u0BCD, \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B87\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.

          <div class="example"> 
            <div class="box helperbox" >\u0B9A</div>
            <div class="box helperbox" >\u0B9F\u0BCD </div>
            <div class="box helperbox" data-state="incorrect" >\u0B9F</div>
            <div class="box helperbox" >\u0BAE\u0BCD</div>
          </div>
          
          <strong>\u0B9F</strong> \u0B8E\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. 
          <div style="border-bottom: 1px solid #3a3a3c; margin:10px;"></div>

          <strong>
          \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC1 \u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD..!
          </strong>
        </p>
`,
  g = () => p.querySelectorAll('[data-state="active"]'),
  N = document.querySelector(".keyboard"),
  p = document.querySelector(".gamegrid");
async function se() {
  if (
    (await P(),
    (i = C()),
    (document.getElementById("helperButton").onclick = G),
    (document.getElementById("hideHelper").onclick = K),
    (document.querySelector(".contentcontainer").innerHTML = q),
    (document.getElementById("helper-trans-switch").onclick = R),
    (document.getElementById("statistics").onclick = F),
    (document.getElementById("hideStatistics").onclick = Y),
    (document.querySelector(".share").onclick = V),
    (document.querySelector(".modeSwitch").onclick = te),
    localStorage.getItem("tamilWordle"))
  ) {
    var e = JSON.parse(localStorage.getItem("tamilWordle"));
    if (e.expires !== String(new Date()).slice(0, 15)) w(), d();
    else {
      var t = JSON.parse(localStorage.getItem("tamilWordleStats"));
      (document.getElementById("played").innerHTML = t.played),
        (document.getElementById("wins").innerHTML = t.wins),
        (document.getElementById("streaks").innerHTML = t.streak),
        (document.getElementById("timetaken").innerHTML = t.lastWinTimeTaken),
        e.gameState.forEach(async (a, r) => {
          e.gameState[r] !== "" &&
            e.gameState[r].forEach(async (o, s) => {
              var n = p.querySelector(":not([data-letter])");
              (n.dataset.letter = o),
                await x(100 * (s + 1)),
                n.classList.add("reveal"),
                await x(200 * (s + 1)),
                (n.dataset.state = e["data-states"][r][s]),
                (n.innerHTML = o),
                n.classList.remove("reveal");
            });
        }),
        (e.status === "Progress" || e.status === "Initiated") &&
          (console.log("Game Initiated"), d()),
        (e.status === "Win" || e.status === "Lose") &&
          setTimeout(() => {
            document.getElementById("statistics").click();
          }, 1500);
    }
  } else document.getElementById("helperButton").click(), w();
  (u = z()),
    (N.innerHTML = X(u)),
    U(),
    JSON.parse(localStorage.getItem("tamilWordleStats")).played === 0
      ? ((document.querySelector(".statscontainer").style.display = "none"),
        (document.querySelector(".statsbottombar").style.display = "none"),
        (document.querySelector(".nostats").style.display = "flex"))
      : h();
}
localStorage.getItem("mode")
  ? ae(localStorage.getItem("mode"))
  : localStorage.setItem("mode", "dark");
se();
