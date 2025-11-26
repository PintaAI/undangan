"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardWithCorners, CardContent, CardHeader } from "@/components/ui/card-with-corners";
import { Copy, Edit, Trash2, Plus, Check, X } from "lucide-react";

interface Guest {
  id: string;
  name: string;
  side?: 'male' | 'female';
  createdAt: string;
  updatedAt: string;
  blobUrl?: string;
  uploadedAt?: string;
}

export default function GuestManager() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAddingGuest, setIsAddingGuest] = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", side: 'female' as 'male' | 'female' });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guests');
      const data = await response.json();
      
      if (response.ok) {
        setGuests(data.guests || []);
      } else {
        setError(data.error || 'Failed to fetch guests');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Nama tamu wajib diisi");
      return;
    }

    try {
      const url = editingGuestId 
        ? `/api/guests/${editingGuestId}`
        : '/api/guests';
      
      const method = editingGuestId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          side: formData.side
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingGuestId ? 'Tamu berhasil diperbarui!' : 'Tamu berhasil ditambahkan!');
        setFormData({ name: "", side: 'female' });
        setIsAddingGuest(false);
        setEditingGuestId(null);
        fetchGuests();
      } else {
        setError(data.error || 'Gagal menyimpan data tamu');
      }
    } catch  {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    }
  };

  const handleDelete = async (guestId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tamu ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/guests/${guestId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Tamu berhasil dihapus!');
        fetchGuests();
      } else {
        setError(data.error || 'Gagal menghapus tamu');
      }
    } catch  {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    }
  };

  const handleEdit = (guest: Guest) => {
    setFormData({
      name: guest.name,
      side: guest.side || 'female'
    });
    setEditingGuestId(guest.id);
    setIsAddingGuest(true);
  };

  const handleCancel = () => {
    setFormData({ name: "", side: 'female' });
    setIsAddingGuest(false);
    setEditingGuestId(null);
  };

  const copyInvitationUrl = (guest: Guest) => {
    const baseUrl = window.location.origin;
    const sideParam = guest.side ? `&side=${encodeURIComponent(guest.side)}` : '';
    const url = `${baseUrl}/?id=${encodeURIComponent(guest.id)}&name=${encodeURIComponent(guest.name)}${sideParam}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setSuccess('URL undangan berhasil disalin!');
      setTimeout(() => setSuccess(""), 3000);
    }).catch(() => {
      setError('Gagal menyalin URL');
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Tamu</h2>
        <Button
          onClick={() => setIsAddingGuest(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Tamu
        </Button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm"
        >
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Add/Edit Guest Form */}
      {isAddingGuest && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardWithCorners>
            <CardHeader>
              <h3 className="text-lg font-semibold">
                {editingGuestId ? 'Edit Tamu' : 'Tambah Tamu Baru'}
              </h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {editingGuestId && (
                  <div className="space-y-2">
                    <Label htmlFor="guestId">ID Tamu</Label>
                    <Input
                      id="guestId"
                      value={editingGuestId}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="guestName">Nama Tamu</Label>
                  <Input
                    id="guestName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama lengkap tamu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pihak Keluarga</Label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="side"
                        value="female"
                        checked={formData.side === 'female'}
                        onChange={() => setFormData({ ...formData, side: 'female' })}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Pihak Wanita (Nina)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="side"
                        value="male"
                        checked={formData.side === 'male'}
                        onChange={() => setFormData({ ...formData, side: 'male' })}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Pihak Pria (Rores)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {editingGuestId ? 'Perbarui' : 'Tambah'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </CardWithCorners>
        </motion.div>
      )}

      {/* Guests Table */}
      <CardWithCorners>
        <CardContent className="p-0">
          {guests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada tamu yang ditambahkan. Klik &quot;Tambah Tamu&quot; untuk memulai.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">ID Tamu</th>
                    <th className="text-left p-4 font-medium">Nama</th>
                    <th className="text-left p-4 font-medium">Pihak</th>
                    <th className="text-left p-4 font-medium">Dibuat</th>
                    <th className="text-left p-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest, index) => (
                    <motion.tr
                      key={guest.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4 font-mono text-sm">{guest.id}</td>
                      <td className="p-4 font-medium">{guest.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          guest.side === 'male'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                        }`}>
                          {guest.side === 'male' ? 'Pihak Pria' : 'Pihak Wanita'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(guest.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyInvitationUrl(guest)}
                            className="flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Salin URL
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(guest)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(guest.id)}
                            className="flex items-center gap-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </CardWithCorners>
    </div>
  );
}