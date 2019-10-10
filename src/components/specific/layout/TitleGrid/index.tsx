import React from "react"

import styles from "./styles.module.scss"

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
      <div className={["tile is-8 is-vertical is-parent", styles.titleBox].join(" ")}>
        <div className={["tile is-child content", styles.contentBox].join(" ")}>{children}</div>
      </div>
      <div className="tile is-parent is-vertical">
        <div className={["tile is-child", styles.rightTop].join(" ")}>{rightTop}</div>
        <div className="tile is-child">
          {rightBottom}
        </div>
      </div>
    </div>
  )
}

export default TitleGrid
