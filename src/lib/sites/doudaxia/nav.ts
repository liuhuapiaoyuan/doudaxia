export type NavItem = {
  href: string;
  label: string;
  badge?: "new";
};

export type NavGroup = {
  title: string;
  icon: "account" | "order" | "after" | "chart" | "move" | "goods" | "coupon";
  items: NavItem[];
};

export const menu: NavGroup[] = [
  {
    title: "我的账户",
    icon: "account",
    items: [
      { href: "/order-home", label: "账号概览" },
      { href: "/order-chart", label: "数据大屏" },
      { href: "/shop-list", label: "店铺绑定" },
      { href: "/purchase-list", label: "采购账号" },
      { href: "/goods-score", label: "充值算力" },
      { href: "/goods-score-log", label: "算力消耗" },
    ],
  },
  {
    title: "订单管理",
    icon: "order",
    items: [
      { href: "/order-list", label: "一键下单" },
      { href: "/order-cloud", label: "自动下单" },
      { href: "/order-setting", label: "下单设置" },
      { href: "/order-supplier", label: "我的供货商" },
      { href: "/order-goods", label: "货源关联" },
    ],
  },
  {
    title: "售后管理",
    icon: "after",
    items: [
      { href: "/order-after", label: "微店售后" },
      { href: "/order-address", label: "退货地址" },
      { href: "/order-after-setting", label: "自动售后", badge: "new" },
    ],
  },
  {
    title: "利润统计",
    icon: "chart",
    items: [
      { href: "/order-sales-rank", label: "销售排行" },
      { href: "/order-shop-profit", label: "店铺统计" },
      { href: "/order-product-profit", label: "商品统计" },
    ],
  },
  {
    title: "搬家上货",
    icon: "move",
    items: [
      { href: "/goods-alibaba", label: "选品中心" },
      { href: "/goods-copy", label: "链接复制" },
      { href: "/goods-collect", label: "采集复制" },
      { href: "/goods-auth-copy", label: "授权复制" },
      { href: "/goods-record", label: "搬家记录" },
      { href: "/goods-move-config", label: "搬家模版" },
    ],
  },
  {
    title: "商品管理",
    icon: "goods",
    items: [
      { href: "/goods-list", label: "商品列表" },
      { href: "/goods-batch", label: "批量编辑" },
      { href: "/goods-category-apply", label: "类目申请" },
      { href: "/goods-violation", label: "违规检测" },
      { href: "/goods-review", label: "人工鉴图" },
      { href: "/goods-violation-title", label: "标题检测" },
    ],
  },
  {
    title: "营销",
    icon: "coupon",
    items: [
      { href: "/goods-limited-discount", label: "限时抢购" },
      { href: "/goods-coupon", label: "优惠券" },
    ],
  },
];

export const pageTitles: Record<string, string> = {
  "order-home": "账号概览",
  "order-chart": "数据大屏",
  "shop-list": "店铺绑定",
  "purchase-list": "采购账号",
  "goods-score": "充值算力",
  "goods-score-log": "算力消耗",
  "order-list": "一键下单",
  "order-cloud": "自动下单",
  "order-cloud-log": "下单日志",
  "order-setting": "下单设置",
  "order-supplier": "我的供货商",
  "order-goods": "货源关联",
  "order-after": "微店售后",
  "order-address": "退货地址",
  "order-address-library": "微店地址库",
  "order-after-setting": "自动售后",
  "order-sales-rank": "销售排行",
  "order-shop-profit": "店铺统计",
  "order-product-profit": "商品统计",
  "goods-alibaba": "选品中心",
  "goods-copy": "链接复制",
  "goods-collect": "采集复制",
  "goods-auth-copy": "授权复制",
  "goods-auth-copy-source": "我授权给他人",
  "goods-auth-copy-store": "我有多店互搬",
  "goods-record": "搬家记录",
  "goods-move-config": "搬家模版",
  "goods-list": "商品列表",
  "goods-batch": "批量编辑",
  "goods-batch-records": "批量修改记录",
  "goods-batch-multi-field": "综合修改",
  "goods-category-apply": "类目申请",
  "goods-category-records": "申请记录",
  "goods-category-mine": "我的类目",
  "goods-coupon": "优惠券",
  "goods-violation": "违规检测",
  "goods-review": "人工鉴图",
  "goods-violation-title": "标题检测",
  "goods-limited-discount": "限时抢购",
  login: "登录",
  regist: "注册",
  init: "客户端初始化",
  lapp: "轻应用初始化",
};

export type BatchTool = {
  href: string;
  title: string;
  desc: string;
  group: string;
  hot?: boolean;
};

export const batchTools: BatchTool[] = [
  { href: "/goods-batch-product-status", title: "上下架", desc: "立即或预约批量上架、下架商品", group: "常用修改", hot: true },
  { href: "/goods-batch-title", title: "标题", desc: "替换、增删关键词，统一调整商品标题", group: "常用修改", hot: true },
  { href: "/goods-batch-price", title: "售卖价", desc: "按公式、区间等规则调整各规格售价", group: "常用修改", hot: true },
  { href: "/goods-batch-delete", title: "删除商品", desc: "按范围删除商品，可跳过在售商品", group: "常用修改", hot: true },
  { href: "/goods-batch-freight-insurance", title: "运费险", desc: "设置商品运费险服务", group: "常用修改", hot: true },
  { href: "/goods-batch-multi-field", title: "综合修改", desc: "一次勾选多个字段，按顺序批量修改商品", group: "常用修改", hot: true },
  { href: "/goods-batch-title", title: "标题", desc: "替换、增删关键词，统一调整商品标题", group: "修改基础信息" },
  { href: "/goods-batch-short-title", title: "短标题", desc: "设置、替换或清空商品短标题", group: "修改基础信息" },
  { href: "/goods-batch-brand", title: "品牌", desc: "设置授权品牌或清空品牌信息", group: "修改基础信息" },
  { href: "/goods-batch-attrs", title: "商品属性", desc: "按类目修改商品的标准与自定义属性", group: "修改基础信息" },
  { href: "/goods-batch-across-cate-attr", title: "跨类目商品属性", desc: "按属性名称统一设置、替换或删除", group: "修改基础信息" },
  { href: "/goods-batch-item-num", title: "货号", desc: "调整商品货号属性", group: "修改基础信息" },
  { href: "/goods-batch-delete", title: "删除商品", desc: "按范围删除商品，可跳过在售商品", group: "修改基础信息" },
  { href: "/goods-batch-product-status", title: "上下架", desc: "立即或预约批量上架、下架商品", group: "修改基础信息" },
  { href: "/goods-batch-timer-product-status", title: "定时上下架", desc: "统一时间、平均分配或间隔安排上下架", group: "修改基础信息" },
  { href: "/goods-batch-spu-code", title: "商家编码（自定义）", desc: "使用模板、来源信息或规则生成商家编码", group: "修改基础信息" },
  { href: "/goods-batch-description-text", title: "商品文字描述", desc: "统一调整商品详情中的文字", group: "修改基础信息" },
  { href: "/goods-batch-category", title: "类目", desc: "设置目标商品类目和对应属性", group: "修改基础信息" },
  { href: "/goods-batch-timing-onsale", title: "定时开售", desc: "设置微信定时开售时间和价格展示", group: "修改基础信息" },
  { href: "/goods-batch-hide-in-window", title: "隐藏商品", desc: "设置或取消在售商品的橱窗隐藏", group: "修改基础信息" },
  { href: "/goods-batch-price", title: "售卖价", desc: "按公式、区间等规则调整各规格售价", group: "修改图文价格库存" },
  { href: "/goods-batch-stock", title: "库存", desc: "设置、增加或减少各规格可售数量", group: "修改图文价格库存" },
  { href: "/goods-batch-sku-attrs", title: "SKU 名称", desc: "调整商品的规格名称与规格值", group: "修改图文价格库存" },
  { href: "/goods-batch-sku-code", title: "SKU 规格编码", desc: "按模板或规则调整各规格编码", group: "修改图文价格库存" },
  { href: "/goods-batch-sku-add", title: "增加 SKU", desc: "新增或复制规格并设置价格库存", group: "修改图文价格库存" },
  { href: "/goods-batch-sku-delete", title: "删除 SKU", desc: "按规格、价格、库存等条件删除规格", group: "修改图文价格库存" },
  { href: "/goods-batch-head-imgs", title: "主图", desc: "排序、替换、增加或删除商品主图", group: "修改图文价格库存" },
  { href: "/goods-batch-sku-image", title: "SKU 图", desc: "补全、替换或删除商品规格图", group: "修改图文价格库存" },
  { href: "/goods-batch-head-imgs-fill", title: "主图补全", desc: "使用规格图、详情图等补齐主图", group: "修改图文价格库存" },
  { href: "/goods-batch-desc-imgs", title: "详情图", desc: "调整商品详情图片和排列顺序", group: "修改图文价格库存" },
  { href: "/goods-batch-bar-code", title: "商品条形码", desc: "为各规格设置或清空条形码", group: "修改图文价格库存" },
  { href: "/goods-batch-main-video", title: "主图视频", desc: "指定视频或使用多张主图自动生成视频", group: "修改图文价格库存" },
  { href: "/goods-batch-white-bg-imgs", title: "白底图", desc: "指定图片或从普通主图生成白底图", group: "修改图文价格库存" },
  { href: "/goods-batch-vertical-head-imgs", title: "3:4 主图", desc: "指定图片或将普通主图裁切、填充为3:4主图", group: "修改图文价格库存" },
  { href: "/goods-batch-freight-template", title: "运费模板", desc: "调整配送方式和运费模板", group: "修改服务信息" },
  { href: "/goods-batch-freight-insurance", title: "运费险", desc: "设置商品运费险服务", group: "修改服务信息" },
  { href: "/goods-batch-purchase-limit", title: "限购设置", desc: "设置每人限购周期与数量", group: "修改服务信息" },
  { href: "/goods-batch-aftersale-desc", title: "售后说明", desc: "统一修改商品售后说明文字", group: "修改服务信息" },
  { href: "/goods-batch-after-sale-address", title: "售后地址", desc: "设置当前店铺的商品售后地址", group: "修改服务信息" },
  { href: "/goods-batch-presale", title: "是否预售", desc: "设置现货、商品预售或规格预售", group: "修改服务信息" },
  { href: "/goods-batch-fake-one-pay-three", title: "假一赔三", desc: "设置商品假一赔三服务", group: "修改服务信息" },
  { href: "/goods-batch-damage-guarantee", title: "损坏包退", desc: "设置商品损坏包退服务", group: "修改服务信息" },
  { href: "/goods-batch-pay-after-use", title: "先用后付", desc: "设置已开通的先用后付服务", group: "修改服务信息" },
  { href: "/goods-batch-product-qualifications", title: "商品资质", desc: "增加、替换或删除商品资质图片", group: "修改服务信息" },
  { href: "/goods-batch-product-label-graph", title: "标签图", desc: "调整类目要求的商品标签图", group: "修改服务信息" },
  { href: "/goods-batch-exchange-support", title: "支持换货", desc: "设置商品换货服务", group: "修改服务信息" },
  { href: "/goods-batch-seven-day-return", title: "七天无理由退货", desc: "设置商品七天无理由退货服务", group: "修改服务信息" },
];

export const provinces = [
  "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省",
  "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省",
  "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省",
  "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区",
];
