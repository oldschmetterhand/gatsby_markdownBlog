import React, {useState, useEffect} from "react"
import TimeLine from "./Timeline"
import LeafletMap from "./LeafletMap"
import AppLayout from "./AppLayout"

const VizController = () => {

  const [leafletInitialized, setLeafletInitialized] = useState<boolean>(false);

  const getLeafletStatus = (mapInitialized: boolean, dataLoaded: boolean): void => {
    setLeafletInitialized(mapInitialized)
  }

  useEffect( () =>{
    if(leafletInitialized){

        //Start operations
        console.log("LEAFLET NOW INITED");

    }
  },[leafletInitialized])

  return (
    <>
      <AppLayout
        leftCol={<TimeLine></TimeLine>}
        middleCol={
        <LeafletMap
            tellLStatus={getLeafletStatus}
        ></LeafletMap>}
      ></AppLayout>
    </>
  )
}

export default VizController
