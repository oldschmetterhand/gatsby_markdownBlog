import React, {useState, useEffect} from "react"
import VizController from "./VizController"
import Helmet from "react-helmet"
import axios from "axios"

export interface LeafletMarker {
  x: number
  y: number
  popUpContent: string
  group?: string
  boundTo?: VizEvent
  lMarkerRef?: any
}

export interface VizEvent {
  title: string
  date?: string
  lMarker?: LeafletMarker
  primSource?: string
  secSource?: string
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

interface Props {
  vizEvents?: VizEvent[]
}

const MapApp: React.FC<Props> = ({ vizEvents = undefined }) => {

  const [personQuery, setPersonQuery] = useState<string | undefined>(undefined)
  const [prosopApiFactoids, setProsopApiFactoids] = useState<ProsopApiFactoid[]>(undefined)
  const [genVizEvents, setGenVizEvents] = useState<VizEvent[]>(undefined)

  useEffect(()=>{
    let url = `https://ginko.uni-graz.at/illurk/api/factoids?personId=illurk:P_Radulfus_Down_1328`
    axios.get(url)
      .then(response => {
        console.log(response.data)
        setProsopApiFactoids(response.data.factoids)
      })
      .catch(error => {
        console.error(`Ajax call to ginko failed at: ${url}`)
        console.error(error)
      })
  },[]);

  useEffect(()=>{
    if(!prosopApiFactoids)return;

    let factoids = prosopApiFactoids;
    let vizEvents: VizEvent[] = []; 
    factoids.forEach((factoid: ProsopApiFactoid)=>{
      if(!factoid.statement)return;

      let vizEvent: VizEvent = {
        title: factoid.statement.statmentContent ? factoid.statement.statmentContent : factoid.statement["@id"],
        date: factoid.statement.date ? factoid.statement.date.label : 'Kein Datum vorhanden',
        lMarker: factoid.statement.place ? {
          x: Math.random()*50 - Math.random()*10,
          y: Math.random()*50 - Math.random()*10,
          popUpContent: factoid.statement.statmentContent ? factoid.statement.statmentContent : factoid.statement["@id"]
        } : undefined,
        primSource: factoid.source.label ? factoid.source.label : factoid.source["@id"]  
      }
      vizEvents.push(vizEvent);
    });

    setGenVizEvents(vizEvents)
  },[prosopApiFactoids]);

  const handleQueryBuilding = (query: string) => {
    setPersonQuery(query)
  }

  const handleSearch = () => {

  }

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
      {genVizEvents ? <VizController vizEvents={genVizEvents} handleQueryBuilding={handleQueryBuilding}></VizController> : null}
    </>
  )
}

export default MapApp
