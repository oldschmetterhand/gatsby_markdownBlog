import React, {useState, useEffect} from "react"
import VizController from "./VizController"
import Helmet from "react-helmet"
import axios from "axios"
import { gFactoidsResponse } from "../../../data/factoid"

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
  factoid?: Factoid
  primSource?: string
  secSource?: string
}


export interface Factoid {
  '@id': string,
  createdBy: string,
  createdWhen: string,
  derivedFrom?: string,
  modifiedBy?: string,
  modifiedWhen?: string,
  person: Person,
  source: Source,
  statement: Statement
}

export interface Protocol {
  page?: string,
  size?: string,
  totalHits?: string
}

export interface FactoidsResponse {
  factoids?: Array<Factoid>
  protocol?: Protocol
}

export interface PersonResponse {
  persons?: Array<Person>,
  protocol?: Protocol
}

export interface Source {
  '@id': string,
   createdBy?: string,
   createdWhen?: string,
   label?: string,
   modifiedBy?: string,
   modfiedWhen?: string,
   uris?: Array<string> 
}
export interface Person {
  '@id': string,
  createdBy?: string,
  createdWhen?: string,
  modifiedBy?: string,
  modifiedWhen?: string,
  uris?: Array<string>,
}

export interface Date {
  label?: string,
  sortdate?: string
}

export interface MemberOf {
  label?: string
  uri?: string
}

export interface Statement {
  '@id': string,
  createdBy?: string,
  createdWhen?: string,
  date?: Date,
  memberOf?: MemberOf,
  modifiedBy?: string,
  modifiedWhen?: string,
  name?: string,
  places?:Array<{label?: string, uri?: string, geometry?: any}>,        //CHANGE TO GEOJSON STUFF!
  relatedToPersons?: Array<{label?: string, uri?: string}>,
  role?: {label?: string, uri?: string},
  statementContent?: string,
  statementType?: {label?: string, uri?: string},
  uris?: string[] 
}

export interface StatementsResponse {
  protocol?: Protocol,
  statements?: Statement[] 
}

export interface Place {
  label?: string,
  places: {}
}

export interface ServiceDescription {
  complianceLevel: number,
  contact?: string,
  description?: string,
  formats?: Array<string>,
  provider?: string
}

export interface SourcesResponse {
  data?: Array<Source>,
  protocol?: Protocol
}


export interface FactoidCore {
  '@id': string,
  createdBy: string,
  createdWhen: string
}

// export interface FactoidSource extends FactoidCore {
//   label?:string
// }

// export interface FactoidPerson extends FactoidCore {
//   label?: string
// }

// export interface FactoidStatement extends FactoidCore {
//   name?: string,
//     date?: {
//       label: string
//     },
//     place?: Array<{
//       label:string,
//       x?: string,
//       y?: string
//     }>,
//     role?: {
//       label: string,
//       uri: string
//     },
//   statmentContent?: string
// }

// export interface ProsopApiFactoid extends FactoidCore {
//   person:  FactoidPerson,
//   source: FactoidSource,
//   statement: FactoidStatement
// }

// export interface ProsopApiResponse  {
//   factoids: ProsopApiFactoid[],
//   protocol: {
//     page: number,
//     size: number,
//     totalHits: number
//   }
// }

interface Props {
  vizEvents?: VizEvent[]
}

const MapApp: React.FC<Props> = ({ vizEvents = undefined }) => {

  const [personQuery, setPersonQuery] = useState<string | undefined>(undefined)
  const [prosopApiFactoids, setProsopApiFactoids] = useState<Factoid[]>(undefined)
  const [genVizEvents, setGenVizEvents] = useState<VizEvent[]>(undefined)

  useEffect(()=>{
    if(gFactoidsResponse)return setProsopApiFactoids(gFactoidsResponse.factoids)
    let url = `https://ginko.uni-graz.at/illurk/api/factoids`
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
    factoids.forEach((factoid: Factoid)=>{
      if(!factoid.statement)return;
      //if(!factoid.statement.places)return;

      let vizEvent: VizEvent = {
        title: factoid.statement.statementContent ? `${(factoid.statement.places ? factoid.statement.places[0].label.toUpperCase() + ' |': '')} ${factoid.statement.statementContent}` : factoid.statement["@id"],
        date: factoid.statement.date ? factoid.statement.date.sortdate : 'Kein Datum vorhanden',
        factoid:factoid,
        lMarker: factoid.statement.places ? {
          x: factoid.statement.places[0].geometry.coordinates[0],
          y: factoid.statement.places[0].geometry.coordinates[1],
          popUpContent: factoid.statement.statementContent ? factoid.statement.statementContent : factoid.statement["@id"]
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
    let url = `https://ginko.uni-graz.at/illurk/api/factoids?personId=${personQuery}`
    axios.get(url)
      .then(response => {
        setProsopApiFactoids(response.data.factoids)
        alert(`Query Abfrage: ${url}`)
      })
      .catch(error => {
        alert('Ajax Call failed. Bitte versuchen Sie eine andere ID.')
      })
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
      {genVizEvents ? <VizController handleSearch={handleSearch} vizEvents={undefined} handleQueryBuilding={handleQueryBuilding}></VizController> : null}
    </>
  )
}

export default MapApp
