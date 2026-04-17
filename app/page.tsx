"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Wallet,
  TrendingUp,
  History,
  ShieldCheck,
  CreditCard, User2, XCircle
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PayButton from "./componenets/payButton";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [stage, setStage] = useState<"amount" | "name" | "processing" | "success" | "fail">("amount");
  const [info, setInfo] = useState({ name: "", email: "" })
  const [amount, setAmount] = useState<number>(500);
  const [isHovered, setIsHovered] = useState(false);
  const [reference, setReference] = useState<string>("")


  const handleamount = useCallback(() => {
    if (amount <= 0) return;
    setStage("name");
  }, [amount]);

  const presets = [500, 1000, 2000, 5000];

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background elements */}
      <div className="mesh-bg" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stage === "amount" && (
          <motion.div
            key="amount-stage"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-3xl p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-50" />

              <div className="flex justify-between items-start">
                <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <Wallet className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secure Transaction
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Send Money to <span className="text-indigo-400">Oluwabukunmi</span>
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Send money to your little prince 💖🕺
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    placeholder="500"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-12 pr-6 text-3xl font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>

                <div className="flex gap-2">
                  {presets.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                        amount === val
                          ? "bg-indigo-500 border-indigo-400 text-white"
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      ₦{val}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleamount}
                disabled={amount <= 0}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
              >
                Send Now
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </button>

            </div>
          </motion.div>
        )}

        {stage === "name" && (
          <motion.div
            key="name-stage"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-3xl p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50" />

              <div className="flex justify-between items-start">
                <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <User2 className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
                  Sender Details
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Almost there!
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tell us who is sending this gift so we can notify the prince.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="text"
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>

                <div className="relative group">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="email"
                    value={info.email}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              <PayButton email={info.email} amount={amount} name={info.name} setStage={setStage} setReference={setReference} />

              <button
                onClick={() => setStage("amount")}
                className="w-full text-slate-500 text-sm hover:text-slate-400 transition-colors font-medium"
              >
                Go back to amount
              </button>
            </div>
          </motion.div>
        )}


        {stage === "processing" && (
          <motion.div
            key="processing-stage"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wallet className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Processing</h2>
              <p className="text-slate-400">Verifying transaction with bank...</p>
            </div>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div
            key="success-stage"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-3xl p-8 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white italic">Success!</h2>
                <p className="text-slate-400">
                  You {stage === "success" ? "successfully" : "failed to"} sent <span className="text-white font-bold">₦{amount}</span> to <span className="text-indigo-400 font-semibold">Oluwabukunmi</span>.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>TRANS-ID</span>
                  <span>TIME</span>
                </div>
                <div className="flex justify-between text-sm font-mono text-slate-300">
                  <span>{reference}</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>


              <button
                onClick={() => {
                  setStage("amount");
                  setAmount(amount * 2);
                }}
                className="w-full border border-white/10 hover:bg-white/5 text-white rounded-2xl py-4 font-semibold transition-all shadow-xl"
              >
                Send More
              </button>
            </div>
          </motion.div>
        )}

        {stage === "fail" && (
          <motion.div
            key="fail-stage"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-3xl p-8 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                >
                  <XCircle className="w-10 h-10 text-red-400" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white italic">Failed!</h2>
                <p className="text-slate-400">
                  You <span className="text-red-800 font-bold">failed</span>  to sent <span className="text-white font-bold">₦{amount}</span> to <span className="text-indigo-400 font-semibold">Oluwabukunmi</span>.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>TIME</span>
                </div>
                <div className="flex justify-between text-sm font-mono text-slate-300">
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setStage("amount");
                  setAmount(amount);
                }}
                className="w-full border border-white/10 hover:bg-white/5 text-white rounded-2xl py-4 font-semibold transition-all shadow-xl"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

