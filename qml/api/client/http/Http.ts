import { Settings } from "store/Settings";

type HTTPRequest = {
    method: string
    path: string
    headers?: Record<string, string | number>
    body?: string
};

export const Http = {
    request<T = unknown>(request: HTTPRequest, callback: (error: Error | null, response: T) => void) {
        const method = request.method.toUpperCase();

        const xhr = new XMLHttpRequest();

        request.headers && Object.keys(request.headers).forEach(key => {
            xhr.setRequestHeader(key, request.headers![key] + "")
        });

        xhr.onload = () => callback(null, xhr.response);

        xhr.open(method, request.path);
        xhr.send(request.body);
    },
};

export type Http = typeof Http;