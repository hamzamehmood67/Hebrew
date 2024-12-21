import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Terms</h2>
              <p>
                By accessing HebrewLearn, you agree to be bound by these terms of service and comply
                with all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials on HebrewLearn for personal,
                non-commercial use only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
              <p>
                The materials on HebrewLearn are provided on an 'as is' basis. HebrewLearn makes no
                warranties, expressed or implied, and hereby disclaims all warranties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
              <p>
                HebrewLearn shall not be held liable for any damages arising out of the use or inability
                to use the materials on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Revisions</h2>
              <p>
                HebrewLearn may revise these terms of service at any time without notice. By using this
                platform, you agree to be bound by the current version.
              </p>
            </section>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Last updated: March 2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}