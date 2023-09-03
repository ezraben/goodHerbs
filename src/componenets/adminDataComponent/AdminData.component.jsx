// import { useEffect, useState } from "react";

import { EmojiFrown } from "react-bootstrap-icons";

const AdminDataComponent = ({ productName, whoLiked }) => {
  return (
    <div>
      <div className="product">
        <div className="mb-3">
          <h1>
            {" "}
            product name: <span className="text-primary">{productName} </span>
          </h1>
          {whoLiked.length > 0 ? (
            <h2 className="text-success"> liked by:</h2>
          ) : (
            <h2 className="text-danger">
              {" "}
              no likes yet <EmojiFrown />
            </h2>
          )}
        </div>

        <div className="mb-3">
          {whoLiked.map((arr) => (
            <h2 className="text-primary" key={arr}>
              - {arr}
            </h2>
          ))}
        </div>
        {whoLiked.length > 0 && (
          <div className="mb-3">
            <h2 className="text-success">
              {" "}
              Total likes of product: {whoLiked.length}{" "}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDataComponent;
