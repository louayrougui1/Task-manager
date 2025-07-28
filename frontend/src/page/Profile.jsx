import { useDispatch, useSelector } from "react-redux";
import { reset, logout, editProfile, getMe } from "../Slices/authSlice";
import { useNavigate } from "react-router";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit2, LogOut, Save, X, User } from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarURL, setavatarURL] = useState(
    "http://localhost:8000" + user.avatarURL
  );
  const [tempName, setTempName] = useState(user.name);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(async () => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setavatarURL(e.target?.result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 500);
      const data = new FormData();
      data.append("avatar", file);
      dispatch(editProfile(data));
    }
  };

  const handleSaveName = () => {
    const data = new FormData();
    data.append("name", tempName);
    dispatch(editProfile(data));
    setIsEditing(false);
  };

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getDate = (time) => {
    const isoString = "2025-06-17T10:20:52.031+00:00";
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", {
      month: "long",
    });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  if (!user) {
    return null;
  }
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Profile Settings
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <CardContent className="relative pt-0 pb-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-6 relative z-10">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={avatarURL || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback className="text-2xl font-semibold bg-slate-200">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="text-xl font-bold"
                        autoFocus
                      />
                      <Button size="sm" onClick={handleSaveName}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {user.name}
                      </h2>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        className="p-1 h-auto"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-slate-600 mb-4">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  Full Name
                </Label>
                <p className="text-slate-900 mt-1">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  Email Address
                </Label>
                <p className="text-slate-900 mt-1">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  Member Since
                </Label>
                <p className="text-slate-900 mt-1">
                  {getDate("2025-06-17T10:20:52.031+00:00")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account settings and security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1">
                Change Password
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
