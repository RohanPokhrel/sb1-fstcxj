import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Cloud, Plus, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DreamForm from '@/components/DreamForm';
import DreamEntry from '@/components/DreamEntry';
import type { Dream } from '@/types/dream';

const sampleDream: Dream = {
  id: '1',
  date: new Date(),
  title: 'Flying Over Mountains',
  description: 'I found myself soaring over snow-capped peaks, feeling completely free and weightless.',
  mood: 'peaceful',
  tags: ['flying', 'nature', 'freedom'],
  symbols: ['mountains', 'sky'],
  isPublic: false,
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dreams, setDreams] = useState<Dream[]>([sampleDream]);
  const [isNewDreamModalOpen, setIsNewDreamModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleSaveDream = (updatedDream: Dream) => {
    setDreams(dreams.map(dream => 
      dream.id === updatedDream.id ? updatedDream : dream
    ));
  };

  const handleCreateDream = (dreamData: Omit<Dream, 'id'>) => {
    const newDream: Dream = {
      ...dreamData,
      id: crypto.randomUUID(),
    };
    setDreams(prev => [newDream, ...prev]);
    setIsNewDreamModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">DreamMap</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.displayName}</span>
              <Button onClick={() => setIsNewDreamModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Dream
              </Button>
              <Button variant="secondary" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="col-span-2 space-y-6">
            {dreams.map(dream => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DreamEntry
                  dream={dream}
                  onSave={handleSaveDream}
                />
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dream Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Most Common Themes</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                      flying (3)
                    </span>
                    <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                      nature (2)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dream Mood</p>
                  <div className="h-4 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Modal
        isOpen={isNewDreamModalOpen}
        onClose={() => setIsNewDreamModalOpen(false)}
        title="Record New Dream"
      >
        <DreamForm
          onSubmit={handleCreateDream}
          onCancel={() => setIsNewDreamModalOpen(false)}
        />
      </Modal>
    </div>
  );
}