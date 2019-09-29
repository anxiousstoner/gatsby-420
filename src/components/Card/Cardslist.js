import React from "react";
import PropTypes from "prop-types";

const Cardslist = props => {
  const { children, horizontal } = props;

  return (
    <React.Fragment>
      <div className={horizontal ? "cardslist-horizontal" : "cardslist"}>{children}</div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .cardslist,
        .cardslist-horizontal {
          text-align: center;
        }

        @from-width desktop {
          .cardslist-horizontal {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
          }
          .cardslist {
            display: flex;
            flex-direction: column;
            text-align: left;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Cardslist.propTypes = {
  horizontal: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Cardslist.defaultProps = {
  horizontal: false
};

export default Cardslist;
