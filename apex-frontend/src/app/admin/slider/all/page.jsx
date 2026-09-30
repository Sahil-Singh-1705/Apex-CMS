import PopupTable from "@/components/admin/ui/PopupTable";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SliderTable from "@/components/admin/ui/SliderTable";
const page = async () => {
  const token = cookies().get("token");
  if (!token) {
    return redirect("/apx-admin/login");
  }

  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/slider/all`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
    },
    { cache: "no-store" }
  );

  let data = await response.json();

  return (
    <div>
      <SliderTable token={token?.value} data={data?.slider} />
    </div>
  );
};

export default page;
