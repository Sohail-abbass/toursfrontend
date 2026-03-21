"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styled from "styled-components";

export default function AdminAuth() {
  const [isSignup, setIsSignup] = useState(false);

  const [value, setValue] = useState({ email: "", password: "" });
  const { email, password } = value;
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        alert("Signup successful. Now login.");
        setIsSignup(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        alert("Login successful");
        window.location.href = "/originalAdmin/dashboard";
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>{isSignup ? "Create Admin Account" : "Admin Login"}</Title>

        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          name="email"
            onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))}
        />

        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          name="password"
            onChange={(e) => setValue((prev) => ({ ...prev, password: e.target.value }))}
        />

        <Button onClick={handleAuth}>
          {loading ? "Loading..." : isSignup ? "Signup" : "Login"}
        </Button>

        <Toggle onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have account? Login"
            : "Create new admin account"}
        </Toggle>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f7fb;
`;

const Card = styled.div`
  width: 380px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid black;
  &:focus {
    border-color: #1677ff;
    outline: none;
  };
   &::placeholder {
    color: rgb(0, 0, 0, 0.5);
  }

`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #1677ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Toggle = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #1677ff;
  cursor: pointer;
`;