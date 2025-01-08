import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from 'lucide-react';
import Navbar from './Profile/Navbar';

const materials = [
  'Aluminum 6061',
  'Aluminum 7075',
  'Stainless Steel 304',
  'Carbon Steel',
  'ABS Plastic',
  'PLA Plastic',
  'Titanium',
  'Copper'
];

const constraints = [
  'Mass',
  'Volume',
  'Surface Area',
  'Length',
  'Width',
  'Height',
  'Diameter',
  'Cost'
];

const CreateContest = ()=> { 
  const navigate = useNavigate();  // Use react-router's navigate
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', isError: false });
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    type: '',
    problemStatement: '',
    constraint: '',
    constraintValue: '',
    material: '',
    questionImage: null,
    referenceModel: null,
  details: {
    startDate: "",
    startTime: "",
    duration: "",
    access: "",
    maxParticipants: 500,
    softwareRequired: "",
    description: ""
}});
// const [formData, setFormData] = useState({
//   name: '',
//   description: '',
//   category: '',
//   dateTime: '',
//   duration: '',
//   type: '',
//   problemStatement: '',
//   constraint: '',
//   constraintValue: '',
//   material: '',
//   questionImage: null,
//   referenceModel: null
// });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10000000) {  // 10MB limit
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 10MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields for all contest types
    // 
    if (!formData.id.trim()) newErrors.id = 'ID is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
   // if (!formData.hostInfo.name.trim()) newErrors.hostName = 'Host name is required';
    if (!formData.details.startDate.trim()) newErrors.startDate = 'Start date is required';
  if (!formData.details.startTime.trim()) newErrors.startTime = 'Start time is required';
  if (!formData.details.duration.trim()) newErrors.duration = 'Duration is required';
//  if (!formData.details.format.trim()) newErrors.format = 'Format is required';
  if (!formData.details.access.trim()) newErrors.access = 'Access type is required';
  if (isNaN(formData.details.maxParticipants) || formData.details.maxParticipants <= 0) {
    newErrors.maxParticipants = 'Max participants must be a positive number';
  }
  if (!formData.details.softwareRequired.trim()) newErrors.softwareRequired = 'Software requirement is required';
  if (!formData.details.description.trim()) newErrors.description = 'Description is required';

    // Type-specific validation
    if (formData.type === 'creative') {
      if (!formData.problemStatement?.trim()) {
        newErrors.problemStatement = 'Problem statement is required';
      }
    } else if (formData.type === 'race') {
      if (!formData.constraint) newErrors.constraint = 'Constraint is required';
      if (!formData.constraintValue) newErrors.constraintValue = 'Constraint value is required';
      if (!formData.material) newErrors.material = 'Material is required';
      if (!formData.questionImage) newErrors.questionImage = 'Question image is required';
      if (!formData.referenceModel) newErrors.referenceModel = 'Reference model is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('/api/contests', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSubmitStatus({
        message: 'Contest created successfully!',
        isError: false
      });

      // Redirect to contests page after successful creation
      setTimeout(() => {
        navigate('/contests');  // Using `navigate` from react-router-dom
      }, 2000);
      
    } catch (error) {
      setSubmitStatus({
        message: error.message || 'Failed to create contest. Please try again.',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className='min-h-screen pt-20'>
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Contest</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Contest Information */}
          <div className="space-y-4">

            <Input
              name="title"
              placeholder="Contest title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}

            <Textarea
              name="description"
              placeholder="Contest Description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && 
              <span className="text-sm text-red-500">{errors.description}</span>}

            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="simulation">Simulation</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}

            <Input
              type="date"
              name="startDate"
              value={formData.details.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  details: {
                    ...prev.details,
                    startDate: e.target.value,
                  },
                }))
              }
              className={errors.startDate ? 'border-red-500' : ''}
            />
            {errors.startDate && <span className="text-sm text-red-500">{errors.startDate}</span>}

            <Input
              type="time"
              name="startDate"
              value={formData.details.startTime}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  details: {
                    ...prev.details,
                    startTime: e.target.value,
                  },
                }))
              }
              className={errors.startTime ? 'border-red-500' : ''}
            />
            {errors.startTime && <span className="text-sm text-red-500">{errors.startTime}</span>} 
            <Input
              type="number"
              name="duration"
              placeholder="Duration (in minutes)"
              value={formData.details.duration}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  details: {
                    ...prev.details,
                    duration: parseInt(e.target.value, 10) // Ensure numeric input
                  },
                }))
              }
              className={errors.duration ? 'border-red-500' : ''}
            />
            {errors.duration && <span className="text-sm text-red-500">{errors.duration}</span>}
            <Select
              value={formData.details.access}
              onValueChange={(value) => setFormData(prev => ({ ...prev, details:{...prev.details, access: value,}, }))}
            >
              <SelectTrigger className={errors.access ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Contest Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
            {errors.access && <span className="text-sm text-red-500">{errors.access}</span>}
            
            <Input
              type="number"
              name="duration"
              placeholder="N of Participants (Max)"
              value={formData.details.maxParticipants}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  details: {
                    ...prev.details,
                    maxParticipants: parseInt(e.target.value, 10) // Ensure numeric input
                  },
                }))
              }
              className={errors.maxParticipants ? 'border-red-500' : ''}
            />
            {errors.maxParticipants && <span className="text-sm text-red-500">{errors.maxParticipants}</span>}
            
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Contest Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="race">Race Against Time</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <span className="text-sm text-red-500">{errors.type}</span>}
          </div>

          {/* Conditional Fields Based on Contest Type */}
          {formData.type === 'creative' && (
            <div className="space-y-4">
              <Textarea
                name="problemStatement"
                placeholder="Problem Statement"
                value={formData.problemStatement}
                onChange={handleInputChange}
                className={errors.problemStatement ? 'border-red-500' : ''}
              />
              {errors.problemStatement && 
                <span className="text-sm text-red-500">{errors.problemStatement}</span>}
            </div>
          )}

          {formData.type === 'race' && (
            <div className="space-y-4">
              <Select
                value={formData.constraint}
                onValueChange={(value) => setFormData(prev => ({ ...prev, constraint: value }))}
              >
                <SelectTrigger className={errors.constraint ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select Constraint" />
                </SelectTrigger>
                <SelectContent>
                  {constraints.map(constraint => (
                    <SelectItem key={constraint} value={constraint.toLowerCase()}>
                      {constraint}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.constraint && 
                <span className="text-sm text-red-500">{errors.constraint}</span>}

              <Input
                type="number"
                name="constraintValue"
                placeholder="Constraint Value"
                value={formData.constraintValue}
                onChange={handleInputChange}
                className={errors.constraintValue ? 'border-red-500' : ''}
              />
              {errors.constraintValue && 
                <span className="text-sm text-red-500">{errors.constraintValue}</span>}

              <Select
                value={formData.material}
                onValueChange={(value) => setFormData(prev => ({ ...prev, material: value }))}
              >
                <SelectTrigger className={errors.material ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select Material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map(material => (
                    <SelectItem key={material} value={material.toLowerCase()}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.material && 
                <span className="text-sm text-red-500">{errors.material}</span>}

              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'questionImage')}
                    className="hidden"
                    id="questionImage"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('questionImage').click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Question Image
                  </Button>
                  {formData.questionImage && 
                    <span className="text-sm text-green-600">
                      Image selected: {formData.questionImage.name}
                    </span>}
                </div>
                {errors.questionImage && 
                  <span className="text-sm text-red-500">{errors.questionImage}</span>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".stl,.obj,.step,.stp"
                    onChange={(e) => handleFileChange(e, 'referenceModel')}
                    className="hidden"
                    id="referenceModel"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('referenceModel').click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Reference Model
                  </Button>
                  {formData.referenceModel && 
                    <span className="text-sm text-green-600">
                      Model selected: {formData.referenceModel.name}
                    </span>}
                </div>
                {errors.referenceModel && 
                  <span className="text-sm text-red-500">{errors.referenceModel}</span>}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Contest...' : 'Create Contest'}
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
    </div>
    </>
  );
};

export default CreateContest;
