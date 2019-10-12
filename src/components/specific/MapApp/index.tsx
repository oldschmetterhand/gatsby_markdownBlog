import React from "react"
import VizController from "./VizController"
import Helmet from "react-helmet"

export interface LeafletMarker {
  x: number
  y: number
  popUpContent: string
  group: string
  boundTo?: VizEvent
  lMarkerRef?: any
}

export interface VizEvent {
  title: string
  date: string | undefined
  lMarker: LeafletMarker | undefined
  primSource: string
  secSource: string
}

export interface FactoidCore {
  '@id': string,
  createdBy: string,
  createdWhen: string
}

export interface FactoidSource extends FactoidCore {
  label?:string
}

export interface FactoidPerson extends FactoidCore {
  label?: string
}

export interface FactoidStatement extends FactoidCore {
  name?: string,
    date?: {
      label: string
    },
    place?: Array<{
      label:string,
      x?: string,
      y?: string
    }>,
    role?: {
      label: string,
      uri: string
    },
  statmentContent?: string
}

export interface ProsopApiFactoid extends FactoidCore {
  person:  FactoidPerson,
  source: FactoidSource,
  statement: FactoidStatement
}

export interface ProsopApiResponse  {
  factoids: ProsopApiFactoid[],
  protocol: {
    page: number,
    size: number,
    totalHits: number
  }
}

const x: ProsopApiFactoid = {}
console.log(x)

interface Props {
  vizEvents?: VizEvent[]
}

const MapApp: React.FC<Props> = ({ vizEvents = undefined }) => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
          integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
          crossorigin=""
        ></script>
      </Helmet>
      <VizController></VizController>
    </>
  )
}

export default MapApp
