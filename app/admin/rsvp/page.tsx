"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardWithCorners, CardContent, CardHeader } from "@/components/ui/card-with-corners";
import { Users, CalendarCheck, CalendarX, MessageSquare, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RsvpData {
  id: string;
  fullName: string;
  attendance: string;
  message: string;
  submittedAt: string;
  uploadedAt: string;
  blobUrl: string;
}

export default function AdminRsvpPage() {
  const [rsvps, setRsvps] = useState<RsvpData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRsvps = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('/api/rsvp/list');
      const result = await response.json();
      
      if (response.ok) {
        setRsvps(result.rsvps);
      } else {
        setError(result.error || 'Failed to fetch RSVPs');
      }
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (rsvpId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus RSVP ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/rsvp/${rsvpId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('RSVP berhasil dihapus!');
        fetchRsvps();
      } else {
        setError(data.error || 'Gagal menghapus RSVP');
      }
    } catch (err) {
      console.error('Error deleting RSVP:', err);
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    }
  };

  useEffect(() => {
    fetchRsvps();
  }, []);

  const attendingCount = rsvps.filter(r => r.attendance === 'attending').length;
  const notAttendingCount = rsvps.filter(r => r.attendance === 'not-attending').length;

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            RSVP Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and view all wedding guest responses
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CardWithCorners className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{rsvps.length}</div>
                <div className="text-sm text-muted-foreground">Total Responses</div>
              </CardContent>
            </CardWithCorners>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardWithCorners className="text-center">
              <CardContent className="p-6">
                <CalendarCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{attendingCount}</div>
                <div className="text-sm text-muted-foreground">Attending</div>
              </CardContent>
            </CardWithCorners>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CardWithCorners className="text-center">
              <CardContent className="p-6">
                <CalendarX className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{notAttendingCount}</div>
                <div className="text-sm text-muted-foreground">Not Attending</div>
              </CardContent>
            </CardWithCorners>
          </motion.div>
        </div>

        {/* Refresh Button */}
        <div className="mb-6 flex justify-end">
          <Button
            onClick={fetchRsvps}
            disabled={loading}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && rsvps.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading RSVPs...</p>
          </div>
        )}

        {/* RSVPs List */}
        {!loading && rsvps.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No RSVPs yet</p>
          </div>
        )}

        <div className="space-y-4">
          {rsvps.map((rsvp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <CardWithCorners>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {rsvp.fullName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rsvp.attendance === 'attending'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {rsvp.attendance === 'attending' ? 'Hadir' : 'Tidak Hadir'}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(rsvp.id)}
                        className="flex items-center gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {new Date(rsvp.submittedAt).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </CardHeader>
                {rsvp.message && (
                  <CardContent className="pt-0">
                    <div className="flex gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground italic">&quot; {rsvp.message} &quot;</p>
                    </div>
                  </CardContent>
                )}
              </CardWithCorners>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}