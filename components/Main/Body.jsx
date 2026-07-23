import React from 'react'
import Hero from './HomeSections/Hero';
import About from './HomeSections/About';
import ClinicLibrary from './HomeSections/ClinicLibrary';
import Faculty from './HomeSections/Faculty';
import EducationalPrograms from './HomeSections/EducationalPrograms';
import WhyChoose from './HomeSections/WhyChoose';
import ChoosePlan from './HomeSections/ChoosePlan';
import VideoSection from './HomeSections/VideoSec';
import EnrollmentProcess from './HomeSections/EnrollmentProcess';
import RegisterForm from './HomeSections/RegisterForm';
import Testimonials from './HomeSections/Testimonials';

export default function Body() {


  return (
    <div

    >
      <Hero />
      <About />
      <EducationalPrograms />
      <WhyChoose />
      <ClinicLibrary />
      <Faculty />
      <EnrollmentProcess/>
      <RegisterForm/>
      {/* <ChoosePlan /> */}
      <VideoSection />
      <Testimonials/>
    </div>
  );
}
