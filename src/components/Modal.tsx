import { X } from "lucide-react";

type ModalProps = {
  title: string;
  onModalDismiss?: () => void;
} & React.PropsWithChildren;

export default function Modal({
  title: name,
  onModalDismiss = () => {
    return;
  },
  children,
}: ModalProps) {
  return (
    <div className="z-10 fixed inset-0 bg-neutral-950/[0.15] flex items-start justify-center text-black backdrop-blur-sm">
      <div className="flex flex-col w-96 bg-white mt-16 border border-neutral-300">
        <div className="flex justify-between items-center px-6 py-4">
          <span className="font-semibold text-lg">{name}</span>
          <X className="cursor-pointer" onClick={onModalDismiss} />
        </div>
        <div className="w-full bg-neutral-200 h-[1px]" />
        {children}
      </div>
    </div>
  );
}
