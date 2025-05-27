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
    </NextHead>
  );
};
