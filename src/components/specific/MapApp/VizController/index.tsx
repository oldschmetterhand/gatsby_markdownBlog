import React, { useState, useEffect } from "react"
import TimeLine from "./Timeline"
import LeafletMap from "./LeafletMap"
import OpenLayersMap from "./OlMap"
import AppLayout from "./AppLayout"
import SearchNView from "./SearchNView"
import { VizEvent } from "../../../../types/mapp"

const dummyData: VizEvent[] = [
  {
    title: "test01",
    date: "04.05.2019",
    lonLat:[1,2],
    lMarker: {
      popUpContent: "hi",
      group: "deserteure",
    },
    primSource: "Augustus",
    secSource: "Rostovzef",
  },
  {
    title: "test02",
    date: "06.05.2019",
    lonLat:[4,5],
    lMarker: {
      popUpContent: "hi",
      group: "deserteure",
    },
    primSource: "Augustus",
    secSource: "Rostovzef",
  },
  {
    title: "test03",
    date: undefined,
    lonLat:[6,8],
    lMarker: {
      popUpContent: "hi",
      group: "deserteure",
    },
    primSource: "Augustus",
    secSource: "Rostovzef",
  },
]

interface Props {
  vizEvents?: VizEvent[]
  handleQueryBuilding?: (string) => void
  handleSearch?: () => void
}

const VizController: React.FC<Props> = ({ vizEvents = dummyData,handleQueryBuilding = undefined, handleSearch=undefined, originalFactoids=undefined }) => {
  const [leafletInitialized, setLeafletInitialized] = useState<boolean>(false)
  const [selVizEvent, setSelVizEvent] = useState<VizEvent | undefined>(
    undefined
  )
  const [layer, setLayer] = useState<any | undefined>(undefined)

  /**
   * Passed down to LeafletMap component, sets leafletInitialzed state to true
   * when component finishes initialization of the leaflet map.
   */
  const getLeafletStatus = (
    mapInitialized: boolean,
    dataLoaded: boolean
  ): void => {
    let isInitialized = mapInitialized && dataLoaded
    setLeafletInitialized(isInitialized)
  }

  /**
   * Start generating the MapLayer only when the Map
   * is completely initialized.
   */
  useEffect(() => {
    if (leafletInitialized) {
      generateMapLayer()
    }
  }, [leafletInitialized, vizEvents])

  /**
   * When selected VizEvent changes / synchronize all visualiations.
   * (Needed for imperative Leaflet)
   */
  useEffect(() => {
    if (!selVizEvent) return
    syncDisplay() //only needed for the leaflet markers
  }, [selVizEvent])

  /**
   * Generates Layer with Markers. Sets Layer state.
   * This state can be passed down to LeaflteMap copmonent
   * to handle rendering.
   */
  const generateMapLayer = () => {
    let layer = window.L.layerGroup()

    vizEvents.forEach((vizEvent: VizEvent, index: number) => {
      try {
        let leafletMarker = generateLMarker(vizEvent, index+1)

        //setting references -> will not trigger state updates
        vizEvent.lMarker.lMarkerRef = leafletMarker
        leafletMarker.boundTo = vizEvent

        //adding marker to layer
        leafletMarker.addTo(layer)
      } catch (e) {
        console.error("error in generating a marker.")
        console.error(e)
        //TODO better error handling!
      }
    })
    //finally add layer to map
    setLayer(layer)
  }

  /**
   * Own function for generating the Leaflet Markers. Drawing is handled
   * in LeafletMap component. This will just create instances without display.
   */
  const generateLMarker = (vizEvent: VizEvent, markerNumber: number): any => {
    let customMarker = {icon: window.L.divIcon({
      className: 'my-custom-icon',
      html: `<div style='width: 24px !important; height: 24px !important; margin-left: -6px;margin-top: 6px;border-radius: 18px;border: 2px solid #3F51B5;text-align: center;color: #3F51B5;background-color: #fff;font-size: 16px; font-size:1em; padding:.2em'>${markerNumber}</div>`
  })}

    let leafletMarker = window.L.marker(vizEvent.lonLat, customMarker).bindPopup(
      `<em></em> ${vizEvent.title}.<br>Datum: ${
        vizEvent.date
      }<hr> (Verwendete Koordinaten: Längengrad: ${vizEvent.lonLat})`
    )

    leafletMarker.on("click", evt => {
      let selVizEvent: VizEvent = evt.sourceTarget.boundTo
      //console.log(evt.sourceTarget.boundTo);
      handleSelVizEvent(selVizEvent)
    })
    return leafletMarker
  }

  /**
   * Handler function to set currently displayed VizEvent Object
   */
  const handleSelVizEvent = (vizEvent: VizEvent): void => {
    if(!vizEvent)setSelVizEvent(undefined);
    setSelVizEvent(vizEvent)
  }

  /**
   * Mainly needed for Leaflet. Syncy Visualizations for the currently
   * active Vizevent.
   */
  const syncDisplay = () => {
    //if (!selVizEvent.lMarker) return
    let linkedLMarker = selVizEvent.lMarker ? selVizEvent.lMarker : undefined
    if (linkedLMarker && linkedLMarker.lMarkerRef) {
      linkedLMarker.lMarkerRef.openPopup()
    } else {
      if(!selVizEvent.lonLat)alert(`Keine gültigen Geodaten vorhanden.`)
    }
  }

  const handlePopupClose = (lMap: any) => {
    lMap.closePopup();
  }

  return (
    <>
      <AppLayout
        leftCol={<SearchNView handleVizSelection={handleSelVizEvent} vizEvents={vizEvents} handleQueryBuilding={handleQueryBuilding} selVizEvent={selVizEvent} handleSearch={handleSearch}></SearchNView>}
        middleCol={
          <>
          {/* <LeafletMap
            selVizEvent={selVizEvent}
            onMapClick={handleSelVizEvent}
            onSelVizEventChange={handlePopupClose}
            layerToDraw={layer}
            tellLStatus={getLeafletStatus}
          ></LeafletMap> */}
          <OpenLayersMap
            vizEvents={vizEvents}
            getSelVizEvent={handleSelVizEvent}
            selVizEvent={selVizEvent}
          ></OpenLayersMap>
          </>
        }
        rightCol={
          <TimeLine
            selected={selVizEvent}
            TLEvents={vizEvents}
            handleClickSelection={handleSelVizEvent}
            TLStyle={{fontSize:'.75em', borderLeft: '1em solid whitesmoke', minHeight:'88vh',maxHeight:'88vh', overflow:'scroll'}}
          ></TimeLine>
          
        }
        botLeftCol={undefined}
        botRightCol={undefined}
      ></AppLayout>
    </>
  )
}

export default VizController
