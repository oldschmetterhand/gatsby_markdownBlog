import React, { useEffect, useState } from "react"
import { LeafletMarker, VizEvent } from "../../index"

interface Props {
  layerToDraw?: any,
  tellLStatus?: (mapInitialized: boolean, dataLoaded: boolean) => void, 
  onMapClick?: (evt: any) => void | undefined
  selVizEvent?: VizEvent,
  onSelVizEventChange?: () => void
}

const LeafletMap: React.FC<Props> = ({
  onMapClick = undefined,
  tellLStatus = undefined,
  layerToDraw = undefined,
  selVizEvent = undefined
}) => {
  const [laefletMap, setLeafletMap] = useState<any | undefined>(undefined)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [lastLayer, setLastLayer] = useState<any | undefined>(undefined)

  useEffect(() => {
    console.info(`%cStart initialization process of the leaflet map.`, `color:green`)
    if(laefletMap)return; //no redraw if map already initialized
    try {
        let interval = setInterval(()=>{
          // first test if leaflet is initialized
          let test = window.L.map
          clearInterval(interval)

          //works only if initialized
          let map = window.L.map("map", { zoomControl: false }).setView([51.505, -0.09], 4)
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

  useEffect(()=>{
    if(!layerToDraw || !laefletMap)return;
    laefletMap.closePopup();
  }, [selVizEvent])

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
    console.info('%c Drawing new layer...','color:green')

    //adding the markers
    if(lastLayer){

      try {
        laefletMap.removeLayer(lastLayer);
      } catch(e) {
        console.error("Error on removing the lastLayer")
        console.error(e)
      }

    }

    try {
      layerToDraw.addTo(laefletMap);
      setLastLayer(layerToDraw);
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
  
  return <div id="map" style={{ minHeight: "88vh" }}></div>
}

export default LeafletMap
