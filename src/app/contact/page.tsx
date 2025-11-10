"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Interested in collaboration, partnerships, or learning more about our research? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">
                emmanuel@earesearch.net
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground text-sm">
                Hauptstrasse 194<br />
                2552 Orpund<br />
                Bern, Switzerland
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
              <h3 className="font-semibold mb-3">Research Focus</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Voice-First ASR Systems</li>
                <li>• Digital Agriculture</li>
                <li>• ZK Privacy Technologies</li>
                <li>• Socio-Technical Design</li>
              </ul>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium mb-2">
                      Organization
                    </label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization (optional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glossy-blue glossy-blue-hover hover:opacity-90"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
