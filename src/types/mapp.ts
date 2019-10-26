import Feature from 'ol/Feature';
import { Factoid } from './prosogrAPhI'

export interface LeafletMarker {
  x: number
  y: number
  popUpContent: string
  group?: string
  boundTo?: VizEvent
  lMarkerRef?: any
}
export interface VizEvent {
  title: string,
  category?: string,
  date?: string,
  lonLat?: number[],

  lMarker?: LeafletMarker,  //linked leaflet marker
  feature?: Feature,    //linked open layers map
  geoJson?: any,
  factoid?: Factoid,    //linked factoid if necessary
  
  primSource?: string,
  secSource?: string,
}