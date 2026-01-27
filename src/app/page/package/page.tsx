"use client";

import Package from "./Package";
import styles from "./packagePage.module.css";

export default function PackagesPage() {
  return (
    <div className={styles.packagesPageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Explore Tour Packages</h1>
          <p className={styles.heroSubtitle}>
            Handcrafted travel experiences designed for unforgettable adventures across Pakistan's most stunning destinations.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Destinations</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>Happy Travelers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9★</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Available Packages</h2>
          <p className={styles.sectionDescription}>
            Choose from our carefully curated packages for your next adventure
          </p>
        </div>
        
        <Package />
      </main>
    </div>
  );
}
