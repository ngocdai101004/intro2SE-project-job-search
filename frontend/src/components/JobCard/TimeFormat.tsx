import React from "react";

interface TimeFormatProps {
  date: Date;
}

const TimeFormat: React.FC<TimeFormatProps> = ({ date }) => {
  const getTimeFormat = (date: Date) => {
    const createdDate = new Date(date);
    const now = new Date();
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else {
      return `${diffInHours} hours ago`;
    }
  };

  return <>{getTimeFormat(date)}</>;
};

export default TimeFormat;
