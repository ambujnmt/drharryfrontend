import { HeroUIProvider } from "@heroui/system";
import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { LanguageProvider } from "../context/LanguageContext";
import { UserProvider } from "../context/UserContext";
// import { getWebsiteData } from "../service/apiFetch";
import '../styles/globals.css';
 const Snackbar = dynamic(() => import('@/components/utils/Snackbar'), { ssr: false });



function App({ Component, pageProps, websiteData }) {
  const router = useRouter()

  return (
    <LanguageProvider>
    <UserProvider> {/* ✅ Wrap everything inside UserProvider */}
      <HeroUIProvider navigate={router.push}>
        <DefaultLayout websiteData={websiteData}>
          <Component {...pageProps} />
        </DefaultLayout>
        <Snackbar />
      </HeroUIProvider>
    </UserProvider>
  </LanguageProvider>
  );
}

// App.getInitialProps = async () => {
//   const websiteData = await getWebsiteData('65589cd533555354912975cd');
//   function rearrangeScripts(scripts) {
//     return scripts.map(script => {
//       const { innerHTML, ...attributes } = script; // Separate innerHtml from other keys
//       return {
//         attributes,
//         innerHTML: innerHTML || null, // Ensure innerHtml exists, default to null
//       };
//     });
//   }
//   if(websiteData?.website?.script?.length){
//     websiteData.website.script = rearrangeScripts(websiteData.website.script)

//   }
//   return { websiteData };
// };

export default App;