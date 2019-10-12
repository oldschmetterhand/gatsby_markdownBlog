import React from "react"
import AppTopBar from "./AppTopBar"

interface Props {
  topBar?: any
  leftCol?: any
  middleCol?: any
  rightCol?: any
}

const MAppLayout: React.FC<Props> = ({
  leftCol = undefined,
  middleCol = undefined,
  rightCol = undefined,
  topBar = undefined
}) => {
  return (
    <>
      <div>
        <AppTopBar></AppTopBar>
      </div>
      <div className="columns is-gapless">
        <div className="column is-3">{leftCol}</div>
        <div className="column">{middleCol}</div>
        <div className="column is-2">{rightCol}</div>
      </div>
    </>
  )
}

export default MAppLayout
