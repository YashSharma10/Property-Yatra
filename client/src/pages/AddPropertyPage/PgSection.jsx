import { Input } from "@/components/ui/input"; // Shadcn Input
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"; // Shadcn Select
import { Button } from "@/components/ui/button";

const PgSection = () => {
  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add PG Property</h2>

      {/* Property Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Property Name</label>
        <Input name="name" placeholder="Enter property name" required />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Location</label>
        <Input name="location" placeholder="Enter location" required />
      </div>

      {/* Rent */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rent (₹/month)</label>
        <Input type="number" name="rent" placeholder="Enter rent amount" required />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea name="description" placeholder="Enter property description" required />
      </div>

      {/* Type of PG */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Property Type</label>
        <Select name="type" required>
          <SelectTrigger>
            <span>Select Property Type</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Single">Single Room</SelectItem>
            <SelectItem value="Shared">Shared Room</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Facilities */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Facilities</label>
        <div className="flex gap-4">
          <label>
            <input type="checkbox" name="wifi" className="mr-2" />
            Wi-Fi
          </label>
          <label>
            <input type="checkbox" name="ac" className="mr-2" />
            AC
          </label>
          <label>
            <input type="checkbox" name="food" className="mr-2" />
            Food
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">Add Property</Button>
    </form>
  );
};

export default PgSection;
