import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, AlertTriangle, PiggyBank } from "lucide-react";

interface MortgageReadinessCardProps {
  mortgageReadiness: number;
}

const MortgageReadinessCard: React.FC<MortgageReadinessCardProps> = ({
  mortgageReadiness,
}) => {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-600" />
          Mortgage Readiness - 2027 Goal
        </CardTitle>
        <CardDescription>
          Critical actions needed for home buying
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Overall Readiness</span>
          <span className="text-2xl font-bold text-blue-600">
            {mortgageReadiness}%
          </span>
        </div>
        <Progress value={mortgageReadiness} className="h-3" />

        <div className="space-y-3">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700">
                  URGENT: Credit Utilization
                </p>
                <p className="text-xs text-slate-600">
                  71% → Need under 30% (+100 credit points)
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <PiggyBank className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-700">
                  Down Payment Gap
                </p>
                <p className="text-xs text-slate-600">
                  Need $79,700 more for 20% down
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Home className="w-4 h-4 mr-2" />
          View Mortgage Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default MortgageReadinessCard;
