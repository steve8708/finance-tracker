import React from "react";
import { Loader2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Generating your application
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Please wait while we set up your personalized financial dashboard...
          </p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default Index;
