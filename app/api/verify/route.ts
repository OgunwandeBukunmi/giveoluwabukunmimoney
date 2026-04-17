import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { reference } = await req.json();

        if (!reference) {
            return NextResponse.json(
                { success: false, message: "No reference provided" },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const data = await response.json();

        const transaction = data.data;

        // 🔍 IMPORTANT VALIDATION
        if (transaction.status === "success") {
            return NextResponse.json({
                success: true,
                message: "Payment verified",
                reference: transaction.reference,
                data: {
                    amount: transaction.amount / 100,
                    email: transaction.customer.email,
                    reference: transaction.reference,
                },
            });
        }

        return NextResponse.json({
            success: false,
            reference: transaction.reference,
            message: "Payment not successful",
        });
    } catch (error) {
        console.error("Verification error:", error);

        return NextResponse.json(
            { success: false, message: "Verification failed" },
            { status: 500 }
        );
    }
}