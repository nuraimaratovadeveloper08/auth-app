import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "py-2 px-4 rounded-md text-white shadow focus:ring-2 focus:ring-blue-400",
    {
        variants: {
            variant: {
                default: "bg-blue-500 hover:bg-blue-600",
                destructive: "bg-red-500 hover:bg-red-600",
            },
            size: {
                small: "text-sm",
                medium: "text-base",
                large: "text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "medium",
        },
    }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

export const Button: React.FC<ButtonProps> = ({ className, variant, size, ...props }) => {
    return (
        <button
            {...props}
            className={buttonVariants({ variant, size }) + " " + className}
        >
            {props.children}
        </button>
    );
};
