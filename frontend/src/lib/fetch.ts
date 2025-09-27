//implement api methods using request
const BASEURL = import.meta.env.VITE_API_BASE_URL;

export type Http = {
    get: <T>(path: string) => Promise<T>;
    post: <T>(path: string, body: any) => Promise<T>;
    patch: <T>(path: string, body: any) => Promise<T>;
    delete: <T>(path: string) => Promise<T>;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(BASEURL + path, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    // read the response body as text instead of Response.json()
    // this allows us to return a typed object or throw an error
    const text = await res.text();
    const body = text ? JSON.parse(text) : undefined;
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${text}`);
    }
    return body as T;
};

// factory function to create api methods
export function createFetchHttp(): Http {
    return {
        get: <T>(path: string) => request<T>(path),
        post: <T>(path: string, body: any) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
        patch: <T>(path: string, body: any) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
        delete: <T>(path: string) => request<T>(path, {method: "DELETE"}),
    }
};
