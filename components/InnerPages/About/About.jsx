import React from 'react'
import About from '../../Main/HomeSections/About'
import BreadCrumb from '../../Breadcrumb/BreadCrumb'

export default function AboutComponent() {
  return (
    <div>
      <BreadCrumb
              title="About Us"
              breadcrumb={[
                "Home",
                "About Us",
              ]}
            />
      <About/>
    </div>
  )
}
