import React from 'react'
import EducationalPrograms from '../../Main/HomeSections/EducationalPrograms'
import BreadCrumb from '../../Breadcrumb/BreadCrumb'

export default function ProgramComponent() {
  return (
    <div>
              <BreadCrumb
                            title="Programs"
                            breadcrumb={[
                              "Home",
                              "Programs",
                            ]}
                          />
      <EducationalPrograms/>
    </div>
  )
}
