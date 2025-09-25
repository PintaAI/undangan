"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CardWithCorners, CardContent, CardHeader,} from "@/components/ui/card-with-corners";
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
      <section className="min-h-screen py-8 px-4 overflow-hidden">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Thank You!
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Your RSVP has been received
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="default"
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Submit Another RSVP
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center py-8 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto w-full">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {weddingData.rsvp.title}
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            kami sangat menantikan kehadiran-mu di hari istimewa kami
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <CardWithCorners className="shadow-lg border-6">
          <CardHeader className="text-center pb-3">
            <div className="flex justify-center">
              <CalendarCheck className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-1.5">
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
                  className="h-9"
                />
              </div>

              {/* Attendance Status Radio Group */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Silahkan Konfirmasi Kehadiran *
                </Label>
                <RadioGroup
                  value={formData.attendance || ""}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, attendance: value }))}
                  required
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attending" id="attending" />
                      <Label htmlFor="attending" className="cursor-pointer text-sm">Hadir</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-attending" id="not-attending" />
                      <Label htmlFor="not-attending" className="cursor-pointer text-sm">Tidak Hadir</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Message to Couple */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Pesan untuk Pasangan
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tulis ucapan atau pesan khusus untuk kami..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Submit RSVP
                </Button>
              </div>
            </form>
          </CardContent>
        </CardWithCorners>
        </motion.div>
      </div>
    </section>
  );
}