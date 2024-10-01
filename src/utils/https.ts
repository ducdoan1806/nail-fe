import https from "https";
import fetch, { RequestInit as NodeFetchRequestInit } from "node-fetch";

// Định nghĩa interface cho RequestInit
interface CustomRequestInit extends NodeFetchRequestInit {
  agent?: https.Agent; // Thêm agent như một thuộc tính tùy chọn
}

// Hàm gọi API chung
export default async function fetchHttps<T>(
  url: string,
  init?: CustomRequestInit
): Promise<T> {
  const agent = new https.Agent({ rejectUnauthorized: false });

  const options: CustomRequestInit = { ...init, agent };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    // Use type assertion to tell TypeScript that the returned data will be of type T
    const data = (await res.json()) as T;
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
