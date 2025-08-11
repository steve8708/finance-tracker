import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  Settings,
  PiggyBank,
  AlertTriangle,
  User,
  Home,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      current: location.pathname === "/",
    },
    {
      name: "Credit Cards",
      href: "/credit-cards",
      icon: CreditCard,
      current: location.pathname === "/credit-cards",
      badge: "3 cards",
    },
    {
      name: "Income & Expenses",
      href: "/income-expenses",
      icon: TrendingUp,
      current: location.pathname === "/income-expenses",
    },
    {
      name: "Budget Planner",
      href: "/budget",
      icon: PiggyBank,
      current: location.pathname === "/budget",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                FinanceTracker
              </span>
            </div>
          </div>

          {/* User Info & Alerts */}
          <div className="flex items-center space-x-4">
            {/* Critical Alert */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-financial-danger/10 border border-financial-danger/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-financial-danger" />
              <span className="text-sm text-financial-danger font-medium">
                Account Overdrawn
              </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Amina Jones
                </p>
                <p className="text-xs text-slate-500">Freelance Designer</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    item.current
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border-transparent",
                    "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 w-64 p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-3">
              {/* Credit Score Widget */}
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Credit Score
                  </span>
                  <span className="text-lg font-bold">625</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-financial-warning h-2 rounded-full"
                    style={{ width: "59%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Goal: 800</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
