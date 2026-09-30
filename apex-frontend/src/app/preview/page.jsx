
import Test from "@/components/Test";
import '../globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/endpoint?endpoint=/`,{ cache: 'no-store' }
  );
  const headers = await fetchHeaders();
  const footers = await fetchFooters();
  let data = await response.json();
  
   

  return <Test  data={data}  headers={headers}
  footers={footers}  />;
};

export default page;
