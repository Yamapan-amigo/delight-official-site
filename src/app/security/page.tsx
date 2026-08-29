import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

const pageUrl = `${SITE_URL}/security`;

export const metadata: Metadata = {
  title: "情報セキュリティ方針",
  description:
    "Delight株式会社の情報セキュリティ方針およびISO/IEC 27001:2022（ISMS）認証取得情報をご確認いただけます。",
  alternates: { canonical: pageUrl },
};

const policySections = [
  {
    title: "経営者の責任",
    content:
      "当社は、情報セキュリティの確保を重要な経営課題の一つとして位置付けます。経営者は、情報セキュリティマネジメントシステム（ISMS）の確立・運用・維持および改善に必要な資源を適切に提供し、その有効性を定期的に確認します。",
  },
  {
    title: "社内体制の整備",
    content:
      "当社は、情報セキュリティ責任者および関連部門からなる推進体制を整備し、役割と責任を明確にします。これにより、情報資産の管理、リスク評価、対策の実施およびインシデント対応を組織的に実施できる体制を維持します。",
  },
  {
    title: "従業員の取り組み",
    content:
      "当社の役員・従業員・契約社員および当社の管理下で業務に従事するすべての者は、本基本方針および関連規程を理解し、遵守します。当社は、情報セキュリティに関する教育・訓練を継続的に実施し、従業員の意識向上と必要な知識の習得を促進します。",
  },
  {
    title: "法令及び契約上の要求事項の遵守",
    content:
      "当社は、個人情報保護法、労働関連法令、著作権法その他の関連法令、ならびに顧客やパートナーとの契約に定められた情報セキュリティに関する要求事項を遵守します。また、ISO/IEC 27001（JIS Q 27001）の要求事項に基づき、情報セキュリティマネジメントシステムを運用します。",
  },
  {
    title: "違反及び事故への対応",
    content:
      "当社は、情報セキュリティに関する違反行為や事故が発生した場合、速やかに原因の究明と影響範囲の確認を行い、適切な是正措置および再発防止策を講じます。また、その結果を必要に応じて関係者に報告し、情報セキュリティマネジメントシステムの改善に反映させます。",
  },
  {
    title: "継続的改善",
    content:
      "当社は、定期的な監査、点検およびマネジメントレビューを通じて、情報セキュリティに関する取り組みの有効性を評価します。その結果を踏まえ、リスク環境や事業内容の変化に応じて、情報セキュリティマネジメントシステムを継続的に改善します。",
  },
];

const certificationInfo = [
  { label: "登録規格", value: "ISO/IEC 27001:2022" },
  { label: "認証登録番号", value: "SCC/INT/2608DO/31423" },
  { label: "認証機関", value: "QFS MANAGEMENT SYSTEMS LLP" },
  { label: "初回認証日", value: "2026年8月17日" },
  { label: "認証範囲", value: "顧客要求に基づくシステム開発に適用される情報セキュリティ" },
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
              当社は、SES・受託開発・自社サービス（SaaS）およびクラウド運用事業を通じて、顧客企業の重要な情報資産を取り扱っています。これらの情報資産を適切に保護し、継続的かつ安定したサービスを提供することは、当社の重要な責務であり、社会的な責任であると認識しています。そこで当社は、以下の基本方針に基づき、情報セキュリティの確保と継続的な改善に取り組みます。
            </p>

            {/* 基本方針 */}
            <div className="space-y-8">
              {policySections.map(({ title, content }, index) => (
                <div key={title} className="flex gap-6">
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
                    <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 leading-8">{content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 認証取得情報 */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-6">
                ISO/IEC 27001（ISMS）認証について
              </h2>
              <p className="text-sm text-gray-600 leading-8 mb-6">
                当社は、情報セキュリティマネジメントシステムの国際規格「ISO/IEC 27001:2022」の認証を取得しています。
              </p>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                {certificationInfo.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-5 py-3.5 ${i % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                  >
                    <span className="text-xs font-bold text-gray-500 w-32 shrink-0 pt-1">
                      {label}
                    </span>
                    <span className="text-sm text-gray-700 leading-7">{value}</span>
                  </div>
                ))}
              </div>
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
