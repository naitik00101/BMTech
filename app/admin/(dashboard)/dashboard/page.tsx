"use client";

import React from "react";
import { Users, Briefcase, Package, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable, Column } from "@/components/admin/DataTable";

interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string;
  timestamp: string;
  status: "new" | "contacted";
}

const mockLeads: Lead[] = [
  { id: "1", name: "Ahmed Khan", phone: "+92 300 1234567", message: "Interested in web development services.", timestamp: "2 hours ago", status: "new" },
  { id: "2", name: "John Doe", phone: "+1 555 0199", message: "Need a quote for graphic design package.", timestamp: "5 hours ago", status: "new" },
  { id: "3", name: "Sara Malik", phone: "+92 321 7654321", message: "Hi, I have a project inquiry.", timestamp: "Yesterday", status: "contacted" },
];

const leadsColumns: Column<Lead>[] = [
  { header: "Name", accessor: "name" },
  { header: "Phone", accessor: "phone" },
  { 
    header: "Status", 
    accessor: (lead) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        lead.status === "new" ? "bg-accent-blue/10 text-accent-blue" : "bg-emerald-400/10 text-emerald-400"
      }`}>
        {lead.status.toUpperCase()}
      </span>
    )
  },
  { header: "Date", accessor: "timestamp" },
];

export default function Dashboard() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard 
          label="Total Leads" 
          value={42} 
          icon={Users} 
          trend={{ value: "12%", isUp: true }} 
        />
        <StatCard 
          label="Total Projects" 
          value={18} 
          icon={Briefcase} 
          trend={{ value: "4%", isUp: true }} 
        />
        <StatCard 
          label="Active Packages" 
          value={6} 
          icon={Package} 
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Recent Leads</h2>
          <button className="text-accent-blue hover:text-accent-blue/80 text-sm font-semibold flex items-center gap-1 transition-colors">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <DataTable data={mockLeads} columns={leadsColumns} />
      </div>
    </div>
  );
}
