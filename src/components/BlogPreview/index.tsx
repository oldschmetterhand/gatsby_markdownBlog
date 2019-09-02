import React from "react"


interface Props { 
  title: string
  date: string
  author?: string
  path: string
}

const BlogPreview: React.FC<Props> = ({  
  title,
  date,
  author = "An anonymous sheep",
  path,
}) => {
  return (
    <div>
      <p>{title} - {date}</p>
      <p>Von: {author}</p>
      <a href={path}>Link</a>
      <br></br>
      <hr></hr>
    </div>
  )
}

export default BlogPreview;


