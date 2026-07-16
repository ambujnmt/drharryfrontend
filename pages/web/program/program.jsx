import React, { useState } from "react";
import Header from "../../../components/Menu/Header";
import Footer from "../../../components/Menu/Footer";
import Courses from "../../../components/InnerPages/Courses/Courses";
import ProgramComponent from "../../../components/InnerPages/Program/Program";

export default function courses() {
    return (
        <>
            <Header /> 
            <ProgramComponent />  
            <Footer /> 
        </>
    );
}
