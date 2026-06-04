import { describe, it, expect } from "vitest";
import { SITE_URL, COMPANY } from "./seo";

describe("seo: SITE_URL", () => {
  it("絶対URL（http/https始まり）である", () => {
    expect(SITE_URL).toMatch(/^https?:\/\//);
  });

  it("末尾にスラッシュを含まない（パス連結時の二重スラッシュ防止）", () => {
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});

describe("seo: COMPANY（JSON-LD構造化データの定義）", () => {
  it("必須フィールドが揃っている", () => {
    expect(COMPANY.name).toBeTruthy();
    expect(COMPANY.url).toBe(SITE_URL);
    expect(COMPANY.logo).toContain(SITE_URL);
    expect(COMPANY.description.length).toBeGreaterThan(0);
  });

  it("住所の必須項目が揃っている", () => {
    const a = COMPANY.address;
    expect(a.streetAddress).toBeTruthy();
    expect(a.addressLocality).toBeTruthy();
    expect(a.addressRegion).toBeTruthy();
    expect(a.postalCode).toMatch(/^\d{3}-\d{4}$/);
    expect(a.addressCountry).toBe("JP");
  });

  it("knowsAbout は空でない文字列配列である", () => {
    expect(Array.isArray(COMPANY.knowsAbout)).toBe(true);
    expect(COMPANY.knowsAbout.length).toBeGreaterThan(0);
    expect(COMPANY.knowsAbout.every((k) => typeof k === "string" && k.length > 0)).toBe(true);
  });

  it("contactEmail がメール形式である", () => {
    expect(COMPANY.contactEmail).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("foundingDate が4桁年である", () => {
    expect(COMPANY.foundingDate).toMatch(/^\d{4}$/);
  });
});
