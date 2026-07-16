import React, { useState } from "react";
import Header from "../../../components/Menu/Header";
import Footer from "../../../components/Menu/Footer";
import Courses from "../../../components/InnerPages/Courses/Courses";
import PrivacyPolicy from "../../../components/InnerPages/CMS/PrivacyPolicy";

export default function courses() {
    return (
        <>
            <Header /> 
            <PrivacyPolicy />  
            <Footer /> 
        </>
    );
}
