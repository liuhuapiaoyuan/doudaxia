"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastValue = { toast: (message: string) => void };
const ToastContext = createContext<ToastValue>({ toast: () => undefined });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const toast = useCallback((next: string) => {
    setMessage(next);
    window.setTimeout(() => setMessage(""), 1800);
  }, []);
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message ? <div className="dx-toast">{message}</div> : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export function PageTabs({
  tabs,
}: {
  tabs: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <div className="dx-tabs">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} className={pathname === tab.href ? "active" : ""}>
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export function QuotaBar() {
  return (
    <div className="dx-quota">
      <span>
        <b>群兴小铺</b> 标准版
      </span>
      <span>
        提审额度： <b>150</b>
      </span>
      <span>
        当月免费额度 <b>811</b>
      </span>
      <span>
        AI算力 <b>1300</b>
      </span>
    </div>
  );
}

export function Pager({ total }: { total: string }) {
  return (
    <div className="dx-pager">
      <span>{total}</span>
      <button className="dx-btn" type="button" aria-label="上一页">
        {"<"}
      </button>
      <span className="dx-page-no">1</span>
      <button className="dx-btn" type="button" aria-label="下一页">
        {">"}
      </button>
      <select className="dx-select" defaultValue="20" aria-label="每页条数">
        <option value="20">20 条/页</option>
        <option value="50">50 条/页</option>
      </select>
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return <div className="dx-empty">{text}</div>;
}

export function Seller({ name, tag, years }: { name: string; tag?: string; years?: string }) {
  return (
    <div className="dx-kv">
      {name}{" "}
      {tag ? <span className="dx-badge">{tag}</span> : null}
      {years ? <span className="dx-badge blue">{years}</span> : null}
    </div>
  );
}
