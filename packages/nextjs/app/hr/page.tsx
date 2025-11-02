"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { formatEther, parseEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { Label } from "~~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/components/ui/tabs";
import { Badge } from "~~/components/ui/badge";
import { Alert, AlertDescription } from "~~/components/ui/alert";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const HRDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [companyName, setCompanyName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [terminateAddress, setTerminateAddress] = useState("");
  const [paymentAddress, setPaymentAddress] = useState("");

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("PayrollEscrow");

  // Read company info
  const { data: companyData } = useScaffoldReadContract({
    contractName: "PayrollEscrow",
    functionName: "companies",
    args: [connectedAddress],
  });

  const handleRegisterCompany = async () => {
    if (!companyName) {
      notification.error("Please enter a company name");
      return;
    }

    try {
      await writeYourContractAsync({
        functionName: "registerCompany",
        args: [companyName],
      });
      notification.success("Company registered successfully!");
      setCompanyName("");
    } catch (error) {
      console.error("Error registering company:", error);
      notification.error("Failed to register company");
    }
  };

  const handleHireEmployee = async () => {
    if (!employeeAddress || !monthlySalary) {
      notification.error("Please fill in all fields");
      return;
    }

    try {
      await writeYourContractAsync({
        functionName: "hireEmployee",
        args: [employeeAddress, parseEther(monthlySalary)],
      });
      notification.success("Employee hired successfully!");
      setEmployeeAddress("");
      setMonthlySalary("");
    } catch (error) {
      console.error("Error hiring employee:", error);
      notification.error("Failed to hire employee");
    }
  };

  const handleDepositToEscrow = async () => {
    if (!depositAmount) {
      notification.error("Please enter a deposit amount");
      return;
    }

    try {
      await writeYourContractAsync({
        functionName: "depositToEscrow",
        value: parseEther(depositAmount),
      });
      notification.success("Funds deposited to escrow!");
      setDepositAmount("");
    } catch (error) {
      console.error("Error depositing to escrow:", error);
      notification.error("Failed to deposit to escrow");
    }
  };

  const handleInitiateTermination = async () => {
    if (!terminateAddress) {
      notification.error("Please enter employee address");
      return;
    }

    try {
      await writeYourContractAsync({
        functionName: "initiateTermination",
        args: [terminateAddress],
      });
      notification.success("Termination initiated!");
      setTerminateAddress("");
    } catch (error) {
      console.error("Error initiating termination:", error);
      notification.error("Failed to initiate termination");
    }
  };

  const handlePaySalary = async () => {
    if (!paymentAddress) {
      notification.error("Please enter employee address");
      return;
    }

    try {
      await writeYourContractAsync({
        functionName: "paySalary",
        args: [paymentAddress],
      });
      notification.success("Salary payment processed!");
      setPaymentAddress("");
    } catch (error) {
      console.error("Error paying salary:", error);
      notification.error("Failed to pay salary");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">HR Dashboard</h1>
        <p className="text-muted-foreground mb-4">Manage your company&apos;s payroll and employees</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Connected as:</span>
          <Address address={connectedAddress} />
        </div>
      </div>

      {/* Company Info Banner */}
      {companyData && companyData[1] ? (
        <Alert className="mb-6">
          <AlertDescription>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold">Company:</span> {companyData[1]}
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  Escrow Balance: {companyData[2] ? formatEther(companyData[2]) : "0"} ETH
                </Badge>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🏢 Register Your Company</CardTitle>
            <CardDescription>Start by registering your company to access payroll features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                />
              </div>
              <Button onClick={handleRegisterCompany} className="w-full">
                Register Company
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      {companyData && companyData[1] && (
        <Tabs defaultValue="hire" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hire">👥 Hire</TabsTrigger>
            <TabsTrigger value="pay">💸 Pay Salary</TabsTrigger>
            <TabsTrigger value="deposit">💰 Deposit</TabsTrigger>
            <TabsTrigger value="manage">⚙️ Manage</TabsTrigger>
          </TabsList>

          {/* Hire Employee Tab */}
          <TabsContent value="hire">
            <Card>
              <CardHeader>
                <CardTitle>Hire New Employee</CardTitle>
                <CardDescription>Add a new employee to your payroll system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeAddress">Employee Wallet Address</Label>
                  <Input
                    id="employeeAddress"
                    placeholder="0x..."
                    value={employeeAddress}
                    onChange={e => setEmployeeAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlySalary">Monthly Salary (ETH)</Label>
                  <Input
                    id="monthlySalary"
                    type="number"
                    step="0.01"
                    placeholder="1.0"
                    value={monthlySalary}
                    onChange={e => setMonthlySalary(e.target.value)}
                  />
                </div>
                <Button onClick={handleHireEmployee} className="w-full">
                  Hire Employee
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pay Salary Tab */}
          <TabsContent value="pay">
            <Card>
              <CardHeader>
                <CardTitle>Process Salary Payment</CardTitle>
                <CardDescription>
                  Pay monthly salary to an employee. Payment can be made 30 days after their last payment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentAddress">Employee Address</Label>
                  <Input
                    id="paymentAddress"
                    placeholder="0x..."
                    value={paymentAddress}
                    onChange={e => setPaymentAddress(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertDescription className="text-sm">
                    💡 The salary amount will be automatically calculated based on the employee&apos;s monthly salary
                    and deducted from your escrow balance.
                  </AlertDescription>
                </Alert>
                <Button onClick={handlePaySalary} className="w-full">
                  Pay Salary
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deposit Funds Tab */}
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Deposit to Escrow</CardTitle>
                <CardDescription>
                  Fund your escrow account to ensure timely salary payments. Current balance:{" "}
                  {companyData[2] ? formatEther(companyData[2]) : "0"} ETH
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="depositAmount">Amount (ETH)</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    step="0.01"
                    placeholder="10.0"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleDepositToEscrow} className="w-full">
                  Deposit Funds
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Employees Tab */}
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Employees</CardTitle>
                <CardDescription>Initiate termination or manage employee status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="terminateAddress">Employee Address to Terminate</Label>
                  <Input
                    id="terminateAddress"
                    placeholder="0x..."
                    value={terminateAddress}
                    onChange={e => setTerminateAddress(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertDescription className="text-sm">
                    ⚠️ Initiating termination will require employee confirmation. Upon confirmation, they&apos;ll
                    receive 15 days of salary as severance.
                  </AlertDescription>
                </Alert>
                <Button onClick={handleInitiateTermination} variant="destructive" className="w-full">
                  Initiate Termination
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default HRDashboard;
