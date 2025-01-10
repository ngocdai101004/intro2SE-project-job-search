import React from "react";
import {Card} from "react-bootstrap";

interface AnimatedCardProps {
    isHovered: boolean;
    isSelected: boolean;
    onClick: () => void;
    setIsHovered: (value: boolean) => void;
    children: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
                                                       isHovered,
                                                       isSelected,
                                                       onClick,
                                                       setIsHovered,
                                                       children,
                                                   }) => {
    return (
        <Card
            className="card mb-4 shadow-sm job-card"
    style={{
        cursor: "pointer",
            transition: "all 0.3s ease-in-out", // Smooth animation
            transform: isHovered ? "scale(1.02)" : "scale(1)", // Hover effect
            boxShadow: isHovered ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "", // Elevated shadow on hover
            backgroundColor: isSelected ? "#d8edfe" : "", // Selected background
            borderColor: isSelected ? "#007bff" : "", // Selected border
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={onClick}
        >
        {children}
        </Card>
);
};

export default AnimatedCard;
