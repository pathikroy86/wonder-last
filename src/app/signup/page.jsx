"use client"
import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { Button, Card, CardHeader, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SignupPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            image: user.imageurl,
            password: user.password,
        })
        if (data) {
            toast.success("Successfully logged In.");
            redirect('/');
        }
        if (error) {
            toast.error(error)
        }
    }

    const handleGoogleSignup = async () => {
        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            })

            if (result?.error) {
                if (result.error.code === "account_not_linked") {
                    toast.info("Account already exists. Redirecting to sign in...");
                    setTimeout(() => redirect('/signin'), 1500);
                    return;
                }
                toast.error(result.error.message || "Google sign-up failed");
                return;
            }

            if (result?.data) {
                toast.success("Successfully signed up!");
                redirect('/');
            }
        } catch (err) {
            console.error("Google signup error:", err);
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
                    <TextField isRequired className="w-full" name="name">
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" />
                    </TextField>
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
                    <TextField name="imageurl" type="url">
                        <Label>Image Url</Label>
                        <Input placeholder="https://example.com" />
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
                        <Button fullWidth type="submit" className="rounded bg-cyan-500">
                            <Check />
                            Register
                        </Button>
                        <Link href={'/signin'}>
                            <Button fullWidth variant="secondary" className="rounded">
                                I already have an account
                            </Button>
                        </Link>
                    </div>
                </Form>
                <div className="flex justify-center items-center gap-3">
                    <Separator />
                    <div className="whitespace-nowrap">Or Sign up with</div>
                    <Separator />
                </div>
                <Button fullWidth variant="outline" className="rounded" onClick={handleGoogleSignup}>
                    <FcGoogle /> Google
                </Button>
            </Card>
        </div>

    );
};

export default SignupPage;