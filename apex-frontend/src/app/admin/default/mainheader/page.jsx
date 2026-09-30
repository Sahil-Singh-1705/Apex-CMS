import MainHeader from "@/components/admin/editor/MainHeaderEditor";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MainHeaderPage = async () => {
  // Get token from cookies
  const token = cookies().get("token");

  // Redirect if not logged in
  if (!token?.value) {
    return redirect("/apx-admin/login");
  }

  // Base URL fallback (VERY IMPORTANT)
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  let allPages = [];

  try {
    const pageResponse = await fetch(
      `${BASE_URL}/api/admin/pages/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        cache: "no-store", // for dynamic CMS data
      }
    );

    // Handle non-200 responses
    if (!pageResponse.ok) {
      console.log("API ERROR:", pageResponse.status);
      return redirect("/apx-admin/login");
    }

    // Parse JSON safely
    allPages = await pageResponse.json();

  } catch (error) {
    console.log("FETCH ERROR:", error);
    // Optional: redirect or show empty UI
  }

  return (
    <MainHeader token={token.value} allPages={allPages} />
  );
};

export default MainHeaderPage;