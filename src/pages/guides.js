import PropTypes from "prop-types";
import React from "react";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Cardslist from "../components/Card/Cardslist";
import GuidesList from "../components/GuidesList/GuidesList";
import { ThemeContext } from "../layouts";

import Seo from "../components/Seo";

const GuidesPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="All Our Guides To Cannabis Culture" theme={theme} />
            </header>
            <GuidesList theme={theme} />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

GuidesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default GuidesPage;

export const query = graphql`
  query GuidesQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
