// CustomButton.jsx

type ButtonType = "button" | "submit" | "reset";

interface CustomButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
    type?: ButtonType;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       text = "My Button", // Default button text
                                                       onClick = () => {
                                                       }, // Default no-op function
                                                       className = "", // Additional classes
                                                       type = "button", // Button type (button, submit, reset)
                                                       disabled = false, // Disabled state
                                                   }) => {
    return (
        <button
            type={type}
            className={`custom-button ${className}`.trim()} // Combine custom and additional classes
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default CustomButton;