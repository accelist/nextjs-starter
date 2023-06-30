import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}
const buttonStyle = "text-white font-bold py-2 px-4 rounded";

const defaultColor = "bg-gray-500 hover:bg-gray-700 ";
const primaryColor = "bg-blue-500 hover:bg-blue-700 ";
const cancelColor = "bg-red-500 hover:bg-red-700 ";

const disabledButton = " opacity-50 cursor-not-allowed";

export const AButton: React.FC<ButtonProps> = (
    props
) => {
    let className: string;
    if (props.type === "reset") {
        className = cancelColor + buttonStyle + (props.disabled ? disabledButton : "")
    }
    else if (props.type == "submit") {
        className = primaryColor + buttonStyle + (props.disabled ? disabledButton : "")
    }
    else {
        className = defaultColor + buttonStyle + (props.disabled ? disabledButton : "")
    }
    return (
        <button {...props} className={className}>
            {props.text}
        </button>
    )
}