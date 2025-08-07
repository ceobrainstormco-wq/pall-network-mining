import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, User, Save } from 'lucide-react';

export default function Profile() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Simulate saving profile data
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src="/crypto-background.svg" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.95) 100%)"
          }}
        />
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col p-6 py-16">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              data-testid="back-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Mining
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-400">Manage your personal information</p>
        </div>

        {/* Profile Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
            <div className="space-y-6">
              {/* Username */}
              <div>
                <Label htmlFor="username" className="text-slate-300 mb-2 block">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  data-testid="username-input"
                />
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-slate-300 mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  data-testid="fullname-input"
                />
              </div>

              {/* Gender */}
              <div>
                <Label className="text-slate-300 mb-2 block">
                  Gender
                </Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger 
                    className="bg-slate-700/50 border-slate-600 text-white"
                    data-testid="gender-select"
                  >
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date of Birth */}
              <div>
                <Label htmlFor="dateOfBirth" className="text-slate-300 mb-2 block">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  data-testid="dob-input"
                />
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3"
                data-testid="save-profile-button"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}