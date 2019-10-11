import React, { useEffect, useState } from "react"

interface LeafletMarker {
  x: number
  y: number
  popUpContent: string
  group: string
  boundTo?: any
  lMarkerRef?: any
}

interface Props {
  leafletMarkers?: Array<LeafletMarker>
  tellLStatus?: (mapInitialized: boolean, dataLoaded: boolean) => void, 
  onMapClick?: (evt: any) => void | undefined
}

const Leaflet: React.FC<Props> = ({
  leafletMarkers,
  onMapClick = undefined,
  tellLStatus = undefined
}) => {
  const [laefletMap, setLeafletMap] = useState<any | undefined>(undefined)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [markerLayer, setMarkerLayer] = useState<any>(undefined)

  useEffect(() => {
    console.info(`%cStart initialization process of the leaflet map.`, `color:green`)
    if(markerLayer)return drawMarkerLayer(laefletMap)
    try {
      let sample = window.L.map
      let map = window.L.map("map").setView([51.505, -0.09], 4)
      setLeafletMap(map)
      if(tellLStatus)tellLStatus(true, false);
      initMap(map)
      //console.info(`%c Leaflet map succesfully initialized`, 'color:green')
    } catch {
      console.debug(`%cwindow.L not defined. Abort drawing of the map.`,`color:green`);
    }
  }, [laefletMap])

  useEffect(() => {
    if(leafletMarkers && laefletMap && dataLoaded){
      console.info(`%cData changed or map was succesfully initialized. Hooking data-drawing process...`, `color:green`)
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
    if(tellLStatus)tellLStatus(true, true);
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
