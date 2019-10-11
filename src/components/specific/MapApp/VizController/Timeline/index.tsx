import React, { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import { VizEvent } from "../../index"

interface Props {
  TLEvents?: Array<VizEvent>
  TLStyle?: React.CSSProperties
  handleClickSelection?: (TLEvent?: VizEvent) => void,
  selected?: VizEvent
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
  handleClickSelection = undefined,
  selected = undefined
}) => {

  const [lastSelected, setLastSelected] = useState<HTMLDivElement | undefined>(undefined)
  const [curSelected, setCurSelected] = useState<VizEvent | undefined>(selected)

  useEffect(()=>{
    if(!selected)return;
    console.log("selection updated")
    let arrayPos = TLEvents.indexOf(selected)
    let div: any = document.querySelectorAll('.timelineItem')[arrayPos]
    console.log(div)
    handleSelDiv(div)
  }, [selected])

  const eventClick = (evt, clickCallback: (linkedTLEvent: VizEvent) => void = undefined) => {
    let selDiv: HTMLDivElement = evt.currentTarget;

    // saving reference to one timeline-event-object
    let arrayPos:number = parseInt(selDiv.getAttribute('data-arraypos'))
    let linkedTLEvent: VizEvent = TLEvents[arrayPos]
    setCurSelected(linkedTLEvent) 
    
    handleSelDiv(selDiv)
    if(clickCallback)clickCallback(linkedTLEvent);
    //setLastSelected(selDiv);
  }

  const handleSelDiv = (div: HTMLDivElement) => {
    if(!div)return;
    if(lastSelected){
      lastSelected.style.borderLeft = ''
      lastSelected.style.background = ''
    }
    div.style.borderLeft = '1em solid #41b7d8'
    div.style.background = 'whitesmoke'
    setLastSelected(div);
  }

  const renderTimeline = () => {
    return (
      <div className={styles.container} style={TLStyle}>
        {TLEvents.map((TLEvent: VizEvent, index) => {
          return (
            <div
              className={[styles.timelineItem, 'timelineItem'].join(" ")}
              date-is={TLEvent.date}
              onClick={(evt) => eventClick(evt, handleClickSelection)}
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
