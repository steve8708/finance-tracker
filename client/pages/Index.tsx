import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  PiggyBank,
  Receipt,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Index = () => {
  // Amina's actual financial data
  const financialData = {
    totalIncome: 95000,
    monthlyIncome: 7917,
    creditScore: 625, // Middle of 610-640 range
    creditScoreGoal: 800,
    totalDebt: 23300, // 5300 CC + 18000 student loans
    creditCardDebt: 5300,
    studentLoans: 18000,
    checkingBalance: 125,
    savingsBalance: 300,
    monthlyExpenses: 3700, // Approximate from fixed costs
    creditCards: [
      { name: 'Chase Freedom Flex', balance: 2226, limit: 3000, apr: 24.99, payment: 85 },
      { name: 'Discover it Cash Back', balance: 1475, limit: 2000, apr: 27.49, payment: 60 },
      { name: 'Capital One Quicksilver', balance: 1622, limit: 2500, apr: 19.99, payment: 70 }
    ],
    upcomingIncome: [
      { source: 'Coffee Shop Branding', amount: 3200, date: 'Sep 2025' },
      { source: 'Arts Org Event Staff', amount: 1500, date: 'Sep 2025' }
    ],
    goals: [
      { title: 'Reach 800 Credit Score', current: 625, target: 800, progress: 31 },
      { title: 'Pay Off Credit Cards', current: 5300, target: 0, progress: 0 },
      { title: 'Emergency Fund', current: 300, target: 5000, progress: 6 }
    ]
  };

  const creditScoreProgress = ((financialData.creditScore - 300) / (850 - 300)) * 100;
  const creditUtilization = (financialData.creditCardDebt / 7500) * 100; // Total credit limit

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome back, Amina 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Your journey to homeownership starts here
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                71% Credit Utilization - URGENT
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                🏠 Mortgage Ready: 42%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Row */}
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
                -${(financialData.totalDebt - financialData.checkingBalance - financialData.savingsBalance).toLocaleString()}
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
              <div className="text-2xl font-bold">
                {financialData.creditScore}
              </div>
              <div className="mt-2">
                <Progress value={creditScoreProgress} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">
                  Goal: {financialData.creditScoreGoal} (+{financialData.creditScoreGoal - financialData.creditScore})
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
                ${(financialData.checkingBalance + financialData.savingsBalance).toLocaleString()}
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
                +${(financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                <ArrowUpRight className="w-3 h-3 inline mr-1" />
                ${financialData.monthlyIncome.toLocaleString()} in - ${financialData.monthlyExpenses.toLocaleString()} out
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Credit Cards & Debt */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Credit Cards */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Credit Cards
                    </CardTitle>
                    <CardDescription>
                      Total Balance: ${financialData.creditCardDebt.toLocaleString()} • Utilization: {Math.round(creditUtilization)}%
                    </CardDescription>
                  </div>
                  <Badge variant={creditUtilization > 30 ? "destructive" : "secondary"}>
                    {creditUtilization > 30 ? "High Utilization" : "Good Utilization"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialData.creditCards.map((card, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{card.name}</h4>
                        <p className="text-sm text-slate-500">APR: {card.apr}%</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${card.balance.toLocaleString()}</p>
                        <p className="text-sm text-slate-500">/ ${card.limit.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Progress value={(card.balance / card.limit) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Min Payment: ${card.payment}</span>
                        <span>{Math.round((card.balance / card.limit) * 100)}% utilized</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Income */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Income
                </CardTitle>
                <CardDescription>
                  Projected earnings for the next month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.upcomingIncome.map((income, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-financial-income/5 border border-financial-income/20 rounded-lg">
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
                      +${financialData.upcomingIncome.reduce((sum, income) => sum + income.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Goals & Actions */}
          <div className="space-y-6">
            
            {/* Financial Goals */}
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
                {financialData.goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-slate-500">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    {goal.title.includes('Credit Score') && (
                      <p className="text-xs text-slate-500">
                        Current: {goal.current} → Target: {goal.target}
                      </p>
                    )}
                    {goal.title.includes('Emergency Fund') && (
                      <p className="text-xs text-slate-500">
                        ${goal.current} of ${goal.target.toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-financial-warning/10 border border-financial-warning/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-financial-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Pay Down High APR Cards</p>
                      <p className="text-xs text-slate-500">Focus on Discover card (27.49% APR) first</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-financial-success/10 border border-financial-success/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-financial-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Build Emergency Fund</p>
                      <p className="text-xs text-slate-500">Save $4,700 more to reach $5K goal</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Student Loan Strategy</p>
                      <p className="text-xs text-slate-500">Extra $50/month saves $2,400 in interest</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline">
                  <Receipt className="w-4 h-4 mr-2" />
                  View Detailed Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Account Balances */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Account Balances
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chase Checking</span>
                  <span className="font-medium">${financialData.checkingBalance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chase Savings</span>
                  <span className="font-medium">${financialData.savingsBalance}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-medium">
                  <span>Total Liquid Assets</span>
                  <span>${financialData.checkingBalance + financialData.savingsBalance}</span>
                </div>
                
                <div className="mt-4 p-3 bg-financial-danger/10 border border-financial-danger/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-financial-danger" />
                    <span className="text-sm font-medium text-financial-danger">
                      Account Currently Overdrawn
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Checking account shows -$2,859.66 balance
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
