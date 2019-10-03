/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    query {
      allLiferayStructuredContent {
          edges {
            node {
              title
              description
              slug
              friendlyUrlPath
              contentFields {
                value {
                  data
                }
              }
            }
          }
      }
    }
  `)
    result.data.allLiferayStructuredContent.edges.forEach(({ node }) => {
        const { createPage } = actions;
    const lrTemplate = path.resolve(__dirname, `./src/templates/news.js`);
    const {slug } = node

    createPage({
        path: node.slug,
        component:lrTemplate,
        context: {
            slug,
        }
    });
})
}