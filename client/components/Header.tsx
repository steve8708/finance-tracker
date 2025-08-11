import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface HeaderProps {
  userName: string;
  creditUtilization: number;
  mortgageReadiness: number;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  creditUtilization,
  mortgageReadiness,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back, {userName} 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Your journey to homeownership starts here
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="destructive">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {Math.round(creditUtilization)}% Credit Utilization - URGENT
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              🏠 Mortgage Ready: {mortgageReadiness}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
