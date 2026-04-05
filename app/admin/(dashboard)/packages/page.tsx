"use client";

import React, { useState } from "react";
import { Plus, Check, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ModalForm } from "@/components/admin/ModalForm";
import { InputField, ToggleSwitch, TextAreaField } from "@/components/admin/FormFields";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  title: string;
  price: string;
  features: string[];
  isHighlighted: boolean;
}

const mockPackages: Package[] = [
  { 
    id: "1", 
    title: "Basic Branding", 
    price: "$499", 
    features: ["Logo Design", "Business Cards", "Brand Guidelines"], 
    isHighlighted: false 
  },
  { 
    id: "2", 
    title: "Pro Digital", 
    price: "$1499", 
    features: ["Web Development", "SEO Optimization", "Social Media Setup", "24/7 Support"], 
    isHighlighted: true 
  },
];

export default function PackagesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsOpen(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Pricing Packages</h2>
          <p className="text-text-secondary">Manage the pricing tiers and features displayed on the website.</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="h-14 px-8 gap-2 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Create Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={cn(
              "relative p-8 rounded-3xl bg-surface border transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2",
              pkg.isHighlighted ? "border-accent-blue shadow-lg shadow-accent-blue/10" : "border-border hover:border-accent-blue/40"
            )}
          >
            {pkg.isHighlighted && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent-blue text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                Most Popular
              </span>
            )}
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-wider">{pkg.title}</h3>
              <button 
                onClick={() => handleEdit(pkg)}
                className="p-2 rounded-lg bg-background border border-border text-text-secondary hover:text-accent-blue hover:bg-accent-blue/10 transition-colors"
              >
                <Edit2 size={18} />
              </button>
            </div>

            <div className="mb-10">
              <span className="text-5xl font-bold text-text-primary tracking-tight">{pkg.price}</span>
              <span className="text-text-secondary ml-2 font-medium">/ project</span>
            </div>

            <div className="space-y-4 mb-10">
              {pkg.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue">
                    <Check size={14} />
                  </div>
                  <span className="text-text-secondary font-medium tracking-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button className={cn(
              "w-full h-14 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 border-2",
              pkg.isHighlighted 
                ? "bg-accent-blue border-accent-blue text-white hover:bg-accent-blue/90" 
                : "bg-transparent border-border text-text-primary hover:border-accent-blue hover:bg-accent-blue/5"
            )}>
              View Details
            </button>
          </div>
        ))}

        <button 
          onClick={() => setIsOpen(true)}
          className="border-2 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue hover:bg-accent-blue/5 transition-all duration-300 gap-4 group min-h-[400px]"
        >
          <div className="h-20 w-20 bg-border/40 rounded-full flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
            <Plus size={40} />
          </div>
          <span className="text-lg font-bold">Add New Package</span>
        </button>
      </div>

      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editingPackage ? "Edit Package" : "Create Package"}
        description="Configure your service offerings and prices."
        submitLabel={editingPackage ? "Update Package" : "Create Package"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Package Name" placeholder="e.g., Premium Social Media" defaultValue={editingPackage?.title} required />
          <InputField label="Price" placeholder="e.g., $1,999" defaultValue={editingPackage?.price} required />
          <div className="md:col-span-2">
            <TextAreaField 
              label="Features (one per line)" 
              placeholder="Support&#10;Analytics&#10;Custom Design" 
              defaultValue={editingPackage?.features.join("\n")} 
              required 
            />
          </div>
          <div className="md:col-span-2">
             <ToggleSwitch 
              label="Highlight this package (Most Popular)" 
              checked={editingPackage?.isHighlighted ?? false} 
              onChange={() => {}} 
            />
          </div>
        </div>
      </ModalForm>
    </div>
  );
}
