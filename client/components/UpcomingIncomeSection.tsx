import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

interface UpcomingIncomeData {
  source: string;
  amount: number;
  date: string;
}

interface UpcomingIncomeSectionProps {
  upcomingIncome: UpcomingIncomeData[];
}

const UpcomingIncomeSection: React.FC<UpcomingIncomeSectionProps> = ({
  upcomingIncome,
}) => {
  const totalExpected = upcomingIncome.reduce(
    (sum, income) => sum + income.amount,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Upcoming Income
        </CardTitle>
        <CardDescription>Projected earnings for the next month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingIncome.map((income, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-financial-income/5 border border-financial-income/20 rounded-lg"
            >
              <div>
                <p className="font-medium">{income.source}</p>
                <p className="text-sm text-slate-500">{income.date}</p>
              </div>
              <div className="text-financial-income font-bold">
                +${income.amount.toLocaleString()}
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center font-bold">
            <span>Total Expected</span>
            <span className="text-financial-income">
              +${totalExpected.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingIncomeSection;
