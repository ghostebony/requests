export interface RequestOptions extends Omit<RequestInit, "body"> {
	body?: Record<string, any> | BodyInit | null;
	cookies?: Record<string, string | number | boolean>;
	params?: Record<string | number, string | number | boolean | undefined | null>;
	response?: "arrayBuffer" | "blob" | "formData" | "json" | "text" | "none";
}
