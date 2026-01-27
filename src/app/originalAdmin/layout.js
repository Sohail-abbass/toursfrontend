// app/admin/layout.js
"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
// You could also integrate Ant Design’s Layout or a custom one.

const AdminLayout = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <h2>Admin Panel</h2>
        <NavLink href="/originalAdmin/package">📦 Packages</NavLink>
<NavLink href="/originalAdmin/package/add">➕ Add Package</NavLink>
<NavLink href="/originalAdmin/users">👤 Users</NavLink>

      </Sidebar>
      <Content>
        {/* Optional admin-specific header */}
        <Header>
          <p>Welcome, Admin!</p>
        </Header>
        <MainContent>
          {children}
        </MainContent>
      </Content>
    </Container>
  );
};

export default AdminLayout;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f4f6f9;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #132f4c;
  color: white;
  padding: 2rem 1rem;
`;

const NavLink = styled(Link)`
  display: block;
  margin: 1rem 0;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  color: white;
  text-decoration: none;
  &:hover {
    background: #23527c;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e1e4e8;
`;

const MainContent = styled.main`
  padding: 2rem;
  overflow-y: auto;
`;
