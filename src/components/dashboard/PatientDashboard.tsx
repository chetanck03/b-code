
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Search, MapPin, Clock, Heart, AlertCircle, Phone, Plus } from "lucide-react";
import { BloodTypeSelector } from "../shared/BloodTypeSelector";
import { useToast } from "@/hooks/use-toast";

export const PatientDashboard = () => {
  const [bloodTypeNeeded, setBloodTypeNeeded] = useState('A+');
  const [unitsNeeded, setUnitsNeeded] = useState('2');
  const [urgencyLevel, setUrgencyLevel] = useState('Critical');
  const { toast } = useToast();

  const activeRequests = [
    { 
      id: 1, 
      bloodType: 'A+', 
      units: 2, 
      urgency: 'Critical', 
      hospital: 'City General Hospital', 
      created: '2024-01-15',
      matches: 5,
      status: 'Active'
    },
    { 
      id: 2, 
      bloodType: 'A+', 
      units: 1, 
      urgency: 'Medium', 
      hospital: 'Metro Medical Center', 
      created: '2024-01-10',
      matches: 3,
      status: 'Active'
    },
  ];

  const availableDonors = [
    { 
      id: 1, 
      bloodType: 'A+', 
      location: '2.5 km away', 
      lastDonation: '3 months ago', 
      status: 'Available',
      donations: 12,
      rating: 4.9
    },
    { 
      id: 2, 
      bloodType: 'A+', 
      location: '4.1 km away', 
      lastDonation: '1 month ago', 
      status: 'Available',
      donations: 8,
      rating: 4.8
    },
    { 
      id: 3, 
      bloodType: 'A+', 
      location: '5.8 km away', 
      lastDonation: '2 weeks ago', 
      status: 'Recently Donated',
      donations: 15,
      rating: 5.0
    },
  ];

  const nearbyHospitals = [
    { name: 'City General Hospital', distance: '1.2 km', bloodBank: true, emergency: true, phone: '+1-234-567-8900' },
    { name: 'Metro Medical Center', distance: '2.8 km', bloodBank: true, emergency: false, phone: '+1-234-567-8901' },
    { name: 'Community Blood Bank', distance: '3.5 km', bloodBank: true, emergency: false, phone: '+1-234-567-8902' },
  ];

  const handleCreateRequest = () => {
    toast({
      title: "Blood Request Created!",
      description: `Request for ${unitsNeeded} units of ${bloodTypeNeeded} blood has been posted.`,
    });
  };

  const handleContactDonor = (donorId: number) => {
    toast({
      title: "Donor Contacted!",
      description: "A message has been sent to the donor. They will respond shortly.",
    });
  };

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Services Contacted",
      description: "Emergency blood services have been notified of your critical need.",
      variant: "destructive",
    });
  };

  const handleCallHospital = (hospitalName: string, phone: string) => {
    toast({
      title: "Calling Hospital",
      description: `Connecting you to ${hospitalName} at ${phone}`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Emergency Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Emergency Blood Request</h3>
              <p className="text-red-700">Need immediate assistance? Call our 24/7 emergency hotline</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleEmergencyCall}>
              <Phone className="mr-2 h-4 w-4" />
              Emergency
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">2</div>
            <p className="text-sm text-gray-500 mt-1">Pending matches</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Matches Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">8</div>
            <p className="text-sm text-gray-500 mt-1">Compatible donors</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Successful Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">3</div>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Blood Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{bloodTypeNeeded}</div>
            <p className="text-sm text-gray-500 mt-1">Required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Create New Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Create Blood Request
            </CardTitle>
            <CardDescription>
              Submit a new blood donation request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bloodType">Blood Type Needed</Label>
              <BloodTypeSelector value={bloodTypeNeeded} onChange={setBloodTypeNeeded} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="units">Units Required</Label>
                <Input
                  id="units"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(e.target.value)}
                  placeholder="Number of units"
                />
              </div>
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <select 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value)}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleCreateRequest}>
              <Search className="mr-2 h-4 w-4" />
              Create Request & Find Donors
            </Button>
          </CardContent>
        </Card>

        {/* Nearby Hospitals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              Nearby Hospitals
            </CardTitle>
            <CardDescription>
              Blood banks and hospitals in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyHospitals.map((hospital, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{hospital.name}</h4>
                    {hospital.emergency && (
                      <Badge variant="destructive">24/7 Emergency</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Distance: {hospital.distance}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="mr-1 h-3 w-3" />
                      Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCallHospital(hospital.name, hospital.phone)}
                    >
                      <Phone className="mr-1 h-3 w-3" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Active Blood Requests
          </CardTitle>
          <CardDescription>
            Your current pending blood donation requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Blood Type: {request.bloodType}</h4>
                  <Badge variant={request.urgency === 'Critical' ? 'destructive' : 'secondary'}>
                    {request.urgency} Priority
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                  <span>Units needed: {request.units}</span>
                  <span>Hospital: {request.hospital}</span>
                  <span>Matches found: {request.matches}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View {request.matches} Matches
                  </Button>
                  <Button size="sm" variant="outline">
                    Update Request
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Donors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Compatible Donors
          </CardTitle>
          <CardDescription>
            Donors who match your blood type requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableDonors.map((donor) => (
              <div key={donor.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Blood Type: {donor.bloodType}</h4>
                  <Badge variant={donor.status === 'Available' ? 'default' : 'secondary'}>
                    {donor.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                  <span>Location: {donor.location}</span>
                  <span>Donations: {donor.donations}</span>
                  <span>Rating: ⭐ {donor.rating}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    disabled={donor.status !== 'Available'}
                    onClick={() => handleContactDonor(donor.id)}
                  >
                    Contact Donor
                  </Button>
                  <Button size="sm" variant="outline">
                    <MapPin className="mr-1 h-3 w-3" />
                    View Location
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
