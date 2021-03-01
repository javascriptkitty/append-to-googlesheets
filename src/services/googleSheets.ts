import { injectable } from "inversify";
import { google } from "googleapis";
import keys from "../googleConfig.json";
import { IGoogleSheetsService, User } from "../declarations/interfaces";

@injectable()
export default class GoogleSheetsService implements IGoogleSheetsService {
  private readonly client = new google.auth.JWT(keys.client_email, undefined, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  private async getGoogleApi() {
    return await google.sheets({ version: "v4", auth: this.client });
  }

  async appendToSpreadsheet(body: User, sheet: string): Promise<void> {
    const { familyName, givenName, phone, email } = body;
    const dataFormatted = [[givenName, familyName, phone, email]];
    const gapi = await this.getGoogleApi();

    const STARTING_POINT = "A1";
    const ENDING_POINT = "D";
    const res = await gapi.spreadsheets.values.get({
      spreadsheetId: keys.spreadsheetId,
      range: `${sheet}!${STARTING_POINT}:${ENDING_POINT}`,
    });
    const lastRow = res.data.values ? res.data.values.length : 0;

    const reqBody = {
      majorDimension: "ROWS",
      range: `${sheet}!${lastRow + 1}:${lastRow + 1}`,
      values: dataFormatted,
    };
    await gapi.spreadsheets.values.append({
      spreadsheetId: keys.spreadsheetId,
      range: `${sheet}!${lastRow + 1}:${lastRow + 1}`,
      valueInputOption: "RAW",
      requestBody: reqBody,
    });
  }

  // static humanizePhoneNumber(phone: string): string {
  //   const country = phone.slice(0, 2);
  //   const operator = phone.slice(2, 5);
  //   const number = [phone.slice(5, 8), phone.slice(8, 10), phone.slice(10, 12)];
  //   return `${country} (${operator}) ${number[0]}-${number[1]}-${number[2]}`.trim();
  // }
}
