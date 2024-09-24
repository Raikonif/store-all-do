import { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modalRef: RefObject<HTMLDivElement>;
}

function GeneralModal({ children, isOpen, onClose, title, modalRef }: Props) {
  return (
    <div
      className={`${!isOpen && "hidden"}fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none`}
    >
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div
        ref={modalRef}
        className="relative mx-auto my-6 w-auto max-w-3xl rounded-lg bg-white shadow-lg"
        tabIndex={-1}
      >
        <div className="flex w-full flex-col">
          <div className="flex items-start justify-between rounded-t border-b border-gray-200 p-5">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              className="ml-auto border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-gray-400 outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="block h-6 w-6 text-gray-400 outline-none focus:outline-none">×</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default GeneralModal;
