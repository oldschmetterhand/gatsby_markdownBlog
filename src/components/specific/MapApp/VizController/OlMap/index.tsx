import React, {useRef, useState, useEffect} from "react"
import { VizEvent } from "../../index"
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

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
                source: new OSM({
                  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 2
            })
          });


    },[])

    return <div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'400px'}}></div>
}

export default OlMap;