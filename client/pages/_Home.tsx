import React from "react";
import Header from "@/components/Header";
import MetricsGrid from "@/components/MetricsGrid";
import CreditCardsSection from "@/components/CreditCardsSection";
import UpcomingIncomeSection from "@/components/UpcomingIncomeSection";
import FinancialGoalsCard from "@/components/FinancialGoalsCard";
import AccountBalancesCard from "@/components/AccountBalancesCard";

const _Home = () => {
  // Amina's actual financial data from PDF
  const financialData = {
    totalIncome: 95000,
    monthlyIncome: 7916.67,
    creditScore: 625,
    creditScoreGoal: 800,
    totalDebt: 23322.63,
    creditCardDebt: 5322.63,
    studentLoans: 18000,
    checkingBalance: 125.00,
    savingsBalance: 300.00,
    monthlyExpenses: 3625.00,
    housingUtilities: 2673.00,
    debtPayments: 355.00,
    creditCards: [
      {
        name: "Chase Freedom Flex",
        balance: 2226.24,
        limit: 3000,
        apr: 24.99,
        payment: 85.00,
      },
      {
        name: "Discover it Cash Back",
        balance: 1475.89,
        limit: 2000,
        apr: 27.49,
        payment: 60.00,
      },
      {
        name: "Capital One Quicksilver",
        balance: 1620.50,
        limit: 2500,
        apr: 19.99,
        payment: 70.00,
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
      { title: "Pay Off Credit Cards", current: 5322.63, target: 0, progress: 0 },
      { title: "Emergency Fund", current: 300.00, target: 5000.00, progress: 6 },
    ],
  };

  const creditScoreProgress =
    ((financialData.creditScore - 300) / (850 - 300)) * 100;
  const creditUtilization = (5322.63 / 7500) * 100; // $5,322.63 of $7,500 from PDF

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header userName="Amina" creditUtilization={creditUtilization} />

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
