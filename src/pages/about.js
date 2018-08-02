import React from "react";

import Link from "gatsby-link";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";

import Seo from "../components/Seo";

export default ({ data }) => {
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <h1 />
              <Headline title={data.prismicAbout.data.title.text} theme={theme} />
            </header>
            <img src={data.prismicAbout.data.image.url} alt={data.prismicAbout.data.title.text} />
            <Bodytext theme={theme} html={data.prismicAbout.data.body.html} />
            <style jsx>
              {`
                img {
                  min-width: 100%;
                  max-width: 100%;
                  max-height: 400px;
                }
              `}
            </style>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={data.site.siteMetadata.facebook} />
    </React.Fragment>
  );
};

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    prismicAbout {
      uid
      data {
        image {
          url
        }
        title {
          html
          text
        }
        body {
          html
          text
        }
      }
    }
  }
`;
