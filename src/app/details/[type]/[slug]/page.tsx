"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Spin, Empty, Tabs, Form, Input, Select, Button, message, Badge } from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  StarFilled,
  CameraOutlined
} from '@ant-design/icons';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import styles from './detailPage.module.css';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function UnifiedDetailPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [selectedPackage, setSelectedPackage] = useState('solo');
  const [activeImage, setActiveImage] = useState(0);
  const [isTour, setIsTour] = useState(true);

  useEffect(() => {
    fetchData();
  }, [params.type, params.slug]);

  const fetchData = async () => {
    try {
      const type = params.type as string;
      setIsTour(type === 'tour');
      
      let endpoint = type === 'tour' ? 'http://localhost:5000/tours' : 'http://localhost:5000/packages';
      const res = await axios.get(endpoint);
      const items = res.data;
      const found = items.find((item: any) => item.slug === params.slug);
      
      setData(found);
      if (found?.gallery?.length > 0) {
        setActiveImage(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    const bookingData = {
      ...values,
      itemType: isTour ? 'Tour' : 'Package',
      itemName: data?.title,
      package: selectedPackage,
      totalPrice: getCurrentPrice()
    };
    console.log('Booking submitted:', bookingData);
    message.success(`${isTour ? 'Tour' : 'Package'} booking request submitted! We'll contact you soon.`);
    form.resetFields();
  };

  const getCurrentPrice = () => {
    if (isTour) {
      switch (selectedPackage) {
        case 'couple': return data?.couple || data?.price * 2;
        case 'deluxe': return data?.deluxe || data?.price * 3;
        default: return data?.solo || data?.price;
      }
    } else {
      return data?.price || 0;
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" tip={`Loading ${isTour ? 'tour' : 'package'} details...`} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.emptyWrapper}>
        <Empty description={`${isTour ? 'Tour' : 'Package'} not found`} />
        <Link href="/" className={styles.backBtn}>
          Back to Home
        </Link>
      </div>
    );
  }

  const gallery = data.gallery || [data.mainImage || data.image];
  const getDuration = () => {
    if (isTour) {
      return `${data.days} Days / ${data.nights} Nights`;
    } else {
      return `${data.duration.days} Days / ${data.duration.nights} Nights`;
    }
  };

  return (
    <div className={styles.detailPage}>
      {/* Hero Section with Gallery */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Main Image */}
          <div className={styles.mainImageWrapper}>
            <img 
              src={gallery[activeImage]} 
              alt={data.title} 
              className={styles.mainImage} 
            />
            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <Badge.Ribbon 
                  text={isTour ? "TOUR" : "PACKAGE"} 
                  color={isTour ? "#ff6b35" : "#4f9fff"}
                  className={styles.typeBadge}
                >
                  <div className={styles.titleCard}>
                    <h1 className={styles.mainTitle}>{data.title}</h1>
                    <div className={styles.quickStats}>
                      <span className={styles.stat}>
                        <CalendarOutlined /> {getDuration()}
                      </span>
                      <span className={styles.stat}>
                        <EnvironmentOutlined /> {data.location || data.destinations?.[0]?.name}
                      </span>
                      <span className={styles.stat}>
                        <StarFilled /> Featured
                      </span>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </div>

            {/* Image Counter */}
            <div className={styles.imageCounter}>
              <CameraOutlined /> {activeImage + 1} / {gallery.length}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className={styles.thumbnailGallery}>
            {gallery.map((img: string, idx: number) => (
              <div
                key={idx}
                className={`${styles.thumbnail} ${activeImage === idx ? styles.activeThumbnail : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          {/* Left Content */}
          <div className={styles.mainContent}>
            {/* Description Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                {isTour ? '🗺️ About This Tour' : '📦 Package Overview'}
              </h2>
              <p className={styles.description}>
                {data.fullDescription || data.description}
              </p>
              {data.shortDescription && (
                <div className={styles.highlight}>
                  <strong>Quick Summary:</strong> {data.shortDescription}
                </div>
              )}
            </div>

            {/* Tabbed Content */}
            <div className={styles.card}>
              <Tabs defaultActiveKey="1" size="large" className={styles.tabs}>
                {/* Highlights/Destinations */}
                <TabPane 
                  tab={
                    <span>
                      <CheckCircleOutlined />
                      {isTour ? 'Highlights' : 'Destinations'}
                    </span>
                  } 
                  key="1"
                >
                  {isTour ? (
                    <ul className={styles.highlightsList}>
                      {data.highlights?.map((highlight: string, idx: number) => (
                        <li key={idx}>
                          <CheckCircleOutlined className={styles.checkIcon} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className={styles.destinationsGrid}>
                      {data.destinations?.map((dest: any, idx: number) => (
                        <div key={idx} className={styles.destCard}>
                          <img src={dest.image} alt={dest.name} />
                          <div className={styles.destInfo}>
                            <h4>{dest.name}</h4>
                            <p>{dest.stayDays} Days</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabPane>

                {/* Itinerary */}
                {(data.itinerary && data.itinerary.length > 0) && (
                  <TabPane 
                    tab={
                      <span>
                        <ClockCircleOutlined />
                        Day by Day
                      </span>
                    } 
                    key="2"
                  >
                    <div className={styles.itinerary}>
                      {data.itinerary.map((day: any) => (
                        <div key={day.day} className={styles.dayCard}>
                          <div className={styles.dayNumber}>
                            <span>Day</span>
                            <strong>{day.day}</strong>
                          </div>
                          <div className={styles.dayContent}>
                            <h4>{day.title}</h4>
                            <p>{day.description}</p>
                            {day.activities && (
                              <ul className={styles.activities}>
                                {day.activities.map((act: string, idx: number) => (
                                  <li key={idx}>{act}</li>
                                ))}
                              </ul>
                            )}
                            {day.meals && (
                              <div className={styles.meals}>
                                <strong>Meals:</strong> {day.meals.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabPane>
                )}

                {/* Inclusions & Exclusions */}
                <TabPane 
                  tab={
                    <span>
                      <CheckCircleOutlined />
                      What's Included
                    </span>
                  } 
                  key="3"
                >
                  <div className={styles.incluExcluGrid}>
                    <div>
                      <h3 className={styles.subheading}>✓ Included</h3>
                      <ul className={styles.incluList}>
                        {(data.inclusions || data.includes)?.map((item: string, idx: number) => (
                          <li key={idx}>
                            <CheckCircleOutlined /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className={styles.subheading}>✗ Not Included</h3>
                      <ul className={styles.excluList}>
                        {(data.exclusions || data.excludes)?.map((item: string, idx: number) => (
                          <li key={idx}>✗ {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabPane>

                {/* Accommodation & Transport (for packages) */}
                {!isTour && data.accommodation && (
                  <TabPane 
                    tab={
                      <span>
                        🏨 Details
                      </span>
                    } 
                    key="4"
                  >
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailBox}>
                        <h4>🏨 Accommodation</h4>
                        <p><strong>Category:</strong> {data.accommodation.hotelCategory}</p>
                        <p><strong>Room Type:</strong> {data.accommodation.roomType}</p>
                        <p><strong>Total Nights:</strong> {data.accommodation.totalNights}</p>
                      </div>
                      <div className={styles.detailBox}>
                        <h4>🚗 Transport</h4>
                        <p><strong>Mode:</strong> {data.transport.mode}</p>
                        <p><strong>Fuel:</strong> {data.transport.fuelIncluded ? 'Included' : 'Not Included'}</p>
                        <p><strong>Driver:</strong> {data.transport.driver ? 'Included' : 'Not Included'}</p>
                      </div>
                    </div>
                  </TabPane>
                )}
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar - Booking */}
          <div className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <div className={styles.bookingHeader}>
                <h3>Book {isTour ? 'This Tour' : 'This Package'}</h3>
                <div className={styles.trustBadge}>
                  <StarFilled /> Trusted by 1000+ Travelers
                </div>
              </div>

              {/* Pricing Options */}
              {isTour ? (
                <div className={styles.pricingOptions}>
                  <button
                    className={`${styles.priceOption} ${selectedPackage === 'solo' ? styles.activeOption : ''}`}
                    onClick={() => setSelectedPackage('solo')}
                  >
                    <UserOutlined />
                    <div>
                      <span>Solo</span>
                      <strong>PKR {(data.solo || data.price).toLocaleString()}</strong>
                    </div>
                  </button>
                  <button
                    className={`${styles.priceOption} ${selectedPackage === 'couple' ? styles.activeOption : ''}`}
                    onClick={() => setSelectedPackage('couple')}
                  >
                    <UserOutlined />
                    <div>
                      <span>Couple</span>
                      <strong>PKR {(data.couple || data.price * 2).toLocaleString()}</strong>
                    </div>
                  </button>
                  <button
                    className={`${styles.priceOption} ${selectedPackage === 'deluxe' ? styles.activeOption : ''}`}
                    onClick={() => setSelectedPackage('deluxe')}
                  >
                    <StarFilled />
                    <div>
                      <span>Deluxe</span>
                      <strong>PKR {(data.deluxe || data.price * 3).toLocaleString()}</strong>
                    </div>
                  </button>
                </div>
              ) : (
                <div className={styles.packagePrice}>
                  <div className={styles.priceTag}>
                    <span>Starting from</span>
                    <strong>PKR {data.price.toLocaleString()}</strong>
                    <small>per person</small>
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <Form form={form} layout="vertical" onFinish={onFinish} className={styles.bookingForm}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input 
                    size="large" 
                    prefix={<UserOutlined />}
                    placeholder="Full Name" 
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    size="large" 
                    prefix={<MailOutlined />}
                    placeholder="Email Address" 
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: 'Please enter your phone' }]}
                >
                  <Input 
                    size="large" 
                    prefix={<PhoneOutlined />}
                    placeholder="Phone Number" 
                  />
                </Form.Item>

                <Form.Item
                  name="travelers"
                  rules={[{ required: true, message: 'Please select number of travelers' }]}
                >
                  <Select size="large" placeholder="Number of Travelers">
                    <Option value="1">1 Person</Option>
                    <Option value="2">2 People</Option>
                    <Option value="3">3 People</Option>
                    <Option value="4">4 People</Option>
                    <Option value="5">5+ People</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="message">
                  <TextArea 
                    rows={3} 
                    placeholder="Special requests or questions..." 
                  />
                </Form.Item>

                <div className={styles.totalSection}>
                  <span>Total Price</span>
                  <strong>PKR {getCurrentPrice().toLocaleString()}</strong>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={styles.bookBtn}
                  block
                >
                  Confirm Booking
                </Button>
              </Form>

              <div className={styles.supportSection}>
                <p>Need Help?</p>
                <a href="tel:03177773141">
                  <PhoneOutlined /> 0317-777-3141
                </a>
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

