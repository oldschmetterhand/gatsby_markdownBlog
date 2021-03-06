import React from "react"
import Layout from "../../specific/Layout"
import TitleGrid from "../../specific/layout/TitleGrid"
import SEO from "../SEO"
import Img from "gatsby-image"
import styles from "./styles.module.scss"

interface Props {
  title: string
  date: string
  author: string
  previewImage?: any
}

const Post: React.FC<Props> = ({ title, date, author, children, previewImage = undefined }) => {
  const metaData = (
    <div className={styles.articleInfo}>
      <h2 className="is-size-6">Article Info</h2>
      <br></br>
      {previewImage ? <Img fixed={previewImage}></Img> : null}
      <hr></hr>
      <h3>{title}</h3>
      <h3>{date}</h3>
      <h3>{author}</h3>
      <br></br>
    </div>
  )

  return (
    <Layout showHeader={false}>
      <SEO title={title}></SEO>
      <TitleGrid rightTop={null} rightBottom={null}>
        <div className={styles.articleFull}>{children}</div>
      </TitleGrid>
    </Layout>
  )
}

export default Post
