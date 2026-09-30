import PageRender from "@/components/PageRender";
import Redirect from "@/components/Redirect";
import Structure from "@/components/Structure";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export async function generateMetadata({ params }) {
  const slug = params.pageOne?.join("/") || "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=${slug}`,
    {
      cache: "no-store",
    }
  );

  let data = await response.json();

  if (data?.success) {

    return {
      title: data?.data?.name,
      description: data?.data?.description,
      keywords: data?.data?.keyword?.split(","),
      alternates: {
        canonical:
          `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`,
      },
      openGraph: {
        title: data?.data?.name,
        description: data?.data?.description,
        type: "website",
        locale: "en_US",
        url:
          `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`,
        site_name: "Apex CMS",
      },
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
  const [headerEnglish, headerChinese, headerJapanese, headerKorean, headerArabic] =
    await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/1`,
        { cache: "no-store" }
      ),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/3`,
        { cache: "no-store" }
      ),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/5`,
        { cache: "no-store" }
      ),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/7`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/9`,
        { cache: "no-store" }
      ),
    ]);

  const [headerEn, headerZh, headerJa, headerKo, headerAr] =
    await Promise.all([
      headerEnglish.json(),
      headerChinese.json(),
      headerJapanese.json(),
      headerKorean.json(),
      headerArabic.json(),
    ]);

  return [
    headerEn, // index 0 = English
    headerZh, // index 1 = Chinese
    headerJa, // index 2 = Japanese
    headerKo, // index 3 = Korean
    headerAr, // index 4 = Arabic
  ];
};

const fetchFooterSettings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/footer/footer`,
      { cache: "no-store" }
    );

    const result = await res.json();

    return result?.data || {};

  } catch (error) {
    console.error("Footer fetch error:", error);
    return {};
  }
};

const fetchFooters = async () => {
  const [footerEnglish, footerChinese, footerJapanese, footerKorean, footerArabic] =
    await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/2`,
        { cache: "no-store" }
      ),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/4`,
        { cache: "no-store" }
      ),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/6`,
        { cache: "no-store" }
      ),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/8`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/10`,
        { cache: "no-store" }
      ),
    ]);

  const [footerEn, footerZh, footerJa, footerKo, footerAr] =
    await Promise.all([
      footerEnglish.json(),
      footerChinese.json(),
      footerJapanese.json(),
      footerKorean.json(),
      footerArabic.json(),
    ]);

  return [
    footerEn, // index 0 = English
    footerZh, // index 1 = Chinese
    footerJa, // index 2 = Japanese
    footerKo, // index 3 = Korean
    footerAr, // index 4 = Arabic
  ];
};


// let response1 = await fetch(
//   `${process.env.NEXT_PUBLIC_API_URL}/api/allblogs`,
//   { cache: "no-store" }
// );
// let blog = await response1.json();


const page = async ({ params }) => {

  const slug = params.pageOne?.join("/") || "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=${slug}`,
    {
      cache: "no-store",
    }
  );

  let data = await response.json();

  if (!data?.success || data?.data?.published !== 1) {
    return <Redirect type="home" />;
  } else {

    const headers = await fetchHeaders();
    const footers = await fetchFooters();
    const footerSettings = await fetchFooterSettings();
    // const popupResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/popup/allpublished`,
    //   { cache: "no-store" }
    // );
    // let popupData = await popupResponse.json();
    // console.log("bab", popupData);
    // const companydetails = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getcompanydetail`,{ cache: 'no-store' });
    // let  companydata = await companydetails.json();
    return (
      <>
        {/* <Structure
          path={params.pageOne+"/"}
          title={data?.data?.name}
          description={data?.data?.description}
        /> */}

        <PageRender
          data={data}
          headers={headers}
          footers={footers}
          footerSettings={footerSettings}
        // blog={blog}
        // popupData={popupData}
        // companydata={companydata[0]}
        />
      </>
    );
  }
};
export default page;

