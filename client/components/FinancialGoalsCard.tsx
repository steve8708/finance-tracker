import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface FinancialGoal {
  title: string;
  current: number;
  target: number;
  progress: number;
}

interface FinancialGoalsCardProps {
  goals: FinancialGoal[];
}

const FinancialGoalsCard: React.FC<FinancialGoalsCardProps> = ({ goals }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Financial Goals
        </CardTitle>
        <CardDescription>
          Track your progress towards financial milestones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{goal.title}</span>
              <span className="text-slate-500">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
            {goal.title.includes("Credit Score") && (
              <p className="text-xs text-slate-500">
                Current: {goal.current} → Target: {goal.target}
              </p>
            )}
            {goal.title.includes("Emergency Fund") && (
              <p className="text-xs text-slate-500">
                ${goal.current} of ${goal.target.toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FinancialGoalsCard;
