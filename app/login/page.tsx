import { noAuth } from "@/components/noAuth";
import { redirect } from "next/navigation";

export default async function Login() {
    const auth = await noAuth();
    if (auth) redirect("/");

    return (
        <div data-theme="mytheme">
            <form
                method="POST"
                action="/api/login"
                className="flex flex-col gap-4 max-w-lg p-4 mx-auto"
            >
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    name="username"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    name="password"
                    required
                />
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Remember me</span>
                        <input
                            type="checkbox"
                            name="remember"
                            className="toggle toggle-primary"
                        />
                    </label>
                </div>
                <a className="link" href="/forgot-password">
                    Forgot Password?
                </a>
                <button className="btn btn-primary w-full" type="submit">
                    Log In
                </button>
                <p>
                    Don&apos;t have an account?{" "}
                    <a className="link" href="/signup">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
}
