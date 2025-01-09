import React from 'react';
import { ISortStatus } from './Home';

export interface SortBarProps {
    sortStatus: ISortStatus;
    setSortStatus: (sortStatus: ISortStatus) => void;
}

const SortBar: React.FC<SortBarProps> = ({ sortStatus, setSortStatus }) => {
    const handleSortChange = (sortType: string) => {
        const newSortStatus = { ...sortStatus };
        if (sortType === "relavant") {
            newSortStatus.sortByRelavant = newSortStatus.sortByRelavant === "asc" ? "desc" : "asc";
            newSortStatus.sortByDate = "";
            newSortStatus.sortBySalary = "";
        } else if (sortType === "date posted") {
            newSortStatus.sortByDate = newSortStatus.sortByDate === "asc" ? "desc" : "asc";
            newSortStatus.sortByRelavant = "";
            newSortStatus.sortBySalary = "";
        } else if (sortType === "salary") {
            newSortStatus.sortBySalary = newSortStatus.sortBySalary === "asc" ? "desc" : "asc";
            newSortStatus.sortByRelavant = "";
            newSortStatus.sortByDate = "";
        }
        setSortStatus(newSortStatus);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'end', margin: '0 50px 00px 100px' }}>
            <div
                key={"relavant"}
                onClick={() => handleSortChange("relavant")}
                style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    fontWeight: sortStatus.sortByRelavant !== "" ? "bold" : "normal",
                }}
            >
                {"relavant"}
                {sortStatus.sortByRelavant !== "" && (
                    <span> {" ↑" }</span>
                )}
            </div>
            <div
                key={"date posted"}
                onClick={() => handleSortChange("date posted")}
                style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    fontWeight: sortStatus.sortByDate !== "" ? "bold" : "normal",
                }}
            >
                {"date posted"}
                {sortStatus.sortByDate !== "" && (
                    <span>{sortStatus.sortByDate === "asc" ? " ↑" : " ↓"}</span>
                )}
            </div>
            <div
                key={"salary"}
                onClick={() => handleSortChange("salary")}
                style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    fontWeight: sortStatus.sortBySalary !== "" ? "bold" : "normal",
                }}
            >
                {"salary"}
                {sortStatus.sortBySalary !== "" && (
                    <span>{sortStatus.sortBySalary === "asc" ? " ↑" : " ↓"}</span>
                )}
            </div>
        </div>
    );
};

export default SortBar;