import React from "react"
import { VizEvent } from "../../index"
import styles from "./styles.module.scss"

interface Props {
  vizEvents?: VizEvent[],
  selected?: VizEvent,
  handleVizSelection: (vizEvent: VizEvent) => void
}

const FactoidList: React.FC<Props> = ({ vizEvents = undefined, selected = undefined, handleVizSelection = undefined }) => {
  const listItems = vizEvents ? <>{vizEvents.map((vizEvent: VizEvent) => {
    if(!vizEvent.factoid["@id"])return <a className="list-item">no id</a>
    return <a key={vizEvent.factoid["@id"]} onClick={()=>handleVizSelection(vizEvent)} className={`list-item ${(selected && selected.factoid) ? ((vizEvent.factoid["@id"] === selected.factoid["@id"]) ? styles.isActive : '' ) : ''}`}>ID: {vizEvent.factoid["@id"]}</a>
  })}</> : null

  return (
    <div className={styles.mainContainer}>
      <h2 className="is-size-6">Linked Factoids</h2>
      <p>In dieser Liste werden alle zum Ereignis zugehörigen Faktoide angezeigt.</p>
      <p>Die jeweils aktive "Faktoid-Quelle" wird markiert. Genauso kann das zusammengehörige verortete Ereignis angezeigt werden. </p>
      <br></br>
      <br></br>
      <h2 className="is-size-6">Faktoid-Liste</h2>
      <div className="is-hoverable">
        {listItems}
      </div>
    </div>
  )
}

export default FactoidList
