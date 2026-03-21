
"use client";

import { useEffect, useState } from "react";
import { Button, message, Form } from "antd";
import AdminPackageTable from "./AdminPackageTable";
import PackageFormModal from "./PackageFormModal";

import {
  getPackages,
  addPackage,
  updatePackage
} from "@/app/api/package/route";

export default function AdminPackagesPage() {

  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchPackages = async () => {
    const data = await getPackages();
    setPackages(data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSubmit = async (values) => {
  const hide = message.loading("Saving...", 0);

  try {

    // ✅ FIX PAYLOAD HERE
    const payload = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      price: values.price,
      currency: "PKR",

      // 🔥 Convert duration object → string
      duration: `${values.duration?.days || 0} Days / ${values.duration?.nights || 0} Nights`,

      // already correct
      main_image: values.main_image
    };

    if (editingPackage) {
      await updatePackage(editingPackage.id, payload);
      message.success("Package updated");
    } else {
      await addPackage(payload);
      message.success("Package added");
    }

    form.resetFields();
    setOpen(false);
    setEditingPackage(null);
    await fetchPackages();

  } catch (error) {
    console.log(error); // 🔥 DEBUG
    message.error(error?.message || "Operation failed");
  } finally {
    hide();
  }
};

  return (
    <div style={{ padding: "20px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2>Packages</h2>

        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
            setEditingPackage(null);
          }}
        >
          Add Package
        </Button>

      </div>

      {/* Package Table */}

      <AdminPackageTable
        packages={packages}
        refreshPackages={fetchPackages}
        onEdit={(pkg) => {
          setEditingPackage(pkg);
          setOpen(true);
        }}
      />

      {/* Modal */}

      <PackageFormModal
        open={open}
        initialValues={editingPackage}
        onClose={() => {
          setOpen(false);
          setEditingPackage(null);
        }}
        onSubmit={handleSubmit}
      />

    </div>
  );
}