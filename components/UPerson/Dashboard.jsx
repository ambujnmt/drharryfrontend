import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeartAndBloodSupport from "./HeartAndBloodSupport/HeartAndBloodSupport";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";
import Services from "./Services/Services";
import LatestData from "./LatestData/LatestData";


export default function Dashboard() {

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);


  return (
    <div className="w-full bg-gray-100 md:p-6 p-0">
      <Head title="Dashboard" />

<HeartAndBloodSupport/>
<UpcomingEvents/>
<Services/>
<LatestData/>
    </div>
  );
}