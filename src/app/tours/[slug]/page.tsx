"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Spin, Empty, Carousel, Form, Input, Select, Button, message } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from './tourDetail.module.css';

const { TextArea } = Input;
const { Option } = Select;

interface Tour {
  id: number;
  title: string;
  slug: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  solo: number;
  couple: number;
  deluxe: number;
}

export default function TourDetailPage() {
  const params = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [selectedPackage, setSelectedPackage] = useState('solo');

  useEffect(() => {
    fetchTourDetail();
  }, [params.slug]);

  const fetchTourDetail = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tours');
      const tours = res.data;
      const foundTour = tours.find((t: Tour) => t.slug === params.slug);
      setTour(foundTour);
    } catch (error) {
      console.error('Error fetching tour:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    console.log('Booking submitted:', values);
    message.success('Booking request submitted successfully! We will contact you soon.');
    form.resetFields();
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" tip="Loading tour details...">
          <div style={{ minHeight: 120 }} />
        </Spin>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className={styles.emptyWrapper}>
        <Empty description="Tour not found" />
      </div>
    );
  }

  const getCurrentPrice = () => {
    switch (selectedPackage) {
      case 'couple':
        return tour.couple;
      case 'deluxe':
        return tour.deluxe;
      default:
        return tour.solo;
    }
  };

  return (
    <div className={styles.tourDetailPage}>
      {/* Hero Gallery Section */}
      <section className={styles.gallerySection}>
        <Carousel autoplay autoplaySpeed={4000} effect="fade">
          {tour.gallery.map((img, idx) => (
            <div key={idx} className={styles.gallerySlide}>
              <img src={img} alt={`${tour.title} ${idx + 1}`} className={styles.galleryImage} />
              <div className={styles.galleryOverlay}>
                <div className={styles.galleryContent}>
                  <h1 className={styles.galleryTitle}>{tour.title}</h1>
                  <p className={styles.galleryLocation}>
                    <CalendarOutlined /> {tour.days} Days / {tour.nights} Nights
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Tour Info */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>About This Tour</h2>
              <p className={styles.description}>{tour.fullDescription}</p>
              
              <div className={styles.quickInfo}>
                <div className={styles.infoCard}>
                  <ClockCircleOutlined className={styles.infoIcon} />
                  <div>
                    <h4>Duration</h4>
                    <p>{tour.days} Days / {tour.nights} Nights</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <CalendarOutlined className={styles.infoIcon} />
                  <div>
                    <h4>Location</h4>
                    <p>{tour.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Tour Highlights</h2>
              <ul className={styles.highlightsList}>
                {tour.highlights.map((highlight, idx) => (
                  <li key={idx}>
                    <CheckCircleOutlined /> {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Day by Day Itinerary</h2>
              <div className={styles.itinerary}>
                {tour.itinerary.map((day) => (
                  <div key={day.day} className={styles.itineraryDay}>
                    <div className={styles.dayNumber}>Day {day.day}</div>
                    <div className={styles.dayContent}>
                      <h4>{day.title}</h4>
                      <p>{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className={styles.inclusionsGrid}>
              <div className={styles.section}>
                <h3 className={styles.subsectionTitle}>What's Included</h3>
                <ul className={styles.list}>
                  {tour.inclusions.map((item, idx) => (
                    <li key={idx}><CheckCircleOutlined /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.section}>
                <h3 className={styles.subsectionTitle}>What's Not Included</h3>
                <ul className={styles.listExclusion}>
                  {tour.exclusions.map((item, idx) => (
                    <li key={idx}>✗ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <h3 className={styles.bookingTitle}>Book This Tour</h3>
              
              <div className={styles.packageSelector}>
                <button
                  className={`${styles.packageBtn} ${selectedPackage === 'solo' ? styles.active : ''}`}
                  onClick={() => setSelectedPackage('solo')}
                >
                  <span>Solo</span>
                  <strong>PKR {tour.solo.toLocaleString()}</strong>
                </button>
                <button
                  className={`${styles.packageBtn} ${selectedPackage === 'couple' ? styles.active : ''}`}
                  onClick={() => setSelectedPackage('couple')}
                >
                  <span>Couple</span>
                  <strong>PKR {tour.couple.toLocaleString()}</strong>
                </button>
                <button
                  className={`${styles.packageBtn} ${selectedPackage === 'deluxe' ? styles.active : ''}`}
                  onClick={() => setSelectedPackage('deluxe')}
                >
                  <span>Deluxe</span>
                  <strong>PKR {tour.deluxe.toLocaleString()}</strong>
                </button>
              </div>

              <div className={styles.totalPrice}>
                <span>Total Price</span>
                <strong>PKR {getCurrentPrice().toLocaleString()}</strong>
              </div>

              <Form form={form} layout="vertical" onFinish={onFinish} className={styles.bookingForm}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input size="large" placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter your phone' }]}
                >
                  <Input size="large" placeholder="+92 300 1234567" />
                </Form.Item>

                <Form.Item
                  name="travelers"
                  label="Number of Travelers"
                  rules={[{ required: true, message: 'Please select number of travelers' }]}
                >
                  <Select size="large" placeholder="Select travelers">
                    <Option value="1">1 Person</Option>
                    <Option value="2">2 People</Option>
                    <Option value="3">3 People</Option>
                    <Option value="4">4 People</Option>
                    <Option value="5">5+ People</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="message" label="Special Requests (Optional)">
                  <TextArea rows={4} placeholder="Any special requirements or questions?" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={styles.submitBtn}
                  loading={false}
                >
                  Book Now
                </Button>
              </Form>

              <div className={styles.contactInfo}>
                <p>Need help? Call us:</p>
                <a href="tel:03177773141">0317-777-3141</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

