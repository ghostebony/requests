import { object } from "@ghostebony/utils";
import type { RequestOptions } from "./types";

export const REQUEST = async <ResponseData = any, ResponseError = any>(
	url: string,
	options: RequestOptions = {}
): Promise<
	| { data: ResponseData; error: undefined; ok: true; status: number; headers: Headers }
	| { data: undefined; error: ResponseError; ok: false; status: number; headers: Headers }
> => {
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

	let responseBody = null;

	if (response.headers.has("content-type")) {
		responseBody =
			options.response !== "none"
				? await response[options.response ?? "json"]()
				: response.body;
	}

	if (response.ok) {
		return {
			data: responseBody as ResponseData,
			error: undefined,
			ok: true,
			status: response.status,
			headers: response.headers,
		};
	}

	return {
		data: undefined,
		error: responseBody as ResponseError,
		ok: false,
		status: response.status,
		headers: response.headers,
	};
};

export { REQUEST as request };

export default REQUEST;
