import React from "react";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{objectFit:"conatin !important"}}
      >
        <div className="carousel-inner" id="Carousel--my">
          <div className="carousel-caption" style={{zIndex:"100"}}>
          <form className="d-flex">
         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
         <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
          </div>
          <div className="carousel-item active" >
            <img
              src="https://source.unsplash.com/random/300×300/?pizza"
              style={{ filter:"brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?drink"
              className="d-block w-100"
              style={{ filter:"brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?cake"
              style={{ filter:"brightness(30%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
