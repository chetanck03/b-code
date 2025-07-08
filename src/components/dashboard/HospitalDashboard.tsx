
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Package, Users, TrendingUp, AlertTriangle, Plus, Calendar, Download, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HospitalDashboard = () => {
  const { toast } = useToast();

  const [bloodInventory, setBloodInventory] = useState([
    { type: 'O+', units: 25, status: 'Normal', expiry: '2024-02-15' },
    { type: 'O-', units: 8, status: 'Low', expiry: '2024-02-10' },
    { type: 'A+', units: 18, status: 'Normal', expiry: '2024-02-20' },
    { type: 'A-', units: 5, status: 'Critical', expiry: '2024-02-08' },
    { type: 'B+', units: 12, status: 'Normal', expiry: '2024-02-18' },
    { type: 'B-', units: 3, status: 'Critical', expiry: '2024-02-12' },
    { type: 'AB+', units: 7, status: 'Low', expiry: '2024-02-14' },
    { type: 'AB-', units: 2, status: 'Critical', expiry: '2024-02-09' },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { 
      id: 1, 
      patient: 'Emergency Case #1234', 
      bloodType: 'O-', 
      units: 2, 
      urgency: 'Critical', 
      requestedAt: '2024-01-15 14:30',
      department: 'Emergency',
      doctor: 'Dr. Smith'
    },
    { 
      id: 2, 
      patient: 'Surgery Patient #5678', 
      bloodType: 'A+', 
      units: 1, 
      urgency: 'High', 
      requestedAt: '2024-01-15 12:15',
      department: 'Surgery',
      doctor: 'Dr. Johnson'
    },
    { 
      id: 3, 
      patient: 'Treatment #9012', 
      bloodType: 'B+', 
      units: 1, 
      urgency: 'Medium', 
      requestedAt: '2024-01-15 09:45',
      department: 'Oncology',
      doctor: 'Dr. Williams'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'Low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Normal':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleApproveRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      // Update inventory
      setBloodInventory(prev => 
        prev.map(item => 
          item.type === request.bloodType 
            ? { ...item, units: Math.max(0, item.units - request.units) }
            : item
        )
      );
      
      // Remove from pending requests
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      
      toast({
        title: "Request Approved!",
        description: `${request.units} units of ${request.bloodType} allocated to ${request.patient}`,
      });
    }
  };

  const handleRequestDonors = () => {
    toast({
      title: "Donor Request Sent!",
      description: "Emergency donor alert has been sent to compatible donors in your area.",
    });
  };

  const handleScheduleDonationDrive = () => {
    toast({
      title: "Donation Drive Scheduled!",
      description: "A new blood donation drive has been scheduled for next week.",
    });
  };

  const handleExportReports = () => {
    toast({
      title: "Reports Exported!",
      description: "Blood inventory and usage reports have been downloaded.",
    });
  };

  const criticalTypes = bloodInventory.filter(item => item.status === 'Critical').length;

  return (
    <div className="space-y-8">
      {/* Critical Alerts */}
      {criticalTypes > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900">Critical Blood Shortage Alert</h3>
                <p className="text-red-700">{criticalTypes} blood types are critically low. Immediate restocking required.</p>
              </div>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleRequestDonors}>
                <Plus className="mr-2 h-4 w-4" />
                Request Donors
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Blood Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {bloodInventory.reduce((sum, item) => sum + item.units, 0)}
            </div>
            <p className="text-sm text-gray-500 mt-1">In inventory</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Donations Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">12</div>
            <p className="text-sm text-gray-500 mt-1">New donations</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{pendingRequests.length}</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting fulfillment</p>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Critical Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{criticalTypes}</div>
            <p className="text-sm text-gray-500 mt-1">Need immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Blood Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              Blood Inventory
            </CardTitle>
            <CardDescription>
              Current blood type availability and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bloodInventory.map((blood) => (
                <div key={blood.type} className={`border rounded-lg p-3 ${getStatusColor(blood.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{blood.type}</h4>
                    <Badge variant={blood.status === 'Critical' ? 'destructive' : blood.status === 'Low' ? 'secondary' : 'default'}>
                      {blood.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{blood.units} units available</span>
                    <span>Expires: {blood.expiry}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common hospital blood management tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Register New Donor
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Blood Request
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={handleScheduleDonationDrive}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Donation Drive
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={handleExportReports}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency Protocols
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Pending Blood Requests
          </CardTitle>
          <CardDescription>
            Patient requests awaiting blood allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{request.patient}</h4>
                  <Badge variant={request.urgency === 'Critical' ? 'destructive' : request.urgency === 'High' ? 'secondary' : 'outline'}>
                    {request.urgency} Priority
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                  <span>Blood Type: {request.bloodType}</span>
                  <span>Units: {request.units}</span>
                  <span>Department: {request.department}</span>
                  <span>Doctor: {request.doctor}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleApproveRequest(request.id)}
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Approve & Allocate
                  </Button>
                  <Button size="sm" variant="outline">
                    Find Donors
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Patient
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest donations and blood usage in your facility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'Donation', detail: 'New O+ donation received from John D.', time: '2 hours ago', status: 'success' },
              { type: 'Usage', detail: 'A- blood allocated to surgery patient', time: '4 hours ago', status: 'neutral' },
              { type: 'Alert', detail: 'B- blood approaching expiry date', time: '6 hours ago', status: 'warning' },
              { type: 'Donation', detail: 'AB+ donation scheduled for tomorrow', time: '8 hours ago', status: 'info' },
              { type: 'Emergency', detail: 'Critical O- request fulfilled', time: '10 hours ago', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div>
                    <p className="font-semibold text-sm">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
