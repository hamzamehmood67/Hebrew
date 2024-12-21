import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/card';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Info Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Member Since</label>
              <p className="text-lg">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Level</label>
              <p className="text-lg">{user.level || 1}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Experience Points (XP)</label>
              <p className="text-lg">{user.xp || 0}</p>
            </div>
            <div className="relative pt-1">
              <label className="text-sm text-gray-500">Level Progress</label>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(user.xp || 0) % 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
