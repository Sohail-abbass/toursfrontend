"use client";

import { useRouter } from "next/navigation";
import { Package } from "@/type/package";
import styles from "./package.module.scss";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/details/package/${pkg.slug}`);
  };

  return (
    <div className={styles.heroPackageCard} onClick={handleCardClick}>
      {/* Background Image */}
      <div className={styles.heroImageWrapper}>
        <img
          src={pkg.mainImage}
          className={styles.heroImg}
          alt={pkg.title}
          loading="lazy"
        />
        <div className={styles.heroOverlay}></div>
      </div>

      {/* Content Overlay */}
      <div className={styles.heroContent}>
        <div className={styles.heroTopInfo}>
          <span className={styles.heroTag}>Travel with Adventure Tours</span>
          <span className={styles.heroDuration}>{pkg.duration.days}D / {pkg.duration.nights}N</span>
        </div>

        <h2 className={styles.heroTitle}>{pkg.title}</h2>

        <div className={styles.heroDestinations}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{pkg.destinations.map(d => d.name).join(' • ')}</span>
        </div>

        <div className={styles.heroPriceRow}>
          <div className={styles.heroPrice}>
            <span className={styles.priceFrom}>From</span>
            <span className={styles.priceValue}>PKR {pkg.price.toLocaleString()}</span>
          </div>
          
          <button
            className={styles.heroExploreBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Explore Package
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
