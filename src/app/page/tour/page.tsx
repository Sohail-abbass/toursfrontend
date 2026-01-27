"use client";

import React from "react";
import Tours from "./Tours";
import styles from "./tourPage.module.css";

export default function TourPage() {
  return (
    <div className={styles.toursPageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Amazing Tours</h1>
          <p className={styles.heroSubtitle}>
            Explore breathtaking destinations with handpicked adventures designed for unforgettable experiences across stunning landscapes.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>25+</span>
              <span className={styles.statLabel}>Tours</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Happy Travelers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5.0★</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Available Tours</h2>
          <p className={styles.sectionDescription}>
            Choose from our carefully curated tours for your next adventure
          </p>
        </div>
        
        <Tours />
      </main>
    </div>
  );
}
