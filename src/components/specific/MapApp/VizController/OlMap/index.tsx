import React, {useRef, useState, useEffect} from "react"
import { VizEvent } from "../../index"
import { dummyData } from "../../../../../data/vizEvents"

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

//For Styling GeoFeatures (like Points, Multilines etc.) - assigning Text, and image (=marker) etc.
import {Icon, Style, Text, Fill, Stroke} from 'ol/style';
import logoPath from "../../../../../images/marker_red.png"

interface Props {
    vizEvents: VizEvent[]
}


const OlMap: React.FC<Props> = ({vizEvents = dummyData}) => {

    const [olMap, setOlMap] = useState<undefined | Map>(undefined);
    const [drawnVLayer, setDrawnVLayer] = useState<undefined | VectorLayer>(undefined)
    const [olFeatures, setOlFeatures] = useState<undefined| Feature[]>(undefined);

    // ref used to pass in reference to div id="map" internally.
    const olMapRef = useRef(undefined) 

    useEffect(()=>{
        if(olMap || !vizEvents)return;

        let map = new Map({
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
          setOlMap(map);
    },[vizEvents])

    useEffect(()=>{
      if(!olMap || !vizEvents)return;
      //remove old layer
      if(drawnVLayer)olMap.removeLayer(drawnVLayer)

      // setting style for the feature display
      // means assigning an image / text / custom style to a geo - feature (like point, polyline etc.)
      let featureStyle =  new Style({
        image: new Icon({
          anchor: [0.5, 24],             // anchor = where location is marked with icon.
          anchorXUnits: "fraction",       // fraction = x value in array above means percentage.
          anchorYUnits: "pixels",         // pixels = y value in array are pixels.
          src: logoPath
        }),
        text: new Text({
          text: 'Deserteur',
        })
      });

      //generating the feature array
      let features: Feature[] = vizEvents.map((vizEvent)=> {
        let feature = new Feature({
          geometry: new Point(fromLonLat([vizEvent.lMarker.x, vizEvent.lMarker.y])),
          label: vizEvent.title
        })
        // after generating feature assigning the style object.
        feature.setStyle(featureStyle)
        return feature; 
      })


      let layer = new VectorLayer({
        source: new VectorSource({
          features:features
        })
      })

      olMap.addLayer(layer);
      setDrawnVLayer(layer)

    },[vizEvents, olMap])



    return <><img src={logoPath} ></img><div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'90vh'}}></div></>
}

export default OlMap;