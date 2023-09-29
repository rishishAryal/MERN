import React from "react";

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);

  const handleAddToCart = () => {};

  return (
    <div>
      <div>
        <div
          className="card mt-4"
          style={{ width: "18rem", maxHeight: "450px" }}
        >
          <img
            src={props.imgSrc}
            className="card-img-top"
            alt="..."
            style={{ maxHeight: "180px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodName}</h5>
            <p className="card-text">This is some imp</p>
            <div className="container w-100">
              <select className="m-2 h-100  bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded">
                {priceOptions.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">Total Price</div>
              <hr />
              <button
                className="btn btn-success justify-center ms-2"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
