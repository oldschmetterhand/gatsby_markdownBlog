import Feature from 'ol/Feature';
import { Factoid } from './prosogrAPhI'

export interface VizEvent {
  title: string,
  category?: string,
  date?: string,
  lonLat: number[],
  feature?: Feature,    //linked open layers map
  geoJson?: any,
  factoid?: Factoid,    //linked factoid if necessary
  
  primSource?: string,
  secSource?: string,
}