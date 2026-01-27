"use client";

import React from "react";
import Tours from "./Tours";
import styles from "./tourPage.module.css";

export default function TourPage() {
  return (
    <div className={styles.toursPageWrapper}>
      {/* Hero Section for Tours */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Discover Our Amazing Tours</h1>
        <p className={styles.heroSubtitle}>
          Handpicked adventures for unforgettable experiences across breathtaking landscapes.
        </p>
      </div>

      {/* Main Tours Content */}
      <div className={styles.mainContent}>
        <Tours />
      </div>
    </div>
  );
}
