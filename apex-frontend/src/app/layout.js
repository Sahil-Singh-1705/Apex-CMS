// import { Inter } from "next/font/google";
// import ModalProvider from "@/components/providers/ModalProvider";
// import PreviewProvider from "@/components/providers/PreviewProvider";

// import "./globals.css";

// import Script from "next/script";

// import { LanguageProvider } from "@/components/providers/LanguageProvider";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></Script>

//         <LanguageProvider>
//           <PreviewProvider>{children}</PreviewProvider>
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }

import { Inter } from "next/font/google";
import ModalProvider from "@/components/providers/ModalProvider";
import PreviewProvider from "@/components/providers/PreviewProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Script from "next/script";
import AOSProvider from "@/components/providers/AOSProvider"; // Import AOSProvider

import "./globals.css"; // Ensure correct CSS path
import "../../public/custom";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/images/apex-cms-logo01.png" type="image/png" />

        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

        {/* Animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* International Telephone Input */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/css/intlTelInput.css"
        />

        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {/* AOS Initialization */}
        {/* <AOSProvider /> */}

        {/* Scripts for jQuery and Bootstrap JS */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        <Script
          src="https://s3.tradingview.com/tv.js"
          strategy="afterInteractive"
        />

        <LanguageProvider>
          <PreviewProvider>
            <AOSProvider>{children}</AOSProvider>
          </PreviewProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
