import React, {useRef, useState, useEffect} from "react"
import { VizEvent } from "../../index"
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj'

interface Props {
    vizEvents: VizEvent[]
}


const OlMap: React.FC<Props> = () => {

    // ref used to pass in reference to div id="map" internally.
    const olMapRef = useRef(undefined) 

    useEffect(()=>{

        new Map({
            target: olMapRef.current,
            layers: [
              new TileLayer({
                source: new XYZ({
                  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
              })
            ],
            view: new View({
              center: fromLonLat([0, 0],'EPSG:3857'),   //Transformation to Web Mercator
              zoom: 2
            })
          });


    },[])

    return <div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'400px'}}></div>
}

export default OlMap;