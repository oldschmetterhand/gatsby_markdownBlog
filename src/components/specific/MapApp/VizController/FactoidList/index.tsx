import React from "react";
import { ProsopApiFactoid } from "../../index"

interface props {
    factoids?: ProsopApiFactoid[]
}

const FactoidList = ({factoids = undefined}) => {
    return <p>
        Factoid List
    </p>
}

export default FactoidList;