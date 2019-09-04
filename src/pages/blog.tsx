import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import BlogPreview from "../components/BlogPreview"
import TitleGrid from "../components/Layout/TitleGrid"
import { graphql } from "gatsby"

interface Props {
  data: any //from GraphQl
}

const blog: React.FC<Props> = ({ data }) => {
  let getPostOverview = () => {
    return (
      <>
        <p className="title is-5">Summary</p>
        <ul className="list">
          {data.allMarkdownRemark.edges.map(post => (
            <li
              className="list-item"
              key={post.node.frontmatter.title + "_overview"}
            >
              {post.node.frontmatter.title} -- {post.node.frontmatter.path}
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog</h1>
      <p>Welcome to the Blog-Overview!</p>
      <p>
        The Posts here are <em>ordered by date</em> --- newest first.
      </p>
      <p>Have fun!</p>
      <br></br>
      <br></br>

      <TitleGrid rightTop={getPostOverview()}>
        <p className="title is-3">Overview</p>
        {data.allMarkdownRemark.edges.map(post => (
          <BlogPreview
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            author={post.node.frontmatter.author}
            path={post.node.frontmatter.path}
            fixedImageGraphQl={
              post.node.frontmatter.featuredImage.childImageSharp.fixed
            }
            key={post.node.frontmatter.path}
          ></BlogPreview>
        ))}
      </TitleGrid>
    </Layout>
  )
}

export default blog

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            path
            author
            featuredImage {
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
