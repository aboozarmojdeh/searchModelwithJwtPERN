import React, { Fragment } from "react";
import "./Home.css";
import mainPagefashion from "../img/mainPagefashion.png";
const Home = () => {
  return (
    <Fragment>
      <div className="container">
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link" href="/register">
              Join now
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/login">
              Sign in
            </a>
          </li>
        </ul>
        <div className="container my-5">
          <div class="row">
            <div class="col-sm">
              <h1 className="mainPage-h1">
                Welcome to your supermodel search engine
              </h1>
            </div>
            <div class="col-sm">
              <img src={mainPagefashion} width="100%" height="400" alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
