const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers ?? {}),
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message ?? "요청 처리 중 오류가 발생했습니다.");
  }

  return payload?.data ?? null;
}

export const api = {
  get(path) {
    return request(path);
  },
  post(path, body, options = {}) {
    return request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    });
  },
};
