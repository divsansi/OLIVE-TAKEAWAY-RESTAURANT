import { noAuth } from "@/components/noAuth";
import { redirect } from "next/navigation";

export default async function Login() {
    const auth = await noAuth();
    if (auth) redirect("/");

    return (
        <div data-theme="mytheme">
            <form
                method="POST"
                action="/api/send-reset-link"
                className="flex flex-col gap-4 max-w-lg p-4 mx-auto"
            >
                <h1 className="text-3xl font-bold text-center">
                    Password Recovery
                </h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    name="username"
                    required
                />
                <button className="btn btn-primary w-full" type="submit">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}
