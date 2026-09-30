import SignIn from "@/components/LogIn";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import checkCurrentProfile from "@/hooks/checkCurrentProfile";

const Login = async () => {
  let token = cookies().get("token");
  const success = await checkCurrentProfile(token?.value);

  if (token) {
    return redirect("/admin/app-pages/add");
  }

  return (
    <>
      <SignIn />
    </>
  );
};
export default Login;
