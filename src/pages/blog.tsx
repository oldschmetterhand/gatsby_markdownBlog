import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPreview from "../components/BlogPreview"
import { graphql } from "gatsby"
import Img from "gatsby-image"

interface Props {
  data: any //from GraphQl
}

const NotFoundPage: React.FC<Props> = ({ data }) => {
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
      {data.allMarkdownRemark.edges.map(post => (
        <>
          <BlogPreview
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            author={post.node.frontmatter.author}
            path={post.node.frontmatter.path}
            fixedImageGraphQl = {post.node.frontmatter.featuredImage.childImageSharp.fixed}
          >
          </BlogPreview>
        </>
      ))}
    </Layout>
  )
}

export default NotFoundPage

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
