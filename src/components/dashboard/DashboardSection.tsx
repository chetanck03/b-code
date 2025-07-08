
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bell, Settings, LogOut } from "lucide-react";
import { DonorDashboard } from "./DonorDashboard";
import { PatientDashboard } from "./PatientDashboard";
import { HospitalDashboard } from "./HospitalDashboard";

interface DashboardSectionProps {
  userType: 'donor' | 'patient' | 'hospital';
}

export const DashboardSection = ({ userType }: DashboardSectionProps) => {
  const handleLogout = () => {
    window.location.reload();
  };

  const getUserTypeInfo = () => {
    switch (userType) {
      case 'donor':
        return {
          title: "Donor Dashboard",
          subtitle: "Track your donations and save lives",
          color: "text-red-500",
          bgColor: "bg-red-50"
        };
      case 'patient':
        return {
          title: "Patient Dashboard",
          subtitle: "Find compatible donors and manage requests",
          color: "text-blue-500",
          bgColor: "bg-blue-50"
        };
      case 'hospital':
        return {
          title: "Hospital Dashboard",
          subtitle: "Manage blood inventory and requests",
          color: "text-green-500",
          bgColor: "bg-green-50"
        };
    }
  };

  const userInfo = getUserTypeInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-blue-900">B-Donor</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Header */}
      <div className={`${userInfo.bgColor} border-b`}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{userInfo.title}</h1>
          <p className="text-gray-600">{userInfo.subtitle}</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {userType === 'donor' && <DonorDashboard />}
        {userType === 'patient' && <PatientDashboard />}
        {userType === 'hospital' && <HospitalDashboard />}
      </div>
    </div>
  );
};
