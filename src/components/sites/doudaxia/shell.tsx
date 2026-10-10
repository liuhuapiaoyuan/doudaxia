"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AUTH_KEY } from "@/lib/sites/doudaxia/catalog";
import { menu, type NavGroup } from "@/lib/sites/doudaxia/nav";
import { ToastProvider, useToast } from "@/components/sites/doudaxia/ui";

function Icon({ name }: { name: NavGroup["icon"] }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  if (name === "account") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
      </svg>
    );
  }
  if (name === "order") {
    return (
      <svg {...common}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </svg>
    );
  }
  if (name === "after") {
    return (
      <svg {...common}>
        <path d="M4 12a8 8 0 1 0 2.2-5.5" />
        <path d="M4 4v5h5" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19h16M7 16V9M12 16V5M17 16v-6" />
      </svg>
    );
  }
  if (name === "move") {
    return (
      <svg {...common}>
        <path d="M3 7h11l3 4h4v6h-3" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  }
  if (name === "coupon") {
    return (
      <svg {...common}>
        <path d="M4 8h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V8z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function ShellInner({ authed, children }: { authed: boolean; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [userOpen, setUserOpen] = useState(false);
  const [float, setFloat] = useState("");

  useEffect(() => {
    if (!authed) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [authed, pathname, router]);

  if (!authed) {
    return <div className="dx-boot">正在加载...</div>;
  }

  return (
    <div className="dx-shell">
      <header className="dx-header">
        <Link href="/order-list">
          <img className="dx-brand" src="/sites/doudaxia/header-brand.gif" alt="抖大侠 微信小店助手" />
        </Link>
        <div className="dx-header-right">
          <a className="dx-pill" href="https://www.yuque.com/51doudaxia/hum8gg/tzvlubmkgnxx2l1f" target="_blank" rel="noreferrer">
            <img src="/sites/doudaxia/icon-video.svg" alt="" />
            <span>视频教程</span>
          </a>
          <button className="dx-pill" type="button" onClick={() => toast("客服小侠 13751176564")}>
            <img src="/sites/doudaxia/icon-kefu.svg" alt="" />
            <span>联系客服</span>
          </button>
          <Link className="dx-pill" href="/order-address">
            <span>发货/退货异常</span>
          </Link>
          <a className="dx-pill" href="https://www.51doudaxia.com" target="_blank" rel="noreferrer">
            <img src="/sites/doudaxia/icon-pc.svg" alt="" />
            <span>下载PC端</span>
          </a>
          <a className="dx-pill" href="https://www.51doudaxia.com" target="_blank" rel="noreferrer">
            <img src="/sites/doudaxia/icon-app.svg" alt="" />
            <span>下载APP</span>
          </a>
          <div className="dx-user">
            <button className="dx-user" type="button" onClick={() => setUserOpen((v) => !v)}>
              <img className="dx-user-shop" src="/sites/doudaxia/icon-shop.svg" alt="" />
              <span className="dx-user-meta">
                <span className="dx-user-phone">186****4143</span>
                <span className="dx-user-shopname">当前店铺：群兴小铺</span>
              </span>
              <i className="dx-caret" />
            </button>
            {userOpen ? (
              <div className="dx-menu-pop">
                <Link href="/order-home" onClick={() => setUserOpen(false)}>
                  账号概览
                </Link>
                <Link href="/shop-list" onClick={() => setUserOpen(false)}>
                  群兴小铺
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    window.localStorage.removeItem(AUTH_KEY);
                    document.cookie = `${AUTH_KEY}=; path=/; max-age=0`;
                    window.location.assign("/login");
                  }}
                >
                  退出登录
                </button>
              </div>
            ) : null}
          </div>
          <button
            className="dx-screen"
            type="button"
            aria-label="全屏"
            onClick={() => {
              if (document.fullscreenElement) {
                void document.exitFullscreen();
              } else {
                void document.documentElement.requestFullscreen();
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
            </svg>
          </button>
        </div>
      </header>
      <div className="dx-frame">
        <aside className="dx-sider">
          <nav className="dx-menu">
            {menu.map((group) => (
              <div className="dx-menu-group" key={group.title}>
                <div className="dx-menu-title">
                  <span className="dx-menu-icon">
                    <Icon name={group.icon} />
                  </span>
                  {group.title}
                </div>
                <div className="dx-menu-list">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`dx-menu-item${pathname === item.href ? " active" : ""}`}
                    >
                      {item.label}
                      {item.badge === "new" ? <i className="dx-new">NEW</i> : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <main className={`dx-main${pathname === "/order-chart" ? " dx-main-chart" : ""}`}>{children}</main>
      </div>
      <div className="dx-float">
        {(["助手", "任务", "技能"] as const).map((name) => (
          <button key={name} type="button" onClick={() => setFloat(float === name ? "" : name)}>
            {name}
          </button>
        ))}
      </div>
      {float ? (
        <div className="dx-menu-pop" style={{ position: "fixed", right: 58, top: "46%", minWidth: 180 }}>
          <div style={{ padding: "8px 14px", color: "#888" }}>{float}</div>
          <button type="button" onClick={() => toast(`${float}面板已打开`)}>
            查看{float}
          </button>
          <button type="button" onClick={() => setFloat("")}>
            关闭
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function AppShell({ authed, children }: { authed: boolean; children: ReactNode }) {
  return (
    <ToastProvider>
      <ShellInner authed={authed}>{children}</ShellInner>
    </ToastProvider>
  );
}
