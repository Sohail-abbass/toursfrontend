"use client";

import { useEffect, useState, useCallback } from "react";
import { Button, message, Form } from "antd";
import AdminTourTable from "@/app/tour/AdminTourTable";
import TourFormModal from "./TourFormModal";
import { addTour, getTours,updateTour } from "@/app/api/tours/route";

export default function AdminToursPage() {

  const [open, setOpen] = useState(false);
  const [tours, setTours] = useState<any[]>([]);
  const [form] = Form.useForm();
const [editingTour, setEditingTour] = useState<any>(null);
  const fetchTours = async () => {
    const data = await getTours();
    setTours(data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  
 const handleSubmit = async (values:any) => {

  const hide = message.loading("Saving...", 0);

  try {

    if (editingTour) {

      await updateTour(editingTour.id, values);

      message.success("Tour updated");

    } else {

      await addTour(values);

      message.success("Tour added");

    }

    form.resetFields();

    setOpen(false);
    setEditingTour(null);

    await fetchTours();

  } catch (error:any) {

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
        <h2>Tours</h2>

        <Button
          type="primary"
onClick={()=>{
    setOpen(true)
    setEditing(null);
}}
        >
          Add Tour
        </Button>

      </div>

      {/* Table */}
<AdminTourTable
  tours={tours}
  refreshTours={fetchTours}
  onEdit={(tour:any) => {
    setEditingTour(tour);
    setOpen(true);
  }}
/>
   
<TourFormModal
  open={open}
  initialValues={editingTour}
  onClose={() => {
    setOpen(false);
    setEditingTour(null);
  }}
  onSubmit={handleSubmit}
/>
    </div>
  );
}