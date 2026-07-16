import React, { useState } from "react";
import Header from "../../../components/Menu/Header";
import Footer from "../../../components/Menu/Footer";
import MembershipComponent from "../../../components/InnerPages/MemberShip/Membership";

export default function courses() {
    return (
        <>
            <Header /> 
            <MembershipComponent />  
            <Footer /> 
        </>
    );
}
