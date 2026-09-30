import BlogRender from "@/components/BlogRender";
import Redirect from "@/components/Redirect";
import SignalRender from "@/components/SignalRender";
import Structure from "@/components/Structure";
import React from "react";
export async function generateMetadata({ params }) {
  // console.log(params.title.replace(/-/g, ''))
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getblog/${params.title}`,
    { cache: "no-store" }
  );

  let data = await response.json();

  if (data) {
    return {
      title: data?.data?.blog?.title + data?.data?.blog?.subtitle,
      description: data?.data?.blog?.description,
      keywords: data?.data?.blog?.keyword?.split(","),
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${params.title}`,
		},
      openGraph: {
        title: data?.data?.blog?.title + data?.data?.blog?.subtitle,
        description: data?.data?.blog?.description,
        type: "website",
        image: data?.data?.blog?.thumbnail_image,
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${params.title}`,
        site_name: "ts Capitals",
      },
     
      modifedTime: data?.data?.blog?.updated_at,
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      
    };
  }
}
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/4`,
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
const page = async ({ params }) => {
  // const router = useRouter();
  const headers = await fetchHeaders();
  const footers = await fetchFooters();

  //  console.log(data)
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getblog/${params.title}`,
    { cache: "no-store" }
  );
  let data = await response.json();

  if (!data?.data?.blog?.published && data?.data?.blog?.published !== "true") {
    return <Redirect type={"blogs"} />;
  } else {
    // console.log(data)
 
   
    return (
      <>
      {/* <Structure
          path={params.title+"/"}
          title={data?.data?.blog?.title + data?.data?.blog?.subtitle}
          description={data?.data?.blog?.description}
        /> */}
        <BlogRender
          data={data?.data?.blog}
          headers={headers}
          footers={footers}
        />
      </>
    );
  }
};

export default page;
