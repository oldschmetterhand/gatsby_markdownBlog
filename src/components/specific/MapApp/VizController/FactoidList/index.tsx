import React from "react"
import { VizEvent } from "../../index"

interface Props {
  vizEvents?: VizEvent[],
  selected?: VizEvent,
  handleVizSelection: (vizEvent: VizEvent) => void
}

const FactoidList: React.FC<Props> = ({ vizEvents = undefined, selected = undefined, handleVizSelection = undefined }) => {
  const listItems = vizEvents ? <>{vizEvents.map((vizEvent: VizEvent) => {
    return <a onClick={()=>handleVizSelection(vizEvent)} className={`list-item ${selected ? ((vizEvent.factoid["@id"] === selected.factoid["@id"]) ? 'is-active' : '' ) : ''}`}>ID: {vizEvent.factoid["@id"]}</a>
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
