import { cookies } from "next/headers";

const checkCurrentProfile = async (token) => {

  if (!token) {
    return false;
  }

  // console.log(token);

  const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const allPages = await response.json();

  // console.log(allPages);

  if (allPages.success) {
    return true;
  }
  return false;
};

export default checkCurrentProfile;
