import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

const pageUrl = `${SITE_URL}/security`;

export const metadata: Metadata = {
  title: "情報セキュリティ方針",
  description: "Delight株式会社の情報セキュリティ方針をご確認いただけます。",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
};

const actionGuidelines = [
  "情報資産の機密性、完全性、可用性を確実に保護するために組織的、技術的に適切な対策を講じ、変化する情報技術や新たな脅威に対応する。",
  "全社員に情報セキュリティ教育の実施と方針の周知徹底をはかり、意識の高揚・維持に務める。",
  "情報セキュリティに関連する法令及び要求事項を遵守する。",
  "情報セキュリティに関する目的を設定し、定期的にレビューし、継続的に改善する。",
];

export default function SecurityPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "情報セキュリティ方針", item: pageUrl },
    ],
  };

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd} />
      {/* ─── ヒーロー ─── */}
      <section
        className="relative bg-gray-950 pt-36 pb-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(230,115,118,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#E67376] uppercase mb-3">
            Information Security Policy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            情報セキュリティ方針
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </div>
      </section>

      {/* ─── 本文エリア ─── */}
      <section className="bg-[#f9f9f9] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

            {/* 前文 */}
            <p className="text-sm text-gray-600 leading-8 mb-10 pb-10 border-b border-gray-100">
              当社は、情報セキュリティに対し適切な対策を講じることにより、お客様をはじめ社会からの信頼を得られるよう努めます。
            </p>

            {/* 行動指針 */}
            <h2 className="text-base font-bold text-gray-900 mb-6">行動指針</h2>
            <div className="space-y-8">
              {actionGuidelines.map((content, index) => (
                <div key={index} className="flex gap-6">
                  {/* 番号 */}
                  <div className="shrink-0 pt-0.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #c04050 0%, #E67376 100%)",
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  {/* テキスト */}
                  <div>
                    <p className="text-sm text-gray-600 leading-8">{content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 制定日・署名 */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-7 text-right">
                2026年2月6日<br />
                Delight株式会社<br />
                代表取締役　山中 翔太
              </p>
            </div>

          </div>

          {/* 戻るリンク */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block text-sm text-gray-500 hover:text-[#E67376] transition-colors underline underline-offset-4"
            >
              ← トップページへ戻る
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
