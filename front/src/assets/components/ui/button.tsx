import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger";
}

export default function buttonn({ children, variant = "primary", className, ...props }: ButtonProps) {
    return (
        <>
            <button className={`button ${variant} ${className ?? ""}`} {...props}>{children}</button>
        </>
    )
}