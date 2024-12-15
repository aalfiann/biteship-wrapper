import Cacheman from 'recacheman';

type BiteshipAction = 'create' | 'retrieve' | 'update' | 'delete' | 'confirm';

interface CacheConfig {
  namespace?: string;
  engine?: 'memory' | 'file' | 'redis';
  [key: string]: any;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Item {
  name: string;
  value: number;
  weight: number;
  quantity: number;
  [key: string]: any;
}

interface MapPayload {
  input: string;
  countries?: string;
  type?: string;
}

interface RatePayload {
  couriers: string;
  items: Array<Item>;
  origin_area_id?: string;
  destination_area_id?: string;
  origin_latitude?: number;
  origin_longitude?: number;
  destination_latitude?: number;
  destination_longitude?: number;
  origin_postal_code?: number;
  destination_postal_code?: number;
  [key: string]: any;
}

interface CreateLocationPayload {
  name: string;
  contact_name: string;
  contact_phone: string;
  address: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  note?: string;
  [key: string]: any;
}

interface UpdateLocationPayload {
  name?: string;
  contact_name?: string;
  contact_phone?: string;
  address?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  note?: string;
  [key: string]: any;
}

interface CreateDraftOrderPayload {
  origin_contact_name: string;
  origin_contact_phone: string;
  origin_address: string;
  destination_contact_name: string;
  destination_contact_phone: string;
  destination_address: string;
  delivery_type: string;
  items: Array<Item>;
  origin_postal_code?: string;
  origin_coordinate?: Coordinate;
  destination_postal_code?: number;
  destination_coordinate?: Coordinate;
  destination_proof_of_delivery_note?: string;
  [key: string]: any;
}

interface UpdateDraftOrderPayload {
  origin_contact_name?: string;
  origin_contact_phone?: string;
  origin_address?: string;
  destination_contact_name?: string;
  destination_contact_phone?: string;
  destination_address?: string;
  delivery_type?: string;
  items?: Array<Item>;
  origin_postal_code?: string;
  origin_coordinate?: Coordinate;
  destination_postal_code?: number;
  destination_coordinate?: Coordinate;
  destination_proof_of_delivery_note?: string;
  [key: string]: any;
}

interface OrderPayload {
  origin_contact_name: string;
  origin_contact_phone: string;
  origin_address: string;
  destination_contact_name: string;
  destination_contact_phone: string;
  destination_address: string;
  courier_company: string;
  courier_type: string;
  delivery_type: string;
  items: Array<Item>;
  origin_postal_code?: string;
  origin_coordinate?: Coordinate;
  origin_area_id?: string;
  destination_postal_code?: number;
  destination_coordinate?: Coordinate;
  destination_proof_of_delivery_note?: string;
  [key: string]: any;
}

interface BiteshipError {
  status: number;
  success: boolean;
  error?: string;
  code?: number;
  [key: string]: any;
}

interface BiteshipResponse {
  status: number;
  success: boolean;
  [key: string]: any;
}

declare class Biteship {
  static baseUrl: string;

  private _action: string;
  private api_key: string;
  private api_version: string;
  private url: string;
  private payload: any;
  private method: string;
  private _keycache: string | undefined;
  private _ttl: number | undefined;
  private cacheman: Cacheman;
  private cache_config: CacheConfig;

  constructor(config: {
    api_key: string;
    api_version?: string;
    cache_config?: CacheConfig;
  });

  private _hash(text: string): string;
  private _reset(): void;
  private _handleResponse(err: any, res?: any): BiteshipResponse;
  private _sendReqCallback(_cb: (error: BiteshipError | null, response?: BiteshipResponse) => void): void;
  private _sendReqPromise(): Promise<BiteshipResponse>;

  action(name: BiteshipAction): this;

  maps(payload: MapPayload): this;

  rates(payload: RatePayload): this;

  // For creating a new location
  locations(payload: CreateLocationPayload): this;
  // For update a location
  locations(payload: UpdateLocationPayload, id: string): this;
  // For retrieve or delete location
  locations(payload: null, id: string): this;
  // The actual implementation signature
  locations(payload?: CreateLocationPayload | UpdateLocationPayload | null, id?: string): this;

  // For creating a new draft order
  draftOrders(payload: CreateDraftOrderPayload): this;
  // For updating an existing draft order
  draftOrders(payload: UpdateDraftOrderPayload, id: string): this;
  // For retrieving and deleting a draft order
  draftOrders(payload: null, id: string): this;
  // For retrieving with rates and confirming a draft order (with customPath)
  draftOrders(payload: null, id: string, customPath: string): this;
  // The actual implementation signature
  draftOrders(payload?: CreateDraftOrderPayload | UpdateDraftOrderPayload | null, id?: string, customPath?: string): this;

  // For creating a new order
  orders(payload: OrderPayload): this;
  // For retrieving and deleting an order
  orders(payload: null, id: string): this;
  // The actual implementation signature
  orders(payload?: OrderPayload | null, id?: string): this;

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

  cache(ttl: number): this;

  send(callback: (error: BiteshipError | null, response?: BiteshipResponse) => void): void;

  sendAsync(): Promise<BiteshipResponse>;
}

export = Biteship;
