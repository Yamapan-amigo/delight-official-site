import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = "info@delight-x.co.jp";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { type, company, name, email, phone, message } = await req.json();

  const contentLines = [
    `■ お問い合わせ種別：${type}`,
    `■ 法人名：${company || "未入力"}`,
    `■ お名前：${name}`,
    `■ メールアドレス：${email}`,
    `■ 電話番号：${phone || "未入力"}`,
    `■ お問い合わせ内容：\n${message}`,
  ].join("\n\n");

  const [r1, r2] = await Promise.all([
    resend.emails.send({
      from: "Delight Website <noreply@delight-x.co.jp>",
      to: TO,
      replyTo: email,
      subject: `【お問い合わせ】${type} - ${name}様`,
      text: [
        `このメールは自動送信でお送りしています。\nメールフォームより送信がありました。\n\n------------------------------------------------------------\n▼送信内容\n------------------------------------------------------------`,
        contentLines,
      ].join("\n\n"),
    }),
    resend.emails.send({
      from: "Delight Website <noreply@delight-x.co.jp>",
      to: email,
      subject: `【お問い合わせ受付】${name}様`,
      text: [
        `${name} 様\n\nこのたびはお問い合わせいただき、誠にありがとうございます。\n以下の内容でお問い合わせを受け付けました。\n\n内容を確認の上、必要に応じて担当者よりご連絡させていただく場合がございます。\nなお、お問い合わせの内容によってはご返信できない場合もございますので、\nあらかじめご了承ください。`,
        `------------------------------------------------------------\n▼お問い合わせ内容\n------------------------------------------------------------`,
        contentLines,
        `------------------------------------------------------------\n株式会社Delight\nhttps://delight-x.co.jp\n------------------------------------------------------------\n※このメールは自動送信です。本メールへの返信はお受けできません。`,
      ].join("\n\n"),
    }),
  ]);

  const error = r1.error || r2.error;
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
