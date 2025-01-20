import { GetServerSideProps } from "next";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof schema>;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.token || null;

    if (token) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return { props: {} };
};

export default function AuthPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation(
        async (data: LoginFormData) => {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            return response.json();
        },
        {
            onError: (error: { message: string }) => {
                if (error.message.includes("username")) {
                    setError("username", { message: "Invalid username" });
                }
                if (error.message.includes("password")) {
                    setError("password", { message: "Incorrect password" });
                }
            },
            onSuccess: () => {
                alert("Login successful!");
                window.location.reload();
            },
        }
    );

    const onSubmit = async (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <Input
                            id="username"
                            placeholder="Enter your username"
                            {...register("username")}
                            error={!!errors.username}
                        />
                        {errors.username && (
                            <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                            error={!!errors.password}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <Button type="submit" disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                {mutation.isError && (
                    <p className="text-red-500 text-sm mt-4 text-center">
                        {mutation.error instanceof Error ? mutation.error.message : "An error occurred"}
                    </p>
                )}
            </div>
        </div>
    );
}
