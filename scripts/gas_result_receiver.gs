/**
 * Google Apps Script Web App receiver for legal-rpg results.
 *
 * 1) Create a Google Spreadsheet (destination).
 * 2) Extensions -> Apps Script (bound script) OR create a standalone script.
 * 3) Paste this file content.
 * 4) Deploy -> New deployment -> Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (or Anyone within your domain)
 * 5) Copy the Web app URL and paste it into app.js RESULT_POST_URL.
 *
 * Note: This endpoint expects JSON body.
 */

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "results";
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp",
        "name",
        "courseId",
        "courseName",
        "reachedStage",
        "score",
        "accuracyCorrect",
        "accuracyTotal",
        "accuracyPercent",
      ]);
    }

    var acc = payload.accuracy || {};
    sheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.name || "",
      payload.courseId || "",
      payload.courseName || "",
      payload.reachedStage || "",
      payload.score || "",
      acc.correct || "",
      acc.total || "",
      acc.percent || "",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doGet() {
  return json_({ ok: true, message: "legal-rpg result receiver" });
}

function json_(obj) {
  var output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

  // CORS
  // Apps Script's ContentService does not support setting arbitrary headers directly in all contexts,
  // but Web Apps typically work with standard cross-origin requests when called from browser fetch.
  return output;
}

