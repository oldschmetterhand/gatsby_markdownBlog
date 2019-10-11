import React, {useState, useEffect} from "react"
import TimeLine from "./Timeline"
import LeafletMap from "./LeafletMap"
import AppLayout from "./AppLayout"
import {VizEvent } from "../index"

const dummyData: VizEvent[] = [
    {
        title: "test01",
        date: undefined,
        lMarker: undefined,
        primSource: "Augustus",
        secSource: "Rostovzef"
    },
    {
        title: "test02",
        date: undefined,
        lMarker: undefined,
        primSource: "Augustus",
        secSource: "Rostovzef"
    }
] 


interface Props {
    vizEvents: VizEvent[]
}

const VizController: React.FC<Props> = ({vizEvents = dummyData}) => {

  const [leafletInitialized, setLeafletInitialized] = useState<boolean>(false);

  const getLeafletStatus = (mapInitialized: boolean, dataLoaded: boolean): void => {
    let isInitialized = mapInitialized && dataLoaded;
    setLeafletInitialized(isInitialized)
  }

  useEffect( () =>{
    if(leafletInitialized){

        //Start operations here -- create Leaflet markers! // then draw markers to map?
        


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
