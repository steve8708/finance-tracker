import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  PieChart,
  DollarSign,
  Receipt,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Home,
  Car,
  Coffee,
  ShoppingBag
} from 'lucide-react';

const IncomeExpenses = () => {
  const [selectedMonth, setSelectedMonth] = useState('august');

  // Amina's actual financial data
  const monthlyData = {
    august: {
      totalIncome: 0, // No income recorded in August
      projectedIncome: 4700, // September projection
      fixedExpenses: 3675,
      variableExpenses: 832,
      totalExpenses: 4507,
      cashFlow: -4507,
      incomeBreakdown: [
        { category: 'Freelance Projects', amount: 0, percentage: 0 },
        { category: 'Contract Work', amount: 0, percentage: 0 }
      ],
      expenseBreakdown: [
        { category: 'Housing', amount: 2673, percentage: 59, icon: Home },
        { category: 'Transportation', amount: 410, percentage: 9, icon: Car },
        { category: 'Subscriptions', amount: 187, percentage: 4, icon: Receipt },
        { category: 'Debt Payments', amount: 355, percentage: 8, icon: Target },
        { category: 'Food & Dining', amount: 234, percentage: 5, icon: Coffee },
        { category: 'Shopping', amount: 223, percentage: 5, icon: ShoppingBag },
        { category: 'Personal Care', amount: 156, percentage: 3, icon: Receipt },
        { category: 'Other', amount: 269, percentage: 6, icon: Receipt }
      ],
      upcomingIncome: [
        { source: 'Coffee Shop Branding', amount: 3200, date: 'Sep 15', type: 'Freelance' },
        { source: 'Arts Org Event Staff', amount: 1500, date: 'Sep 30', type: 'Contract' }
      ],
      recentTransactions: [
        { date: '08/26', description: 'Spotify', category: 'Subscriptions', amount: -10.99, type: 'expense' },
        { date: '08/25', description: 'Trader Joe\'s', category: 'Food & Dining', amount: -58.10, type: 'expense' },
        { date: '08/24', description: 'Ross - Clothing', category: 'Shopping', amount: -34.77, type: 'expense' },
        { date: '08/23', description: 'Starbucks', category: 'Food & Dining', amount: -6.95, type: 'expense' },
        { date: '08/22', description: 'Etsy - Logo Asset', category: 'Business', amount: -18.00, type: 'expense' },
        { date: '08/20', description: 'Parking - Downtown', category: 'Transportation', amount: -3.50, type: 'expense' },
        { date: '08/19', description: 'Google Workspace', category: 'Subscriptions', amount: -6.00, type: 'expense' },
        { date: '08/18', description: 'Ross - Wardrobe', category: 'Shopping', amount: -34.77, type: 'expense' }
      ]
    }
  };

  const data = monthlyData[selectedMonth];
  const savingsRate = data.totalIncome > 0 ? ((data.totalIncome - data.totalExpenses) / data.totalIncome) * 100 : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Income & Expenses
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your cash flow and spending patterns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800"
          >
            <option value="august">August 2025</option>
          </select>
        </div>
      </div>

      {/* Cash Flow Alert */}
      <div className="p-4 bg-financial-danger/10 border border-financial-danger/20 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-financial-danger" />
          <div>
            <h3 className="font-medium text-financial-danger">No Income This Month</h3>
            <p className="text-sm text-slate-600">
              August shows $0 income with ${data.totalExpenses.toLocaleString()} in expenses. 
              September income projections: ${data.projectedIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-financial-income">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-income">
              ${data.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <ArrowDownRight className="w-3 h-3 inline mr-1" />
              No income recorded this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-financial-expense">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-expense">
              ${data.totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fixed: ${data.fixedExpenses} | Variable: ${data.variableExpenses}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-financial-danger">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-danger">
              -${Math.abs(data.cashFlow).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <ArrowDownRight className="w-3 h-3 inline mr-1" />
              Expenses exceeded income
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-financial-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Projected Sep Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-income">
              ${data.projectedIncome.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <ArrowUpRight className="w-3 h-3 inline mr-1" />
              Expected freelance earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Expense Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Expense Breakdown
              </CardTitle>
              <CardDescription>
                How you spent money this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.expenseBreakdown.map((expense, index) => {
                  const Icon = expense.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </div>
                          <span className="font-medium">{expense.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">${expense.amount.toLocaleString()}</span>
                          <span className="text-sm text-slate-500 ml-2">{expense.percentage}%</span>
                        </div>
                      </div>
                      <Progress value={expense.percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>
                    Last 8 transactions from August
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-xs text-slate-500">{transaction.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${
                            transaction.type === 'income' 
                              ? 'text-financial-income' 
                              : 'text-financial-expense'
                          }`}>
                            {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Upcoming Income */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Income
              </CardTitle>
              <CardDescription>
                Expected payments for September
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.upcomingIncome.map((income, index) => (
                  <div key={index} className="p-3 bg-financial-income/5 border border-financial-income/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{income.source}</p>
                        <p className="text-xs text-slate-500">{income.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {income.type}
                      </Badge>
                    </div>
                    <div className="text-financial-income font-bold text-lg">
                      +${income.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-bold">
                  <span>Total Expected</span>
                  <span className="text-financial-income">
                    +${data.upcomingIncome.reduce((sum, income) => sum + income.amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spending Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Spending Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-financial-warning/10 border border-financial-warning/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-financial-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">High Housing Costs</p>
                    <p className="text-xs text-slate-500">
                      Housing is 59% of expenses (${data.expenseBreakdown[0].amount})
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-financial-success/10 border border-financial-success/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-financial-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Low Subscription Costs</p>
                    <p className="text-xs text-slate-500">
                      Only 4% spent on subscriptions (${data.expenseBreakdown[2].amount})
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1">
                  Monthly Budget Target
                </h4>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Aim to keep expenses under ${Math.round(data.projectedIncome * 0.8).toLocaleString()} to save 20%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                September Projection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Expected Income</span>
                <span className="font-bold text-financial-income">+${data.projectedIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Estimated Expenses</span>
                <span className="font-bold text-financial-expense">-${data.fixedExpenses.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Projected Cash Flow</span>
                <span className="text-financial-income">
                  +${(data.projectedIncome - data.fixedExpenses).toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-slate-500 text-center">
                Assuming minimal variable expenses
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
