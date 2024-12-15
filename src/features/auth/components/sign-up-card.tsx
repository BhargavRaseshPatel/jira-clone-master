'use client'
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { registerSchema } from "../schemas"
import { useRegister } from "../api/use-register"

export const SignUpCard = () => {
    const { mutate, isPending } = useRegister()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log({ values })
        mutate({ json: values })
    }

    return (
        <Card className="w-full p-4 h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center">
                <CardTitle className="text-2xl">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our {" "}
                    <Link href='/privacy'><span className="text-blue-700">Privacy Policy</span></Link>{" and "}
                    <Link href='/terms'><span className="text-blue-700">Terms of Service</span></Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7 mb-2">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField name="name" control={form.control} render={({ field }) => (
                            <FormItem><FormControl><Input {...field} type="text" placeholder="Enter your name" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField name="email" control={form.control} render={({ field }) => (
                            <FormItem><FormControl><Input {...field} type="email" placeholder="Enter your email" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField name="password" control={form.control} render={({ field }) => (
                            <FormItem><FormControl><Input {...field} type="password" placeholder="Enter your password" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button disabled={isPending} size="lg" className="w-full">Register</Button>
                    </form>
                </Form>
            </CardContent>

            <div className="p-4">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" className="w-full">Login with Google</Button>
                <Button variant="secondary" size="lg" className="w-full mt-4">Login with GitHub</Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex itemcenter justify-center">
                <p>Already have an account?
                    <Link href='/sign-in'><span className="text-blue-700"> Sign In</span></Link>
                </p>
            </CardContent>
        </Card>
    )
}