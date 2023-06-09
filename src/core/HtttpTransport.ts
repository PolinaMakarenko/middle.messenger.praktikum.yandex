enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
  
interface Options {
  method: METHODS;
  data?: any;
  timeout?: number;
  headers?: { [header: string]: string };
  options?: Record<string, string>
}
  
interface httpMethod {
    <Response>(path: string, data?: { [key: string]: any }): Promise<Response>
}

function queryStringify(data: Record<string, any>) {
    if (typeof data !== "object") {
      throw new Error("Data must be object");
    }
  
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
    }, "?");
}
  
class HTTPTransporttsts {
  static API_URL = "https://ya-praktikum.tech/api/v2"
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransporttsts.API_URL}${endpoint}`
  }

  public get: httpMethod = (path = "/", data) => {
    let newPath = this.endpoint + path

    if (data) newPath += queryStringify(data)

    return this.request(newPath, { method: METHODS.GET })
  }
  
  public post: httpMethod = (path, data) => this.request(
    this.endpoint + path,
    { method: METHODS.POST, data }
  )

  public put: httpMethod = (path, data) => this.request(
    this.endpoint + path,
    { method: METHODS.PUT, data }
  )

  public delete: httpMethod = (path, data) => this.request(
    this.endpoint + path,
    { method: METHODS.DELETE, data }
  )

	private request = <Response>(
    url: string, options: Options = { method: METHODS.GET }
  ): Promise<Response> => {
    const { method, data, headers } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({reason: "abort"})
      xhr.onerror = () => reject({reason: "network error"})
      xhr.ontimeout = () => reject({reason: "timeout"})

      xhr.withCredentials = true
      xhr.responseType = "json"
      
      if (method === METHODS.GET || !data) {
        xhr.send()
      } else if (data instanceof FormData) { 
        xhr.send(data)
      } else {
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(data))
      }
    })
  }
}



export default HTTPTransporttsts
