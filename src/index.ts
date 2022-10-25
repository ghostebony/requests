import { object } from "@ghostebony/utils";
import type * as Types from "./types";

export enum STATUS_CODE {
	HTTP_100_CONTINUE = 100,
	HTTP_101_SWITCHING_PROTOCOLS = 101,
	HTTP_102_PROCESSING = 102,
	HTTP_103_EARLY_HINTS = 103,
	HTTP_200_OK = 200,
	HTTP_201_CREATED = 201,
	HTTP_202_ACCEPTED = 202,
	HTTP_203_NON_AUTHORITATIVE_INFORMATION = 203,
	HTTP_204_NO_CONTENT = 204,
	HTTP_205_RESET_CONTENT = 205,
	HTTP_206_PARTIAL_CONTENT = 206,
	HTTP_207_MULTI_STATUS = 207,
	HTTP_208_ALREADY_REPORTED = 208,
	HTTP_226_IM_USED = 226,
	HTTP_300_MULTIPLE_CHOICES = 300,
	HTTP_301_MOVED_PERMANENTLY = 301,
	HTTP_302_FOUND = 302,
	HTTP_303_SEE_OTHER = 303,
	HTTP_304_NOT_MODIFIED = 304,
	HTTP_305_USE_PROXY = 305,
	HTTP_306_UNUSED = 306,
	HTTP_307_TEMPORARY_REDIRECT = 307,
	HTTP_308_PERMANENT_REDIRECT = 308,
	HTTP_400_BAD_REQUEST = 400,
	HTTP_401_UNAUTHORIZED = 401,
	HTTP_402_PAYMENT_REQUIRED = 402,
	HTTP_403_FORBIDDEN = 403,
	HTTP_404_NOT_FOUND = 404,
	HTTP_405_METHOD_NOT_ALLOWED = 405,
	HTTP_406_NOT_ACCEPTABLE = 406,
	HTTP_407_PROXY_AUTHENTICATION_REQUIRED = 407,
	HTTP_408_REQUEST_TIMEOUT = 408,
	HTTP_409_CONFLICT = 409,
	HTTP_410_GONE = 410,
	HTTP_411_LENGTH_REQUIRED = 411,
	HTTP_412_PRECONDITION_FAILED = 412,
	HTTP_413_PAYLOAD_TOO_LARGE = 413,
	HTTP_414_URI_TOO_LONG = 414,
	HTTP_415_UNSUPPORTED_MEDIA_TYPE = 415,
	HTTP_416_RANGE_NOT_SATISFIABLE = 416,
	HTTP_417_EXPECTATION_FAILED = 417,
	HTTP_418_IM_A_TEAPOT = 418,
	HTTP_421_MISDIRECTED_REQUEST = 421,
	HTTP_422_UNPROCESSABLE_ENTITY = 422,
	HTTP_423_LOCKED = 423,
	HTTP_424_FAILED_DEPENDENCY = 424,
	HTTP_425_TOO_EARLY = 425,
	HTTP_426_UPGRADE_REQUIRED = 426,
	HTTP_428_PRECONDITION_REQUIRED = 428,
	HTTP_429_TOO_MANY_REQUESTS = 429,
	HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
	HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS = 451,
	HTTP_500_INTERNAL_SERVER_ERROR = 500,
	HTTP_501_NOT_IMPLEMENTED = 501,
	HTTP_502_BAD_GATEWAY = 502,
	HTTP_503_SERVICE_UNAVAILABLE = 503,
	HTTP_504_GATEWAY_TIMEOUT = 504,
	HTTP_505_HTTP_VERSION_NOT_SUPPORTED = 505,
	HTTP_506_VARIANT_ALSO_NEGOTIATES = 506,
	HTTP_507_INSUFFICIENT_STORAGE = 507,
	HTTP_508_LOOP_DETECTED = 508,
	HTTP_510_NOT_EXTENDED = 510,
	HTTP_511_NETWORK_AUTHENTICATION_REQUIRED = 511,
}

const REQUEST = async <Data = any, Error = any>(
	url: string,
	options: Types.RequestOptions = {}
) => {
	let body: BodyInit | null | undefined;

	if (options.params) {
		const params = new URLSearchParams(
			object.filter(options.params, null, undefined)
		).toString();

		if (params) {
			url = `${url}?${params}`;
		}
	}

	if (options.cookies) {
		options.headers = {
			...options.headers,
			cookie: object.serialize(object.filter(options.cookies, null, undefined)),
		};
	}


	if (options.body) {
		if (options.body.toString() === "[object Object]") {
			options.headers = { "content-type": "application/json", ...options.headers };
			body = JSON.stringify(options.body);
		} else {
			body = options.body as BodyInit;
		}
	}

	const response = await fetch(url, {
		method: options.method ?? "GET",
		headers: {
			accept: "application/json",
			...options.headers,
		},
		body,
	});

	const responseBody =
		options.response !== "none" ? await response[options.response ?? "json"]() : response.body;

	let data: Data | undefined;
	let error: Error | undefined;

	if (response.ok) {
		data = responseBody;
	} else {
		error = responseBody;
	}

	return {
		data,
		error,
		ok: response.ok,
		status: response.status,
		headers: response.headers,
	};
};

const DELETE = <Data = any, Error = any>(url: string, options?: Types.RequestOptions) =>
	REQUEST<Data, Error>(url, { method: "DELETE", ...options });

const HEAD = <Data = any, Error = any>(url: string, options?: Types.RequestOptions) =>
	REQUEST<Data, Error>(url, { method: "HEAD", ...options });

const GET = <Data = any, Error = any>(url: string, options?: Types.RequestOptions) =>
	REQUEST<Data, Error>(url, { method: "GET", ...options });

const PATCH = <Data = any, Error = any>(url: string, options?: Types.RequestOptions) =>
	REQUEST<Data, Error>(url, { method: "PATCH", ...options });

const POST = <Data = any, Error = any>(url: string, options?: Types.RequestOptions) =>
	REQUEST<Data, Error>(url, { method: "POST", ...options });

const PUT = <Data = any, Error = any>(url: string, options?: Types.RequestOptions) =>
	REQUEST<Data, Error>(url, { method: "PUT", ...options });

export default {
	STATUS_CODE,
	statusCode: STATUS_CODE,
	CUSTOM: REQUEST,
	custom: REQUEST,
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
