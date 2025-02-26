import React from "react";
export type FilterStatus = "All" | "Completed" | "Pending";

interface FilterButtonsProps {
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = React.memo(({ filter, setFilter }) => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      {(["All", "Completed", "Pending"] as const).map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          aria-pressed={filter === status}
          className={`px-4 py-2 rounded-md border border-[var(--border-gray)] text-[var(--black)]
            ${filter === status ? "bg-[var(--green)] border-[var(--green)]" : "bg-[var(--grey)]"}`}
        >
          {status}
        </button>
      ))}
    </div>
  );
});

FilterButtons.displayName = "FilterButtons";
export default FilterButtons;