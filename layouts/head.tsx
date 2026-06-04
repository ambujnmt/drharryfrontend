// import React from "react";
// import NextHead from "next/head";

// import { siteConfig } from "@/config/site";

// export const Head = () => {
//   return (
//     <NextHead>
//       <title>{siteConfig.name}</title>
//       <meta key="title" content={siteConfig.name} property="og:title" />
//       <meta content={siteConfig.description} property="og:description" />
//       <meta content={siteConfig.description} name="description" />
//       <meta
//         key="viewport"
//         content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
//         name="viewport"
//       />
//       <link href="/favicon.ico" rel="icon" />
//     </NextHead>
//   );
// };

import React from "react";
import NextHead from "next/head";
import { siteConfig } from "@/config/site";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title, description }: HeadProps) => {
  const fullTitle = title || siteConfig.name;
  const metaDescription = description || siteConfig.description;

  return (
    <NextHead>
      <title>{fullTitle}</title>
      <meta key="title" content={fullTitle} property="og:title" />
      <meta content={metaDescription} property="og:description" />
      <meta content={metaDescription} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link rel="icon" href="/logoBlue.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
};
