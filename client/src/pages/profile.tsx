import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, User, Save, Camera, AtSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: user?.displayName || '',
    gender: '',
    dateOfBirth: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicture(result);
      };
      reader.readAsDataURL(file);

      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.username) {
      toast({
        title: "Username Required",
        description: "Please enter a username to use as your invitation code.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/user/${user?.uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          displayName: formData.fullName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      toast({
        title: "Profile Updated",
        description: "Your profile and invitation code have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
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

        {/* Profile Picture Section */}
        <div className="w-full max-w-md mx-auto mb-8">
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-700/30">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400/30 mx-auto">
                    {profilePicture ? (
                      <img 
                        src={profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                        <User className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-cyan-600 hover:bg-cyan-500"
                  >
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
                
                <p className="text-sm text-slate-400 mt-3">
                  Click the camera icon to upload a new profile picture
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
            <div className="space-y-6">
              {/* Username - Invitation Code */}
              <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-lg">
                <Label htmlFor="username" className="text-cyan-400 font-semibold mb-2 block flex items-center">
                  <AtSign className="w-4 h-4 mr-2" />
                  Username (Invitation Code)
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your unique username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  data-testid="username-input"
                />
                <p className="text-xs text-slate-400 mt-2">
                  This username will be your unique invitation code for referrals
                </p>
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

              {/* Email (Display Only) */}
              <div>
                <Label className="text-slate-300 mb-2 block">
                  Email
                </Label>
                <Input
                  value={user?.email || 'Not available'}
                  disabled
                  className="bg-slate-700/30 border-slate-600 text-slate-400"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Email is managed by your authentication provider
                </p>
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