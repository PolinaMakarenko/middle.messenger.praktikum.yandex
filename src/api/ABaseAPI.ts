import HTTPTransporttsts from "../core/HtttpTransport"

export default abstract class BaseAPI {
  protected http: HTTPTransporttsts

  protected constructor(endpoint: string) {
    this.http = new HTTPTransporttsts(endpoint)
  }

  public create?(data: unknown): Promise<unknown>

  public read?(identifier?: string | number): Promise<unknown>

  public update?(identifier: string | number, data: unknown): Promise<unknown>

  public delete?(identifier: string | number): Promise<unknown>
}
