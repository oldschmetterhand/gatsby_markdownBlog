import React, { useState } from "react"
import { VizEvent } from "../.."
import styles from "./styles.module.scss"
import Tabs from "../../../../common/Tabs"

interface Props {
  vizEvent: VizEvent,
  getSelectedTab: (tabIndex: number) => void
}





const Summary: React.FC<Props> = ({ vizEvent = undefined, getSelectedTab = undefined }) => {

  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (tabIndex: number): void => {
    setSelectedTab(tabIndex)
  }


  const summary = (<div className={styles.summaryContent}>
    <h2 className="is-size-4">Ereignis Details</h2>
    <br></br>
    {(vizEvent && vizEvent.title) ? (
      <>
        <p>Ereignis: {vizEvent.title}</p>
        <p>Datum: {vizEvent.date ? vizEvent.date : "unbekannt"}</p>
        <p>Quelle: {vizEvent.primSource}</p>
      </>
    ) : (<>

      <p>An dieser Stelle kann eine kurze Übrersicht über das gewählte Ereignis angezeigt werden. </p>
      <br></br>
      <p>Bitte <em>wählen</em> Sie dazu ein Ereignis auf der <em>Karte</em> oder in der <em>Leiste rechts</em>.</p>

    </>)}
  </div>)

  const search = (<p>I'm the search!</p>)

  return (
    <>
      <div className={["container", styles.summaryContainer].join(" ")}>
        <Tabs tabs={["Search","Result Details"]} tellTabSelected={handleTabChange}></Tabs>
        {(selectedTab===0) ? search : null}
        {(selectedTab===1) ? summary : null}
      </div>
    </>
  )
}

export default Summary
