export interface User {
  readonly givenName: string;
  readonly fatherName: string;
  readonly familyName: string;
  readonly phone: string;
  readonly email: string;
}

export interface IGoogleSheetsService {
  appendToSpreadsheet(body: User): Promise<void>;
}
