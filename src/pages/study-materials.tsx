import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Book, FileText, Video, Download } from 'lucide-react';

const materials = [
  {
    title: 'Hebrew Alphabet Guide',
    type: 'PDF',
    description: 'Comprehensive guide to learning the Hebrew alphabet with practice exercises',
    level: 'Beginner',
    icon: FileText,
    downloadUrl: '#'
  },
  {
    title: 'Common Phrases Workbook',
    type: 'PDF',
    description: 'Essential Hebrew phrases for everyday conversations',
    level: 'Beginner',
    icon: Book,
    downloadUrl: '#'
  },
  {
    title: 'Pronunciation Videos',
    type: 'Video Series',
    description: 'Native speaker demonstrations of Hebrew sounds and words',
    level: 'All Levels',
    icon: Video,
    downloadUrl: '#'
  }
];

export default function StudyMaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Study Materials</h1>
          <p className="mt-4 text-xl text-gray-600">
            Download resources to support your Hebrew learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, index) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-brand-100 rounded-lg">
                  <material.icon className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
                  <p className="text-sm text-gray-500">{material.type}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{material.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-600">{material.level}</span>
                <Button className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}