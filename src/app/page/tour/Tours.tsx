"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchTours } from "@/store/features/tourSlice";
import type { RootState, AppDispatch } from "@/store/store";
import styles from "./tour.module.scss";

export default function Tours() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { tours, loading } = useSelector((state: RootState) => state.tours);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  const handleTourClick = (slug: string) => {
    router.push(`/details/tour/${slug}`);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.toursContainer}>
      {tours.map((tour) => (
        <div 
          key={tour.id} 
          className={styles.heroTourCard}
          onClick={() => handleTourClick(tour.slug)}
        >
          {/* Background Image */}
          <div className={styles.heroImageWrapper}>
            <img
              src={tour.image || "/fallback.jpg"}
              alt={tour.title}
              className={styles.heroImg}
            />
            <div className={styles.heroOverlay}></div>
          </div>

          {/* Content Overlay */}
          <div className={styles.heroContent}>
            <div className={styles.heroTopInfo}>
              <span className={styles.heroTag}>Travel with Adventure Tours</span>
              <span className={styles.heroDuration}>
                {tour.days}D / {tour.nights || tour.days - 1}N
              </span>
            </div>

            <h2 className={styles.heroTitle}>{tour.title}</h2>

            <div className={styles.heroDestinations}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{tour.location}</span>
            </div>

            <div className={styles.heroPriceRow}>
              <div className={styles.heroPrice}>
                <span className={styles.priceFrom}>From</span>
                <span className={styles.priceValue}>PKR {(tour.solo || tour.price).toLocaleString()}</span>
              </div>
              
              <button
                className={styles.heroExploreBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTourClick(tour.slug);
                }}
              >
                Explore Tour
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
