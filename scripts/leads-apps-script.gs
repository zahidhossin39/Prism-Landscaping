// Google Apps Script for the "Greenly Website Leads" sheet.
// Paste into the sheet: Extensions -> Apps Script, replace TOKEN, then Deploy -> New deployment -> Web app
// (Execute as: Me, Who has access: Anyone). Put the web app URL + TOKEN in LEADS_WEBHOOK_URL / LEADS_WEBHOOK_TOKEN.
const TOKEN = "REPLACE_WITH_LEADS_WEBHOOK_TOKEN";

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.token !== TOKEN) return json({ ok: false, error: "unauthorized" });
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(body.row);
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
