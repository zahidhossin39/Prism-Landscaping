import { NextResponse } from "next/server";

// Appends a website lead (contact form or quote modal) to the Google Sheet via Composio.
const FIELDS = ["type", "name", "email", "phone", "address", "service", "message"] as const;

// Prefix values Sheets would treat as formulas, so user input can't run as a formula.
const clean = (v: unknown) => {
  const s = String(v ?? "").trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
};

export async function POST(req: Request) {
  const { COMPOSIO_API_KEY, COMPOSIO_CONNECTED_ACCOUNT_ID, LEADS_SHEET_ID } = process.env;
  if (!COMPOSIO_API_KEY || !COMPOSIO_CONNECTED_ACCOUNT_ID || !LEADS_SHEET_ID) {
    return NextResponse.json({ error: "Lead capture is not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const row = [new Date().toISOString(), ...FIELDS.map((f) => clean(body[f]))];

  const res = await fetch(
    "https://backend.composio.dev/api/v3/tools/execute/GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": COMPOSIO_API_KEY },
      body: JSON.stringify({
        connected_account_id: COMPOSIO_CONNECTED_ACCOUNT_ID,
        arguments: {
          spreadsheetId: LEADS_SHEET_ID,
          range: "Sheet1!A:H",
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS",
          values: [row],
        },
      }),
    }
  );
  const data = await res.json().catch(() => null);

  if (!res.ok || data?.successful === false) {
    console.error("Lead append failed:", res.status, data?.error ?? data);
    return NextResponse.json({ error: "Could not save your request" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
