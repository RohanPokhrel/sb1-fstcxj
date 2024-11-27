import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useParticles } from '@/hooks/useParticles';
import Button from '../ui/Button';
import { CloudMoon } from 'lucide-react';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { ParticlesComponent } = useParticles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 overflow-hidden">
      <ParticlesComponent />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md mx-4"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <CloudMoon className="w-16 h-16 text-purple-300" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            Join DreamMap
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-purple-100 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Choose a password"
                minLength={6}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-center text-purple-100"
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-300 hover:text-white transition-colors duration-200"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}