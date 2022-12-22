import { request } from "./request";
import type { OmitRequestOptions, RequestOptions } from "./types";

export class Session {
	public constructor(
		public baseUrl: string,
		public options?: OmitRequestOptions<"method" | "body">
	) {}

	public delete<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: OmitRequestOptions<"method">
	) {
		return this.request<ResponseData, ResponseError>(endpoint, {
			method: "DELETE",
			...options,
		});
	}

	public get<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: OmitRequestOptions<"method">
	) {
		return this.request<ResponseData, ResponseError>(endpoint, {
			method: "GET",
			...options,
		});
	}

	public head<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: OmitRequestOptions<"method">
	) {
		return this.request<ResponseData, ResponseError>(endpoint, {
			method: "HEAD",
			...options,
		});
	}

	public patch<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: OmitRequestOptions<"method">
	) {
		return this.request<ResponseData, ResponseError>(endpoint, {
			method: "PATCH",
			...options,
		});
	}

	public post<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: OmitRequestOptions<"method">
	) {
		return this.request<ResponseData, ResponseError>(endpoint, {
			method: "POST",
			...options,
		});
	}

	public put<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: OmitRequestOptions<"method">
	) {
		return this.request<ResponseData, ResponseError>(endpoint, {
			method: "PUT",
			...options,
		});
	}

	private request<ResponseData = any, ResponseError = any>(
		endpoint: string,
		options?: RequestOptions
	) {
		return request<ResponseData, ResponseError>(this.baseUrl + endpoint, {
			...this?.options,
			...options,
		});
	}
}

export default Session;
