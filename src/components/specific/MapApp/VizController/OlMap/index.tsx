import React, {useRef, useState, useEffect, useCallback} from "react"
import { VizEvent } from "../../index"
import { dummyData } from "../../../../../data/vizEvents"
import { FaWindowClose } from "react-icons/fa"

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
import ClusterSource from "ol/source/Cluster"

//For Styling GeoFeatures (like Points, Multilines etc.) - assigning Text, and image (=marker) etc.
import {Icon, Style, Text, Fill, Stroke} from 'ol/style';

//marker -> just src image paths
import blackMarker from "../../../../../images/marker_black_32_32.png"
import orangeMarker from "../../../../../images/marker_orange_32_32.png"
import multiMarker from "../../../../../images/multi_marker_32_32.png"

interface Props {
    vizEvents: VizEvent[]
}


const OlMap: React.FC<Props> = ({vizEvents = dummyData}) => {

    ////
    //State
    const [olMap, setOlMap] = useState<undefined | Map>(undefined);
    const [drawnVLayer, setDrawnVLayer] = useState<undefined | VectorLayer>(undefined)
    const [popupOverlay, setpopupOverlay] = useState<undefined| Overlay>(undefined);

    /////
    //Refs
    const olMapRef = useRef(undefined)  // ref used to pass in reference to div id="map" internally.
    const popupDiv = useRef(undefined)

    ///
    //React specific remembering of callback
    const memoHandlePopupClose = useCallback(()=>{
      // popupOverlay is undefined at the beginning -> will be created and 
      // state changed -> therefore needs to be watched in array second param.
      // (will regenerate )
      closePopup(popupOverlay)
    },[popupOverlay]);


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
          anchor: [0.5, 36],             // anchor = where location is marked with icon.
          anchorXUnits: "fraction",       // fraction = x value in array above means percentage.
          anchorYUnits: "pixels",         // pixels = y value in array are pixels.
          src: blackMarker
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
        source: new ClusterSource({
          source: new VectorSource({
            features:features
          }),
        }),
        style: (feature: Feature) => {
         if(isCluster(feature)){
           return new Style({
            image: new Icon({
              anchor: [0.5, 36],             
              anchorXUnits: "fraction",       
              anchorYUnits: "pixels",         
              src: multiMarker
            })})
         } else {
          return featureStyle // use base featureStyle if not clustered
         } 
        }
      })

      olMap.addLayer(layer);      
      applyFeaturePopup();
      applyFeatureHoverEffect();
      setDrawnVLayer(layer)

    },[vizEvents, olMap])


    const createOverlay = (): Overlay => {
      let overlay = new Overlay({
        element: popupDiv.current,  //ref assigning
        autoPan: true,
        positioning:"top-left",
        offset:[-1,-4],
        autoPanAnimation: {
          duration: 250
        }
      });
      return overlay;
    }

    const applyFeaturePopup = () => {
      if(!olMap)return console.error("Can only apply popups after the OL-Map was rendered! (not before)");
      let popup = createOverlay();
      setpopupOverlay(popup);

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
          anchor: [0.5, 36],             // anchor = where location is marked with icon.
          anchorXUnits: "fraction",       // fraction = x value in array above means percentage.
          anchorYUnits: "pixels",         // pixels = y value in array are pixels.
          src: blackMarker
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

        hoverFeaturePointer(olMap, evt.pixel);

        if(lastFeature)lastFeature.setStyle(baseStyle);
        olMap.forEachFeatureAtPixel(evt.pixel, (feat: Feature, layer)=> {
          if(lastFeature)lastFeature.setStyle(baseStyle);
          if(feat){
            //popup.setPosition(feat.getProperties().geometry.flatCoordinates)
            let featureStyle =  new Style({
              image: new Icon({
                anchor: [0.5, 36],             // anchor = where location is marked with icon.
                anchorXUnits: "fraction",       // fraction = x value in array above means percentage.
                anchorYUnits: "pixels",         // pixels = y value in array are pixels.
                src: orangeMarker,
                scale:1.05
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

    /**
     * Method must be called inside map.on('pointermove',callback(evt)) callback function and 
     * needs the pixel of the current cursor movement as input (available as evt.pixel in the callback) 
     * @param layersMap OpenLayers map displayed on page.
     * @param pixel derived from evt.pixel from callback .on('pointermove',callback(evt)) 
     */
    const hoverFeaturePointer = (layersMap: Map, pixel: number[]) => {
      let featureHover = layersMap.hasFeatureAtPixel(pixel);
      layersMap.getViewport().style.cursor = featureHover ? 'pointer' : 'default'
    }

    /**
     * Method needs to be assigned as onclick listener to the closing button
     * of the specific popup. For example directly on an html element.
     * Better way is to create a useCallback hook.
     * @param popOverlay Overlay to be closed.
     */
    const closePopup = (popOverlay: Overlay) => {
     popOverlay.setPosition(undefined);
    }

    /**
     * Checks if given feature consists of multiple features. If yes -> it might be 
     * a cluster.
     * @param feature Feature to analyze.
     * @returns Boolean if Feature consists of multiple features and therefore might be a Cluster.
     */
    const isCluster = (feature: Feature): boolean => {
      return feature.get('features').length > 1
    }

    return (<>
      <div ref={popupDiv} id="popup" className="ol-popup" style={{color:'black', borderLeft:'3px solid black', fontSize: '.75em',transition:'all 1s ease-in', maxWidth:"250px", background:'whitesmoke', borderRadius:'.5em', padding:'1em', boxShadow:'1px 1px 5px 1px grey'}}>
        <div onClick={memoHandlePopupClose} style={{color:'lightgrey', fontSize:'1.25em'}} className="is-pulled-right"><FaWindowClose></FaWindowClose></div>
        <div id="popup-content">
          <p>Grabmahl für XYZ</p>
          <p>Gruppe: Deserteure</p>
          <p>Text: Some Sample content is the best content I could possibly imagine. My life is grey. Hello World.</p>
        </div>
      </div>

      <div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'90vh'}}></div>
      </>)
}

export default OlMap;