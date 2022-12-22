import { DELETE, GET, HEAD, PATCH, POST, PUT } from "./methods";
import { REQUEST } from "./request";
import { Session } from "./session";
import { STATUS_CODE } from "./statusCode";

export * from "./methods";
export * from "./request";
export * from "./session";
export * from "./statusCode";

export default {
	CUSTOM: REQUEST,
	custom: REQUEST,
	DELETE,
	delete: DELETE,
	GET,
	get: GET,
	HEAD,
	head: HEAD,
	PATCH,
	patch: PATCH,
	POST,
	post: POST,
	PUT,
	put: PUT,
	STATUS_CODE,
	statusCode: STATUS_CODE,
	Session,
};
