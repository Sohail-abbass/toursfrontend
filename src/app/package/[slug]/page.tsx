"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { getPackageBySlug } from "@/app/api/package/route";
import { Package } from "@/type/package";
import styled from "styled-components";

/* ================= BACKGROUND ================= */
const PageWrapper = styled.div`
  min-height: 100vh;
  background-image: url("/backgroundimag.jpg"); 
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6); /* overlay opacity */
  }
`;

/* ================= CONTENT ================= */
const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Description = styled.p`
  max-width: 720px;
  font-size: 1.15rem;
  line-height: 1.8;
  opacity: 0.95;
`;

const Price = styled.div`
  margin-top: 24px;
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffd369;
`;

/* ================= SECTIONS ================= */
const SectionTitle = styled.h2`
  margin-top: 60px;
  margin-bottom: 24px;
  font-size: 2rem;
  font-weight: 600;
  border-left: 4px solid #ffd369;
  padding-left: 14px;
`;

/* Destination List */
const DestinationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const DestinationImage = styled.img`
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const DestinationText = styled.div`
  display: flex;
  flex-direction: column;
`;

const DestinationName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
`;

const DestinationDays = styled.span`
  font-size: 0.95rem;
  opacity: 0.85;
`;

/* Itinerary */
const ItineraryCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 16px 20px;
  border-radius: 10px;
  margin-bottom: 16px;
  backdrop-filter: blur(5px);
`;

const ItineraryDayTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const ActivityList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 6px;
`;

const Meals = styled.div`
  font-size: 0.95rem;
  opacity: 0.85;
  margin-top: 4px;
`;

/* Accommodation & Transport */
const InfoBlock = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 16px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  backdrop-filter: blur(5px);
`;

const InfoTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
`;

/* ================= PAGE ================= */
export default function PackageDetailPage() {
  const params = useParams();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug; // ✅ ensure string

  useEffect(() => {
      console.log("Fetching package with slug:", slug);

    const fetchPackage = async () => {
      try {
        const data = await getPackageBySlug(slug!);
        setPkg(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "120px auto" }} />;
  }

  if (!pkg) {
    return <div>Package not found</div>;
  }

  return (
    <PageWrapper>
      <Content>
        <Title>{pkg.title}</Title>
        <Description>{pkg.description}</Description>
        <Price>{pkg.currency} {pkg.price.toLocaleString()}</Price>

        {/* Destinations */}
        <SectionTitle>Destinations Covered</SectionTitle>
        {pkg.destinations.map((d) => (
          <DestinationRow key={d.name}>
            <DestinationImage src={pkg.gallery[0]} alt={d.name} />
            <DestinationText>
              <DestinationName>{d.name}</DestinationName>
              <DestinationDays>{d.stayDays} {d.stayDays > 1 ? "days" : "day"} stay</DestinationDays>
            </DestinationText>
          </DestinationRow>
        ))}

        {/* Itinerary */}
        {pkg.itinerary && (
          <>
            <SectionTitle>Itinerary</SectionTitle>
            {pkg.itinerary.map((day) => (
              <ItineraryCard key={day.day}>
                <ItineraryDayTitle>Day {day.day}: {day.title}</ItineraryDayTitle>
                <ActivityList>
                  {day.activities.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ActivityList>
                <Meals>Meals: {day.meals.join(", ")} | Stay: {day.stay}</Meals>
              </ItineraryCard>
            ))}
          </>
        )}

        {/* Accommodation */}
        <SectionTitle>Accommodation</SectionTitle>
        <InfoBlock>
          <InfoTitle>{pkg.accommodation.hotelCategory}</InfoTitle>
          <InfoText>
            Room Type: {pkg.accommodation.roomType} <br />
            Total Nights: {pkg.accommodation.totalNights} <br />
            Cities: {pkg.accommodation.cities?.join(", ")}
          </InfoText>
        </InfoBlock>

        {/* Transport */}
        <SectionTitle>Transport</SectionTitle>
        <InfoBlock>
          <InfoText>
            Mode: {pkg.transport.mode} <br />
            Fuel Included: {pkg.transport.fuelIncluded ? "Yes" : "No"} <br />
            Driver: {pkg.transport.driver ? "Yes" : "No"} <br />
            Airport Transfers: {pkg.transport.airportTransfers ? "Yes" : "No"}
          </InfoText>
        </InfoBlock>

        {/* Includes / Excludes */}
        {pkg.includes.length > 0 && (
          <>
            <SectionTitle>Includes</SectionTitle>
            <InfoBlock>
              <ActivityList>
                {pkg.includes.map((i, idx) => <li key={idx}>{i}</li>)}
              </ActivityList>
            </InfoBlock>
          </>
        )}

        {pkg.excludes.length > 0 && (
          <>
            <SectionTitle>Excludes</SectionTitle>
            <InfoBlock>
              <ActivityList>
                {pkg.excludes.map((i, idx) => <li key={idx}>{i}</li>)}
              </ActivityList>
            </InfoBlock>
          </>
        )}
      </Content>
    </PageWrapper>
  );
}
