import { noAuth } from "@/components/noAuth";
import { redirect } from "next/navigation";

export default async function Login({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const auth = await noAuth();
    if (auth) redirect("/");

    const token = searchParams?.["token"] ?? "";

    return (
        <div data-theme="mytheme">
            <form
                method="POST"
                action="/api/reset-password"
                className="flex flex-col gap-4 max-w-lg p-4 mx-auto"
            >
                <h1 className="text-3xl font-bold text-center">
                    Password Recovery - Step 2
                </h1>
                <input
                    type="password"
                    placeholder="New Password"
                    className="input input-bordered w-full"
                    name="pass"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                    name="cpass"
                    required
                />
                <input
                    type="hidden"
                    name="token"
                    value={token}
                    className="input input-bordered w-full"
                    required
                />
                <button className="btn btn-primary w-full" type="submit">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}
