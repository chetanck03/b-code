import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MapPin, Award, Shield, Clock } from "lucide-react";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { HeroSection } from "@/components/hero/HeroSection";

const Index = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'donor' | 'patient' | 'hospital'>('donor');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = (type: 'donor' | 'patient' | 'hospital') => {
    setAuthType(type);
    setAuthOpen(true);
  };

  if (isLoggedIn) {
    return <DashboardSection userType={authType} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section with Spline Background */}
      <HeroSection 
        onDonorClick={() => handleAuthClick('donor')}
        onPatientClick={() => handleAuthClick('patient')}
        onHospitalClick={() => handleAuthClick('hospital')}
      />

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Platform Features</h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Comprehensive tools designed to make blood donation efficient, safe, and rewarding
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-blue-900">Smart Matching</CardTitle>
                <CardDescription>
                  Advanced blood type compatibility matching system connects donors with patients instantly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-blue-900">Location Finder</CardTitle>
                <CardDescription>
                  Find nearby hospitals, blood banks, and donation centers with real-time availability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle className="text-blue-900">Donor Rewards</CardTitle>
                <CardDescription>
                  Recognition system with certificates, badges, and rewards for regular donors
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle className="text-blue-900">Secure & Private</CardTitle>
                <CardDescription>
                  HIPAA-compliant security ensuring your medical information stays protected
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-blue-900">Emergency Response</CardTitle>
                <CardDescription>
                  24/7 emergency matching for critical patients with immediate blood needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-500 mb-4" />
                <CardTitle className="text-blue-900">Impact Tracking</CardTitle>
                <CardDescription>
                  See the lives you've touched with detailed donation history and impact metrics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gradient-to-r from-blue-50 to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">How B-Donor Works</h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Simple steps to start saving lives or find the help you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Register</h3>
              <p className="text-blue-700">Sign up as a donor, patient, or healthcare facility with your basic information and blood type</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Match</h3>
              <p className="text-blue-700">Our smart algorithm matches compatible donors with patients based on blood type and location</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Save Lives</h3>
              <p className="text-blue-700">Connect directly or through partner hospitals to complete the donation and save lives</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto">
            Join thousands of heroes who are already saving lives through B-Donor. 
            Every donation matters, every life is precious.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold"
              onClick={() => handleAuthClick('donor')}
            >
              Start Donating Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-white text-blue-900 px-8 py-4 text-lg font-semibold"
              onClick={() => handleAuthClick('patient')}
            >
              Find Blood Donors
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                  <img src="/logo.jpg" alt="B-Donor Logo" className="h-8 w-8 rounded-full object-contain" />

                <span className="text-xl font-bold">B-Donor</span>
              </div>
              <p className="text-gray-400">Connecting hearts, saving lives through the power of blood donation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">For Donors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Patients</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Hospitals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 B-Donor. All rights reserved. Saving lives, one donation at a time.</p>
          </div>
        </div>
      </footer>

      <AuthDialog 
        open={authOpen} 
        onOpenChange={setAuthOpen} 
        userType={authType}
        onSuccess={() => {
          setIsLoggedIn(true);
          setAuthOpen(false);
        }}
      />
    </div>
  );
};

export default Index;
