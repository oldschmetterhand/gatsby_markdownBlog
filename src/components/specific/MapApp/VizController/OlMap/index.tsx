import React, {useRef, useState, useEffect, useCallback} from "react"
import { VizEvent } from "../../../../../types/mapp"
import { dummyData } from "../../../../../data/vizEvents"

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, toLonLat } from 'ol/proj'

// my ol helper functions
import { isCluster, isSameCoordsCluster } from "../../../../../utils/ol"

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
import blueMarker from "../../../../../images/marker_darkblue_32_32.png"
import exclamMark from "../../../../../images/exclamation_32_32.png"
import Layer from "ol/layer/Layer";

//OL Components
import OlPopup from "./OlPopup";
interface Props {
    vizEvents: VizEvent[],
    getSelVizEvent?: (vizEvent: VizEvent) => void
}


const OlMap: React.FC<Props> = ({vizEvents = dummyData, getSelVizEvent}) => {

    ////
    //State
    const [olMap, setOlMap] = useState<undefined | Map>(undefined);
    const [drawnVLayer, setDrawnVLayer] = useState<undefined | VectorLayer>(undefined)
    const [chosenVizEvent, setChosenVizEvent] = useState<undefined | VizEvent>(undefined)
    const [clickFunctionRegister, setClickFunctionRegister] = useState<((evt: any)=>void)[] | []>([])

    /////
    //Refs
    const olMapRef = useRef(undefined)  // ref used to pass in reference to div id="map" internally.


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

      handleClickRegistration(clickChooseFeatureState)

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
      let features: Feature[] = []
      vizEvents.forEach((vizEvent)=> {
        if(!vizEvent.lonLat)return; 
        let feature: Feature = new Feature({
          label: vizEvent.title,
          category: vizEvent.date,
          geometry: new Point(fromLonLat([vizEvent.lonLat[1],vizEvent.lonLat[0]]))
        });
        // optional can set a custom property here via .set()
        feature.set('group', vizEvent.category ? vizEvent.category : '')

        //own mApp logic:
        //create linked references 
        vizEvent.feature = feature;
        feature.set('vizEvent', vizEvent);

        features.push(feature)
      })


      let layer = new VectorLayer({
        source: new ClusterSource({
          source: new VectorSource({
            features:features
          }),
        }),
        style: (feature: Feature) => {
         if(isCluster(feature)){

          if(isSameCoordsCluster(feature)){
            return new Style({
              image: new Icon({
                anchor: [0.5, 36],             
                anchorXUnits: "fraction",       
                anchorYUnits: "pixels",         
                src: exclamMark
              }),
              text: new Text({
                text: `Same Coords!`
              })
            })
          }



           return new Style({
            image: new Icon({
              anchor: [0.5, 36],             
              anchorXUnits: "fraction",       
              anchorYUnits: "pixels",         
              src: multiMarker
            }),
            text: new Text({
              text: `${feature.get('features').length}`
            })
          })
         } else {
            featureStyle.setText(new Text({  
            text: feature.values_.features[0].get('group')
          }))

          if(feature.values_.features[0].get('group') === 'Gurke'){
            featureStyle.setImage(new Icon({
              anchor: [0.5, 36],             
              anchorXUnits: "fraction",       
              anchorYUnits: "pixels",         
              src:blueMarker
            })) 
          } else {
            featureStyle.setImage(new Icon({
              anchor: [0.5, 36],             
              anchorXUnits: "fraction",       
              anchorYUnits: "pixels",         
              src:blackMarker
            }))
          }
          return featureStyle // use base featureStyle if not clustered
         } 
        }
      })

      olMap.addLayer(layer);      
      applyFeatureHoverEffect();
      setDrawnVLayer(layer)
      

    },[vizEvents, olMap])

    /**
     * Everytime when an click function callback is added -> register new click events.
     */
    useEffect(()=>{
      if(!olMap || !clickFunctionRegister)return;
      olMap.on("click", (evt: any) => {
        clickFunctionRegister.forEach((func: (evt: any)=>void)=>{
          func(evt);
        }); 
      })
    },[clickFunctionRegister])

    /**
     * Communicates selection of a new chosenVizEvent.
     */
    useEffect(()=>{
      if(!chosenVizEvent || !olMap || !getSelVizEvent)return;
      getSelVizEvent(chosenVizEvent);
    },[chosenVizEvent])

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
          if(feat && !isCluster(feat)){
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
     * needs the pixel of the current cursor movement as input (available as evt.pixel in the callback).
     * Uses olMap.forEachFeatureAtPixel() to change the cursor style to pointer when hovering over a valid feature.
     * Clustered Features are ignored. 
     * @param layersMap OpenLayers map displayed on page.
     * @param pixel derived from evt.pixel from callback .on('pointermove',callback(evt)) 
     */
    const hoverFeaturePointer = (layersMap: Map, pixel: number[]): void => {
      let cursorStyle: 'default' | 'pointer' = 'default';
      layersMap.forEachFeatureAtPixel(pixel, (detectedFeature: Feature, detectedLayer: Layer) => {
        if(!detectedFeature)return;
        cursorStyle = isCluster(detectedFeature) ? 'default' : 'pointer'  
      })
      layersMap.getViewport().style.cursor = cursorStyle;
    }

    /**
     * Sets chosenVizEvent state at click on a feature on the open layers map.
     * @param evt OpenLayers click on map event.
     */
    const clickChooseFeatureState = (evt: any): void => {
        evt.preventDefault()
        olMap.forEachFeatureAtPixel(evt.pixel, (feat: Feature, layer )=> {
          if(feat){
            if(!isCluster(feat)){
              let vizEvent: VizEvent =  feat.values_.features[0].get('vizEvent');
              setChosenVizEvent(vizEvent);
            }
          }
        });
    }

    const handleClickRegistration = (func: (evt: any) => void) => {
      setClickFunctionRegister(clickFunctionRegister => [...clickFunctionRegister, func]);
    }


    return (<>
      <OlPopup olMap={olMap} registerPopupCall={handleClickRegistration} chosenVizEvent={chosenVizEvent}></OlPopup>
      <div ref={olMapRef} id="map" className="map" style={{width:'100%', height:'90vh'}}></div>
      </>)
}

export default OlMap;