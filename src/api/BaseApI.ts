import HTTPTransporttsts from "../core/HtttpTransport"

export default abstract class BaseAPI {
  protected http: HTTPTransporttsts

  protected constructor(endpoint: string) {
    this.http = new HTTPTransporttsts(endpoint)
  }

  public abstract create?(data: unknown): Promise<unknown>

  public abstract read?(identifier?: string | number): Promise<unknown>

  public abstract update?(identifier: string | number, data: unknown): Promise<unknown>

  public abstract delete?(identifier: string | number): Promise<unknown>
}
