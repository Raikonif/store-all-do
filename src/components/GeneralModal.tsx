import { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title: string;
  modalRef: RefObject<HTMLDivElement>;
}

function GeneralModal({ children, isOpen, onClose, title, modalRef }: Props) {
  return (
    <div
      className={`${!isOpen && "hidden"} fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 outline-none focus:outline-none`}
    >
      <div className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={() => onClose(false)}></div>
      <div
        ref={modalRef}
        className="glass-card soft-entry relative mx-auto w-full max-w-3xl"
        tabIndex={-1}
      >
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between border-b border-white/20 p-5">
            <h3 className="font-semibold text-slate-100">{title}</h3>
            <button
              className="ml-auto rounded-md border border-white/15 bg-white/10 p-1 text-xl font-semibold leading-none text-slate-100 transition hover:bg-white/20"
              onClick={() => onClose(false)}
            >
              <span className="block h-6 w-6 text-center outline-none focus:outline-none">×</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default GeneralModal;
