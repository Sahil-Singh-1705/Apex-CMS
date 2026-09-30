
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";

import SliderEditor from '@/components/admin/editor/SliderEditor';

const page = async ({ params }) => {
    const token = cookies().get('token');
  
    if (!token) {
      return redirect("/apx-admin/login");
    }
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/slider/single/${params.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    },
    { cache: "no-store" }
  );
  let data = await response.json();
  
  //  console.log(data)
 
  return (
    <div><SliderEditor token={token?.value} rowData={data?.slider} type="edit"   /></div>
  )
}

export default page