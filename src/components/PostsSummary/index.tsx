import React from "react"
import styles from "./styles.module.scss"
import { Link } from "gatsby"

interface Props {
  posts: Array<{ text: string, path: string, date: string}>
}

const PostsSummary: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <p className="title is-4">Zusammenfassung</p>
      <ul className="">
        {posts.map(post => (
          <li className={styles.li} key={`summary_${post.text}`}>
            <Link
              to={post.path}
            >
              <h3 className=" title is-6">{post.text}</h3>
              <h4 className="subtitle is-7">{post.date}</h4>
            </Link>
          </li>
        ))}
      </ul>
      <hr className={styles.hr}></hr>
    </>
  )
}

export default PostsSummary
