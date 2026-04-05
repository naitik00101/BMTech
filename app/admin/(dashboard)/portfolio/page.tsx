"use client";

import React, { useState } from "react";
import { Plus, Search, Image as ImageIcon } from "lucide-react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { ModalForm } from "@/components/admin/ModalForm";
import { InputField } from "@/components/admin/FormFields";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
}

const mockProjects: Project[] = [
  { id: "1", title: "E-commerce Redesign", category: "Web Design", image: "/portfolio/project-1.jpg", url: "https://example.com" },
  { id: "2", title: "Branding for Tech Startup", category: "Graphics", image: "/portfolio/project-2.jpg", url: "https://example.com" },
];

const projectColumns: Column<Project>[] = [
  { 
    header: "Project", 
    accessor: (project) => (
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-surface border border-border rounded-lg flex items-center justify-center text-text-secondary overflow-hidden shrink-0">
          <ImageIcon size={18} />
        </div>
        <span className="font-semibold text-text-primary">{project.title}</span>
      </div>
    )
  },
  { header: "Category", accessor: "category" },
  { 
    header: "Live URL", 
    accessor: (project) => (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline font-medium">
        View Site
      </a>
    )
  },
];

export default function PortfolioPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative group flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full h-14 pl-12 pr-4 bg-surface border border-border rounded-2xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue/40 transition-all duration-300"
          />
        </div>
        <Button onClick={() => setIsOpen(true)} className="h-14 px-8 gap-2 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Add New Project
        </Button>
      </div>

      <div className="space-y-6">
        <div className="p-1 px-4 text-sm font-semibold text-text-secondary uppercase tracking-widest border-l-4 border-accent-blue">
          Project Portfolio ({mockProjects.length})
        </div>
        <DataTable 
          data={mockProjects} 
          columns={projectColumns} 
          onEdit={handleEdit}
          onDelete={(project) => confirm(`Delete ${project.title}?`)}
        />
      </div>

      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editingProject ? "Edit Project" : "Add New Project"}
        description="Showcase your best work to potential clients."
        submitLabel={editingProject ? "Update Project" : "Create Project"}
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Project Title" placeholder="e.g., Agency Website" required defaultValue={editingProject?.title} />
          <InputField label="Category" placeholder="e.g., Web Development" required defaultValue={editingProject?.category} />
          <InputField label="Live URL" placeholder="e.g., https://bmtech.com" required defaultValue={editingProject?.url} />
          <div className="md:col-span-2">
            <InputField label="Image URL" placeholder="e.g., /assets/project.jpg" defaultValue={editingProject?.image} />
          </div>
        </div>
      </ModalForm>
    </div>
  );
}
