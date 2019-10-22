import Feature from 'ol/Feature';
import { Factoid } from './prosogrAPhI'

export interface VizEvent {
  title: string,
  date?: string,
  feature?: VizFeature,    // extended from OpenLayers
  factoid?: VizFactoid,
}

export interface VizFeature extends Feature {
  label: string,
  category: string,
}

export interface VizFactoid extends Factoid {
    //TODO add properties
}