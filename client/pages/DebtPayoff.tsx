import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Target,
  TrendingDown,
  Calculator,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Trophy,
  ArrowRight,
  CreditCard,
  GraduationCap,
  Zap,
  Mountain
} from 'lucide-react';

const DebtPayoff = () => {
  const [strategy, setStrategy] = useState('avalanche');
  const [extraPayment, setExtraPayment] = useState(100);

  // Amina's actual debt data
  const debts = [
    {
      name: 'Discover it Cash Back',
      type: 'Credit Card',
      balance: 1475,
      minPayment: 60,
      apr: 27.49,
      icon: CreditCard
    },
    {
      name: 'Chase Freedom Flex',
      type: 'Credit Card',
      balance: 2226,
      minPayment: 85,
      apr: 24.99,
      icon: CreditCard
    },
    {
      name: 'Capital One Quicksilver',
      type: 'Credit Card',
      balance: 1622,
      minPayment: 70,
      apr: 19.99,
      icon: CreditCard
    },
    {
      name: 'Federal Student Loans',
      type: 'Student Loan',
      balance: 18000,
      minPayment: 140,
      apr: 5.75,
      icon: GraduationCap
    }
  ];

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const weightedAPR = debts.reduce((sum, debt) => sum + (debt.apr * debt.balance), 0) / totalDebt;

  // Calculate payoff strategies
  const calculateAvalanche = () => {
    const sortedDebts = [...debts].sort((a, b) => b.apr - a.apr);
    let totalMonths = 0;
    let totalInterest = 0;
    const payoffOrder = [];

    sortedDebts.forEach((debt, index) => {
      const monthlyPayment = index === 0 
        ? debt.minPayment + extraPayment 
        : debt.minPayment;
      
      const months = Math.ceil(debt.balance / monthlyPayment);
      const interest = (months * monthlyPayment) - debt.balance;
      
      totalMonths = Math.max(totalMonths, months);
      totalInterest += interest;
      
      payoffOrder.push({
        ...debt,
        months,
        interest,
        monthlyPayment,
        order: index + 1
      });
    });

    return { totalMonths, totalInterest, payoffOrder };
  };

  const calculateSnowball = () => {
    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    let totalMonths = 0;
    let totalInterest = 0;
    const payoffOrder = [];

    sortedDebts.forEach((debt, index) => {
      const monthlyPayment = index === 0 
        ? debt.minPayment + extraPayment 
        : debt.minPayment;
      
      const months = Math.ceil(debt.balance / monthlyPayment);
      const interest = (months * monthlyPayment) - debt.balance;
      
      totalMonths = Math.max(totalMonths, months);
      totalInterest += interest;
      
      payoffOrder.push({
        ...debt,
        months,
        interest,
        monthlyPayment,
        order: index + 1
      });
    });

    return { totalMonths, totalInterest, payoffOrder };
  };

  const avalanche = calculateAvalanche();
  const snowball = calculateSnowball();
  const currentStrategy = strategy === 'avalanche' ? avalanche : snowball;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Debt Payoff Planner
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Strategic debt elimination and goal tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            ${totalDebt.toLocaleString()} Total Debt
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-financial-danger">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Debt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-danger">
              ${totalDebt.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Across 4 accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-financial-expense">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Monthly Minimums
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalMinPayments}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Required payments
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-financial-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Weighted APR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weightedAPR.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Average interest rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-financial-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Payoff Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-success">
              {Math.round(currentStrategy.totalMonths / 12 * 10) / 10}y
            </div>
            <p className="text-xs text-slate-500 mt-1">
              With ${extraPayment} extra/month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Strategy Comparison */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Strategy Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Payoff Strategy
              </CardTitle>
              <CardDescription>
                Choose your debt elimination approach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={strategy} onValueChange={setStrategy}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="avalanche" className="flex items-center gap-2">
                    <Mountain className="w-4 h-4" />
                    Avalanche
                  </TabsTrigger>
                  <TabsTrigger value="snowball" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Snowball
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="avalanche" className="space-y-4 mt-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Debt Avalanche Method
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Pay minimums on all debts, then put extra money toward the debt with the highest interest rate. 
                      This saves the most money on interest over time.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-financial-success">
                        {Math.round(avalanche.totalMonths / 12 * 10) / 10} years
                      </p>
                      <p className="text-sm text-slate-500">Payoff time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-financial-expense">
                        ${Math.round(avalanche.totalInterest).toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-500">Total interest</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        ${totalMinPayments + extraPayment}
                      </p>
                      <p className="text-sm text-slate-500">Monthly payment</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="snowball" className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      Debt Snowball Method
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Pay minimums on all debts, then put extra money toward the smallest balance first. 
                      This provides psychological wins and momentum.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-financial-success">
                        {Math.round(snowball.totalMonths / 12 * 10) / 10} years
                      </p>
                      <p className="text-sm text-slate-500">Payoff time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-financial-expense">
                        ${Math.round(snowball.totalInterest).toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-500">Total interest</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        ${totalMinPayments + extraPayment}
                      </p>
                      <p className="text-sm text-slate-500">Monthly payment</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Payoff Order */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Recommended Payoff Order
              </CardTitle>
              <CardDescription>
                {strategy === 'avalanche' 
                  ? 'Ordered by highest interest rate first' 
                  : 'Ordered by smallest balance first'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStrategy.payoffOrder.map((debt, index) => {
                  const Icon = debt.icon;
                  const isFirst = index === 0;
                  
                  return (
                    <div key={index} className={`p-4 border rounded-lg ${
                      isFirst ? 'border-financial-success bg-financial-success/5' : 'border-slate-200 dark:border-slate-700'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            isFirst ? 'bg-financial-success' : 'bg-slate-400'
                          }`}>
                            {debt.order}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <div>
                              <h4 className="font-medium">{debt.name}</h4>
                              <p className="text-sm text-slate-500">{debt.type}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${debt.balance.toLocaleString()}</p>
                          <p className="text-sm text-slate-500">{debt.apr}% APR</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Monthly Payment</p>
                          <p className="font-medium">
                            ${debt.monthlyPayment}
                            {isFirst && extraPayment > 0 && (
                              <span className="text-financial-success ml-1">
                                (+${extraPayment})
                              </span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Payoff Time</p>
                          <p className="font-medium">{debt.months} months</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Total Interest</p>
                          <p className="font-medium">${Math.round(debt.interest).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {isFirst && (
                        <div className="mt-3 p-2 bg-financial-success/10 border border-financial-success/20 rounded text-sm">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-financial-success" />
                            <span className="text-financial-success font-medium">Focus here first</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Payment Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Payment Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="extra-payment">Extra Monthly Payment</Label>
                <Input
                  id="extra-payment"
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Minimum Payments</span>
                  <span>${totalMinPayments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Extra Payment</span>
                  <span>+${extraPayment}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total Monthly</span>
                  <span>${totalMinPayments + extraPayment}</span>
                </div>
              </div>

              <div className="text-center p-3 bg-financial-success/10 border border-financial-success/20 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Debt-free in</p>
                <p className="text-2xl font-bold text-financial-success">
                  {Math.round(currentStrategy.totalMonths / 12 * 10) / 10} years
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Progress Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Credit Cards Paid Off</span>
                  <span>0 of 3</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Debt Reduction</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Payment Capacity</span>
                  <span>{Math.round(((totalMinPayments + extraPayment) / 4700) * 100)}%</span>
                </div>
                <Progress value={((totalMinPayments + extraPayment) / 4700) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">First Card Paid Off</p>
                    <p className="text-xs text-slate-500">
                      {currentStrategy.payoffOrder[0]?.name}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {currentStrategy.payoffOrder[0]?.months}mo
                  </Badge>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Credit Cards Complete</p>
                    <p className="text-xs text-slate-500">All 3 cards paid off</p>
                  </div>
                  <Badge variant="outline">
                    {Math.max(...currentStrategy.payoffOrder.slice(0, 3).map(d => d.months))}mo
                  </Badge>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Debt Free!</p>
                    <p className="text-xs text-slate-500">All debts eliminated</p>
                  </div>
                  <Badge variant="outline">
                    {Math.round(currentStrategy.totalMonths / 12 * 10) / 10}y
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Take Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Make Extra Payment
              </Button>
              <Button variant="outline" className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Set Payment Reminders
              </Button>
              <Button variant="outline" className="w-full">
                <TrendingDown className="w-4 h-4 mr-2" />
                Track Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DebtPayoff;
