const fetch = require("node-fetch")
const queryString = require("query-string")


exports.sourceNodes = (
    { actions, createNodeId, createContentDigest },
        configOptions
) => {
  const { createNode, createNodeField } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a photo to match Gatsby's node structure
  const processContent = content => {
    const nodeId = createNodeId(`liferay-content-${content.id}`)
    const nodeContent = JSON.stringify(content)
    const nodeData = Object.assign({}, content, {
      slug: `news/${content.friendlyUrlPath}.html`,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `LiferayStructuredContent`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(content),
      },
    })
    return nodeData
  }

  // plugin code goes here...
  // console.log("Testing gatsby-source-liferay plugin", configOptions)

  // Construct Liferay API URL for structured-content
  const apiUrl = `http://${configOptions.host}/o/headless-delivery/v1.0/sites/${configOptions.siteId}/structured-contents/`

  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${configOptions.authKey}`
    }
  }


  // Gatsby expects sourceNodes to return a promise
  return (
      // Fetch a response from the apiUrl
      fetch(apiUrl, init)
      // Parse the response as JSON
          .then(response => response.json())
  // Process the JSON data into a node
      .then(data => {
    // For each query result (or 'items')
    data.items.forEach(content => {
       console.log("Liferay article: ", content.title)

      // Process the data to match the structure of a Gatsby node
      const nodeData = processContent(content)

      //console.log("nodeData--> ", nodeData);

      // Use Gatsby's createNode helper to create a node from the node data
      createNode(nodeData)
    })

})
)
}