import React from "react"
import Img from "gatsby-image"
import styles from "./styles.module.scss"

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
    <div>
      <h3 className="title is-5">{title}</h3>
      <h4 className="subtitle is-6">Von: {author} - {date}</h4>
      <br></br>
      <div className={styles.textContainer}>
        {children}
      </div>
      <br></br>
      <Img fixed={fixedImageGraphQl}/>
      <br></br>
      <a className={styles.link} href={path}>Zum Beitrag</a>
      <br></br>
      <hr></hr>
      <br></br>
    </div>
  )
}

export default BlogPreview;


