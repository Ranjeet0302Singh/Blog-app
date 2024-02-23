import React from "react";
import Banner from "../assets/sdg.jpg";
import { Link } from "react-router-dom";

const post = () => {
  return (
    <div>
      {" "}
      <div className="post">
        <div className="banner">
          <img src={Banner} alt="" />
        </div>

        <div className="texts">
          <h2>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            libero magnam excepturi deleniti porro accusantium.
          </h2>
          <p className="info">
            <Link to="#" className="author">
              Ranjeet
            </Link>
            <time>03-02-2002 05.00</time>
          </p>
          <p className="summary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quo
            quos impedit explicabo saepe sunt nisi expedita incidunt voluptatum.
            Dolorem dignissimos aliquid labore explicabo sunt blanditiis
            molestiae? Enim, consequatur magnam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default post;
