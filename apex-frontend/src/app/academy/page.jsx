

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Academy from "@/components/Academy";
// import Structure from "@/components/Structure";
// export async function generateMetadata() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=blog`
//   );

//   let data = await response.json();
//   if (data?.success) {
//     return {
//       title: data?.data?.name,
//       description: data?.data?.description,
//       keywords: data?.data?.keyword?.split(","),
//       alternates: {
//         canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
//       },
//       openGraph: {
//         title: data?.data?.name,
//         description: data?.data?.description,
//         type: "website",
//         locale: "en_US",
//         url: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
//         site_name: "ts Capitals",
//       },
//       robots: {
//         index: true,
//         follow: true,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//         "max-video-preview": -1,
//       },
      
//     };
//   }
// }
const fetchHeaders = async () => {
  const headerEnglish = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/1`,
    { cache: "no-store" }
  );
  // const headerHindi = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/1`,
  //   { cache: "no-store" }
  // );
  // const headerFarsi = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/2`,
  //   { cache: "no-store" }
 // );

  // Resolve all responses and parse them as JSON
  const [headerEn, headerHi, headerFa] = await Promise.all([
    headerEnglish.json(),
    // headerHindi.json(),
    // headerFarsi.json(),
  ]);

  // Combine the headers into a single array
  const headers = [headerEn,
    //  headerHi, headerFa
    ];

  return headers;
};
const fetchFooters = async () => {
    const footerEnglish = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/2`,
    )
    // const footerHindi = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/5`,
    // )
    // const footerFarsi = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/6`,
    // )
  
    // Resolve all responses and parse them as JSON
    const [footerEn
      // , footerHi, footerFa
    ] = await Promise.all([
      footerEnglish.json(),
      // footerHindi.json(),
      // footerFarsi.json(),
    ]);
  
    // Combine the headers into a single array
    const footer = [footerEn
      // , footerHi, footerFa
    ];
  
    return footer;
}
const page = async () => {
  const headers = await fetchHeaders();
  const footers = await fetchFooters();
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/allblogs`,
    { cache: "no-store" }
  );
  let data = await response.json();

  return (
     <>
       {/* <Structure
          path={"blog/"}
          title={data?.data?.name}
          description={data?.data?.description}
        /> */}
    <div>
      <Header headers={headers} />

      <Academy data={data}  />
       <Footer footers={footers}     />
    </div>
    </>
  );
};

export default page;
