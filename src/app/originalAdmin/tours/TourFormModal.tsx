"use client";
import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Tour } from "@/type/tour";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Tour) => void;
  initialValues?: Partial<Tour>;
}

export default function TourFormModal({
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
      title={initialValues ? "Edit Tour" : "Add Tour"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        
        {/* BASIC INFO */}
        <h3>Basic Information</h3>

        <Form.Item
          label="Tour Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Hunza Adventure Tour" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Slug required" }]}
        >
          <Input placeholder="hunza-adventure-tour" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true }]}
        >
          <Input placeholder="Hunza Valley" />
        </Form.Item>

        <Space size="large">

          <Form.Item
            label="Days"
            name="days"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Nights"
            name="nights"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>

        </Space>

        {/* IMAGE */}
        <Form.Item
          label="Main Image URL"
          name="image"
          rules={[{ required: true, message: "Image required" }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        {/* PRICING */}
        <h3>Pricing</h3>

        <Space size="large">

          <Form.Item
            label="Base Price"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Solo Price" name="solo">
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Couple Price" name="couple">
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Deluxe Price" name="deluxe">
            <InputNumber min={1} />
          </Form.Item>

        </Space>

        {/* DESCRIPTIONS */}
        <h3>Description</h3>

        <Form.Item label="Short Description" name="shortDescription">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Full Description" name="fullDescription">
          <Input.TextArea rows={5} />
        </Form.Item>

        {/* HIGHLIGHTS */}
        <h3>Highlights</h3>

        <Form.List name="highlights">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item {...field}>
                    <Input placeholder="Highlight" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Button onClick={() => add()} icon={<PlusOutlined />}>
                Add Highlight
              </Button>
            </>
          )}
        </Form.List>

        {/* ITINERARY */}
        <h3>Itinerary</h3>

        <Form.List name="itinerary">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">

                  <Form.Item
                    {...field}
                    name={[field.name, "day"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="Day" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "title"]}
                  >
                    <Input placeholder="Title" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "description"]}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />

                </Space>
              ))}

              <Button onClick={() => add()} icon={<PlusOutlined />}>
                Add Day
              </Button>
            </>
          )}
        </Form.List>

        <div style={{ marginTop: 30 }}>
          <Button type="primary" htmlType="submit">
            Save Tour
          </Button>
        </div>

      </Form>
    </Modal>
  );
}