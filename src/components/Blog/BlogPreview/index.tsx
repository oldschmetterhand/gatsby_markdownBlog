import React from "react"
import Img from "gatsby-image"
import styles from "./styles.module.scss"
import { Link } from "gatsby"

interface Props { 
  title: string
  date: string
  author?: string
  path: string
  fixedImageGraphQl?: any
}

const BlogPreview: React.FC<Props> = ({  
  title,
  date,
  author = "An anonymous sheep",
  path,
  children = null,
  fixedImageGraphQl = null
}) => {
  return (
    <div className={styles.mainContainer}>
      <h1 className="title is-5">{title}</h1>
      <h4 className={["subtitle is-6", styles.subTitle].join(" ")}> - {author} / {date}</h4>
      <br></br>
      <div className={styles.textContainer}>
        {children}
      </div>
      <br></br>
      {fixedImageGraphQl ? <Img fixed={fixedImageGraphQl}/> : null}
      <br></br>
      <Link className={styles.link} to={path}>Zum Beitrag | ooo></Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default BlogPreview;


