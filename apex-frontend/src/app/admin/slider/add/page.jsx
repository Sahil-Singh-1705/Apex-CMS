
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";
import PopupEditor from '@/components/admin/editor/PopupEditor';
import SliderEditor from '@/components/admin/editor/SliderEditor';

const page = async() => {
    const token = cookies().get('token');
  
    if (!token) {
      return redirect("/apx-admin/login");
    }
  
           
  return (
    <div><SliderEditor token={token?.value} type="add"/></div>
  )
}

export default page