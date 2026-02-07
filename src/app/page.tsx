"use client";

import React, { useEffect, useState } from "react";
import { Spin, Empty, Carousel } from "antd";
import Link from "next/link";
import axios from "axios";
import styles from "./homePage.module.scss";
import { home } from "./utils/home";
import PopularDestinations from "./components/PopularDestinations";

export default function HomePage() {
  const [tours, setTours] = useState([]);
  const [toursLoading, setToursLoading] = useState(true);
  
  // Commented out Pixabay integration - using mock data
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [query, setQuery] = useState("mountains");

  // const fetchImages = async (searchTerm = "mountains") => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(`/api/pixabey?q=${encodeURIComponent(searchTerm)}`);
  //     setImages(res.data);
  //   } catch (error) {
  //     console.error("Pixabay fetch error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchTours = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tours');
      console.log("tours data in component",res.data);
      setTours(res.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setToursLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
    // fetchImages(query); // Commented out
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* HERO CAROUSEL */}
      <section className={styles.heroSection}>
        <Carousel 
          autoplay 
          autoplaySpeed={5000} 
          effect="fade" 
          pauseOnHover={false}
          className={styles.heroCarousel}
        >
          {home.map((item) => (
            <div key={item.id} className={styles.heroSlide}>
              <div className={styles.heroImageWrapper}>
                <img src={item.img} alt={item.title} className={styles.heroImage} />
                <div className={styles.heroOverlay}></div>
              </div>

              <div className={styles.heroContent}>
                <div className={styles.heroTextWrapper}>
                  <h1 className={styles.heroTitle}>{item.title}</h1>
                  {item.description && (
                    <p className={styles.heroDescription}>{item.description}</p>
                  )}
                  <div className={styles.heroButtons}>
                    <Link href="/tour" className={styles.heroBtn}>
                      Explore Tours
                    </Link>
                    <Link href="/page/package" className={styles.heroBtnSecondary}>
                      View Packages
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* POPULAR TOURS SECTION */}
      <section className={styles.toursSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Our Amazing Tours ✈️</h2>
          <p className={styles.sectionSubtitle}>
            Discover breathtaking destinations and create unforgettable memories
          </p>
        </div>

        {toursLoading ? (
          <div className={styles.centerSmall}>
            <Spin size="large" />
          </div>
        ) : tours.length > 0 ? (
          <div className={styles.toursGrid}>
            {tours.slice(0, 4).map((tour) => (
              <Link 
              key={tour._id || tour.slug}  // ✅ use _id or slug
              href={`/details/tour/${tour.slug}`}
                className={styles.tourCardNew}
              >
                <div className={styles.tourImageContainer}>
                  <img src={tour.image} alt={tour.title} className={styles.tourImg} />
                  <div className={styles.tourBadge}>
                    <span className={styles.badgeText}>{tour.days} DAYS TOUR</span>
                    <span className={styles.badgeDates}>{tour.days}-{tour.days + 2} DEC</span>
                  </div>
                  <button className={styles.heartBtn}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>
                </div>

                <div className={styles.tourCardContent}>
                  <div className={styles.tourHeader}>
                    <h3 className={styles.tourTitleNew}>{tour.title}</h3>
                    <p className={styles.tourDate}>01-04 JAN 2026</p>
                  </div>

                  <div className={styles.priceRow}>
                    <div className={styles.priceItem}>
                      <span className={styles.priceLabel}>SOLO</span>
                      <span className={styles.priceValue}>{(tour.solo || tour.price).toLocaleString()}</span>
                    </div>
                    <div className={styles.priceItem}>
                      <span className={styles.priceLabel}>COUPLE</span>
                      <span className={styles.priceValue}>{(tour.couple || tour.price * 2.25).toLocaleString()}</span>
                    </div>
                    <div className={styles.priceItem}>
                      <span className={styles.priceLabel}>DELUXE</span>
                      <span className={styles.priceValue}>{(tour.deluxe || tour.price * 3.5).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className={styles.tourFooter}>
                    <div className={styles.locationInfo}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{tour.location}</span>
                    </div>
                    <span className={styles.tourId}>DTS # {10405 + tour.id}</span>
                  </div>

                  <div className={styles.contactInfo}>
                    0317-777-3141 | TRAVELWITHZUNAIR.PK
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Empty description="No tours available at the moment" />
          </div>
        )}

        {tours.length > 0 && (
          <div className={styles.viewAllWrapper}>
            <Link href="/tour" className={styles.viewAllBtn}>
              View All Tours
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <PopularDestinations />

      {/* WEEKEND GATEWAY SECTION - COMMENTED OUT (Pixabay Integration) */}
      {/* <section className={styles.weekendSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Weekend Gateway 🏞️</h2>
          <p className={styles.sectionSubtitle}>
            Explore stunning destinations for your perfect weekend escape
          </p>
        </div>

        <div className={styles.searchWrapper}>
          <Search
            placeholder="Search destinations (e.g., Skardu, Hunza, Mountains)"
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={(value) => fetchImages(value || "mountains")}
            allowClear
            className={styles.searchInput}
          />
        </div>

        {loading ? (
          <div className={styles.centerSmall}>
            <Spin size="large" />
          </div>
        ) : images.length > 0 ? (
          <div className={styles.imageGrid}>
            {images.map((img, index) => (
              <Card
                key={`${img.id}-${index}`}
                hoverable
                className={styles.imageCard}
                cover={
                  <div className={styles.imageWrapper}>
                    <img src={img.url} alt={img.tags || img.alt} />
                  </div>
                }
              >
                <div className={styles.imageCardContent}>
                  <h3 className={styles.imageTitle}>{img.tags || img.alt}</h3>
                  <p className={styles.imageAuthor}>
                    By {img.user || img.photographer}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Empty description="No images found. Try a different search!" />
        )}
      </section> */}

      {/* CALL TO ACTION SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready for Your Next Adventure?</h2>
          <p className={styles.ctaDescription}>
            Book your dream tour today and create memories that last a lifetime
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/page/package" className={styles.ctaPrimaryBtn}>
              Browse Packages
            </Link>
            <Link href="/public/contact" className={styles.ctaSecondaryBtn}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
