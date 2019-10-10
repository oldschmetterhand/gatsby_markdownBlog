
import React from 'react';
import { LeafletMarker } from '../../common/Leaflet'

interface Props {
    vizEvents?: VizEvent[]
}


export interface VizEvent {
    title: string,
    date: string | undefined,
    lMarker: LeafletMarker | undefined,
    primSource: string,
    secSource: string,
}

const MapApp: React.FC<Props> = ({vizEvents = undefined}) => {
    return <></>
}

export default MapApp;

