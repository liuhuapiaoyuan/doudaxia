"use client";

import Link from "next/link";
import { useState } from "react";
import { packages, rankGoods, scoreLogs, scoreRules } from "@/lib/sites/doudaxia/catalog";
import { PageTabs, Pager, QuotaBar, useToast } from "@/components/sites/doudaxia/ui";

export function HomePage() {
  const [range, setRange] = useState("今日");
  const storeMetrics = [
    ["销量", "4", "blue"],
    ["销售额（总）", "18.60", "blue"],
    ["平台补贴", "1.10", "blue"],
    ["退款量", "0", "red"],
    ["退款额", "0.00", "red"],
    ["退款率", "0%", "red"],
  ];
  const purchaseMetrics = [
    ["采购量", "3", "green"],
    ["销售额（已采购）", "16.86", "green"],
    ["采购成本", "16.80", "green"],
    ["运费/运费险", "7.30", "green"],
    ["预估利润", "0.06", "green"],
    ["预估利润率", "0.4%", "green"],
  ];
  return (
    <div className="home-page">
      <main className="home-main">
        <section className="home-profile card">
          <div className="home-avatar" aria-hidden="true"><span>◉_◉</span></div>
          <div>
            <div className="home-profile-name">186****4143 <span>ID：495854</span><button type="button" className="home-refresh" aria-label="刷新账户">↻</button></div>
            <div className="home-profile-sub">绑定店铺：1/500 个</div>
          </div>
        </section>

        <section className="home-stat-card card">
          <div className="home-card-head">
            <h3>微店统计</h3>
            <div className="home-range">
              {["今日", "昨日", "7日", "30日"].map((item) => (
                <button key={item} className={range === item ? "active" : ""} type="button" onClick={() => setRange(item)}>{item}</button>
              ))}
            </div>
            <button className="home-time" type="button">按成交时间⌄</button>
          </div>
          <div className="home-stat-columns">
            <div className="home-stat-group">
              {storeMetrics.map(([label, value, color]) => (
                <div className="home-metric" key={label}><span>{label}</span><strong className={color}>{value}</strong></div>
              ))}
            </div>
            <div className="home-stat-group purchase">
              {purchaseMetrics.map(([label, value, color]) => (
                <div className="home-metric" key={label}><span>{label}</span><strong className={color}>{value}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-income card">
          <h3>营收走势</h3>
          <div className="home-chart-legend"><span className="sales">销售额</span><span className="purchased">销售额(已采购)</span><span className="cost">采购成本</span><span className="profit">利润</span></div>
          <svg className="home-line-chart" viewBox="0 0 650 230" role="img" aria-label="营收走势折线图">
            <g className="home-grid"><line x1="35" y1="28" x2="630" y2="28" /><line x1="35" y1="72" x2="630" y2="72" /><line x1="35" y1="116" x2="630" y2="116" /><line x1="35" y1="160" x2="630" y2="160" /><line x1="35" y1="204" x2="630" y2="204" /></g>
            <g className="home-axis"><text x="3" y="32">15.00</text><text x="3" y="76">12.00</text><text x="3" y="120">9.00</text><text x="3" y="164">6.00</text><text x="3" y="208">3.00</text></g>
            <path className="sales" d="M35 202 C90 196 115 202 150 200 S210 204 240 199 S278 190 290 52 S315 201 365 202 S420 198 458 202 S520 198 565 200 S610 203 630 202" />
            <path className="purchased" d="M35 204 C90 198 115 203 150 201 S210 206 240 202 S278 194 290 78 S315 204 365 204 S420 199 458 204 S520 200 565 202 S610 205 630 204" />
            <path className="cost" d="M35 203 C90 202 115 205 150 203 S210 207 240 204 S278 195 290 92 S315 205 365 205 S420 202 458 205 S520 202 565 204 S610 206 630 205" />
            <path className="profit" d="M35 205 C90 204 115 207 150 205 S210 208 240 206 S278 198 290 111 S315 207 365 207 S420 204 458 207 S520 204 565 206 S610 208 630 207" />
          </svg>
        </section>
      </main>

      <aside className="home-side">
        <section className="home-shop card">
          <div className="home-shop-head"><span className="home-shop-icon">▧</span><div><strong>群兴小铺</strong><span>当前店铺　↔</span></div></div>
          <div className="home-service"><div>一键下单：2026-10-15 <span>还剩 3 天</span> <a href="https://store.weixin.qq.com/shop/servicemarket/detail?serviceId=4444279944260616194" target="_blank" rel="noreferrer">去续订</a></div><div>商品搬家：2026-11-07 <span>还剩 26 天</span> <a href="https://store.weixin.qq.com/shop/servicemarket/detail?serviceId=4444280086028140555" target="_blank" rel="noreferrer">去续订</a></div></div>
          <div className="home-shop-rows"><div>在售商品：<b>0</b> 件 <span>待关联货源 <b>0</b> 件</span><i>›</i></div><div>全部货源：<b>313</b> 件 <span>待关联退货地址 <em>313</em> 个</span><i>›</i></div><div>厂家数量：<b>114</b> 件 <span>待关联退货地址 <em>114</em> 个</span><i>›</i></div><div>采购账号：<b>1</b> 个 <span>异常 <b>0</b> 个</span><i>›</i></div><div>退货异常：<b>0</b> 笔 <span>退货地址不一致</span><i>›</i></div></div>
        </section>
        <section className="home-ranking card">
          <div className="home-card-head"><h3>销售排行</h3><button className="home-time" type="button">今日⌄</button><button className="home-time" type="button">按销售⌄</button></div>
          <div className="home-rank-head"><span>排行</span><span>商品</span><span>销售</span></div>
          {rankGoods.slice(0, 4).map((item, index) => (
            <div className="home-rank-row" key={item.title}><span className={`home-medal m${index + 1}`}>{index + 1}</span><img src={item.img} alt="" /><div className="home-rank-product"><b><span className="home-goods-tag">微店</span>{item.title}</b><small>▱</small></div><strong>{item.sales}</strong></div>
          ))}
          <Link className="home-rank-more" href="/order-sales-rank">查看销量排行明细</Link>
        </section>
      </aside>
    </div>
  );
}

export function ShopListPage() {
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">店铺绑定</button></div>
      <div className="dx-card">
        <div className="dx-filters">
          <button className="dx-status active" type="button">全部店铺 <b style={{ marginLeft: 6 }}>1</b></button>
          <button className="dx-btn primary" type="button">绑定新店铺</button>
        </div>
        <table className="dx-table">
          <thead>
            <tr>
              {["微店店铺", "默认采购号", "一键下单", "商品搬家", "默认发货地址", "自动售后"].map((head) => <th key={head}>{head}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>群兴小铺</b>
                <div className="dx-kv">在售商品：183 件</div>
              </td>
              <td>tb332640402013</td>
              <td>
                服务截止：2026-10-15<br />试用版 <span className="dx-orange">还剩 5 天</span>
                <div><a className="dx-link" href="https://store.weixin.qq.com/shop/servicemarket/detail?serviceId=4444279944260616194" target="_blank" rel="noreferrer">去续订</a></div>
              </td>
              <td>
                服务截止：2026-11-07<br />标准版 <span className="dx-green">还剩 28 天</span>
                <div><a className="dx-link" href="https://store.weixin.qq.com/shop/servicemarket/detail?serviceId=4444280086028140555" target="_blank" rel="noreferrer">去续订</a></div>
              </td>
              <td>已设置</td>
              <td>已开启<br /><span className="dx-muted">未开启</span></td>
            </tr>
          </tbody>
        </table>
        <div className="dx-muted">还可绑定 499 个店铺</div>
      </div>
    </div>
  );
}

export function PurchasePage() {
  const { toast } = useToast();
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">采购账号</button></div>
      <div className="dx-card">
        <div className="dx-filters">
          <span>开通可实现 0 元采购，支付宝没钱也能下单，不占用流动资金！</span>
          <button className="dx-btn primary" type="button" onClick={() => toast("请前往 1688 授权采购号")}>添加采购号</button>
        </div>
        <table className="dx-table">
          <thead>
            <tr>
              {["采购号", "默认采购号", "备注", "免密支付", "先采后付", "官方退货仓", "授权到期时间", "操作"].map((head) => <th key={head}>{head}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tb332640402013 <span className="dx-badge green">免费版</span><div className="dx-kv">1 个店铺正在使用</div></td>
              <td>默认</td>
              <td>无</td>
              <td>已开通</td>
              <td><button className="dx-link" type="button" onClick={() => toast("正在前往开通先采后付")}>去开通</button></td>
              <td><button className="dx-link" type="button" onClick={() => toast("正在前往开通官方退货仓")}>去开通</button></td>
              <td>2027-01-10<br />剩余 91 天</td>
              <td>
                <button className="dx-link" type="button" onClick={() => toast("请在 1688 服务市场续订")}>续订</button>
                <button className="dx-link" type="button" onClick={() => toast("请重新授权采购号")}>授权</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="dx-orange">提示：如采购号更改了密码，请重新授权，否则 1688 消息无法同步，将导致自动发货售后失败！</p>
      </div>
    </div>
  );
}

export function ScorePage() {
  const { toast } = useToast();
  const [index, setIndex] = useState(0);
  const [pay, setPay] = useState("支付宝");
  const current = packages[index];
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-score", label: "充值算力" }, { href: "/goods-score-log", label: "消耗明细" }]} />
      <QuotaBar />
      <div className="dx-card">
        <p>注：已支持使用 AI 算力进行商品搬家！多充多送，现在充值可享受低至 3.3 折，1 算力只需 0.003 元！</p>
        <p className="dx-muted">AI 算力主要用于 AI 违规检测、图文生成、商品搬家。试用版店铺不支持使用 AI 算力进行商品搬家。充值的算力所有店铺可通用。</p>
        <h3 className="dx-section-title">选择套餐</h3>
        <div className="dx-packages">
          {packages.map((item, itemIndex) => (
            <button key={item.price} className={`dx-pack${index === itemIndex ? " active" : ""}`} type="button" onClick={() => setIndex(itemIndex)}>
              <div className="price">¥ {item.price}</div>
              <div>共 {item.quota.toLocaleString("zh-CN")} 算力</div>
              <div className="dx-muted">¥{item.unit}/算力　{item.off}</div>
            </button>
          ))}
        </div>
        <h3 className="dx-section-title">支付方式</h3>
        <div className="dx-status-row">
          {["支付宝", "微信支付"].map((item) => (
            <button key={item} className={`dx-status${pay === item ? " active" : ""}`} type="button" onClick={() => setPay(item)}>{item}</button>
          ))}
        </div>
        <p>合计： <b className="dx-green">¥ {current.price} 元</b> 购买可获取 {current.quota.toLocaleString("zh-CN")} 个 AI 算力（含赠送 {current.gift} 算力，低至 {current.unit} 元/算力）</p>
        <button className="dx-btn primary" type="button" onClick={() => toast(`请使用${pay}支付 ¥${current.price}`)}>立即充值</button>
        <h3 className="dx-section-title">算力消耗规则</h3>
        <table className="dx-table">
          <thead><tr><th>使用场景</th><th>消耗</th></tr></thead>
          <tbody>
            {scoreRules.map(([name, cost]) => (
              <tr key={name}><td>{name}</td><td>{cost}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ScoreLogPage() {
  const [kind, setKind] = useState("AI算力");
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-score", label: "充值算力" }, { href: "/goods-score-log", label: "消耗明细" }]} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-status-row">
          {["AI算力", "搬家额度"].map((item) => (
            <button key={item} className={`dx-status${kind === item ? " active" : ""}`} type="button" onClick={() => setKind(item)}>{item}</button>
          ))}
          <select className="dx-select" defaultValue="全部类型"><option>全部类型</option></select>
          <input className="dx-input" defaultValue="2026-09-26" readOnly />
          <span>至</span>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <button className="dx-btn primary" type="button">查找</button>
        </div>
        {kind === "AI算力" ? (
          <table className="dx-table">
            <thead>
              <tr>{["类型", "商品数量", "单价（算力）", "消耗算力", "剩余算力", "时间", "备注"].map((head) => <th key={head}>{head}</th>)}</tr>
            </thead>
            <tbody>
              {scoreLogs.map((row) => (
                <tr key={row.time}>
                  <td>{row.type}</td><td>{row.count}</td><td>{row.price}</td><td>{row.used}</td><td>{row.left}</td><td>{row.time}</td><td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dx-empty">搬家额度暂无消耗记录</div>
        )}
        <Pager total={kind === "AI算力" ? "共2条" : "共0条"} />
      </div>
    </div>
  );
}
