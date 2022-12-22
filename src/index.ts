import methods from "./methods";
import request from "./request";
import session from "./session";
import statusCode from "./statusCode";

export * from "./methods";
export * from "./request";
export * from "./session";
export * from "./statusCode";

export default {
	CUSTOM: request,
	custom: request,
	...methods,
	STATUS_CODE: statusCode,
	statusCode,
	Session: session,
};
