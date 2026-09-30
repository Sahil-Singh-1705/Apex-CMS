import SectionEditor from "@/components/admin/editor/SectionEditor";
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";

const Page = () => {
  const token = cookies().get('token');
  console.log("token-------",token)
  if (!token) {
    return redirect("/apx-admin/login");
  }
  return (
    <>
      <div className="" style={{ padding: "10px" }}>
        <SectionEditor token={token?.value} type="add" />
      </div>
    </>
  );
};

export default Page;
