import {graphql} from "gatsby";
import React from "react";
import Layout from "../components/layout"


export default class News extends React.Component{
    render() {
        const { data } = this.props;
        const { liferayStructuredContent: { contentFields, dateModified, creator: { name }, title, description } } = data;


        function createMarkup(html) {
            // console.log("createMarkup-->" + html);
            return {__html: html};
        }

        return(

            <Layout>

                <div className="news">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="intro blog-intro text-center col">
                                <div className="container-fluid container-fluid-max-lg">
                                    <h1 className="h1">News</h1>
                                    <h2 className="h3">Latest updates from an external Liferay</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <article>

                                    <small>
                                        {dateModified} {name}
                                    </small>

                                    <div dangerouslySetInnerHTML={createMarkup(description) } />

                                    <h1>{title}</h1>

                                    <div dangerouslySetInnerHTML={createMarkup(contentFields[0].value.data) } />

                                </article>
                            </div>
                        </div>
                    </div>


                </div>
            </Layout>
        )
    }

}


export const pageQuery = graphql`
  query($slug: String!){
      liferayStructuredContent(slug:{eq: $slug }) {
        key
        dateModified(formatString: "MMMM DD, YYYY")
        title
        description
        slug
        creator {
          name
          familyName
          givenName
        }
        contentFields{
          value{
            data
          }
        }
      }
  }  
    
`;