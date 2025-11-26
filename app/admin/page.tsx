"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardWithCorners, CardContent, CardHeader } from "@/components/ui/card-with-corners";
import GuestManager from "@/components/admin/GuestManager";
import EventManager from "@/components/admin/EventManager";
import { Users, MessageSquare, Calendar, TrendingUp } from "lucide-react";

interface Rsvp {
  fullName: string;
  attendance: string;
  message: string;
  submittedAt: string;
  guestId?: string;
  guestNameFromUrl?: string;
  blobUrl?: string;
  uploadedAt?: string;
}

interface DashboardStats {
  totalGuests: number;
  totalRsvps: number;
  attendingCount: number;
  notAttendingCount: number;
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalGuests: 0,
    totalRsvps: 0,
    attendingCount: 0,
    notAttendingCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch RSVPs
      const rsvpResponse = await fetch('/api/rsvp/list');
      const rsvpData = await rsvpResponse.json();
      
      // Fetch Guests
      const guestResponse = await fetch('/api/guests');
      const guestData = await guestResponse.json();

      if (rsvpResponse.ok && guestResponse.ok) {
        const rsvpList = rsvpData.rsvps || [];
        const guestList = guestData.guests || [];
        
        setRsvps(rsvpList);
        
        const attendingCount = rsvpList.filter((r: Rsvp) => r.attendance === 'attending').length;
        const notAttendingCount = rsvpList.filter((r: Rsvp) => r.attendance === 'not-attending').length;
        
        setStats({
          totalGuests: guestList.length,
          totalRsvps: rsvpList.length,
          attendingCount,
          notAttendingCount,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground">Kelola tamu dan lacak RSVP</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="guests">Tamu</TabsTrigger>
          <TabsTrigger value="events">Acara</TabsTrigger>
          <TabsTrigger value="rsvps">RSVP</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <CardWithCorners>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Tamu</p>
                    <p className="text-2xl font-bold">{stats.totalGuests}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </CardWithCorners>

            <CardWithCorners>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total RSVP</p>
                    <p className="text-2xl font-bold">{stats.totalRsvps}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </CardWithCorners>

            <CardWithCorners>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hadir</p>
                    <p className="text-2xl font-bold text-green-600">{stats.attendingCount}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </CardWithCorners>

            <CardWithCorners>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tidak Hadir</p>
                    <p className="text-2xl font-bold text-red-600">{stats.notAttendingCount}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </CardWithCorners>
          </motion.div>

          {/* Recent RSVPs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardWithCorners>
              <CardHeader>
                <h3 className="text-lg font-semibold">RSVP Terbaru</h3>
              </CardHeader>
              <CardContent>
                {rsvps.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Belum ada RSVP</p>
                ) : (
                  <div className="space-y-4">
                    {rsvps.slice(0, 5).map((rsvp, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">{rsvp.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {rsvp.guestId && `ID Tamu: ${rsvp.guestId}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            rsvp.attendance === 'attending' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {rsvp.attendance === 'attending' ? 'Hadir' : 'Tidak Hadir'}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(rsvp.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </CardWithCorners>
          </motion.div>
        </TabsContent>

        {/* Guests Tab */}
        <TabsContent value="guests">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GuestManager />
          </motion.div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EventManager />
          </motion.div>
        </TabsContent>

        {/* RSVPs Tab */}
        <TabsContent value="rsvps" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CardWithCorners>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Semua RSVP</h3>
                  <button
                    onClick={refreshData}
                    className="text-sm text-primary hover:underline"
                  >
                    Segarkan
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {rsvps.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Belum ada RSVP yang diterima.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium">Nama</th>
                          <th className="text-left p-4 font-medium">ID Tamu</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Pesan</th>
                          <th className="text-left p-4 font-medium">Dikirim</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rsvps.map((rsvp, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b hover:bg-muted/20 transition-colors"
                          >
                            <td className="p-4 font-medium">{rsvp.fullName}</td>
                            <td className="p-4 font-mono text-sm">{rsvp.guestId || 'N/A'}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                rsvp.attendance === 'attending' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {rsvp.attendance === 'attending' ? 'Hadir' : 'Tidak Hadir'}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs">
                              <p className="text-sm truncate">{rsvp.message || 'Tidak ada pesan'}</p>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(rsvp.submittedAt).toLocaleDateString()}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </CardWithCorners>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}