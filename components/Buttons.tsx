import React, { MouseEventHandler } from 'react';

interface Props {
    text: string,
    disabled?: boolean,
    type: string,
    onClicked?: MouseEventHandler
}
const buttonStyle = "text-white font-bold py-2 px-4 rounded";

const defaultColor = "bg-gray-500 hover:bg-gray-700 ";
const primaryColor = "bg-blue-500 hover:bg-blue-700 ";
const cancelColor = "bg-red-500 hover:bg-red-700 ";

const disabledButton = " opacity-50 cursor-not-allowed";

export const ButtonComponent: React.FC<Props> = ({
    text,
    disabled = false,
    type,
    onClicked
}) => {
    let className: string;
    if (type === "cancel") {
        className = cancelColor + buttonStyle + (disabled ? disabledButton : "")
    }
    else if (type == "primary") {
        className = primaryColor + buttonStyle + (disabled ? disabledButton : "")
    }
    else {
        className = defaultColor + buttonStyle + (disabled ? disabledButton : "")
    }
    return (
        <button className={className} onClick={disabled ? () => {return} : onClicked}>
            {text}
        </button>
    )
}