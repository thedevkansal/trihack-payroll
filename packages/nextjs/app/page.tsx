"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BriefcaseIcon, UserGroupIcon, ShieldCheckIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Badge } from "~~/components/ui/badge";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          Privacy-Preserving • Decentralized • Fair
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Payroll Escrow System
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          A decentralized payroll system with built-in severance protection. Process employee salaries on-chain with
          automatic 15-day severance payment guarantee.
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-sm font-medium">Connected:</span>
          <Address address={connectedAddress} />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <ShieldCheckIcon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Severance Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automatic 15-day salary severance payment for employees in case of termination. Fair treatment
                  guaranteed by smart contract.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ChartBarIcon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Transparent Escrow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All funds held in escrow on-chain. Transparent balance tracking ensures employees can verify company
                  solvency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UserGroupIcon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Dual Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Termination requires confirmation from both parties, ensuring mutual agreement and preventing
                  unilateral actions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Get Started</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BriefcaseIcon className="h-12 w-12 mb-4 text-blue-500" />
              <CardTitle>For Employers</CardTitle>
              <CardDescription>Manage your company&apos;s payroll with ease</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li>✓ Register your company</li>
                <li>✓ Hire and manage employees</li>
                <li>✓ Deposit funds to escrow</li>
                <li>✓ Process salary payments</li>
                <li>✓ Handle terminations fairly</li>
              </ul>
              <Link href="/hr" passHref>
                <Button className="w-full" size="lg">
                  Go to HR Dashboard →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <UserGroupIcon className="h-12 w-12 mb-4 text-purple-500" />
              <CardTitle>For Employees</CardTitle>
              <CardDescription>Track your employment and salary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li>✓ View employment status</li>
                <li>✓ Check salary details</li>
                <li>✓ Track payment history</li>
                <li>✓ Protected by severance</li>
                <li>✓ Confirm terminations</li>
              </ul>
              <Link href="/employee" passHref>
                <Button className="w-full" size="lg" variant="outline">
                  Go to Employee Portal →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to explore the smart contract?
          </p>
          <Link href="/debug" passHref>
            <Button variant="ghost">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Contract Debugger
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
