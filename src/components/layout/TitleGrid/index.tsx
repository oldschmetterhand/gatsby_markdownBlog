import React from "react"

interface Props {
  rightTop?: any
  rightBottom?: any
}

const TitleGrid: React.FC<Props> = ({
  children,
  rightTop = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros",
  rightBottom = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros",
}) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-8 is-vertical is-parent">
        <div className="tile is-child">{children}</div>
      </div>
      <div className="tile is-parent is-vertical">
        <div className="tile is-child">{rightTop}</div>
        <div className="tile is-child">
          <p className="title">Two</p>
          <p>{rightBottom}</p>
        </div>
      </div>
    </div>
  )
}

export default TitleGrid
