"use client";

import Link from "next/link";
import { useState } from "react";
import { packages, rankGoods, scoreLogs, scoreRules } from "@/lib/sites/doudaxia/catalog";
import { PageTabs, Pager, QuotaBar, useToast } from "@/components/sites/doudaxia/ui";

export function HomePage() {
  const [range, setRange] = useState("今日");
  return (
    <div className="dx-page">
      <div className="dx-card">
        <div className="dx-filters">
          <b style={{ fontSize: 18 }}>186****4143</b>
          <span className="dx-muted">ID：495854</span>
          <span>绑定店铺：1/500 个</span>
        </div>
      </div>
      <h3 className="dx-section-title">微店统计</h3>
      <div className="dx-stats">
        {[
          ["销量", "4"],
          ["销售额（总）", "21.54"],
          ["平台补贴", "3.00"],
          ["退款量", "0"],
          ["退款额", "0.00"],
          ["退款率", "0%"],
        ].map(([label, value]) => (
          <div className="dx-stat" key={label}>
            <em>{label}</em>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="dx-card">
        <div className="dx-filters">
          <b>采购统计</b>
          {["今日", "昨日", "7日", "30日"].map((item) => (
            <button key={item} className={`dx-status${range === item ? " active" : ""}`} type="button" onClick={() => setRange(item)}>{item}</button>
          ))}
          <span className="dx-muted">按成交时间</span>
        </div>
        <div className="dx-stats" style={{ marginTop: 12 }}>
          {[
            ["采购量", "0"],
            ["销售额（已采购）", "0.00"],
            ["采购成本", "0.00"],
            ["运费/运费险", "0.00"],
            ["预估利润", "0.00"],
            ["预估利润率", "0%"],
          ].map(([label, value]) => (
            <div className="dx-stat" key={label}><em>{label}</em><strong>{value}</strong></div>
          ))}
        </div>
      </div>
      <div className="dx-two">
        <div className="dx-card">
          <b>群兴小铺 当前店铺</b>
          <div className="dx-kv" style={{ marginTop: 10 }}>一键下单：2026-10-15 <span className="dx-orange">还剩 5 天</span> <a className="dx-link" href="https://store.weixin.qq.com/shop/servicemarket/detail?serviceId=4444279944260616194" target="_blank" rel="noreferrer">去续订</a></div>
          <div className="dx-kv">商品搬家：2026-11-07 <span className="dx-green">还剩 28 天</span> <a className="dx-link" href="https://store.weixin.qq.com/shop/servicemarket/detail?serviceId=4444280086028140555" target="_blank" rel="noreferrer">去续订</a></div>
          <div className="dx-kv">在售商品：0 件　待关联货源 0 件</div>
          <div className="dx-kv">全部货源：122 件　待关联退货地址 122 个</div>
          <div className="dx-kv">厂家数量：59 件　待关联退货地址 59 个</div>
          <div className="dx-kv">采购账号：1 个　异常 0 个</div>
          <div className="dx-kv">退货异常：0 笔</div>
        </div>
        <div className="dx-card">
          <div className="dx-filters"><b>销售排行</b><span>今日 · 按销售</span></div>
          {rankGoods.map((item, index) => (
            <div className="dx-goods" key={item.title} style={{ marginTop: 10 }}>
              <b>{index + 1}</b>
              <img className="dx-thumb" src={item.img} alt="" />
              <div style={{ flex: 1 }}>{item.title}</div>
              <b>{item.sales}</b>
            </div>
          ))}
          <Link className="dx-link" href="/order-sales-rank">查看销量排行明细</Link>
        </div>
      </div>
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
