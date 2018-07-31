import React from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";

export default ({ data }) => {
  const post = data.prismicBlogPost;
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title={post.data.title.text} theme={theme} />
              <img src={post.data.image.url} />
            </header>
            <Bodytext theme={theme} html={post.data.body.html} />

            <style jsx>{`
              img {
                max-width: 100%;
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export const query = graphql`
  query BlogPostbyUIDQuery($slug: String!) {
    prismicBlogPost(uid: { eq: $slug }) {
      id
      uid
      data {
        title {
          html
          text
        }
        image {
          url
        }
        body {
          html
          text
        }
      }
    }
  }
`;
