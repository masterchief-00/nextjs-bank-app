"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authformSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (type == "sign-in") {
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
        // if (response) router.push("/");
      }

      if (type == "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold font-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 md:text-36 font-semibold text-gray-700">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      placeholder="Enter your first name"
                      label="First Name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      placeholder="Enter your last name"
                      label="Last Name"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address1"
                    placeholder="Enter your address"
                    label="Address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    placeholder="Enter your city"
                    label="City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      placeholder="Example: NY"
                      label="State"
                    />

                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      placeholder="Example: 11101"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                      label="Date of birth"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      placeholder="Example: 1234"
                      label="SSN"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
              <CustomInput
                control={form.control}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
              <div className="flex flex-col gap-4">
                <Button disabled={loading} type="submit" className="form-btn">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm;
