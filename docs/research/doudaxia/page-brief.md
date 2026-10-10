# 抖大侠 wx.51doudaxia.com

源站是 Vue + Ant Design 后台，主色 `#009a54`，顶栏 60px，侧栏 165px 双列菜单，正文字体 Alibaba。默认进入 `/order-list`。

## 路由

| 源路径 | 本地路径 | 页面 |
| --- | --- | --- |
| `/login` `/regist` | 同路径 | 密码/短信登录，注册与找回密码 |
| `/order-home` | 同路径 | 账号概览 |
| `/order-chart` | 同路径 | 数据大屏 |
| `/shop-list` | 同路径 | 店铺绑定 |
| `/purchase-list` | 同路径 | 采购账号 |
| `/goods-score` `/goods-score-log` | 同路径 | 充值算力、消耗明细 |
| `/order-list` | 同路径 | 1688 一键下单 |
| `/order-cloud` `/order-cloud-log` | 同路径 | 自动下单、下单日志 |
| `/order-setting` | 同路径 | 下单设置 |
| `/order-supplier` | 同路径 | 我的供货商 |
| `/order-goods` | 同路径 | 货源关联 |
| `/order-after` | 同路径 | 微店售后 |
| `/order-address` `/order-address-library` | 同路径 | 退货地址、微店地址库 |
| `/order-after-setting` | 同路径 | 自动售后 |
| `/order-sales-rank` `/order-shop-profit` `/order-product-profit` | 同路径 | 利润统计 |
| `/goods-alibaba` | 同路径 | 选品中心（源站为 1688 iframe） |
| `/goods-copy` `/goods-collect` | 同路径 | 链接复制、采集复制 |
| `/goods-auth-copy` 及 source/store | 同路径 | 授权复制三个页签 |
| `/goods-record` `/goods-move-config` | 同路径 | 搬家记录、搬家模版 |
| `/goods-list` `/goods-batch` 及 `goods-batch-*` | 同路径 | 商品列表、批量编辑及各修改项 |
| `/goods-violation` `/goods-review` `/goods-violation-title` | 同路径 | 违规检测、人工鉴图、标题检测 |
| `/goods-limited-discount` | 同路径 | 限时抢购 |
| `/goods-coupon` | 同路径 | 优惠券 |
| `/goods-category-apply` `/goods-category-records` `/goods-category-mine` | 同路径 | 类目申请、申请记录、我的类目 |
| `/goods-batch-multi-field` | 同路径 | 综合修改 |
| `/init` `/lapp` | 同路径 | 客户端/轻应用初始化 |

源站当前侧栏未展示优惠券、类目申请，但 Vue 路由表里有完整页面。本地已把它们挂进菜单，避免漏页。

视频教程、1688 订单、微店订单、服务市场续订仍指向源站外链。
