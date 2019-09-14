import React from "react"
import Layout from "../Layout"
import TitleGrid from "../layout/TitleGrid"
import SEO from "../Seo"
import Img from "gatsby-image"

interface Props {
  title: string
  date: string
  author: string
  previewImage?: any
}

const Post: React.FC<Props> = ({ title, date, author, children, previewImage }) => {
  const metaData = (
    <div className="blog-post">
      <h2>Article Info</h2>
      <br></br>
      <Img fixed={previewImage}></Img>
      <hr></hr>
      <h3>{title}</h3>
      <h4>{date}</h4>
      <h5>{author}</h5>
    </div>
  )

  return (
    <Layout>
      <SEO title={title}></SEO>
      <TitleGrid rightTop={metaData} rightBottom={null}>
        <div className="content">{children}</div>
      </TitleGrid>
    </Layout>
  )
}

export default Post
