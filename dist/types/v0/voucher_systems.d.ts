import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface VoucherSystemsOptions {
    user?: string;
    base?: string;
}
export interface VoucherSystemsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface VoucherSystemsResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<VoucherSystemsResponse>;
}
export interface VoucherSystemResponse {
    data: VoucherSystem;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface VoucherSystem {
    id?: string;
}
export interface VoucherSystem {
    name: string;
    country?: string;
    region?: string;
    branches?: string[];
    hooks?: object;
    active?: boolean;
    deleted?: boolean;
    increments?: object[];
}
export declare class VoucherSystems extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: VoucherSystemsOptions;
    uriHelper: UriHelper;
    constructor(options: VoucherSystemsOptions, http: Client);
    getAll(queryOrOptions?: VoucherSystemsQuery | undefined): Promise<VoucherSystemsResponse>;
    get(voucherSystemId: string): Promise<VoucherSystemResponse>;
    put(voucherSystemId: string, voucherSystemGroup: VoucherSystem): Promise<VoucherSystemResponse>;
    create(voucherSystemGroup: VoucherSystem): Promise<VoucherSystemResponse>;
    delete(voucherSystemId: string): Promise<VoucherSystemResponse>;
}
export declare class VoucherSystemsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherSystemFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherSystemPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherSystemCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherSystemDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
