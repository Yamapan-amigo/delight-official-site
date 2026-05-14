import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = "info@delight-x.co.jp";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const {
    name, kana, gender, age,
    zip, prefecture, city, addressRest,
    phone, email,
    school, department, graduationYear, graduationMonth,
    remarks,
  } = body;

  const address = [zip ? `〒${zip}` : "", prefecture, city, addressRest]
    .filter(Boolean).join(" ");
  const graduation = graduationYear && graduationMonth
    ? `${graduationYear}年 ${graduationMonth}月`
    : "未入力";

  const contentLines = [
    `■ お名前：${name}（${kana}）`,
    `■ 性別：${gender}`,
    `■ 年齢：${age}歳`,
    `■ 住所：${address}`,
    `■ 電話番号：${phone}`,
    `■ メールアドレス：${email}`,
    `■ 最終学歴：${school || "未入力"} ${department || ""}`,
    `■ 卒業年月：${graduation}`,
    `■ 特記事項：\n${remarks || "なし"}`,
  ].join("\n\n");

  const [r1, r2] = await Promise.all([
    resend.emails.send({
      from: "Delight Website <noreply@delight-x.co.jp>",
      to: TO,
      replyTo: email,
      subject: `【エントリー】${name}（${kana}）様`,
      text: [
        `このメールは自動送信でお送りしています。\nメールフォームより送信がありました。\n\n------------------------------------------------------------\n▼送信内容\n------------------------------------------------------------`,
        contentLines,
      ].join("\n\n"),
    }),
    resend.emails.send({
      from: "Delight Website <noreply@delight-x.co.jp>",
      to: email,
      subject: `【エントリー受付】${name}様`,
      text: [
        `${name} 様\n\nこのたびはエントリーいただき、誠にありがとうございます。\n以下の内容でエントリーを受け付けました。\n\n内容を確認の上、必要に応じて担当者よりご連絡させていただく場合がございます。\nなお、お問い合わせの内容によってはご返信できない場合もございますので、\nあらかじめご了承ください。`,
        `------------------------------------------------------------\n▼エントリー内容\n------------------------------------------------------------`,
        contentLines,
        `------------------------------------------------------------\n株式会社Delight\nhttps://delight-x.co.jp\n------------------------------------------------------------\n※このメールは自動送信です。本メールへの返信はお受けできません。`,
      ].join("\n\n"),
    }),
  ]);

  const error = r1.error || r2.error;
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
