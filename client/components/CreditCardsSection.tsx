import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";

interface CreditCardData {
  name: string;
  balance: number;
  limit: number;
  apr: number;
  payment: number;
}

interface CreditCardsSectionProps {
  creditCards: CreditCardData[];
  creditCardDebt: number;
  creditUtilization: number;
}

const CreditCardsSection: React.FC<CreditCardsSectionProps> = ({
  creditCards,
  creditCardDebt,
  creditUtilization,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Credit Cards
            </CardTitle>
            <CardDescription>
              Total Balance: ${creditCardDebt.toLocaleString()} • Utilization:{" "}
              {creditUtilization.toFixed(1)}%
            </CardDescription>
          </div>
          <Badge variant={creditUtilization > 30 ? "destructive" : "secondary"}>
            {creditUtilization > 30 ? "High Utilization" : "Good Utilization"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {creditCards.map((card, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium">{card.name}</h4>
                <p className="text-sm text-slate-500">APR: {card.apr}%</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${card.balance.toLocaleString()}</p>
                <p className="text-sm text-slate-500">
                  / ${card.limit.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Progress
                value={(card.balance / card.limit) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Min Payment: ${card.payment}</span>
                <span>
                  {((card.balance / card.limit) * 100).toFixed(1)}% utilized
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CreditCardsSection;
