import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default ({data}) => {
  return (
      <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <ul>
          {data.allLiferayStructuredContent.edges.map(({ node }, index) => (
              <li><a href={node.slug}> {node.title} </a></li>
          ))}
        </ul>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
}

//export default IndexPage


export const query = graphql`
    {
      allLiferayStructuredContent{
        edges{
          node{
            title
            slug
          }
        }
      }
    }
`