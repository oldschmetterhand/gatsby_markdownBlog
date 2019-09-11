import React from "react"
import Layout from "../Layout"
import SEO from "../Seo"

interface Props {
  title: string
  date: string
  author: string
}

const Post: React.FC<Props> = ({ title, date, author, children }) => {
  return (
    <Layout showHeader={false}>
      <SEO title={title}></SEO>
      <div className="blog-post-container">
        <div className="blog-post">
          <h3>{title}</h3>
          <h4>{date}</h4>
          <h5>{author}</h5>
          <hr></hr>
          <div className="content">{children}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Post
