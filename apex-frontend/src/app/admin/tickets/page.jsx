import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import TicketTable from '@/components/admin/ui/TicketTable';

const page = async () => {
  const token = cookies().get('token');
  
  if (!token) {
    return redirect("/apx-admin/login");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ticket/get`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    cache: 'no-store' 
  });

  const data = await response.json();

  return (
    <div>
      <TicketTable tickets={data?.tickets || []} />
    </div>
  );
};

export default page;
