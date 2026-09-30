import AppTable from "@/components/admin/ui/AppTable";
import { redirect } from "next/navigation";


import {cookies} from 'next/headers';

const AllPages = async () => {
  const token = cookies().get('token');



 
  if (!token) {
    return redirect("/apx-admin/login");
  }
  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/all`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
  },{ cache: 'no-store' });

  response = await response.json();

  return (
    <>
      <AppTable  token={token?.value} datas={response.data} />
    </>
  );
};

export default AllPages;
