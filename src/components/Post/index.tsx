import React from "react"
import Layout from "../Layout"
import TitleGrid from "../layout/TitleGrid"
import SEO from "../Seo"
import Img from "gatsby-image"
import styles from "./styles.module.scss"
import BackButton from "../BackButton"

interface Props {
  title: string
  date: string
  author: string
  previewImage?: any
}

const Post: React.FC<Props> = ({ title, date, author, children, previewImage }) => {
  const metaData = (
    <div className={styles.articleInfo}>
      <h2 className="is-size-6">Article Info</h2>
      <br></br>
      <Img fixed={previewImage}></Img>
      <hr></hr>
      <h3>{title}</h3>
      <h3>{date}</h3>
      <h3>{author}</h3>
      <br></br>
      <BackButton/>
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
