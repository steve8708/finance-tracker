import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calculator,
  ExternalLink
} from 'lucide-react';

const CreditCards = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  // Amina's actual credit card data
  const creditCards = [
    {
      name: 'Chase Freedom Flex',
      balance: 2226,
      limit: 3000,
      apr: 24.99,
      minPayment: 85,
      dueDate: 'Sep 15, 2025',
      lastPayment: 100,
      lastPaymentDate: 'Aug 12',
      accountOpened: '2019',
      paymentHistory: { onTime: 10, late: 2, total: 12 },
      rewards: 75,
      recentTransactions: [
        { date: '08/26', description: 'Spotify', amount: 10.99 },
        { date: '08/25', description: 'Trader Joe\'s', amount: 58.10 },
        { date: '08/24', description: 'Ross', amount: 34.77 },
        { date: '08/23', description: 'Parking - Downtown SD', amount: 3.50 },
        { date: '08/22', description: 'Etsy - Logo Asset', amount: 18.00 }
      ]
    },
    {
      name: 'Discover it Cash Back',
      balance: 1475,
      limit: 2000,
      apr: 27.49,
      minPayment: 60,
      dueDate: 'Sep 9, 2025',
      lastPayment: 60,
      lastPaymentDate: 'Aug 1',
      accountOpened: '2021',
      paymentHistory: { onTime: 11, late: 1, total: 12 },
      rewards: 40,
      recentTransactions: [
        { date: '08/20', description: 'Amazon - USB-C Cable', amount: 15.00 },
        { date: '08/18', description: 'Dropbox - Cloud Backup', amount: 17.99 },
        { date: '08/14', description: 'Etsy - Phone Stand', amount: 17.29 },
        { date: '08/08', description: 'Walgreens', amount: 16.70 },
        { date: '08/05', description: 'Uber Eats', amount: 21.30 }
      ]
    },
    {
      name: 'Capital One Quicksilver',
      balance: 1622,
      limit: 2500,
      apr: 19.99,
      minPayment: 70,
      dueDate: 'Sep 5, 2025',
      lastPayment: 85,
      lastPaymentDate: 'Jul 29',
      accountOpened: '2016',
      paymentHistory: { onTime: 12, late: 0, total: 12 },
      rewards: 60,
      recentTransactions: [
        { date: '08/17', description: 'Patreon Support', amount: 8.00 },
        { date: '08/15', description: 'Medium Subscription', amount: 8.00 },
        { date: '08/12', description: 'LinkedIn Premium', amount: 12.93 },
        { date: '08/08', description: 'Starbucks Reload', amount: 10.00 },
        { date: '08/03', description: 'YouTube Premium', amount: 13.99 }
      ]
    }
  ];

  const totalBalance = creditCards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = creditCards.reduce((sum, card) => sum + card.limit, 0);
  const totalMinPayments = creditCards.reduce((sum, card) => sum + card.minPayment, 0);
  const utilization = (totalBalance / totalLimit) * 100;

  const card = creditCards[selectedCard];
  const cardUtilization = (card.balance / card.limit) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Credit Cards
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your credit cards and track payments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={utilization > 30 ? "destructive" : "secondary"} className="text-sm">
            {Math.round(utilization)}% Total Utilization
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-danger">
              ${totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Across {creditCards.length} cards
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Available Credit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-success">
              ${(totalLimit - totalBalance).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              of ${totalLimit.toLocaleString()} total limit
            </p>
          </CardContent>
        </Card>

        <Card>
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Interest This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-expense">
              $95
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Estimated charges
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Cards</CardTitle>
              <CardDescription>Select a card to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {creditCards.map((cardItem, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCard(index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedCard === index 
                      ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{cardItem.name}</h4>
                      <p className="text-xs text-slate-500">APR: {cardItem.apr}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${cardItem.balance.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Due: {cardItem.dueDate.split(',')[0]}</p>
                    </div>
                  </div>
                  <Progress 
                    value={(cardItem.balance / cardItem.limit) * 100} 
                    className="h-1.5" 
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Min: ${cardItem.minPayment}</span>
                    <span>{Math.round((cardItem.balance / cardItem.limit) * 100)}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Card Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {card.name}
                  </CardTitle>
                  <CardDescription>
                    Account opened in {card.accountOpened} • ${card.balance.toLocaleString()} of ${card.limit.toLocaleString()} used
                  </CardDescription>
                </div>
                <Badge variant={cardUtilization > 30 ? "destructive" : "secondary"}>
                  {Math.round(cardUtilization)}% utilized
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="payment">Payment Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Current Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Balance</h4>
                        <div className="text-3xl font-bold">${card.balance.toLocaleString()}</div>
                        <Progress value={cardUtilization} className="mt-2" />
                        <p className="text-sm text-slate-500 mt-1">
                          ${(card.limit - card.balance).toLocaleString()} available credit
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500">APR</p>
                          <p className="font-bold">{card.apr}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Min Payment</p>
                          <p className="font-bold">${card.minPayment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Payment Info</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Due Date</span>
                            <span className="font-medium">{card.dueDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Last Payment</span>
                            <span className="font-medium">${card.lastPayment} on {card.lastPaymentDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Interest (est.)</span>
                            <span className="font-medium text-financial-expense">
                              ${Math.round((card.balance * (card.apr / 100)) / 12)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Payment History</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Last 12 months:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-financial-success">{card.paymentHistory.onTime} on-time</span>
                            {card.paymentHistory.late > 0 && (
                              <span className="text-financial-danger">{card.paymentHistory.late} late</span>
                            )}
                          </div>
                        </div>
                        <Progress 
                          value={(card.paymentHistory.onTime / card.paymentHistory.total) * 100} 
                          className="mt-2" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {cardUtilization > 30 && (
                    <div className="p-4 bg-financial-warning/10 border border-financial-warning/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-financial-warning mt-0.5" />
                        <div>
                          <h4 className="font-medium text-financial-warning">High Utilization Alert</h4>
                          <p className="text-sm text-slate-600 mt-1">
                            Your utilization is {Math.round(cardUtilization)}%. Consider keeping it below 30% to improve your credit score.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rewards */}
                  <div className="p-4 bg-financial-success/10 border border-financial-success/20 rounded-lg">
                    <h4 className="font-medium text-financial-success mb-2">Rewards Earned</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cash back this year</span>
                      <span className="font-bold">${card.rewards}</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transactions" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Recent Transactions</h4>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {card.recentTransactions.map((transaction, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-slate-500">{transaction.date}</p>
                        </div>
                        <div className="text-financial-expense font-medium">
                          -${transaction.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Payment Strategy</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Minimum Payment</h5>
                        <div className="text-2xl font-bold mb-2">${card.minPayment}</div>
                        <p className="text-sm text-slate-500">
                          Payoff time: ~{Math.round(card.balance / card.minPayment / 12 * 20)} years
                        </p>
                        <p className="text-sm text-financial-expense">
                          Total interest: ${Math.round(card.balance * 1.5)}
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg bg-financial-success/5">
                        <h5 className="font-medium mb-2">Recommended Payment</h5>
                        <div className="text-2xl font-bold mb-2">${card.minPayment + 50}</div>
                        <p className="text-sm text-slate-500">
                          Payoff time: ~{Math.round(card.balance / (card.minPayment + 50) / 12 * 8)} years
                        </p>
                        <p className="text-sm text-financial-success">
                          Savings: ${Math.round(card.balance * 0.5)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Calculator className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-blue-900 dark:text-blue-100">Pro Tip</h5>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                            Pay ${card.minPayment + 50} extra each month to save ${Math.round(card.balance * 0.3)} in interest and pay off 2 years faster.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Make Payment
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditCards;
