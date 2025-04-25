import React, { useState } from "react";
import Card from "../components/Card";
import Form from "../components/Form";
import Input from "../components/Input";

import Button from "../components/Button";
import { createSeller } from "../api/auth";
import Loading from "../components/Loading";

const CreateSeller = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      await createSeller(username, email, password, token);
      alert("Create seller successful!");
    } catch (error) {
      setError(error.message || "Create seller failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 ">
      {loading && <Loading />}
      <Card>
        <Card.Header>Create Seller</Card.Header>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Create</Button>
          </Form>
          {error && <div className="text-error ">{error}</div>}
        </Card.Content>
      </Card>
    </div>
  );
};

export default CreateSeller;