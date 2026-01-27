"use client";

import React, { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import Link from 'next/link';
import styles from './destinations.module.css';

interface Destination {
  id: number;
  slug: string;
  name: string;
  region: string;
  shortDescription: string;
  mainImage: string;
  altitude: string;
  bestTimeToVisit: string;
  activities: string[];
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" tip="Loading destinations..." />
      </div>
    );
  }

  if (!destinations.length) {
    return (
      <div className={styles.emptyWrapper}>
        <Empty description="No destinations available" />
      </div>
    );
  }

  return (
    <div className={styles.destinationsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Discover Pakistan's Beauty</h1>
            <p className={styles.heroSubtitle}>
              Explore breathtaking destinations across the country
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className={styles.destinationsSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={destination.mainImage}
                    alt={destination.name}
                    className={styles.image}
                  />
                  <div className={styles.overlay}></div>
                </div>

                <div className={styles.content}>
                  <h2 className={styles.title}>{destination.name}</h2>
                  <p className={styles.region}>{destination.region}</p>
                  <p className={styles.description}>{destination.shortDescription}</p>

                  <div className={styles.details}>
                    <div className={styles.detail}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      </svg>
                      <span>{destination.altitude}</span>
                    </div>
                    <div className={styles.detail}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      <span>{destination.bestTimeToVisit}</span>
                    </div>
                  </div>

                  <div className={styles.activities}>
                    {destination.activities.slice(0, 3).map((activity, idx) => (
                      <span key={idx} className={styles.activityTag}>
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

