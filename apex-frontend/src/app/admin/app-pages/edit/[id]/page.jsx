import SectionEditor from "@/components/admin/editor/SectionEditor";
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const token = cookies().get('token');
  if (!token) {
    return redirect("/apx-admin/login");
  }
  const response = await fetch(

    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/editor/${params.id}`,{
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`
      },
    },{ cache: 'no-store' }
  );
  let data = await response.json();
  //  console.log(response)
  return (
    <>
      <div className='' style={{ padding: "10px" }}>
        <SectionEditor token={token?.value} type='update'   rowData={data} />
      </div>
    </>
  );
};

export default Page;
