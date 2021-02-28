import { Container } from "inversify";
import { TYPES } from "./declarations/types";
import { IGoogleSheetsService } from "./declarations/interfaces";
import GoogleSheetsService from "./services/googleSheets";

const container = new Container();

container.bind<IGoogleSheetsService>(TYPES.GoogleSheetsService).to(GoogleSheetsService);

export { container };
