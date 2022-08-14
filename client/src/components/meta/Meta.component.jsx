import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Sacred Symbols",
  description: "Best place for Playstation enthusiasts",
  keywords: "collector's edition, steelbook, ps4, ps5",
};

export default Meta;
