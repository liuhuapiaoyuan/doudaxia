"use client";

import { useEffect, type ReactNode } from "react";
import { batchTools, pageTitles } from "@/lib/sites/doudaxia/nav";
import { HomePage, PurchasePage, ScoreLogPage, ScorePage, ShopListPage } from "@/components/sites/doudaxia/account-pages";
import { ChartPage } from "@/components/sites/doudaxia/chart-page";
import {
  AlibabaPage,
  AuthCopyPage,
  AuthSourcePage,
  AuthStorePage,
  BatchPage,
  BatchRecordsPage,
  BatchToolPage,
  CategoryApplyPage,
  CategoryMinePage,
  CategoryRecordsPage,
  CollectPage,
  CopyPage,
  CouponPage,
  DiscountPage,
  MultiFieldPage,
  GoodsLinkPage,
  GoodsListPage,
  MoveConfigPage,
  RecordPage,
  ReviewPage,
  TitleCheckPage,
  ViolationPage,
} from "@/components/sites/doudaxia/goods-pages";
import {
  AddressLibraryPage,
  AddressPage,
  AfterPage,
  AfterSettingPage,
  OrderCloudLogPage,
  OrderCloudPage,
  OrderListPage,
  OrderSettingPage,
  ProductProfitPage,
  SalesRankPage,
  ShopProfitPage,
  SupplierPage,
} from "@/components/sites/doudaxia/order-pages";

const pages: Record<string, () => ReactNode> = {
  "order-home": () => <HomePage />,
  "order-chart": () => <ChartPage />,
  "shop-list": () => <ShopListPage />,
  "purchase-list": () => <PurchasePage />,
  "goods-score": () => <ScorePage />,
  "goods-score-log": () => <ScoreLogPage />,
  "order-list": () => <OrderListPage />,
  "order-cloud": () => <OrderCloudPage />,
  "order-cloud-log": () => <OrderCloudLogPage />,
  "order-setting": () => <OrderSettingPage />,
  "order-supplier": () => <SupplierPage />,
  "order-goods": () => <GoodsLinkPage />,
  "order-after": () => <AfterPage />,
  "order-address": () => <AddressPage />,
  "order-address-library": () => <AddressLibraryPage />,
  "order-after-setting": () => <AfterSettingPage />,
  "order-sales-rank": () => <SalesRankPage />,
  "order-shop-profit": () => <ShopProfitPage />,
  "order-product-profit": () => <ProductProfitPage />,
  "goods-alibaba": () => <AlibabaPage />,
  "goods-copy": () => <CopyPage />,
  "goods-collect": () => <CollectPage />,
  "goods-auth-copy": () => <AuthCopyPage />,
  "goods-auth-copy-source": () => <AuthSourcePage />,
  "goods-auth-copy-store": () => <AuthStorePage />,
  "goods-record": () => <RecordPage />,
  "goods-move-config": () => <MoveConfigPage />,
  "goods-list": () => <GoodsListPage />,
  "goods-batch": () => <BatchPage />,
  "goods-batch-records": () => <BatchRecordsPage />,
  "goods-batch-multi-field": () => <MultiFieldPage />,
  "goods-category-apply": () => <CategoryApplyPage />,
  "goods-category-records": () => <CategoryRecordsPage />,
  "goods-category-mine": () => <CategoryMinePage />,
  "goods-coupon": () => <CouponPage />,
  "goods-violation": () => <ViolationPage />,
  "goods-review": () => <ReviewPage />,
  "goods-violation-title": () => <TitleCheckPage />,
  "goods-limited-discount": () => <DiscountPage />,
};

export function ConsoleView({ slug }: { slug: string }) {
  useEffect(() => {
    const title = pageTitles[slug] || batchTools.find((tool) => tool.href === `/${slug}`)?.title || "页面未找到";
    document.title = `抖大侠 - ${title}`;
  }, [slug]);

  const Page = pages[slug];
  if (Page) return slug === "order-chart" ? <>{Page()}</> : <div className="dx-body">{Page()}</div>;
  if (batchTools.some((tool) => tool.href === `/${slug}`)) {
    return (
      <div className="dx-body">
        <BatchToolPage href={`/${slug}`} />
      </div>
    );
  }
  return (
    <div className="dx-page">
      <div className="dx-empty">
        <h2>页面未找到</h2>
        <p>没有 /{slug} 这个菜单。</p>
      </div>
    </div>
  );
}
