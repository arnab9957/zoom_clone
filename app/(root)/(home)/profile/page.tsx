"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"; // Assuming this hook exists based on toaster in layout
import { updateUserProfile } from "@/actions/user.actions";
import Loader from "@/components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dateOfBirth: z.date().optional(),
});

const Profile = () => {
    const { user, isLoaded } = useUser();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: undefined,
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                dateOfBirth: user.publicMetadata.dateOfBirth
                    ? new Date(user.publicMetadata.dateOfBirth as string)
                    : undefined,
            });
        }
    }, [user, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            await updateUserProfile({
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirth?.toISOString(),
            });
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) return <Loader />;

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <h1 className="text-3xl font-bold">Profile</h1>

            <div className="w-full max-w-[520px] rounded-[20px] bg-dark-1 p-6 sm:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="space-y-3.5">
                                    <FormLabel className="text-base font-semibold text-gray-200">First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-dark-3 border-none focus-visible:ring-1 focus-visible:ring-blue-500 text-white h-12 placeholder:text-gray-500"
                                            placeholder="John"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="space-y-3.5">
                                    <FormLabel className="text-base font-semibold text-gray-200">Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-dark-3 border-none focus-visible:ring-1 focus-visible:ring-blue-500 text-white h-12 placeholder:text-gray-500"
                                            placeholder="Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3.5">
                            <FormLabel className="text-base font-semibold text-gray-200">Email</FormLabel>
                            <Input
                                disabled
                                className="bg-dark-3 border-none focus-visible:ring-1 focus-visible:ring-blue-500 text-gray-400 cursor-not-allowed h-12"
                                value={user?.primaryEmailAddress?.emailAddress || ""}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-3.5">
                                    <FormLabel className="text-base font-semibold text-gray-200">Date of Birth</FormLabel>
                                    <FormControl>
                                        <div className="flex w-full rounded-md bg-dark-3 border border-dark-3 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden h-12">
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date: Date | null) => field.onChange(date)}
                                                dateFormat="MM/dd/yyyy"
                                                className="w-full h-full bg-transparent p-3 text-white placeholder:text-gray-500 focus:outline-none cursor-pointer"
                                                placeholderText="Select Date"
                                                showYearDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={100}
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-blue-1" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
};

export default Profile;
