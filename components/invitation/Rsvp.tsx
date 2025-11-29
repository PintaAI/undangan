"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CardWithCorners, CardContent, CardHeader,} from "@/components/ui/card-with-corners";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarCheck, MessageSquare, Heart, User } from "lucide-react";
import { useSearchParams } from 'next/navigation';

interface RsvpComment {
  fullName: string;
  message: string;
  attendance: string;
  submittedAt: string;
}

export default function Rsvp() {
  const searchParams = useSearchParams();
  const guestId = searchParams.get('id');
  const guestNameFromUrl = searchParams.get('name');
  // We can capture the side if needed for analytics or form data,
  // though currently not used in the form display
  // const guestSide = searchParams.get('side');

  const [formData, setFormData] = useState({
    fullName: guestNameFromUrl ? decodeURIComponent(guestNameFromUrl) : "",
    attendance: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState<RsvpComment[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          guestId,
          guestNameFromUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("RSVP saved successfully:", result);
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setFormData({
          fullName: "",
          attendance: "",
          message: ""
        });
      } else {
        setError(result.error || 'Failed to submit RSVP. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/rsvp/list');
      const result = await response.json();
      
      if (response.ok) {
        // Filter only RSVPs with messages and sort by submission date
        const commentsWithMessages = result.rsvps
          .filter((rsvp: RsvpComment) => rsvp.message && rsvp.message.trim() !== '')
          .sort((a: RsvpComment, b: RsvpComment) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          )
          .slice(0, 5); // Show only the 5 most recent comments
        setComments(commentsWithMessages);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
            className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3"
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
            className="text-2xl md:text-3xl font-serif font-bold text-foreground"
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

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Mengirim...' : 'Submit RSVP'}
                </Button>
              </div>
            </form>
          </CardContent>
        </CardWithCorners>
        </motion.div>

        {/* Guest Comments Section */}
        {comments.length > 0 && (
          <motion.div
            className="mt-12 w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex justify-center mb-3">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                  Ucapan & Doa
                </h3>
                <p className="text-muted-foreground">
                  Pesan dari tamu undangan
                </p>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CardWithCorners className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground truncate">
                                {comment.fullName}
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MessageSquare className="h-3 w-3" />
                                {new Date(comment.submittedAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                              &quot; {comment.message} &quot;
                            </p>
                            {comment.attendance === 'attending' && (
                              <div className="mt-2 flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-green-600 dark:text-green-400">Akan Hadir</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CardWithCorners>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}