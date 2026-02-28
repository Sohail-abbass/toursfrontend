"use client";

import React, { useEffect, useState } from 'react';
import styles from './popularDestinations.module.css';
// sfsdf
interface Destination {
  id: number;
  slug: string;
  name: string;
  region: string;
  shortDescription: string;
  mainImage: string;
  altitude: string;
  bestTimeToVisit: string;
  featured: boolean;
}

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
        const res = await fetch(`${BASE_URL}/destinations`);
      const data = await res.json();
      // Filter only featured destinations
      const featured = data.filter((dest: Destination) => dest.featured);
      setDestinations(featured);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (destination: Destination) => {
    // Scroll to top of page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Optional: Show a message or trigger any action
    console.log('Exploring:', destination.name);
  };

  if (loading) {
    return (
      <section className={styles.destinationsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Loading...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.destinationsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Our Popular Destinations</h2>
          <p className={styles.sectionSubtitle}>
            Unforgettable Journeys to the Heart of Pakistan, Where Every Destination Tells a Story
          </p>
        </div>

        {/* Destinations Grid */}
        <div className={styles.destinationsGrid}>
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className={styles.destinationCard}
              onClick={() => handleCardClick(destination)}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={destination.mainImage}
                  alt={destination.name}
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay}></div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{destination.name}</h3>
                <div className={styles.cardInfo}>
                  <div className={styles.infoItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{destination.region}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    <span>{destination.altitude}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={styles.viewAllWrapper}>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.viewAllBtn}
          >
            Explore All Destinations
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;

