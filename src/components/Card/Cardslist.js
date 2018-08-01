import React from "react";
import PropTypes from "prop-types";

const Cardslist = props => {
  const { children } = props;

  return (
    <React.Fragment>
      <div className="cardslist">{children}</div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .cardslist {
          text-align: center;
        }

        @from-width desktop {
          .cardslist {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Cardslist.propTypes = {
  children: PropTypes.node.isRequired
};

export default Cardslist;
