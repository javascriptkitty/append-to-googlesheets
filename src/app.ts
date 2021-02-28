import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
dotenv.config();
import { container } from "./inversify.config";
import "./controllers/users";

export class App {
  async init(): Promise<void> {
    let server = new InversifyExpressServer(container, null, { rootPath: "/api" });

    server.setConfig(app => {
      app.use(cors());
      app.use(express.json());
      app.use(express.text());
      app.use(
        express.urlencoded({
          extended: true,
        })
      );
    });

    server.setErrorConfig(app => {
      app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.log(err);
        res.status(err.status || 500).json({
          message: err.message,
        });
      });
    });

    const app = server.build();

    app.use((_req, res) => {
      res.status(404).json({ message: "Not Found" });
    });

    const port: number = parseInt(process.env.PORT!) || 3000;
    const host: string = process.env.HOST || "0.0.0.0";

    app.listen(port, host, () => {
      console.log(`App listening at http://${host}:${port}`);
    });
  }
}

process.on("unhandledRejection", (err: Error, _) => {
  console.log(`Unhandled Rejection at: ${err.stack || err}`);
});

process.on("uncaughtException", (err: Error, _: string) => {
  console.log(`Unhandled Rejection at: ${err.stack || err}`);
});
