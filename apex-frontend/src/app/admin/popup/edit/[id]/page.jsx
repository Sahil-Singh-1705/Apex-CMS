
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";
import PopupEditor from '@/components/admin/editor/PopupEditor';

const page = async ({ params }) => {
    const token = cookies().get('token');
  
    if (!token) {
      return redirect("/apx-admin/login");
    }
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/popup/single/${params.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    },
    { cache: "no-store" }
  );
  let data = await response.json();
  
  const pageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/all`,{
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`
    }
  },{ cache: 'no-store' });
    let allPages = await pageResponse.json();
 
  return (
    <div><PopupEditor token={token?.value} rowData={data?.popup} type="edit"   pages={allPages}/></div>
  )
}

export default page