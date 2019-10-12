import React from "react"
import { VizEvent } from "../.."
import styles from "./styles.module.scss"
import Tabs from "../../../../common/Tabs"

interface Props {
  vizEvent: VizEvent
}

const Summary: React.FC<Props> = ({ vizEvent = undefined }) => {
  return (
    <>
      <div className={["container", styles.summaryContainer].join(" ")}>
        <Tabs tabs={["Search","Result Details"]}></Tabs>
        <div className={styles.summaryContent}>
          <h2 className="is-size-4">Ereignis Details</h2>
          <br></br>
          {vizEvent ? (
            <>
              <p>Ereignis: {vizEvent.title}</p>
              <p>Datum: {vizEvent.date ? vizEvent.date : "unbekannt"}</p>
              <p>Quelle: {vizEvent.primSource}</p>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Summary
