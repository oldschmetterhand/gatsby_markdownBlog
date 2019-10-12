import React from "react";
import { ProsopApiFactoid } from "../../index"

interface Props {
    factoids?: ProsopApiFactoid[]
}

const FactoidList:React.FC<Props> = ({factoids = undefined}) => {
    return <p>
        Factoid List
    </p>
}

export default FactoidList;