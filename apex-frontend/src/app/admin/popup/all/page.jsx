import PopupTable from '@/components/admin/ui/PopupTable'
import { redirect } from "next/navigation";
import {cookies} from 'next/headers';
const page = async() => {
  const token = cookies().get('token');
  if (!token) {
    return redirect("/apx-admin/login");
  }

  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/popup/all` , {

    headers:
     {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
  },{cache: 'no-store'});
 
 let  data = await response.json();
 


  

  return (
    <div><PopupTable  token={token?.value} data={data?.popup}/></div>
  )
}

export default page