# corporate-site

Delight株式会社 コーポレートサイト。Next.js（App Router）製。

## 技術スタック

| 区分 | 採用技術 |
|---|---|
| フレームワーク | Next.js 16（App Router） / React 19 |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| アニメーション / 3D | GSAP, Three.js |
| アイコン | lucide-react |
| メール送信 | [Resend](https://resend.com/) |
| ホスティング | Vercel（想定） |

## 必要環境

- Node.js **>= 20.9.0**（`package.json` の `engines` 参照）
- npm

## セットアップ

```bash
# 依存関係のインストール
npm install

# 環境変数ファイルを用意（下記「環境変数」参照）
# .env.local を作成し RESEND_API_KEY 等を設定

# 開発サーバー起動（http://localhost:3000）
npm run dev
```

## 環境変数

`.env.local`（git管理外）に設定します。

| 変数 | 必須 | 用途 |
|---|---|---|
| `RESEND_API_KEY` | フォーム送信時に必須 | お問い合わせ / エントリー / パートナー各フォームのメール送信（Resend）。未設定でもサイト表示・ビルドは可能で、送信のみ失敗します。 |
| `NEXT_PUBLIC_SITE_URL` | 任意 | サイトの絶対URL（OGP・sitemap・JSON-LD等で使用）。未設定時は `https://delight-corp.jp`。 |

API キーは [Resend のダッシュボード](https://resend.com/api-keys) から取得します。

## スクリプト

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（ポート3000） |
| `npm run build` | 本番ビルド（`next build --webpack`） |
| `npm run start` | ビルド成果物の起動 |
| `npm run lint` | ESLint |

## ディレクトリ構成（抜粋）

```
src/
├── app/                 # App Router（ページ・APIルート）
│   ├── api/             # contact / entry / partner のメール送信ルート
│   ├── contact/         # お問い合わせ
│   ├── entry/           # エントリー（/entry, /entry/apply）
│   ├── partner/         # パートナー募集
│   ├── privacy/         # 個人情報保護方針
│   ├── layout.tsx       # 共通レイアウト・メタデータ
│   └── page.tsx         # トップページ
├── components/          # セクション・UIコンポーネント
└── lib/                 # seo 等の共通定義
public/                  # 画像・静的アセット
```

## デプロイ

Vercel へのデプロイを想定。環境変数（`RESEND_API_KEY` 等）はホスティング側にも設定すること。
ビルドは `npm run build`、起動は `npm run start`。
