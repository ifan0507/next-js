import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";

const SweetSuccess = ({ title, message, redirect, back }: { title: string; message: string; redirect: string; back: string }) => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-6 pt-8 pb-4">
              <div className="text-center">
                {/* Success Icon */}
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 mb-6">
                  <svg className="size-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Title */}
                <DialogTitle as="h3" className="text-xl font-semibold text-gray-900 mb-4">
                  {title} successful
                </DialogTitle>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="px-6 pb-6">
              <Link href={redirect}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  Go to back {back}
                </button>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SweetSuccess;
