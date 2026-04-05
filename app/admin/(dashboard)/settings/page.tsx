"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Shield, Palette, Layout, Globe, Save, Trash2, Plus, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InputField, TextAreaField, ToggleSwitch } from "@/components/admin/FormFields";
import { cn } from "@/lib/utils";
import { getDeviceFingerprint } from "@/lib/device";
import { ModalForm } from "@/components/admin/ModalForm";

const tabs = [
  { id: "business", icon: Globe, label: "Business Profile" },
  { id: "branding", icon: Palette, label: "Branding" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "security", icon: Shield, label: "Security" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("business");
  const [authorizedDevices, setAuthorizedDevices] = useState<string[]>([]);
  const [currentFingerprint, setCurrentFingerprint] = useState("");
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [newDeviceId, setNewDeviceId] = useState("");

  useEffect(() => {
    const devices = JSON.parse(localStorage.getItem("bmtech_authorized_devices") || "[]");
    setAuthorizedDevices(devices);
    setCurrentFingerprint(getDeviceFingerprint());
  }, []);

  const handleRemoveDevice = (id: string) => {
    if (id === currentFingerprint && !confirm("Warning: You are removing your CURRENT device. You will be locked out. Proceed?")) return;
    
    const updated = authorizedDevices.filter(d => d !== id);
    setAuthorizedDevices(updated);
    localStorage.setItem("bmtech_authorized_devices", JSON.stringify(updated));
  };

  const handleEnrollDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceId) return;
    
    if (authorizedDevices.includes(newDeviceId)) {
      alert("This device is already whitelisted.");
      return;
    }

    const updated = [...authorizedDevices, newDeviceId];
    setAuthorizedDevices(updated);
    localStorage.setItem("bmtech_authorized_devices", JSON.stringify(updated));
    setNewDeviceId("");
    setIsEnrollModalOpen(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">System Settings</h2>
          <p className="text-text-secondary">Configure your platform globally to match your vision.</p>
        </div>
        <Button className="h-14 px-8 gap-2 group shadow-lg shadow-accent-blue/30">
          <Save size={20} className="group-hover:scale-110 transition-transform" /> Save Settings
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-start">
        {/* Navigation */}
        <aside className="w-full xl:w-80 bg-surface border border-border rounded-3xl p-6 space-y-2 sticky top-24">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group font-semibold",
                  isActive 
                    ? "bg-accent-blue text-white shadow-xl shadow-accent-blue/20" 
                    : "text-text-secondary hover:bg-background hover:text-text-primary"
                )}
              >
                <Icon size={20} className={cn("shrink-0", isActive ? "text-white" : "text-text-secondary group-hover:text-text-primary")} />
                <span className="text-sm tracking-wide uppercase">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full bg-surface border border-border rounded-3xl p-8 xl:p-12 min-h-[600px] shadow-2xl shadow-black/20">
          <div className="max-w-3xl space-y-12">
            
            {activeTab === "business" && (
              <section className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 border-l-4 border-accent-blue pl-6">
                  <h3 className="text-2xl font-bold text-text-primary tracking-tight">Agency Information</h3>
                  <p className="text-text-secondary text-sm">Public details visible on the main page.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Agency Name" defaultValue="BMTech Digital Agency" placeholder="e.g., Nexus Digital" />
                  <InputField label="Headline" defaultValue="We Handle Your Digital." placeholder="e.g., Empowering Visionaries" />
                  <InputField label="Contact Email" defaultValue="info@bmtech.com" placeholder="e.g., hello@agency.com" />
                  <InputField label="Contact Phone" defaultValue="+92 312 4567890" placeholder="e.g., +1 234 567 890" />
                  <div className="md:col-span-2">
                    <TextAreaField 
                      label="About Agency" 
                      placeholder="Write a brief overview of your agency..." 
                      defaultValue="BMTech is a premier digital agency specializing in premium solutions for modern businesses. We transform challenges into opportunities."
                    />
                  </div>
                </div>
              </section>
            )}

            {activeTab === "security" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 border-l-4 border-accent-blue pl-6">
                  <h3 className="text-2xl font-bold text-text-primary tracking-tight">Hardware Whitelist</h3>
                  <p className="text-text-secondary text-sm">Strictly allow login only from these hardware footprints.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 rounded-2xl bg-accent-blue/5 border border-accent-blue/20 space-y-3">
                      <div className="flex items-center gap-2 text-accent-blue">
                         <Monitor size={18} />
                         <span className="text-xs font-bold uppercase tracking-widest">Current Device ID</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-text-primary tracking-tighter uppercase">{currentFingerprint}</p>
                      <p className="text-xs text-text-secondary">This device is {authorizedDevices.includes(currentFingerprint) ? "Authorized" : "Not whitelisted"}.</p>
                   </div>
                   
                   <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-center gap-4">
                      <p className="text-sm font-medium text-text-secondary">To allow your phone, open this page on your phone and enter the ID shown there into the list.</p>
                      <Button onClick={() => setIsEnrollModalOpen(true)} variant="secondary" className="gap-2 border-border">
                        <Plus size={18} /> Enroll New Hardware
                      </Button>
                   </div>
                </div>

                <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                  <div className="p-6 border-b border-border flex items-center justify-between bg-surface/50">
                    <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Authorized Hardware ( {authorizedDevices.length} )</span>
                  </div>
                  <div className="divide-y divide-border">
                    {authorizedDevices.map((id, index) => (
                      <div key={id} className="p-6 flex items-center justify-between group hover:bg-surface/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center",
                            id === currentFingerprint ? "bg-emerald-500/10 text-emerald-400" : "bg-surface border border-border text-text-secondary"
                          )}>
                            {index === 0 ? <Monitor size={20} /> : <Smartphone size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary">
                              {id === currentFingerprint ? "Current Device" : `Hardware Node ${index + 1}`}
                            </p>
                            <p className="text-xs font-mono text-text-secondary uppercase">ID: {id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           {id === currentFingerprint && (
                             <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase">In Use</span>
                           )}
                           <button 
                             onClick={() => handleRemoveDevice(id)}
                             className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                           >
                              <Trash2 size={18} />
                           </button>
                        </div>
                      </div>
                    ))}
                    {authorizedDevices.length === 0 && (
                       <div className="p-12 text-center text-text-secondary italic text-sm">
                         No hardware white-listed. Root bypass active.
                       </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 border-l-4 border-accent-blue pl-6 mb-10">
                  <h3 className="text-2xl font-bold text-text-primary tracking-tight">Alert Settings</h3>
                  <p className="text-text-secondary text-sm">Control how you get notified of new leads.</p>
                </div>
                <ToggleSwitch label="Email Alerts on New Leads" checked={true} onChange={() => {}} />
                <ToggleSwitch label="System Push Notifications" checked={true} onChange={() => {}} />
                <ToggleSwitch label="Weekly Summary Reports" checked={false} onChange={() => {}} />
                <ToggleSwitch label="Slack Integration" checked={false} onChange={() => {}} />
              </div>
            )}

            {activeTab === "branding" && (
              <section className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Previous Branding UI */}
              </section>
            )}
            
          </div>
        </div>
      </div>

      <ModalForm
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        title="Enroll New Hardware"
        description="Enter the Hardware ID shown on the device you want to authorize."
        submitLabel="White-list Device"
        onSubmit={handleEnrollDevice}
      >
        <InputField 
          label="Hardware ID" 
          placeholder="e.g., 8A3F2B1D" 
          value={newDeviceId}
          onChange={(e) => setNewDeviceId(e.target.value.toUpperCase())}
          required 
          maxLength={12}
        />
        <p className="text-[10px] text-text-secondary leading-relaxed mt-2 italic">
          Tip: Log in on the new device once to see its Hardware ID at the bottom of the login screen. Note it down and enter it here from an already authorized device.
        </p>
      </ModalForm>
    </div>
  );
}
