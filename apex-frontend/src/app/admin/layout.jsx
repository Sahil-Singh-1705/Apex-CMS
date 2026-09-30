import AdminLayout from "@/components/admin/pannel/AdminLayout";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import checkCurrentProfile from "@/hooks/checkCurrentProfile";
import TestProvider from "@/components/providers/TestProvider";
import ModalProvider from "@/components/providers/ModalProvider";

async function MainAdminLayout({ children }) {
  let token = cookies().get("token");
  // const success = await checkCurrentProfile(token?.value);
  // console.log(token);
  if (!token) {
    return redirect("/apx-admin/login");
  }
  // let checktoken = true;

  // jwt.verify(token, process.env.NEXT_APP_JWT_SECRET_KEY, async (err, data) => {
  //   if (err) {
  //     checktoken = false;
  //   }
  // });
  // if (!checktoken) {
  //   return redirect("/apx-admin/login");
  // }

  return (
    <AdminLayout>
      <TestProvider>
        <ModalProvider>{children}</ModalProvider>
      </TestProvider>
    </AdminLayout>
  );
}

export default MainAdminLayout;
