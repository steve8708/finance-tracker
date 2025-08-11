import React from "react";
import Header from "@/components/Header";
import MetricsGrid from "@/components/MetricsGrid";
import CreditCardsSection from "@/components/CreditCardsSection";
import UpcomingIncomeSection from "@/components/UpcomingIncomeSection";
import FinancialGoalsCard from "@/components/FinancialGoalsCard";
import PriorityActionsCard from "@/components/PriorityActionsCard";
import AccountBalancesCard from "@/components/AccountBalancesCard";

const _Home = () => {
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
      {
        name: "Chase Freedom Flex",
        balance: 2226,
        limit: 3000,
        apr: 24.99,
        payment: 85,
      },
      {
        name: "Discover it Cash Back",
        balance: 1475,
        limit: 2000,
        apr: 27.49,
        payment: 60,
      },
      {
        name: "Capital One Quicksilver",
        balance: 1622,
        limit: 2500,
        apr: 19.99,
        payment: 70,
      },
    ],
    upcomingIncome: [
      { source: "Coffee Shop Branding", amount: 3200, date: "Sep 2025" },
      { source: "Arts Org Event Staff", amount: 1500, date: "Sep 2025" },
    ],
    goals: [
      {
        title: "Reach 800 Credit Score",
        current: 625,
        target: 800,
        progress: 31,
      },
      { title: "Pay Off Credit Cards", current: 5300, target: 0, progress: 0 },
      { title: "Emergency Fund", current: 300, target: 5000, progress: 6 },
    ],
  };

  const creditScoreProgress =
    ((financialData.creditScore - 300) / (850 - 300)) * 100;
  const creditUtilization = (financialData.creditCardDebt / 7500) * 100; // Total credit limit

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header
        userName="Amina"
        creditUtilization={creditUtilization}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <MetricsGrid
          financialData={financialData}
          creditScoreProgress={creditScoreProgress}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Credit Cards & Debt */}
          <div className="lg:col-span-2 space-y-6">
            <CreditCardsSection
              creditCards={financialData.creditCards}
              creditCardDebt={financialData.creditCardDebt}
              creditUtilization={creditUtilization}
            />

            <UpcomingIncomeSection
              upcomingIncome={financialData.upcomingIncome}
            />
          </div>

          {/* Right Column - Goals & Actions */}
          <div className="space-y-6">
            <FinancialGoalsCard goals={financialData.goals} />

            <PriorityActionsCard />

            <AccountBalancesCard
              checkingBalance={financialData.checkingBalance}
              savingsBalance={financialData.savingsBalance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default _Home;
