"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BriefcaseIcon, ShieldCheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Privacy-Preserving Payroll</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <p className="text-center text-lg mt-6 max-w-2xl mx-auto">
            A decentralized payroll system with built-in severance protection. Process employee salaries on-chain with
            automatic severance payment based on employment duration. Escrow deposits happen automatically when hiring.
          </p>
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BriefcaseIcon className="h-8 w-8 fill-secondary" />
              <p>
                Are you an HR Manager?{" "}
                <Link href="/hr" passHref className="link">
                  HR Dashboard
                </Link>
              </p>
              <p className="text-sm mt-4">
                Register your company, hire employees, manage payroll and handle terminations.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <UserGroupIcon className="h-8 w-8 fill-secondary" />
              <p>
                Looking for a job?{" "}
                <Link href="/employee" passHref className="link">
                  Employee Portal
                </Link>
              </p>
              <p className="text-sm mt-4">Apply for positions, view your salary, and manage your employment status.</p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ShieldCheckIcon className="h-8 w-8 fill-secondary" />
              <p>
                Check out the{" "}
                <Link href="/debug" passHref className="link">
                  Contract Debugger
                </Link>
              </p>
              <p className="text-sm mt-4">View and interact directly with the PayrollEscrow smart contract.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
