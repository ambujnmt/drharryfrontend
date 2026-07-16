import React, { useState } from "react";
import Header from "../../../components/Menu/Header";
import Footer from "../../../components/Menu/Footer";
import Courses from "../../../components/InnerPages/Courses/Courses";
import Terms from "../../../components/InnerPages/CMS/Terms";

export default function courses() {
    return (
        <>
            <Header /> 
            <Terms />  
            <Footer /> 
        </>
    );
}
