import React from 'react'
import ChoosePlan from "../../Main/HomeSections/ChoosePlan"
import BreadCrumb from '../../Breadcrumb/BreadCrumb'

export default function MembershipComponent() {
  return (
    <div>
               <BreadCrumb
                                  title="Membership Plans"
                                  breadcrumb={[
                                    "Home",
                                    "Membership Plans",
                                  ]}
                                />
      <ChoosePlan/>
    </div>
  )
}
