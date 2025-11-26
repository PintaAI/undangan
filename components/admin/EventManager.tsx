"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardWithCorners, CardContent, CardHeader } from "@/components/ui/card-with-corners";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  time: string;
  venue: string;
  address: string;
  mapLink: string;
  description: string;
  side: "male" | "female";
}

interface ConfigData {
  events: Event[];
}

export default function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/config');
      const data = await response.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to fetch config:', error);
      setMessage({ type: "error", text: "Gagal memuat data konfigurasi." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index: number, field: keyof Event, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Data acara berhasil disimpan!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        setMessage({ type: "error", text: "Gagal menyimpan data." });
      }
    } catch (error) {
      console.error('Failed to save config:', error);
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pengaturan Acara</h2>
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan Perubahan
        </Button>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg text-sm ${
            message.type === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="grid gap-6">
        {events.map((event, index) => (
          <CardWithCorners key={index}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                  event.side === 'male'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                }`}>
                  {event.side === 'male' ? 'Pihak Pria' : 'Pihak Wanita'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul Acara</Label>
                  <Input 
                    value={event.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waktu</Label>
                  <Input 
                    value={event.time}
                    onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nama Tempat (Venue)</Label>
                  <Input 
                    value={event.venue}
                    onChange={(e) => handleInputChange(index, 'venue', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link Google Maps</Label>
                  <Input 
                    value={event.mapLink}
                    onChange={(e) => handleInputChange(index, 'mapLink', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Alamat Lengkap</Label>
                <Textarea 
                  value={event.address}
                  onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Tambahan</Label>
                <Textarea 
                  value={event.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </CardWithCorners>
        ))}
      </div>
    </div>
  );
}