import React, { useState, useEffect } from "react"
import TimeLine from "./Timeline"
import LeafletMap from "./LeafletMap"
import AppLayout from "./AppLayout"
import SearchNView from "./SearchNView"
import { VizEvent, LeafletMarker } from "../index"

const dummyData: VizEvent[] = [
  {
    title: "test01",
    date: "04.05.2019",
    lMarker: {
      x: 1,
      y: 2,
      popUpContent: "hi",
      group: "deserteure",
    },
    primSource: "Augustus",
    secSource: "Rostovzef",
  },
  {
    title: "test02",
    date: "06.05.2019",
    lMarker: {
      x: 4,
      y: 5,
      popUpContent: "hi",
      group: "deserteure",
    },
    primSource: "Augustus",
    secSource: "Rostovzef",
  },
  {
    title: "test03",
    date: undefined,
    lMarker: {
      x: 6,
      y: 8,
      popUpContent: "hi",
      group: "deserteure",
    },
    primSource: "Augustus",
    secSource: "Rostovzef",
  },
]

interface Props {
  vizEvents?: VizEvent[]
}

const VizController: React.FC<Props> = ({ vizEvents = dummyData }) => {
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
  }, [leafletInitialized])

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

    vizEvents.forEach((vizEvent: VizEvent, index) => {
      try {
        let leafletMarker = generateLMarker(vizEvent)

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
  const generateLMarker = (vizEvent: VizEvent): any => {
    let marker = vizEvent.lMarker
    let leafletMarker = window.L.marker([marker.x, marker.y]).bindPopup(
      `<em>Kurztitel</em>: ${marker.popUpContent}.<br>Gruppe: ${
        marker.group
      }<hr> (Verwendete Koordinaten: Längengrad: ${marker.x.toString()}, Breitengrad: ${marker.y.toString()})`
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
  const handleSelVizEvent = (vizEvent: VizEvent) => {
    setSelVizEvent(vizEvent)
  }

  /**
   * Mainly needed for Leaflet. Syncy Visualizations for the currently
   * active Vizevent.
   */
  const syncDisplay = () => {
    if (!selVizEvent.lMarker) return
    let linkedLMarker = selVizEvent.lMarker.lMarkerRef
    if (linkedLMarker) {
      linkedLMarker.openPopup()
    } else {
      alert(`Keine gültigen Geodaten vorhanden.`)
    }
  }

  return (
    <>
      <AppLayout
        leftCol={<SearchNView vizEvent={selVizEvent}></SearchNView>}
        middleCol={
          <LeafletMap
            onMapClick={handleSelVizEvent}
            layerToDraw={layer}
            tellLStatus={getLeafletStatus}
          ></LeafletMap>
        }
        rightCol={
          <TimeLine
            selected={selVizEvent}
            TLEvents={vizEvents}
            handleClickSelection={handleSelVizEvent}
            TLStyle={{fontSize:'.75em', borderLeft: '1em solid whitesmoke', minHeight:'85vh'}}
          ></TimeLine>
          
        }
      ></AppLayout>
    </>
  )
}

export default VizController
