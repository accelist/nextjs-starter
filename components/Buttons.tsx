import React from 'react';

/**
 * Button property
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    //add here for custom property or property that not included in HTMLButtonElement
}

/**
 * Default style for buttons using Tailwind CSS
 */
const buttonStyle = "text-white font-bold py-2 px-4 rounded";

const defaultColor = "bg-gray-500 hover:bg-gray-700 ";
const primaryColor = "bg-blue-500 hover:bg-blue-700 ";
const cancelColor = "bg-red-500 hover:bg-red-700 ";

const disabledButton = " opacity-50 cursor-not-allowed";

/**
 * Function for get button style
 * @param buttonType type for the button (reset | submit | cancel)
 * @param disabled is the button disabled (true | false)
 * @returns style for the button
 */
function getButtonClassNames(buttonType?: string, disabled?: boolean): string {
    let className: string;
    if (buttonType === "reset") {
        className = cancelColor + buttonStyle + (disabled ? disabledButton : "")
    }
    else if (buttonType == "submit") {
        className = primaryColor + buttonStyle + (disabled ? disabledButton : "")
    }
    else {
        className = defaultColor + buttonStyle + (disabled ? disabledButton : "")
    }
    return className;
}

export const AButton: React.FC<ButtonProps> = (
    props
) => {
    return (
        <button {...props} className={getButtonClassNames(props.type, props.disabled)}>
            {props.text}
        </button>
    )
}