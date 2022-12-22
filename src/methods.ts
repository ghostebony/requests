import { request } from "./request";
import type { OmitRequestOptions } from "./types";

export const DELETE = <ResponseData = any, ResponseError = any>(
	url: string,
	options?: OmitRequestOptions<"method">
) => request<ResponseData, ResponseError>(url, { method: "DELETE", ...options });

export const HEAD = <ResponseData = any, ResponseError = any>(
	url: string,
	options?: OmitRequestOptions<"method">
) => request<ResponseData, ResponseError>(url, { method: "HEAD", ...options });

export const GET = <ResponseData = any, ResponseError = any>(
	url: string,
	options?: OmitRequestOptions<"method">
) => request<ResponseData, ResponseError>(url, { method: "GET", ...options });

export const PATCH = <ResponseData = any, ResponseError = any>(
	url: string,
	options?: OmitRequestOptions<"method">
) => request<ResponseData, ResponseError>(url, { method: "PATCH", ...options });

export const POST = <ResponseData = any, ResponseError = any>(
	url: string,
	options?: OmitRequestOptions<"method">
) => request<ResponseData, ResponseError>(url, { method: "POST", ...options });

export const PUT = <ResponseData = any, ResponseError = any>(
	url: string,
	options?: OmitRequestOptions<"method">
) => request<ResponseData, ResponseError>(url, { method: "PUT", ...options });

export { DELETE as del };
export { HEAD as head };
export { GET as get };
export { PATCH as patch };
export { POST as post };
export { PUT as put };

export default {
	DELETE,
	delete: DELETE,
	HEAD,
	head: HEAD,
	GET,
	get: GET,
	PATCH,
	patch: PATCH,
	POST,
	post: POST,
	PUT,
	put: PUT,
};
