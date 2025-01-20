import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
    "w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    {
        variants: {
            error: {
                true: "border-red-500",
                false: "border-gray-300",
            },
        },
        defaultVariants: {
            error: false,
        },
    }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <input
                {...props}
                ref={ref}
                className={inputVariants({ error }) + " " + className}
            />
        );
    }
);

Input.displayName = "Input";
