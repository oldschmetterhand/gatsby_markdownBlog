import React from "react"
import { VizEvent } from "../../index"

interface Props {
  vizEvents?: VizEvent[]
}

const FactoidList: React.FC<Props> = ({ vizEvents = undefined }) => {
  const listItems = vizEvents ? <>{vizEvents.map((vizEvent: VizEvent) => {
    return <a className="list-item">ID: {vizEvent.factoid["@id"]}</a>
  })}</> : null

  return (
    <>
      <h2 className="is-size-5">Linked Factoids</h2>
      <div className="list is-hoverable">
        {listItems}
      </div>
    </>
  )
}

export default FactoidList
