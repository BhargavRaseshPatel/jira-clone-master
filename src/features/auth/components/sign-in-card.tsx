"use client"
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { loginSchema } from "../schemas"
import { useLogin } from "../api/use-login"

export const SignInCard = () => {
    const { mutate, isPending } = useLogin()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values)
        mutate({json: values})
    }

    return (
        <Card className="w-full p-4 h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center">
                <CardTitle className="text-2xl">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <div className="px-7 mb-2">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField name="email" control={form.control} render={({ field }) => (
                            <FormItem><FormControl><Input {...field} type="email" placeholder="Enter your email" /></FormControl><FormMessage /></FormItem>
                        )} />

                        <FormField name="password" control={form.control} render={({ field }) => (
                            <FormItem><FormControl><Input {...field} type="password" placeholder="Enter password" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button disabled={isPending} size="lg" className="w-full">Login</Button>
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
                <p>Don't have an account? 
                    <Link href='/sign-up'><span className="text-blue-700"> Sign Up</span></Link>
                </p>
            </CardContent>
        </Card>
    )
}