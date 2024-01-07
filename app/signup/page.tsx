import { redirect } from "next/navigation";
import { noAuth } from "@/components/noAuth";

export default async function Signup() {
    const auth = await noAuth();
    if (auth) redirect("/");

    return (
        <div data-theme="mytheme">
            <form
                method="POST"
                action="/api/signup"
                className="flex flex-col gap-4 max-w-lg p-4 mx-auto"
            >
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                    required
                />

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">
                            Accept Terms and Conditions
                        </span>
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            className="toggle toggle-primary"
                            required
                        />
                    </label>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                    Sign Up
                </button>

                <p>
                    Already have an account?{" "}
                    <a className="link" href="/login">
                        Log In
                    </a>
                </p>
            </form>
        </div>
    );
}
