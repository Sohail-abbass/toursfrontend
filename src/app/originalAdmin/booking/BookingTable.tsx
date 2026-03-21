"use client";

import React from "react";
import { Table, Tag, Button, Space } from "antd";

interface BookingTableProps {
  bookings: any[];
  onEdit: (booking: any) => void;
  onDelete: (id: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onEdit,
  onDelete,
}) => {

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Email",
      dataIndex: "customer_email",
      key: "customer_email",
    },
    {
      title: "Tour / Package",
      dataIndex: "tour_name",
      key: "tour_name",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "confirmed" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status: string) => (
        <Tag color={status === "paid" ? "blue" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>

          <Button danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={bookings}
      rowKey="id"
      pagination={{ pageSize: 8 }}
    />
  );
};

export default BookingTable;