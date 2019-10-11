import React, { useState } from "react"
import styles from "./styles.module.scss"
import { VizEvent } from "../../index"

interface Props {
  TLEvents?: Array<VizEvent>
  TLStyle?: React.CSSProperties
  handleClick?: (TLEvent?: VizEvent) => void,
}

export const Timeline: React.FC<Props> = ({
  TLEvents = [
    {
      title: "Test01",
      date: "Hi there!",
      lMarker: undefined,
      primSource:"Augustus",
      secSource:"asd"
      
    },
    {
      title: "Test01",
      date: "Hi there!",
      lMarker: undefined,
      primSource:"Hebrius",
      secSource:"Kuffla"
    },
  ],
  TLStyle = { borderLeft: "1em solid whitesmoke" },
  handleClick = undefined
}) => {

  const [lastSelected, setLastSelected] = useState<HTMLDivElement | undefined>(undefined)
  const [curSelected, setCurSelected] = useState<VizEvent | undefined>(undefined)


  const eventClick = (evt, clickCallback: (linkedTLEvent: VizEvent) => void = undefined) => {
    let selDiv: HTMLDivElement = evt.currentTarget;

    // saving reference to one timeline-event-object
    let arrayPos:number = parseInt(selDiv.getAttribute('data-arraypos'))
    let linkedTLEvent: VizEvent = TLEvents[arrayPos]
    setCurSelected(linkedTLEvent) 
    
    handleSelDivMark(selDiv)
    if(clickCallback)clickCallback(linkedTLEvent);
    setLastSelected(selDiv);

    console.log(linkedTLEvent)
  }

  const handleSelDivMark = (div: HTMLDivElement) => {
    if(lastSelected){
      lastSelected.style.borderLeft = ''
    }
    div.style.borderLeft = '1em solid grey'
  }

  const renderTimeline = () => {
    return (
      <div className={styles.container} style={TLStyle}>
        {TLEvents.map((TLEvent: VizEvent, index) => {
          return (
            <div
              className={styles.timelineItem}
              date-is={TLEvent.date}
              onClick={(evt) => eventClick(evt, handleClick)}
              data-arraypos={index}
            >
              <p>
                {index + 1} - {TLEvent.title}
              </p>
              <p>{TLEvent.primSource}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return renderTimeline()
}

export default Timeline
