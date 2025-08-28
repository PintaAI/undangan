"use client";

import { useState } from "react";
import { weddingData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarCheck } from "lucide-react";

export default function Rsvp() {
  const [formData, setFormData] = useState({
    fullName: "",
    attendance: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      attendance: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP Form Data:", formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      fullName: "",
      attendance: "",
      message: ""
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Thank You!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your RSVP has been received. We're excited to celebrate with you!
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="default"
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Submit Another RSVP
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {weddingData.rsvp.title}
          </h2>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <CalendarCheck className="h-12 w-12 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              {/* Attendance Status Radio Group */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  Silahkan Konfirmasi Kehadiran *
                </Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, attendance: value }))}
                  required
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attending" id="attending" />
                      <Label htmlFor="attending" className="cursor-pointer">Hadir</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-attending" id="not-attending" />
                      <Label htmlFor="not-attending" className="cursor-pointer">Tidak Hadir</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Message to Couple */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Pesan untuk Pasangan
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tulis ucapan atau pesan khusus untuk kami..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Submit RSVP
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}