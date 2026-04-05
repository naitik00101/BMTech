"use client";

import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { ModalForm } from "@/components/admin/ModalForm";
import { InputField, TextAreaField } from "@/components/admin/FormFields";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

const mockServices: Service[] = [
  { id: "1", title: "Web Development", description: "Full-stack web applications.", price: "From $1500", category: "IT Services" },
  { id: "2", title: "Graphic Design", description: "High-quality branding and assets.", price: "From $500", category: "Graphics" },
  { id: "3", title: "Social Media Ads", description: "Targeted advertising campaigns.", price: "From $300/mo", category: "Marketing" },
];

const serviceColumns: Column<Service>[] = [
  { header: "Title", accessor: "title" },
  { header: "Category", accessor: "category", className: "hidden md:table-cell" },
  { header: "Price", accessor: "price" },
];

export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsOpen(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative group flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="w-full h-14 pl-12 pr-4 bg-surface border border-border rounded-2xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue/40 transition-all duration-300"
          />
        </div>
        <Button onClick={handleAdd} className="h-14 px-8 gap-2 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Add New Service
        </Button>
      </div>

      <div className="space-y-6">
        <div className="p-1 px-4 text-sm font-semibold text-text-secondary uppercase tracking-widest border-l-4 border-accent-blue">
          Service Catalog ({mockServices.length})
        </div>
        <DataTable 
          data={mockServices} 
          columns={serviceColumns} 
          onEdit={handleEdit}
          onDelete={(service) => {
            if(confirm(`Are you sure you want to delete ${service.title}?`)) {
              console.log("Deleted", service.id);
            }
          }}
        />
      </div>

      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editingService ? "Edit Service" : "Add New Service"}
        description={editingService ? "Update the details of your service below." : "Fill in the information to create a new service."}
        submitLabel={editingService ? "Update Service" : "Create Service"}
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
          console.log("Form Submitted");
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="Service Title" 
            placeholder="e.g., UI/UX Design" 
            required 
            defaultValue={editingService?.title}
          />
          <InputField 
            label="Category" 
            placeholder="e.g., Graphics" 
            required 
            defaultValue={editingService?.category}
          />
          <InputField 
            label="Base Price" 
            placeholder="e.g., From $500" 
            required 
            defaultValue={editingService?.price}
          />
          <div className="md:col-span-2">
            <TextAreaField 
              label="Description" 
              placeholder="Describe what this service includes..." 
              required 
              defaultValue={editingService?.description}
            />
          </div>
        </div>
      </ModalForm>
    </div>
  );
}
