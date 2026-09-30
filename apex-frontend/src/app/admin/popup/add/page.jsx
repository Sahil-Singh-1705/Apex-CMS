
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";
import PopupEditor from '@/components/admin/editor/PopupEditor';

const page = async() => {
    const token = cookies().get('token');
  
    if (!token) {
      return redirect("/apx-admin/login");
    }
    const pageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/all`,{
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`
      }
    },{ cache: 'no-store' });
    const allPages = await pageResponse.json();
           
  return (
    <div><PopupEditor token={token?.value} type="add" pages={allPages}/></div>
  )
}

export default page