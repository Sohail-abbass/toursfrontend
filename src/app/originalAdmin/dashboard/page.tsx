"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Container>

      <Header>
        <Title>Welcome, Admin 👋</Title>
        <Subtitle>Manage tours, packages and bookings</Subtitle>
      </Header>

      <StatsGrid>

        <Card onClick={() => router.push("/originalAdmin/tours")}>
          <CardTitle>Tours</CardTitle>
          <CardValue>Manage Tours</CardValue>
        </Card>

        <Card onClick={() => router.push("/originalAdmin/package")}>
          <CardTitle>Packages</CardTitle>
          <CardValue>Manage Packages</CardValue>
        </Card>

        <Card onClick={() => router.push("/originalAdmin/booking")}>
          <CardTitle>Bookings</CardTitle>
          <CardValue>View Bookings</CardValue>
        </Card>

      </StatsGrid>

     

    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #777;
  margin-top: 6px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
background: linear-gradient(135deg, #7c3aed, #a78bfa);
  padding: 25px;
  border-radius: 12px;
  cursor: pointer;
  color: white;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  transition: all 0.25s ease;

  &:hover{
    transform: translateY(-6px);
    box-shadow: 0 14px 35px rgba(0,0,0,0.3);
  }
`;
const CardTitle = styled.h3`
  font-size: 15px;
  color: rgba(255,255,255,0.8);
`;

const CardValue = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-top: 6px;
  color: white;
`;
