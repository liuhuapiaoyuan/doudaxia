"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AUTH_KEY } from "@/lib/sites/doudaxia/catalog";

const phoneOk = /^1[3-9]\d{9}$/;

export function AuthForm({
  mode,
  initialTab,
}: {
  mode: "login" | "regist";
  initialTab?: string;
}) {
  const [tab, setTab] = useState(initialTab || (mode === "login" ? "password" : "register"));
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [agree, setAgree] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [agreement, setAgreement] = useState(false);

  const title = useMemo(() => (mode === "login" ? "登录" : tab === "reset" ? "找回密码" : "注册"), [mode, tab]);

  function validatePhone() {
    if (!phone) return "请填写手机号！";
    if (!phoneOk.test(phone)) return "手机号格式有误";
    return "";
  }

  function sendCode() {
    const problem = validatePhone();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setSeconds(60);
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  }

  function submit() {
    const problem = validatePhone();
    if (problem) {
      setError(problem);
      return;
    }
    if ((mode === "login" && tab === "sms") || mode === "regist") {
      if (!code) {
        setError("请填写验证码！");
        return;
      }
    }
    if ((mode === "login" && tab === "password") || mode === "regist") {
      if (!password) {
        setError(mode === "regist" && tab === "reset" ? "请填写密码！" : "请填写登录密码！");
        return;
      }
    }
    if (!agree) {
      setError("请同意用户协议！");
      return;
    }
    window.localStorage.setItem(AUTH_KEY, "1");
    document.cookie = `${AUTH_KEY}=1; path=/; max-age=2592000`;
    const redirect = new URLSearchParams(window.location.search).get("redirect") || "/order-list";
    window.location.assign(redirect.startsWith("/") ? redirect : "/order-list");
  }

  return (
    <div className="dx-login">
      <form
        className="dx-login-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="dx-login-brand">
          <img src="/brand/qunxing-mark.png" alt="" />
          <strong>群兴尚品</strong>
          <span>微信小店助手</span>
        </div>
        <div className="dx-login-tabs">
          {mode === "login" ? (
            <>
              <button type="button" className={tab === "password" ? "active" : ""} onClick={() => setTab("password")}>
                密码登录
              </button>
              <button type="button" className={tab === "sms" ? "active" : ""} onClick={() => setTab("sms")}>
                短信登录
              </button>
            </>
          ) : (
            <>
              <button type="button" className={tab === "register" ? "active" : ""} onClick={() => setTab("register")}>
                注册用户
              </button>
              <button type="button" className={tab === "reset" ? "active" : ""} onClick={() => setTab("reset")}>
                找回密码
              </button>
            </>
          )}
        </div>
        <label className="dx-login-item">
          <span aria-hidden>▢</span>
          <input value={phone} maxLength={11} placeholder="手机号" onChange={(event) => setPhone(event.target.value)} />
        </label>
        {mode === "login" && tab === "sms" ? (
          <div style={{ display: "flex", gap: 8 }}>
            <label className="dx-login-item" style={{ flex: 1 }}>
              <span aria-hidden>▣</span>
              <input value={code} placeholder="验证码" onChange={(event) => setCode(event.target.value)} />
            </label>
            <button className="dx-btn primary" style={{ marginTop: 20, borderRadius: 30 }} type="button" disabled={seconds > 0} onClick={sendCode}>
              {seconds > 0 ? `${seconds}s后重发` : "获取验证码"}
            </button>
          </div>
        ) : null}
        {mode === "regist" ? (
          <div style={{ display: "flex", gap: 8 }}>
            <label className="dx-login-item" style={{ flex: 1 }}>
              <span aria-hidden>▣</span>
              <input value={code} placeholder="验证码" onChange={(event) => setCode(event.target.value)} />
            </label>
            <button className="dx-btn primary" style={{ marginTop: 20, borderRadius: 30 }} type="button" disabled={seconds > 0} onClick={sendCode}>
              {seconds > 0 ? `${seconds}s后重发` : "获取验证码"}
            </button>
          </div>
        ) : null}
        {(mode === "login" && tab === "password") || mode === "regist" ? (
          <label className="dx-login-item">
            <span aria-hidden>⌂</span>
            <input
              value={password}
              type={show ? "text" : "password"}
              placeholder={mode === "regist" && tab === "reset" ? "新密码" : "登录密码"}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="button" onClick={() => setShow((value) => !value)} aria-label={show ? "隐藏密码" : "显示密码"}>
              {show ? "隐" : "显"}
            </button>
          </label>
        ) : null}
        <div className="dx-login-row">
          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input type="checkbox" checked={agree} onChange={(event) => setAgree(event.target.checked)} />
            我已阅读并同意
            <button className="dx-link" type="button" onClick={() => setAgreement(true)}>
              《用户协议》
            </button>
          </label>
          {mode === "login" ? (
            <Link className="dx-link" href="/regist?activeTab=1">
              找回密码
            </Link>
          ) : null}
        </div>
        {error ? <div className="dx-error">{error}</div> : null}
        <button className="dx-login-submit" type="submit">
          {title === "找回密码" ? "重置密码" : title === "注册" ? "立即注册" : "登录"}
        </button>
        <div style={{ marginTop: 16, textAlign: "center", color: "#999" }}>
          {mode === "login" ? (
            <>
              没有账号？
              <Link className="dx-link" href="/regist">
                立即注册
              </Link>
            </>
          ) : (
            <>
              已有账号？
              <Link className="dx-link" href="/login">
                立即登录
              </Link>
            </>
          )}
        </div>
      </form>
      {agreement ? (
        <div className="dx-modal-mask" onClick={() => setAgreement(false)}>
          <div className="dx-modal" onClick={(event) => event.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>用户协议</h3>
            <p>
              使用群兴尚品微信小店助手前，请确认你已获得店铺授权，并遵守微信小店与 1688 的平台规范。账号、订单和采购数据仅用于本店铺的下单、发货和售后。
            </p>
            <p className="dx-muted">完整协议文本以源站弹窗为准。</p>
            <button
              className="dx-btn primary"
              type="button"
              onClick={() => {
                setAgree(true);
                setAgreement(false);
              }}
            >
              同意
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
