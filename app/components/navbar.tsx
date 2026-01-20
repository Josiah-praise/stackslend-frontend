"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Wallet, ChevronDown } from "lucide-react";
import { useStacks } from "@/lib/hooks/use-stacks";

function formatAddress(address?: string | null) {
  if (!address) return "";
  return address.length <= 8
    ? address
    : `${address.slice(0, 4)}…${address.slice(address.length - 4)}`;
}

export function Navbar() {
  const { connect, disconnect, isConnected, stxAddress, isPending } = useStacks();
  const [searchAddress, setSearchAddress] = useState("");
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      // Navigate to address page
      window.location.href = `/${searchAddress.trim()}`;
    }
  };

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-sm font-bold text-white">SL</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">
                StacksLend
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/lend"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Lend
            </Link>
            <Link
              href="/borrow"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Borrow
            </Link>
            <Link
              href="/liquidate"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Liquidate
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search address..."
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </form>
          </div>

          {/* Network Switcher */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value as "testnet" | "mainnet")}
                className="appearance-none bg-slate-100 border border-slate-300 rounded-md px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="testnet">Testnet</option>
                <option value="mainnet">Mainnet</option>
              </select>
              <ChevronDown className="absolute right-2 top-1.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Wallet Connection */}
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-lg">
                  <Wallet className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {formatAddress(stxAddress)}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isPending}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet className="h-4 w-4" />
                <span>{isPending ? "Connecting..." : "Connect Wallet"}</span>
              </button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
