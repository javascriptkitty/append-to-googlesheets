import * as express from "express";
import { controller, httpPost, request, BaseHttpController } from "inversify-express-utils";
import AmoApi from "../api/amo";

@controller("/Contacts")
export class ContactsController extends BaseHttpController {
  private readonly api = new AmoApi();

  @httpPost("/SaveContacts")
  private async save(@request() req: express.Request) {
    const user = await this.api.save(req.body);
    return this.json(user.id);
  }
}
