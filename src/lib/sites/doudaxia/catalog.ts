export type OrderFlag = "buy" | "paid-wait" | "purchased" | "due" | "shipped";

export type ShopOrder = {
  id: string;
  time: string;
  title: string;
  goodsId: string;
  spec: string;
  unit: string;
  qty: number;
  received: string;
  discount?: string;
  shopImg: string;
  sourceTitle?: string;
  seller?: string;
  sellerTag?: string;
  years?: string;
  sourceSpec?: string;
  sourceUnit?: string;
  sourceQty?: number;
  estimate?: string;
  paid?: string;
  freight?: string;
  purchaseNo?: string;
  sourceImg?: string;
  unlinked?: boolean;
  wxStatus: string;
  buyStatus: string;
  logistics: string;
  account: string;
  countdown?: [string, string, string];
  urge?: boolean;
  merge?: boolean;
  manual?: boolean;
  address: string;
  decrypted?: boolean;
  total: string;
  flag: OrderFlag;
  remark?: string;
};

const img = (name: string) => `/sites/doudaxia/products/${name}`;

export const orders: ShopOrder[] = [
  {
    id: "3739745348305991424",
    time: "2026-10-10 12:29:13",
    title: "胖东来代购钓鱼小黄粉野钓小药高浓度诱鱼原粉饵料添加剂水产生物信息素",
    goodsId: "10001675775881",
    spec: "小黄粉40g",
    unit: "¥8.50",
    qty: 1,
    received: "¥2.55",
    shopImg: img("p1-shop.jpg"),
    sourceTitle: "钓鱼小黄粉野钓小药高浓度诱鱼原粉饵料添加剂水产生物信息素",
    seller: "国之良渔具批发城",
    sellerTag: "实力",
    years: "5年",
    sourceSpec: "小黄粉40g",
    sourceUnit: "¥8.50",
    sourceQty: 1,
    estimate: "¥8.50",
    sourceImg: img("p1-src.jpg"),
    wxStatus: "待发货",
    buyStatus: "待采购",
    logistics: "-",
    account: "-",
    countdown: ["01", "23", "49"],
    merge: true,
    manual: true,
    address: "辉*, 1**********, 广东省 惠州市 惠城区 ****",
    total: "¥2.55",
    flag: "buy",
  },
  {
    id: "3739744171868998912",
    time: "2026-10-10 11:14:36",
    title: "胖东来代购西部风老坛蜂蜜谷麦野钓鲫鱼逗钓打窝料甜香味老坛玉米走钓打窝料",
    goodsId: "10001675691340",
    spec: "蜂蜜谷麦红400g",
    unit: "¥9.40",
    qty: 3,
    received: "¥8.46",
    shopImg: img("p2-shop.jpg"),
    sourceTitle: "西部风老坛蜂蜜谷麦野钓鲫鱼逗钓打窝料甜香味老坛玉米走钓打窝料",
    seller: "鑫凯隆渔具",
    sellerTag: "商行",
    years: "1年",
    sourceSpec: "蜂蜜谷麦红400g",
    sourceUnit: "¥9.40",
    sourceQty: 1,
    estimate: "¥9.40",
    sourceImg: img("p2-src.jpg"),
    wxStatus: "待发货",
    buyStatus: "待采购",
    logistics: "-",
    account: "-",
    countdown: ["01", "22", "34"],
    manual: true,
    address: "沈**, 1**********, 四川省 成都市 新都区 ****",
    total: "¥8.46",
    flag: "buy",
  },
  {
    id: "3739743743371001856",
    time: "2026-10-10 10:47:57",
    title: "胖东来代购化氏不空军钓鱼饵料深海元素大红鲫鲫鱼鲤鱼野钓通杀鱼饵窝料",
    goodsId: "10001669887803",
    spec: "一款不空军腥香300克",
    unit: "¥12.80",
    qty: 1,
    received: "¥3.84",
    shopImg: img("p3-shop.jpg"),
    sourceTitle: "化氏不空军钓鱼饵料深海元素大红鲫鲫鱼鲤鱼野钓通杀鱼饵窝料批发",
    seller: "鑫凯隆渔具",
    sellerTag: "商行",
    years: "1年",
    sourceSpec: "一款不空军腥香300克",
    sourceUnit: "¥25.60",
    sourceQty: 2,
    estimate: "¥25.60",
    sourceImg: img("p3-src.jpg"),
    wxStatus: "待发货",
    buyStatus: "待采购",
    logistics: "-",
    account: "-",
    countdown: ["01", "22", "08"],
    merge: true,
    manual: true,
    address: "陈**, 1**********, 湖北省 武汉市 汉阳区 ****",
    total: "¥3.84",
    flag: "buy",
  },
  {
    id: "3739740669507420160",
    time: "2026-10-10 07:31:55",
    title: "胖东来代购武汉天元新红虫风暴400g鲫鲤草鳊鱼综合饵四季野钓钓鱼鱼饵饵料",
    goodsId: "10001670375925",
    spec: "天元大鲫终结者",
    unit: "¥22.30",
    qty: 1,
    received: "¥3.69",
    discount: "平台优惠：¥3.00",
    shopImg: img("p4-shop.jpg"),
    sourceTitle: "武汉天元新红虫风暴400g鲫鲤草鳊鱼综合饵四季野钓钓鱼鱼饵饵料",
    seller: "youyuchi666",
    sellerTag: "实力",
    years: "2年",
    sourceSpec: "天元大鲫终结者",
    sourceUnit: "¥22.30",
    sourceQty: 1,
    estimate: "¥22.30",
    sourceImg: img("p4-src.jpg"),
    wxStatus: "待发货",
    buyStatus: "待采购",
    logistics: "-",
    account: "-",
    countdown: ["01", "18", "51"],
    merge: true,
    manual: true,
    address: "辉*, 1**********, 广东省 惠州市 惠城区 ****",
    total: "¥3.69",
    flag: "buy",
  },
  {
    id: "3739728870759904000",
    time: "2026-10-09 19:02:15",
    title: "胖东来代购【鱼千里】蚯蚓液钓鱼小药鲤鲫淡水鱼饵料窝料添加剂诱食剂开口剂",
    goodsId: "10001674236865",
    spec: "1瓶",
    unit: "¥7.44",
    qty: 2,
    received: "¥4.46",
    shopImg: img("p5-shop.jpg"),
    unlinked: true,
    wxStatus: "待发货",
    buyStatus: "待采购",
    logistics: "-",
    account: "-",
    countdown: ["01", "06", "22"],
    merge: true,
    manual: true,
    address: "陈**, 1**********, 湖北省 武汉市 汉阳区 ****",
    total: "¥4.46",
    flag: "buy",
  },
  {
    id: "3739724894950267392",
    time: "2026-10-09 14:49:05",
    title: "胖东来代购武汉天元新红虫风暴400g鲫鲤草鳊鱼综合饵四季野钓钓鱼鱼饵饵料",
    goodsId: "10001670375925",
    spec: "天元红虫风暴",
    unit: "¥26.10",
    qty: 1,
    received: "¥4.83",
    discount: "平台优惠：¥3.00",
    shopImg: img("p6-shop.jpg"),
    sourceTitle: "武汉天元新红虫风暴400g鲫鲤草鳊鱼综合饵四季野钓钓鱼鱼饵饵料",
    seller: "youyuchi666",
    sellerTag: "实力",
    years: "2年",
    sourceSpec: "天元红虫风暴",
    sourceUnit: "¥11.30",
    sourceQty: 1,
    paid: "¥8.80",
    freight: "¥2.50",
    purchaseNo: "3316497098002141673",
    sourceImg: img("p4-src.jpg"),
    wxStatus: "待发货",
    buyStatus: "待发货",
    logistics: "厂家未发货",
    account: "tb332640402013",
    countdown: ["01", "02", "09"],
    urge: true,
    remark: "手动采购，待发货",
    decrypted: true,
    address: "184****9492, 天天, 湖北省 恩施土家族苗族自治州 恩施市 ****",
    total: "¥4.83",
    flag: "purchased",
  },
  {
    id: "3739717078140503808",
    time: "2026-10-09 06:31:54",
    title: "胖东来代购化氏不空军钓鱼饵料深海元素大红鲫鲫鱼鲤鱼野钓通杀鱼饵窝料",
    goodsId: "10001669887803",
    spec: "昆虫元素260克",
    unit: "¥16.00",
    qty: 1,
    received: "¥0.01",
    discount: "平台优惠：¥4.79",
    shopImg: img("p7-shop.jpg"),
    sourceTitle: "化氏不空军钓鱼饵料深海元素大红鲫鲫鱼鲤鱼野钓通杀鱼饵窝料批发",
    seller: "鑫凯隆渔具",
    sellerTag: "商行",
    years: "1年",
    sourceSpec: "昆虫元素260克",
    sourceUnit: "¥6.50",
    sourceQty: 1,
    paid: "¥8.30",
    freight: "¥1.80",
    purchaseNo: "3316932373001005280",
    sourceImg: img("p3-src.jpg"),
    wxStatus: "已发货",
    buyStatus: "已发货",
    logistics: "韵达快递 已揽收",
    account: "tb332640402013",
    remark: "手动采购，已发货",
    decrypted: true,
    address: "184****1265, 盛, 浙江省 绍兴市 新昌县 ****",
    total: "¥0.01",
    flag: "shipped",
  },
  {
    id: "3739709323328013312",
    time: "2026-10-08 22:19:09",
    title: "胖东来代购武汉天元新红虫风暴400g鲫鲤草鳊鱼综合饵四季野钓钓鱼鱼饵饵料",
    goodsId: "10001670375925",
    spec: "天元红虫风暴",
    unit: "¥26.10",
    qty: 1,
    received: "¥7.83",
    shopImg: img("p6-shop.jpg"),
    sourceTitle: "武汉天元新红虫风暴400g鲫鲤草鳊鱼综合饵四季野钓钓鱼鱼饵饵料",
    seller: "youyuchi666",
    sellerTag: "实力",
    years: "2年",
    sourceSpec: "天元红虫风暴",
    sourceUnit: "¥11.30",
    sourceQty: 1,
    paid: "¥13.80",
    freight: "¥2.50",
    purchaseNo: "3316928413001014462",
    sourceImg: img("p4-src.jpg"),
    wxStatus: "待发货",
    buyStatus: "待发货",
    logistics: "厂家未发货",
    account: "tb332640402013",
    countdown: ["00", "09", "39"],
    urge: true,
    remark: "手动采购，待发货",
    decrypted: true,
    address: "134****5855, 徐先生, 江苏省 无锡市 新吴区 ****",
    total: "¥7.83",
    flag: "due",
  },
];

export const rankGoods = [
  { title: orders[1].title, sales: 3, img: orders[1].shopImg },
  { title: orders[3].title, sales: 1, img: orders[3].shopImg },
  { title: orders[2].title, sales: 1, img: orders[2].shopImg },
  { title: orders[0].title, sales: 1, img: orders[0].shopImg },
];

export const suppliers = [
  { name: "义乌市然简日用品有限公司", tag: "公司", years: "1年", id: "wxff4da6d44bc33263", status: "待确认", audit: "初始状态", time: "2026-10-09 17:57:13" },
];

export const addresses = [
  { name: "深圳天雅优品", tag: "公司", years: "4年", count: 873, address: "未关联退货地址", time: "-" },
  { name: "义乌市品言日用品有限公司", tag: "超级", years: "6年", count: 38, address: "未关联退货地址", time: "-" },
  { name: "么么777888", tag: "公司", years: "7年", count: 1, address: "周亮, 158****5968, 四川省 资阳市 雁江区 ****", time: "2026-10-09 16:55:13" },
  { name: "盛佑日用品", tag: "实力", years: "4年", count: 88, address: "戴先生, 184****5000, 浙江省 金华市 东阳市 ****", time: "2026-10-09 16:55:09" },
  { name: "湖北厚道渔需用品有限公司", tag: "实力", years: "5年", count: 130, address: "马国华, 135****4673, 湖北省 仙桃市 ****", time: "2026-10-09 16:55:06" },
  { name: "国之良渔具批发城", tag: "实力", years: "5年", count: 637, address: "龚玉娇, 173****2570, 江苏省 徐州市 睢宁县 ****", time: "2026-10-09 09:05:10" },
  { name: "鑫凯隆渔具", tag: "商行", years: "1年", count: 42, address: "未关联退货地址", time: "-" },
  { name: "youyuchi666", tag: "实力", years: "2年", count: 18, address: "未关联退货地址", time: "-" },
];

export type GoodsItem = {
  id: string;
  title: string;
  price: string;
  stock: string;
  status: string;
  category: string;
  img: string;
  updated: string;
  linked?: string;
  sku?: string;
};

export const goods: GoodsItem[] = [
  { id: "10001675547501", title: "胖东来代购便携强力宽口单钩三字夹多功能防滑收纳衣裤整理家用零食密封口夹", price: "¥6.10", stock: "966511", status: "回收站", category: "家居日用 > 生活日用 > 洗晒/熨烫/护理用具 > 夹子", img: img("p5-shop.jpg"), updated: "2026-10-10 05:14:58" },
  { id: "10001675846587", title: "胖东来代购创意强力挂钩免打孔可拆卸无痕粘胶贴卫生间墙壁耐用门后毛巾粘钩", price: "¥6.32", stock: "3999647", status: "回收站", category: "家居日用 > 生活日用 > 挂钩/粘钩", img: img("p2-shop.jpg"), updated: "2026-10-10 05:14:58" },
  { id: "10001676239325", title: "胖东来代购尿壶老人夜壶卧床室男用小便器接尿器盖儿童便盆家用带盖大容量", price: "¥8.80 ~ 19.20", stock: "17124", status: "回收站", category: "家居日用 > 生活日用 > 浴室用品 > 痰盂", img: img("p7-shop.jpg"), updated: "2026-10-10 05:14:59" },
  { id: "10001676140023", title: "胖东来代购旅行内衣收纳袋家用文胸内裤袜子收纳包手提便携行李箱分装整理包", price: "¥4.30", stock: "2998440", status: "销售中", category: "家居日用 > 收纳用品 > 收纳袋/包", img: img("p5-shop.jpg"), updated: "2026-10-10 05:14:50", linked: "已匹配 3/3", sku: "100%" },
  { id: "10001676040143", title: "胖东来代购防水加厚卡通坐便垫四季通用夏季坐垫EVA粘贴式卫生间坐便马桶垫", price: "¥7.10", stock: "13139", status: "销售中", category: "家居日用 > 生活日用 > 浴室用品 > 马桶套/马桶座圈", img: img("p2-shop.jpg"), updated: "2026-10-10 05:14:51", linked: "未关联", sku: "100%" },
  { id: "10001676199719", title: "胖东来代购厨房强力去污带手柄海绵底清洁刷 浴室浴缸洗锅刷瓷砖擦海绵擦", price: "¥6.74", stock: "2495693", status: "销售中", category: "家庭清洁/纸品 > 清洁用具 > 海绵擦", img: img("p3-shop.jpg"), updated: "2026-10-10 05:14:51", linked: "已关联", sku: "100%" },
  { id: "10001675851406", title: "胖东来代购门后免打孔衣服挂钩贴强力墙面墙壁进门玄关无痕挂衣钩免钉衣帽钩", price: "¥8.70", stock: "2499770", status: "销售中", category: "家居日用 > 生活日用 > 挂钩/粘钩", img: img("p1-shop.jpg"), updated: "2026-10-10 05:14:50", linked: "已关联", sku: "100%" },
  { id: "10001676035262", title: "胖东来代购不锈钢挖耳勺六件套 便携皮套采耳工具套装", price: "¥4.30", stock: "122147", status: "销售中", category: "个人护理 > 身体护理 > 护理工具 > 挖耳勺", img: img("p4-shop.jpg"), updated: "2026-10-10 05:14:50", linked: "未关联", sku: "100%" },
  { id: "10001676368335", title: "胖东来代购被子固定器被套床单拇指扣隐形无针固定器被罩棉被四角卡扣夹", price: "¥4.16", stock: "19999732", status: "销售中", category: "家居日用 > 生活日用 > 洗晒/熨烫/护理用具 > 夹子", img: img("p6-shop.jpg"), updated: "2026-10-10 05:14:51", linked: "未关联货源", sku: "0%" },
];

export const moveRecords = [
  { source: "旅行内衣收纳袋家用文胸内裤袜子收纳包手提便携行李箱分装整理包", seller: "义乌市然简日用品有限公司", sourceId: "975289038619", sourcePrice: "¥0.65", title: goods[3].title, price: "¥4.30", category: "家居日用/收纳用品/收纳袋/包", time: "2026-10-09 16:28:20", wxId: "10001676140023", img: img("p5-shop.jpg") },
  { source: "防水加厚卡通坐便垫四季通用夏季坐垫EVA粘贴式卫生间坐便马桶垫", seller: "义乌市诺昇贸易有限公司", sourceId: "934486101492", sourcePrice: "¥2.30", title: goods[4].title, price: "¥7.10", category: "家居日用/生活日用/浴室用品/马桶套/马桶座圈", time: "2026-10-09 16:28:20", wxId: "10001676040143", img: img("p2-shop.jpg") },
  { source: "厨房强力去污带手柄海绵底清洁刷 浴室浴缸洗锅刷瓷砖擦海绵擦", seller: "sijiake1", sourceId: "628744581769", sourcePrice: "¥1.37", title: goods[5].title, price: "¥6.74", category: "家庭清洁/纸品/清洁用具/海绵擦", time: "2026-10-09 16:28:16", wxId: "10001676199719", img: img("p3-shop.jpg") },
  { source: "门后免打孔衣服挂钩贴强力墙面墙壁进门玄关无痕挂衣钩免钉衣帽钩", seller: "xueshi001", sourceId: "695232167389", sourcePrice: "¥0.35", title: goods[6].title, price: "¥8.70", category: "家居日用/生活日用/挂钩/粘钩", time: "2026-10-09 16:28:16", wxId: "10001675851406", img: img("p1-shop.jpg") },
];

export const scoreLogs = [
  { type: "后台赠送算力", count: 1, price: "-", used: "+1200", left: 1300, time: "2026-10-08 16:59:32", note: "付费版赠送算力" },
  { type: "后台赠送算力", count: 1, price: "-", used: "+100", left: 100, time: "2026-10-07 09:19:03", note: "试用版赠送算力" },
];

export const packages = [
  { price: 10, quota: 1200, unit: "0.0083", off: "8.33折", gift: 200 },
  { price: 20, quota: 2500, unit: "0.008", off: "8折", gift: 500 },
  { price: 30, quota: 4000, unit: "0.0075", off: "7.50折", gift: 1000 },
  { price: 50, quota: 8000, unit: "0.0063", off: "6.25折", gift: 3000 },
  { price: 100, quota: 20000, unit: "0.005", off: "5折", gift: 10000 },
  { price: 200, quota: 50000, unit: "0.004", off: "4折", gift: 30000 },
  { price: 300, quota: 80000, unit: "0.0037", off: "3.75折", gift: 50000 },
  { price: 500, quota: 150000, unit: "0.0033", off: "3.33折", gift: 100000 },
];

export const scoreRules = [
  ["链接复制", "1算力"],
  ["搜索复制", "1算力"],
  ["授权复制", "1算力"],
  ["裂变复制", "1算力"],
  ["AI生成标题", "1算力"],
  ["AI生成短标题", "1算力"],
  ["AI换图", "1算力"],
  ["AI白底图", "1算力"],
  ["智能白底图", "2算力"],
  ["智能修复", "5算力"],
  ["AI违规检测", "1算力"],
];

export const afterReasons = [
  ["其他", 2], ["缺货", 5], ["退运费", 1], ["假冒品牌", 12], ["不想要了", 1], ["少件/漏发", 1],
  ["商家发错货", 2], ["商家发货慢", 1], ["尺码不合适", 4], ["商品质量问题", 76], ["包装/商品破损", 81],
  ["商品与描述不符", 4], ["商品功能有问题", 284], ["不喜欢/效果不好", 21], ["多拍/错拍/不想要", 3],
  ["大小/颜色/型号不符", 174], ["买错规格/款式/颜色", 33], ["与商家协商一致退款", 6],
];

export const categoryRoots = [
  ["个人护理", 6], ["农资园艺", 7], ["厨具", 8], ["宠物生活", 9], ["家具", 17],
  ["家居日用", 3], ["家庭清洁/纸品", 5], ["家用电器", 8], ["家纺", 2], ["家装建材", 8],
  ["工业品", 7], ["手机通讯", 2], ["数码", 5], ["服饰内衣", 5], ["母婴", 9],
  ["汽摩电动", 7], ["玩具乐器", 21], ["生鲜", 2], ["电脑、办公", 8], ["箱包皮具", 4],
  ["美妆护肤", 4], ["运动户外", 20], ["钟表", 1], ["鞋靴", 3], ["图书", 1],
  ["珠宝首饰", 16], ["文玩文创", 20], ["成人用品", 1],
] as const;

export const myCategories = [
  { name: "马桶套/马桶座圈", id: "547533", path: "家居日用 > 生活日用 > 浴室用品 > 马桶套/马桶座圈", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:16" },
  { name: "海绵擦", id: "547133", path: "家庭清洁/纸品 > 清洁用具 > 海绵擦", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:13" },
  { name: "浴刷/搓澡刷", id: "547553", path: "家居日用 > 生活日用 > 浴室用品 > 浴刷/搓澡刷", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:11" },
  { name: "挖耳勺", id: "547333", path: "个人护理 > 身体护理 > 护理工具 > 挖耳勺", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:07" },
  { name: "夹子", id: "547294", path: "家居日用 > 生活日用 > 洗晒/熨烫/护理用具 > 夹子", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:05" },
  { name: "清洁刷具", id: "1470", path: "家庭清洁/纸品 > 清洁用具 > 清洁刷具", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:03" },
  { name: "除尘掸/掸头/除尘刷", id: "547135", path: "家庭清洁/纸品 > 清洁用具 > 除尘掸/掸头/除尘刷", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:28:01" },
  { name: "搓澡巾/搓澡海绵/沐浴球", id: "547554", path: "家居日用 > 生活日用 > 浴室用品 > 搓澡巾/搓澡海绵/沐浴球", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:27:59" },
  { name: "痰盂", id: "547520", path: "家居日用 > 生活日用 > 浴室用品 > 痰盂", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:27:57" },
  { name: "挂钩/粘钩", id: "545294", path: "家居日用 > 生活日用 > 挂钩/粘钩", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:27:52" },
  { name: "马桶刷/厕所刷", id: "547532", path: "家居日用 > 生活日用 > 浴室用品 > 马桶刷/厕所刷", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:18:12" },
  { name: "钢丝球", id: "547134", path: "家庭清洁/纸品 > 清洁用具 > 钢丝球", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:18:03" },
  { name: "收纳箱", id: "1440", path: "家居日用 > 收纳用品 > 收纳箱", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:18:02" },
  { name: "淋浴花洒", id: "1738", path: "家装建材 > 厨房卫浴 > 淋浴花洒", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:17:58" },
  { name: "卷纸器/纸巾架", id: "547527", path: "家居日用 > 生活日用 > 浴室用品 > 卷纸器/纸巾架", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:17:57" },
  { name: "刮毛刀/手动剃须刀", id: "547332", path: "个人护理 > 身体护理 > 脱毛工具 > 刮毛刀/手动剃须刀", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:17:55" },
  { name: "皂盒/皂架", id: "547521", path: "家居日用 > 生活日用 > 浴室用品 > 皂盒/皂架", deposit: "¥1000.00", status: "生效中", time: "2026-10-09 16:17:52" },
];

export const couponTypes = [
  "商品满件折扣券", "商品满额减免券", "商品折扣券", "商品直减券",
  "店铺满件折扣券", "店铺满额减免券", "店铺折扣券", "店铺直减券",
];

export const AUTH_KEY = "ddx-auth";
