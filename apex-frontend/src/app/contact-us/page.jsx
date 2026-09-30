import Contact_form from '@/components/Contact_form'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Office from '@/components/Office';

export async function generateMetadata() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=contact-us`
  );

  let data = await response.json();
  if (data?.success) {
    return {
      title: data?.data?.name,
      description: data?.data?.description,
      keywords: data?.data?.keyword?.split(","),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/contact-us`,
      },
      openGraph: {
        title: data?.data?.name,
        description: data?.data?.description,
        type: "website",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/contact-us`,
        site_name: "ts Capitals",
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
const page = async() => {
    const headerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/1`,{ cache: 'no-store' }
      );
      
      let headerData = await headerResponse.json();
     
       const footerResponse =await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/6`,{ cache: 'no-store' }
      );
      
      let FooterData = await footerResponse.json();
  return (
    <div>
         <Header data={headerData?.data} />
      
        <Contact_form/>
        <Office/>
<Footer data={FooterData?.data} />
    </div>
  )
}

export default page