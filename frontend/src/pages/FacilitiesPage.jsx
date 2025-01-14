import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dummy Data for Corporate and Residential Facilities
const corporateFacilities = [
  {
    id: 1,
    name: 'CCTV Surveillance',
    description: '24/7 CCTV surveillance to ensure safety and security.',
    image: '/assets/cctv.jpg',
  },
  {
    id: 2,
    name: 'Security Guards',
    description: 'Trained security personnel for guarding premises at all times.',
    image: '/assets/security.jpg',
  },
  {
    id: 3,
    name: 'Cleaning Services',
    description: 'Professional cleaning services for a clean and hygienic environment.',
    image: '/assets/cleaning.jpg',
  },
  {
    id: 4,
    name: 'Fire Safety Systems',
    description: 'State-of-the-art fire safety equipment and alarm systems.',
    image: '/assets/fire-safety.jpg',
  },
];

const residentialFacilities = [
  {
    id: 1,
    name: 'Swimming Pool',
    description: 'Luxury swimming pool for residents to unwind and relax.',
    image: '/assets/pool.jpg',
  },
  {
    id: 2,
    name: 'Gymnasium',
    description: 'Fully-equipped gym for fitness enthusiasts.',
    image: '/assets/gym.jpg',
  },
  {
    id: 3,
    name: 'Parking Space',
    description: 'Dedicated parking space for residents and visitors.',
    image: '/assets/parking.jpg',
  },
  {
    id: 4,
    name: 'Clubhouse',
    description: 'An exclusive clubhouse for social gatherings and events.',
    image: '/assets/clubhouse.jpg',
  },
];

const FacilitiesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Facilities Offered</h1>

      {/* Corporate Facilities Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">Corporate Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corporateFacilities.map((facility) => (
            <Card key={facility.id} className="shadow-lg">
              <CardHeader>
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{facility.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Residential Facilities Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Residential Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {residentialFacilities.map((facility) => (
            <Card key={facility.id} className="shadow-lg">
              <CardHeader>
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{facility.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;
