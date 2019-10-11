import React from "react"
import { VizEvent } from "../.."
import styles from "./styles.module.scss"

interface Props {
  vizEvent: VizEvent
}

const Summary: React.FC<Props> = ({ vizEvent = undefined }) => {
  return (
    <div className={["container", styles.summaryContainer].join(" ")}>
      <h2 className="is-size-4">Ereignis Details</h2>
      <br></br>
      {vizEvent ? (
        <>
          <p>Ereignis: {vizEvent.title}</p>
          <p>Datum: {vizEvent.date ? vizEvent.date : 'unbekannt'}</p>
          <p>Quelle: {vizEvent.primSource}</p>
        </>
      ) : null}
    </div>
  )
}

export default Summary
