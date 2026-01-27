"use client";

import Package from "./Package";
import styles from "./packagePage.module.css";

export default function PackagesPage() {
  return (
    <div className={styles.packagesPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Explore Our Tour Packages</h1>
            <p className={styles.heroSubtitle}>
              Handcrafted itineraries for unforgettable adventures across Pakistan
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className={styles.packagesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Available Packages</h2>
            <p className={styles.sectionDescription}>
              Choose from our carefully curated tour packages designed to give you the best travel experience
            </p>
          </div>
          <Package />
        </div>
      </section>
    </div>
  );
}
