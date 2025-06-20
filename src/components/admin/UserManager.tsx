
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, Shield, User } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  role: string;
}

const UserManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // First get all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Then get all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine the data
      const formattedUsers = profilesData?.map(profile => {
        const userRole = rolesData?.find(role => role.user_id === profile.id);
        return {
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          created_at: profile.created_at,
          role: userRole?.role || 'user'
        };
      }) || [];

      setUsers(formattedUsers);
    } catch (error) {
      toast.error('Fehler beim Laden der Benutzer');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success(`Benutzerrolle zu ${newRole} geändert`);
      fetchUsers();
    } catch (error) {
      toast.error('Fehler beim Ändern der Benutzerrolle');
      console.error('Error updating user role:', error);
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />;
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' ? 'bg-amber-600' : 'bg-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Lade Benutzer...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-300" />
          <h2 className="text-2xl font-bold text-white">Benutzer Verwaltung</h2>
        </div>
        <div className="text-gray-400">
          {users.length} Benutzer registriert
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    {user.full_name || 'Unbekannter Name'}
                    {getRoleIcon(user.role)}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Registriert: {new Date(user.created_at).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                    {user.role === 'admin' ? 'Administrator' : 'Benutzer'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  ID: {user.id.substring(0, 8)}...
                </div>
                <Button
                  size="sm"
                  onClick={() => toggleUserRole(user.id, user.role)}
                  className={`${
                    user.role === 'admin' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {user.role === 'admin' ? 'Admin entfernen' : 'Zu Admin machen'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Keine Benutzer gefunden</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManager;
