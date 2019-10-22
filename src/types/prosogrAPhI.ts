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