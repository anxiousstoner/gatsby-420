import React from "react";
import PropTypes from "prop-types";

const HomeSection = props => {
  const { children, theme } = props;

  return (
    <React.Fragment>
      <article className="article">{children}</article>

      {/* --- STYLES --- */}
      <style jsx>{`
        .article {
          padding: ${theme.space.inset.default};
          margin: 0 auto;
          text-align: center;
        }
        @from-width tablet {
          .article {
            padding: ${`calc(${theme.space.default}) calc(${theme.space.default} * 2)`};
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @from-width desktop {
          .article {
            max-width: 1000px;
            padding: 40px;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

HomeSection.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
};

export default HomeSection;
