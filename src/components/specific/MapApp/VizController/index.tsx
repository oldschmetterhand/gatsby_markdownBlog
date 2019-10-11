import React, {useState, useEffect} from "react"
import TimeLine from "./Timeline"
import LeafletMap from "./LeafletMap"
import AppLayout from "./AppLayout"
import lodash from "lodash"
import {VizEvent, LeafletMarker } from "../index"

const dummyData: VizEvent[] = [
    {
        title: "test01",
        date: undefined,
        lMarker: {
            x:1,
            y:2,
            popUpContent: "hi",
            group: "deserteure"
        },
        primSource: "Augustus",
        secSource: "Rostovzef"
    },
    {
        title: "test02",
        date: undefined,
        lMarker: {
            x:4,
            y:5,
            popUpContent: "hi",
            group: "deserteure"
        },
        primSource: "Augustus",
        secSource: "Rostovzef"
    }
] 


interface Props {
    vizEvents: VizEvent[]
}

const VizController: React.FC<Props> = ({vizEvents = dummyData}) => {

  const [leafletInitialized, setLeafletInitialized] = useState<boolean>(false);
  const [refVizEvents, setRefVizEvents] = useState<VizEvent[] | undefined>(undefined)

  const getLeafletStatus = (mapInitialized: boolean, dataLoaded: boolean): void => {
    let isInitialized = mapInitialized && dataLoaded;
    setLeafletInitialized(isInitialized)
  }

  useEffect( () =>{
    if(leafletInitialized){

        //Start operations here -- create Leaflet markers! // then draw markers to map?
        


    }
  },[leafletInitialized])

  const createMapLayer = () => {
    let layer = window.L.layerGroup();
    
    vizEvents.forEach((vizEvent: VizEvent, index) => {

      try {
        let leafletMarker = createLMarker(vizEvent)
      
        //references
        vizEvent.lMarker.lMarkerRef = leafletMarker;
        leafletMarker.boundTo = marker; 

        leafletMarker.addTo(layer)
      } catch {
        console.debug("error in generating a marker.")
        //TODO better error handling!
        //
      }
    });

    setRefVizEvents(() => lodash.cloneDeep(vizEvents))

  }

  const createLMarker = (vizEvent: VizEvent): any => {
    let marker = vizEvent.lMarker;
    let leafletMarker = window.L.marker([marker.x, marker.y]).bindPopup(
        `<em>Kurztitel</em>: ${
          marker.popUpContent
        }.<br>Gruppe: ${marker.group}<hr> (Verwendete Koordinaten: Längengrad: ${marker.x.toString()}, Breitengrad: ${marker.y.toString()})`
      )
    return leafletMarker;
  }

  return (
    <>
      <AppLayout
        leftCol={<TimeLine></TimeLine>}
        middleCol={
        <LeafletMap
            leafletMarkers={undefined}
            //tellLStatus={refVizEvents}
        ></LeafletMap>}
      ></AppLayout>
    </>
  )
}

export default VizController
