import React, {useRef, useState, useEffect} from "react"
import { VizEvent } from "../../index"
import { dummyData } from "../../../../../data/vizEvents"

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, toLonLat } from 'ol/proj'
import lodash from "lodash"

//for the popup
import Overlay from "ol/Overlay"
import {toStringHDMS} from 'ol/coordinate';

//for select interaction
import Select from 'ol/interaction/Select.js';

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
    const popupOverlay = useRef(undefined)

    useEffect(()=>{
        if(olMap || !vizEvents)return;
        let map = new Map({
            //overlays:[popup],               //assigned later on!
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


      /* let select = new Select()
      olMap.addInteraction(select);
      select.on('select', () =>{
        console.log("selected new:");
      }); */
      

      
      applyFeaturePopup();
      applyFeatureHoverEffect();
      setDrawnVLayer(layer)

    },[vizEvents, olMap])


    const createOverlay = (): Overlay => {
      let overlay = new Overlay({
        element: popupOverlay.current,  //ref assigning
        //autoPan: true,
        positioning:"top-left",
        //offset:[-24,10],
        autoPanAnimation: {
          duration: 250
        }
      });
      return overlay;
    }

    const applyFeaturePopup = () => {
      if(!olMap)return console.error("Can only apply popups after the OL-Map was rendered! (not before)");
      let popup = createOverlay();

      olMap.addOverlay(popup);

      olMap.on('click', function(evt) {
        evt.preventDefault();
        olMap.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
          if(feat){
            popup.setPosition(feat.getProperties().geometry.flatCoordinates)
            return feat;
          }
          return false;
        })
      });
    }

    const applyFeatureHoverEffect = () => {

      let lastFeature: Feature;
      let baseStyle =  new Style({
        image: new Icon({
          anchor: [0.5, 24],             // anchor = where location is marked with icon.
          anchorXUnits: "fraction",       // fraction = x value in array above means percentage.
          anchorYUnits: "pixels",         // pixels = y value in array are pixels.
          src: logoPath
        }),
        text: new Text({
          text: 'Deserteure',
        }),
        stroke: new Stroke({
          color: 'blue',
          width: 10
        })
      });

      olMap.on("pointermove", (evt) => {
        //if(lastFeature)lastFeature.setStyle(baseStyle);
        olMap.forEachFeatureAtPixel(evt.pixel, (feat: Feature, layer)=> {
          if(lastFeature)lastFeature.setStyle(baseStyle);
          if(feat){
            //popup.setPosition(feat.getProperties().geometry.flatCoordinates)
            let featureStyle =  new Style({
              image: new Icon({
                anchor: [0.5, 24],             // anchor = where location is marked with icon.
                anchorXUnits: "fraction",       // fraction = x value in array above means percentage.
                anchorYUnits: "pixels",         // pixels = y value in array are pixels.
                src: logoPath,
                scale:1.25
              }),
              text: new Text({
                text: 'hover',
              })
            });
            lastFeature = feat;
            feat.setStyle(featureStyle);  
          }
        })
      })


    }

    return (<>
      <div ref={popupOverlay} id="popup" className="ol-popup" style={{maxWidth:"250px", background:'white', border:'1.5px solid tomato', padding:'.5em'}}>
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content">
          <p>Gruppe: Deserteure</p>
          <p>Text: Some Sample content is the best content I could possibly imagine. My life is grey. Hello World.</p>
        </div>
      </div>

      <div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'90vh'}}></div>
      </>)
}

export default OlMap;