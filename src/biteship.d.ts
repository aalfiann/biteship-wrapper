declare class Biteship {
  static baseUrl: string;

  private _action: string;
  private api_key: string;
  private api_version: string;
  private url: string;
  private payload: any;
  private method: string;

  constructor(config: {
    api_key: string;
    api_version?: string;
  });

  private _reset(): void;

  action(name: string): this;

  maps(payload: {
    country?: string;
    type?: string;
    [key: string]: any;
  }): this;

  rates(payload: object): this;

  locations(payload?: object | null, id?: string): this;

  draftOrders(payload?: object | null, id?: string, customPath?: string): this;

  orders(payload?: object | null, id?: string): this;

  couriers(): this;

  trackings(id: string): this;

  publicTrackings(waybillId: string, courierId: string): this;

  private _buildReq(): {
    method: string;
    url: string;
    headers: {
      authorization: string;
      'content-type': string;
    };
    data?: any;
  };

  send(callback: (error: any, response?: any) => void): void;

  sendAsync(): Promise<{
    status: number;
    success: boolean;
    [key: string]: any;
  }>;
}

export = Biteship;
