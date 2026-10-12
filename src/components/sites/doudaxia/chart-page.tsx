"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { rankGoods } from "@/lib/sites/doudaxia/catalog";

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

const tradeWechat = {
  front: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  back: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
};
const tradeBuy = {
  front: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  back: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
};
const incomeProfit = {
  front: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2.86, 0, -2.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  back: [0, 0, 0, 0, 0, 0, -3.5, 0, 0, 0, 0, 0, 0, 0, -0.97, 0, 0, 0, 0, -3.36, 0, 0, 0, 0],
};
const incomeRefund = {
  front: Array.from({ length: 24 }, () => 0),
  back: Array.from({ length: 24 }, () => 0),
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function catmull(points: { x: number; y: number }[]) {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function TrendChart({
  front,
  back,
  colors,
  unit,
}: {
  front: number[];
  back: number[];
  colors: { line: [string, string]; area: [[string, string], [string, string]] };
  unit: string;
}) {
  const w = 620;
  const h = 220;
  const left = 28;
  const right = 16;
  const top = 12;
  const bottom = 28;
  const values = [...front, ...back];
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const x = (i: number) => left + (i * (w - left - right)) / 23;
  const y = (v: number) => top + ((max - v) / (max - min || 1)) * (h - top - bottom);
  const toPts = (series: number[]) => series.map((v, i) => ({ x: x(i), y: y(v) }));
  const frontPath = catmull(toPts(front));
  const backPath = catmull(toPts(back));
  const close = (path: string, series: number[]) =>
    `${path} L ${x(series.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  const ticks = [0, 3, 6, 9, 12, 15, 18, 21];
  const yTicks = max <= 1 ? [0, 1] : [min, 0, max].filter((v, i, arr) => arr.indexOf(v) === i);

  return (
    <svg className="dx-dash-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`${unit}-front`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.area[0][0]} />
          <stop offset="100%" stopColor={colors.area[0][1]} />
        </linearGradient>
        <linearGradient id={`${unit}-back`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.area[1][0]} />
          <stop offset="100%" stopColor={colors.area[1][1]} />
        </linearGradient>
      </defs>
      {yTicks.map((tick) => (
        <g key={tick}>
          <line x1={left} x2={w - right} y1={y(tick)} y2={y(tick)} stroke="rgba(255,255,255,0.08)" />
          <text x={4} y={y(tick) + 4} fill="#9ecfbc" fontSize="11">{tick}</text>
        </g>
      ))}
      <path d={close(backPath, back)} fill={`url(#${unit}-back)`} />
      <path d={backPath} fill="none" stroke={colors.line[1]} strokeWidth="2" />
      <path d={close(frontPath, front)} fill={`url(#${unit}-front)`} />
      <path d={frontPath} fill="none" stroke={colors.line[0]} strokeWidth="2" />
      {ticks.map((tick) => (
        <text key={tick} x={x(tick)} y={h - 8} fill="#9ecfbc" fontSize="11" textAnchor="middle">{hours[tick]}</text>
      ))}
    </svg>
  );
}

function RateRing({ name, value, color }: { name: string; value: number; color: string }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const pct = Math.min(Math.abs(value), 100);
  const dash = (pct / 100) * c;
  return (
    <svg className="dx-dash-ring" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" />
      <circle
        cx="38"
        cy="38"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="butt"
        transform="rotate(-90 38 38)"
      />
      <text x="38" y="34" textAnchor="middle" fill="#fff" fontSize="11">{name}</text>
      <text x="38" y="50" textAnchor="middle" fill="#fff" fontSize="12">{value}%</text>
    </svg>
  );
}

export function ChartPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("2026-10-10 15:11:51");
  const [left, setLeft] = useState(299);
  const [full, setFull] = useState(false);
  const [shop, setShop] = useState("群兴小铺");
  const [shopOpen, setShopOpen] = useState(false);
  const [startDate, setStartDate] = useState("2026-10-10");
  const [endDate, setEndDate] = useState("2026-10-10");
  const [trade, setTrade] = useState<"wechat" | "buy">("wechat");
  const [income, setIncome] = useState<"profit" | "refund">("profit");

  useEffect(() => {
    const tick = window.setInterval(() => {
      const now = new Date();
      setClock(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
      setLeft((prev) => (prev <= 0 ? 299 : prev - 1));
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const tradeData = trade === "wechat" ? tradeWechat : tradeBuy;
  const incomeData = income === "profit" ? incomeProfit : incomeRefund;
  const dateLabel = `${Number(startDate.slice(5, 7))}月${Number(startDate.slice(8, 10))}日`;
  const refreshDashboard = () => {
    setLeft(299);
    setClock(new Date().toLocaleString("zh-CN", { hour12: false }).replaceAll("/", "-"));
  };
  const tradeColors = useMemo(
    () =>
      trade === "buy"
        ? { line: ["#b8ee45", "#2f8e36"] as [string, string], area: [["rgba(184, 238, 69, 0.35)", "rgba(184, 238, 69, 0)"], ["rgba(47, 142, 54, 0.3)", "rgba(47, 142, 54, 0)"]] as [[string, string], [string, string]] }
        : { line: ["#5ad7ff", "#3d73ff"] as [string, string], area: [["rgba(90, 215, 255, 0.35)", "rgba(90, 215, 255, 0)"], ["rgba(61, 115, 255, 0.3)", "rgba(61, 115, 255, 0)"]] as [[string, string], [string, string]] },
    [trade],
  );
  const incomeColors = useMemo(
    () =>
      income === "refund"
        ? { line: ["#e34b7b", "#b33170"] as [string, string], area: [["rgba(227, 75, 123, 0.35)", "rgba(227, 75, 123, 0)"], ["rgba(179, 49, 112, 0.3)", "rgba(179, 49, 112, 0)"]] as [[string, string], [string, string]] }
        : { line: ["#b25cff", "#6754ff"] as [string, string], area: [["rgba(178, 92, 255, 0.36)", "rgba(178, 92, 255, 0)"], ["rgba(103, 84, 255, 0.3)", "rgba(103, 84, 255, 0)"]] as [[string, string], [string, string]] },
    [income],
  );

  const medals = ["/sites/doudaxia/chart-rank-1.png", "/sites/doudaxia/chart-rank-2.png", "/sites/doudaxia/chart-rank-3.png"];

  return (
    <div className={`dx-dash${full ? " is-full" : ""}`} ref={rootRef}>
      <div className="dx-dash-banner">
        <img src="/sites/doudaxia/charts-header-qx.png?v=4" alt="兴链数据大屏" />
      </div>
      <div className="dx-dash-body">
        <div className="dx-dash-toolbar">
          <div className="dx-dash-shop-wrap">
            <button className="dx-dash-shop" type="button" aria-expanded={shopOpen} onClick={() => setShopOpen((open) => !open)}>
              <img src="/sites/doudaxia/icon-shop.svg" alt="" />
              <span>{shop}</span>
              <i />
            </button>
            {shopOpen && (
              <div className="dx-dash-shop-menu">
                <button type="button" className={shop === "群兴小铺" ? "selected" : ""} onClick={() => { setShop("群兴小铺"); setShopOpen(false); }}>群兴小铺</button>
                <button type="button" className={shop === "全部店铺" ? "selected" : ""} onClick={() => { setShop("全部店铺"); setShopOpen(false); }}>全部店铺</button>
              </div>
            )}
          </div>
          <div className="dx-dash-range" aria-label="日期范围">
            <input type="date" value={startDate} max={endDate} onChange={(event) => setStartDate(event.target.value)} aria-label="开始日期" />
            <span>至</span>
            <input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} aria-label="结束日期" />
          </div>
          <button className="dx-dash-preset" type="button" onClick={() => { setStartDate("2026-10-10"); setEndDate("2026-10-10"); }}>今天 <i /></button>
          <button className="dx-dash-refresh" type="button" onClick={refreshDashboard} aria-label="刷新数据" title="刷新数据">↻</button>
          <div className="dx-dash-grow" />
          <div className="dx-dash-clock">
            {clock}
            <div>数据刷新倒计时：{pad(Math.floor(left / 60))}:{pad(left % 60)}</div>
          </div>
          <button
            className="dx-dash-full"
            type="button"
            onClick={() => {
              if (document.fullscreenElement) void document.exitFullscreen();
              else if (rootRef.current) void rootRef.current.requestFullscreen();
            }}
          >
            {full ? "退出全屏" : "全屏显示"}
          </button>
        </div>

        <div className="dx-dash-kpis">
          <div className="dx-dash-card">店铺订单： <b>4</b> 单<div>平均客单价：¥5.39</div></div>
          <div className="dx-dash-card">总销售额： <b>¥21.54</b> 元<div>平台补贴：¥3.00</div></div>
          <div className="dx-dash-card">采购订单: <b>2</b> 单<div>采购销售额：¥6.39</div></div>
          <div className="dx-dash-card">采购实付 <b>¥12.00</b> 元<div>采购运费：¥4.30</div></div>
          <div className="dx-dash-card with-ring">
            <div>利润总额： <b>¥-5.61</b> 元<div>每笔利润：¥-2.81</div></div>
            <RateRing name="利润率" value={-87.8} color="#8064ff" />
          </div>
          <div className="dx-dash-card with-ring">
            <div>退款总额： <b>¥0.00</b> 元<div>退款笔数:0</div></div>
            <RateRing name="退款率" value={0} color="#ff9ad0" />
          </div>
        </div>

        <div className="dx-dash-trends">
          <div className="dx-dash-panel">
            <div className="dx-dash-title">
              总交易实时概览 <span>(单)</span>
              <div className="dx-dash-legend">
                <span className="front">今天 <em>({dateLabel})</em></span>
                <span className="back">昨天 <em>(10月9日)</em></span>
              </div>
              <div className="dx-dash-switch">
                <button className={trade === "wechat" ? "on" : ""} type="button" onClick={() => setTrade("wechat")}>微店订单</button>
                <button className={trade === "buy" ? "on" : ""} type="button" onClick={() => setTrade("buy")}>采购订单</button>
              </div>
            </div>
            <TrendChart front={tradeData.front} back={tradeData.back} colors={tradeColors} unit={`t-${trade}`} />
          </div>
          <div className={`dx-dash-panel income${income === "refund" ? " refund" : ""}`}>
            <div className="dx-dash-title">
              总交易收益概览 <span>(元)</span>
              <div className={`dx-dash-legend ${income}`}>
                <span className="front">今天 <em>({dateLabel})</em></span>
                <span className="back">昨天 <em>(10月9日)</em></span>
              </div>
              <div className={`dx-dash-switch ${income}`}>
                <button className={income === "profit" ? "on" : ""} type="button" onClick={() => setIncome("profit")}>利润总额</button>
                <button className={income === "refund" ? "on" : ""} type="button" onClick={() => setIncome("refund")}>退款总额</button>
              </div>
            </div>
            <TrendChart front={incomeData.front} back={incomeData.back} colors={incomeColors} unit={`i-${income}`} />
          </div>
        </div>

        <div className="dx-dash-tables">
          <div className="dx-dash-panel table">
            <div className="dx-dash-title">店铺销量排行</div>
            <div className="dx-dash-th"><span>店铺</span><span>销量</span><span>销售额（元）</span></div>
            <div className="dx-dash-tr">
              <span><img src="/sites/doudaxia/icon-kuaishou.svg" alt="" /> 群兴小铺</span>
              <span>6</span>
              <span>21.54</span>
            </div>
            <Link className="dx-dash-more" href="/order-sales-rank">查看销量排行明细</Link>
          </div>
          <div className="dx-dash-panel table">
            <div className="dx-dash-title">店铺利润排行</div>
            <div className="dx-dash-th"><span>店铺</span><span>利润（元）</span><span>利润率</span></div>
            <div className="dx-dash-tr">
              <span><img src="/sites/doudaxia/icon-kuaishou.svg" alt="" /> 群兴小铺</span>
              <span>-5.61</span>
              <span>-87.8%</span>
            </div>
            <Link className="dx-dash-more" href="/order-shop-profit">查看利润排行明细</Link>
          </div>
          <div className="dx-dash-panel table">
            <div className="dx-dash-title">商品销售排行</div>
            <div className="dx-dash-th goods"><span>排行</span><span>商品</span><span>销量</span></div>
            {rankGoods.map((item, index) => (
              <div className="dx-dash-goods" key={item.title}>
                {medals[index] ? <img className="dx-dash-medal" src={medals[index]} alt="" /> : <b className="dx-dash-medal-num">{index + 1}</b>}
                <img className="dx-dash-thumb" src={item.img} alt="" />
                <div>
                  <div className="dx-dash-gtitle">{item.title}</div>
                  <div className="dx-dash-shopname">群兴小铺</div>
                </div>
                <span>{item.sales}</span>
              </div>
            ))}
            <Link className="dx-dash-more" href="/order-product-profit">查看商品排行明细</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
