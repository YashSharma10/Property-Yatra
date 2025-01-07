import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="width">
      <div className=" mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 ">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We would love to hear from you! Feel free to get in touch with any
          inquiries or feedback.
        </p>

        <Card className=" max-w-md  bg-white rounded-lg shadow-lg">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 ">Get in Touch</h3>
            <hr />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>

            {isSubmitted && (
              <div className="mt-4 text-center text-green-600">
                <p>Your message has been sent successfully!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactPage;
