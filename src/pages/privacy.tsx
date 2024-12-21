import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including name, email address,
                and learning preferences. We also automatically collect certain information about your
                device and how you interact with our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to
                communicate with you, and to personalize your learning experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p>
                We do not share your personal information with third parties except as described in
                this privacy policy or with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. You may
                also object to or restrict certain processing of your information.
              </p>
            </section>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Last updated: March 2024</p>
            <p>Contact us at privacy@hebrewlearn.com for any privacy-related questions.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}