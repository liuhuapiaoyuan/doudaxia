"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryRoots, couponTypes, goods, moveRecords, myCategories } from "@/lib/sites/doudaxia/catalog";
import { batchTools } from "@/lib/sites/doudaxia/nav";
import { Empty, Pager, PageTabs, QuotaBar, useToast } from "@/components/sites/doudaxia/ui";

const violationTags = ["品牌混淆", "知识产权", "盗图", "假冒信息", "劣质商品", "违禁商品", "仿冒名人", "诱导第三方", "功效/效果虚假", "品牌LOGO", "属性不一致"];

export function GoodsLinkPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("全部");
  const rows = goods.filter((item) => (tab === "未关联货源" ? item.linked === "未关联货源" || item.sku === "0%" : true));
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">关联货源</button></div>
      <div className="dx-card">
        <div className="dx-filters">
          <span>商品状态：</span>
          <select className="dx-select" defaultValue="全部"><option>全部</option><option>销售中</option></select>
          <span>商品售价：</span>
          <input className="dx-input" style={{ width: 80 }} />
          <span>-</span>
          <input className="dx-input" style={{ width: 80 }} />
          <button className="dx-btn primary" type="button">查找</button>
          <button className="dx-btn" type="button" onClick={() => toast("正在同步商品")}>同步商品</button>
        </div>
        <div className="dx-status-row">
          {["全部", "已关联货源", "未关联货源", "SKU未匹配", "SKU部分匹配", "SKU已匹配", "不支持密文", "货源已失效"].map((item) => (
            <button key={item} className={`dx-status${tab === item ? " active" : ""}`} type="button" onClick={() => setTab(item)}>{item}</button>
          ))}
        </div>
        <table className="dx-table">
          <thead>
            <tr>{["微店商品信息", "价格", "匹配SKU", "货源状态", "密文下单", "SKU匹配状态", "退货地址", "操作"].map((head) => <th key={head}>{head}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="dx-goods">
                    <img className="dx-thumb" src={item.img} alt="" />
                    <div>
                      <div>{item.title}</div>
                      <div className="dx-kv">商品ID：{item.id}</div>
                      <div className="dx-kv">类目：{item.category}</div>
                    </div>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>{item.sku || "-"}</td>
                <td>{item.linked || "未关联货源，关联后订单可一键采购，自动发货"}</td>
                <td>{item.sku === "100%" ? "支持密文" : "-"}</td>
                <td>{item.linked || "-"}</td>
                <td>{item.linked === "已关联" ? "已关联" : "未关联"}</td>
                <td>
                  <button className="dx-link" type="button" onClick={() => toast(item.sku === "0%" ? "请添加货源" : "已打开编辑货源")}>
                    {item.sku === "0%" ? "添加货源" : "编辑货源"}
                  </button>
                  <button className="dx-link" type="button" onClick={() => toast("已打开同款货源")}>同款货源</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AlibabaPage() {
  const [keyword, setKeyword] = useState("");
  const picks = goods.filter((item) => item.title.includes(keyword));
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">选品中心</button></div>
      <div className="dx-card">
        <div className="dx-filters">
          <input className="dx-input grow" placeholder="搜索 1688 货源" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          <a className="dx-btn primary" href="https://air.1688.com/app/channel-fe/search/index.html" target="_blank" rel="noreferrer">打开 1688 选品</a>
        </div>
        <p className="dx-muted">源站此页嵌入 1688 分销选品。下面展示当前店铺已在售、可继续关联的货源。</p>
        <div className="dx-tool-grid">
          {picks.map((item) => (
            <div className="dx-tool" key={item.id}>
              <img src={item.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6 }} />
              <strong style={{ marginTop: 8 }}>{item.title}</strong>
              <span>{item.price} · {item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CopyPage() {
  const { toast } = useToast();
  const [links, setLinks] = useState("");
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-copy", label: "链接复制" }, { href: "/goods-collect", label: "采集复制" }]} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>搬家模板</span>
          <b>默认规则 【默认】</b>
          <Link className="dx-link" href="/goods-move-config">编辑模板</Link>
        </div>
        <label className="dx-check">
          <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
          我已获取授权并签署了《商家搬家承诺书》，请遵守平台相关规范，确认并同意《用户服务协议，隐私政策》
        </label>
        <textarea className="dx-input" style={{ width: "100%", height: 120, padding: 10 }} placeholder="每行一条 1688 商品链接" value={links} onChange={(event) => setLinks(event.target.value)} />
        <p className="dx-muted">抓取商品不消耗额度/算力，成功搬家一个商品消耗 1 个额度/算力。商品搬家优先消耗免费额度。</p>
        <div className="dx-filters">
          <button className="dx-btn primary" type="button" onClick={() => toast(agreed && links.trim() ? "已加入搬家任务箱" : "请先填写链接并同意承诺书")}>搬至当前店铺</button>
          <button className="dx-btn" type="button" onClick={() => toast("请选择多个店铺")}>搬至多个店铺</button>
        </div>
        <h3 className="dx-section-title">搬家任务箱</h3>
        <div className="dx-kv">1 件商品待搬家... 20 小时前 未完成 0% <button className="dx-link" type="button">继续</button></div>
        <div className="dx-kv">1 件商品待搬家... 3 天前 已完成 100% <button className="dx-link" type="button">继续</button></div>
      </div>
    </div>
  );
}

export function CollectPage() {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const [rows, setRows] = useState<typeof goods>([]);
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-copy", label: "链接复制" }, { href: "/goods-collect", label: "采集复制" }]} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <b>1688</b>
          <input className="dx-input grow" placeholder="添加关键字" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          <button className="dx-btn" type="button" onClick={() => { setKeyword(""); setRows([]); }}>重置</button>
        </div>
        <div className="dx-provinces" style={{ marginTop: 10 }}>
          {["一件代发", "支持包邮", "7天无理由", "先采后付", "微店密文", "超级工厂", "实力商家"].map((item) => (
            <button key={item} className="dx-chip" type="button">{item}</button>
          ))}
        </div>
        <div className="dx-filters" style={{ marginTop: 12 }}>
          <span>搜索范围：第1页 - 第2页</span>
          <span>1688类目：全部</span>
          <span>商品排序：综合排序</span>
          <button className="dx-btn primary" type="button" onClick={() => setRows(keyword ? goods.filter((item) => item.title.includes(keyword) || keyword.length > 0).slice(0, 4) : goods.slice(0, 4))}>开始采集</button>
          <button className="dx-btn" type="button" onClick={() => toast("已停止采集")}>停止采集</button>
        </div>
        {rows.length === 0 ? <Empty text="暂无数据" /> : (
          <table className="dx-table">
            <thead><tr><th>商品信息</th><th>价格/销量</th><th>操作</th></tr></thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td className="dx-goods"><img className="dx-thumb" src={item.img} alt="" /><div>{item.title}</div></td>
                  <td>{item.price}</td>
                  <td><button className="dx-link" type="button" onClick={() => toast("已加入搬家")}>搬至当前店铺</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="dx-footer-bar">
          <span>已选 0 件</span>
          <Pager total={`找到 ${rows.length} 个商品，每页50条`} />
        </div>
      </div>
    </div>
  );
}

const authTabs = [
  { href: "/goods-auth-copy", label: "他人授权给我" },
  { href: "/goods-auth-copy-source", label: "我授权给他人" },
  { href: "/goods-auth-copy-store", label: "我有多店互搬" },
];

export function AuthCopyPage() {
  const { toast } = useToast();
  return (
    <div className="dx-page">
      <PageTabs tabs={authTabs} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <select className="dx-select" defaultValue="全部状态"><option>全部状态</option><option>正在授权中</option><option>已停止授权</option></select>
          <input className="dx-input grow" placeholder="查找" />
          <button className="dx-btn primary" type="button">查找</button>
          <button className="dx-btn" type="button">重置</button>
          <button className="dx-btn primary" type="button" onClick={() => toast("请输入对方店铺授权码")}>获取新授权</button>
        </div>
        <Empty text="暂无授权信息，请先添加授权店铺" />
        <Pager total="共0条" />
      </div>
    </div>
  );
}

export function AuthSourcePage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={authTabs} />
      <QuotaBar />
      <Empty text="还没有授权给其他店铺" />
    </div>
  );
}

export function AuthStorePage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={authTabs} />
      <QuotaBar />
      <div className="dx-card">当前仅绑定群兴小铺，暂无多店互搬任务。</div>
    </div>
  );
}

export function RecordPage() {
  const [tab, setTab] = useState("全部");
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">搬家记录</button></div>
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>微店：群兴小铺</span>
          <span>搬家时间：</span>
          <input className="dx-input" defaultValue="2026-09-26" readOnly />
          <span>至</span>
          <input className="dx-input" defaultValue="2026-10-10" readOnly />
          <button className="dx-btn primary" type="button">查找</button>
        </div>
        <div className="dx-status-row">
          {[["全部", "2"], ["复制中", "0"], ["复制失败", "8"], ["跳过复制", "9"], ["复制成功", "1"]].map(([label, count]) => (
            <button key={label} className={`dx-status${tab === label ? " active" : ""}`} type="button" onClick={() => setTab(label)}>
              {label} <b>{count}</b>
            </button>
          ))}
        </div>
        {tab === "复制成功" || tab === "全部" ? (
          <table className="dx-table">
            <thead><tr><th>来源商品信息</th><th>复制商品信息</th><th>搬家状态/时间</th><th>失败原因</th><th>操作</th></tr></thead>
            <tbody>
              {moveRecords.map((row) => (
                <tr key={row.wxId}>
                  <td>
                    <div className="dx-goods">
                      <img className="dx-thumb" src={row.img} alt="" />
                      <div>
                        <div>{row.source}</div>
                        <div className="dx-kv">供货商：{row.seller}</div>
                        <div className="dx-kv">源商品：{row.sourceId}　源售价：{row.sourcePrice}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{row.title}</div>
                    <div className="dx-kv">搬至店铺：群兴小铺</div>
                    <div className="dx-kv">搬家类目：{row.category}</div>
                    <div className="dx-kv">搬家售价：{row.price}</div>
                  </td>
                  <td><span className="dx-green">复制成功</span><div className="dx-kv">{row.time}</div><div className="dx-kv">搬家模板：默认规则</div></td>
                  <td>已上架<br />审核通过<br />微店ID：{row.wxId}</td>
                  <td><button className="dx-link" type="button">微店编辑</button><button className="dx-link" type="button">删除记录</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <Empty text="当前筛选下暂无记录" />}
      </div>
    </div>
  );
}

export function MoveConfigPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("基本配置");
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">搬家模版</button></div>
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters"><b>默认规则 【默认】</b><span>群兴小铺</span></div>
        <div className="dx-status-row">
          {["基本配置", "跳过配置", "服务与资质", "属性设置"].map((item) => (
            <button key={item} className={`dx-status${tab === item ? " active" : ""}`} type="button" onClick={() => setTab(item)}>{item}</button>
          ))}
        </div>
        {tab === "基本配置" ? (
          <>
            <h3 className="dx-section-title">上架设置</h3>
            {["立即上架", "草稿箱", "放入下架"].map((item, index) => <label className="dx-check" key={item}><input type="radio" name="shelf" defaultChecked={index === 0} /> {item}</label>)}
            <h3 className="dx-section-title">发布模式</h3>
            {["普通模式", "极简模式"].map((item, index) => <label className="dx-check" key={item}><input type="radio" name="mode" defaultChecked={index === 0} /> {item}</label>)}
            <h3 className="dx-section-title">品牌设置</h3>
            {["软件自动对应", "设为无品牌", "手动指定"].map((item, index) => <label className="dx-check" key={item}><input type="radio" name="brand" defaultChecked={index === 0} /> {item}</label>)}
            <h3 className="dx-section-title">运费模版</h3>
            <div className="dx-kv">全国包邮（偏远地区除外）　发货时间：48小时内发货</div>
            <div className="dx-kv">默认运费：1件内0元，每增加1件加0元</div>
            <div className="dx-kv">指定运费：新疆维吾尔自治区、西藏自治区：1件内10元，每增加1件加8元</div>
            <div className="dx-kv">售后地址：77 131****0430 福建省 泉州市 晋江市 ****</div>
          </>
        ) : null}
        {tab === "跳过配置" ? <p>删除标题关键词（已选 6 个），删除 SKU 规格（已选 2 个）。</p> : null}
        {tab === "服务与资质" ? (
          <>
            {["支持七天无理由", "假一赔三", "损坏包赔", "支持换货"].map((item) => (
              <label className="dx-check" key={item}><input type="checkbox" defaultChecked={item === "支持七天无理由"} /> {item}</label>
            ))}
          </>
        ) : null}
        {tab === "属性设置" ? <p>售卖价使用公式：代发价 × 百分比 + 加价。来源运费默认按上海计算。</p> : null}
        <div className="dx-filters" style={{ marginTop: 16 }}>
          <span>模版名称：</span>
          <input className="dx-input" defaultValue="默认规则" />
          <label className="dx-check"><input type="checkbox" defaultChecked /> 设为默认模版</label>
          <button className="dx-btn" type="button">删除</button>
          <button className="dx-btn" type="button">重置</button>
          <button className="dx-btn" type="button" onClick={() => toast("已另存为新模板")}>另存为</button>
          <button className="dx-btn primary" type="button" onClick={() => toast("搬家模板已保存")}>保存配置</button>
        </div>
      </div>
    </div>
  );
}

export function GoodsListPage() {
  const { toast } = useToast();
  const [status, setStatus] = useState("全部");
  const rows = useMemo(() => goods.filter((item) => status === "全部" || item.status === status), [status]);
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">商品列表</button></div>
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <input className="dx-input" placeholder="请选择类目" />
          <input className="dx-input grow" placeholder="商品ID，多个用逗号或换行分隔" />
          <select className="dx-select" defaultValue="全部品牌"><option>全部品牌</option></select>
          <button className="dx-btn primary" type="button">查询</button>
          <button className="dx-btn" type="button">重置</button>
          <button className="dx-btn" type="button" onClick={() => toast("正在同步商品")}>同步商品</button>
        </div>
        <div className="dx-status-row">
          {["全部", "销售中", "已下架", "审核中", "审核待处理", "草稿箱", "回收站"].map((item) => (
            <button key={item} className={`dx-status${status === item ? " active" : ""}`} type="button" onClick={() => setStatus(item)}>{item}</button>
          ))}
        </div>
        <table className="dx-table">
          <thead><tr><th>商品信息</th><th>售价</th><th>库存</th><th>状态</th><th>主图视频</th><th>操作</th></tr></thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="dx-goods">
                    <img className="dx-thumb" src={item.img} alt="" />
                    <div>
                      <div>{item.title}</div>
                      <div className="dx-kv">商品ID：{item.id}</div>
                      <div className="dx-kv">商品类目：{item.category}</div>
                    </div>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.status}</td>
                <td>-</td>
                <td>
                  <button className="dx-link" type="button" onClick={() => toast("已打开商品编辑")}>编辑商品</button>
                  <div className="dx-kv">更新：{item.updated}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager total={`共${rows.length}条`} />
      </div>
    </div>
  );
}

export function BatchPage() {
  const groups = ["常用修改", "修改基础信息", "修改图文价格库存", "修改服务信息"];
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-batch", label: "批量修改" }, { href: "/goods-batch-multi-field", label: "综合修改" }, { href: "/goods-batch-records", label: "修改记录" }]} />
      <QuotaBar />
      {groups.map((group) => (
        <div key={group}>
          <h3 className="dx-section-title">{group}</h3>
          <div className="dx-tool-grid">
            {batchTools.filter((tool) => tool.group === group && (group === "常用修改" ? tool.hot : true)).map((tool) => (
              <Link className="dx-tool" key={`${group}-${tool.title}`} href={tool.href}>
                <strong>{tool.title}</strong>
                <span>{tool.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BatchRecordsPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-batch", label: "批量修改" }, { href: "/goods-batch-multi-field", label: "综合修改" }, { href: "/goods-batch-records", label: "修改记录" }]} />
      <QuotaBar />
      <Empty text="暂无批量修改记录" />
    </div>
  );
}

export function BatchToolPage({ href }: { href: string }) {
  const { toast } = useToast();
  const tool = batchTools.find((item) => item.href === href);
  return (
    <div className="dx-page">
      <div className="dx-tabs">
        <Link href="/goods-batch">批量修改</Link>
        <Link href="/goods-batch-multi-field">综合修改</Link>
        <button className="active" type="button">{tool?.title}</button>
      </div>
      <QuotaBar />
      <div className="dx-card">
        <h3 style={{ marginTop: 0 }}>{tool?.title}</h3>
        <p>{tool?.desc}</p>
        <div className="dx-filters">
          <span>修改范围</span>
          <select className="dx-select" defaultValue="销售中"><option>销售中</option><option>已下架</option><option>全部</option></select>
          <input className="dx-input grow" placeholder="输入要替换或设置的内容" />
        </div>
        <table className="dx-table">
          <thead><tr><th>商品</th><th>当前值</th><th>修改后</th></tr></thead>
          <tbody>
            {goods.filter((item) => item.status === "销售中").slice(0, 4).map((item) => (
              <tr key={item.id}>
                <td className="dx-goods"><img className="dx-thumb" src={item.img} alt="" /><span>{item.title}</span></td>
                <td>{item.price}</td>
                <td className="dx-muted">预览后显示</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="dx-btn primary" type="button" onClick={() => toast(`已提交${tool?.title || "批量修改"}`)}>提交修改</button>
      </div>
    </div>
  );
}

export function ViolationPage() {
  const [tab, setTab] = useState("商品列表");
  const selling = goods.filter((item) => item.status === "销售中");
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-violation", label: "违规鉴图" }, { href: "/goods-violation-title", label: "标题检测" }]} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-status-row">
          {["商品列表", "检测记录"].map((item) => (
            <button key={item} className={`dx-status${tab === item ? " active" : ""}`} type="button" onClick={() => setTab(item)}>{item}</button>
          ))}
        </div>
        <div className="dx-provinces" style={{ marginTop: 10 }}>
          {violationTags.map((item) => <span className="dx-chip" key={item}>{item}</span>)}
        </div>
        {tab === "检测记录" ? <Empty text="暂无检测记录" /> : (
          <table className="dx-table">
            <thead><tr><th>微店商品信息</th><th>【主图/规格图/详情图】检测结果</th><th>操作</th></tr></thead>
            <tbody>
              {selling.map((item) => (
                <tr key={item.id}>
                  <td className="dx-goods"><img className="dx-thumb" src={item.img} alt="" /><div>{item.title}<div className="dx-kv">商品ID：{item.id}</div></div></td>
                  <td>未检测</td>
                  <td><button className="dx-link" type="button">违规检测</button> <button className="dx-link" type="button">编辑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function TitleCheckPage() {
  const selling = goods.filter((item) => item.status === "销售中");
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-violation", label: "违规鉴图" }, { href: "/goods-violation-title", label: "标题检测" }]} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>检测范围：</span>
          {["违禁词", "品牌词", "属性值"].map((item) => <label className="dx-check" key={item}><input type="checkbox" defaultChecked /> {item}</label>)}
          <button className="dx-btn" type="button">管理违规词库</button>
        </div>
        <table className="dx-table">
          <thead><tr><th>微店商品信息</th><th>检测结果</th><th>操作</th></tr></thead>
          <tbody>
            {selling.map((item) => (
              <tr key={item.id}>
                <td>{item.title}<div className="dx-kv">商品ID：{item.id}</div></td>
                <td>违禁词 未检测　品牌词 未检测　属性词 未检测</td>
                <td><button className="dx-link" type="button">违规检测</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ReviewPage() {
  const selling = goods.filter((item) => item.status === "销售中");
  return (
    <div className="dx-page">
      <div className="dx-tabs"><button className="active" type="button">人工鉴图</button></div>
      <QuotaBar />
      <div className="dx-card">
        {selling.map((item, index) => (
          <div className="dx-goods" key={item.id} style={{ marginBottom: 14 }}>
            <b>{index + 1}</b>
            <img className="dx-thumb" src={item.img} alt="" />
            <div>
              <div>{item.title}</div>
              <div className="dx-kv">商品ID：{item.id}</div>
              <div className="dx-kv">商品类目：{item.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DiscountPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("创建活动");
  const [days, setDays] = useState("1天");
  const [stock, setStock] = useState("使用当前库存");
  const [limit, setLimit] = useState("不限购");
  const [way, setWay] = useState("打折");
  return (
    <div className="dx-page">
      <div className="dx-tabs">
        {["创建活动", "活动列表", "创建记录"].map((item) => (
          <button key={item} className={tab === item ? "active" : ""} type="button" onClick={() => setTab(item)}>{item}</button>
        ))}
      </div>
      {tab !== "创建活动" ? <Empty text={tab === "活动列表" ? "暂无活动" : "暂无创建记录"} /> : null}
      {tab === "创建活动" ? (
      <>
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>活动时间：</span>
          {["1天", "3天", "7天", "自定义"].map((item) => (
            <button key={item} className={`dx-status${days === item ? " active" : ""}`} type="button" onClick={() => setDays(item)}>{item}</button>
          ))}
        </div>
        <p className="dx-muted">最长 7 天，快捷天数从当前开始时间计算。</p>
        <div className="dx-filters">
          <span>活动名称：</span>
          <button className="dx-status active" type="button">随机生成</button>
          <button className="dx-status" type="button">自定义前缀</button>
        </div>
        <div className="dx-filters">
          <span>活动库存：</span>
          {["使用当前库存", "自定义库存"].map((item) => (
            <button key={item} className={`dx-status${stock === item ? " active" : ""}`} type="button" onClick={() => setStock(item)}>{item}</button>
          ))}
        </div>
        <div className="dx-filters">
          <span>每人限购：</span>
          {["不限购", "限购"].map((item) => (
            <button key={item} className={`dx-status${limit === item ? " active" : ""}`} type="button" onClick={() => setLimit(item)}>{item}</button>
          ))}
        </div>
        <div className="dx-filters">
          <span>优惠方式：</span>
          {["打折", "直降"].map((item) => (
            <button key={item} className={`dx-status${way === item ? " active" : ""}`} type="button" onClick={() => setWay(item)}>{item}</button>
          ))}
          {way === "打折" ? <><input className="dx-input" defaultValue="9.5" style={{ width: 80 }} /><span>折</span></> : <><input className="dx-input" defaultValue="1" style={{ width: 80 }} /><span>元</span></>}
        </div>
        <button className="dx-btn" type="button" onClick={() => toast("请选择活动商品")}>选择商品</button>
        <p>预计创建 0 个活动</p>
        <button className="dx-btn primary" type="button" onClick={() => toast("请先选择活动商品")}>预览活动商品</button>
      </div>
      </>
      ) : null}
    </div>
  );
}

const categoryTabs = [
  { href: "/goods-category-apply", label: "申请类目" },
  { href: "/goods-category-records", label: "申请记录" },
  { href: "/goods-category-mine", label: "我的类目" },
];

export function CategoryApplyPage() {
  const { toast } = useToast();
  const [picked, setPicked] = useState<string[]>([]);
  return (
    <div className="dx-page">
      <PageTabs tabs={categoryTabs} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>保证金门槛：</span>
          <select className="dx-select"><option>不限保证金</option><option>¥1000.00</option></select>
          <label className="dx-check"><input type="checkbox" /> 过滤已开通</label>
          <label className="dx-check"><input type="checkbox" /> 过滤需资质</label>
          <label className="dx-check"><input type="checkbox" /> 过滤申请中</label>
          <input className="dx-input grow" placeholder="搜索类目名称" />
          <button className="dx-btn" type="button" onClick={() => toast("正在同步类目")}>同步类目</button>
        </div>
        <div className="dx-cat-cols">
          <div>
            <div className="dx-cat-head">一级全选　所需保证金</div>
            {categoryRoots.map(([name, count]) => (
              <button
                key={name}
                className={`dx-cat-item${picked[0] === name ? " active" : ""}`}
                type="button"
                onClick={() => setPicked([name])}
              >
                <span>{name}（{count}）</span>
                <em>待同步</em>
              </button>
            ))}
          </div>
          {["二级", "三级", "四级"].map((level, index) => (
            <div key={level}>
              <div className="dx-cat-head">{level}全选　所需保证金</div>
              <p className="dx-muted">{picked[index] ? `请选择${["一", "二", "三"][index]}级类目后继续` : `请选择${["一", "二", "三"][index]}级类目`}</p>
            </div>
          ))}
        </div>
        <div className="dx-filters" style={{ marginTop: 16 }}>
          <span>已选 0 个类目</span>
          <label className="dx-check"><input type="checkbox" /> 多店铺申请</label>
          <button className="dx-btn primary" type="button" onClick={() => toast("请选择末级类目")}>立即申请</button>
        </div>
      </div>
    </div>
  );
}

export function CategoryRecordsPage() {
  return (
    <div className="dx-page">
      <PageTabs tabs={categoryTabs} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>申请状态：</span>
          <select className="dx-select"><option>全部状态</option><option>申请中</option><option>申请成功</option><option>申请失败</option><option>已撤销</option></select>
          <span>申请日期：</span>
          <input className="dx-input" type="date" />
          <span>至</span>
          <input className="dx-input" type="date" />
          <input className="dx-input grow" placeholder="请输入类目名称" />
          <button className="dx-btn primary" type="button">查找</button>
          <button className="dx-btn" type="button">重置</button>
        </div>
        <table className="dx-table">
          <thead>
            <tr>{["申请类目", "类目数", "申请中", "申请成功", "申请失败", "已撤销", "申请状态", "申请时间", "操作"].map((head) => <th key={head}>{head}</th>)}</tr>
          </thead>
        </table>
        <Empty text="暂无类目申请记录" />
        <p className="dx-muted">仅显示当前店铺的申请记录，每次申请生成一条记录，同次申请的类目合并展示。</p>
        <Pager total="共0条" />
      </div>
    </div>
  );
}

export function CategoryMinePage() {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const rows = myCategories.filter((item) => item.name.includes(keyword) || item.path.includes(keyword) || item.id.includes(keyword));
  return (
    <div className="dx-page">
      <PageTabs tabs={categoryTabs} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-filters">
          <span>保证金：</span>
          <select className="dx-select"><option>不限保证金</option><option>¥1000.00</option></select>
          <span>类目状态：</span>
          <select className="dx-select"><option>全部状态</option><option>生效中</option><option>已失效</option></select>
          <input className="dx-input grow" placeholder="请输入类目名称 / 完整路径" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          <button className="dx-btn primary" type="button">查找</button>
          <button className="dx-btn" type="button" onClick={() => setKeyword("")}>重置</button>
          <button className="dx-btn" type="button" onClick={() => toast("正在同步类目")}>同步类目</button>
        </div>
        <table className="dx-table">
          <thead>
            <tr>{["类目名称", "完整类目路径", "保证金门槛", "类目状态", "生效时间", "失效原因"].map((head) => <th key={head}>{head}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name}
                  <div className="dx-kv">类目ID：{item.id} <button className="dx-link" type="button" onClick={() => toast("已复制类目ID")}>复制类目ID</button></div>
                </td>
                <td>{item.path} <button className="dx-link" type="button" onClick={() => toast("已复制类目路径")}>复制类目路径</button></td>
                <td>{item.deposit}</td>
                <td>{item.status}</td>
                <td>{item.time}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <Empty text="暂无符合条件的类目" /> : <Pager total={`共${rows.length}条`} />}
        <p className="dx-muted">当前店铺的类目权限，一个末级类目一条记录。</p>
      </div>
    </div>
  );
}

export function CouponPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("优惠券列表");
  const [creating, setCreating] = useState(false);
  const [kind, setKind] = useState(couponTypes[0]);
  return (
    <div className="dx-page">
      <div className="dx-tabs">
        {["优惠券列表", "创建记录"].map((item) => (
          <button key={item} className={tab === item ? "active" : ""} type="button" onClick={() => { setTab(item); setCreating(false); }}>{item}</button>
        ))}
      </div>
      <QuotaBar />
      {creating ? (
        <div className="dx-card">
          <h3 style={{ marginTop: 0 }}>创建优惠券</h3>
          <div className="dx-filters">
            <span>优惠券类型</span>
            <select className="dx-select" value={kind} onChange={(event) => setKind(event.target.value)}>
              {couponTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="dx-filters">
            <span>优惠券名称</span>
            <input className="dx-input grow" maxLength={10} placeholder="请输入优惠券名称" />
          </div>
          <div className="dx-filters">
            <span>推广方式</span>
            <select className="dx-select"><option>小店内推广</option><option>会员券</option><option>会员开卡礼券</option></select>
          </div>
          <div className="dx-filters">
            <span>优惠规则</span>
            <input className="dx-input" placeholder="满件/满额" style={{ width: 120 }} />
            <input className="dx-input" placeholder="折扣或减免" style={{ width: 120 }} />
          </div>
          <div className="dx-filters">
            <span>发放总量</span>
            <input className="dx-input" defaultValue="1000" style={{ width: 120 }} />
            <span>每人限领</span>
            <input className="dx-input" defaultValue="1" style={{ width: 80 }} />
          </div>
          <button className="dx-btn" type="button" onClick={() => setCreating(false)}>返回列表</button>
          <button className="dx-btn primary" type="button" onClick={() => { toast("优惠券创建成功"); setCreating(false); }}>创建优惠券</button>
        </div>
      ) : null}
      {!creating && tab === "优惠券列表" ? (
        <>
          <div className="dx-card">
            <h3 className="dx-section-title" style={{ marginTop: 0 }}>优惠券数据概览</h3>
            <p className="dx-muted">更新于 --　优惠券数据统计说明</p>
            <div className="dx-filters">
              <input className="dx-input" type="date" defaultValue="2026-10-10" />
              <span>至</span>
              <input className="dx-input" type="date" defaultValue="2026-10-10" />
              <button className="dx-status active" type="button">今天</button>
            </div>
            <div className="dx-stats" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
              {[["发放数(张)", "--"], ["领取数(张)", "--"], ["券领取率", "--"], ["已使用数(张)", "--"], ["券使用率", "--"]].map(([label, value]) => (
                <div key={label} className="dx-stat">
                  <em>{label}</em>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="dx-card">
            <div className="dx-filters">
              <span>券状态：</span>
              <select className="dx-select"><option>全部状态</option><option>编辑中</option><option>已生效</option><option>已过期</option><option>已作废</option><option>已删除</option></select>
              <span>券类型：</span>
              <select className="dx-select"><option>全部类型</option>{couponTypes.map((item) => <option key={item}>{item}</option>)}</select>
              <input className="dx-input grow" placeholder="请输入优惠券名称 / ID" />
              <button className="dx-btn primary" type="button">查找</button>
              <button className="dx-btn" type="button">重置</button>
              <button className="dx-btn" type="button" onClick={() => toast("优惠券同步正在进行，请稍候...")}>同步优惠券</button>
              <button className="dx-btn primary" type="button" onClick={() => setCreating(true)}>创建优惠券</button>
            </div>
            <table className="dx-table">
              <thead>
                <tr>{["优惠券名称", "优惠规则 / 适用范围", "领取时间", "使用有效期", "发放情况", "状态", "操作"].map((head) => <th key={head}>{head}</th>)}</tr>
              </thead>
            </table>
            <Empty text="暂无数据" />
            <Pager total="共 0 张优惠券" />
          </div>
        </>
      ) : null}
      {!creating && tab === "创建记录" ? (
        <div className="dx-card">
          <table className="dx-table">
            <thead>
              <tr>{["创建时间", "优惠券名称", "优惠券类型", "适用范围", "发放总量", "创建结果", "操作"].map((head) => <th key={head}>{head}</th>)}</tr>
            </thead>
          </table>
          <Empty text="暂无数据" />
        </div>
      ) : null}
    </div>
  );
}

export function MultiFieldPage() {
  const { toast } = useToast();
  const groups = [
    { title: "基本信息", items: ["标题", "短标题", "品牌", "商品属性", "货号", "商家编码", "商品文字描述"] },
    { title: "SKU / 价格", items: ["售卖价", "库存", "SKU名称", "SKU规格编码", "商品条形码"] },
    { title: "服务信息", items: ["运费模板", "运费险", "限购设置", "售后说明", "售后地址", "是否预售", "假一赔三", "损坏包退", "先用后付", "商品资质", "支持换货"] },
  ];
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (item: string) => {
    setPicked((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]));
  };
  return (
    <div className="dx-page">
      <PageTabs tabs={[{ href: "/goods-batch", label: "批量修改" }, { href: "/goods-batch-multi-field", label: "综合修改" }]} />
      <QuotaBar />
      <div className="dx-card">
        <div className="dx-status-row">
          <span className="dx-status active">1选择与设置</span>
          <span className="dx-status">2预览商品</span>
          <span className="dx-status">3提交修改</span>
        </div>
        <p>修改范围　当前店铺 · 同时满足以下条件的商品</p>
        <p className="dx-muted">已设置 0 个筛选条件， 共 220 个商品</p>
        <div className="dx-filters">
          <span>商品状态</span>
          <select className="dx-select"><option>全部商品</option><option>销售中</option><option>已下架</option></select>
          <span>商品分类</span>
          <select className="dx-select"><option>请选择类目</option></select>
        </div>
        <h3 className="dx-section-title">修改内容</h3>
        {groups.map((group) => (
          <div key={group.title}>
            <p><b>{group.title}</b></p>
            <div className="dx-provinces">
              {group.items.map((item) => (
                <label className="dx-check" key={item}>
                  <input type="checkbox" checked={picked.includes(item)} onChange={() => toggle(item)} /> {item}
                </label>
              ))}
            </div>
          </div>
        ))}
        <p className="dx-muted">按勾选顺序执行，请在下方填写各项修改内容。</p>
        {picked.map((item) => (
          <div className="dx-filters" key={item}>
            <span>{item}</span>
            <input className="dx-input grow" placeholder={`填写${item}`} />
            <button className="dx-link" type="button" onClick={() => toggle(item)}>移除此项</button>
          </div>
        ))}
        <p>预计修改 220 个商品</p>
        <button className="dx-btn" type="button">返回上一步</button>
        <button className="dx-btn primary" type="button" onClick={() => toast(picked.length ? "请预览修改效果" : "请至少选择一个修改项")}>预览修改效果</button>
      </div>
    </div>
  );
}
