"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addresses, afterReasons, orders, rankGoods, suppliers, type OrderFlag, type ShopOrder } from "@/lib/sites/doudaxia/catalog";
import { provinces } from "@/lib/sites/doudaxia/nav";
import { Empty, Pager, PageTabs, Seller, useToast } from "@/components/sites/doudaxia/ui";

const statusTabs: { key: "all" | OrderFlag; label: string }[] = [
  { key: "all", label: "全部订单" },
  { key: "buy", label: "待采购" },
  { key: "paid-wait", label: "待支付" },
  { key: "purchased", label: "已采购待发货" },
  { key: "due", label: "将逾期发货" },
  { key: "shipped", label: "已发货" },
];

const extraTabs = ["退款中", "已逾期", "已签收", "需手动处理"];

function countOf(key: "all" | OrderFlag) {
  if (key === "all") return orders.length;
  if (key === "purchased") return orders.filter((item) => item.flag === "purchased" || item.flag === "due").length;
  return orders.filter((item) => item.flag === key).length;
}

function OrderCard({
  order,
  checked,
  onCheck,
}: {
  order: ShopOrder;
  checked: boolean;
  onCheck: () => void;
}) {
  const { toast } = useToast();
  const [more, setMore] = useState(false);
  return (
    <article className="dx-order">
      <div className="dx-order-head">
        <input type="checkbox" checked={checked} onChange={onCheck} aria-label={order.id} />
        <img src="/sites/doudaxia/icon-shop.svg" alt="" width={18} height={18} />
        <span>群兴小铺</span>
        <span>订单号： {order.id}</span>
        <button className="dx-link" type="button" onClick={() => { void navigator.clipboard.writeText(order.id); toast("已复制订单号"); }}>
          复制
        </button>
        <span>成交时间：{order.time}</span>
        {order.remark ? <span className="dx-orange">{order.remark}</span> : null}
        <button className="dx-btn ghost-cyan" type="button" style={{ marginLeft: "auto" }} onClick={() => toast("已打开标记问题")}>
          标记问题
        </button>
      </div>
      <div className="dx-order-grid">
        <div className="dx-goods">
          <img className="dx-thumb" src={order.shopImg} alt="" />
          <div>
            <h4>{order.title}</h4>
            <div className="dx-kv">商品ID：{order.goodsId}</div>
            <div className="dx-kv">子订单号：{order.id}_001</div>
            <div className="dx-kv">售出规格： {order.spec}</div>
            <div className="dx-kv">单价数量：{order.unit} x {order.qty}</div>
            <div className="dx-kv">实收：{order.received}</div>
            <button className="dx-link" type="button" onClick={() => toast("已打开搜同款")}>搜同款</button>
          </div>
        </div>
        <div>
          {order.unlinked ? (
            <div>
              <div className="dx-red">请先关联货源</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Link className="dx-btn primary" href="/order-goods">去关联</Link>
                <button className="dx-btn" type="button" onClick={() => toast("已打开同款选品")}>同款选品</button>
              </div>
            </div>
          ) : (
            <div className="dx-goods">
              <img className="dx-thumb" src={order.sourceImg} alt="" />
              <div>
                <h4>
                  <a href={`https://detail.1688.com/offer/${order.purchaseNo || "0"}.html`} target="_blank" rel="noreferrer">
                    {order.sourceTitle}
                  </a>
                </h4>
                <Seller name={order.seller || ""} tag={order.sellerTag} years={order.years} />
                <div className="dx-kv">采购单号：{order.purchaseNo || "未采购"}</div>
                <div className="dx-kv">规格： {order.sourceSpec}</div>
                <div className="dx-kv">单价数量： {order.sourceUnit} x {order.sourceQty}</div>
                {order.paid ? (
                  <div className="dx-kv">实付：{order.paid} （含运费{order.freight}） <button className="dx-link" type="button">采购明细</button></div>
                ) : (
                  <div className="dx-kv">预估金额：{order.estimate}</div>
                )}
                <button className="dx-link" type="button" onClick={() => toast("已打开售后地址")}>售后地址</button>
              </div>
            </div>
          )}
        </div>
        <div className="dx-kv">
          <div>微店订单： <b className="dx-green">{order.wxStatus}</b></div>
          <div>采购状态： <b className={order.buyStatus === "待采购" ? "dx-orange" : "dx-green"}>{order.buyStatus}</b></div>
          <div>发货物流： {order.logistics}</div>
          <div>采购账号： {order.account}</div>
        </div>
        <div>
          {order.countdown ? (
            <>
              <div className="dx-kv">发货倒计时</div>
              <div className="dx-count">
                <span>{order.countdown[0]}</span>天<span>{order.countdown[1]}</span>时<span>{order.countdown[2]}</span>分
              </div>
            </>
          ) : (
            <div className="dx-muted">已发货</div>
          )}
          {order.urge ? (
            <button className="dx-btn warn" style={{ marginTop: 8, width: 180 }} type="button" onClick={() => toast("已催促卖家尽快发货")}>
              催卖家尽快发货
            </button>
          ) : null}
        </div>
        <div className="dx-actions">
          {order.manual ? (
            <button className="dx-btn primary" type="button" onClick={() => toast("已打开手动采购")}>手动采购</button>
          ) : null}
          {order.merge ? (
            <button className="dx-btn orange" type="button" onClick={() => toast("已打开合并采购")}>合并采购</button>
          ) : null}
          {order.flag !== "shipped" ? (
            <button className="dx-btn" type="button" onClick={() => toast("已打开物流发货")}>物流发货</button>
          ) : null}
          <button className="dx-btn" type="button" onClick={() => setMore((value) => !value)}>更多操作</button>
          {more ? (
            <div className="dx-menu-pop" style={{ position: "relative", top: 0 }}>
              <button type="button" onClick={() => toast("已忽略该订单")}>忽略订单</button>
              <button type="button" onClick={() => toast("已取消关联")}>取消采购</button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="dx-order-foot">
        <span>买家留言：</span>
        <span>商家备注： {order.decrypted ? <button className="dx-btn" type="button">已解密</button> : null}</span>
        <span>收货地址：{order.address}</span>
        <span>总实收： {order.total} {order.discount ? `（${order.discount}）` : ""}</span>
        <a className="dx-link" href="https://store.weixin.qq.com/shop/order/list" target="_blank" rel="noreferrer">查看微店订单</a>
        {order.purchaseNo ? (
          <a className="dx-link" href={`https://air.1688.com/app/ctf-page/trade-order-detail/index.html?orderId=${order.purchaseNo}`} target="_blank" rel="noreferrer">
            1688采购订单
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function OrderListPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<"all" | OrderFlag>("all");
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const visible = useMemo(() => {
    return orders.filter((order) => {
      const byTab = tab === "all" || (tab === "purchased" ? order.flag === "purchased" || order.flag === "due" : order.flag === tab);
      const byQuery = !query || order.id.includes(query) || order.title.includes(query);
      return byTab && byQuery;
    });
  }, [query, tab]);

  return (
    <div className="dx-page">
      <div className="dx-tabs">
        <button className="active" type="button">1688一键下单</button>
      </div>
      <div className="dx-card">
        <div className="dx-filters">
          <span className="dx-label">店铺：</span>
          <select className="dx-select" defaultValue="群兴小铺"><option>群兴小铺</option></select>
          <span className="dx-label">成交时间：</span>
          <input className="dx-input" defaultValue="2026-09-26" readOnly />
          <span>至</span>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <select className="dx-select" defaultValue="15"><option value="15">近15天</option><option value="7">近7天</option><option value="30">近30天</option></select>
          <span className="dx-label">金额：</span>
          <input className="dx-input" defaultValue="0.00" style={{ width: 80 }} />
          <span>-</span>
          <input className="dx-input" defaultValue="0.00" style={{ width: 80 }} />
          <span className="dx-label">精确查找：</span>
          <select className="dx-select" defaultValue="订单号"><option>订单号</option><option>商品ID</option></select>
          <input className="dx-input grow" placeholder="请输入订单号" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          <button className="dx-btn primary" type="button" onClick={() => setQuery(keyword)}>查找</button>
          <button className="dx-btn" type="button" onClick={() => { setKeyword(""); setQuery(""); }}>重置</button>
        </div>
        <div className="dx-filters" style={{ marginTop: 12 }}>
          <button className="dx-btn" type="button" onClick={() => setFilterOpen((value) => !value)}>
            订单筛选 <span className="dx-red">New</span>
          </button>
          <button className="dx-btn" type="button" onClick={() => toast("已打开旗帜筛选")}>筛选标记</button>
          <button className="dx-btn" type="button" onClick={() => toast("正在同步订单")}>同步订单</button>
        </div>
        {filterOpen ? (
          <div className="dx-card" style={{ boxShadow: "0 3px 12px rgb(0 0 0 / 8%)" }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>订单筛选</div>
            <div className="dx-provinces">
              {["有买家留言", "有商家备注", "合并订单", "未关联货源", "利润为负"].map((item) => (
                <button key={item} className="dx-chip" type="button" onClick={() => toast(`已筛选：${item}`)}>{item}</button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="dx-status-row">
          {statusTabs.map((item) => (
            <button key={item.key} className={`dx-status${tab === item.key ? " active" : ""}`} type="button" onClick={() => setTab(item.key)}>
              {item.label}
              {countOf(item.key) ? <b>{countOf(item.key)}</b> : null}
            </button>
          ))}
          {extraTabs.map((item) => (
            <button key={item} className="dx-status" type="button" onClick={() => toast(`${item}暂无订单`)}>{item}</button>
          ))}
        </div>
      </div>
      <div className="dx-card" style={{ padding: 0 }}>
        <div className="dx-order-grid" style={{ color: "#888", fontWeight: 500 }}>
          <div>微店商品信息</div>
          <div>采购货源信息</div>
          <div>采购信息</div>
          <div>利润 / 逾期提醒</div>
          <div>操作</div>
        </div>
        {visible.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            checked={picked.includes(order.id)}
            onCheck={() => setPicked((list) => list.includes(order.id) ? list.filter((id) => id !== order.id) : [...list, order.id])}
          />
        ))}
        <div className="dx-footer-bar">
          <label>
            <input
              type="checkbox"
              checked={picked.length === visible.length && visible.length > 0}
              onChange={() => setPicked(picked.length === visible.length ? [] : visible.map((item) => item.id))}
            /> 已选 {picked.length} 个订单
          </label>
          <button className="dx-btn" type="button" onClick={() => toast(picked.length ? "已打开批量下单/支付" : "请先选择订单")}>批量下单/支付</button>
          <button className="dx-btn" type="button" onClick={() => toast("更多批量操作")}>更多</button>
          <Pager total={`共${visible.length}条`} />
        </div>
      </div>
    </div>
  );
}

export function OrderCloudPage() {
  const { toast } = useToast();
  const [on, setOn] = useState(false);
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/order-cloud", label: "自动下单" }, { href: "/order-cloud-log", label: "下单日志" }]} />
      <div className="dx-card">
        <div className="dx-filters">
          <b>1688云下单： {on ? "已开启" : "未开启"}</b>
          <span className="dx-muted">已开启 0 个店铺</span>
          <button className="dx-btn primary" type="button" onClick={() => { setOn(true); toast("已全部开启"); }}>全部开启</button>
          <button className="dx-btn" type="button" onClick={() => { setOn(false); toast("已全部停止"); }}>全部停止</button>
          <Link className="dx-link" href="/order-setting">自动下单设置</Link>
        </div>
        <p className="dx-muted">开启“1688云下单”后，电脑/软件均可关闭，系统自动离线为你拍单；不收取任何费用。</p>
        <table className="dx-table">
          <thead>
            <tr>
              {["店铺", "店铺商品", "微店订单", "微店销售额", "1688货源", "采购成功", "采购失败", "采购成本", "自动下单商品", "状态"].map((head) => <th key={head}>{head}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>群兴小铺</td>
              <td>0 件</td>
              <td>8 单</td>
              <td>¥ 128.64</td>
              <td>124 件</td>
              <td>0 单</td>
              <td>0 单</td>
              <td>¥ 30.90</td>
              <td>全部商品</td>
              <td>{on ? "已开启" : "未开启"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OrderCloudLogPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/order-cloud", label: "自动下单" }, { href: "/order-cloud-log", label: "下单日志" }]} />
      <Empty text="暂无下单日志" />
    </div>
  );
}

export function OrderSettingPage() {
  const { toast } = useToast();
  const [flags, setFlags] = useState<string[]>([]);
  const toggles = [
    "备注群兴尚品下单", "备注采购时间", "备注采购订单号", "备注采购号", "备注采购成本", "备注订单利润", "备注上家店铺名称",
    "采购下单时给厂家追加微店订单的买家留言", "软件自动发货", "上家发货有物流单号且有揽收信息后再自动发货",
    "不支持密文下单时使用微店解密下单", "密文下单失败时使用微店解密下单", "自动采购订单下单并支付", "自动选择最低价下单",
    "有买家留言订单，不自动下单", "未绑定退货地址的订单，不自动下单", "标记了问题订单的不自动下单",
  ];
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">下单设置</button></div>
      <div className="dx-card">
        <h3 className="dx-section-title">通用设置（手动/自动下单）</h3>
        {toggles.map((item) => (
          <label className="dx-check" key={item}>
            <input type="checkbox" defaultChecked={item === "软件自动发货"} /> {item}
          </label>
        ))}
        <div className="dx-filters">
          <span>微店顾客付款后</span>
          <input className="dx-input" defaultValue="30" style={{ width: 70 }} />
          <span>分钟后再下单</span>
        </div>
        <h3 className="dx-section-title">不自动下单的收货省份</h3>
        <div className="dx-provinces">
          {provinces.map((name) => (
            <button key={name} type="button" className={`dx-chip${flags.includes(name) ? " on" : ""}`} onClick={() => setFlags((list) => list.includes(name) ? list.filter((item) => item !== name) : [...list, name])}>
              {name}
            </button>
          ))}
        </div>
        <button className="dx-btn primary" style={{ marginTop: 16 }} type="button" onClick={() => toast("设置已保存")}>保存设置</button>
      </div>
    </div>
  );
}

export function SupplierPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("全部");
  const rows = tab === "已关联" || tab === "已取消" ? [] : suppliers;
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">我的供货商</button></div>
      <div className="dx-card">
        <div className="dx-status-row">
          {["全部", "已关联", "待确认", "已取消"].map((item) => (
            <button key={item} className={`dx-status${tab === item ? " active" : ""}`} type="button" onClick={() => setTab(item)}>{item}</button>
          ))}
          <button className="dx-btn primary" type="button" onClick={() => toast("已打开邀请供货商")}>邀请供货商</button>
          <button className="dx-btn" type="button" onClick={() => toast("正在同步供货商列表")}>同步供货商列表</button>
        </div>
        {rows.length === 0 ? <Empty text="暂无供货商" /> : (
          <table className="dx-table">
            <thead><tr><th>供货商名称</th><th>供货商ID</th><th>关联状态</th><th>供货商审核</th><th>操作更新时间</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td><Seller name={row.name} tag={row.tag} years={row.years} /></td>
                  <td>{row.id}</td>
                  <td>{row.status}</td>
                  <td>{row.audit} <button className="dx-link" type="button" onClick={() => toast("已发起关联")}>去关联</button></td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pager total={`共${rows.length}条`} />
      </div>
    </div>
  );
}

export function AfterPage() {
  const { toast } = useToast();
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">微店售后</button></div>
      <div className="dx-card">
        <div className="dx-filters">
          <span>店铺：</span>
          <select className="dx-select" defaultValue="群兴小铺"><option>群兴小铺</option></select>
          <span>申请时间：</span>
          <input className="dx-input" defaultValue="2026-09-26" readOnly />
          <span>至</span>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <select className="dx-select" defaultValue="15"><option>近15天</option></select>
          <input className="dx-input grow" placeholder="售后ID" />
          <button className="dx-btn primary" type="button">查找</button>
          <button className="dx-btn" type="button">重置</button>
          <button className="dx-btn" type="button" onClick={() => toast("正在同步售后")}>同步售后</button>
        </div>
        <div className="dx-status-row">
          {["全部订单", "待处理", "需手动处理", "待买家退货", "待收货", "退款成功", "拒绝售后申请", "售后关闭", "微店已退款，厂家未退款", "退货异常"].map((item, index) => (
            <button key={item} className={`dx-status${index === 0 ? " active" : ""}`} type="button">{item}</button>
          ))}
        </div>
      </div>
      <table className="dx-table">
        <thead><tr><th>微店商品信息</th><th>微店售后状态</th><th>采购货源信息</th><th>货源售后状态</th><th>操作</th></tr></thead>
      </table>
      <Empty text="暂无订单" />
      <div className="dx-footer-bar"><Pager total="共0条" /></div>
    </div>
  );
}

export function AddressPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const rows = addresses.filter((item) => item.name.includes(query));
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/order-address", label: "供货商关联地址" }, { href: "/order-address-library", label: "微店地址库" }]} />
      <div className="dx-card">
        <div className="dx-filters">
          <input className="dx-input grow" placeholder="查找供货商" onChange={(event) => setQuery(event.target.value)} />
          <a className="dx-btn" href="https://store.weixin.qq.com/shop" target="_blank" rel="noreferrer">微店官方地址库</a>
        </div>
        <table className="dx-table">
          <thead><tr><th>供货商名称</th><th>货源数量</th><th>退货地址</th><th>厂家备注</th><th>关联时间</th><th>操作</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td><Seller name={row.name} tag={row.tag} years={row.years} /></td>
                <td>{row.count}个</td>
                <td>{row.address}</td>
                <td>-</td>
                <td>{row.time}</td>
                <td><button className="dx-link" type="button" onClick={() => toast(`正在关联 ${row.name}`)}>关联</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager total={`共${rows.length}条`} />
      </div>
    </div>
  );
}

export function AddressLibraryPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/order-address", label: "供货商关联地址" }, { href: "/order-address-library", label: "微店地址库" }]} />
      <div className="dx-card">
        <div className="dx-kv">77 131****0430 福建省 泉州市 晋江市 ****</div>
        <button className="dx-btn" type="button" style={{ marginTop: 12 }}>新增售后地址</button>
      </div>
    </div>
  );
}

export function AfterSettingPage() {
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [picked, setPicked] = useState<string[]>(["不想要了", "缺货"]);
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">自动售后设置</button></div>
      <div className="dx-card">
        <div className="dx-filters">
          <b>自动售后</b>
          <button className={`dx-status${enabled ? " active" : ""}`} type="button" onClick={() => setEnabled(true)}>已开启</button>
          <button className={`dx-status${!enabled ? " active" : ""}`} type="button" onClick={() => setEnabled(false)}>已关闭</button>
        </div>
        <h3 className="dx-section-title">自动售后类型</h3>
        {["退货退款", "已发货退款", "未发货仅退款", "换货"].map((item) => (
          <label className="dx-check" key={item}><input type="checkbox" defaultChecked={item !== "换货"} /> {item}</label>
        ))}
        <h3 className="dx-section-title">自动退款条件</h3>
        <div className="dx-provinces">
          {afterReasons.map(([name, count]) => (
            <button key={name} type="button" className={`dx-chip${picked.includes(String(name)) ? " on" : ""}`} onClick={() => setPicked((list) => list.includes(String(name)) ? list.filter((item) => item !== name) : [...list, String(name)])}>
              {name}（{count}）
            </button>
          ))}
        </div>
        <label className="dx-check" style={{ marginTop: 16 }}><input type="checkbox" /> 是否应用到所有店铺</label>
        <button className="dx-btn primary" type="button" onClick={() => toast("自动售后设置已保存")}>保存设置</button>
      </div>
    </div>
  );
}

function ProfitTable({ dateLabel, date, empty }: { dateLabel: string; date?: string; empty?: boolean }) {
  return (
    <>
      <table className="dx-table">
        <thead>
          <tr>
            <th colSpan={4}>微店订单</th>
            <th colSpan={3}>采购订单</th>
            <th colSpan={2}>利润统计</th>
          </tr>
          <tr>
            {[dateLabel, "微店销量", "微店售额", "已退款", "退款率", "已采购", "采购实付", "采购销售额", "利润", "销售利润率"].map((head) => <th key={head}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {empty ? (
            <tr><td colSpan={10}><Empty text="暂无利润统计数据" /></td></tr>
          ) : (
            <tr>
              <td>{date}</td>
              <td>4 笔<br />卖出6件商品</td>
              <td>¥21.54</td>
              <td>0 笔<br />¥0.00</td>
              <td>0%</td>
              <td>0 笔</td>
              <td>¥0.00</td>
              <td>¥0.00</td>
              <td>¥0.00</td>
              <td>0%</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

const profitTabs = [
  { href: "/order-sales-rank", label: "销售排行" },
  { href: "/order-shop-profit", label: "店铺统计" },
  { href: "/order-product-profit", label: "商品统计" },
];

export function SalesRankPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={profitTabs} />
      <div className="dx-card">
        <div className="dx-status-row">
          {["店铺销量排行", "店铺采购排行", "商品销量排行", "商品采购排行"].map((item, index) => (
            <button key={item} className={`dx-status${index === 0 ? " active" : ""}`} type="button">{item}</button>
          ))}
        </div>
        <div className="dx-filters" style={{ marginTop: 12 }}>
          <select className="dx-select" defaultValue="群兴小铺"><option>群兴小铺</option></select>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <span>至</span>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <select className="dx-select" defaultValue="今天"><option>今天</option><option>近7天</option></select>
          <button className="dx-btn primary" type="button">查询</button>
        </div>
        <ProfitTable dateLabel="店铺" date="群兴小铺" />
        <div className="dx-two" style={{ marginTop: 16 }}>
          <div>
            {rankGoods.map((item, index) => (
              <div key={item.title} className="dx-goods" style={{ marginBottom: 10 }}>
                <b>{index + 1}</b>
                <img className="dx-thumb" src={item.img} alt="" />
                <div>
                  <div>{item.title}</div>
                  <b>{item.sales}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopProfitPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={profitTabs} />
      <div className="dx-card">
        <div className="dx-filters">
          <b>日利润统计</b>
          <select className="dx-select" defaultValue="群兴小铺"><option>群兴小铺</option></select>
          <select className="dx-select" defaultValue="按采购"><option>按采购</option><option>按销售</option></select>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <select className="dx-select" defaultValue="今天"><option>今天</option></select>
          <button className="dx-btn primary" type="button">查询</button>
          <button className="dx-btn" type="button">导出Excel</button>
        </div>
        <ProfitTable dateLabel="采购日期" date="2026-10-10" />
      </div>
    </div>
  );
}

export function ProductProfitPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={profitTabs} />
      <div className="dx-card">
        <div className="dx-filters">
          <b>日利润统计</b>
          <button className="dx-btn" type="button">选择商品</button>
          <select className="dx-select" defaultValue="按销售"><option>按销售</option></select>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <button className="dx-btn primary" type="button">查询</button>
          <button className="dx-btn" type="button">导出Excel</button>
        </div>
        <ProfitTable dateLabel="销售日期" empty />
      </div>
    </div>
  );
}
