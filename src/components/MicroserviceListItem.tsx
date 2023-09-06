import clsx from "clsx";
import { Microservice } from "../utils/types";

type MicroserviceListItemProps = {
  microservice: Microservice;
  isSelected: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export function MicroserviceListItem({
  microservice,
  isSelected,
  onClick,
}: MicroserviceListItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex justify-between pl-3 pr-4 py-2 rounded items-baseline text-sm border",
        isSelected
          ? "bg-neutral-50 border-neutral-200"
          : "text-neutral-600 border-transparent",
      )}
    >
      <span>{microservice.name}</span>
      <div
        className={clsx(
          "h-2 w-2 rounded-full",
          microservice.spawn ? "bg-green-500" : "bg-red-500",
        )}
      />
    </button>
  );
}
