"use client";

import React from "react";
import { Table, Button, Tag, Image, Space, Popconfirm } from "antd";
import { deletePackage } from "@/app/api/package/route";

interface Props {
  packages: any[];
  refreshPackages: () => void;
  onEdit: (pkg: any) => void;
}

export default function AdminPackageTable({
  packages,
  refreshPackages,
  onEdit,
}: Props) {

  const handleDelete = async (id: number) => {
    await deletePackage(id);
    refreshPackages();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "mainImage",
      key: "mainImage",
      render: (img: string) => (
        <Image
          src={img}
          width={80}
          height={60}
          style={{ objectFit: "cover", borderRadius: "6px" }}
        />
      ),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },

    {
      title: "Duration",
      key: "duration",
      render: (_: any, record: any) =>
        `${record?.duration?.days || 0} Days / ${
          record?.duration?.nights || 0
        } Nights`,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>

          <Button
            type="primary"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this package?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={packages}
      rowKey="id"
      pagination={{ pageSize: 8 }}
    />
  );
}