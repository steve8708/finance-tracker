import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, AlertTriangle } from "lucide-react";

interface AccountBalancesCardProps {
  checkingBalance: number;
  savingsBalance: number;
}

const AccountBalancesCard: React.FC<AccountBalancesCardProps> = ({
  checkingBalance,
  savingsBalance,
}) => {
  const totalLiquidAssets = checkingBalance + savingsBalance;

  return (
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
          <span className="font-medium">${checkingBalance}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Chase Savings</span>
          <span className="font-medium">${savingsBalance}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center font-medium">
          <span>Total Liquid Assets</span>
          <span>${totalLiquidAssets}</span>
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
  );
};

export default AccountBalancesCard;
