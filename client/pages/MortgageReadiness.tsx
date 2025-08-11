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
  Home,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Calculator,
  DollarSign,
  CreditCard,
  PiggyBank,
  TrendingDown,
  Clock,
  Award,
  BarChart3
} from 'lucide-react';

const MortgageReadiness = () => {
  const [targetHomePrice, setTargetHomePrice] = useState(400000);
  const [targetDownPayment, setTargetDownPayment] = useState(20);

  // Current financial data
  const currentData = {
    creditScore: 625,
    creditUtilization: 71,
    totalDebt: 23300,
    creditCardDebt: 5300,
    monthlyIncome: 7917,
    downPaymentSaved: 300, // current savings
    monthlyPayments: 355, // debt payments
    accountAge: 6.5, // years since oldest account (Capital One 2016)
    latePayments: 3 // total in last 12 months
  };

  // Mortgage readiness calculations
  const downPaymentNeeded = targetHomePrice * (targetDownPayment / 100);
  const downPaymentGap = downPaymentNeeded - currentData.downPaymentSaved;
  const monthsToSaveDownPayment = Math.ceil(downPaymentGap / 1000); // assuming $1k/month savings
  
  // Credit score milestones for mortgage rates
  const creditMilestones = [
    { score: 580, rate: 'FHA eligible', description: 'Minimum for FHA loans (3.5% down)', status: 'completed' },
    { score: 620, rate: 'Conventional eligible', description: 'Minimum for conventional loans', status: 'completed' },
    { score: 650, rate: '~6.8% APR', description: 'Better rates available', status: 'current_target' },
    { score: 700, rate: '~6.3% APR', description: 'Good credit rates', status: 'future' },
    { score: 740, rate: '~6.0% APR', description: 'Excellent credit rates', status: 'future' },
    { score: 800, rate: '~5.8% APR', description: 'Best available rates', status: 'future' }
  ];

  // Debt-to-income calculation
  const monthlyDebtPayments = currentData.monthlyPayments;
  const currentDTI = (monthlyDebtPayments / currentData.monthlyIncome) * 100;
  const maxDTI = 43; // typical mortgage DTI limit
  
  // Estimated monthly mortgage payment
  const loanAmount = targetHomePrice - downPaymentNeeded;
  const estimatedRate = 6.8; // current rate for 650 credit score
  const monthlyRate = estimatedRate / 100 / 12;
  const numPayments = 30 * 12;
  const estimatedMortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const projectedDTI = ((monthlyDebtPayments + estimatedMortgagePayment) / currentData.monthlyIncome) * 100;

  // Timeline calculations
  const utilizationTarget = 10; // ideal for mortgage
  const creditScoreTarget = 700; // good mortgage rate
  const monthsToImproveCredit = 12; // estimated with aggressive paydown

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Mortgage Readiness Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your path to homeownership in the next 2 years
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            Target: 2027
          </Badge>
        </div>
      </div>

      {/* Readiness Score */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-6 h-6 text-blue-600" />
                Mortgage Readiness Score
              </CardTitle>
              <CardDescription>
                Overall assessment of your mortgage application strength
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">42%</div>
              <p className="text-sm text-slate-500">Needs Improvement</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Credit Profile</span>
                <Badge variant="destructive">Poor</Badge>
              </div>
              <p className="text-xs text-slate-600">High utilization hurting score</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Income Stability</span>
                <Badge variant="secondary">Fair</Badge>
              </div>
              <p className="text-xs text-slate-600">Freelance income variability</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Down Payment</span>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <p className="text-xs text-slate-600">Only $300 saved of ${downPaymentNeeded.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">24-Month Timeline</TabsTrigger>
          <TabsTrigger value="credit">Credit Improvement</TabsTrigger>
          <TabsTrigger value="savings">Down Payment</TabsTrigger>
          <TabsTrigger value="affordability">Affordability</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Your 24-Month Action Plan
              </CardTitle>
              <CardDescription>
                Critical milestones to reach mortgage readiness by 2027
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Immediate Actions (0-3 months) */}
                <div className="border-l-4 border-l-red-500 pl-4">
                  <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">
                    IMMEDIATE (Next 3 months) - CRITICAL
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium">Slash Credit Utilization to Under 30%</p>
                        <p className="text-sm text-slate-600">Pay down $3,075 in credit card debt immediately</p>
                        <p className="text-xs text-red-600">Current: 71% → Target: 30% (+100 point credit boost)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium">Establish Emergency Fund</p>
                        <p className="text-sm text-slate-600">Save $5,000 minimum before house shopping</p>
                        <p className="text-xs text-red-600">Prevents mortgage approval delays</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium">Perfect Payment History</p>
                        <p className="text-sm text-slate-600">Zero late payments for next 24 months</p>
                        <p className="text-xs text-red-600">Essential for mortgage approval</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Short-term (3-12 months) */}
                <div className="border-l-4 border-l-yellow-500 pl-4">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-3">
                    SHORT-TERM (3-12 months)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-yellow-600 mt-1" />
                      <div>
                        <p className="font-medium">Reach 700+ Credit Score</p>
                        <p className="text-sm text-slate-600">Continue debt paydown + utilization under 10%</p>
                        <p className="text-xs text-yellow-600">Unlocks better mortgage rates (~6.3% vs 6.8%)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <PiggyBank className="w-5 h-5 text-yellow-600 mt-1" />
                      <div>
                        <p className="font-medium">Save $20,000 Down Payment</p>
                        <p className="text-sm text-slate-600">$1,800/month savings needed</p>
                        <p className="text-xs text-yellow-600">5% down on $400k home + closing costs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-yellow-600 mt-1" />
                      <div>
                        <p className="font-medium">Stabilize Income Documentation</p>
                        <p className="text-sm text-slate-600">2 years of consistent freelance records</p>
                        <p className="text-xs text-yellow-600">Required for self-employed borrowers</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Long-term (12-24 months) */}
                <div className="border-l-4 border-l-green-500 pl-4">
                  <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">
                    LONG-TERM (12-24 months)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Home className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium">Begin House Shopping</p>
                        <p className="text-sm text-slate-600">Get pre-approved with 700+ score</p>
                        <p className="text-xs text-green-600">Strong negotiating position</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Award className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium">Optimize for Best Rates</p>
                        <p className="text-sm text-slate-600">740+ score for excellent rates</p>
                        <p className="text-xs text-green-600">Could save $200+/month on mortgage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Credit Score Journey
                </CardTitle>
                <CardDescription>
                  Mortgage rate improvements by credit score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditMilestones.map((milestone, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${
                    milestone.status === 'completed' ? 'bg-green-50 border-green-200' :
                    milestone.status === 'current_target' ? 'bg-blue-50 border-blue-200' :
                    'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {milestone.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : milestone.status === 'current_target' ? (
                          <Target className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400" />
                        )}
                        <span className="font-medium">{milestone.score}+ Score</span>
                      </div>
                      <Badge variant={milestone.status === 'completed' ? 'default' : 'outline'}>
                        {milestone.rate}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{milestone.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Utilization Impact
                </CardTitle>
                <CardDescription>
                  How reducing balances improves your score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-2">Current Situation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Balances</span>
                      <span className="font-bold">${currentData.creditCardDebt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Limits</span>
                      <span>$7,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Utilization</span>
                      <span className="text-red-600 font-bold">{currentData.creditUtilization}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-700 mb-2">Target: Under 30%</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pay Down Amount</span>
                      <span className="font-bold">$3,075</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>New Utilization</span>
                      <span className="text-yellow-600 font-bold">30%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Credit Score Boost</span>
                      <span className="text-green-600 font-bold">+60-80 points</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-700 mb-2">Ideal: Under 10%</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pay Down Amount</span>
                      <span className="font-bold">$4,550</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>New Utilization</span>
                      <span className="text-green-600 font-bold">10%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Credit Score Boost</span>
                      <span className="text-green-600 font-bold">+100-120 points</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Down Payment Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="home-price">Target Home Price</Label>
                    <Input
                      id="home-price"
                      type="number"
                      value={targetHomePrice}
                      onChange={(e) => setTargetHomePrice(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="down-payment">Down Payment %</Label>
                    <Input
                      id="down-payment"
                      type="number"
                      value={targetDownPayment}
                      onChange={(e) => setTargetDownPayment(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between">
                    <span>Down Payment Needed</span>
                    <span className="font-bold">${downPaymentNeeded.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Currently Saved</span>
                    <span>${currentData.downPaymentSaved.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Still Need</span>
                    <span className="font-bold text-red-600">${downPaymentGap.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Closing Costs (~3%)</span>
                    <span className="font-bold">${(targetHomePrice * 0.03).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Cash Needed</span>
                    <span>${(downPaymentNeeded + targetHomePrice * 0.03).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg">
                  <h4 className="font-medium mb-2">Savings Strategy</h4>
                  <div className="space-y-2 text-sm">
                    <p>At $1,800/month: <span className="font-bold">{Math.ceil(downPaymentGap / 1800)} months</span></p>
                    <p>At $2,500/month: <span className="font-bold">{Math.ceil(downPaymentGap / 2500)} months</span></p>
                    <p className="text-blue-600 font-medium">Recommend aggressive savings once credit cards are paid off</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5" />
                  Savings Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Emergency Fund</span>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <Progress value={(currentData.downPaymentSaved / 5000) * 100} className="mb-2" />
                    <p className="text-sm text-slate-600">
                      ${currentData.downPaymentSaved} of $5,000 ({Math.round((currentData.downPaymentSaved / 5000) * 100)}%)
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">5% Down Payment</span>
                      <Badge variant="outline">Future</Badge>
                    </div>
                    <Progress value={(currentData.downPaymentSaved / (targetHomePrice * 0.05)) * 100} className="mb-2" />
                    <p className="text-sm text-slate-600">
                      ${currentData.downPaymentSaved} of ${(targetHomePrice * 0.05).toLocaleString()} ({Math.round((currentData.downPaymentSaved / (targetHomePrice * 0.05)) * 100)}%)
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">20% Down Payment</span>
                      <Badge variant="outline">Optimal</Badge>
                    </div>
                    <Progress value={(currentData.downPaymentSaved / downPaymentNeeded) * 100} className="mb-2" />
                    <p className="text-sm text-slate-600">
                      ${currentData.downPaymentSaved} of ${downPaymentNeeded.toLocaleString()} ({Math.round((currentData.downPaymentSaved / downPaymentNeeded) * 100)}%)
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-700 mb-2">Why 20% Down?</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• No PMI insurance (~$300/month saved)</li>
                    <li>• Lower interest rates</li>
                    <li>• Stronger negotiating position</li>
                    <li>• Lower monthly payments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="affordability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Debt-to-Income Analysis
                </CardTitle>
                <CardDescription>
                  Current vs projected with mortgage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium mb-3">Current DTI</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Income</span>
                      <span>${currentData.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current Debt Payments</span>
                      <span>${monthlyDebtPayments}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Current DTI</span>
                      <span className={currentDTI > 36 ? 'text-red-600' : 'text-green-600'}>
                        {currentDTI.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={currentDTI} className="mt-3" />
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg">
                  <h4 className="font-medium mb-3">Projected with Mortgage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Mortgage Payment</span>
                      <span>${Math.round(estimatedMortgagePayment).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Other Debt Payments</span>
                      <span>${monthlyDebtPayments}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Projected DTI</span>
                      <span className={projectedDTI > maxDTI ? 'text-red-600' : 'text-green-600'}>
                        {projectedDTI.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={projectedDTI} className="mt-3" />
                  <p className="text-xs text-slate-500 mt-2">
                    Max DTI for most lenders: {maxDTI}%
                  </p>
                </div>

                {projectedDTI > maxDTI && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-700">DTI Too High</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          You need to pay down more debt or increase income before qualifying for this mortgage amount.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Affordable Home Price
                </CardTitle>
                <CardDescription>
                  Based on your current income
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Conservative (28% DTI)</span>
                      <Badge variant="default">Safe</Badge>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      ${Math.round((currentData.monthlyIncome * 0.28 - monthlyDebtPayments) / monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments)) + downPaymentNeeded).toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">Monthly payment: ${Math.round(currentData.monthlyIncome * 0.28).toLocaleString()}</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Aggressive (36% DTI)</span>
                      <Badge variant="secondary">Stretch</Badge>
                    </div>
                    <p className="text-lg font-bold text-yellow-600">
                      ${Math.round((currentData.monthlyIncome * 0.36 - monthlyDebtPayments) / monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments)) + downPaymentNeeded).toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">Monthly payment: ${Math.round(currentData.monthlyIncome * 0.36).toLocaleString()}</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Maximum (43% DTI)</span>
                      <Badge variant="destructive">Risky</Badge>
                    </div>
                    <p className="text-lg font-bold text-red-600">
                      ${Math.round((currentData.monthlyIncome * 0.43 - monthlyDebtPayments) / monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments)) + downPaymentNeeded).toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">Monthly payment: ${Math.round(currentData.monthlyIncome * 0.43).toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-700 mb-2">Freelancer Considerations</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Lenders use 2-year average income</li>
                    <li>• Prepare 2 years of tax returns</li>
                    <li>• Consider seasonal income variations</li>
                    <li>• Bank statements for business accounts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Next Steps - Priority Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-start bg-red-600 hover:bg-red-700">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-bold">URGENT</span>
              </div>
              <span className="text-sm">Pay down $3,075 in credit cards to reach 30% utilization</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5" />
                <span className="font-bold">Build Emergency Fund</span>
              </div>
              <span className="text-sm">Save $5,000 before considering home purchase</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-bold">Track Progress</span>
              </div>
              <span className="text-sm">Monitor credit score monthly and stay on timeline</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MortgageReadiness;
