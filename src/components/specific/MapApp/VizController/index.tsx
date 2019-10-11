import React from "react"
import TimeLine from "./Timeline"
import LeafletMap from "./LeafletMap"
import AppLayout from "./AppLayout"

const VizController = () => {
  return (
    <>
      <AppLayout
        leftCol={<TimeLine></TimeLine>}
        middleCol={<LeafletMap></LeafletMap>}
      ></AppLayout>
    </>
  )
}

export default VizController
