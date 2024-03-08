export const fetchServer = async <T>(url: string, options?: RequestInit) =>
    await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Wibbo/1.0; +https://wibbo.org/)' }, ...options }).then((res) => res.json()) as T
