import { NextResponse } from "next/server";

// Appends a website lead (contact form or quote modal) to the Google Sheet via an Apps Script web app
// (see scripts/leads-apps-script.gs).
const FIELDS = ["type", "name", "email", "phone", "address", "service", "message"] as const;

// Leading ' makes Sheets store input as plain text: no formulas, and phone numbers keep leading zeros.
const clean = (v: unknown) => {
  const s = String(v ?? "").trim().slice(0, 2000);
  return s ? `'${s}` : "";
};

export async function POST(req: Request) {
  const { LEADS_WEBHOOK_URL, LEADS_WEBHOOK_TOKEN } = process.env;
  if (!LEADS_WEBHOOK_URL || !LEADS_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Lead capture is not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const row = [new Date().toISOString(), ...FIELDS.map((f) => clean(body[f]))];

  // Apps Script answers POST with a redirect to the result; fetch follows it.
  const res = await fetch(LEADS_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: LEADS_WEBHOOK_TOKEN, row }),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    console.error("Lead append failed:", res.status, data);
    return NextResponse.json({ error: "Could not save your request" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
