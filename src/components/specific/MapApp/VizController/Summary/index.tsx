import React from "react"
import { VizEvent } from "../.."

interface Props {
    vizEvent: VizEvent
}

const Summary: React.FC<Props> = ({vizEvent = undefined}) => {
    
    
    return vizEvent ? (
    <>
        <p>{vizEvent.title}</p>
    </>
    ) : null;
}

export default Summary;