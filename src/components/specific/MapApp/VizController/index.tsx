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
    },
    {
        title: "test03",
        date: undefined,
        lMarker: {
            x:6,
            y:8,
            popUpContent: "hi",
            group: "deserteure"
        },
        primSource: "Augustus",
        secSource: "Rostovzef"
    }
] 


interface Props {
    vizEvents?: VizEvent[]
}

const VizController: React.FC<Props> = ({vizEvents = dummyData}) => {

  const [leafletInitialized, setLeafletInitialized] = useState<boolean>(false);
  const [refVizEvents, setRefVizEvents] = useState<VizEvent[] | undefined>(undefined);

  const [layer, setLayer] = useState<any | undefined>(undefined)

  const getLeafletStatus = (mapInitialized: boolean, dataLoaded: boolean): void => {
    let isInitialized = mapInitialized && dataLoaded;
    setLeafletInitialized(isInitialized)
  }

  useEffect( () =>{
    if(leafletInitialized){

        //Start operations here -- create Leaflet markers! // then draw markers to map?
        generateMapLayer()


    }
  },[leafletInitialized])

  const generateMapLayer = () => {
    let layer = window.L.layerGroup();
    
    vizEvents.forEach((vizEvent: VizEvent, index) => {
      let marker = vizEvent.lMarker  
      try {
        let leafletMarker = generateLMarker(vizEvent)
      
        //references
        vizEvent.lMarker.lMarkerRef = leafletMarker;
        leafletMarker.boundTo = marker; 

        leafletMarker.addTo(layer)
      } catch(e) {
        console.error("error in generating a marker.")
        console.error(e);
        //TODO better error handling!
      }
    });

    setRefVizEvents(() => lodash.cloneDeep(vizEvents))
    setLayer(layer);
  }

  const generateLMarker = (vizEvent: VizEvent): any => {
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
        leftCol={<TimeLine TLEvents={refVizEvents}></TimeLine>}
        middleCol={
        <LeafletMap
            layerToDraw={layer}
            //leafletMarkers={vizEvents}
            tellLStatus={getLeafletStatus}
        ></LeafletMap>}
      ></AppLayout>
    </>
  )
}

export default VizController
