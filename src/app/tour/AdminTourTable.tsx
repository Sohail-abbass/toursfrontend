"use client";

import { Table, Button, Space, message, Image } from "antd";
import { deleteTour } from "@/app/api/tours/route";

interface Props {
  tours: any[];
  refreshTours: () => void;
  onEdit: (tour: any) => void;
}

export default function AdminTourTable({
  tours,
  refreshTours,
  onEdit
}: Props) {

  const handleDelete = async (id) => {

    const hide = message.loading("Deleting...", 0);

    try {

      await deleteTour(id);

      message.success("Tour deleted successfully");

      refreshTours();

    } catch (error) {

      message.error("Failed to delete tour");

    } finally {

      hide();

    }

  };

  const columns = [

    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) => (
        <Image
          src={img}
          width={60}
          height={40}
          style={{ objectFit: "cover", borderRadius: 6 }}
          alt="tour"
        />
      )
    },

    {
      title: "Title",
      dataIndex: "title"
    },

    {
      title: "Location",
      dataIndex: "location"
    },

    {
      title: "Days",
      dataIndex: "days"
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `PKR ${price?.toLocaleString()}`
    },

    {
      title: "Actions",
      render: (_: any, record: any) => (

        <Space>

          <Button
            type="link"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Button
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>

        </Space>

      )
    }

  ];

  return (

    <Table
      columns={columns}
      dataSource={tours}
      rowKey="id"
      pagination={{ pageSize: 6 }}
    />

  );
}