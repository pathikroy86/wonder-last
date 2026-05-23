"use client"
import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { Button, Card, CardHeader, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const SigninPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        })
        if (data) {
            toast.success("Successfully logged In.")
            console.log(data)
            redirect('/');
        }
        if (error) {
            toast.error(error)
        }
    }

    const handleGoogleSignin = async () => {
        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            })

            if (result?.error) {
                if (result.error.code === "account_not_linked") {
                    toast.warning("This email is linked to a password account. Please sign in with your password first.");
                    return;
                }
                toast.error(result.error.message || "Google sign-in failed");
                return;
            }

            if (result?.data) {
                toast.success("Successfully signed in!");
                redirect('/');
            }
        } catch (err) {
            console.error("Google signin error:", err);
            toast.error("An unexpected error occurred");
        }
    }
    return (
        <div className="p-10 mx-auto">
            <Card className="p-10">
                <CardHeader>
                    <h1 className="text-2xl font-semibold text-cyan-500 text-center mb-5">Get Started on Wonderlast</h1>
                </CardHeader>
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex flex-col gap-5">
                        <Button fullWidth type="submit" className="rounded">
                            <Check />
                            Login
                        </Button>
                        <p>Dont Have an account? <Link href={'/signup'} className="fonr-semibold">

                            Register Here

                        </Link></p>

                    </div>
                </Form>
                <div className="flex justify-center items-center gap-3">
                    <Separator />
                    <div className="whitespace-nowrap">Or sign in with</div>
                    <Separator />
                </div>
                <Button fullWidth variant="outline" className="rounded" onClick={handleGoogleSignin}>
                    <FcGoogle /> Google
                </Button>
            </Card>
        </div>

    );
};

export default SigninPage;