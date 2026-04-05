"use client";

import React, { useState } from "react";
import { Search, Filter, Trash2, Mail, Phone, Calendar } from "lucide-react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "contacted" | "archived";
  timestamp: string;
}

const mockLeads: Lead[] = [
  { id: "1", name: "Ahmed Khan", phone: "+92 300 1234567", email: "ahmed@example.com", message: "Interested in web development services for my startup.", status: "new", timestamp: "2024-04-05 14:30" },
  { id: "2", name: "Sarah Malik", phone: "+92 321 7654321", email: "sarah.m@design.co", message: "Looking for a brand identity package.", status: "contacted", timestamp: "2024-04-05 10:15" },
  { id: "3", name: "John Doe", phone: "+1 555 0123", email: "j.doe@tech.com", message: "Budget inquiry for social media management.", status: "new", timestamp: "2024-04-04 18:45" },
];

const leadsColumns: Column<Lead>[] = [
  { 
    header: "Lead Info", 
    accessor: (lead) => (
      <div className="flex flex-col gap-1">
        <span className="font-bold text-text-primary">{lead.name}</span>
        <span className="text-xs text-text-secondary flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
      </div>
    )
  },
  { 
    header: "Contact", 
    accessor: (lead) => (
      <span className="text-sm font-medium flex items-center gap-2"><Phone size={14} className="text-accent-blue" /> {lead.phone}</span>
    )
  },
  { 
    header: "Status", 
    accessor: (lead) => (
      <span className={cn(
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        lead.status === "new" ? "bg-accent-blue text-white" : 
        lead.status === "contacted" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : 
        "bg-border/40 text-text-secondary"
      )}>
        {lead.status}
      </span>
    )
  },
  { 
    header: "Received", 
    accessor: (lead) => (
      <div className="flex items-center gap-2 text-text-secondary text-sm italic">
        <Calendar size={14} /> {lead.timestamp}
      </div>
    )
  },
];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewDetails = (lead: Lead) => {
    alert(`Message from ${lead.name}:\n\n${lead.message}`);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Leads & Inquiries</h2>
          <p className="text-text-secondary">Track and manage conversion from your landing page.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group min-w-[200px] md:min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue/40 transition-all"
            />
          </div>
          <Button variant="secondary" className="h-12 w-12 p-0 rounded-xl">
            <Filter size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <DataTable 
            data={mockLeads} 
            columns={leadsColumns} 
            onView={handleViewDetails}
            onDelete={(lead) => confirm(`Remove inquiry from ${lead.name}?`)}
          />
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <h3 className="font-bold text-text-primary border-b border-border pb-4 uppercase text-xs tracking-widest text-accent-blue">Conversion Overview</h3>
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm font-medium">New Leads</span>
                <span className="text-text-primary font-bold bg-accent-blue/10 px-2.5 py-1 rounded-lg text-xs">08</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm font-medium">Total inquiries</span>
                <span className="text-text-primary font-bold bg-surface border border-border px-2.5 py-1 rounded-lg text-xs">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm font-medium">Conv. Rate</span>
                <span className="text-emerald-400 font-bold text-xs">+15.4%</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-accent-blue/5 border border-accent-blue/20 flex flex-col gap-4">
            <p className="text-sm font-medium text-text-primary">Download leads for offline use.</p>
            <Button variant="outline" className="w-full border-accent-blue/20 hover:bg-accent-blue/10">
              Export to CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
