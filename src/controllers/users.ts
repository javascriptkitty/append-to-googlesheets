import * as express from "express";
import { controller, httpPost, request, BaseHttpController } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../declarations/types";
import { IGoogleSheetsService } from "../declarations/interfaces";

@controller("/Spreadsheet")
export class UsersController extends BaseHttpController {
  constructor(@inject(TYPES.GoogleSheetsService) private readonly googleService: IGoogleSheetsService) {
    super();
  }

  @httpPost("/Save")
  private async save(@request() req: express.Request) {
    const user = await this.googleService.appendToSpreadsheet(req.body, "Sheet1");
    return this.json(user);
  }
  @httpPost("/OrderPayed")
  private async orderPayed(@request() req: express.Request) {
    const user = await this.googleService.appendToSpreadsheet(req.body, "Sheet2");
    return this.json(user);
  }
}
