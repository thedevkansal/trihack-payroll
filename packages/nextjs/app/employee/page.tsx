"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { Alert, AlertDescription } from "~~/components/ui/alert";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const EmployeeDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("PayrollEscrow");

  // Read employee info
  const { data: employeeData } = useScaffoldReadContract({
    contractName: "PayrollEscrow",
    functionName: "employees",
    args: [connectedAddress],
  });

  const handleConfirmTermination = async () => {
    try {
      await writeYourContractAsync({
        functionName: "confirmTermination",
      });
      notification.success("Termination confirmed! Severance payment sent.");
    } catch (error) {
      console.error("Error confirming termination:", error);
      notification.error("Failed to confirm termination");
    }
  };

  const isActive = employeeData && employeeData[4];
  const terminationInitiated = employeeData && employeeData[5];
  const monthlySalary = employeeData && employeeData[1] ? formatEther(employeeData[1]) : "0";
  const startDate =
    employeeData && employeeData[2] ? new Date(Number(employeeData[2]) * 1000).toLocaleDateString() : "N/A";
  const lastPaymentDate =
    employeeData && employeeData[3] ? new Date(Number(employeeData[3]) * 1000).toLocaleDateString() : "N/A";

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Employee Portal</h1>
        <p className="text-muted-foreground mb-4">View your employment status and manage your payroll</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Your Address:</span>
          <Address address={connectedAddress} />
        </div>
      </div>

      {!connectedAddress && (
        <Alert variant="destructive">
          <AlertDescription>Please connect your wallet to view your employment status.</AlertDescription>
        </Alert>
      )}

      {connectedAddress && !isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Not Yet Employed</CardTitle>
            <CardDescription>You are not currently employed with any company in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Please contact an HR representative to get hired and start receiving your salary!
            </p>
          </CardContent>
        </Card>
      )}

      {connectedAddress && isActive && (
        <div className="space-y-6">
          {/* Employment Status Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Employment Information</CardTitle>
                  <CardDescription>Your current employment details</CardDescription>
                </div>
                <Badge variant="default" className="bg-green-500">
                  Active Employee
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Salary</p>
                  <p className="text-2xl font-bold">{monthlySalary} ETH</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Daily Rate</p>
                  <p className="text-2xl font-bold">{(parseFloat(monthlySalary) / 30).toFixed(6)} ETH</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p className="text-lg">{startDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Last Payment</p>
                  <p className="text-lg">{lastPaymentDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Severance Protection Info */}
          <Alert>
            <AlertDescription>
              <div className="flex items-start gap-2">
                <span className="text-xl">🛡️</span>
                <div>
                  <p className="font-semibold mb-1">Severance Protection Active</p>
                  <p className="text-sm">
                    If your employment is terminated, you will receive severance pay based on your employment duration
                    (calculated from days worked).
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Termination Warning */}
          {terminationInitiated && (
            <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950">
              <CardHeader>
                <CardTitle className="text-orange-700 dark:text-orange-300">⚠️ Termination Initiated</CardTitle>
                <CardDescription>Action Required</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Your employment termination has been initiated. You need to confirm the termination to receive your
                  severance payment based on your employment duration.
                </p>
                <Button onClick={handleConfirmTermination} variant="destructive" className="w-full">
                  Confirm Termination & Claim Severance
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Salary Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Breakdown</CardTitle>
              <CardDescription>Detailed view of your compensation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <span className="font-medium">Monthly Salary</span>
                <span className="text-xl font-bold">{monthlySalary} ETH</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <span className="font-medium">Daily Rate</span>
                <span className="text-xl font-bold">{(parseFloat(monthlySalary) / 30).toFixed(6)} ETH</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <span className="font-medium">Severance Package (15 days)</span>
                <span className="text-xl font-bold">{((parseFloat(monthlySalary) * 15) / 30).toFixed(4)} ETH</span>
              </div>
              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Payment Schedule:</strong> Your salary is paid monthly. HR can process payments 30 days after
                  your last payment date.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
