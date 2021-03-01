export interface User {
  readonly givenName: string;
  readonly familyName: string;
  readonly phone: string;
  readonly email: string;
}

export interface IGoogleSheetsService {
  appendToSpreadsheet(body: User, sheet: string): Promise<void>;
}
