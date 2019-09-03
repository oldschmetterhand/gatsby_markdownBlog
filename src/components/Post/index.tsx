import React from "react"
import Layout from "../layout"
import SEO from "../seo"

interface Props {
    title:string,
    date: string,
    author: string,
}

const Post: React.FC<Props> = ({
    title,
    date,
    author,
    children
}) => {
  return (
  <Layout>
      <SEO title={""}></SEO>
      <div className="blog-post-container">
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <h3>{author}</h3>
        {children}
      </div>
    </div>  

  </Layout>
  )
}

export default Post
