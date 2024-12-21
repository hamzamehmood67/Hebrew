import { Button } from '../ui/button';
import { Play, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-brand-600/10 ring-1 ring-brand-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pt-14 lg:pt-20 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left lg:max-w-2xl">
                <div className="inline-flex items-center rounded-full px-4 py-1 mb-6 text-sm font-medium bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-700/10">
                  <Sparkles className="mr-2 h-4 w-4" />
                  New: Interactive Speaking Practice
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Master Hebrew</span>
                  <span className="block mt-2 bg-gradient-to-r from-brand-600 to-blue-500 bg-clip-text text-transparent">
                    The Modern Way
                  </span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 sm:text-xl max-w-3xl">
                  Join thousands of learners mastering Hebrew through interactive lessons, 
                  real-world conversations, and a supportive community. Start your journey today!
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="group relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-600 to-blue-500 animate-gradient"></span>
                    <span className="relative flex items-center">
                      Start Learning Free
                      <Sparkles className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                  <Button size="lg" variant="outline" className="group">
                    <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
                    Watch Demo
                  </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  Join 50,000+ learners worldwide • No credit card required
                </p>
              </div>
              
              <div className="mt-12 lg:mt-0 lg:ml-10">
                <div className="relative animate-float">
                  <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl blur-lg opacity-50" />
                  <img
                    className="relative rounded-xl shadow-2xl"
                    src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Person writing in Hebrew"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}