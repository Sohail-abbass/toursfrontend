"use client";

import React from 'react';
import styles from './about.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Beautiful Hero Banner - Journey Style */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <img 
            src="/mountain2.jpg" 
            alt="Adventure Tours Banner" 
            className={styles.heroBackgroundImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroTextWrapper}>
            <h1 className={styles.heroTitle}>Journeying with Purpose</h1>
            <p className={styles.heroSubtitle}>
              Dedicated to curating unforgettable travel experiences and fulfilling spiritual aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Company Overview Banner */}
        {/* <section className={styles.overviewBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerIcon}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className={styles.bannerTitle}>Pakistan's Leading Adventure Tour Company</h2>
            <p className={styles.bannerText}>
              Specializing in breathtaking mountain expeditions, cultural experiences, and unforgettable journeys 
              across the most stunning landscapes in South Asia.
            </p>
          </div>
        </section> */}

        {/* Our Story */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Our Journey</span>
            <h2 className={styles.sectionTitle}>The Story Behind Adventure Tours</h2>
          </div>
          <div className={styles.contentGrid}>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <img src="/mine.jpeg" alt="founder" className={styles.sectionImage} />
                <div className={styles.imageOverlayBadge}>Since 2010</div>
              </div>
            </div>
            <div className={styles.textContent}>
              <p className={styles.paragraph}>
                <span className={styles.firstLetter}>F</span>ounded in 2010, Adventure Tours has been at the forefront of creating exceptional 
                travel experiences across Pakistan's most breathtaking destinations. What started as 
                a small team of passionate adventurers has grown into a leading tour company, trusted 
                by thousands of travelers worldwide.
              </p>
              <p className={styles.paragraph}>
                Our journey began with a simple vision: to showcase the magnificent beauty of Pakistan's 
                northern regions to the world. From the towering peaks of K2 to the serene valleys of 
                Hunza, we've helped countless adventurers discover the hidden gems of our beautiful country.
              </p>
              <div className={styles.highlightBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
                <p>We've successfully organized over 2,000 expeditions to Pakistan's most remote and beautiful locations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Our Purpose</span>
            <h2 className={styles.sectionTitle}>Mission & Values</h2>
          </div>
          <div className={styles.contentGridReverse}>
          <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <img src="/mountain2.jpg" alt="Adventure tours" className={styles.sectionImage} />
              </div>
            </div>
            <div className={styles.textContent}>
              <p className={styles.paragraph}>
                <span className={styles.firstLetter}>A</span>t Adventure Tours, our mission is to create transformative travel experiences that 
                connect people with nature, culture, and adventure. We believe that travel has the 
                power to broaden perspectives, foster understanding, and create lasting memories.
              </p>
           
              <div className={styles.valuesList}>
                <div className={styles.valueItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  <span>Sustainable Tourism</span>
                </div>
                <div className={styles.valueItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  <span>Cultural Respect</span>
                </div>
                <div className={styles.valueItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  <span>Safety & Excellence</span>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Us</span>
            <h2 className={styles.sectionTitle}>Why Choose Adventure Tours?</h2>
            <p className={styles.sectionSubtitle}>
              We go above and beyond to ensure your journey is extraordinary
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Expert Guides</h3>
              <p className={styles.featureDescription}>
                Our experienced local guides bring destinations to life with their knowledge and passion
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Flexible Scheduling</h3>
              <p className={styles.featureDescription}>
                We offer tours year-round with customizable itineraries to match your preferences
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Personalized Service</h3>
              <p className={styles.featureDescription}>
                Small group sizes ensure personalized attention and memorable experiences
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Best Locations</h3>
              <p className={styles.featureDescription}>
                Access to exclusive destinations and hidden gems that most tourists never see
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Safety First</h3>
              <p className={styles.featureDescription}>
                Your safety is our priority with comprehensive insurance and emergency support
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Best Value</h3>
              <p className={styles.featureDescription}>
                Competitive pricing with no hidden costs and exceptional value for money
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBackground}>
            <img src="/home3.jpg" alt="CTA Background" className={styles.ctaBackgroundImage} />
            <div className={styles.ctaOverlay}></div>
          </div>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Adventure?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of satisfied travelers who have discovered the beauty of Pakistan with us
            </p>
            <div className={styles.ctaButtons}>
              <a href="/tour" className={styles.ctaButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
                Browse Tours
              </a>
              <a href="/public/contact" className={styles.ctaButtonSecondary}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

