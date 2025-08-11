import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  AlertTriangle,
  PiggyBank,
  Calendar,
  TrendingUp,
  Home,
} from "lucide-react";

const PriorityActionsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Priority Actions for 2027 Goal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-700">
                Pay $3,075 to Credit Cards
              </p>
              <p className="text-xs text-slate-500">
                Brings utilization to 30% (+80 credit points)
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <PiggyBank className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-700">
                Emergency Fund First
              </p>
              <p className="text-xs text-slate-500">
                $5K minimum before house shopping
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-700">
                Perfect Payment History
              </p>
              <p className="text-xs text-slate-500">
                Zero late payments for next 24 months
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-700">
                Income Documentation
              </p>
              <p className="text-xs text-slate-500">
                Maintain 2 years of freelance records
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4">
          <Home className="w-4 h-4 mr-2" />
          View Full Mortgage Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriorityActionsCard;
