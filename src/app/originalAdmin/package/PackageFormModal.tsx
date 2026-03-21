"use client";

import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button, Space } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
}

export default function PackageFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {

  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [initialValues, open]);

  return (
    <Modal
      title={initialValues ? "Edit Package" : "Add Package"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>

        {/* BASIC INFO */}
        <h3>Basic Information</h3>

        <Form.Item
          label="Package Title"
          name="title"
          rules={[{ required: true, message: "Title required" }]}
        >
          <Input placeholder="Hunza Premium Package" />
        </Form.Item>

        <Form.Item label="Slug" name="slug">
          <Input placeholder="hunza-premium-package" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* PRICE */}
        <h3>Pricing</h3>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price required" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        {/* DURATION */}
        <h3>Duration</h3>

        <Space size="large">
          <Form.Item
            label="Days"
            name={["duration", "days"]}
            rules={[{ required: true, message: "Days required" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Nights"
            name={["duration", "nights"]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Space>

        {/* MAIN IMAGE */}
        <h3>Main Image</h3>

        <Form.Item
          label="Main Image URL"
          name="main_image"
          rules={[{ required: true, message: "Image required" }]}
        >
          <Input placeholder="https://image-url..." />
        </Form.Item>

        <div style={{ marginTop: 30 }}>
          <Button type="primary" htmlType="submit">
            Save Package
          </Button>
        </div>

      </Form>
    </Modal>
  );
}