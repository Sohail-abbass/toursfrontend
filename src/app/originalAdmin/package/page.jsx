"use client";
import React, { useCallback } from "react";
import styled from "styled-components";
import { Form, Input, Button, message, InputNumber } from "antd";

const AddPackageForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async (values) => {
    const hide = message.loading("Submitting...", 0);

    try {
      const res = await fetch("/api/package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        message.success("Package added successfully!");
        form.resetFields();
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error("Failed to submit form!");
    } finally {
      hide();
    }
  }, [form]);

  return (
    <FormContainer>
      <h2>Add New Package</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          rating: 4.5,
          duration: "3 days",
        }}
      >
        <Form.Item
          name="title"
          label="Package Title"
          rules={[{ required: true, message: "Please enter the package title!" }]}
        >
          <Input placeholder="Enter package title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter package description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price (USD)"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please provide a rating!" }]}
        >
          <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter the location!" }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: "Please specify the duration!" }]}
        >
          <Input placeholder="e.g. 5 days" />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true, message: "Please provide an image URL!" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Package
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default AddPackageForm;

// ============= STYLED COMPONENTS =============
const FormContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: #f8f9ff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #4a4a4a;
  }
`;

