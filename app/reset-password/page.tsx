"use client";
import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const messageParam = searchParams.get("message");
    const message = messageParam ? (JSON.parse(messageParam) as Message) : "message";
    return (
        <form
            className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto"
            action={resetPasswordAction}
        >
            <h1 className="text-2xl font-medium text-white">Reset Password</h1>

            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 text-white">
                <Label htmlFor="password">New Password</Label>
                <Input type="password" name="password" placeholder="Enter new password" required />

                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirmPassword" placeholder="Confirm new password" required />

                <SubmitButton>Update Password</SubmitButton>
                {/* <FormMessage message={message} /> */}

            </div>
        </form>
    );
}
