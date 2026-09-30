import React from 'react'
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";

import BlogEditor from '@/components/admin/editor/BlogEditor';
const page = async() => {
    const token = cookies().get('token');
  
    if (!token) {
      return redirect("/apx-admin/login");
    }


      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/get-category`, {
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`
        },
      },{ cache: 'no-store' });
      
    
       response = await response.json();
    return (
      <>
        <div  style={{ padding: "10px" }}>
          <BlogEditor token={token?.value} type="add"  category_list={response}/>
        </div>
      </>
    );
}
export default page;