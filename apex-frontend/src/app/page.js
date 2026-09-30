import PageRender from "@/components/PageRender";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export async function generateMetadata() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=/`,
    { cache: "no-store" }
  );

  const data = await response.json();

  if (data?.success) {
    return {
      title: data?.data?.name,
      description: data?.data?.description,
      keywords: data?.data?.keyword?.split(","),

      openGraph: {
        title: data?.data?.name,
        description: data?.data?.description,
        type: "website",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        site_name: "Apex CMS",
        modifiedTime: data?.data?.updated_at,
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


// =========================
// HEADER
// =========================

const fetchHeaders = async () => {
  const [
    headerEnglish,
    headerChinese,
    headerJapanese,
    headerKorean,
    headerArabic,
  ] = await Promise.all([
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

  const [
    headerEn,
    headerZh,
    headerJa,
    headerKo,
    headerAr,
  ] = await Promise.all([
    headerEnglish.json(),
    headerChinese.json(),
    headerJapanese.json(),
    headerKorean.json(),
    headerArabic.json(),
  ]);

  return [
    headerEn, // 0 = English
    headerZh, // 1 = Chinese
    headerJa, // 2 = Japanese
    headerKo, // 3 = Korean
    headerAr, // index 4 = Arabic
  ];
};


// =========================
// FOOTER
// =========================

const fetchFooters = async () => {
  const [
    footerEnglish,
    footerChinese,
    footerJapanese,
    footerKorean,
    footerArabic,
  ] = await Promise.all([
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

  const [
    footerEn,
    footerZh,
    footerJa,
    footerKo,
    footerAr,
  ] = await Promise.all([
    footerEnglish.json(),
    footerChinese.json(),
    footerJapanese.json(),
    footerKorean.json(),
    footerArabic.json(),
  ]);

  return [
    footerEn, // 0 = English
    footerZh, // 1 = Chinese
    footerJa, // 2 = Japanese
    footerKo, // 3 = Korean
    footerAr, // index 4 = Arabic
  ];
};


// =========================
// FOOTER SETTINGS
// =========================

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


// =========================
// HOME PAGE
// =========================

const page = async () => {

  const [
    headers,
    footers,
    footerSettings,
    response,
  ] = await Promise.all([
    fetchHeaders(),
    fetchFooters(),
    fetchFooterSettings(),

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=/`,
      { cache: "no-store" }
    ),
  ]);

  const data = await response.json();

  return (
    <>
      <PageRender
        data={data}
        headers={headers}
        footers={footers}
        footerSettings={footerSettings}
      />
    </>
  );
};

export default page;