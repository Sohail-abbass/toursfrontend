"use client";

import { useRouter } from "next/navigation";
import styles from "./tour.module.scss";

export default function Tour({ tour }) {
  const router = useRouter();

  const handleTourClick = () => {
    router.push(`/details/tour/${tour.slug}`);
  };

  return (
    <div
      className={styles.heroTourCard}
      onClick={handleTourClick}
    >
      <div className={styles.heroImageWrapper}>
        <img
          src={tour.image || "/fallback.jpg"}
          alt={tour.title}
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroTopInfo}>
          <span className={styles.heroTag}>Travel with Adventure Tours</span>
          <span className={styles.heroDuration}>
            {tour.days}D / {tour.nights || tour.days - 1}N
          </span>
        </div>

        <h2 className={styles.heroTitle}>{tour.title}</h2>

        <div className={styles.heroDestinations}>
          <span>{tour.location}</span>
        </div>

        <div className={styles.heroPriceRow}>
          <div className={styles.heroPrice}>
            PKR {(tour.solo || tour.price).toLocaleString()}
          </div>

          <button
            className={styles.heroExploreBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleTourClick();
            }}
          >
            Explore Tour
          </button>
        </div>
      </div>
    </div>
  );
}