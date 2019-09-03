import React from "react"
import Img from "gatsby-image"

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
      <Img fixed={fixedImageGraphQl}/>
      <p>{title} - {date}</p>
      <p>Von: {author}</p>
      <a href={path}>Link</a>
      {children}
      <br></br>
      <hr></hr>
      <br></br>
      <br></br>
    </div>
  )
}

export default BlogPreview;


