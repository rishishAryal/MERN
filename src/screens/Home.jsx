import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch]=useState("");

  const loadData = async () => {
    let response = await axios.get("http://localhost:5000/api/foodData");
    response = await response.data;
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };
  useEffect(() => { 
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "conatin !important" }}
        >
          <div className="carousel-inner" id="Carousel--my">
            <div className="carousel-caption" style={{ zIndex: "100" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search} 
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300/?pizza"
                style={{ filter: "brightness(30%)" }}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?drink"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?cake"
                style={{ filter: "brightness(30%)" }}
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
      <div className="m-3 container">
        {foodCat && foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row">
                  {foodItem && foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())) 
                      .map((filteredItem) => {
                        return (
                          <div
                            key={filteredItem._id}
                            className="row col-12 col-sm-3 col-md-5 m-3"
                          >
                            <Card
                              foodName={filteredItem.name}
                              options={filteredItem.options[0]}
                              imgSrc={filteredItem.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
