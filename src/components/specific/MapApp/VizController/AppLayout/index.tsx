import React from "react"

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
      <div>{ topBar }This will be the top bar</div>
      <br></br>
      <br></br>
      <br></br>

      <div className="columns is-gapless">
        <div className="column is-2">{leftCol}</div>
        <div className="column">{middleCol}</div>
        <div className="column is-3">{rightCol}</div>
      </div>
    </>
  )
}

export default MAppLayout
