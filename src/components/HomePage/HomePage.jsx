import React from "react";
import styles from "./HomePage.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__row}>
        {/* <Link to="/Buyer">
          <Button type="buyer" />
        </Link> */}
        <Link to="/Seller">
          <Button type="seller" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
