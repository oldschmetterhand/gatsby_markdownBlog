import React, { useState } from "react"
import styles from "./styles.module.scss"
import { VizEvent } from "../index"

export interface TLEvent {
  head?: string
  content?: string
  date?: string
  eventStyle?: React.CSSProperties
  boundTo?: any,
}

interface Props {
  TLEvents?: Array<TLEvent>
  TLStyle?: React.CSSProperties
  handleClick?: (TLEvent?: TLEvent) => void,
}

export const Timeline: React.FC<Props> = ({
  TLEvents = [
    {
      head: "Test01",
      content: "Hi there!",
      date: "12-45-2010",
      eventStyle: { fontSize: ".75em" },
      
    },
    {
      head: "Test02",
      content: "Hi there! 02",
      date: "12-45-2060",
      eventStyle: { fontSize: ".75em" },
    },
  ],
  TLStyle = { borderLeft: "1em solid whitesmoke" },
  handleClick = undefined
}) => {

  const [lastSelected, setLastSelected] = useState<HTMLDivElement | undefined>(undefined)
  const [curSelected, setCurSelected] = useState<TLEvent | undefined>(undefined)


  const eventClick = (evt, clickCallback: (linkedTLEvent: TLEvent) => void = undefined) => {
    let selDiv: HTMLDivElement = evt.currentTarget;

    // saving reference to one timeline-event-object
    let arrayPos:number = parseInt(selDiv.getAttribute('data-arraypos'))
    let linkedTLEvent: TLEvent = TLEvents[arrayPos]
    setCurSelected(linkedTLEvent) 
    
    handleSelDivMark(selDiv)
    if(clickCallback)clickCallback(linkedTLEvent);
    setLastSelected(selDiv);

    console.log(linkedTLEvent.boundTo)
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
        {TLEvents.map((TLEvent: TLEvent, index) => {
          return (
            <div
              className={styles.timelineItem}
              date-is={TLEvent.date}
              style={TLEvent.eventStyle}
              onClick={(evt) => eventClick(evt, handleClick)}
              data-arraypos={index}
            >
              <p>
                {index + 1} - {TLEvent.head}
              </p>
              <p>{TLEvent.content}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return renderTimeline()
}

export default Timeline
