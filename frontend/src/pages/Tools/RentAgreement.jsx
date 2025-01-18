import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

const RentAgreement = () => {
  const [formData, setFormData] = useState({
    landlordName: '',
    tenantName: '',
    propertyAddress: '',
    rentAmount: '',
    securityDeposit: '',
    startDate: '',
    endDate: '',
    terms: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Rent Agreement Form</h2>
      <form onSubmit={handlePreview}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="landlordName">Landlord's Name</Label>
            <Input
              id="landlordName"
              name="landlordName"
              placeholder="Enter landlord's name"
              value={formData.landlordName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="tenantName">Tenant's Name</Label>
            <Input
              id="tenantName"
              name="tenantName"
              placeholder="Enter tenant's name"
              value={formData.tenantName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="propertyAddress">Property Address</Label>
            <Textarea
              id="propertyAddress"
              name="propertyAddress"
              placeholder="Enter property address"
              value={formData.propertyAddress}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rentAmount">Rent Amount (per month)</Label>
              <Input
                id="rentAmount"
                name="rentAmount"
                type="number"
                placeholder="Enter rent amount"
                value={formData.rentAmount}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="securityDeposit">Security Deposit</Label>
              <Input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                placeholder="Enter security deposit"
                value={formData.securityDeposit}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="terms">Additional Terms</Label>
            <Textarea
              id="terms"
              name="terms"
              placeholder="Enter additional terms"
              value={formData.terms}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4">Preview Agreement</Button>
      </form>

      {showPreview && (
        <div className="mt-8 p-4 border rounded shadow bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Rent Agreement Preview</h2>
          <p><strong>Landlord:</strong> {formData.landlordName}</p>
          <p><strong>Tenant:</strong> {formData.tenantName}</p>
          <p><strong>Property Address:</strong> {formData.propertyAddress}</p>
          <p><strong>Rent Amount:</strong> ₹{formData.rentAmount}/month</p>
          <p><strong>Security Deposit:</strong> ₹{formData.securityDeposit}</p>
          <p><strong>Rental Period:</strong> {formData.startDate} to {formData.endDate}</p>
          <p><strong>Additional Terms:</strong></p>
          <p>{formData.terms || 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default RentAgreement;
