import React, { useEffect, useState } from "react"
import { LeafletMarker, VizEvent } from "../../index"

interface Props {
  leafletMarkers?: Array<VizEvent>
  layerToDraw?: any,
  tellLStatus?: (mapInitialized: boolean, dataLoaded: boolean) => void, 
  onMapClick?: (evt: any) => void | undefined
}

const LeafletMap: React.FC<Props> = ({
  leafletMarkers,
  onMapClick = undefined,
  tellLStatus = undefined,
  layerToDraw = undefined
}) => {
  const [laefletMap, setLeafletMap] = useState<any | undefined>(undefined)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [markerLayer, setMarkerLayer] = useState<any>(undefined)

  //const [layerToDraw, setLayerToDraw] = useState<undefined | any>(layer)

  useEffect(() => {
    console.info(`%cStart initialization process of the leaflet map.`, `color:green`)
    if(markerLayer)return drawLayer()
    if(laefletMap)return; //no redraw if map already initialized
    try {
        let interval = setInterval(()=>{
          // first test if leaflet is initialized
          let test = window.L.map
          clearInterval(interval)

          //works only if initialized
          let map = window.L.map("map").setView([51.505, -0.09], 4)
          setLeafletMap(map)
          if(tellLStatus)tellLStatus(true, false);
          initMap(map)
      }, 500)
      //console.info(`%c Leaflet map succesfully initialized`, 'color:green')
    } catch {
      console.debug(`%cwindow.L not defined. Abort drawing of the map.`,`color:green`);
    }
  }, [laefletMap])

  useEffect(() => {
    if(layerToDraw && laefletMap && dataLoaded){
      console.info(`%cData changed or map was succesfully initialized. Hooking data-drawing process...`, `color:green`)
      drawLayer()
    }
  }, [layerToDraw])  // run once map is initialized -> if data was given intially
                                    // AND when leafletMarkers were changed.

  const initMap = map => {
    console.info("Leaflet initializing the map")
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    // need to do before for each.
    setDataLoaded(true)
    if(tellLStatus)tellLStatus(true, true);
  }

  const drawLayer = () => {
    //adding the markers
    if(layerToDraw){
      //laefletMap.removeLayer(layerToDraw)
      //console.info("removed old layer")
    }

    try {
      layerToDraw.addTo(laefletMap);
    } catch(e){
      console.error(e)
      //TODO better error handling here!
    }
  }

  //registering events
  useEffect(() => {
    if (dataLoaded) {
      console.info(`Leaflet useEffect: Data succesfully loaded onto map.`)
      if (onMapClick) laefletMap.on("click", onMapClick)
    }
  }, [dataLoaded]);
  
  return <div id="map" style={{ minHeight: "75vh" }}></div>
}

export default LeafletMap
