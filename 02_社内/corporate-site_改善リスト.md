# corporate-site 修正・アップデート事項リスト

対象: `d-momose/corporate-site`（ローカル: `07_communication/06_百瀬さん作　HP`）
調査日: 2026-06-04 / Next.js 16.2.7・React 19.2.7（PR#1適用後の状態）

凡例: 🔴=要対応(重要) / 🟠=対応推奨 / 🟡=パフォーマンス / 🟢=品質・運用 / ✅=対応済み

---

## ✅ 対応済み（PR作成済み）
| # | 内容 | PR |
|---|---|---|
| 1 | Next.js/RSC脆弱性対応（next 16.1.6→16.2.7, react/react-dom 19.2.3→19.2.7） | #1 |
| 2 | 事業セクション背景画像の404（business-bg.jpg→business-bg-2.jpg） | #2 |

---

## 🔴 セキュリティ（残・要評価）
| # | 内容 | 詳細・対応 |
|---|---|---|
| 3 | npm audit 残8件（6 moderate / 2 high） | RSC系CVEとは別系統。`flatted`(high/DoS)・`picomatch`(high/ReDoS)・`brace-expansion`(mod)・`uuid`(mod, resend経由) は **`npm audit fix`（非破壊）** で解消可能か要検証。`postcss`(mod) は next にバンドルされ **`--force` だと next が9系へダウングレードするため絶対NG**。個別精査が必要 |

## 🟠 バグ・機能
| # | 内容 | 影響 |
|---|---|---|
| 4 | `/images/og-default.png` 欠落（`public/images/` ディレクトリ自体が無い） | ルート/contact/entry/partner の metadata 計5箇所が参照。**SNSシェア時のOGP画像が表示されない**。実画像の配置が必要（要素材確認） |
| 5 | `Header.tsx:41` の lint **error**（`set-state-in-effect`） | useEffect内で同期的に`setState`→カスケードレンダリング。パフォーマンス劣化＋将来のReactで非推奨。唯一のerror扱い |

## 🟡 パフォーマンス
| # | 内容 | 詳細 |
|---|---|---|
| 6 | 巨大画像10枚（public合計 **32MB**、最大4.3MB） | strength-team 4.3M / hero-blob-1 4.0M / entry-apply-hero-2 4.0M ほか。webp/avif化・リサイズ未実施（webp/avifファイル0個）。初回表示が重い |
| 7 | 生`<img>`タグを8コンポーネントで使用 | HeroSection等のLCP画像含む。`next/image`へ置換で自動最適化（リサイズ/webp化/lazy）が効く。lint warningも2件出ている |
| 8 | `/ceo.jpg` の `<Image fill>` に `sizes` 未指定 | 過大なサイズで配信される可能性（lint warning） |

## 🟢 コード品質・設定・運用
| # | 内容 | 詳細 |
|---|---|---|
| 9 | 未使用変数 warning 6件 | `COMPANY`×4（contact/entry-apply/partner layout, privacy page）, `Image`(CompanySection), `makeGlowTexture`(HeroCanvas) |
| 10 | `next.config.ts` `images.domains` 非推奨 | `remotePatterns`へ移行推奨。かつ `picsum.photos` は src で未参照（テスト残骸）→ 登録自体を削除候補 |
| 11 | README がcreate-next-appデフォルトのまま | プロジェクト説明・セットアップ手順・環境変数（RESEND_API_KEY等）の記載なし |
| 12 | `engines`（Node version）未指定 | デプロイ環境のNodeバージョン不一致リスク |
| 13 | テスト無し | jest/vitest/playwright 設定なし。リグレッション検知の仕組みがない |
| 14 | CI/CD 無し | `.github/workflows` なし。lint/build/デプロイの自動チェックがない |

---

## 推奨着手順
1. **#4 OGP画像**（外向き影響・素材があれば即）
2. **#3 npm audit 個別精査**（`npm audit fix` で安全に消せる分だけ先に）
3. **#5 Header setState**（lint error解消・体感速度）
4. **#6/#7 画像最適化**（最大の体感改善・別PRでまとめて）
5. **#9/#10 lint/設定クリーンアップ**（軽微・まとめて1PR）
6. **#11〜#14 運用基盤**（README/engines/テスト/CI）は中期で

※ すべて百瀬さん/チームと優先度合意の上で、1項目=1ブランチ/PR を基本に進めるのが安全。
