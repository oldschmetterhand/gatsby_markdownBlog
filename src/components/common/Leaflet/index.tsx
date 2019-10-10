import React, { useEffect, useState } from "react"
import Helmet from "react-helmet"

export interface LeafletMarker {
  x: number
  y: number
  popUpContent: string
  group: string
  boundTo?: any
  lMarkerRef?: any
}

interface Props {
  leafletMarkers?: Array<LeafletMarker>
  onMapClick?: (evt: any) => void | undefined
}

const Leaflet: React.FC<Props> = ({
  leafletMarkers,
  onMapClick = undefined,
}) => {
  const [laefletMap, setLeafletMap] = useState<any | undefined>(undefined)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [markerLayer, setMarkerLayer] = useState<any>(undefined)

  useEffect(() => {
    console.info(`Start initialization process of the leaflet map.`)
    if(markerLayer)return drawMarkerLayer(laefletMap)
    try {
      let sample = window.L.map
      let map = window.L.map("map").setView([51.505, -0.09], 4)
      setLeafletMap(map)
      initMap(map)
      //console.info(`%c Leaflet map succesfully initialized`, 'color:green')
    } catch {
      //console.debug(`window.L not defined`);
    }
  }, [laefletMap])

  useEffect(() => {
    console.info(`%cData changed or map was succesfully initialized. Hooking data-drawing process...`, `color:green`)
    if(leafletMarkers && laefletMap && dataLoaded){//
      drawMarkerLayer(laefletMap)
    }
  }, [leafletMarkers, dataLoaded])  // run once map is initialized -> if data was given intially
                                    // AND when leafletMarkers were changed.

  const initMap = map => {
    console.info("Leaflet initializing the map")
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    // need to do before for each.
    setDataLoaded(true)
  }

  const drawMarkerLayer = (map) => {
    //adding the markers
    //let layer = new window.L.layerGroup
    console.info("%cDrawing provided Data onto the map...",'color:green');
    if(markerLayer){
      laefletMap.removeLayer(markerLayer)
      console.info("remove layer")
    }
    let layer = window.L.layerGroup();
    
    leafletMarkers.forEach((marker, index) => {
      try {
      let leafletMarker = window.L.marker([marker.x, marker.y]).bindPopup(
        `<em>Kurztitel</em>: ${
          marker.popUpContent
        }.<br>Gruppe: ${marker.group}<hr> (Verwendete Koordinaten: Längengrad: ${marker.x.toString()}, Breitengrad: ${marker.y.toString()})`
      )
      marker.lMarkerRef = leafletMarker;
      leafletMarker.boundTo = marker; 

      leafletMarker.addTo(layer)
      } catch {
        //console.debug("error in generating a marker.")
        //TODO better error handling!
        //
      }
    });

    
    try {
      layer.addTo(map);
    } catch(e){
      console.error(e)
      //TODO better error handling here!
    }
    setMarkerLayer(layer);
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

export default Leaflet
