
import React from 'react';
import Timeline from './VizController/Timeline'

export interface LeafletMarker {
    x: number
    y: number
    popUpContent: string
    group: string
    boundTo?: any
    lMarkerRef?: any
  }

export interface VizEvent {
    title: string,
    date: string | undefined,
    lMarker: LeafletMarker | undefined,
    primSource: string,
    secSource: string,
}

interface Props {
    vizEvents?: VizEvent[]
}


const MapApp: React.FC<Props> = ({vizEvents = undefined}) => {
    return <><Timeline></Timeline></>
}

export default MapApp;

