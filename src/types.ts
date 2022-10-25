export interface RequestOptions extends Omit<RequestInit, "body"> {
	body?: Record<string | number, any> | BodyInit | null;
	cookies?: Record<string, string | number | boolean | null | undefined>;
	params?: Record<string | number, string | number | boolean | null | undefined>;
	response?: "arrayBuffer" | "blob" | "formData" | "json" | "text" | "none";
}
