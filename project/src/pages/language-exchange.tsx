import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, MessageCircle, Video, Star, Calendar, Clock, Users } from 'lucide-react';
import { useState } from 'react';

const partners = [
  {
    id: '1',
    name: 'Yael Cohen',
    level: 'Native Speaker',
    languages: ['Hebrew', 'English'],
    rating: 4.9,
    availability: 'Online now',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'David Levi',
    level: 'Native Speaker',
    languages: ['Hebrew', 'Spanish'],
    rating: 4.8,
    availability: 'Available in 30m',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const topics = [
  'Daily Routines',
  'Hobbies & Interests',
  'Travel & Culture',
  'Food & Dining',
  'Work & Study',
  'Family & Friends'
];

export default function LanguageExchangePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const handleStartSession = () => {
    if (selectedPartner && selectedTopic) {
      // Here you would typically initiate the video/chat session
      console.log('Starting session with:', { selectedPartner, selectedTopic });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Language Exchange</h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect with native Hebrew speakers and practice through conversation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedPartner === partner.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                  onClick={() => setSelectedPartner(partner.id)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{partner.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {partner.rating}
                      </div>
                      <div className="text-sm text-gray-600">
                        {partner.availability}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Choose a Topic</h3>
              <div className="grid grid-cols-1 gap-4">
                {topics.map((topic) => (
                  <motion.button
                    key={topic}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      selectedTopic === topic
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Session Info</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>30 minutes per session</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>One-on-one practice</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Flexible scheduling</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleStartSession}
            disabled={!selectedPartner || !selectedTopic}
            className="flex items-center"
          >
            <Video className="h-4 w-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>
    </div>
  );
}