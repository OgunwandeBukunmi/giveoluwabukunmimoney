"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
declare global {
    interface Window {
        PaystackPop: any;
    }
}

export default function PayButton({ email, amount, name, setStage, setReference }: { email: string, amount: number, name: string, setStage: (stage: "amount" | "name" | "processing" | "success" | "fail") => void, setReference: (reference: string) => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const pay = () => {
        setStage("processing")
        if (!window.PaystackPop) {
            alert("Paystack not loaded yet");
            return;
        }

        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // PUBLIC KEY ONLY
            email: email,
            amount: amount * 100,
            currency: "NGN",

            ref: "" + Math.floor(Math.random() * 1000000000 + 1),

            callback: function (response: any) {
                console.log("sent to Verify:", response.reference);

                // send to backend for verification
                verifyPayment(response.reference);
            },

            onClose: function () {
                setStage("fail")
            },
        });

        handler.openIframe();
    };

    const verifyPayment = async (reference: string) => {
        const res = await fetch("http://localhost:3001/api/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference }),
        });

        const data = await res.json();
        if (data.success) {
            setStage("success")
            setReference(data.reference)
        } else {
            setStage("fail")
        }
    };

    return (
        <button
            onClick={pay}
            disabled={!name || !email}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
        >
            Complete Payment
            <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
            >
                <ArrowRight className="w-5 h-5" />
            </motion.div>
        </button>
    );
}