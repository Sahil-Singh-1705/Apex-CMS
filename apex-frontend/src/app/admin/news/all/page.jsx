import React from 'react'
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";
import BlogTable from '@/components/admin/ui/BlogTable';

const page = async () => {
    const token = cookies().get('token');
  
    if (!token) {
        return redirect("/apx-admin/login");
      }

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs` , {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      },{ cache: 'no-store' });
     
     let  data = await response.json();
    //  console.log(data);
      
  return (
    <div >
      <BlogTable  token={token?.value} datas={data}/>
    </div>
  )
}

export default page