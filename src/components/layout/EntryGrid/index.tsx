import React from "react"
import styles from "./styles.module.scss"

const EntryGrid = () => {
  return (
    <div className="tile is-ancestor content">
      <div className="tile is-6 is-vertical is-parent">
        <div className={["tile is-child content", styles.imgContainer].join(" ")}>
          
          <h3>Project Description</h3>
          
        </div>
        <div className="tile is-child">
          <p className="title">fluff</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </div>
        <div className="tile is-child">
          <p className="title">Two</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </div>
      </div>
      <div className="tile is-parent is-vertical">
        <div className={["tile is-child", styles.imgContainer02].join(" ")}>
          <p className="title" style={{color:"lightgrey"}}>Team</p>
        </div>
        <div className="tile is-child">
          <p className="title">Three</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum
            volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi
            maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis
            semper odio felis ut quam.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EntryGrid
