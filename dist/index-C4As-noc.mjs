import * as E from "react";
import L, { useRef as _, useCallback as V, useEffect as ie, useState as X, useMemo as G, useLayoutEffect as Tn, useContext as oe, createContext as se, forwardRef as Ri, Fragment as be, isValidElement as Ci, cloneElement as Ii, createElement as Pi, useId as Ee, useReducer as Ai, useSyncExternalStore as Fi } from "react";
import * as Pt from "react-dom";
import Mi, { createPortal as Uo, flushSync as ye } from "react-dom";
var Go = { exports: {} }, jt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Li = L, Di = Symbol.for("react.element"), ki = Symbol.for("react.fragment"), Ni = Object.prototype.hasOwnProperty, ji = Li.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, _i = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ko(e, n, t) {
  var o, r = {}, i = null, l = null;
  t !== void 0 && (i = "" + t), n.key !== void 0 && (i = "" + n.key), n.ref !== void 0 && (l = n.ref);
  for (o in n) Ni.call(n, o) && !_i.hasOwnProperty(o) && (r[o] = n[o]);
  if (e && e.defaultProps) for (o in n = e.defaultProps, n) r[o] === void 0 && (r[o] = n[o]);
  return { $$typeof: Di, type: e, key: i, ref: l, props: r, _owner: ji.current };
}
jt.Fragment = ki;
jt.jsx = Ko;
jt.jsxs = Ko;
Go.exports = jt;
var P = Go.exports, cn = {}, eo = Mi;
cn.createRoot = eo.createRoot, cn.hydrateRoot = eo.hydrateRoot;
const qo = typeof document < "u" ? L.useLayoutEffect : () => {
};
function Hi(e) {
  const n = _(null);
  return qo(() => {
    n.current = e;
  }, [
    e
  ]), V((...t) => {
    const o = n.current;
    return o == null ? void 0 : o(...t);
  }, []);
}
const _e = (e) => {
  var n;
  return (n = e == null ? void 0 : e.ownerDocument) !== null && n !== void 0 ? n : document;
}, We = (e) => e && "window" in e && e.window === e ? e : _e(e).defaultView || window;
function Bi(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && typeof e.nodeType == "number";
}
function Wi(e) {
  return Bi(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
let zi = !1;
function Rn() {
  return zi;
}
function Yo(e, n) {
  if (!Rn()) return n && e ? e.contains(n) : !1;
  if (!e || !n) return !1;
  let t = n;
  for (; t !== null; ) {
    if (t === e) return !0;
    t.tagName === "SLOT" && t.assignedSlot ? t = t.assignedSlot.parentNode : Wi(t) ? t = t.host : t = t.parentNode;
  }
  return !1;
}
const dn = (e = document) => {
  var n;
  if (!Rn()) return e.activeElement;
  let t = e.activeElement;
  for (; t && "shadowRoot" in t && (!((n = t.shadowRoot) === null || n === void 0) && n.activeElement); ) t = t.shadowRoot.activeElement;
  return t;
};
function Xo(e) {
  return Rn() && e.target.shadowRoot && e.composedPath ? e.composedPath()[0] : e.target;
}
function Vi(e) {
  var n;
  return typeof window > "u" || window.navigator == null ? !1 : ((n = window.navigator.userAgentData) === null || n === void 0 ? void 0 : n.brands.some((t) => e.test(t.brand))) || e.test(window.navigator.userAgent);
}
function Ui(e) {
  var n;
  return typeof window < "u" && window.navigator != null ? e.test(((n = window.navigator.userAgentData) === null || n === void 0 ? void 0 : n.platform) || window.navigator.platform) : !1;
}
function Zo(e) {
  let n = null;
  return () => (n == null && (n = e()), n);
}
const Gi = Zo(function() {
  return Ui(/^Mac/i);
}), Ki = Zo(function() {
  return Vi(/Android/i);
});
function Qo() {
  let e = _(/* @__PURE__ */ new Map()), n = V((r, i, l, s) => {
    let a = s != null && s.once ? (...u) => {
      e.current.delete(l), l(...u);
    } : l;
    e.current.set(l, {
      type: i,
      eventTarget: r,
      fn: a,
      options: s
    }), r.addEventListener(i, a, s);
  }, []), t = V((r, i, l, s) => {
    var a;
    let u = ((a = e.current.get(l)) === null || a === void 0 ? void 0 : a.fn) || l;
    r.removeEventListener(i, u, s), e.current.delete(l);
  }, []), o = V(() => {
    e.current.forEach((r, i) => {
      t(r.eventTarget, r.type, i, r.options);
    });
  }, [
    t
  ]);
  return ie(() => o, [
    o
  ]), {
    addGlobalListener: n,
    removeGlobalListener: t,
    removeAllGlobalListeners: o
  };
}
function qi(e) {
  return e.mozInputSource === 0 && e.isTrusted ? !0 : Ki() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Jo(e) {
  let n = e;
  return n.nativeEvent = e, n.isDefaultPrevented = () => n.defaultPrevented, n.isPropagationStopped = () => n.cancelBubble, n.persist = () => {
  }, n;
}
function Yi(e, n) {
  Object.defineProperty(e, "target", {
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    value: n
  });
}
function er(e) {
  let n = _({
    isFocused: !1,
    observer: null
  });
  qo(() => {
    const o = n.current;
    return () => {
      o.observer && (o.observer.disconnect(), o.observer = null);
    };
  }, []);
  let t = Hi((o) => {
    e == null || e(o);
  });
  return V((o) => {
    if (o.target instanceof HTMLButtonElement || o.target instanceof HTMLInputElement || o.target instanceof HTMLTextAreaElement || o.target instanceof HTMLSelectElement) {
      n.current.isFocused = !0;
      let r = o.target, i = (l) => {
        if (n.current.isFocused = !1, r.disabled) {
          let s = Jo(l);
          t(s);
        }
        n.current.observer && (n.current.observer.disconnect(), n.current.observer = null);
      };
      r.addEventListener("focusout", i, {
        once: !0
      }), n.current.observer = new MutationObserver(() => {
        if (n.current.isFocused && r.disabled) {
          var l;
          (l = n.current.observer) === null || l === void 0 || l.disconnect();
          let s = r === document.activeElement ? null : document.activeElement;
          r.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: s
          })), r.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: s
          }));
        }
      }), n.current.observer.observe(r, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    t
  ]);
}
let Xi = !1, bt = null, fn = /* @__PURE__ */ new Set(), pt = /* @__PURE__ */ new Map(), Ge = !1, pn = !1;
const Zi = {
  Tab: !0,
  Escape: !0
};
function Cn(e, n) {
  for (let t of fn) t(e, n);
}
function Qi(e) {
  return !(e.metaKey || !Gi() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function At(e) {
  Ge = !0, Qi(e) && (bt = "keyboard", Cn("keyboard", e));
}
function Je(e) {
  bt = "pointer", (e.type === "mousedown" || e.type === "pointerdown") && (Ge = !0, Cn("pointer", e));
}
function tr(e) {
  qi(e) && (Ge = !0, bt = "virtual");
}
function nr(e) {
  e.target === window || e.target === document || Xi || !e.isTrusted || (!Ge && !pn && (bt = "virtual", Cn("virtual", e)), Ge = !1, pn = !1);
}
function or() {
  Ge = !1, pn = !0;
}
function mn(e) {
  if (typeof window > "u" || typeof document > "u" || pt.get(We(e))) return;
  const n = We(e), t = _e(e);
  let o = n.HTMLElement.prototype.focus;
  n.HTMLElement.prototype.focus = function() {
    Ge = !0, o.apply(this, arguments);
  }, t.addEventListener("keydown", At, !0), t.addEventListener("keyup", At, !0), t.addEventListener("click", tr, !0), n.addEventListener("focus", nr, !0), n.addEventListener("blur", or, !1), typeof PointerEvent < "u" && (t.addEventListener("pointerdown", Je, !0), t.addEventListener("pointermove", Je, !0), t.addEventListener("pointerup", Je, !0)), n.addEventListener("beforeunload", () => {
    rr(e);
  }, {
    once: !0
  }), pt.set(n, {
    focus: o
  });
}
const rr = (e, n) => {
  const t = We(e), o = _e(e);
  n && o.removeEventListener("DOMContentLoaded", n), pt.has(t) && (t.HTMLElement.prototype.focus = pt.get(t).focus, o.removeEventListener("keydown", At, !0), o.removeEventListener("keyup", At, !0), o.removeEventListener("click", tr, !0), t.removeEventListener("focus", nr, !0), t.removeEventListener("blur", or, !1), typeof PointerEvent < "u" && (o.removeEventListener("pointerdown", Je, !0), o.removeEventListener("pointermove", Je, !0), o.removeEventListener("pointerup", Je, !0)), pt.delete(t));
};
function Ji(e) {
  const n = _e(e);
  let t;
  return n.readyState !== "loading" ? mn(e) : (t = () => {
    mn(e);
  }, n.addEventListener("DOMContentLoaded", t)), () => rr(e, t);
}
typeof document < "u" && Ji();
function ir() {
  return bt !== "pointer";
}
const el = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function tl(e, n, t) {
  let o = _e(t == null ? void 0 : t.target);
  const r = typeof window < "u" ? We(t == null ? void 0 : t.target).HTMLInputElement : HTMLInputElement, i = typeof window < "u" ? We(t == null ? void 0 : t.target).HTMLTextAreaElement : HTMLTextAreaElement, l = typeof window < "u" ? We(t == null ? void 0 : t.target).HTMLElement : HTMLElement, s = typeof window < "u" ? We(t == null ? void 0 : t.target).KeyboardEvent : KeyboardEvent;
  return e = e || o.activeElement instanceof r && !el.has(o.activeElement.type) || o.activeElement instanceof i || o.activeElement instanceof l && o.activeElement.isContentEditable, !(e && n === "keyboard" && t instanceof s && !Zi[t.key]);
}
function nl(e, n, t) {
  mn(), ie(() => {
    let o = (r, i) => {
      tl(!!(t != null && t.isTextInput), r, i) && e(ir());
    };
    return fn.add(o), () => {
      fn.delete(o);
    };
  }, n);
}
function ol(e) {
  let { isDisabled: n, onFocus: t, onBlur: o, onFocusChange: r } = e;
  const i = V((a) => {
    if (a.target === a.currentTarget)
      return o && o(a), r && r(!1), !0;
  }, [
    o,
    r
  ]), l = er(i), s = V((a) => {
    const u = _e(a.target), c = u ? dn(u) : dn();
    a.target === a.currentTarget && c === Xo(a.nativeEvent) && (t && t(a), r && r(!0), l(a));
  }, [
    r,
    t,
    l
  ]);
  return {
    focusProps: {
      onFocus: !n && (t || r || o) ? s : void 0,
      onBlur: !n && (o || r) ? i : void 0
    }
  };
}
function rl(e) {
  let { isDisabled: n, onBlurWithin: t, onFocusWithin: o, onFocusWithinChange: r } = e, i = _({
    isFocusWithin: !1
  }), { addGlobalListener: l, removeAllGlobalListeners: s } = Qo(), a = V((p) => {
    p.currentTarget.contains(p.target) && i.current.isFocusWithin && !p.currentTarget.contains(p.relatedTarget) && (i.current.isFocusWithin = !1, s(), t && t(p), r && r(!1));
  }, [
    t,
    r,
    i,
    s
  ]), u = er(a), c = V((p) => {
    if (!p.currentTarget.contains(p.target)) return;
    const m = _e(p.target), d = dn(m);
    if (!i.current.isFocusWithin && d === Xo(p.nativeEvent)) {
      o && o(p), r && r(!0), i.current.isFocusWithin = !0, u(p);
      let f = p.currentTarget;
      l(m, "focus", (h) => {
        if (i.current.isFocusWithin && !Yo(f, h.target)) {
          let v = new m.defaultView.FocusEvent("blur", {
            relatedTarget: h.target
          });
          Yi(v, f);
          let x = Jo(v);
          a(x);
        }
      }, {
        capture: !0
      });
    }
  }, [
    o,
    r,
    u,
    l,
    a
  ]);
  return n ? {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus: c,
      onBlur: a
    }
  };
}
let hn = !1, Zt = 0;
function il() {
  hn = !0, setTimeout(() => {
    hn = !1;
  }, 50);
}
function to(e) {
  e.pointerType === "touch" && il();
}
function ll() {
  if (!(typeof document > "u"))
    return typeof PointerEvent < "u" && document.addEventListener("pointerup", to), Zt++, () => {
      Zt--, !(Zt > 0) && typeof PointerEvent < "u" && document.removeEventListener("pointerup", to);
    };
}
function In(e) {
  let { onHoverStart: n, onHoverChange: t, onHoverEnd: o, isDisabled: r } = e, [i, l] = X(!1), s = _({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  ie(ll, []);
  let { addGlobalListener: a, removeAllGlobalListeners: u } = Qo(), { hoverProps: c, triggerHoverEnd: p } = G(() => {
    let m = (h, v) => {
      if (s.pointerType = v, r || v === "touch" || s.isHovered || !h.currentTarget.contains(h.target)) return;
      s.isHovered = !0;
      let x = h.currentTarget;
      s.target = x, a(_e(h.target), "pointerover", (w) => {
        s.isHovered && s.target && !Yo(s.target, w.target) && d(w, w.pointerType);
      }, {
        capture: !0
      }), n && n({
        type: "hoverstart",
        target: x,
        pointerType: v
      }), t && t(!0), l(!0);
    }, d = (h, v) => {
      let x = s.target;
      s.pointerType = "", s.target = null, !(v === "touch" || !s.isHovered || !x) && (s.isHovered = !1, u(), o && o({
        type: "hoverend",
        target: x,
        pointerType: v
      }), t && t(!1), l(!1));
    }, f = {};
    return typeof PointerEvent < "u" && (f.onPointerEnter = (h) => {
      hn && h.pointerType === "mouse" || m(h, h.pointerType);
    }, f.onPointerLeave = (h) => {
      !r && h.currentTarget.contains(h.target) && d(h, h.pointerType);
    }), {
      hoverProps: f,
      triggerHoverEnd: d
    };
  }, [
    n,
    t,
    o,
    r,
    s,
    a,
    u
  ]);
  return ie(() => {
    r && p({
      currentTarget: s.target
    }, s.pointerType);
  }, [
    r
  ]), {
    hoverProps: c,
    isHovered: i
  };
}
function Pn(e = {}) {
  let { autoFocus: n = !1, isTextInput: t, within: o } = e, r = _({
    isFocused: !1,
    isFocusVisible: n || ir()
  }), [i, l] = X(!1), [s, a] = X(() => r.current.isFocused && r.current.isFocusVisible), u = V(() => a(r.current.isFocused && r.current.isFocusVisible), []), c = V((d) => {
    r.current.isFocused = d, l(d), u();
  }, [
    u
  ]);
  nl((d) => {
    r.current.isFocusVisible = d, u();
  }, [], {
    isTextInput: t
  });
  let { focusProps: p } = ol({
    isDisabled: o,
    onFocusChange: c
  }), { focusWithinProps: m } = rl({
    isDisabled: !o,
    onFocusWithinChange: c
  });
  return {
    isFocused: i,
    isFocusVisible: s,
    focusProps: o ? m : p
  };
}
var sl = Object.defineProperty, al = (e, n, t) => n in e ? sl(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Qt = (e, n, t) => (al(e, typeof n != "symbol" ? n + "" : n, t), t);
let ul = class {
  constructor() {
    Qt(this, "current", this.detect()), Qt(this, "handoffState", "pending"), Qt(this, "currentId", 0);
  }
  set(n) {
    this.current !== n && (this.handoffState = "pending", this.currentId = 0, this.current = n);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, Ue = new ul();
function rt(e) {
  var n, t;
  return Ue.isServer ? null : e ? "ownerDocument" in e ? e.ownerDocument : "current" in e ? (t = (n = e.current) == null ? void 0 : n.ownerDocument) != null ? t : document : null : document;
}
function lr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((n) => setTimeout(() => {
    throw n;
  }));
}
function Oe() {
  let e = [], n = { addEventListener(t, o, r, i) {
    return t.addEventListener(o, r, i), n.add(() => t.removeEventListener(o, r, i));
  }, requestAnimationFrame(...t) {
    let o = requestAnimationFrame(...t);
    return n.add(() => cancelAnimationFrame(o));
  }, nextFrame(...t) {
    return n.requestAnimationFrame(() => n.requestAnimationFrame(...t));
  }, setTimeout(...t) {
    let o = setTimeout(...t);
    return n.add(() => clearTimeout(o));
  }, microTask(...t) {
    let o = { current: !0 };
    return lr(() => {
      o.current && t[0]();
    }), n.add(() => {
      o.current = !1;
    });
  }, style(t, o, r) {
    let i = t.style.getPropertyValue(o);
    return Object.assign(t.style, { [o]: r }), this.add(() => {
      Object.assign(t.style, { [o]: i });
    });
  }, group(t) {
    let o = Oe();
    return t(o), this.add(() => o.dispose());
  }, add(t) {
    return e.includes(t) || e.push(t), () => {
      let o = e.indexOf(t);
      if (o >= 0) for (let r of e.splice(o, 1)) r();
    };
  }, dispose() {
    for (let t of e.splice(0)) t();
  } };
  return n;
}
function Ye() {
  let [e] = X(Oe);
  return ie(() => () => e.dispose(), [e]), e;
}
let q = (e, n) => {
  Ue.isServer ? ie(e, n) : Tn(e, n);
};
function Me(e) {
  let n = _(e);
  return q(() => {
    n.current = e;
  }, [e]), n;
}
let M = function(e) {
  let n = Me(e);
  return L.useCallback((...t) => n.current(...t), [n]);
};
function cl(e) {
  let n = e.width / 2, t = e.height / 2;
  return { top: e.clientY - t, right: e.clientX + n, bottom: e.clientY + t, left: e.clientX - n };
}
function dl(e, n) {
  return !(!e || !n || e.right < n.left || e.left > n.right || e.bottom < n.top || e.top > n.bottom);
}
function sr({ disabled: e = !1 } = {}) {
  let n = _(null), [t, o] = X(!1), r = Ye(), i = M(() => {
    n.current = null, o(!1), r.dispose();
  }), l = M((s) => {
    if (r.dispose(), n.current === null) {
      n.current = s.currentTarget, o(!0);
      {
        let a = rt(s.currentTarget);
        r.addEventListener(a, "pointerup", i, !1), r.addEventListener(a, "pointermove", (u) => {
          if (n.current) {
            let c = cl(u);
            o(dl(c, n.current.getBoundingClientRect()));
          }
        }, !1), r.addEventListener(a, "pointercancel", i, !1);
      }
    }
  });
  return { pressed: t, pressProps: e ? {} : { onPointerDown: l, onPointerUp: i, onClick: i } };
}
let fl = se(void 0);
function _t() {
  return oe(fl);
}
function vn(...e) {
  return Array.from(new Set(e.flatMap((n) => typeof n == "string" ? n.split(" ") : []))).filter(Boolean).join(" ");
}
function ce(e, n, ...t) {
  if (e in n) {
    let r = n[e];
    return typeof r == "function" ? r(...t) : r;
  }
  let o = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((r) => `"${r}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(o, ce), o;
}
var tt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(tt || {}), De = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(De || {});
function de() {
  let e = ml();
  return V((n) => pl({ mergeRefs: e, ...n }), [e]);
}
function pl({ ourProps: e, theirProps: n, slot: t, defaultTag: o, features: r, visible: i = !0, name: l, mergeRefs: s }) {
  s = s ?? hl;
  let a = ar(n, e);
  if (i) return Rt(a, t, o, l, s);
  let u = r ?? 0;
  if (u & 2) {
    let { static: c = !1, ...p } = a;
    if (c) return Rt(p, t, o, l, s);
  }
  if (u & 1) {
    let { unmount: c = !0, ...p } = a;
    return ce(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Rt({ ...p, hidden: !0, style: { display: "none" } }, t, o, l, s);
    } });
  }
  return Rt(a, t, o, l, s);
}
function Rt(e, n = {}, t, o, r) {
  let { as: i = t, children: l, refName: s = "ref", ...a } = Jt(e, ["unmount", "static"]), u = e.ref !== void 0 ? { [s]: e.ref } : {}, c = typeof l == "function" ? l(n) : l;
  "className" in a && a.className && typeof a.className == "function" && (a.className = a.className(n)), a["aria-labelledby"] && a["aria-labelledby"] === a.id && (a["aria-labelledby"] = void 0);
  let p = {};
  if (n) {
    let m = !1, d = [];
    for (let [f, h] of Object.entries(n)) typeof h == "boolean" && (m = !0), h === !0 && d.push(f.replace(/([A-Z])/g, (v) => `-${v.toLowerCase()}`));
    if (m) {
      p["data-headlessui-state"] = d.join(" ");
      for (let f of d) p[`data-${f}`] = "";
    }
  }
  if (i === be && (Object.keys(Le(a)).length > 0 || Object.keys(Le(p)).length > 0)) if (!Ci(c) || Array.isArray(c) && c.length > 1) {
    if (Object.keys(Le(a)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${o} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Le(a)).concat(Object.keys(Le(p))).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
  } else {
    let m = c.props, d = m == null ? void 0 : m.className, f = typeof d == "function" ? (...x) => vn(d(...x), a.className) : vn(d, a.className), h = f ? { className: f } : {}, v = ar(c.props, Le(Jt(a, ["ref"])));
    for (let x in p) x in v && delete p[x];
    return Ii(c, Object.assign({}, v, p, u, { ref: r(vl(c), u.ref) }, h));
  }
  return Pi(i, Object.assign({}, Jt(a, ["ref"]), i !== be && u, i !== be && p), c);
}
function ml() {
  let e = _([]), n = V((t) => {
    for (let o of e.current) o != null && (typeof o == "function" ? o(t) : o.current = t);
  }, []);
  return (...t) => {
    if (!t.every((o) => o == null)) return e.current = t, n;
  };
}
function hl(...e) {
  return e.every((n) => n == null) ? void 0 : (n) => {
    for (let t of e) t != null && (typeof t == "function" ? t(n) : t.current = n);
  };
}
function ar(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let n = {}, t = {};
  for (let o of e) for (let r in o) r.startsWith("on") && typeof o[r] == "function" ? (t[r] != null || (t[r] = []), t[r].push(o[r])) : n[r] = o[r];
  if (n.disabled || n["aria-disabled"]) for (let o in t) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(o) && (t[o] = [(r) => {
    var i;
    return (i = r == null ? void 0 : r.preventDefault) == null ? void 0 : i.call(r);
  }]);
  for (let o in t) Object.assign(n, { [o](r, ...i) {
    let l = t[o];
    for (let s of l) {
      if ((r instanceof Event || (r == null ? void 0 : r.nativeEvent) instanceof Event) && r.defaultPrevented) return;
      s(r, ...i);
    }
  } });
  return n;
}
function xt(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let n = {}, t = {};
  for (let o of e) for (let r in o) r.startsWith("on") && typeof o[r] == "function" ? (t[r] != null || (t[r] = []), t[r].push(o[r])) : n[r] = o[r];
  for (let o in t) Object.assign(n, { [o](...r) {
    let i = t[o];
    for (let l of i) l == null || l(...r);
  } });
  return n;
}
function ae(e) {
  var n;
  return Object.assign(Ri(e), { displayName: (n = e.displayName) != null ? n : e.name });
}
function Le(e) {
  let n = Object.assign({}, e);
  for (let t in n) n[t] === void 0 && delete n[t];
  return n;
}
function Jt(e, n = []) {
  let t = Object.assign({}, e);
  for (let o of n) o in t && delete t[o];
  return t;
}
function vl(e) {
  return L.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function ur(e, n, t) {
  let [o, r] = X(t), i = e !== void 0, l = _(i), s = _(!1), a = _(!1);
  return i && !l.current && !s.current ? (s.current = !0, l.current = i, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !i && l.current && !a.current && (a.current = !0, l.current = i, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [i ? e : o, M((u) => (i || r(u), n == null ? void 0 : n(u)))];
}
function cr(e) {
  let [n] = X(e);
  return n;
}
function dr(e = {}, n = null, t = []) {
  for (let [o, r] of Object.entries(e)) pr(t, fr(n, o), r);
  return t;
}
function fr(e, n) {
  return e ? e + "[" + n + "]" : n;
}
function pr(e, n, t) {
  if (Array.isArray(t)) for (let [o, r] of t.entries()) pr(e, fr(n, o.toString()), r);
  else t instanceof Date ? e.push([n, t.toISOString()]) : typeof t == "boolean" ? e.push([n, t ? "1" : "0"]) : typeof t == "string" ? e.push([n, t]) : typeof t == "number" ? e.push([n, `${t}`]) : t == null ? e.push([n, ""]) : dr(t, n, e);
}
function gl(e) {
  var n, t;
  let o = (n = e == null ? void 0 : e.form) != null ? n : e.closest("form");
  if (o) {
    for (let r of o.elements) if (r !== e && (r.tagName === "INPUT" && r.type === "submit" || r.tagName === "BUTTON" && r.type === "submit" || r.nodeName === "INPUT" && r.type === "image")) {
      r.click();
      return;
    }
    (t = o.requestSubmit) == null || t.call(o);
  }
}
let bl = "span";
var An = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(An || {});
function xl(e, n) {
  var t;
  let { features: o = 1, ...r } = e, i = { ref: n, "aria-hidden": (o & 2) === 2 ? !0 : (t = r["aria-hidden"]) != null ? t : void 0, hidden: (o & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(o & 4) === 4 && (o & 2) !== 2 && { display: "none" } } };
  return de()({ ourProps: i, theirProps: r, slot: {}, defaultTag: bl, name: "Hidden" });
}
let mr = ae(xl), wl = se(null);
function yl({ children: e }) {
  let n = oe(wl);
  if (!n) return L.createElement(L.Fragment, null, e);
  let { target: t } = n;
  return t ? Uo(L.createElement(L.Fragment, null, e), t) : null;
}
function hr({ data: e, form: n, disabled: t, onReset: o, overrides: r }) {
  let [i, l] = X(null), s = Ye();
  return ie(() => {
    if (o && i) return s.addEventListener(i, "reset", o);
  }, [i, n, o]), L.createElement(yl, null, L.createElement(El, { setForm: l, formId: n }), dr(e).map(([a, u]) => L.createElement(mr, { features: An.Hidden, ...Le({ key: a, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: n, disabled: t, name: a, value: u, ...r }) })));
}
function El({ setForm: e, formId: n }) {
  return ie(() => {
    if (n) {
      let t = document.getElementById(n);
      t && e(t);
    }
  }, [e, n]), n ? null : L.createElement(mr, { features: An.Hidden, as: "input", type: "hidden", hidden: !0, readOnly: !0, ref: (t) => {
    if (!t) return;
    let o = t.closest("form");
    o && e(o);
  } });
}
let Ol = se(void 0);
function Fn() {
  return oe(Ol);
}
function Mn(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function Ht(e) {
  return Mn(e) && "tagName" in e;
}
function Ie(e) {
  return Ht(e) && "accessKey" in e;
}
function ze(e) {
  return Ht(e) && "tabIndex" in e;
}
function $l(e) {
  return Ht(e) && "style" in e;
}
function Sl(e) {
  return Ie(e) && e.nodeName === "IFRAME";
}
function Ft(e) {
  return Ie(e) && e.nodeName === "INPUT";
}
function no(e) {
  return Ie(e) && e.nodeName === "LABEL";
}
function Tl(e) {
  return Ie(e) && e.nodeName === "FIELDSET";
}
function vr(e) {
  return Ie(e) && e.nodeName === "LEGEND";
}
function Rl(e) {
  return Ht(e) ? e.matches('a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]') : !1;
}
function gr(e) {
  let n = e.parentElement, t = null;
  for (; n && !Tl(n); ) vr(n) && (t = n), n = n.parentElement;
  let o = (n == null ? void 0 : n.getAttribute("disabled")) === "";
  return o && Cl(t) ? !1 : o;
}
function Cl(e) {
  if (!e) return !1;
  let n = e.previousElementSibling;
  for (; n !== null; ) {
    if (vr(n)) return !1;
    n = n.previousElementSibling;
  }
  return !0;
}
let br = Symbol();
function Il(e, n = !0) {
  return Object.assign(e, { [br]: n });
}
function me(...e) {
  let n = _(e);
  ie(() => {
    n.current = e;
  }, [e]);
  let t = M((o) => {
    for (let r of n.current) r != null && (typeof r == "function" ? r(o) : r.current = o);
  });
  return e.every((o) => o == null || (o == null ? void 0 : o[br])) ? void 0 : t;
}
let Ln = se(null);
Ln.displayName = "DescriptionContext";
function xr() {
  let e = oe(Ln);
  if (e === null) {
    let n = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, xr), n;
  }
  return e;
}
function wr() {
  var e, n;
  return (n = (e = oe(Ln)) == null ? void 0 : e.value) != null ? n : void 0;
}
let Pl = "p";
function Al(e, n) {
  let t = Ee(), o = _t(), { id: r = `headlessui-description-${t}`, ...i } = e, l = xr(), s = me(n);
  q(() => l.register(r), [r, l.register]);
  let a = o || !1, u = G(() => ({ ...l.slot, disabled: a }), [l.slot, a]), c = { ref: s, ...l.props, id: r };
  return de()({ ourProps: c, theirProps: i, slot: u, defaultTag: Pl, name: l.name || "Description" });
}
let Fl = ae(Al);
Object.assign(Fl, {});
var K = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(K || {});
let Bt = se(null);
Bt.displayName = "LabelContext";
function yr() {
  let e = oe(Bt);
  if (e === null) {
    let n = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, yr), n;
  }
  return e;
}
function wt(e) {
  var n, t, o;
  let r = (t = (n = oe(Bt)) == null ? void 0 : n.value) != null ? t : void 0;
  return ((o = e == null ? void 0 : e.length) != null ? o : 0) > 0 ? [r, ...e].filter(Boolean).join(" ") : r;
}
function Er({ inherit: e = !1 } = {}) {
  let n = wt(), [t, o] = X([]), r = e ? [n, ...t].filter(Boolean) : t;
  return [r.length > 0 ? r.join(" ") : void 0, G(() => function(i) {
    let l = M((a) => (o((u) => [...u, a]), () => o((u) => {
      let c = u.slice(), p = c.indexOf(a);
      return p !== -1 && c.splice(p, 1), c;
    }))), s = G(() => ({ register: l, slot: i.slot, name: i.name, props: i.props, value: i.value }), [l, i.slot, i.name, i.props, i.value]);
    return L.createElement(Bt.Provider, { value: s }, i.children);
  }, [o])];
}
let Ml = "label";
function Ll(e, n) {
  var t;
  let o = Ee(), r = yr(), i = Fn(), l = _t(), { id: s = `headlessui-label-${o}`, htmlFor: a = i ?? ((t = r.props) == null ? void 0 : t.htmlFor), passive: u = !1, ...c } = e, p = me(n);
  q(() => r.register(s), [s, r.register]);
  let m = M((v) => {
    let x = v.currentTarget;
    if (!(v.target !== v.currentTarget && Rl(v.target)) && (no(x) && v.preventDefault(), r.props && "onClick" in r.props && typeof r.props.onClick == "function" && r.props.onClick(v), no(x))) {
      let w = document.getElementById(x.htmlFor);
      if (w) {
        let b = w.getAttribute("disabled");
        if (b === "true" || b === "") return;
        let g = w.getAttribute("aria-disabled");
        if (g === "true" || g === "") return;
        (Ft(w) && (w.type === "file" || w.type === "radio" || w.type === "checkbox") || w.role === "radio" || w.role === "checkbox" || w.role === "switch") && w.click(), w.focus({ preventScroll: !0 });
      }
    }
  }), d = l || !1, f = G(() => ({ ...r.slot, disabled: d }), [r.slot, d]), h = { ref: p, ...r.props, id: s, htmlFor: a, onClick: m };
  return u && ("onClick" in h && (delete h.htmlFor, delete h.onClick), "onClick" in c && delete c.onClick), de()({ ourProps: h, theirProps: c, slot: f, defaultTag: a ? Ml : "div", name: r.name || "Label" });
}
let Dl = ae(Ll), Or = Object.assign(Dl, {});
function Xe(e, n, t) {
  let o = t.initialDeps ?? [], r;
  function i() {
    var l, s, a, u;
    let c;
    t.key && ((l = t.debug) != null && l.call(t)) && (c = Date.now());
    const p = e();
    if (!(p.length !== o.length || p.some((f, h) => o[h] !== f)))
      return r;
    o = p;
    let d;
    if (t.key && ((s = t.debug) != null && s.call(t)) && (d = Date.now()), r = n(...p), t.key && ((a = t.debug) != null && a.call(t))) {
      const f = Math.round((Date.now() - c) * 100) / 100, h = Math.round((Date.now() - d) * 100) / 100, v = h / 16, x = (w, b) => {
        for (w = String(w); w.length < b; )
          w = " " + w;
        return w;
      };
      console.info(
        `%c⏱ ${x(h, 5)} /${x(f, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * v, 120)
        )}deg 100% 31%);`,
        t == null ? void 0 : t.key
      );
    }
    return (u = t == null ? void 0 : t.onChange) == null || u.call(t, r), r;
  }
  return i.updateDeps = (l) => {
    o = l;
  }, i;
}
function oo(e, n) {
  if (e === void 0)
    throw new Error("Unexpected undefined");
  return e;
}
const kl = (e, n) => Math.abs(e - n) <= 1, Nl = (e, n, t) => {
  let o;
  return function(...r) {
    e.clearTimeout(o), o = e.setTimeout(() => n.apply(this, r), t);
  };
}, ro = (e) => {
  const { offsetWidth: n, offsetHeight: t } = e;
  return { width: n, height: t };
}, jl = (e) => e, _l = (e) => {
  const n = Math.max(e.startIndex - e.overscan, 0), t = Math.min(e.endIndex + e.overscan, e.count - 1), o = [];
  for (let r = n; r <= t; r++)
    o.push(r);
  return o;
}, Hl = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const o = e.targetWindow;
  if (!o)
    return;
  const r = (l) => {
    const { width: s, height: a } = l;
    n({ width: Math.round(s), height: Math.round(a) });
  };
  if (r(ro(t)), !o.ResizeObserver)
    return () => {
    };
  const i = new o.ResizeObserver((l) => {
    const s = () => {
      const a = l[0];
      if (a != null && a.borderBoxSize) {
        const u = a.borderBoxSize[0];
        if (u) {
          r({ width: u.inlineSize, height: u.blockSize });
          return;
        }
      }
      r(ro(t));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(s) : s();
  });
  return i.observe(t, { box: "border-box" }), () => {
    i.unobserve(t);
  };
}, io = {
  passive: !0
}, lo = typeof window > "u" ? !0 : "onscrollend" in window, Bl = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const o = e.targetWindow;
  if (!o)
    return;
  let r = 0;
  const i = e.options.useScrollendEvent && lo ? () => {
  } : Nl(
    o,
    () => {
      n(r, !1);
    },
    e.options.isScrollingResetDelay
  ), l = (c) => () => {
    const { horizontal: p, isRtl: m } = e.options;
    r = p ? t.scrollLeft * (m && -1 || 1) : t.scrollTop, i(), n(r, c);
  }, s = l(!0), a = l(!1);
  a(), t.addEventListener("scroll", s, io);
  const u = e.options.useScrollendEvent && lo;
  return u && t.addEventListener("scrollend", a, io), () => {
    t.removeEventListener("scroll", s), u && t.removeEventListener("scrollend", a);
  };
}, Wl = (e, n, t) => {
  if (n != null && n.borderBoxSize) {
    const o = n.borderBoxSize[0];
    if (o)
      return Math.round(
        o[t.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return e[t.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, zl = (e, {
  adjustments: n = 0,
  behavior: t
}, o) => {
  var r, i;
  const l = e + n;
  (i = (r = o.scrollElement) == null ? void 0 : r.scrollTo) == null || i.call(r, {
    [o.options.horizontal ? "left" : "top"]: l,
    behavior: t
  });
};
class Vl {
  constructor(n) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollToIndexTimeoutId = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let t = null;
      const o = () => t || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : t = new this.targetWindow.ResizeObserver((r) => {
        r.forEach((i) => {
          const l = () => {
            this._measureElement(i.target, i);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(l) : l();
        });
      }));
      return {
        disconnect: () => {
          var r;
          (r = o()) == null || r.disconnect(), t = null;
        },
        observe: (r) => {
          var i;
          return (i = o()) == null ? void 0 : i.observe(r, { box: "border-box" });
        },
        unobserve: (r) => {
          var i;
          return (i = o()) == null ? void 0 : i.unobserve(r);
        }
      };
    })(), this.range = null, this.setOptions = (t) => {
      Object.entries(t).forEach(([o, r]) => {
        typeof r > "u" && delete t[o];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: jl,
        rangeExtractor: _l,
        onChange: () => {
        },
        measureElement: Wl,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        ...t
      };
    }, this.notify = (t) => {
      var o, r;
      (r = (o = this.options).onChange) == null || r.call(o, this, t);
    }, this.maybeNotify = Xe(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (t) => {
        this.notify(t);
      },
      {
        key: !1,
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((t) => t()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var t;
      const o = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== o) {
        if (this.cleanup(), !o) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = o, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((t = this.scrollElement) == null ? void 0 : t.window) ?? null, this.elementsCache.forEach((r) => {
          this.observer.observe(r);
        }), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        }), this.unsubs.push(
          this.options.observeElementRect(this, (r) => {
            this.scrollRect = r, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (r, i) => {
            this.scrollAdjustments = 0, this.scrollDirection = i ? this.getScrollOffset() < r ? "forward" : "backward" : null, this.scrollOffset = r, this.isScrolling = i, this.maybeNotify();
          })
        );
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (t, o) => {
      const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
      for (let l = o - 1; l >= 0; l--) {
        const s = t[l];
        if (r.has(s.lane))
          continue;
        const a = i.get(
          s.lane
        );
        if (a == null || s.end > a.end ? i.set(s.lane, s) : s.end < a.end && r.set(s.lane, !0), r.size === this.options.lanes)
          break;
      }
      return i.size === this.options.lanes ? Array.from(i.values()).sort((l, s) => l.end === s.end ? l.index - s.index : l.end - s.end)[0] : void 0;
    }, this.getMeasurementOptions = Xe(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (t, o, r, i, l) => (this.pendingMeasuredCacheIndexes = [], {
        count: t,
        paddingStart: o,
        scrollMargin: r,
        getItemKey: i,
        enabled: l
      }),
      {
        key: !1
      }
    ), this.getMeasurements = Xe(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: t, paddingStart: o, scrollMargin: r, getItemKey: i, enabled: l }, s) => {
        if (!l)
          return this.measurementsCache = [], this.itemSizeCache.clear(), [];
        this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((c) => {
          this.itemSizeCache.set(c.key, c.size);
        }));
        const a = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const u = this.measurementsCache.slice(0, a);
        for (let c = a; c < t; c++) {
          const p = i(c), m = this.options.lanes === 1 ? u[c - 1] : this.getFurthestMeasurement(u, c), d = m ? m.end + this.options.gap : o + r, f = s.get(p), h = typeof f == "number" ? f : this.options.estimateSize(c), v = d + h, x = m ? m.lane : c % this.options.lanes;
          u[c] = {
            index: c,
            start: d,
            size: h,
            end: v,
            key: p,
            lane: x
          };
        }
        return this.measurementsCache = u, u;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.calculateRange = Xe(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (t, o, r, i) => this.range = t.length > 0 && o > 0 ? Ul({
        measurements: t,
        outerSize: o,
        scrollOffset: r,
        lanes: i
      }) : null,
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = Xe(
      () => {
        let t = null, o = null;
        const r = this.calculateRange();
        return r && (t = r.startIndex, o = r.endIndex), this.maybeNotify.updateDeps([this.isScrolling, t, o]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          t,
          o
        ];
      },
      (t, o, r, i, l) => i === null || l === null ? [] : t({
        startIndex: i,
        endIndex: l,
        overscan: o,
        count: r
      }),
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (t) => {
      const o = this.options.indexAttribute, r = t.getAttribute(o);
      return r ? parseInt(r, 10) : (console.warn(
        `Missing attribute name '${o}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (t, o) => {
      const r = this.indexFromElement(t), i = this.measurementsCache[r];
      if (!i)
        return;
      const l = i.key, s = this.elementsCache.get(l);
      s !== t && (s && this.observer.unobserve(s), this.observer.observe(t), this.elementsCache.set(l, t)), t.isConnected && this.resizeItem(r, this.options.measureElement(t, o, this));
    }, this.resizeItem = (t, o) => {
      const r = this.measurementsCache[t];
      if (!r)
        return;
      const i = this.itemSizeCache.get(r.key) ?? r.size, l = o - i;
      l !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(r, l, this) : this.scrollDirection === "backward" && r.start < this.getScrollOffset() + this.scrollAdjustments) && this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += l,
        behavior: void 0
      }), this.pendingMeasuredCacheIndexes.push(r.index), this.itemSizeCache = new Map(this.itemSizeCache.set(r.key, o)), this.notify(!1));
    }, this.measureElement = (t) => {
      if (!t) {
        this.elementsCache.forEach((o, r) => {
          o.isConnected || (this.observer.unobserve(o), this.elementsCache.delete(r));
        });
        return;
      }
      this._measureElement(t, void 0);
    }, this.getVirtualItems = Xe(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (t, o) => {
        const r = [];
        for (let i = 0, l = t.length; i < l; i++) {
          const s = t[i], a = o[s];
          r.push(a);
        }
        return r;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (t) => {
      const o = this.getMeasurements();
      if (o.length !== 0)
        return oo(
          o[$r(
            0,
            o.length - 1,
            (r) => oo(o[r]).start,
            t
          )]
        );
    }, this.getOffsetForAlignment = (t, o, r = 0) => {
      const i = this.getSize(), l = this.getScrollOffset();
      o === "auto" && (o = t >= l + i ? "end" : "start"), o === "center" ? t += (r - i) / 2 : o === "end" && (t -= i);
      const s = this.getTotalSize() - i;
      return Math.max(Math.min(s, t), 0);
    }, this.getOffsetForIndex = (t, o = "auto") => {
      t = Math.max(0, Math.min(t, this.options.count - 1));
      const r = this.measurementsCache[t];
      if (!r)
        return;
      const i = this.getSize(), l = this.getScrollOffset();
      if (o === "auto")
        if (r.end >= l + i - this.options.scrollPaddingEnd)
          o = "end";
        else if (r.start <= l + this.options.scrollPaddingStart)
          o = "start";
        else
          return [l, o];
      const s = o === "end" ? r.end + this.options.scrollPaddingEnd : r.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(s, o, r.size),
        o
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.cancelScrollToIndex = () => {
      this.scrollToIndexTimeoutId !== null && this.targetWindow && (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null);
    }, this.scrollToOffset = (t, { align: o = "start", behavior: r } = {}) => {
      this.cancelScrollToIndex(), r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(t, o), {
        adjustments: void 0,
        behavior: r
      });
    }, this.scrollToIndex = (t, { align: o = "auto", behavior: r } = {}) => {
      t = Math.max(0, Math.min(t, this.options.count - 1)), this.cancelScrollToIndex(), r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      );
      const i = this.getOffsetForIndex(t, o);
      if (!i) return;
      const [l, s] = i;
      this._scrollToOffset(l, { adjustments: void 0, behavior: r }), r !== "smooth" && this.isDynamicMode() && this.targetWindow && (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
        if (this.scrollToIndexTimeoutId = null, this.elementsCache.has(
          this.options.getItemKey(t)
        )) {
          const u = this.getOffsetForIndex(t, s);
          if (!u) return;
          const [c] = u, p = this.getScrollOffset();
          kl(c, p) || this.scrollToIndex(t, { align: s, behavior: r });
        } else
          this.scrollToIndex(t, { align: s, behavior: r });
      }));
    }, this.scrollBy = (t, { behavior: o } = {}) => {
      this.cancelScrollToIndex(), o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + t, {
        adjustments: void 0,
        behavior: o
      });
    }, this.getTotalSize = () => {
      var t;
      const o = this.getMeasurements();
      let r;
      if (o.length === 0)
        r = this.options.paddingStart;
      else if (this.options.lanes === 1)
        r = ((t = o[o.length - 1]) == null ? void 0 : t.end) ?? 0;
      else {
        const i = Array(this.options.lanes).fill(null);
        let l = o.length - 1;
        for (; l >= 0 && i.some((s) => s === null); ) {
          const s = o[l];
          i[s.lane] === null && (i[s.lane] = s.end), l--;
        }
        r = Math.max(...i.filter((s) => s !== null));
      }
      return Math.max(
        r - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (t, {
      adjustments: o,
      behavior: r
    }) => {
      this.options.scrollToFn(t, { behavior: r, adjustments: o }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(n);
  }
}
const $r = (e, n, t, o) => {
  for (; e <= n; ) {
    const r = (e + n) / 2 | 0, i = t(r);
    if (i < o)
      e = r + 1;
    else if (i > o)
      n = r - 1;
    else
      return r;
  }
  return e > 0 ? e - 1 : 0;
};
function Ul({
  measurements: e,
  outerSize: n,
  scrollOffset: t,
  lanes: o
}) {
  const r = e.length - 1, i = (a) => e[a].start;
  if (e.length <= o)
    return {
      startIndex: 0,
      endIndex: r
    };
  let l = $r(
    0,
    r,
    i,
    t
  ), s = l;
  if (o === 1)
    for (; s < r && e[s].end < t + n; )
      s++;
  else if (o > 1) {
    const a = Array(o).fill(0);
    for (; s < r && a.some((c) => c < t + n); ) {
      const c = e[s];
      a[c.lane] = c.end, s++;
    }
    const u = Array(o).fill(t + n);
    for (; l >= 0 && u.some((c) => c >= t); ) {
      const c = e[l];
      u[c.lane] = c.start, l--;
    }
    l = Math.max(0, l - l % o), s = Math.min(r, s + (o - 1 - s % o));
  }
  return { startIndex: l, endIndex: s };
}
const so = typeof document < "u" ? E.useLayoutEffect : E.useEffect;
function Gl(e) {
  const n = E.useReducer(() => ({}), {})[1], t = {
    ...e,
    onChange: (r, i) => {
      var l;
      i ? ye(n) : n(), (l = e.onChange) == null || l.call(e, r, i);
    }
  }, [o] = E.useState(
    () => new Vl(t)
  );
  return o.setOptions(t), so(() => o._didMount(), []), so(() => o._willUpdate()), o;
}
function Kl(e) {
  return Gl({
    observeElementRect: Hl,
    observeElementOffset: Bl,
    scrollToFn: zl,
    ...e
  });
}
function ql(e, n) {
  return e !== null && n !== null && typeof e == "object" && typeof n == "object" && "id" in e && "id" in n ? e.id === n.id : e === n;
}
function Sr(e = ql) {
  return V((n, t) => {
    if (typeof e == "string") {
      let o = e;
      return (n == null ? void 0 : n[o]) === (t == null ? void 0 : t[o]);
    }
    return e(n, t);
  }, [e]);
}
function Yl(e) {
  if (e === null) return { width: 0, height: 0 };
  let { width: n, height: t } = e.getBoundingClientRect();
  return { width: n, height: t };
}
function gn(e, n = !1) {
  let [t, o] = Ai(() => ({}), {}), r = G(() => Yl(e), [e, t]);
  return q(() => {
    if (!e) return;
    let i = new ResizeObserver(o);
    return i.observe(e), () => {
      i.disconnect();
    };
  }, [e]), n ? { width: `${r.width}px`, height: `${r.height}px` } : r;
}
let Tr = class extends Map {
  constructor(n) {
    super(), this.factory = n;
  }
  get(n) {
    let t = super.get(n);
    return t === void 0 && (t = this.factory(n), this.set(n, t)), t;
  }
};
var Xl = Object.defineProperty, Zl = (e, n, t) => n in e ? Xl(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Ql = (e, n, t) => (Zl(e, n + "", t), t), Rr = (e, n, t) => {
  if (!n.has(e)) throw TypeError("Cannot " + t);
}, we = (e, n, t) => (Rr(e, n, "read from private field"), t ? t.call(e) : n.get(e)), en = (e, n, t) => {
  if (n.has(e)) throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, t);
}, ao = (e, n, t, o) => (Rr(e, n, "write to private field"), n.set(e, t), t), Se, dt, ft;
let Dn = class {
  constructor(n) {
    en(this, Se, {}), en(this, dt, new Tr(() => /* @__PURE__ */ new Set())), en(this, ft, /* @__PURE__ */ new Set()), Ql(this, "disposables", Oe()), ao(this, Se, n);
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return we(this, Se);
  }
  subscribe(n, t) {
    let o = { selector: n, callback: t, current: n(we(this, Se)) };
    return we(this, ft).add(o), this.disposables.add(() => {
      we(this, ft).delete(o);
    });
  }
  on(n, t) {
    return we(this, dt).get(n).add(t), this.disposables.add(() => {
      we(this, dt).get(n).delete(t);
    });
  }
  send(n) {
    let t = this.reduce(we(this, Se), n);
    if (t !== we(this, Se)) {
      ao(this, Se, t);
      for (let o of we(this, ft)) {
        let r = o.selector(we(this, Se));
        Cr(o.current, r) || (o.current = r, o.callback(r));
      }
      for (let o of we(this, dt).get(n.type)) o(we(this, Se), n);
    }
  }
};
Se = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap();
function Cr(e, n) {
  return Object.is(e, n) ? !0 : typeof e != "object" || e === null || typeof n != "object" || n === null ? !1 : Array.isArray(e) && Array.isArray(n) ? e.length !== n.length ? !1 : tn(e[Symbol.iterator](), n[Symbol.iterator]()) : e instanceof Map && n instanceof Map || e instanceof Set && n instanceof Set ? e.size !== n.size ? !1 : tn(e.entries(), n.entries()) : uo(e) && uo(n) ? tn(Object.entries(e)[Symbol.iterator](), Object.entries(n)[Symbol.iterator]()) : !1;
}
function tn(e, n) {
  do {
    let t = e.next(), o = n.next();
    if (t.done && o.done) return !0;
    if (t.done || o.done || !Object.is(t.value, o.value)) return !1;
  } while (!0);
}
function uo(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let n = Object.getPrototypeOf(e);
  return n === null || Object.getPrototypeOf(n) === null;
}
function nn(e) {
  let [n, t] = e(), o = Oe();
  return (...r) => {
    n(...r), o.dispose(), o.microTask(t);
  };
}
var Jl = Object.defineProperty, es = (e, n, t) => n in e ? Jl(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, co = (e, n, t) => (es(e, typeof n != "symbol" ? n + "" : n, t), t), kn = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(kn || {});
let ts = { 0(e, n) {
  let t = n.id, o = e.stack, r = e.stack.indexOf(t);
  if (r !== -1) {
    let i = e.stack.slice();
    return i.splice(r, 1), i.push(t), o = i, { ...e, stack: o };
  }
  return { ...e, stack: [...e.stack, t] };
}, 1(e, n) {
  let t = n.id, o = e.stack.indexOf(t);
  if (o === -1) return e;
  let r = e.stack.slice();
  return r.splice(o, 1), { ...e, stack: r };
} }, ns = class Ir extends Dn {
  constructor() {
    super(...arguments), co(this, "actions", { push: (n) => this.send({ type: 0, id: n }), pop: (n) => this.send({ type: 1, id: n }) }), co(this, "selectors", { isTop: (n, t) => n.stack[n.stack.length - 1] === t, inStack: (n, t) => n.stack.includes(t) });
  }
  static new() {
    return new Ir({ stack: [] });
  }
  reduce(n, t) {
    return ce(t.type, ts, n, t);
  }
};
const yt = new Tr(() => ns.new());
var Pr = { exports: {} }, Ar = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Et = L;
function os(e, n) {
  return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
}
var rs = typeof Object.is == "function" ? Object.is : os, is = Et.useSyncExternalStore, ls = Et.useRef, ss = Et.useEffect, as = Et.useMemo, us = Et.useDebugValue;
Ar.useSyncExternalStoreWithSelector = function(e, n, t, o, r) {
  var i = ls(null);
  if (i.current === null) {
    var l = { hasValue: !1, value: null };
    i.current = l;
  } else l = i.current;
  i = as(
    function() {
      function a(d) {
        if (!u) {
          if (u = !0, c = d, d = o(d), r !== void 0 && l.hasValue) {
            var f = l.value;
            if (r(f, d))
              return p = f;
          }
          return p = d;
        }
        if (f = p, rs(c, d)) return f;
        var h = o(d);
        return r !== void 0 && r(f, h) ? (c = d, f) : (c = d, p = h);
      }
      var u = !1, c, p, m = t === void 0 ? null : t;
      return [
        function() {
          return a(n());
        },
        m === null ? void 0 : function() {
          return a(m());
        }
      ];
    },
    [n, t, o, r]
  );
  var s = is(e, i[0], i[1]);
  return ss(
    function() {
      l.hasValue = !0, l.value = s;
    },
    [s]
  ), us(s), s;
};
Pr.exports = Ar;
var cs = Pr.exports;
function J(e, n, t = Cr) {
  return cs.useSyncExternalStoreWithSelector(M((o) => e.subscribe(ds, o)), M(() => e.state), M(() => e.state), M(n), t);
}
function ds(e) {
  return e;
}
function Fr(e, n) {
  let t = Ee(), o = yt.get(n), [r, i] = J(o, V((l) => [o.selectors.isTop(l, t), o.selectors.inStack(l, t)], [o, t]));
  return q(() => {
    if (e) return o.actions.push(t), () => o.actions.pop(t);
  }, [o, e, t]), e ? i ? r : !0 : !1;
}
let bn = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Map();
function fo(e) {
  var n;
  let t = (n = mt.get(e)) != null ? n : 0;
  return mt.set(e, t + 1), t !== 0 ? () => po(e) : (bn.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => po(e));
}
function po(e) {
  var n;
  let t = (n = mt.get(e)) != null ? n : 1;
  if (t === 1 ? mt.delete(e) : mt.set(e, t - 1), t !== 1) return;
  let o = bn.get(e);
  o && (o["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", o["aria-hidden"]), e.inert = o.inert, bn.delete(e));
}
function Mr(e, { allowed: n, disallowed: t } = {}) {
  let o = Fr(e, "inert-others");
  q(() => {
    var r, i;
    if (!o) return;
    let l = Oe();
    for (let a of (r = t == null ? void 0 : t()) != null ? r : []) a && l.add(fo(a));
    let s = (i = n == null ? void 0 : n()) != null ? i : [];
    for (let a of s) {
      if (!a) continue;
      let u = rt(a);
      if (!u) continue;
      let c = a.parentElement;
      for (; c && c !== u.body; ) {
        for (let p of c.children) s.some((m) => p.contains(m)) || l.add(fo(p));
        c = c.parentElement;
      }
    }
    return l.dispose;
  }, [o, n, t]);
}
function Lr(e, n, t) {
  let o = Me((r) => {
    let i = r.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && t();
  });
  ie(() => {
    if (!e) return;
    let r = n === null ? null : Ie(n) ? n : n.current;
    if (!r) return;
    let i = Oe();
    if (typeof ResizeObserver < "u") {
      let l = new ResizeObserver(() => o.current(r));
      l.observe(r), i.add(() => l.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let l = new IntersectionObserver(() => o.current(r));
      l.observe(r), i.add(() => l.disconnect());
    }
    return () => i.dispose();
  }, [n, o, e]);
}
let Mt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), fs = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var xn = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(xn || {}), ps = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(ps || {}), ms = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(ms || {});
function Dr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Mt)).sort((n, t) => Math.sign((n.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function hs(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(fs)).sort((n, t) => Math.sign((n.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Nn = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Nn || {});
function kr(e, n = 0) {
  var t;
  return e === ((t = rt(e)) == null ? void 0 : t.body) ? !1 : ce(n, { 0() {
    return e.matches(Mt);
  }, 1() {
    let o = e;
    for (; o !== null; ) {
      if (o.matches(Mt)) return !0;
      o = o.parentElement;
    }
    return !1;
  } });
}
var vs = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(vs || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
let gs = ["textarea", "input"].join(",");
function bs(e) {
  var n, t;
  return (t = (n = e == null ? void 0 : e.matches) == null ? void 0 : n.call(e, gs)) != null ? t : !1;
}
function jn(e, n = (t) => t) {
  return e.slice().sort((t, o) => {
    let r = n(t), i = n(o);
    if (r === null || i === null) return 0;
    let l = r.compareDocumentPosition(i);
    return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function xs(e, n) {
  return ws(Dr(), n, { relativeTo: e });
}
function ws(e, n, { sorted: t = !0, relativeTo: o = null, skipElements: r = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, l = Array.isArray(e) ? t ? jn(e) : e : n & 64 ? hs(e) : Dr(e);
  r.length > 0 && l.length > 1 && (l = l.filter((d) => !r.some((f) => f != null && "current" in f ? (f == null ? void 0 : f.current) === d : f === d))), o = o ?? i.activeElement;
  let s = (() => {
    if (n & 5) return 1;
    if (n & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), a = (() => {
    if (n & 1) return 0;
    if (n & 2) return Math.max(0, l.indexOf(o)) - 1;
    if (n & 4) return Math.max(0, l.indexOf(o)) + 1;
    if (n & 8) return l.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = n & 32 ? { preventScroll: !0 } : {}, c = 0, p = l.length, m;
  do {
    if (c >= p || c + p <= 0) return 0;
    let d = a + c;
    if (n & 16) d = (d + p) % p;
    else {
      if (d < 0) return 3;
      if (d >= p) return 1;
    }
    m = l[d], m == null || m.focus(u), c += s;
  } while (m !== i.activeElement);
  return n & 6 && bs(m) && m.select(), 2;
}
function Nr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ys() {
  return /Android/gi.test(window.navigator.userAgent);
}
function wn() {
  return Nr() || ys();
}
function Ze(e, n, t, o) {
  let r = Me(t);
  ie(() => {
    if (!e) return;
    function i(l) {
      r.current(l);
    }
    return document.addEventListener(n, i, o), () => document.removeEventListener(n, i, o);
  }, [e, n, o]);
}
function Es(e, n, t, o) {
  let r = Me(t);
  ie(() => {
    if (!e) return;
    function i(l) {
      r.current(l);
    }
    return window.addEventListener(n, i, o), () => window.removeEventListener(n, i, o);
  }, [e, n, o]);
}
const mo = 30;
function jr(e, n, t) {
  let o = Me(t), r = V(function(s, a) {
    if (s.defaultPrevented) return;
    let u = a(s);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let c = function p(m) {
      return typeof m == "function" ? p(m()) : Array.isArray(m) || m instanceof Set ? m : [m];
    }(n);
    for (let p of c) if (p !== null && (p.contains(u) || s.composed && s.composedPath().includes(p))) return;
    return !kr(u, Nn.Loose) && u.tabIndex !== -1 && s.preventDefault(), o.current(s, u);
  }, [o, n]), i = _(null);
  Ze(e, "pointerdown", (s) => {
    var a, u;
    wn() || (i.current = ((u = (a = s.composedPath) == null ? void 0 : a.call(s)) == null ? void 0 : u[0]) || s.target);
  }, !0), Ze(e, "pointerup", (s) => {
    if (wn() || !i.current) return;
    let a = i.current;
    return i.current = null, r(s, () => a);
  }, !0);
  let l = _({ x: 0, y: 0 });
  Ze(e, "touchstart", (s) => {
    l.current.x = s.touches[0].clientX, l.current.y = s.touches[0].clientY;
  }, !0), Ze(e, "touchend", (s) => {
    let a = { x: s.changedTouches[0].clientX, y: s.changedTouches[0].clientY };
    if (!(Math.abs(a.x - l.current.x) >= mo || Math.abs(a.y - l.current.y) >= mo)) return r(s, () => ze(s.target) ? s.target : null);
  }, !0), Es(e, "blur", (s) => r(s, () => Sl(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function nt(...e) {
  return G(() => rt(...e), [...e]);
}
var Os = ((e) => (e[e.Ignore = 0] = "Ignore", e[e.Select = 1] = "Select", e[e.Close = 2] = "Close", e))(Os || {});
const Ae = { Ignore: { kind: 0 }, Select: (e) => ({ kind: 1, target: e }), Close: { kind: 2 } }, $s = 200;
function _r(e, { trigger: n, action: t, close: o, select: r }) {
  let i = _(null);
  Ze(e && n !== null, "pointerdown", (l) => {
    Mn(l == null ? void 0 : l.target) && n != null && n.contains(l.target) && (i.current = /* @__PURE__ */ new Date());
  }), Ze(e && n !== null, "pointerup", (l) => {
    if (i.current === null || !ze(l.target)) return;
    let s = t(l), a = (/* @__PURE__ */ new Date()).getTime() - i.current.getTime();
    switch (i.current = null, s.kind) {
      case 0:
        return;
      case 1: {
        a > $s && (r(s.target), o());
        break;
      }
      case 2: {
        o();
        break;
      }
    }
  }, { capture: !0 });
}
function Ss(e, n, t, o) {
  let r = Me(t);
  ie(() => {
    e = e ?? window;
    function i(l) {
      r.current(l);
    }
    return e.addEventListener(n, i, o), () => e.removeEventListener(n, i, o);
  }, [e, n, o]);
}
function Hr(e) {
  let n = _({ value: "", selectionStart: null, selectionEnd: null });
  return Ss(e, "blur", (t) => {
    let o = t.target;
    Ft(o) && (n.current = { value: o.value, selectionStart: o.selectionStart, selectionEnd: o.selectionEnd });
  }), M(() => {
    if (document.activeElement !== e && Ft(e) && e.isConnected) {
      if (e.focus({ preventScroll: !0 }), e.value !== n.current.value) e.setSelectionRange(e.value.length, e.value.length);
      else {
        let { selectionStart: t, selectionEnd: o } = n.current;
        t !== null && o !== null && e.setSelectionRange(t, o);
      }
      n.current = { value: "", selectionStart: null, selectionEnd: null };
    }
  });
}
function Br(e, n) {
  return G(() => {
    var t;
    if (e.type) return e.type;
    let o = (t = e.as) != null ? t : "button";
    if (typeof o == "string" && o.toLowerCase() === "button" || (n == null ? void 0 : n.tagName) === "BUTTON" && !n.hasAttribute("type")) return "button";
  }, [e.type, e.as, n]);
}
function Ts(e) {
  return Fi(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function Rs(e, n) {
  let t = e(), o = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t;
  }, subscribe(r) {
    return o.add(r), () => o.delete(r);
  }, dispatch(r, ...i) {
    let l = n[r].call(t, ...i);
    l && (t = l, o.forEach((s) => s()));
  } };
}
function Cs() {
  let e;
  return { before({ doc: n }) {
    var t;
    let o = n.documentElement, r = (t = n.defaultView) != null ? t : window;
    e = Math.max(0, r.innerWidth - o.clientWidth);
  }, after({ doc: n, d: t }) {
    let o = n.documentElement, r = Math.max(0, o.clientWidth - o.offsetWidth), i = Math.max(0, e - r);
    t.style(o, "paddingRight", `${i}px`);
  } };
}
function Is() {
  return Nr() ? { before({ doc: e, d: n, meta: t }) {
    function o(r) {
      return t.containers.flatMap((i) => i()).some((i) => i.contains(r));
    }
    n.microTask(() => {
      var r;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = Oe();
        s.style(e.documentElement, "scrollBehavior", "auto"), n.add(() => n.microTask(() => s.dispose()));
      }
      let i = (r = window.scrollY) != null ? r : window.pageYOffset, l = null;
      n.addEventListener(e, "click", (s) => {
        if (ze(s.target)) try {
          let a = s.target.closest("a");
          if (!a) return;
          let { hash: u } = new URL(a.href), c = e.querySelector(u);
          ze(c) && !o(c) && (l = c);
        } catch {
        }
      }, !0), n.addEventListener(e, "touchstart", (s) => {
        if (ze(s.target) && $l(s.target)) if (o(s.target)) {
          let a = s.target;
          for (; a.parentElement && o(a.parentElement); ) a = a.parentElement;
          n.style(a, "overscrollBehavior", "contain");
        } else n.style(s.target, "touchAction", "none");
      }), n.addEventListener(e, "touchmove", (s) => {
        if (ze(s.target)) {
          if (Ft(s.target)) return;
          if (o(s.target)) {
            let a = s.target;
            for (; a.parentElement && a.dataset.headlessuiPortal !== "" && !(a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth); ) a = a.parentElement;
            a.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), n.add(() => {
        var s;
        let a = (s = window.scrollY) != null ? s : window.pageYOffset;
        i !== a && window.scrollTo(0, i), l && l.isConnected && (l.scrollIntoView({ block: "nearest" }), l = null);
      });
    });
  } } : {};
}
function Ps() {
  return { before({ doc: e, d: n }) {
    n.style(e.documentElement, "overflow", "hidden");
  } };
}
function As(e) {
  let n = {};
  for (let t of e) Object.assign(n, t(n));
  return n;
}
let Ve = Rs(() => /* @__PURE__ */ new Map(), { PUSH(e, n) {
  var t;
  let o = (t = this.get(e)) != null ? t : { doc: e, count: 0, d: Oe(), meta: /* @__PURE__ */ new Set() };
  return o.count++, o.meta.add(n), this.set(e, o), this;
}, POP(e, n) {
  let t = this.get(e);
  return t && (t.count--, t.meta.delete(n)), this;
}, SCROLL_PREVENT({ doc: e, d: n, meta: t }) {
  let o = { doc: e, d: n, meta: As(t) }, r = [Is(), Cs(), Ps()];
  r.forEach(({ before: i }) => i == null ? void 0 : i(o)), r.forEach(({ after: i }) => i == null ? void 0 : i(o));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Ve.subscribe(() => {
  let e = Ve.getSnapshot(), n = /* @__PURE__ */ new Map();
  for (let [t] of e) n.set(t, t.documentElement.style.overflow);
  for (let t of e.values()) {
    let o = n.get(t.doc) === "hidden", r = t.count !== 0;
    (r && !o || !r && o) && Ve.dispatch(t.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t), t.count === 0 && Ve.dispatch("TEARDOWN", t);
  }
});
function Fs(e, n, t = () => ({ containers: [] })) {
  let o = Ts(Ve), r = n ? o.get(n) : void 0, i = r ? r.count > 0 : !1;
  return q(() => {
    if (!(!n || !e)) return Ve.dispatch("PUSH", n, t), () => Ve.dispatch("POP", n, t);
  }, [e, n]), i;
}
function Wr(e, n, t = () => [document.body]) {
  let o = Fr(e, "scroll-lock");
  Fs(o, n, (r) => {
    var i;
    return { containers: [...(i = r.containers) != null ? i : [], t] };
  });
}
function ho(e) {
  return [e.screenX, e.screenY];
}
function zr() {
  let e = _([-1, -1]);
  return { wasMoved(n) {
    let t = ho(n);
    return e.current[0] === t[0] && e.current[1] === t[1] ? !1 : (e.current = t, !0);
  }, update(n) {
    e.current = ho(n);
  } };
}
function Ms(e = 0) {
  let [n, t] = X(e), o = V((a) => t(a), [n]), r = V((a) => t((u) => u | a), [n]), i = V((a) => (n & a) === a, [n]), l = V((a) => t((u) => u & ~a), [t]), s = V((a) => t((u) => u ^ a), [t]);
  return { flags: n, setFlag: o, addFlag: r, hasFlag: i, removeFlag: l, toggleFlag: s };
}
var vo = {}, Ls = {}, go, bo;
typeof vo < "u" && typeof globalThis < "u" && typeof Element < "u" && ((go = vo == null ? void 0 : Ls) == null ? void 0 : go.NODE_ENV) === "test" && typeof ((bo = Element == null ? void 0 : Element.prototype) == null ? void 0 : bo.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Ds = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(Ds || {});
function _n(e) {
  let n = {};
  for (let t in e) e[t] === !0 && (n[`data-${t}`] = "");
  return n;
}
function Hn(e, n, t, o) {
  let [r, i] = X(t), { hasFlag: l, addFlag: s, removeFlag: a } = Ms(e && r ? 3 : 0), u = _(!1), c = _(!1), p = Ye();
  return q(() => {
    var m;
    if (e) {
      if (t && i(!0), !n) {
        t && s(3);
        return;
      }
      return (m = o == null ? void 0 : o.start) == null || m.call(o, t), ks(n, { inFlight: u, prepare() {
        c.current ? c.current = !1 : c.current = u.current, u.current = !0, !c.current && (t ? (s(3), a(4)) : (s(4), a(2)));
      }, run() {
        c.current ? t ? (a(3), s(4)) : (a(4), s(3)) : t ? a(1) : s(1);
      }, done() {
        var d;
        c.current && typeof n.getAnimations == "function" && n.getAnimations().length > 0 || (u.current = !1, a(7), t || i(!1), (d = o == null ? void 0 : o.end) == null || d.call(o, t));
      } });
    }
  }, [e, t, n, p]), e ? [r, { closed: l(1), enter: l(2), leave: l(4), transition: l(2) || l(4) }] : [t, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function ks(e, { prepare: n, run: t, done: o, inFlight: r }) {
  let i = Oe();
  return js(e, { prepare: n, inFlight: r }), i.nextFrame(() => {
    t(), i.requestAnimationFrame(() => {
      i.add(Ns(e, o));
    });
  }), i.dispose;
}
function Ns(e, n) {
  var t, o;
  let r = Oe();
  if (!e) return r.dispose;
  let i = !1;
  r.add(() => {
    i = !0;
  });
  let l = (o = (t = e.getAnimations) == null ? void 0 : t.call(e).filter((s) => s instanceof CSSTransition)) != null ? o : [];
  return l.length === 0 ? (n(), r.dispose) : (Promise.allSettled(l.map((s) => s.finished)).then(() => {
    i || n();
  }), r.dispose);
}
function js(e, { inFlight: n, prepare: t }) {
  if (n != null && n.current) {
    t();
    return;
  }
  let o = e.style.transition;
  e.style.transition = "none", t(), e.offsetHeight, e.style.transition = o;
}
function _s(e, { container: n, accept: t, walk: o }) {
  let r = _(t), i = _(o);
  ie(() => {
    r.current = t, i.current = o;
  }, [t, o]), q(() => {
    if (!n || !e) return;
    let l = rt(n);
    if (!l) return;
    let s = r.current, a = i.current, u = Object.assign((p) => s(p), { acceptNode: s }), c = l.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, u, !1);
    for (; c.nextNode(); ) a(c.currentNode);
  }, [n, e, r, i]);
}
function xo(e, n) {
  let t = _([]), o = M(e);
  ie(() => {
    let r = [...t.current];
    for (let [i, l] of n.entries()) if (t.current[i] !== l) {
      let s = o(n, r);
      return t.current = n, s;
    }
  }, [o, ...n]);
}
function Wt() {
  return typeof window < "u";
}
function it(e) {
  return Vr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function xe(e) {
  var n;
  return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Pe(e) {
  var n;
  return (n = (Vr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function Vr(e) {
  return Wt() ? e instanceof Node || e instanceof xe(e).Node : !1;
}
function he(e) {
  return Wt() ? e instanceof Element || e instanceof xe(e).Element : !1;
}
function Ce(e) {
  return Wt() ? e instanceof HTMLElement || e instanceof xe(e).HTMLElement : !1;
}
function wo(e) {
  return !Wt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof xe(e).ShadowRoot;
}
function Ot(e) {
  const {
    overflow: n,
    overflowX: t,
    overflowY: o,
    display: r
  } = $e(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + o + t) && !["inline", "contents"].includes(r);
}
function Hs(e) {
  return ["table", "td", "th"].includes(it(e));
}
function zt(e) {
  return [":popover-open", ":modal"].some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
function Bn(e) {
  const n = Wn(), t = he(e) ? $e(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => t[o] ? t[o] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !n && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !n && (t.filter ? t.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (t.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (t.contain || "").includes(o));
}
function Bs(e) {
  let n = Ne(e);
  for (; Ce(n) && !ot(n); ) {
    if (Bn(n))
      return n;
    if (zt(n))
      return null;
    n = Ne(n);
  }
  return null;
}
function Wn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ot(e) {
  return ["html", "body", "#document"].includes(it(e));
}
function $e(e) {
  return xe(e).getComputedStyle(e);
}
function Vt(e) {
  return he(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ne(e) {
  if (it(e) === "html")
    return e;
  const n = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    wo(e) && e.host || // Fallback.
    Pe(e)
  );
  return wo(n) ? n.host : n;
}
function Ur(e) {
  const n = Ne(e);
  return ot(n) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ce(n) && Ot(n) ? n : Ur(n);
}
function ht(e, n, t) {
  var o;
  n === void 0 && (n = []), t === void 0 && (t = !0);
  const r = Ur(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), l = xe(r);
  if (i) {
    const s = yn(l);
    return n.concat(l, l.visualViewport || [], Ot(r) ? r : [], s && t ? ht(s) : []);
  }
  return n.concat(r, ht(r, [], t));
}
function yn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ws() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((n) => {
    let {
      brand: t,
      version: o
    } = n;
    return t + "/" + o;
  }).join(" ") : navigator.userAgent;
}
const Ke = Math.min, pe = Math.max, vt = Math.round, Ct = Math.floor, Re = (e) => ({
  x: e,
  y: e
}), zs = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Vs = {
  start: "end",
  end: "start"
};
function yo(e, n, t) {
  return pe(e, Ke(n, t));
}
function lt(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function je(e) {
  return e.split("-")[0];
}
function $t(e) {
  return e.split("-")[1];
}
function Gr(e) {
  return e === "x" ? "y" : "x";
}
function Kr(e) {
  return e === "y" ? "height" : "width";
}
function Fe(e) {
  return ["top", "bottom"].includes(je(e)) ? "y" : "x";
}
function qr(e) {
  return Gr(Fe(e));
}
function Us(e, n, t) {
  t === void 0 && (t = !1);
  const o = $t(e), r = qr(e), i = Kr(r);
  let l = r === "x" ? o === (t ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return n.reference[i] > n.floating[i] && (l = Lt(l)), [l, Lt(l)];
}
function Gs(e) {
  const n = Lt(e);
  return [En(e), n, En(n)];
}
function En(e) {
  return e.replace(/start|end/g, (n) => Vs[n]);
}
function Ks(e, n, t) {
  const o = ["left", "right"], r = ["right", "left"], i = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return t ? n ? r : o : n ? o : r;
    case "left":
    case "right":
      return n ? i : l;
    default:
      return [];
  }
}
function qs(e, n, t, o) {
  const r = $t(e);
  let i = Ks(je(e), t === "start", o);
  return r && (i = i.map((l) => l + "-" + r), n && (i = i.concat(i.map(En)))), i;
}
function Lt(e) {
  return e.replace(/left|right|bottom|top/g, (n) => zs[n]);
}
function Ys(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Xs(e) {
  return typeof e != "number" ? Ys(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Dt(e) {
  const {
    x: n,
    y: t,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: t,
    left: n,
    right: n + o,
    bottom: t + r,
    x: n,
    y: t
  };
}
function Eo(e, n, t) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = Fe(n), l = qr(n), s = Kr(l), a = je(n), u = i === "y", c = o.x + o.width / 2 - r.width / 2, p = o.y + o.height / 2 - r.height / 2, m = o[s] / 2 - r[s] / 2;
  let d;
  switch (a) {
    case "top":
      d = {
        x: c,
        y: o.y - r.height
      };
      break;
    case "bottom":
      d = {
        x: c,
        y: o.y + o.height
      };
      break;
    case "right":
      d = {
        x: o.x + o.width,
        y: p
      };
      break;
    case "left":
      d = {
        x: o.x - r.width,
        y: p
      };
      break;
    default:
      d = {
        x: o.x,
        y: o.y
      };
  }
  switch ($t(n)) {
    case "start":
      d[l] -= m * (t && u ? -1 : 1);
      break;
    case "end":
      d[l] += m * (t && u ? -1 : 1);
      break;
  }
  return d;
}
const Zs = async (e, n, t) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: l
  } = t, s = i.filter(Boolean), a = await (l.isRTL == null ? void 0 : l.isRTL(n));
  let u = await l.getElementRects({
    reference: e,
    floating: n,
    strategy: r
  }), {
    x: c,
    y: p
  } = Eo(u, o, a), m = o, d = {}, f = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: v,
      fn: x
    } = s[h], {
      x: w,
      y: b,
      data: g,
      reset: y
    } = await x({
      x: c,
      y: p,
      initialPlacement: o,
      placement: m,
      strategy: r,
      middlewareData: d,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: n
      }
    });
    c = w ?? c, p = b ?? p, d = {
      ...d,
      [v]: {
        ...d[v],
        ...g
      }
    }, y && f <= 50 && (f++, typeof y == "object" && (y.placement && (m = y.placement), y.rects && (u = y.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: n,
      strategy: r
    }) : y.rects), {
      x: c,
      y: p
    } = Eo(u, m, a)), h = -1);
  }
  return {
    x: c,
    y: p,
    placement: m,
    strategy: r,
    middlewareData: d
  };
};
async function Ut(e, n) {
  var t;
  n === void 0 && (n = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: l,
    elements: s,
    strategy: a
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: p = "floating",
    altBoundary: m = !1,
    padding: d = 0
  } = lt(n, e), f = Xs(d), v = s[m ? p === "floating" ? "reference" : "floating" : p], x = Dt(await i.getClippingRect({
    element: (t = await (i.isElement == null ? void 0 : i.isElement(v))) == null || t ? v : v.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: a
  })), w = p === "floating" ? {
    x: o,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, b = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), g = await (i.isElement == null ? void 0 : i.isElement(b)) ? await (i.getScale == null ? void 0 : i.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, y = Dt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: b,
    strategy: a
  }) : w);
  return {
    top: (x.top - y.top + f.top) / g.y,
    bottom: (y.bottom - x.bottom + f.bottom) / g.y,
    left: (x.left - y.left + f.left) / g.x,
    right: (y.right - x.right + f.right) / g.x
  };
}
const Qs = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(n) {
      var t, o;
      const {
        placement: r,
        middlewareData: i,
        rects: l,
        initialPlacement: s,
        platform: a,
        elements: u
      } = n, {
        mainAxis: c = !0,
        crossAxis: p = !0,
        fallbackPlacements: m,
        fallbackStrategy: d = "bestFit",
        fallbackAxisSideDirection: f = "none",
        flipAlignment: h = !0,
        ...v
      } = lt(e, n);
      if ((t = i.arrow) != null && t.alignmentOffset)
        return {};
      const x = je(r), w = Fe(s), b = je(s) === s, g = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), y = m || (b || !h ? [Lt(s)] : Gs(s)), O = f !== "none";
      !m && O && y.push(...qs(s, h, f, g));
      const T = [s, ...y], C = await Ut(n, v), W = [];
      let $ = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (c && W.push(C[x]), p) {
        const k = Us(r, l, g);
        W.push(C[k[0]], C[k[1]]);
      }
      if ($ = [...$, {
        placement: r,
        overflows: W
      }], !W.every((k) => k <= 0)) {
        var D, I;
        const k = (((D = i.flip) == null ? void 0 : D.index) || 0) + 1, S = T[k];
        if (S && (!(p === "alignment" ? w !== Fe(S) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        $.every((N) => N.overflows[0] > 0 && Fe(N.placement) === w)))
          return {
            data: {
              index: k,
              overflows: $
            },
            reset: {
              placement: S
            }
          };
        let H = (I = $.filter((ee) => ee.overflows[0] <= 0).sort((ee, N) => ee.overflows[1] - N.overflows[1])[0]) == null ? void 0 : I.placement;
        if (!H)
          switch (d) {
            case "bestFit": {
              var j;
              const ee = (j = $.filter((N) => {
                if (O) {
                  const z = Fe(N.placement);
                  return z === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  z === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((z) => z > 0).reduce((z, Z) => z + Z, 0)]).sort((N, z) => N[1] - z[1])[0]) == null ? void 0 : j[0];
              ee && (H = ee);
              break;
            }
            case "initialPlacement":
              H = s;
              break;
          }
        if (r !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
};
async function Js(e, n) {
  const {
    placement: t,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), l = je(t), s = $t(t), a = Fe(t) === "y", u = ["left", "top"].includes(l) ? -1 : 1, c = i && a ? -1 : 1, p = lt(n, e);
  let {
    mainAxis: m,
    crossAxis: d,
    alignmentAxis: f
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return s && typeof f == "number" && (d = s === "end" ? f * -1 : f), a ? {
    x: d * c,
    y: m * u
  } : {
    x: m * u,
    y: d * c
  };
}
const ea = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(n) {
      var t, o;
      const {
        x: r,
        y: i,
        placement: l,
        middlewareData: s
      } = n, a = await Js(n, e);
      return l === ((t = s.offset) == null ? void 0 : t.placement) && (o = s.arrow) != null && o.alignmentOffset ? {} : {
        x: r + a.x,
        y: i + a.y,
        data: {
          ...a,
          placement: l
        }
      };
    }
  };
}, ta = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: t,
        y: o,
        placement: r
      } = n, {
        mainAxis: i = !0,
        crossAxis: l = !1,
        limiter: s = {
          fn: (v) => {
            let {
              x,
              y: w
            } = v;
            return {
              x,
              y: w
            };
          }
        },
        ...a
      } = lt(e, n), u = {
        x: t,
        y: o
      }, c = await Ut(n, a), p = Fe(je(r)), m = Gr(p);
      let d = u[m], f = u[p];
      if (i) {
        const v = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", w = d + c[v], b = d - c[x];
        d = yo(w, d, b);
      }
      if (l) {
        const v = p === "y" ? "top" : "left", x = p === "y" ? "bottom" : "right", w = f + c[v], b = f - c[x];
        f = yo(w, f, b);
      }
      const h = s.fn({
        ...n,
        [m]: d,
        [p]: f
      });
      return {
        ...h,
        data: {
          x: h.x - t,
          y: h.y - o,
          enabled: {
            [m]: i,
            [p]: l
          }
        }
      };
    }
  };
}, na = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(n) {
      var t, o;
      const {
        placement: r,
        rects: i,
        platform: l,
        elements: s
      } = n, {
        apply: a = () => {
        },
        ...u
      } = lt(e, n), c = await Ut(n, u), p = je(r), m = $t(r), d = Fe(r) === "y", {
        width: f,
        height: h
      } = i.floating;
      let v, x;
      p === "top" || p === "bottom" ? (v = p, x = m === (await (l.isRTL == null ? void 0 : l.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (x = p, v = m === "end" ? "top" : "bottom");
      const w = h - c.top - c.bottom, b = f - c.left - c.right, g = Ke(h - c[v], w), y = Ke(f - c[x], b), O = !n.middlewareData.shift;
      let T = g, C = y;
      if ((t = n.middlewareData.shift) != null && t.enabled.x && (C = b), (o = n.middlewareData.shift) != null && o.enabled.y && (T = w), O && !m) {
        const $ = pe(c.left, 0), D = pe(c.right, 0), I = pe(c.top, 0), j = pe(c.bottom, 0);
        d ? C = f - 2 * ($ !== 0 || D !== 0 ? $ + D : pe(c.left, c.right)) : T = h - 2 * (I !== 0 || j !== 0 ? I + j : pe(c.top, c.bottom));
      }
      await a({
        ...n,
        availableWidth: C,
        availableHeight: T
      });
      const W = await l.getDimensions(s.floating);
      return f !== W.width || h !== W.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Yr(e) {
  const n = $e(e);
  let t = parseFloat(n.width) || 0, o = parseFloat(n.height) || 0;
  const r = Ce(e), i = r ? e.offsetWidth : t, l = r ? e.offsetHeight : o, s = vt(t) !== i || vt(o) !== l;
  return s && (t = i, o = l), {
    width: t,
    height: o,
    $: s
  };
}
function zn(e) {
  return he(e) ? e : e.contextElement;
}
function et(e) {
  const n = zn(e);
  if (!Ce(n))
    return Re(1);
  const t = n.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = Yr(n);
  let l = (i ? vt(t.width) : t.width) / o, s = (i ? vt(t.height) : t.height) / r;
  return (!l || !Number.isFinite(l)) && (l = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: l,
    y: s
  };
}
const oa = /* @__PURE__ */ Re(0);
function Xr(e) {
  const n = xe(e);
  return !Wn() || !n.visualViewport ? oa : {
    x: n.visualViewport.offsetLeft,
    y: n.visualViewport.offsetTop
  };
}
function ra(e, n, t) {
  return n === void 0 && (n = !1), !t || n && t !== xe(e) ? !1 : n;
}
function qe(e, n, t, o) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  const r = e.getBoundingClientRect(), i = zn(e);
  let l = Re(1);
  n && (o ? he(o) && (l = et(o)) : l = et(e));
  const s = ra(i, t, o) ? Xr(i) : Re(0);
  let a = (r.left + s.x) / l.x, u = (r.top + s.y) / l.y, c = r.width / l.x, p = r.height / l.y;
  if (i) {
    const m = xe(i), d = o && he(o) ? xe(o) : o;
    let f = m, h = yn(f);
    for (; h && o && d !== f; ) {
      const v = et(h), x = h.getBoundingClientRect(), w = $e(h), b = x.left + (h.clientLeft + parseFloat(w.paddingLeft)) * v.x, g = x.top + (h.clientTop + parseFloat(w.paddingTop)) * v.y;
      a *= v.x, u *= v.y, c *= v.x, p *= v.y, a += b, u += g, f = xe(h), h = yn(f);
    }
  }
  return Dt({
    width: c,
    height: p,
    x: a,
    y: u
  });
}
function Vn(e, n) {
  const t = Vt(e).scrollLeft;
  return n ? n.left + t : qe(Pe(e)).left + t;
}
function Zr(e, n, t) {
  t === void 0 && (t = !1);
  const o = e.getBoundingClientRect(), r = o.left + n.scrollLeft - (t ? 0 : (
    // RTL <body> scrollbar.
    Vn(e, o)
  )), i = o.top + n.scrollTop;
  return {
    x: r,
    y: i
  };
}
function ia(e) {
  let {
    elements: n,
    rect: t,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", l = Pe(o), s = n ? zt(n.floating) : !1;
  if (o === l || s && i)
    return t;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Re(1);
  const c = Re(0), p = Ce(o);
  if ((p || !p && !i) && ((it(o) !== "body" || Ot(l)) && (a = Vt(o)), Ce(o))) {
    const d = qe(o);
    u = et(o), c.x = d.x + o.clientLeft, c.y = d.y + o.clientTop;
  }
  const m = l && !p && !i ? Zr(l, a, !0) : Re(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - a.scrollLeft * u.x + c.x + m.x,
    y: t.y * u.y - a.scrollTop * u.y + c.y + m.y
  };
}
function la(e) {
  return Array.from(e.getClientRects());
}
function sa(e) {
  const n = Pe(e), t = Vt(e), o = e.ownerDocument.body, r = pe(n.scrollWidth, n.clientWidth, o.scrollWidth, o.clientWidth), i = pe(n.scrollHeight, n.clientHeight, o.scrollHeight, o.clientHeight);
  let l = -t.scrollLeft + Vn(e);
  const s = -t.scrollTop;
  return $e(o).direction === "rtl" && (l += pe(n.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: l,
    y: s
  };
}
function aa(e, n) {
  const t = xe(e), o = Pe(e), r = t.visualViewport;
  let i = o.clientWidth, l = o.clientHeight, s = 0, a = 0;
  if (r) {
    i = r.width, l = r.height;
    const u = Wn();
    (!u || u && n === "fixed") && (s = r.offsetLeft, a = r.offsetTop);
  }
  return {
    width: i,
    height: l,
    x: s,
    y: a
  };
}
function ua(e, n) {
  const t = qe(e, !0, n === "fixed"), o = t.top + e.clientTop, r = t.left + e.clientLeft, i = Ce(e) ? et(e) : Re(1), l = e.clientWidth * i.x, s = e.clientHeight * i.y, a = r * i.x, u = o * i.y;
  return {
    width: l,
    height: s,
    x: a,
    y: u
  };
}
function Oo(e, n, t) {
  let o;
  if (n === "viewport")
    o = aa(e, t);
  else if (n === "document")
    o = sa(Pe(e));
  else if (he(n))
    o = ua(n, t);
  else {
    const r = Xr(e);
    o = {
      x: n.x - r.x,
      y: n.y - r.y,
      width: n.width,
      height: n.height
    };
  }
  return Dt(o);
}
function Qr(e, n) {
  const t = Ne(e);
  return t === n || !he(t) || ot(t) ? !1 : $e(t).position === "fixed" || Qr(t, n);
}
function ca(e, n) {
  const t = n.get(e);
  if (t)
    return t;
  let o = ht(e, [], !1).filter((s) => he(s) && it(s) !== "body"), r = null;
  const i = $e(e).position === "fixed";
  let l = i ? Ne(e) : e;
  for (; he(l) && !ot(l); ) {
    const s = $e(l), a = Bn(l);
    !a && s.position === "fixed" && (r = null), (i ? !a && !r : !a && s.position === "static" && !!r && ["absolute", "fixed"].includes(r.position) || Ot(l) && !a && Qr(e, l)) ? o = o.filter((c) => c !== l) : r = s, l = Ne(l);
  }
  return n.set(e, o), o;
}
function da(e) {
  let {
    element: n,
    boundary: t,
    rootBoundary: o,
    strategy: r
  } = e;
  const l = [...t === "clippingAncestors" ? zt(n) ? [] : ca(n, this._c) : [].concat(t), o], s = l[0], a = l.reduce((u, c) => {
    const p = Oo(n, c, r);
    return u.top = pe(p.top, u.top), u.right = Ke(p.right, u.right), u.bottom = Ke(p.bottom, u.bottom), u.left = pe(p.left, u.left), u;
  }, Oo(n, s, r));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function fa(e) {
  const {
    width: n,
    height: t
  } = Yr(e);
  return {
    width: n,
    height: t
  };
}
function pa(e, n, t) {
  const o = Ce(n), r = Pe(n), i = t === "fixed", l = qe(e, !0, i, n);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = Re(0);
  function u() {
    a.x = Vn(r);
  }
  if (o || !o && !i)
    if ((it(n) !== "body" || Ot(r)) && (s = Vt(n)), o) {
      const d = qe(n, !0, i, n);
      a.x = d.x + n.clientLeft, a.y = d.y + n.clientTop;
    } else r && u();
  i && !o && r && u();
  const c = r && !o && !i ? Zr(r, s) : Re(0), p = l.left + s.scrollLeft - a.x - c.x, m = l.top + s.scrollTop - a.y - c.y;
  return {
    x: p,
    y: m,
    width: l.width,
    height: l.height
  };
}
function on(e) {
  return $e(e).position === "static";
}
function $o(e, n) {
  if (!Ce(e) || $e(e).position === "fixed")
    return null;
  if (n)
    return n(e);
  let t = e.offsetParent;
  return Pe(e) === t && (t = t.ownerDocument.body), t;
}
function Jr(e, n) {
  const t = xe(e);
  if (zt(e))
    return t;
  if (!Ce(e)) {
    let r = Ne(e);
    for (; r && !ot(r); ) {
      if (he(r) && !on(r))
        return r;
      r = Ne(r);
    }
    return t;
  }
  let o = $o(e, n);
  for (; o && Hs(o) && on(o); )
    o = $o(o, n);
  return o && ot(o) && on(o) && !Bn(o) ? t : o || Bs(e) || t;
}
const ma = async function(e) {
  const n = this.getOffsetParent || Jr, t = this.getDimensions, o = await t(e.floating);
  return {
    reference: pa(e.reference, await n(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function ha(e) {
  return $e(e).direction === "rtl";
}
const va = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ia,
  getDocumentElement: Pe,
  getClippingRect: da,
  getOffsetParent: Jr,
  getElementRects: ma,
  getClientRects: la,
  getDimensions: fa,
  getScale: et,
  isElement: he,
  isRTL: ha
};
function ei(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function ga(e, n) {
  let t = null, o;
  const r = Pe(e);
  function i() {
    var s;
    clearTimeout(o), (s = t) == null || s.disconnect(), t = null;
  }
  function l(s, a) {
    s === void 0 && (s = !1), a === void 0 && (a = 1), i();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: p,
      width: m,
      height: d
    } = u;
    if (s || n(), !m || !d)
      return;
    const f = Ct(p), h = Ct(r.clientWidth - (c + m)), v = Ct(r.clientHeight - (p + d)), x = Ct(c), b = {
      rootMargin: -f + "px " + -h + "px " + -v + "px " + -x + "px",
      threshold: pe(0, Ke(1, a)) || 1
    };
    let g = !0;
    function y(O) {
      const T = O[0].intersectionRatio;
      if (T !== a) {
        if (!g)
          return l();
        T ? l(!1, T) : o = setTimeout(() => {
          l(!1, 1e-7);
        }, 1e3);
      }
      T === 1 && !ei(u, e.getBoundingClientRect()) && l(), g = !1;
    }
    try {
      t = new IntersectionObserver(y, {
        ...b,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(y, b);
    }
    t.observe(e);
  }
  return l(!0), i;
}
function ba(e, n, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = o, u = zn(e), c = r || i ? [...u ? ht(u) : [], ...ht(n)] : [];
  c.forEach((x) => {
    r && x.addEventListener("scroll", t, {
      passive: !0
    }), i && x.addEventListener("resize", t);
  });
  const p = u && s ? ga(u, t) : null;
  let m = -1, d = null;
  l && (d = new ResizeObserver((x) => {
    let [w] = x;
    w && w.target === u && d && (d.unobserve(n), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var b;
      (b = d) == null || b.observe(n);
    })), t();
  }), u && !a && d.observe(u), d.observe(n));
  let f, h = a ? qe(e) : null;
  a && v();
  function v() {
    const x = qe(e);
    h && !ei(h, x) && t(), h = x, f = requestAnimationFrame(v);
  }
  return t(), () => {
    var x;
    c.forEach((w) => {
      r && w.removeEventListener("scroll", t), i && w.removeEventListener("resize", t);
    }), p == null || p(), (x = d) == null || x.disconnect(), d = null, a && cancelAnimationFrame(f);
  };
}
const rn = Ut, xa = ea, wa = ta, ya = Qs, Ea = na, Oa = (e, n, t) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: va,
    ...t
  }, i = {
    ...r.platform,
    _c: o
  };
  return Zs(e, n, {
    ...r,
    platform: i
  });
};
var $a = typeof document < "u", Sa = function() {
}, It = $a ? Tn : Sa;
function kt(e, n) {
  if (e === n)
    return !0;
  if (typeof e != typeof n)
    return !1;
  if (typeof e == "function" && e.toString() === n.toString())
    return !0;
  let t, o, r;
  if (e && n && typeof e == "object") {
    if (Array.isArray(e)) {
      if (t = e.length, t !== n.length) return !1;
      for (o = t; o-- !== 0; )
        if (!kt(e[o], n[o]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), t = r.length, t !== Object.keys(n).length)
      return !1;
    for (o = t; o-- !== 0; )
      if (!{}.hasOwnProperty.call(n, r[o]))
        return !1;
    for (o = t; o-- !== 0; ) {
      const i = r[o];
      if (!(i === "_owner" && e.$$typeof) && !kt(e[i], n[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && n !== n;
}
function ti(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function So(e, n) {
  const t = ti(e);
  return Math.round(n * t) / t;
}
function ln(e) {
  const n = E.useRef(e);
  return It(() => {
    n.current = e;
  }), n;
}
function Ta(e) {
  e === void 0 && (e = {});
  const {
    placement: n = "bottom",
    strategy: t = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: i,
      floating: l
    } = {},
    transform: s = !0,
    whileElementsMounted: a,
    open: u
  } = e, [c, p] = E.useState({
    x: 0,
    y: 0,
    strategy: t,
    placement: n,
    middlewareData: {},
    isPositioned: !1
  }), [m, d] = E.useState(o);
  kt(m, o) || d(o);
  const [f, h] = E.useState(null), [v, x] = E.useState(null), w = E.useCallback((N) => {
    N !== O.current && (O.current = N, h(N));
  }, []), b = E.useCallback((N) => {
    N !== T.current && (T.current = N, x(N));
  }, []), g = i || f, y = l || v, O = E.useRef(null), T = E.useRef(null), C = E.useRef(c), W = a != null, $ = ln(a), D = ln(r), I = ln(u), j = E.useCallback(() => {
    if (!O.current || !T.current)
      return;
    const N = {
      placement: n,
      strategy: t,
      middleware: m
    };
    D.current && (N.platform = D.current), Oa(O.current, T.current, N).then((z) => {
      const Z = {
        ...z,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: I.current !== !1
      };
      k.current && !kt(C.current, Z) && (C.current = Z, Pt.flushSync(() => {
        p(Z);
      }));
    });
  }, [m, n, t, D, I]);
  It(() => {
    u === !1 && C.current.isPositioned && (C.current.isPositioned = !1, p((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [u]);
  const k = E.useRef(!1);
  It(() => (k.current = !0, () => {
    k.current = !1;
  }), []), It(() => {
    if (g && (O.current = g), y && (T.current = y), g && y) {
      if ($.current)
        return $.current(g, y, j);
      j();
    }
  }, [g, y, j, $, W]);
  const S = E.useMemo(() => ({
    reference: O,
    floating: T,
    setReference: w,
    setFloating: b
  }), [w, b]), H = E.useMemo(() => ({
    reference: g,
    floating: y
  }), [g, y]), ee = E.useMemo(() => {
    const N = {
      position: t,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return N;
    const z = So(H.floating, c.x), Z = So(H.floating, c.y);
    return s ? {
      ...N,
      transform: "translate(" + z + "px, " + Z + "px)",
      ...ti(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: t,
      left: z,
      top: Z
    };
  }, [t, s, H.floating, c.x, c.y]);
  return E.useMemo(() => ({
    ...c,
    update: j,
    refs: S,
    elements: H,
    floatingStyles: ee
  }), [c, j, S, H, ee]);
}
const ni = (e, n) => ({
  ...xa(e),
  options: [e, n]
}), Ra = (e, n) => ({
  ...wa(e),
  options: [e, n]
}), Ca = (e, n) => ({
  ...ya(e),
  options: [e, n]
}), Ia = (e, n) => ({
  ...Ea(e),
  options: [e, n]
}), oi = {
  ...E
}, Pa = oi.useInsertionEffect, Aa = Pa || ((e) => e());
function ri(e) {
  const n = E.useRef(() => {
  });
  return Aa(() => {
    n.current = e;
  }), E.useCallback(function() {
    for (var t = arguments.length, o = new Array(t), r = 0; r < t; r++)
      o[r] = arguments[r];
    return n.current == null ? void 0 : n.current(...o);
  }, []);
}
var On = typeof document < "u" ? Tn : ie;
let To = !1, Fa = 0;
const Ro = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + Fa++
);
function Ma() {
  const [e, n] = E.useState(() => To ? Ro() : void 0);
  return On(() => {
    e == null && n(Ro());
  }, []), E.useEffect(() => {
    To = !0;
  }, []), e;
}
const La = oi.useId, Da = La || Ma;
function ka() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(n, t) {
      var o;
      (o = e.get(n)) == null || o.forEach((r) => r(t));
    },
    on(n, t) {
      e.set(n, [...e.get(n) || [], t]);
    },
    off(n, t) {
      var o;
      e.set(n, ((o = e.get(n)) == null ? void 0 : o.filter((r) => r !== t)) || []);
    }
  };
}
const Na = /* @__PURE__ */ E.createContext(null), ja = /* @__PURE__ */ E.createContext(null), _a = () => {
  var e;
  return ((e = E.useContext(Na)) == null ? void 0 : e.id) || null;
}, Ha = () => E.useContext(ja), Ba = "data-floating-ui-focusable";
function Wa(e) {
  const {
    open: n = !1,
    onOpenChange: t,
    elements: o
  } = e, r = Da(), i = E.useRef({}), [l] = E.useState(() => ka()), s = _a() != null, [a, u] = E.useState(o.reference), c = ri((d, f, h) => {
    i.current.openEvent = d ? f : void 0, l.emit("openchange", {
      open: d,
      event: f,
      reason: h,
      nested: s
    }), t == null || t(d, f, h);
  }), p = E.useMemo(() => ({
    setPositionReference: u
  }), []), m = E.useMemo(() => ({
    reference: a || o.reference || null,
    floating: o.floating || null,
    domReference: o.reference
  }), [a, o.reference, o.floating]);
  return E.useMemo(() => ({
    dataRef: i,
    open: n,
    onOpenChange: c,
    elements: m,
    events: l,
    floatingId: r,
    refs: p
  }), [n, c, m, l, r, p]);
}
function za(e) {
  e === void 0 && (e = {});
  const {
    nodeId: n
  } = e, t = Wa({
    ...e,
    elements: {
      reference: null,
      floating: null,
      ...e.elements
    }
  }), o = e.rootContext || t, r = o.elements, [i, l] = E.useState(null), [s, a] = E.useState(null), c = (r == null ? void 0 : r.domReference) || i, p = E.useRef(null), m = Ha();
  On(() => {
    c && (p.current = c);
  }, [c]);
  const d = Ta({
    ...e,
    elements: {
      ...r,
      ...s && {
        reference: s
      }
    }
  }), f = E.useCallback((b) => {
    const g = he(b) ? {
      getBoundingClientRect: () => b.getBoundingClientRect(),
      contextElement: b
    } : b;
    a(g), d.refs.setReference(g);
  }, [d.refs]), h = E.useCallback((b) => {
    (he(b) || b === null) && (p.current = b, l(b)), (he(d.refs.reference.current) || d.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    b !== null && !he(b)) && d.refs.setReference(b);
  }, [d.refs]), v = E.useMemo(() => ({
    ...d.refs,
    setReference: h,
    setPositionReference: f,
    domReference: p
  }), [d.refs, h, f]), x = E.useMemo(() => ({
    ...d.elements,
    domReference: c
  }), [d.elements, c]), w = E.useMemo(() => ({
    ...d,
    ...o,
    refs: v,
    elements: x,
    nodeId: n
  }), [d, v, x, n, o]);
  return On(() => {
    o.dataRef.current.floatingContext = w;
    const b = m == null ? void 0 : m.nodesRef.current.find((g) => g.id === n);
    b && (b.context = w);
  }), E.useMemo(() => ({
    ...d,
    context: w,
    refs: v,
    elements: x
  }), [d, v, x, w]);
}
const Co = "active", Io = "selected";
function sn(e, n, t) {
  const o = /* @__PURE__ */ new Map(), r = t === "item";
  let i = e;
  if (r && e) {
    const {
      [Co]: l,
      [Io]: s,
      ...a
    } = e;
    i = a;
  }
  return {
    ...t === "floating" && {
      tabIndex: -1,
      [Ba]: ""
    },
    ...i,
    ...n.map((l) => {
      const s = l ? l[t] : null;
      return typeof s == "function" ? e ? s(e) : null : s;
    }).concat(e).reduce((l, s) => (s && Object.entries(s).forEach((a) => {
      let [u, c] = a;
      if (!(r && [Co, Io].includes(u)))
        if (u.indexOf("on") === 0) {
          if (o.has(u) || o.set(u, []), typeof c == "function") {
            var p;
            (p = o.get(u)) == null || p.push(c), l[u] = function() {
              for (var m, d = arguments.length, f = new Array(d), h = 0; h < d; h++)
                f[h] = arguments[h];
              return (m = o.get(u)) == null ? void 0 : m.map((v) => v(...f)).find((v) => v !== void 0);
            };
          }
        } else
          l[u] = c;
    }), l), {})
  };
}
function Va(e) {
  e === void 0 && (e = []);
  const n = e.map((s) => s == null ? void 0 : s.reference), t = e.map((s) => s == null ? void 0 : s.floating), o = e.map((s) => s == null ? void 0 : s.item), r = E.useCallback(
    (s) => sn(s, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), i = E.useCallback(
    (s) => sn(s, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), l = E.useCallback(
    (s) => sn(s, e, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    o
  );
  return E.useMemo(() => ({
    getReferenceProps: r,
    getFloatingProps: i,
    getItemProps: l
  }), [r, i, l]);
}
function Po(e, n) {
  return {
    ...e,
    rects: {
      ...e.rects,
      floating: {
        ...e.rects.floating,
        height: n
      }
    }
  };
}
const Ua = (e) => ({
  name: "inner",
  options: e,
  async fn(n) {
    const {
      listRef: t,
      overflowRef: o,
      onFallbackChange: r,
      offset: i = 0,
      index: l = 0,
      minItemsVisible: s = 4,
      referenceOverflowThreshold: a = 0,
      scrollRef: u,
      ...c
    } = lt(e, n), {
      rects: p,
      elements: {
        floating: m
      }
    } = n, d = t.current[l], f = (u == null ? void 0 : u.current) || m, h = m.clientTop || f.clientTop, v = m.clientTop !== 0, x = f.clientTop !== 0, w = m === f;
    if (!d)
      return {};
    const b = {
      ...n,
      ...await ni(-d.offsetTop - m.clientTop - p.reference.height / 2 - d.offsetHeight / 2 - i).fn(n)
    }, g = await rn(Po(b, f.scrollHeight + h + m.clientTop), c), y = await rn(b, {
      ...c,
      elementContext: "reference"
    }), O = pe(0, g.top), T = b.y + O, $ = (f.scrollHeight > f.clientHeight ? (D) => D : vt)(pe(0, f.scrollHeight + (v && w || x ? h * 2 : 0) - O - pe(0, g.bottom)));
    if (f.style.maxHeight = $ + "px", f.scrollTop = O, r) {
      const D = f.offsetHeight < d.offsetHeight * Ke(s, t.current.length) - 1 || y.top >= -a || y.bottom >= -a;
      Pt.flushSync(() => r(D));
    }
    return o && (o.current = await rn(Po({
      ...b,
      y: T
    }, f.offsetHeight + h + m.clientTop), c)), {
      y: T
    };
  }
});
function Ga(e, n) {
  const {
    open: t,
    elements: o
  } = e, {
    enabled: r = !0,
    overflowRef: i,
    scrollRef: l,
    onChange: s
  } = n, a = ri(s), u = E.useRef(!1), c = E.useRef(null), p = E.useRef(null);
  E.useEffect(() => {
    if (!r) return;
    function d(h) {
      if (h.ctrlKey || !f || i.current == null)
        return;
      const v = h.deltaY, x = i.current.top >= -0.5, w = i.current.bottom >= -0.5, b = f.scrollHeight - f.clientHeight, g = v < 0 ? -1 : 1, y = v < 0 ? "max" : "min";
      f.scrollHeight <= f.clientHeight || (!x && v > 0 || !w && v < 0 ? (h.preventDefault(), Pt.flushSync(() => {
        a((O) => O + Math[y](v, b * g));
      })) : /firefox/i.test(Ws()) && (f.scrollTop += v));
    }
    const f = (l == null ? void 0 : l.current) || o.floating;
    if (t && f)
      return f.addEventListener("wheel", d), requestAnimationFrame(() => {
        c.current = f.scrollTop, i.current != null && (p.current = {
          ...i.current
        });
      }), () => {
        c.current = null, p.current = null, f.removeEventListener("wheel", d);
      };
  }, [r, t, o.floating, i, l, a]);
  const m = E.useMemo(() => ({
    onKeyDown() {
      u.current = !0;
    },
    onWheel() {
      u.current = !1;
    },
    onPointerMove() {
      u.current = !1;
    },
    onScroll() {
      const d = (l == null ? void 0 : l.current) || o.floating;
      if (!(!i.current || !d || !u.current)) {
        if (c.current !== null) {
          const f = d.scrollTop - c.current;
          (i.current.bottom < -0.5 && f < -1 || i.current.top < -0.5 && f > 1) && Pt.flushSync(() => a((h) => h + f));
        }
        requestAnimationFrame(() => {
          c.current = d.scrollTop;
        });
      }
    }
  }), [o.floating, a, i, l]);
  return E.useMemo(() => r ? {
    floating: m
  } : {}, [r, m]);
}
let st = se({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
st.displayName = "FloatingContext";
let Un = se(null);
Un.displayName = "PlacementContext";
function ii(e) {
  return G(() => e ? typeof e == "string" ? { to: e } : e : null, [e]);
}
function li() {
  return oe(st).setReference;
}
function Ka() {
  return oe(st).getReferenceProps;
}
function si() {
  let { getFloatingProps: e, slot: n } = oe(st);
  return V((...t) => Object.assign({}, e(...t), { "data-anchor": n.anchor }), [e, n]);
}
function ai(e = null) {
  e === !1 && (e = null), typeof e == "string" && (e = { to: e });
  let n = oe(Un), t = G(() => e, [JSON.stringify(e, (r, i) => {
    var l;
    return (l = i == null ? void 0 : i.outerHTML) != null ? l : i;
  })]);
  q(() => {
    n == null || n(t ?? null);
  }, [n, t]);
  let o = oe(st);
  return G(() => [o.setFloating, e ? o.styles : {}], [o.setFloating, e, o.styles]);
}
let Ao = 4;
function ui({ children: e, enabled: n = !0 }) {
  let [t, o] = X(null), [r, i] = X(0), l = _(null), [s, a] = X(null);
  qa(s);
  let u = n && t !== null && s !== null, { to: c = "bottom", gap: p = 0, offset: m = 0, padding: d = 0, inner: f } = Ya(t, s), [h, v = "center"] = c.split(" ");
  q(() => {
    u && i(0);
  }, [u]);
  let { refs: x, floatingStyles: w, context: b } = za({ open: u, placement: h === "selection" ? v === "center" ? "bottom" : `bottom-${v}` : v === "center" ? `${h}` : `${h}-${v}`, strategy: "absolute", transform: !1, middleware: [ni({ mainAxis: h === "selection" ? 0 : p, crossAxis: m }), Ra({ padding: d }), h !== "selection" && Ca({ padding: d }), h === "selection" && f ? Ua({ ...f, padding: d, overflowRef: l, offset: r, minItemsVisible: Ao, referenceOverflowThreshold: d, onFallbackChange(D) {
    var I, j;
    if (!D) return;
    let k = b.elements.floating;
    if (!k) return;
    let S = parseFloat(getComputedStyle(k).scrollPaddingBottom) || 0, H = Math.min(Ao, k.childElementCount), ee = 0, N = 0;
    for (let z of (j = (I = b.elements.floating) == null ? void 0 : I.childNodes) != null ? j : []) if (Ie(z)) {
      let Z = z.offsetTop, fe = Z + z.clientHeight + S, ne = k.scrollTop, Q = ne + k.clientHeight;
      if (Z >= ne && fe <= Q) H--;
      else {
        N = Math.max(0, Math.min(fe, Q) - Math.max(Z, ne)), ee = z.clientHeight;
        break;
      }
    }
    H >= 1 && i((z) => {
      let Z = ee * H - N + S;
      return z >= Z ? z : Z;
    });
  } }) : null, Ia({ padding: d, apply({ availableWidth: D, availableHeight: I, elements: j }) {
    Object.assign(j.floating.style, { overflow: "auto", maxWidth: `${D}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${I}px)` });
  } })].filter(Boolean), whileElementsMounted: ba }), [g = h, y = v] = b.placement.split("-");
  h === "selection" && (g = "selection");
  let O = G(() => ({ anchor: [g, y].filter(Boolean).join(" ") }), [g, y]), T = Ga(b, { overflowRef: l, onChange: i }), { getReferenceProps: C, getFloatingProps: W } = Va([T]), $ = M((D) => {
    a(D), x.setFloating(D);
  });
  return E.createElement(Un.Provider, { value: o }, E.createElement(st.Provider, { value: { setFloating: $, setReference: x.setReference, styles: w, getReferenceProps: C, getFloatingProps: W, slot: O } }, e));
}
function qa(e) {
  q(() => {
    if (!e) return;
    let n = new MutationObserver(() => {
      let t = window.getComputedStyle(e).maxHeight, o = parseFloat(t);
      if (isNaN(o)) return;
      let r = parseInt(t);
      isNaN(r) || o !== r && (e.style.maxHeight = `${Math.ceil(o)}px`);
    });
    return n.observe(e, { attributes: !0, attributeFilter: ["style"] }), () => {
      n.disconnect();
    };
  }, [e]);
}
function Ya(e, n) {
  var t, o, r;
  let i = an((t = e == null ? void 0 : e.gap) != null ? t : "var(--anchor-gap, 0)", n), l = an((o = e == null ? void 0 : e.offset) != null ? o : "var(--anchor-offset, 0)", n), s = an((r = e == null ? void 0 : e.padding) != null ? r : "var(--anchor-padding, 0)", n);
  return { ...e, gap: i, offset: l, padding: s };
}
function an(e, n, t = void 0) {
  let o = Ye(), r = M((a, u) => {
    if (a == null) return [t, null];
    if (typeof a == "number") return [a, null];
    if (typeof a == "string") {
      if (!u) return [t, null];
      let c = Fo(a, u);
      return [c, (p) => {
        let m = ci(a);
        {
          let d = m.map((f) => window.getComputedStyle(u).getPropertyValue(f));
          o.requestAnimationFrame(function f() {
            o.nextFrame(f);
            let h = !1;
            for (let [x, w] of m.entries()) {
              let b = window.getComputedStyle(u).getPropertyValue(w);
              if (d[x] !== b) {
                d[x] = b, h = !0;
                break;
              }
            }
            if (!h) return;
            let v = Fo(a, u);
            c !== v && (p(v), c = v);
          });
        }
        return o.dispose;
      }];
    }
    return [t, null];
  }), i = G(() => r(e, n)[0], [e, n]), [l = i, s] = X();
  return q(() => {
    let [a, u] = r(e, n);
    if (s(a), !!u) return u(s);
  }, [e, n]), l;
}
function ci(e) {
  let n = /var\((.*)\)/.exec(e);
  if (n) {
    let t = n[1].indexOf(",");
    if (t === -1) return [n[1]];
    let o = n[1].slice(0, t).trim(), r = n[1].slice(t + 1).trim();
    return r ? [o, ...ci(r)] : [o];
  }
  return [];
}
function Fo(e, n) {
  let t = document.createElement("div");
  n.appendChild(t), t.style.setProperty("margin-top", "0px", "important"), t.style.setProperty("margin-top", e, "important");
  let o = parseFloat(window.getComputedStyle(t).marginTop) || 0;
  return n.removeChild(t), o;
}
function Xa({ children: e, freeze: n }) {
  let t = Nt(n, e);
  return L.createElement(L.Fragment, null, t);
}
function Nt(e, n) {
  let [t, o] = X(n);
  return !e && t !== n && o(n), e ? t : n;
}
let Gn = se(null);
Gn.displayName = "OpenClosedContext";
var ve = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(ve || {});
function Gt() {
  return oe(Gn);
}
function Kn({ value: e, children: n }) {
  return L.createElement(Gn.Provider, { value: e }, n);
}
function Za(e) {
  function n() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", n));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", n), n());
}
let Be = [];
Za(() => {
  function e(n) {
    if (!ze(n.target) || n.target === document.body || Be[0] === n.target) return;
    let t = n.target;
    t = t.closest(Mt), Be.unshift(t ?? n.target), Be = Be.filter((o) => o != null && o.isConnected), Be.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Qa(e) {
  throw new Error("Unexpected object: " + e);
}
var B = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(B || {});
function Qe(e, n) {
  let t = n.resolveItems();
  if (t.length <= 0) return null;
  let o = n.resolveActiveIndex(), r = o ?? -1;
  switch (e.focus) {
    case 0: {
      for (let i = 0; i < t.length; ++i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return o;
    }
    case 1: {
      r === -1 && (r = t.length);
      for (let i = r - 1; i >= 0; --i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return o;
    }
    case 2: {
      for (let i = r + 1; i < t.length; ++i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return o;
    }
    case 3: {
      for (let i = t.length - 1; i >= 0; --i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return o;
    }
    case 4: {
      for (let i = 0; i < t.length; ++i) if (n.resolveId(t[i], i, t) === e.id) return i;
      return o;
    }
    case 5:
      return null;
    default:
      Qa(e);
  }
}
var qn = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(qn || {});
function Yn(e) {
  let n = M(e), t = _(!1);
  ie(() => (t.current = !1, () => {
    t.current = !0, lr(() => {
      t.current && n();
    });
  }), [n]);
}
function Ja() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in E ? ((n) => n.useSyncExternalStore)(E)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Xn() {
  let e = Ja(), [n, t] = E.useState(Ue.isHandoffComplete);
  return n && Ue.isHandoffComplete === !1 && t(!1), E.useEffect(() => {
    n !== !0 && t(!0);
  }, [n]), E.useEffect(() => Ue.handoff(), []), e ? !1 : n;
}
let eu = se(!1);
function tu() {
  return oe(eu);
}
function nu(e) {
  let n = tu(), t = oe(fi), [o, r] = X(() => {
    var i;
    if (!n && t !== null) return (i = t.current) != null ? i : null;
    if (Ue.isServer) return null;
    let l = e == null ? void 0 : e.getElementById("headlessui-portal-root");
    if (l) return l;
    if (e === null) return null;
    let s = e.createElement("div");
    return s.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(s);
  });
  return ie(() => {
    o !== null && (e != null && e.body.contains(o) || e == null || e.body.appendChild(o));
  }, [o, e]), ie(() => {
    n || t !== null && r(t.current);
  }, [t, r, n]), o;
}
let di = be, ou = ae(function(e, n) {
  let { ownerDocument: t = null, ...o } = e, r = _(null), i = me(Il((d) => {
    r.current = d;
  }), n), l = nt(r), s = t ?? l, a = nu(s), [u] = X(() => {
    var d;
    return Ue.isServer ? null : (d = s == null ? void 0 : s.createElement("div")) != null ? d : null;
  }), c = oe(su), p = Xn();
  q(() => {
    !a || !u || a.contains(u) || (u.setAttribute("data-headlessui-portal", ""), a.appendChild(u));
  }, [a, u]), q(() => {
    if (u && c) return c.register(u);
  }, [c, u]), Yn(() => {
    var d;
    !a || !u || (Mn(u) && a.contains(u) && a.removeChild(u), a.childNodes.length <= 0 && ((d = a.parentElement) == null || d.removeChild(a)));
  });
  let m = de();
  return p ? !a || !u ? null : Uo(m({ ourProps: { ref: i }, theirProps: o, slot: {}, defaultTag: di, name: "Portal" }), u) : null;
});
function ru(e, n) {
  let t = me(n), { enabled: o = !0, ownerDocument: r, ...i } = e, l = de();
  return o ? L.createElement(ou, { ...i, ownerDocument: r, ref: t }) : l({ ourProps: { ref: t }, theirProps: i, slot: {}, defaultTag: di, name: "Portal" });
}
let iu = be, fi = se(null);
function lu(e, n) {
  let { target: t, ...o } = e, r = { ref: me(n) }, i = de();
  return L.createElement(fi.Provider, { value: t }, i({ ourProps: r, theirProps: o, defaultTag: iu, name: "Popover.Group" }));
}
let su = se(null), au = ae(ru), uu = ae(lu), pi = Object.assign(au, { Group: uu });
var cu = Object.defineProperty, du = (e, n, t) => n in e ? cu(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Mo = (e, n, t) => (du(e, typeof n != "symbol" ? n + "" : n, t), t), U = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(U || {}), ge = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(ge || {}), ke = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))(ke || {}), mi = ((e) => (e[e.OpenCombobox = 0] = "OpenCombobox", e[e.CloseCombobox = 1] = "CloseCombobox", e[e.GoToOption = 2] = "GoToOption", e[e.SetTyping = 3] = "SetTyping", e[e.RegisterOption = 4] = "RegisterOption", e[e.UnregisterOption = 5] = "UnregisterOption", e[e.DefaultToFirstOption = 6] = "DefaultToFirstOption", e[e.SetActivationTrigger = 7] = "SetActivationTrigger", e[e.UpdateVirtualConfiguration = 8] = "UpdateVirtualConfiguration", e[e.SetInputElement = 9] = "SetInputElement", e[e.SetButtonElement = 10] = "SetButtonElement", e[e.SetOptionsElement = 11] = "SetOptionsElement", e))(mi || {});
function un(e, n = (t) => t) {
  let t = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, o = n(e.options.slice()), r = o.length > 0 && o[0].dataRef.current.order !== null ? o.sort((l, s) => l.dataRef.current.order - s.dataRef.current.order) : jn(o, (l) => l.dataRef.current.domRef.current), i = t ? r.indexOf(t) : null;
  return i === -1 && (i = null), { options: r, activeOptionIndex: i };
}
let fu = { 1(e) {
  var n;
  return (n = e.dataRef.current) != null && n.disabled || e.comboboxState === 1 ? e : { ...e, activeOptionIndex: null, comboboxState: 1, isTyping: !1, activationTrigger: 2, __demoMode: !1 };
}, 0(e) {
  var n, t;
  if ((n = e.dataRef.current) != null && n.disabled || e.comboboxState === 0) return e;
  if ((t = e.dataRef.current) != null && t.value) {
    let o = e.dataRef.current.calculateIndex(e.dataRef.current.value);
    if (o !== -1) return { ...e, activeOptionIndex: o, comboboxState: 0, __demoMode: !1 };
  }
  return { ...e, comboboxState: 0, __demoMode: !1 };
}, 3(e, n) {
  return e.isTyping === n.isTyping ? e : { ...e, isTyping: n.isTyping };
}, 2(e, n) {
  var t, o, r, i;
  if ((t = e.dataRef.current) != null && t.disabled || e.optionsElement && !((o = e.dataRef.current) != null && o.optionsPropsRef.current.static) && e.comboboxState === 1) return e;
  if (e.virtual) {
    let { options: u, disabled: c } = e.virtual, p = n.focus === B.Specific ? n.idx : Qe(n, { resolveItems: () => u, resolveActiveIndex: () => {
      var d, f;
      return (f = (d = e.activeOptionIndex) != null ? d : u.findIndex((h) => !c(h))) != null ? f : null;
    }, resolveDisabled: c, resolveId() {
      throw new Error("Function not implemented.");
    } }), m = (r = n.trigger) != null ? r : 2;
    return e.activeOptionIndex === p && e.activationTrigger === m ? e : { ...e, activeOptionIndex: p, activationTrigger: m, isTyping: !1, __demoMode: !1 };
  }
  let l = un(e);
  if (l.activeOptionIndex === null) {
    let u = l.options.findIndex((c) => !c.dataRef.current.disabled);
    u !== -1 && (l.activeOptionIndex = u);
  }
  let s = n.focus === B.Specific ? n.idx : Qe(n, { resolveItems: () => l.options, resolveActiveIndex: () => l.activeOptionIndex, resolveId: (u) => u.id, resolveDisabled: (u) => u.dataRef.current.disabled }), a = (i = n.trigger) != null ? i : 2;
  return e.activeOptionIndex === s && e.activationTrigger === a ? e : { ...e, ...l, isTyping: !1, activeOptionIndex: s, activationTrigger: a, __demoMode: !1 };
}, 4: (e, n) => {
  var t, o, r, i;
  if ((t = e.dataRef.current) != null && t.virtual) return { ...e, options: [...e.options, n.payload] };
  let l = n.payload, s = un(e, (u) => (u.push(l), u));
  e.activeOptionIndex === null && (r = (o = e.dataRef.current).isSelected) != null && r.call(o, n.payload.dataRef.current.value) && (s.activeOptionIndex = s.options.indexOf(l));
  let a = { ...e, ...s, activationTrigger: 2 };
  return (i = e.dataRef.current) != null && i.__demoMode && e.dataRef.current.value === void 0 && (a.activeOptionIndex = 0), a;
}, 5: (e, n) => {
  var t;
  if ((t = e.dataRef.current) != null && t.virtual) return { ...e, options: e.options.filter((r) => r.id !== n.id) };
  let o = un(e, (r) => {
    let i = r.findIndex((l) => l.id === n.id);
    return i !== -1 && r.splice(i, 1), r;
  });
  return { ...e, ...o, activationTrigger: 2 };
}, 6: (e, n) => e.defaultToFirstOption === n.value ? e : { ...e, defaultToFirstOption: n.value }, 7: (e, n) => e.activationTrigger === n.trigger ? e : { ...e, activationTrigger: n.trigger }, 8: (e, n) => {
  var t, o;
  if (e.virtual === null) return { ...e, virtual: { options: n.options, disabled: (t = n.disabled) != null ? t : () => !1 } };
  if (e.virtual.options === n.options && e.virtual.disabled === n.disabled) return e;
  let r = e.activeOptionIndex;
  if (e.activeOptionIndex !== null) {
    let i = n.options.indexOf(e.virtual.options[e.activeOptionIndex]);
    i !== -1 ? r = i : r = null;
  }
  return { ...e, activeOptionIndex: r, virtual: { options: n.options, disabled: (o = n.disabled) != null ? o : () => !1 } };
}, 9: (e, n) => e.inputElement === n.element ? e : { ...e, inputElement: n.element }, 10: (e, n) => e.buttonElement === n.element ? e : { ...e, buttonElement: n.element }, 11: (e, n) => e.optionsElement === n.element ? e : { ...e, optionsElement: n.element } };
class Zn extends Dn {
  constructor(n) {
    super(n), Mo(this, "actions", { onChange: (t) => {
      let { onChange: o, compare: r, mode: i, value: l } = this.state.dataRef.current;
      return ce(i, { 0: () => o == null ? void 0 : o(t), 1: () => {
        let s = l.slice(), a = s.findIndex((u) => r(u, t));
        return a === -1 ? s.push(t) : s.splice(a, 1), o == null ? void 0 : o(s);
      } });
    }, registerOption: (t, o) => (this.send({ type: 4, payload: { id: t, dataRef: o } }), () => {
      this.state.activeOptionIndex === this.state.dataRef.current.calculateIndex(o.current.value) && this.send({ type: 6, value: !0 }), this.send({ type: 5, id: t });
    }), goToOption: (t, o) => (this.send({ type: 6, value: !1 }), this.send({ type: 2, ...t, trigger: o })), setIsTyping: (t) => {
      this.send({ type: 3, isTyping: t });
    }, closeCombobox: () => {
      var t, o;
      this.send({ type: 1 }), this.send({ type: 6, value: !1 }), (o = (t = this.state.dataRef.current).onClose) == null || o.call(t);
    }, openCombobox: () => {
      this.send({ type: 0 }), this.send({ type: 6, value: !0 });
    }, setActivationTrigger: (t) => {
      this.send({ type: 7, trigger: t });
    }, selectActiveOption: () => {
      let t = this.selectors.activeOptionIndex(this.state);
      if (t !== null) {
        if (this.actions.setIsTyping(!1), this.state.virtual) this.actions.onChange(this.state.virtual.options[t]);
        else {
          let { dataRef: o } = this.state.options[t];
          this.actions.onChange(o.current.value);
        }
        this.actions.goToOption({ focus: B.Specific, idx: t });
      }
    }, setInputElement: (t) => {
      this.send({ type: 9, element: t });
    }, setButtonElement: (t) => {
      this.send({ type: 10, element: t });
    }, setOptionsElement: (t) => {
      this.send({ type: 11, element: t });
    } }), Mo(this, "selectors", { activeDescendantId: (t) => {
      var o, r;
      let i = this.selectors.activeOptionIndex(t);
      if (i !== null) return t.virtual ? (r = t.options.find((l) => !l.dataRef.current.disabled && t.dataRef.current.compare(l.dataRef.current.value, t.virtual.options[i]))) == null ? void 0 : r.id : (o = t.options[i]) == null ? void 0 : o.id;
    }, activeOptionIndex: (t) => {
      if (t.defaultToFirstOption && t.activeOptionIndex === null && (t.virtual ? t.virtual.options.length > 0 : t.options.length > 0)) {
        if (t.virtual) {
          let { options: r, disabled: i } = t.virtual, l = r.findIndex((s) => {
            var a;
            return !((a = i == null ? void 0 : i(s)) != null && a);
          });
          if (l !== -1) return l;
        }
        let o = t.options.findIndex((r) => !r.dataRef.current.disabled);
        if (o !== -1) return o;
      }
      return t.activeOptionIndex;
    }, activeOption: (t) => {
      var o, r;
      let i = this.selectors.activeOptionIndex(t);
      return i === null ? null : t.virtual ? t.virtual.options[i ?? 0] : (r = (o = t.options[i]) == null ? void 0 : o.dataRef.current.value) != null ? r : null;
    }, isActive: (t, o, r) => {
      var i;
      let l = this.selectors.activeOptionIndex(t);
      return l === null ? !1 : t.virtual ? l === t.dataRef.current.calculateIndex(o) : ((i = t.options[l]) == null ? void 0 : i.id) === r;
    }, shouldScrollIntoView: (t, o, r) => !(t.virtual || t.__demoMode || t.comboboxState !== 0 || t.activationTrigger === 0 || !this.selectors.isActive(t, o, r)) });
    {
      let t = this.state.id, o = yt.get(null);
      this.disposables.add(o.on(kn.Push, (r) => {
        !o.selectors.isTop(r, t) && this.state.comboboxState === 0 && this.actions.closeCombobox();
      })), this.on(0, () => o.actions.push(t)), this.on(1, () => o.actions.pop(t));
    }
  }
  static new({ id: n, virtual: t = null, __demoMode: o = !1 }) {
    var r;
    return new Zn({ id: n, dataRef: { current: {} }, comboboxState: o ? 0 : 1, isTyping: !1, options: [], virtual: t ? { options: t.options, disabled: (r = t.disabled) != null ? r : () => !1 } : null, activeOptionIndex: null, activationTrigger: 2, inputElement: null, buttonElement: null, optionsElement: null, __demoMode: o });
  }
  reduce(n, t) {
    return ce(t.type, fu, n, t);
  }
}
const hi = se(null);
function St(e) {
  let n = oe(hi);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, vi), t;
  }
  return n;
}
function vi({ id: e, virtual: n = null, __demoMode: t = !1 }) {
  let o = G(() => Zn.new({ id: e, virtual: n, __demoMode: t }), []);
  return Yn(() => o.dispose()), o;
}
let gt = se(null);
gt.displayName = "ComboboxDataContext";
function at(e) {
  let n = oe(gt);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, at), t;
  }
  return n;
}
let gi = se(null);
function pu(e) {
  let n = St("VirtualProvider"), t = at("VirtualProvider"), { options: o } = t.virtual, r = J(n, (d) => d.optionsElement), [i, l] = G(() => {
    let d = r;
    if (!d) return [0, 0];
    let f = window.getComputedStyle(d);
    return [parseFloat(f.paddingBlockStart || f.paddingTop), parseFloat(f.paddingBlockEnd || f.paddingBottom)];
  }, [r]), s = Kl({ enabled: o.length !== 0, scrollPaddingStart: i, scrollPaddingEnd: l, count: o.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return n.state.optionsElement;
  }, overscan: 12 }), [a, u] = X(0);
  q(() => {
    u((d) => d + 1);
  }, [o]);
  let c = s.getVirtualItems(), p = J(n, (d) => d.activationTrigger === ke.Pointer), m = J(n, n.selectors.activeOptionIndex);
  return c.length === 0 ? null : L.createElement(gi.Provider, { value: s }, L.createElement("div", { style: { position: "relative", width: "100%", height: `${s.getTotalSize()}px` }, ref: (d) => {
    d && (p || m !== null && o.length > m && s.scrollToIndex(m));
  } }, c.map((d) => {
    var f;
    return L.createElement(be, { key: d.key }, L.cloneElement((f = e.children) == null ? void 0 : f.call(e, { ...e.slot, option: o[d.index] }), { key: `${a}-${d.key}`, "data-index": d.index, "aria-setsize": o.length, "aria-posinset": d.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${d.start}px)`, overflowAnchor: "none" } }));
  })));
}
let mu = be;
function hu(e, n) {
  let t = Ee(), o = _t(), { value: r, defaultValue: i, onChange: l, form: s, name: a, by: u, invalid: c = !1, disabled: p = o || !1, onClose: m, __demoMode: d = !1, multiple: f = !1, immediate: h = !1, virtual: v = null, nullable: x, ...w } = e, b = cr(i), [g = f ? [] : void 0, y] = ur(r, l, b), O = vi({ id: t, virtual: v, __demoMode: d }), T = _({ static: !1, hold: !1 }), C = Sr(u), W = M((R) => v ? u === null ? v.options.indexOf(R) : v.options.findIndex((Y) => C(Y, R)) : O.state.options.findIndex((Y) => C(Y.dataRef.current.value, R))), $ = V((R) => ce(j.mode, { [ge.Multi]: () => g.some((Y) => C(Y, R)), [ge.Single]: () => C(g, R) }), [g]), D = J(O, (R) => R.virtual), I = M(() => m == null ? void 0 : m()), j = G(() => ({ __demoMode: d, immediate: h, optionsPropsRef: T, value: g, defaultValue: b, disabled: p, invalid: c, mode: f ? ge.Multi : ge.Single, virtual: v ? D : null, onChange: y, isSelected: $, calculateIndex: W, compare: C, onClose: I }), [g, b, p, c, f, y, $, d, O, v, D, I]);
  q(() => {
    var R;
    v && O.send({ type: mi.UpdateVirtualConfiguration, options: v.options, disabled: (R = v.disabled) != null ? R : null });
  }, [v, v == null ? void 0 : v.options, v == null ? void 0 : v.disabled]), q(() => {
    O.state.dataRef.current = j;
  }, [j]);
  let [k, S, H, ee] = J(O, (R) => [R.comboboxState, R.buttonElement, R.inputElement, R.optionsElement]), N = yt.get(null), z = J(N, V((R) => N.selectors.isTop(R, t), [N, t]));
  jr(z, [S, H, ee], () => O.actions.closeCombobox());
  let Z = J(O, O.selectors.activeOptionIndex), fe = J(O, O.selectors.activeOption), ne = G(() => ({ open: k === U.Open, disabled: p, invalid: c, activeIndex: Z, activeOption: fe, value: g }), [j, p, g, c, fe, k]), [Q, A] = Er(), le = n === null ? {} : { ref: n }, re = V(() => {
    if (b !== void 0) return y == null ? void 0 : y(b);
  }, [y, b]), F = de();
  return L.createElement(A, { value: Q, props: { htmlFor: H == null ? void 0 : H.id }, slot: { open: k === U.Open, disabled: p } }, L.createElement(ui, null, L.createElement(gt.Provider, { value: j }, L.createElement(hi.Provider, { value: O }, L.createElement(Kn, { value: ce(k, { [U.Open]: ve.Open, [U.Closed]: ve.Closed }) }, a != null && L.createElement(hr, { disabled: p, data: g != null ? { [a]: g } : {}, form: s, onReset: re }), F({ ourProps: le, theirProps: w, slot: ne, defaultTag: mu, name: "Combobox" }))))));
}
let vu = "input";
function gu(e, n) {
  var t, o;
  let r = St("Combobox.Input"), i = at("Combobox.Input"), l = Ee(), s = Fn(), { id: a = s || `headlessui-combobox-input-${l}`, onChange: u, displayValue: c, disabled: p = i.disabled || !1, autoFocus: m = !1, type: d = "text", ...f } = e, [h] = J(r, (A) => [A.inputElement]), v = _(null), x = me(v, n, li(), r.actions.setInputElement), w = nt(h), [b, g] = J(r, (A) => [A.comboboxState, A.isTyping]), y = Ye(), O = M(() => {
    r.actions.onChange(null), r.state.optionsElement && (r.state.optionsElement.scrollTop = 0), r.actions.goToOption({ focus: B.Nothing });
  }), T = G(() => {
    var A;
    return typeof c == "function" && i.value !== void 0 ? (A = c(i.value)) != null ? A : "" : typeof i.value == "string" ? i.value : "";
  }, [i.value, c]);
  xo(([A, le], [re, F]) => {
    if (r.state.isTyping) return;
    let R = v.current;
    R && ((F === U.Open && le === U.Closed || A !== re) && (R.value = A), requestAnimationFrame(() => {
      if (r.state.isTyping || !R || (w == null ? void 0 : w.activeElement) !== R) return;
      let { selectionStart: Y, selectionEnd: te } = R;
      Math.abs((te ?? 0) - (Y ?? 0)) === 0 && Y === 0 && R.setSelectionRange(R.value.length, R.value.length);
    }));
  }, [T, b, w, g]), xo(([A], [le]) => {
    if (A === U.Open && le === U.Closed) {
      if (r.state.isTyping) return;
      let re = v.current;
      if (!re) return;
      let F = re.value, { selectionStart: R, selectionEnd: Y, selectionDirection: te } = re;
      re.value = "", re.value = F, te !== null ? re.setSelectionRange(R, Y, te) : re.setSelectionRange(R, Y);
    }
  }, [b]);
  let C = _(!1), W = M(() => {
    C.current = !0;
  }), $ = M(() => {
    y.nextFrame(() => {
      C.current = !1;
    });
  }), D = M((A) => {
    switch (r.actions.setIsTyping(!0), A.key) {
      case K.Enter:
        if (r.state.comboboxState !== U.Open || C.current) return;
        if (A.preventDefault(), A.stopPropagation(), r.selectors.activeOptionIndex(r.state) === null) {
          r.actions.closeCombobox();
          return;
        }
        r.actions.selectActiveOption(), i.mode === ge.Single && r.actions.closeCombobox();
        break;
      case K.ArrowDown:
        return A.preventDefault(), A.stopPropagation(), ce(r.state.comboboxState, { [U.Open]: () => r.actions.goToOption({ focus: B.Next }), [U.Closed]: () => r.actions.openCombobox() });
      case K.ArrowUp:
        return A.preventDefault(), A.stopPropagation(), ce(r.state.comboboxState, { [U.Open]: () => r.actions.goToOption({ focus: B.Previous }), [U.Closed]: () => {
          ye(() => r.actions.openCombobox()), i.value || r.actions.goToOption({ focus: B.Last });
        } });
      case K.Home:
        if (A.shiftKey) break;
        return A.preventDefault(), A.stopPropagation(), r.actions.goToOption({ focus: B.First });
      case K.PageUp:
        return A.preventDefault(), A.stopPropagation(), r.actions.goToOption({ focus: B.First });
      case K.End:
        if (A.shiftKey) break;
        return A.preventDefault(), A.stopPropagation(), r.actions.goToOption({ focus: B.Last });
      case K.PageDown:
        return A.preventDefault(), A.stopPropagation(), r.actions.goToOption({ focus: B.Last });
      case K.Escape:
        return r.state.comboboxState !== U.Open ? void 0 : (A.preventDefault(), r.state.optionsElement && !i.optionsPropsRef.current.static && A.stopPropagation(), i.mode === ge.Single && i.value === null && O(), r.actions.closeCombobox());
      case K.Tab:
        if (r.state.comboboxState !== U.Open) return;
        i.mode === ge.Single && r.state.activationTrigger !== ke.Focus && r.actions.selectActiveOption(), r.actions.closeCombobox();
        break;
    }
  }), I = M((A) => {
    u == null || u(A), i.mode === ge.Single && A.target.value === "" && O(), r.actions.openCombobox();
  }), j = M((A) => {
    var le, re, F;
    let R = (le = A.relatedTarget) != null ? le : Be.find((Y) => Y !== A.currentTarget);
    if (!((re = r.state.optionsElement) != null && re.contains(R)) && !((F = r.state.buttonElement) != null && F.contains(R)) && r.state.comboboxState === U.Open) return A.preventDefault(), i.mode === ge.Single && i.value === null && O(), r.actions.closeCombobox();
  }), k = M((A) => {
    var le, re, F;
    let R = (le = A.relatedTarget) != null ? le : Be.find((Y) => Y !== A.currentTarget);
    (re = r.state.buttonElement) != null && re.contains(R) || (F = r.state.optionsElement) != null && F.contains(R) || i.disabled || i.immediate && r.state.comboboxState !== U.Open && y.microTask(() => {
      ye(() => r.actions.openCombobox()), r.actions.setActivationTrigger(ke.Focus);
    });
  }), S = wt(), H = wr(), { isFocused: ee, focusProps: N } = Pn({ autoFocus: m }), { isHovered: z, hoverProps: Z } = In({ isDisabled: p }), fe = J(r, (A) => A.optionsElement), ne = G(() => ({ open: b === U.Open, disabled: p, invalid: i.invalid, hover: z, focus: ee, autofocus: m }), [i, z, ee, m, p, i.invalid]), Q = xt({ ref: x, id: a, role: "combobox", type: d, "aria-controls": fe == null ? void 0 : fe.id, "aria-expanded": b === U.Open, "aria-activedescendant": J(r, r.selectors.activeDescendantId), "aria-labelledby": S, "aria-describedby": H, "aria-autocomplete": "list", defaultValue: (o = (t = e.defaultValue) != null ? t : i.defaultValue !== void 0 ? c == null ? void 0 : c(i.defaultValue) : null) != null ? o : i.defaultValue, disabled: p || void 0, autoFocus: m, onCompositionStart: W, onCompositionEnd: $, onKeyDown: D, onChange: I, onFocus: k, onBlur: j }, N, Z);
  return de()({ ourProps: Q, theirProps: f, slot: ne, defaultTag: vu, name: "Combobox.Input" });
}
let bu = "button";
function xu(e, n) {
  let t = St("Combobox.Button"), o = at("Combobox.Button"), [r, i] = X(null), l = me(n, i, t.actions.setButtonElement), s = Ee(), { id: a = `headlessui-combobox-button-${s}`, disabled: u = o.disabled || !1, autoFocus: c = !1, ...p } = e, [m, d, f] = J(t, (I) => [I.comboboxState, I.inputElement, I.optionsElement]), h = Hr(d), v = m === U.Open;
  _r(v, { trigger: r, action: V((I) => {
    if (r != null && r.contains(I.target) || d != null && d.contains(I.target)) return Ae.Ignore;
    let j = I.target.closest('[role="option"]:not([data-disabled])');
    return Ie(j) ? Ae.Select(j) : f != null && f.contains(I.target) ? Ae.Ignore : Ae.Close;
  }, [r, d, f]), close: t.actions.closeCombobox, select: t.actions.selectActiveOption });
  let x = M((I) => {
    switch (I.key) {
      case K.Space:
      case K.Enter:
        I.preventDefault(), I.stopPropagation(), t.state.comboboxState === U.Closed && ye(() => t.actions.openCombobox()), h();
        return;
      case K.ArrowDown:
        I.preventDefault(), I.stopPropagation(), t.state.comboboxState === U.Closed && (ye(() => t.actions.openCombobox()), t.state.dataRef.current.value || t.actions.goToOption({ focus: B.First })), h();
        return;
      case K.ArrowUp:
        I.preventDefault(), I.stopPropagation(), t.state.comboboxState === U.Closed && (ye(() => t.actions.openCombobox()), t.state.dataRef.current.value || t.actions.goToOption({ focus: B.Last })), h();
        return;
      case K.Escape:
        if (t.state.comboboxState !== U.Open) return;
        I.preventDefault(), t.state.optionsElement && !o.optionsPropsRef.current.static && I.stopPropagation(), ye(() => t.actions.closeCombobox()), h();
        return;
      default:
        return;
    }
  }), w = M((I) => {
    I.preventDefault(), !gr(I.currentTarget) && (I.button === qn.Left && (t.state.comboboxState === U.Open ? t.actions.closeCombobox() : t.actions.openCombobox()), h());
  }), b = wt([a]), { isFocusVisible: g, focusProps: y } = Pn({ autoFocus: c }), { isHovered: O, hoverProps: T } = In({ isDisabled: u }), { pressed: C, pressProps: W } = sr({ disabled: u }), $ = G(() => ({ open: m === U.Open, active: C || m === U.Open, disabled: u, invalid: o.invalid, value: o.value, hover: O, focus: g }), [o, O, g, C, u, m]), D = xt({ ref: l, id: a, type: Br(e, r), tabIndex: -1, "aria-haspopup": "listbox", "aria-controls": f == null ? void 0 : f.id, "aria-expanded": m === U.Open, "aria-labelledby": b, disabled: u || void 0, autoFocus: c, onPointerDown: w, onKeyDown: x }, y, T, W);
  return de()({ ourProps: D, theirProps: p, slot: $, defaultTag: bu, name: "Combobox.Button" });
}
let wu = "div", yu = tt.RenderStrategy | tt.Static;
function Eu(e, n) {
  var t, o, r;
  let i = Ee(), { id: l = `headlessui-combobox-options-${i}`, hold: s = !1, anchor: a, portal: u = !1, modal: c = !0, transition: p = !1, ...m } = e, d = St("Combobox.Options"), f = at("Combobox.Options"), h = ii(a);
  h && (u = !0);
  let [v, x] = ai(h), [w, b] = X(null), g = si(), y = me(n, h ? v : null, d.actions.setOptionsElement, b), [O, T, C, W, $] = J(d, (te) => [te.comboboxState, te.inputElement, te.buttonElement, te.optionsElement, te.activationTrigger]), D = nt(T || C), I = nt(W), j = Gt(), [k, S] = Hn(p, w, j !== null ? (j & ve.Open) === ve.Open : O === U.Open);
  Lr(k, T, d.actions.closeCombobox);
  let H = f.__demoMode ? !1 : c && O === U.Open;
  Wr(H, I);
  let ee = f.__demoMode ? !1 : c && O === U.Open;
  Mr(ee, { allowed: V(() => [T, C, W], [T, C, W]) }), q(() => {
    var te;
    f.optionsPropsRef.current.static = (te = e.static) != null ? te : !1;
  }, [f.optionsPropsRef, e.static]), q(() => {
    f.optionsPropsRef.current.hold = s;
  }, [f.optionsPropsRef, s]), _s(O === U.Open, { container: W, accept(te) {
    return te.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : te.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(te) {
    te.setAttribute("role", "none");
  } });
  let N = wt([C == null ? void 0 : C.id]), z = G(() => ({ open: O === U.Open, option: void 0 }), [O]), Z = M(() => {
    d.actions.setActivationTrigger(ke.Pointer);
  }), fe = M((te) => {
    te.preventDefault(), d.actions.setActivationTrigger(ke.Pointer);
  }), ne = xt(h ? g() : {}, { "aria-labelledby": N, role: "listbox", "aria-multiselectable": f.mode === ge.Multi ? !0 : void 0, id: l, ref: y, style: { ...m.style, ...x, "--input-width": gn(T, !0).width, "--button-width": gn(C, !0).width }, onWheel: $ === ke.Pointer ? void 0 : Z, onMouseDown: fe, ..._n(S) }), Q = k && O === U.Closed, A = Nt(Q, (t = f.virtual) == null ? void 0 : t.options), le = Nt(Q, f.value), re = M((te) => f.compare(le, te)), F = G(() => {
    if (!f.virtual) return f;
    if (A === void 0) throw new Error("Missing `options` in virtual mode");
    return A !== f.virtual.options ? { ...f, virtual: { ...f.virtual, options: A } } : f;
  }, [f, A, (o = f.virtual) == null ? void 0 : o.options]);
  f.virtual && Object.assign(m, { children: L.createElement(gt.Provider, { value: F }, L.createElement(pu, { slot: z }, m.children)) });
  let R = de(), Y = G(() => f.mode === ge.Multi ? f : { ...f, isSelected: re }, [f, re]);
  return L.createElement(pi, { enabled: u ? e.static || k : !1, ownerDocument: D }, L.createElement(gt.Provider, { value: Y }, R({ ourProps: ne, theirProps: { ...m, children: L.createElement(Xa, { freeze: Q }, typeof m.children == "function" ? (r = m.children) == null ? void 0 : r.call(m, z) : m.children) }, slot: z, defaultTag: wu, features: yu, visible: k, name: "Combobox.Options" })));
}
let Ou = "div";
function $u(e, n) {
  var t, o, r;
  let i = at("Combobox.Option"), l = St("Combobox.Option"), s = Ee(), { id: a = `headlessui-combobox-option-${s}`, value: u, disabled: c = (r = (o = (t = i.virtual) == null ? void 0 : t.disabled) == null ? void 0 : o.call(t, u)) != null ? r : !1, order: p = null, ...m } = e, [d] = J(l, (S) => [S.inputElement]), f = Hr(d), h = J(l, V((S) => l.selectors.isActive(S, u, a), [u, a])), v = i.isSelected(u), x = _(null), w = Me({ disabled: c, value: u, domRef: x, order: p }), b = oe(gi), g = me(n, x, b ? b.measureElement : null), y = M(() => {
    l.actions.setIsTyping(!1), l.actions.onChange(u);
  });
  q(() => l.actions.registerOption(a, w), [w, a]);
  let O = J(l, V((S) => l.selectors.shouldScrollIntoView(S, u, a), [u, a]));
  q(() => {
    if (O) return Oe().requestAnimationFrame(() => {
      var S, H;
      (H = (S = x.current) == null ? void 0 : S.scrollIntoView) == null || H.call(S, { block: "nearest" });
    });
  }, [O, x]);
  let T = M((S) => {
    S.preventDefault(), S.button === qn.Left && (c || (y(), wn() || requestAnimationFrame(() => f()), i.mode === ge.Single && l.actions.closeCombobox()));
  }), C = M(() => {
    if (c) return l.actions.goToOption({ focus: B.Nothing });
    let S = i.calculateIndex(u);
    l.actions.goToOption({ focus: B.Specific, idx: S });
  }), W = zr(), $ = M((S) => W.update(S)), D = M((S) => {
    if (!W.wasMoved(S) || c || h) return;
    let H = i.calculateIndex(u);
    l.actions.goToOption({ focus: B.Specific, idx: H }, ke.Pointer);
  }), I = M((S) => {
    W.wasMoved(S) && (c || h && (i.optionsPropsRef.current.hold || l.actions.goToOption({ focus: B.Nothing })));
  }), j = G(() => ({ active: h, focus: h, selected: v, disabled: c }), [h, v, c]), k = { id: a, ref: g, role: "option", tabIndex: c === !0 ? void 0 : -1, "aria-disabled": c === !0 ? !0 : void 0, "aria-selected": v, disabled: void 0, onMouseDown: T, onFocus: C, onPointerEnter: $, onMouseEnter: $, onPointerMove: D, onMouseMove: D, onPointerLeave: I, onMouseLeave: I };
  return de()({ ourProps: k, theirProps: m, slot: j, defaultTag: Ou, name: "Combobox.Option" });
}
let Su = ae(hu), Tu = ae(xu), Ru = ae(gu), Cu = Or, Iu = ae(Eu), Pu = ae($u), ut = Object.assign(Su, { Input: Ru, Button: Tu, Label: Cu, Options: Iu, Option: Pu });
function Au() {
  let e = _(!1);
  return q(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function bi(e) {
  var n;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((n = e.as) != null ? n : wi) !== be || L.Children.count(e.children) === 1;
}
let Kt = se(null);
Kt.displayName = "TransitionContext";
var Fu = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Fu || {});
function Mu() {
  let e = oe(Kt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Lu() {
  let e = oe(qt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let qt = se(null);
qt.displayName = "NestingContext";
function Yt(e) {
  return "children" in e ? Yt(e.children) : e.current.filter(({ el: n }) => n.current !== null).filter(({ state: n }) => n === "visible").length > 0;
}
function xi(e, n) {
  let t = Me(e), o = _([]), r = Au(), i = Ye(), l = M((d, f = De.Hidden) => {
    let h = o.current.findIndex(({ el: v }) => v === d);
    h !== -1 && (ce(f, { [De.Unmount]() {
      o.current.splice(h, 1);
    }, [De.Hidden]() {
      o.current[h].state = "hidden";
    } }), i.microTask(() => {
      var v;
      !Yt(o) && r.current && ((v = t.current) == null || v.call(t));
    }));
  }), s = M((d) => {
    let f = o.current.find(({ el: h }) => h === d);
    return f ? f.state !== "visible" && (f.state = "visible") : o.current.push({ el: d, state: "visible" }), () => l(d, De.Unmount);
  }), a = _([]), u = _(Promise.resolve()), c = _({ enter: [], leave: [] }), p = M((d, f, h) => {
    a.current.splice(0), n && (n.chains.current[f] = n.chains.current[f].filter(([v]) => v !== d)), n == null || n.chains.current[f].push([d, new Promise((v) => {
      a.current.push(v);
    })]), n == null || n.chains.current[f].push([d, new Promise((v) => {
      Promise.all(c.current[f].map(([x, w]) => w)).then(() => v());
    })]), f === "enter" ? u.current = u.current.then(() => n == null ? void 0 : n.wait.current).then(() => h(f)) : h(f);
  }), m = M((d, f, h) => {
    Promise.all(c.current[f].splice(0).map(([v, x]) => x)).then(() => {
      var v;
      (v = a.current.shift()) == null || v();
    }).then(() => h(f));
  });
  return G(() => ({ children: o, register: s, unregister: l, onStart: p, onStop: m, wait: u, chains: c }), [s, l, o, p, m, c, u]);
}
let wi = be, yi = tt.RenderStrategy;
function Du(e, n) {
  var t, o;
  let { transition: r = !0, beforeEnter: i, afterEnter: l, beforeLeave: s, afterLeave: a, enter: u, enterFrom: c, enterTo: p, entered: m, leave: d, leaveFrom: f, leaveTo: h, ...v } = e, [x, w] = X(null), b = _(null), g = bi(e), y = me(...g ? [b, n, w] : n === null ? [] : [n]), O = (t = v.unmount) == null || t ? De.Unmount : De.Hidden, { show: T, appear: C, initial: W } = Mu(), [$, D] = X(T ? "visible" : "hidden"), I = Lu(), { register: j, unregister: k } = I;
  q(() => j(b), [j, b]), q(() => {
    if (O === De.Hidden && b.current) {
      if (T && $ !== "visible") {
        D("visible");
        return;
      }
      return ce($, { hidden: () => k(b), visible: () => j(b) });
    }
  }, [$, b, j, k, T, O]);
  let S = Xn();
  q(() => {
    if (g && S && $ === "visible" && b.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [b, $, S, g]);
  let H = W && !C, ee = C && T && W, N = _(!1), z = xi(() => {
    N.current || (D("hidden"), k(b));
  }, I), Z = M((F) => {
    N.current = !0;
    let R = F ? "enter" : "leave";
    z.onStart(b, R, (Y) => {
      Y === "enter" ? i == null || i() : Y === "leave" && (s == null || s());
    });
  }), fe = M((F) => {
    let R = F ? "enter" : "leave";
    N.current = !1, z.onStop(b, R, (Y) => {
      Y === "enter" ? l == null || l() : Y === "leave" && (a == null || a());
    }), R === "leave" && !Yt(z) && (D("hidden"), k(b));
  });
  ie(() => {
    g && r || (Z(T), fe(T));
  }, [T, g, r]);
  let ne = !(!r || !g || !S || H), [, Q] = Hn(ne, x, T, { start: Z, end: fe }), A = Le({ ref: y, className: ((o = vn(v.className, ee && u, ee && c, Q.enter && u, Q.enter && Q.closed && c, Q.enter && !Q.closed && p, Q.leave && d, Q.leave && !Q.closed && f, Q.leave && Q.closed && h, !Q.transition && T && m)) == null ? void 0 : o.trim()) || void 0, ..._n(Q) }), le = 0;
  $ === "visible" && (le |= ve.Open), $ === "hidden" && (le |= ve.Closed), T && $ === "hidden" && (le |= ve.Opening), !T && $ === "visible" && (le |= ve.Closing);
  let re = de();
  return L.createElement(qt.Provider, { value: z }, L.createElement(Kn, { value: le }, re({ ourProps: A, theirProps: v, defaultTag: wi, features: yi, visible: $ === "visible", name: "Transition.Child" })));
}
function ku(e, n) {
  let { show: t, appear: o = !1, unmount: r = !0, ...i } = e, l = _(null), s = bi(e), a = me(...s ? [l, n] : n === null ? [] : [n]);
  Xn();
  let u = Gt();
  if (t === void 0 && u !== null && (t = (u & ve.Open) === ve.Open), t === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, p] = X(t ? "visible" : "hidden"), m = xi(() => {
    t || p("hidden");
  }), [d, f] = X(!0), h = _([t]);
  q(() => {
    d !== !1 && h.current[h.current.length - 1] !== t && (h.current.push(t), f(!1));
  }, [h, t]);
  let v = G(() => ({ show: t, appear: o, initial: d }), [t, o, d]);
  q(() => {
    t ? p("visible") : !Yt(m) && l.current !== null && p("hidden");
  }, [t, m]);
  let x = { unmount: r }, w = M(() => {
    var y;
    d && f(!1), (y = e.beforeEnter) == null || y.call(e);
  }), b = M(() => {
    var y;
    d && f(!1), (y = e.beforeLeave) == null || y.call(e);
  }), g = de();
  return L.createElement(qt.Provider, { value: m }, L.createElement(Kt.Provider, { value: v }, g({ ourProps: { ...x, as: be, children: L.createElement(Ei, { ref: a, ...x, ...i, beforeEnter: w, beforeLeave: b }) }, theirProps: {}, defaultTag: be, features: yi, visible: c === "visible", name: "Transition" })));
}
function Nu(e, n) {
  let t = oe(Kt) !== null, o = Gt() !== null;
  return L.createElement(L.Fragment, null, !t && o ? L.createElement($n, { ref: n, ...e }) : L.createElement(Ei, { ref: n, ...e }));
}
let $n = ae(ku), Ei = ae(Du), ju = ae(Nu), Lo = Object.assign($n, { Child: ju, Root: $n });
function _u(e, n) {
  let t = _({ left: 0, top: 0 });
  if (q(() => {
    if (!n) return;
    let r = n.getBoundingClientRect();
    r && (t.current = r);
  }, [e, n]), n == null || !e || n === document.activeElement) return !1;
  let o = n.getBoundingClientRect();
  return o.top !== t.current.top || o.left !== t.current.left;
}
let Do = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function ko(e) {
  var n, t;
  let o = (n = e.innerText) != null ? n : "", r = e.cloneNode(!0);
  if (!Ie(r)) return o;
  let i = !1;
  for (let s of r.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) s.remove(), i = !0;
  let l = i ? (t = r.innerText) != null ? t : "" : o;
  return Do.test(l) && (l = l.replace(Do, "")), l;
}
function Hu(e) {
  let n = e.getAttribute("aria-label");
  if (typeof n == "string") return n.trim();
  let t = e.getAttribute("aria-labelledby");
  if (t) {
    let o = t.split(" ").map((r) => {
      let i = document.getElementById(r);
      if (i) {
        let l = i.getAttribute("aria-label");
        return typeof l == "string" ? l.trim() : ko(i).trim();
      }
      return null;
    }).filter(Boolean);
    if (o.length > 0) return o.join(", ");
  }
  return ko(e).trim();
}
function Bu(e) {
  let n = _(""), t = _("");
  return M(() => {
    let o = e.current;
    if (!o) return "";
    let r = o.innerText;
    if (n.current === r) return t.current;
    let i = Hu(o).trim().toLowerCase();
    return n.current = r, t.current = i, i;
  });
}
var Wu = Object.defineProperty, zu = (e, n, t) => n in e ? Wu(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, No = (e, n, t) => (zu(e, typeof n != "symbol" ? n + "" : n, t), t), ue = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(ue || {}), Te = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Te || {}), Sn = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(Sn || {}), Oi = ((e) => (e[e.OpenListbox = 0] = "OpenListbox", e[e.CloseListbox = 1] = "CloseListbox", e[e.GoToOption = 2] = "GoToOption", e[e.Search = 3] = "Search", e[e.ClearSearch = 4] = "ClearSearch", e[e.RegisterOptions = 5] = "RegisterOptions", e[e.UnregisterOptions = 6] = "UnregisterOptions", e[e.SetButtonElement = 7] = "SetButtonElement", e[e.SetOptionsElement = 8] = "SetOptionsElement", e[e.SortOptions = 9] = "SortOptions", e))(Oi || {});
function jo(e, n = (t) => t) {
  let t = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, o = jn(n(e.options.slice()), (i) => i.dataRef.current.domRef.current), r = t ? o.indexOf(t) : null;
  return r === -1 && (r = null), { options: o, activeOptionIndex: r };
}
let Vu = { 1(e) {
  return e.dataRef.current.disabled || e.listboxState === 1 ? e : { ...e, activeOptionIndex: null, pendingFocus: { focus: B.Nothing }, listboxState: 1, __demoMode: !1 };
}, 0(e, n) {
  if (e.dataRef.current.disabled || e.listboxState === 0) return e;
  let t = e.activeOptionIndex, { isSelected: o } = e.dataRef.current, r = e.options.findIndex((i) => o(i.dataRef.current.value));
  return r !== -1 && (t = r), { ...e, pendingFocus: n.focus, listboxState: 0, activeOptionIndex: t, __demoMode: !1 };
}, 2(e, n) {
  var t, o, r, i, l;
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let s = { ...e, searchQuery: "", activationTrigger: (t = n.trigger) != null ? t : 1, __demoMode: !1 };
  if (n.focus === B.Nothing) return { ...s, activeOptionIndex: null };
  if (n.focus === B.Specific) return { ...s, activeOptionIndex: e.options.findIndex((c) => c.id === n.id) };
  if (n.focus === B.Previous) {
    let c = e.activeOptionIndex;
    if (c !== null) {
      let p = e.options[c].dataRef.current.domRef, m = Qe(n, { resolveItems: () => e.options, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (d) => d.id, resolveDisabled: (d) => d.dataRef.current.disabled });
      if (m !== null) {
        let d = e.options[m].dataRef.current.domRef;
        if (((o = p.current) == null ? void 0 : o.previousElementSibling) === d.current || ((r = d.current) == null ? void 0 : r.previousElementSibling) === null) return { ...s, activeOptionIndex: m };
      }
    }
  } else if (n.focus === B.Next) {
    let c = e.activeOptionIndex;
    if (c !== null) {
      let p = e.options[c].dataRef.current.domRef, m = Qe(n, { resolveItems: () => e.options, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (d) => d.id, resolveDisabled: (d) => d.dataRef.current.disabled });
      if (m !== null) {
        let d = e.options[m].dataRef.current.domRef;
        if (((i = p.current) == null ? void 0 : i.nextElementSibling) === d.current || ((l = d.current) == null ? void 0 : l.nextElementSibling) === null) return { ...s, activeOptionIndex: m };
      }
    }
  }
  let a = jo(e), u = Qe(n, { resolveItems: () => a.options, resolveActiveIndex: () => a.activeOptionIndex, resolveId: (c) => c.id, resolveDisabled: (c) => c.dataRef.current.disabled });
  return { ...s, ...a, activeOptionIndex: u };
}, 3: (e, n) => {
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let t = e.searchQuery !== "" ? 0 : 1, o = e.searchQuery + n.value.toLowerCase(), r = (e.activeOptionIndex !== null ? e.options.slice(e.activeOptionIndex + t).concat(e.options.slice(0, e.activeOptionIndex + t)) : e.options).find((l) => {
    var s;
    return !l.dataRef.current.disabled && ((s = l.dataRef.current.textValue) == null ? void 0 : s.startsWith(o));
  }), i = r ? e.options.indexOf(r) : -1;
  return i === -1 || i === e.activeOptionIndex ? { ...e, searchQuery: o } : { ...e, searchQuery: o, activeOptionIndex: i, activationTrigger: 1 };
}, 4(e) {
  return e.dataRef.current.disabled || e.listboxState === 1 || e.searchQuery === "" ? e : { ...e, searchQuery: "" };
}, 5: (e, n) => {
  let t = e.options.concat(n.options), o = e.activeOptionIndex;
  if (e.pendingFocus.focus !== B.Nothing && (o = Qe(e.pendingFocus, { resolveItems: () => t, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (r) => r.id, resolveDisabled: (r) => r.dataRef.current.disabled })), e.activeOptionIndex === null) {
    let { isSelected: r } = e.dataRef.current;
    if (r) {
      let i = t.findIndex((l) => r == null ? void 0 : r(l.dataRef.current.value));
      i !== -1 && (o = i);
    }
  }
  return { ...e, options: t, activeOptionIndex: o, pendingFocus: { focus: B.Nothing }, pendingShouldSort: !0 };
}, 6: (e, n) => {
  let t = e.options, o = [], r = new Set(n.options);
  for (let [i, l] of t.entries()) if (r.has(l.id) && (o.push(i), r.delete(l.id), r.size === 0)) break;
  if (o.length > 0) {
    t = t.slice();
    for (let i of o.reverse()) t.splice(i, 1);
  }
  return { ...e, options: t, activationTrigger: 1 };
}, 7: (e, n) => e.buttonElement === n.element ? e : { ...e, buttonElement: n.element }, 8: (e, n) => e.optionsElement === n.element ? e : { ...e, optionsElement: n.element }, 9: (e) => e.pendingShouldSort ? { ...e, ...jo(e), pendingShouldSort: !1 } : e };
class Qn extends Dn {
  constructor(n) {
    super(n), No(this, "actions", { onChange: (t) => {
      let { onChange: o, compare: r, mode: i, value: l } = this.state.dataRef.current;
      return ce(i, { 0: () => o == null ? void 0 : o(t), 1: () => {
        let s = l.slice(), a = s.findIndex((u) => r(u, t));
        return a === -1 ? s.push(t) : s.splice(a, 1), o == null ? void 0 : o(s);
      } });
    }, registerOption: nn(() => {
      let t = [], o = /* @__PURE__ */ new Set();
      return [(r, i) => {
        o.has(i) || (o.add(i), t.push({ id: r, dataRef: i }));
      }, () => (o.clear(), this.send({ type: 5, options: t.splice(0) }))];
    }), unregisterOption: nn(() => {
      let t = [];
      return [(o) => t.push(o), () => {
        this.send({ type: 6, options: t.splice(0) });
      }];
    }), goToOption: nn(() => {
      let t = null;
      return [(o, r) => {
        t = { type: 2, ...o, trigger: r };
      }, () => t && this.send(t)];
    }), closeListbox: () => {
      this.send({ type: 1 });
    }, openListbox: (t) => {
      this.send({ type: 0, focus: t });
    }, selectActiveOption: () => {
      if (this.state.activeOptionIndex !== null) {
        let { dataRef: t, id: o } = this.state.options[this.state.activeOptionIndex];
        this.actions.onChange(t.current.value), this.send({ type: 2, focus: B.Specific, id: o });
      }
    }, selectOption: (t) => {
      let o = this.state.options.find((r) => r.id === t);
      o && this.actions.onChange(o.dataRef.current.value);
    }, search: (t) => {
      this.send({ type: 3, value: t });
    }, clearSearch: () => {
      this.send({ type: 4 });
    }, setButtonElement: (t) => {
      this.send({ type: 7, element: t });
    }, setOptionsElement: (t) => {
      this.send({ type: 8, element: t });
    } }), No(this, "selectors", { activeDescendantId(t) {
      var o;
      let r = t.activeOptionIndex, i = t.options;
      return r === null || (o = i[r]) == null ? void 0 : o.id;
    }, isActive(t, o) {
      var r;
      let i = t.activeOptionIndex, l = t.options;
      return i !== null ? ((r = l[i]) == null ? void 0 : r.id) === o : !1;
    }, shouldScrollIntoView(t, o) {
      return t.__demoMode || t.listboxState !== 0 || t.activationTrigger === 0 ? !1 : this.isActive(t, o);
    } }), this.on(5, () => {
      requestAnimationFrame(() => {
        this.send({ type: 9 });
      });
    });
    {
      let t = this.state.id, o = yt.get(null);
      this.disposables.add(o.on(kn.Push, (r) => {
        !o.selectors.isTop(r, t) && this.state.listboxState === 0 && this.actions.closeListbox();
      })), this.on(0, () => o.actions.push(t)), this.on(1, () => o.actions.pop(t));
    }
  }
  static new({ id: n, __demoMode: t = !1 }) {
    return new Qn({ id: n, dataRef: { current: {} }, listboxState: t ? 0 : 1, options: [], searchQuery: "", activeOptionIndex: null, activationTrigger: 1, buttonElement: null, optionsElement: null, pendingShouldSort: !1, pendingFocus: { focus: B.Nothing }, __demoMode: t });
  }
  reduce(n, t) {
    return ce(t.type, Vu, n, t);
  }
}
const $i = se(null);
function Jn(e) {
  let n = oe($i);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, Si), t;
  }
  return n;
}
function Si({ id: e, __demoMode: n = !1 }) {
  let t = G(() => Qn.new({ id: e, __demoMode: n }), []);
  return Yn(() => t.dispose()), t;
}
let Xt = se(null);
Xt.displayName = "ListboxDataContext";
function Tt(e) {
  let n = oe(Xt);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, Tt), t;
  }
  return n;
}
let Uu = be;
function Gu(e, n) {
  let t = Ee(), o = _t(), { value: r, defaultValue: i, form: l, name: s, onChange: a, by: u, invalid: c = !1, disabled: p = o || !1, horizontal: m = !1, multiple: d = !1, __demoMode: f = !1, ...h } = e;
  const v = m ? "horizontal" : "vertical";
  let x = me(n), w = cr(i), [b = d ? [] : void 0, g] = ur(r, a, w), y = Si({ id: t, __demoMode: f }), O = _({ static: !1, hold: !1 }), T = _(/* @__PURE__ */ new Map()), C = Sr(u), W = V((ne) => ce($.mode, { [Te.Multi]: () => b.some((Q) => C(Q, ne)), [Te.Single]: () => C(b, ne) }), [b]), $ = G(() => ({ value: b, disabled: p, invalid: c, mode: d ? Te.Multi : Te.Single, orientation: v, onChange: g, compare: C, isSelected: W, optionsPropsRef: O, listRef: T }), [b, p, c, d, v, g, C, W, O, T]);
  q(() => {
    y.state.dataRef.current = $;
  }, [$]);
  let D = J(y, (ne) => ne.listboxState), I = yt.get(null), j = J(I, V((ne) => I.selectors.isTop(ne, t), [I, t])), [k, S] = J(y, (ne) => [ne.buttonElement, ne.optionsElement]);
  jr(j, [k, S], (ne, Q) => {
    y.send({ type: Oi.CloseListbox }), kr(Q, Nn.Loose) || (ne.preventDefault(), k == null || k.focus());
  });
  let H = G(() => ({ open: D === ue.Open, disabled: p, invalid: c, value: b }), [D, p, c, b]), [ee, N] = Er({ inherit: !0 }), z = { ref: x }, Z = V(() => {
    if (w !== void 0) return g == null ? void 0 : g(w);
  }, [g, w]), fe = de();
  return L.createElement(N, { value: ee, props: { htmlFor: k == null ? void 0 : k.id }, slot: { open: D === ue.Open, disabled: p } }, L.createElement(ui, null, L.createElement($i.Provider, { value: y }, L.createElement(Xt.Provider, { value: $ }, L.createElement(Kn, { value: ce(D, { [ue.Open]: ve.Open, [ue.Closed]: ve.Closed }) }, s != null && b != null && L.createElement(hr, { disabled: p, data: { [s]: b }, form: l, onReset: Z }), fe({ ourProps: z, theirProps: h, slot: H, defaultTag: Uu, name: "Listbox" }))))));
}
let Ku = "button";
function qu(e, n) {
  let t = Ee(), o = Fn(), r = Tt("Listbox.Button"), i = Jn("Listbox.Button"), { id: l = o || `headlessui-listbox-button-${t}`, disabled: s = r.disabled || !1, autoFocus: a = !1, ...u } = e, c = me(n, li(), i.actions.setButtonElement), p = Ka(), [m, d, f] = J(i, (S) => [S.listboxState, S.buttonElement, S.optionsElement]), h = m === ue.Open;
  _r(h, { trigger: d, action: V((S) => {
    if (d != null && d.contains(S.target)) return Ae.Ignore;
    let H = S.target.closest('[role="option"]:not([data-disabled])');
    return Ie(H) ? Ae.Select(H) : f != null && f.contains(S.target) ? Ae.Ignore : Ae.Close;
  }, [d, f]), close: i.actions.closeListbox, select: i.actions.selectActiveOption });
  let v = M((S) => {
    switch (S.key) {
      case K.Enter:
        gl(S.currentTarget);
        break;
      case K.Space:
      case K.ArrowDown:
        S.preventDefault(), i.actions.openListbox({ focus: r.value ? B.Nothing : B.First });
        break;
      case K.ArrowUp:
        S.preventDefault(), i.actions.openListbox({ focus: r.value ? B.Nothing : B.Last });
        break;
    }
  }), x = M((S) => {
    switch (S.key) {
      case K.Space:
        S.preventDefault();
        break;
    }
  }), w = M((S) => {
    var H;
    if (S.button === 0) {
      if (gr(S.currentTarget)) return S.preventDefault();
      i.state.listboxState === ue.Open ? (ye(() => i.actions.closeListbox()), (H = i.state.buttonElement) == null || H.focus({ preventScroll: !0 })) : (S.preventDefault(), i.actions.openListbox({ focus: B.Nothing }));
    }
  }), b = M((S) => S.preventDefault()), g = wt([l]), y = wr(), { isFocusVisible: O, focusProps: T } = Pn({ autoFocus: a }), { isHovered: C, hoverProps: W } = In({ isDisabled: s }), { pressed: $, pressProps: D } = sr({ disabled: s }), I = G(() => ({ open: m === ue.Open, active: $ || m === ue.Open, disabled: s, invalid: r.invalid, value: r.value, hover: C, focus: O, autofocus: a }), [m, r.value, s, C, O, $, r.invalid, a]), j = J(i, (S) => S.listboxState === ue.Open), k = xt(p(), { ref: c, id: l, type: Br(e, d), "aria-haspopup": "listbox", "aria-controls": f == null ? void 0 : f.id, "aria-expanded": j, "aria-labelledby": g, "aria-describedby": y, disabled: s || void 0, autoFocus: a, onKeyDown: v, onKeyUp: x, onKeyPress: b, onPointerDown: w }, T, W, D);
  return de()({ ourProps: k, theirProps: u, slot: I, defaultTag: Ku, name: "Listbox.Button" });
}
let Ti = se(!1), Yu = "div", Xu = tt.RenderStrategy | tt.Static;
function Zu(e, n) {
  let t = Ee(), { id: o = `headlessui-listbox-options-${t}`, anchor: r, portal: i = !1, modal: l = !0, transition: s = !1, ...a } = e, u = ii(r), [c, p] = X(null);
  u && (i = !0);
  let m = Tt("Listbox.Options"), d = Jn("Listbox.Options"), [f, h, v, x] = J(d, (F) => [F.listboxState, F.buttonElement, F.optionsElement, F.__demoMode]), w = nt(h), b = nt(v), g = Gt(), [y, O] = Hn(s, c, g !== null ? (g & ve.Open) === ve.Open : f === ue.Open);
  Lr(y, h, d.actions.closeListbox);
  let T = x ? !1 : l && f === ue.Open;
  Wr(T, b);
  let C = x ? !1 : l && f === ue.Open;
  Mr(C, { allowed: V(() => [h, v], [h, v]) });
  let W = f !== ue.Open, $ = _u(W, h) ? !1 : y, D = y && f === ue.Closed, I = Nt(D, m.value), j = M((F) => m.compare(I, F)), k = J(d, (F) => {
    var R;
    if (u == null || !((R = u == null ? void 0 : u.to) != null && R.includes("selection"))) return null;
    let Y = F.options.findIndex((te) => j(te.dataRef.current.value));
    return Y === -1 && (Y = 0), Y;
  }), S = (() => {
    if (u == null) return;
    if (k === null) return { ...u, inner: void 0 };
    let F = Array.from(m.listRef.current.values());
    return { ...u, inner: { listRef: { current: F }, index: k } };
  })(), [H, ee] = ai(S), N = si(), z = me(n, u ? H : null, d.actions.setOptionsElement, p), Z = Ye();
  ie(() => {
    var F;
    let R = v;
    R && f === ue.Open && R !== ((F = rt(R)) == null ? void 0 : F.activeElement) && (R == null || R.focus({ preventScroll: !0 }));
  }, [f, v]);
  let fe = M((F) => {
    var R, Y;
    switch (Z.dispose(), F.key) {
      case K.Space:
        if (d.state.searchQuery !== "") return F.preventDefault(), F.stopPropagation(), d.actions.search(F.key);
      case K.Enter:
        if (F.preventDefault(), F.stopPropagation(), d.state.activeOptionIndex !== null) {
          let { dataRef: te } = d.state.options[d.state.activeOptionIndex];
          d.actions.onChange(te.current.value);
        }
        m.mode === Te.Single && (ye(() => d.actions.closeListbox()), (R = d.state.buttonElement) == null || R.focus({ preventScroll: !0 }));
        break;
      case ce(m.orientation, { vertical: K.ArrowDown, horizontal: K.ArrowRight }):
        return F.preventDefault(), F.stopPropagation(), d.actions.goToOption({ focus: B.Next });
      case ce(m.orientation, { vertical: K.ArrowUp, horizontal: K.ArrowLeft }):
        return F.preventDefault(), F.stopPropagation(), d.actions.goToOption({ focus: B.Previous });
      case K.Home:
      case K.PageUp:
        return F.preventDefault(), F.stopPropagation(), d.actions.goToOption({ focus: B.First });
      case K.End:
      case K.PageDown:
        return F.preventDefault(), F.stopPropagation(), d.actions.goToOption({ focus: B.Last });
      case K.Escape:
        F.preventDefault(), F.stopPropagation(), ye(() => d.actions.closeListbox()), (Y = d.state.buttonElement) == null || Y.focus({ preventScroll: !0 });
        return;
      case K.Tab:
        F.preventDefault(), F.stopPropagation(), ye(() => d.actions.closeListbox()), xs(d.state.buttonElement, F.shiftKey ? xn.Previous : xn.Next);
        break;
      default:
        F.key.length === 1 && (d.actions.search(F.key), Z.setTimeout(() => d.actions.clearSearch(), 350));
        break;
    }
  }), ne = J(d, (F) => {
    var R;
    return (R = F.buttonElement) == null ? void 0 : R.id;
  }), Q = G(() => ({ open: f === ue.Open }), [f]), A = xt(u ? N() : {}, { id: o, ref: z, "aria-activedescendant": J(d, d.selectors.activeDescendantId), "aria-multiselectable": m.mode === Te.Multi ? !0 : void 0, "aria-labelledby": ne, "aria-orientation": m.orientation, onKeyDown: fe, role: "listbox", tabIndex: f === ue.Open ? 0 : void 0, style: { ...a.style, ...ee, "--button-width": gn(h, !0).width }, ..._n(O) }), le = de(), re = G(() => m.mode === Te.Multi ? m : { ...m, isSelected: j }, [m, j]);
  return L.createElement(pi, { enabled: i ? e.static || y : !1, ownerDocument: w }, L.createElement(Xt.Provider, { value: re }, le({ ourProps: A, theirProps: a, slot: Q, defaultTag: Yu, features: Xu, visible: $, name: "Listbox.Options" })));
}
let Qu = "div";
function Ju(e, n) {
  let t = Ee(), { id: o = `headlessui-listbox-option-${t}`, disabled: r = !1, value: i, ...l } = e, s = oe(Ti) === !0, a = Tt("Listbox.Option"), u = Jn("Listbox.Option"), c = J(u, ($) => u.selectors.isActive($, o)), p = a.isSelected(i), m = _(null), d = Bu(m), f = Me({ disabled: r, value: i, domRef: m, get textValue() {
    return d();
  } }), h = me(n, m, ($) => {
    $ ? a.listRef.current.set(o, $) : a.listRef.current.delete(o);
  }), v = J(u, ($) => u.selectors.shouldScrollIntoView($, o));
  q(() => {
    if (v) return Oe().requestAnimationFrame(() => {
      var $, D;
      (D = ($ = m.current) == null ? void 0 : $.scrollIntoView) == null || D.call($, { block: "nearest" });
    });
  }, [v, m]), q(() => {
    if (!s) return u.actions.registerOption(o, f), () => u.actions.unregisterOption(o);
  }, [f, o, s]);
  let x = M(($) => {
    var D;
    if (r) return $.preventDefault();
    u.actions.onChange(i), a.mode === Te.Single && (ye(() => u.actions.closeListbox()), (D = u.state.buttonElement) == null || D.focus({ preventScroll: !0 }));
  }), w = M(() => {
    if (r) return u.actions.goToOption({ focus: B.Nothing });
    u.actions.goToOption({ focus: B.Specific, id: o });
  }), b = zr(), g = M(($) => {
    b.update($), !r && (c || u.actions.goToOption({ focus: B.Specific, id: o }, Sn.Pointer));
  }), y = M(($) => {
    b.wasMoved($) && (r || c || u.actions.goToOption({ focus: B.Specific, id: o }, Sn.Pointer));
  }), O = M(($) => {
    b.wasMoved($) && (r || c && u.actions.goToOption({ focus: B.Nothing }));
  }), T = G(() => ({ active: c, focus: c, selected: p, disabled: r, selectedOption: p && s }), [c, p, r, s]), C = s ? {} : { id: o, ref: h, role: "option", tabIndex: r === !0 ? void 0 : -1, "aria-disabled": r === !0 ? !0 : void 0, "aria-selected": p, disabled: void 0, onClick: x, onFocus: w, onPointerEnter: g, onMouseEnter: g, onPointerMove: y, onMouseMove: y, onPointerLeave: O, onMouseLeave: O }, W = de();
  return !p && s ? null : W({ ourProps: C, theirProps: l, slot: T, defaultTag: Qu, name: "Listbox.Option" });
}
let ec = be;
function tc(e, n) {
  let { options: t, placeholder: o, ...r } = e, i = { ref: me(n) }, l = Tt("ListboxSelectedOption"), s = G(() => ({}), []), a = l.value === void 0 || l.value === null || l.mode === Te.Multi && Array.isArray(l.value) && l.value.length === 0, u = de();
  return L.createElement(Ti.Provider, { value: !0 }, u({ ourProps: i, theirProps: { ...r, children: L.createElement(L.Fragment, null, o && a ? o : t) }, slot: s, defaultTag: ec, name: "ListboxSelectedOption" }));
}
let nc = ae(Gu), oc = ae(qu), rc = Or, ic = ae(Zu), lc = ae(Ju), sc = ae(tc), He = Object.assign(nc, { Button: oc, Label: rc, Options: ic, Option: lc, SelectedOption: sc });
function ac({
  title: e,
  titleId: n,
  ...t
}, o) {
  return /* @__PURE__ */ E.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: o,
    "aria-labelledby": n
  }, t), e ? /* @__PURE__ */ E.createElement("title", {
    id: n
  }, e) : null, /* @__PURE__ */ E.createElement("path", {
    fillRule: "evenodd",
    d: "M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z",
    clipRule: "evenodd"
  }));
}
const ct = /* @__PURE__ */ E.forwardRef(ac);
function uc({
  title: e,
  titleId: n,
  ...t
}, o) {
  return /* @__PURE__ */ E.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: o,
    "aria-labelledby": n
  }, t), e ? /* @__PURE__ */ E.createElement("title", {
    id: n
  }, e) : null, /* @__PURE__ */ E.createElement("path", {
    fillRule: "evenodd",
    d: "M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z",
    clipRule: "evenodd"
  }));
}
const _o = /* @__PURE__ */ E.forwardRef(uc);
function cc({
  title: e,
  titleId: n,
  ...t
}, o) {
  return /* @__PURE__ */ E.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: o,
    "aria-labelledby": n
  }, t), e ? /* @__PURE__ */ E.createElement("title", {
    id: n
  }, e) : null, /* @__PURE__ */ E.createElement("path", {
    d: "M5 3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5H5ZM4.5 5A1.5 1.5 0 0 0 3 6.5v.041a3.02 3.02 0 0 1 .5-.041h9c.17 0 .337.014.5.041V6.5A1.5 1.5 0 0 0 11.5 5h-7ZM12.5 8h-9A1.5 1.5 0 0 0 2 9.5v3A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12.5 8Z"
  }));
}
const Ho = /* @__PURE__ */ E.forwardRef(cc);
function dc({
  title: e,
  titleId: n,
  ...t
}, o) {
  return /* @__PURE__ */ E.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: o,
    "aria-labelledby": n
  }, t), e ? /* @__PURE__ */ E.createElement("title", {
    id: n
  }, e) : null, /* @__PURE__ */ E.createElement("path", {
    d: "M5 6.5A1.5 1.5 0 0 1 6.5 5h6A1.5 1.5 0 0 1 14 6.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 5 12.5v-6Z"
  }), /* @__PURE__ */ E.createElement("path", {
    d: "M3.5 2A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11V6.5a3 3 0 0 1 3-3H11A1.5 1.5 0 0 0 9.5 2h-6Z"
  }));
}
const Bo = /* @__PURE__ */ E.forwardRef(dc);
function fc({
  title: e,
  titleId: n,
  ...t
}, o) {
  return /* @__PURE__ */ E.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: o,
    "aria-labelledby": n
  }, t), e ? /* @__PURE__ */ E.createElement("title", {
    id: n
  }, e) : null, /* @__PURE__ */ E.createElement("path", {
    d: "M7.628 1.099a.75.75 0 0 1 .744 0l5.25 3a.75.75 0 0 1 0 1.302l-5.25 3a.75.75 0 0 1-.744 0l-5.25-3a.75.75 0 0 1 0-1.302l5.25-3Z"
  }), /* @__PURE__ */ E.createElement("path", {
    d: "m2.57 7.24-.192.11a.75.75 0 0 0 0 1.302l5.25 3a.75.75 0 0 0 .744 0l5.25-3a.75.75 0 0 0 0-1.303l-.192-.11-4.314 2.465a2.25 2.25 0 0 1-2.232 0L2.57 7.239Z"
  }), /* @__PURE__ */ E.createElement("path", {
    d: "m2.378 10.6.192-.11 4.314 2.464a2.25 2.25 0 0 0 2.232 0l4.314-2.465.192.11a.75.75 0 0 1 0 1.303l-5.25 3a.75.75 0 0 1-.744 0l-5.25-3a.75.75 0 0 1 0-1.303Z"
  }));
}
const Wo = /* @__PURE__ */ E.forwardRef(fc);
function pc({
  title: e,
  titleId: n,
  ...t
}, o) {
  return /* @__PURE__ */ E.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: o,
    "aria-labelledby": n
  }, t), e ? /* @__PURE__ */ E.createElement("title", {
    id: n
  }, e) : null, /* @__PURE__ */ E.createElement("path", {
    d: "M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2h-2ZM3.5 9A1.5 1.5 0 0 0 2 10.5v2A1.5 1.5 0 0 0 3.5 14h2A1.5 1.5 0 0 0 7 12.5v-2A1.5 1.5 0 0 0 5.5 9h-2ZM9 3.5A1.5 1.5 0 0 1 10.5 2h2A1.5 1.5 0 0 1 14 3.5v2A1.5 1.5 0 0 1 12.5 7h-2A1.5 1.5 0 0 1 9 5.5v-2ZM10.5 9A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9h-2Z"
  }));
}
const zo = /* @__PURE__ */ E.forwardRef(pc);
function Vo({ name: e, style: n }) {
  const [t, o] = X(null);
  return ie(() => {
    (async () => {
      try {
        const i = e.split("-").map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join("") + "Icon";
        let l;
        n === "outline" ? l = await import("./index-CEwnYUTu.mjs") : n === "solid" ? l = await import("./index-BnWqDR-l.mjs") : n === "mini" ? l = await import("./index-wFX5Jz-z.mjs") : n === "micro" ? l = await import("./index-YCC0mrpm.mjs") : l = await import("./index-CEwnYUTu.mjs");
        const s = l[i];
        o(s ? () => s : null);
      } catch {
        o(null);
      }
    })();
  }, [e, n]), t ? /* @__PURE__ */ P.jsx(t, { "data-slot": "icon", className: "h-5 w-5" }) : null;
}
function mc({ settings: e, container: n }) {
  const { allIcons: t = {}, value: o = "", style: r = "outline" } = e || {}, [i, l] = X(r), [s, a] = X([]), [u, c] = X(o);
  ie(() => {
    const g = t[i] || [];
    a(g);
  }, [i, t]), ie(() => {
    o && c(o), r && l(r), (o || r) && n && m(o || "", r || "outline");
  }, []);
  const p = s.map((g) => ({
    id: g.name,
    name: g.name
  })), m = V((g, y) => {
    if (!n) return;
    const O = n.parentElement;
    if (!O) return;
    const T = O.querySelector("input[data-heroicons-icon-name]"), C = O.querySelector("input[data-heroicons-icon-style]");
    T && (T.value = g || "", T.dispatchEvent(new Event("change", { bubbles: !0 })), T.dispatchEvent(new Event("input", { bubbles: !0 }))), C && (C.value = y || "outline", C.dispatchEvent(new Event("change", { bubbles: !0 })), C.dispatchEvent(new Event("input", { bubbles: !0 })));
  }, [n]), d = V((g) => {
    g && (c(g.name), m(g.name, i), w(""));
  }, [i, m]), f = V((g) => {
    l(g), m(u, g);
  }, [u, m]), h = V((g) => {
    w(g.target.value);
  }, []), v = p.find((g) => g.name === u) || null, [x, w] = X(""), b = G(() => x === "" ? p : p.filter(
    (g) => g.name.toLowerCase().includes(x.toLowerCase())
  ), [p, x]);
  return /* @__PURE__ */ P.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ P.jsxs("div", { children: [
      /* @__PURE__ */ P.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Icon" }),
      /* @__PURE__ */ P.jsx(ut, { value: v, onChange: d, children: /* @__PURE__ */ P.jsxs("div", { className: "relative mt-1", children: [
        /* @__PURE__ */ P.jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm", children: [
          /* @__PURE__ */ P.jsx(
            ut.Input,
            {
              className: "w-full border-none py-2 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
              displayValue: (g) => g != null && g.name ? g.name : u && !v ? u : "",
              onChange: h,
              placeholder: "Search icons..."
            }
          ),
          u && !x && /* @__PURE__ */ P.jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ P.jsx(Vo, { name: u, style: i }) }),
          /* @__PURE__ */ P.jsx(ut.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ P.jsx(
            _o,
            {
              className: "h-5 w-5 text-gray-400",
              "aria-hidden": "true"
            }
          ) })
        ] }),
        /* @__PURE__ */ P.jsx(
          Lo,
          {
            leave: "transition ease-in duration-100",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ P.jsx(ut.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10", children: b.length === 0 && x !== "" ? /* @__PURE__ */ P.jsx("div", { className: "relative cursor-default select-none px-4 py-2 text-gray-700", children: "Nothing found." }) : b.map((g) => /* @__PURE__ */ P.jsx(
              ut.Option,
              {
                className: ({ active: y }) => `relative cursor-default select-none py-2 pl-3 pr-4 ${y ? "bg-teal-600 text-white" : "text-gray-900"}`,
                value: g,
                children: ({ selected: y, active: O }) => /* @__PURE__ */ P.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ P.jsx(Vo, { name: g.name, style: i }),
                  /* @__PURE__ */ P.jsx(
                    "span",
                    {
                      className: `block truncate ${y ? "font-medium" : "font-normal"}`,
                      children: g.name
                    }
                  ),
                  y && /* @__PURE__ */ P.jsx(ct, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
                ] })
              },
              g.id
            )) })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ P.jsxs("div", { children: [
      /* @__PURE__ */ P.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Style" }),
      /* @__PURE__ */ P.jsx(He, { value: i, onChange: f, children: /* @__PURE__ */ P.jsxs("div", { className: "relative mt-1", children: [
        /* @__PURE__ */ P.jsxs(He.Button, { className: "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-sm", children: [
          /* @__PURE__ */ P.jsxs("span", { className: "flex items-center", children: [
            i === "outline" && /* @__PURE__ */ P.jsx(Ho, { "data-slot": "icon", className: "h-4 w-4 mr-2" }),
            i === "solid" && /* @__PURE__ */ P.jsx(Wo, { "data-slot": "icon", className: "h-4 w-4 mr-2" }),
            i === "mini" && /* @__PURE__ */ P.jsx(zo, { "data-slot": "icon", className: "h-4 w-4 mr-2" }),
            i === "micro" && /* @__PURE__ */ P.jsx(Bo, { "data-slot": "icon", className: "h-4 w-4 mr-2" }),
            /* @__PURE__ */ P.jsxs("span", { className: "block truncate text-sm", children: [
              i === "outline" && "Outline (24px)",
              i === "solid" && "Solid (24px)",
              i === "mini" && "Mini (20px)",
              i === "micro" && "Micro (16px)"
            ] })
          ] }),
          /* @__PURE__ */ P.jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ P.jsx(_o, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }) })
        ] }),
        /* @__PURE__ */ P.jsx(
          Lo,
          {
            leave: "transition ease-in duration-100",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ P.jsxs(He.Options, { className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none", children: [
              /* @__PURE__ */ P.jsx(
                He.Option,
                {
                  value: "outline",
                  className: ({ active: g }) => `relative cursor-default select-none py-2 pl-3 pr-4 ${g ? "bg-teal-600 text-white" : "text-gray-900"}`,
                  children: ({ selected: g, active: y }) => /* @__PURE__ */ P.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ P.jsx(
                      Ho,
                      {
                        "data-slot": "icon",
                        className: `h-4 w-4 mr-2 ${y ? "text-white" : "text-gray-500"}`
                      }
                    ),
                    /* @__PURE__ */ P.jsx("span", { className: `block truncate text-sm ${g ? "font-medium" : "font-normal"}`, children: "Outline (24px)" }),
                    g && /* @__PURE__ */ P.jsx(ct, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
                  ] })
                }
              ),
              /* @__PURE__ */ P.jsx(
                He.Option,
                {
                  value: "solid",
                  className: ({ active: g }) => `relative cursor-default select-none py-2 pl-3 pr-4 ${g ? "bg-teal-600 text-white" : "text-gray-900"}`,
                  children: ({ selected: g, active: y }) => /* @__PURE__ */ P.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ P.jsx(
                      Wo,
                      {
                        "data-slot": "icon",
                        className: `h-4 w-4 mr-2 ${y ? "text-white" : "text-gray-500"}`
                      }
                    ),
                    /* @__PURE__ */ P.jsx("span", { className: `block truncate text-sm ${g ? "font-medium" : "font-normal"}`, children: "Solid (24px)" }),
                    g && /* @__PURE__ */ P.jsx(ct, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
                  ] })
                }
              ),
              /* @__PURE__ */ P.jsx(
                He.Option,
                {
                  value: "mini",
                  className: ({ active: g }) => `relative cursor-default select-none py-2 pl-3 pr-4 ${g ? "bg-teal-600 text-white" : "text-gray-900"}`,
                  children: ({ selected: g, active: y }) => /* @__PURE__ */ P.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ P.jsx(
                      zo,
                      {
                        "data-slot": "icon",
                        className: `h-4 w-4 mr-2 ${y ? "text-white" : "text-gray-500"}`
                      }
                    ),
                    /* @__PURE__ */ P.jsx("span", { className: `block truncate text-sm ${g ? "font-medium" : "font-normal"}`, children: "Mini (20px)" }),
                    g && /* @__PURE__ */ P.jsx(ct, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
                  ] })
                }
              ),
              /* @__PURE__ */ P.jsx(
                He.Option,
                {
                  value: "micro",
                  className: ({ active: g }) => `relative cursor-default select-none py-2 pl-3 pr-4 ${g ? "bg-teal-600 text-white" : "text-gray-900"}`,
                  children: ({ selected: g, active: y }) => /* @__PURE__ */ P.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ P.jsx(
                      Bo,
                      {
                        "data-slot": "icon",
                        className: `h-4 w-4 mr-2 ${y ? "text-white" : "text-gray-500"}`
                      }
                    ),
                    /* @__PURE__ */ P.jsx("span", { className: `block truncate text-sm ${g ? "font-medium" : "font-normal"}`, children: "Micro (16px)" }),
                    g && /* @__PURE__ */ P.jsx(ct, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
                  ] })
                }
              )
            ] })
          }
        )
      ] }) })
    ] })
  ] });
}
(function() {
  typeof Drupal < "u" && (Drupal.behaviors.heroiconsReactWidget = {
    attach: function(n, t) {
      document.querySelectorAll(
        "[data-heroicons-react-widget]:not([data-react-initialized])",
        n
      ).forEach((r) => {
        const i = r.dataset.fieldName, l = parseInt(r.dataset.delta, 10);
        if (!t.heroicons || !t.heroicons[i] || !t.heroicons[i][l]) {
          console.error(`Heroicons: Missing settings for ${i}[${l}]`);
          return;
        }
        const s = t.heroicons[i][l];
        try {
          cn.createRoot(r).render(/* @__PURE__ */ P.jsx(mc, { settings: s, container: r })), r.setAttribute("data-react-initialized", "true"), console.log(`Heroicons: React widget initialized for ${i}[${l}]`);
        } catch (a) {
          console.error("Heroicons: Failed to initialize React widget", a);
        }
      });
    }
  });
})();
export {
  ct as F,
  mc as H,
  _o as a,
  Ho as b,
  Bo as c,
  Wo as d,
  zo as e
};
