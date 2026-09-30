export const logError = async (error, context = "") => {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const res = await fetch(`${API}/api/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: error?.message || "Unknown error",
        stack: error?.stack || "",
        context,
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    });

    if (!res.ok) {
      // no console spam
    }
  } catch (e) {
    // ❌ DO NOTHING (silent fail)
    // Never break UI for logging failure
  }
};
