

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    linkedinProfile: '',
    profilePhoto: null,
    userType: '',
    softwareExpertise: [],
    levelOfExpertise: '',
    topicsOfInterest: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', isError: false });

  const softwareOptions = [
    'SolidWorks',
    'ANSYS',
    'CATIA',
    'AutoCAD',
    'Fusion 360',
    'Inventor',
    'MATLAB'
  ];

  const topicOptions = [
    'Design',
    'FEA',
    'CFD',
    'CAM',
    'Additive Manufacturing',
    'Simulation',
    'Product Development'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // User type validation
    if (!formData.userType) newErrors.userType = 'User type is required';
    
    // Level of expertise validation
    if (!formData.levelOfExpertise) newErrors.levelOfExpertise = 'Expertise level is required';
    
    // Check if at least one software expertise is selected
    if (formData.softwareExpertise.length === 0) {
      newErrors.softwareExpertise = 'Select at least one software';
    }
    
    // Check if at least one topic of interest is selected
    if (formData.topicsOfInterest.length === 0) {
      newErrors.topicsOfInterest = 'Select at least one topic';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size must be less than 5MB'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      setErrors(prev => ({
        ...prev,
        profilePhoto: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', isError: false });

    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitStatus({
        message: 'Please correct the errors before submitting',
        isError: true
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'softwareExpertise' || key === 'topicsOfInterest') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('/api/register', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      setSubmitStatus({
        message: 'Registration successful! Please check your email for verification.',
        isError: false
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        linkedinProfile: '',
        profilePhoto: null,
        userType: '',
        softwareExpertise: [],
        levelOfExpertise: '',
        topicsOfInterest: []
      });
    } catch (error) {
      setSubmitStatus({
        message: error.message || 'Registration failed. Please try again.',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-2">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && 
              <span className="text-sm text-red-500">{errors.confirmPassword}</span>}
          </div>

          {/* Profile Information */}
          <div className="space-y-2">
            <Input
              name="linkedinProfile"
              placeholder="LinkedIn Profile URL (Optional)"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
            />

            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="profilePhoto"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('profilePhoto').click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Profile Photo
              </Button>
              {formData.profilePhoto && 
                <span className="text-sm text-green-600">
                  Photo selected: {formData.profilePhoto.name}
                </span>}
            </div>
            {errors.profilePhoto && 
              <span className="text-sm text-red-500">{errors.profilePhoto}</span>}
          </div>

          {/* User Type and Expertise */}
          <div className="space-y-4">
            <Select
              value={formData.userType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
            >
              <SelectTrigger className={errors.userType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
              </SelectContent>
            </Select>
            {errors.userType && <span className="text-sm text-red-500">{errors.userType}</span>}

            <Select
              value={formData.levelOfExpertise}
              onValueChange={(value) => setFormData(prev => ({ ...prev, levelOfExpertise: value }))}
            >
              <SelectTrigger className={errors.levelOfExpertise ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Expertise Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            {errors.levelOfExpertise && 
              <span className="text-sm text-red-500">{errors.levelOfExpertise}</span>}
          </div>

          {/* Software Expertise */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Software Expertise</h3>
            <div className="grid grid-cols-2 gap-2">
              {softwareOptions.map(software => (
                <div key={software} className="flex items-center space-x-2">
                  <Checkbox
                    id={`software-${software}`}
                    checked={formData.softwareExpertise.includes(software)}
                    onCheckedChange={() => handleCheckboxChange('softwareExpertise', software)}
                  />
                  
                  <label htmlFor={`software-${software}`} className="text-sm">
                    {software}
                  </label>
                </div>
              ))}
            </div>
            {errors.softwareExpertise && 
              <span className="text-sm text-red-500">{errors.softwareExpertise}</span>}
          </div>

          {/* Topics of Interest */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Topics of Interest</h3>
            <div className="grid grid-cols-2 gap-2">
              {topicOptions.map(topic => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={`topic-${topic}`}
                    checked={formData.topicsOfInterest.includes(topic)}
                    onCheckedChange={() => handleCheckboxChange('topicsOfInterest', topic)}
                  />
                  <label htmlFor={`topic-${topic}`} className="text-sm">
                    {topic}
                  </label>
                </div>
              ))}
            </div>
            {errors.topicsOfInterest && 
              <span className="text-sm text-red-500">{errors.topicsOfInterest}</span>}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>

          {/* Status Message */}
          {submitStatus.message && (
            <Alert className={submitStatus.isError ? 'bg-red-50' : 'bg-green-50'}>
              <AlertDescription>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;