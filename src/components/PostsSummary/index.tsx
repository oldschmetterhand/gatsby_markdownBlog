import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

interface Props {
  posts: Array<{ text: string; path: string }>
}

const PostsSummary: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <p className="title is-4">Übersicht</p>
      <ul className="">
        {posts.map(post => (
          <li>
            <AniLink
              key={`summary_${post.path}`}
              fade
              duration={1}
              to={post.path}
              className=""
            >
              {post.text}
            </AniLink>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsSummary
