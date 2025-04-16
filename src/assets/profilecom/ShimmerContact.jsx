// ShimmerContact.js
import React from "react";
import "./Shimmer.css";

const ShimmerContact = () => {
  return (
    <div className="shimmer-item animate-pulse">
      <div className="shimmer shimmer-avatar mr-3"></div>
      <div className="flex-1 space-y-2">
        <div className="shimmer shimmer-text"></div>
        <div className="shimmer shimmer-subtext"></div>
      </div>
    </div>
  );
};

export default ShimmerContact;

