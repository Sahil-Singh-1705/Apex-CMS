import BlogEditor from "@/components/admin/editor/BlogEditor";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const token = cookies().get("token");
  if (!token) {
    return redirect("/apx-admin/login");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getblogs/${params.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    },
    { cache: "no-store" }
  );
  let data = await response.json();

  // console.log(data);
  let responses = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category/get-category`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    },
    { cache: "no-store" }
  );

    let category_list = await responses.json();
  return (
    <>
      <div className="" style={{ padding: "10px" }}>
        <BlogEditor token={token?.value} type="update" rowData={data?.data} category_list={category_list} />
      </div>
    </>
  );
};

export default Page;
