import axios, { AxiosInstance } from "axios";
import { User } from "../declarations/interfaces";

export default class AmoApi {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  async save(user: User): Promise<any> {
    const res = await this.request("https://hooks.zapier.com/hooks/catch/5295131/oniftsc/", user);
    return res;
  }

  async request(path: string, payload?: any) {
    const res = await this.axios.post(path, payload);
    return res.data;
  }
}
