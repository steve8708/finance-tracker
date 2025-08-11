import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

interface FinancialData {
  totalDebt: number;
  checkingBalance: number;
  savingsBalance: number;
  creditScore: number;
  creditScoreGoal: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

interface MetricsGridProps {
  financialData: FinancialData;
  creditScoreProgress: number;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({
  financialData,
  creditScoreProgress,
}) => {
  const netWorth =
    financialData.totalDebt -
    financialData.checkingBalance -
    financialData.savingsBalance;

  const availableCash =
    financialData.checkingBalance + financialData.savingsBalance;

  const monthlyCashFlow =
    financialData.monthlyIncome - financialData.monthlyExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Net Worth */}
      <Card className="border-l-4 border-l-financial-danger">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-financial-danger">
            -${netWorth.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <ArrowDownRight className="w-3 h-3 inline mr-1" />
            Total debt exceeds assets
          </p>
        </CardContent>
      </Card>

      {/* Credit Score */}
      <Card className="border-l-4 border-l-financial-warning">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Credit Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{financialData.creditScore}</div>
          <div className="mt-2">
            <Progress value={creditScoreProgress} className="h-2" />
            <p className="text-xs text-slate-500 mt-1">
              Goal: {financialData.creditScoreGoal} (+
              {financialData.creditScoreGoal - financialData.creditScore})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Available Cash */}
      <Card className="border-l-4 border-l-financial-danger">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Available Cash
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${availableCash.toLocaleString()}
          </div>
          <p className="text-xs text-financial-danger mt-1">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            Critical: Below emergency fund target
          </p>
        </CardContent>
      </Card>

      {/* Monthly Cash Flow */}
      <Card className="border-l-4 border-l-financial-income">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Monthly Cash Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-financial-income">
            +${monthlyCashFlow.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <ArrowUpRight className="w-3 h-3 inline mr-1" />$
            {financialData.monthlyIncome.toLocaleString()} in - $
            {financialData.monthlyExpenses.toLocaleString()} out
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsGrid;
