import ContactTable from '@/components/admin/ui/ContactTable'
import React from 'react'
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";
import QueryTable from '@/components/admin/ui/QueryTable';
const page = async() => {
    const token = cookies().get('token');
    // console.log(token);
    if (!token) {
        return redirect("/apx-admin/login");
      }

      let response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/queries/get`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      },{ cache: 'no-store' });
     
     let  data = await response.json();
      // console.log(data);
  return (
    <div><QueryTable token={token?.value} data={data}/></div>
  )
}

export default page