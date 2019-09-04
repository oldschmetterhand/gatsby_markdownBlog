import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink"

interface Props {
    posts: Array<{text: string, path: string}>
}

const PostsSummary: React.FC<Props> = ({
    posts
}) => {
    return (
        <ul className="list">
            {posts.map(post=>(
                <AniLink fade duration={1} to={post.path} className="list-item">{post.text}</AniLink>
            ))}
        </ul>
    )
}


export default PostsSummary