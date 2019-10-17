import React, {useRef, useState, useEffect} from "react"
import { VizEvent } from "../../index"
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj'

//Classes for drawing Markers on the the ol map.
import Point from "ol/geom/Point"
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

interface Props {
    vizEvents: VizEvent[]
}


const OlMap: React.FC<Props> = () => {

    const [olMap, setOlMap] = useState<undefined | Map>(undefined);

    // ref used to pass in reference to div id="map" internally.
    const olMapRef = useRef(undefined) 

    useEffect(()=>{
        if(olMap)return;

        let map = new Map({
            target: olMapRef.current,
            layers: [
              new TileLayer({
                source: new XYZ({
                  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
              }),
              new VectorLayer({
                source: new VectorSource({
                  features:[
                    new Feature({
                      geometry: new Point(fromLonLat([4.35247, 50.84673])),
                      //can add property as needed
                      label:'Somewhere in Belgium'
                      
                    })
                  ]
                })
              })
            ],
            view: new View({
              center: fromLonLat([0, 0],'EPSG:3857'),   //Transformation to Web Mercator
              zoom: 2
            })
          });

          setOlMap(map);
    },[])

    return <div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'400px'}}></div>
}

export default OlMap;