
import React from 'react';
import { LeafletMarker } from '../../common/Leaflet'

interface Props {
    vizEvents?: VizEvent[]
}


interface VizEvent {
    date: string | undefined,
    lMaker: LeafletMarker
}

const MapApp: React.FC<Props> = ({vizEvents = undefined}) => {
    return <></>
}

export default MapApp;

