"use client";
import { deleteRoom } from "@/lib/action";
import { useState } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import SweetSuccess from "@/components/sweet-success";
import Link from "next/link";

export const DeleteButton = ({ id, imageUrl }: { id: string; imageUrl: string }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const success = await deleteRoom(id, imageUrl);
      if (success) {
        setShowSuccess(true);
        setDeleting(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="p-1  cursor-pointer rounded-full hover:bg-red-500 hover:text-white">
        <IoTrashOutline className="size-5 " />
      </button>

      {/* Modal confirmation */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Delete Room
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete room? All of your data will be permanently removed. This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {showSuccess && <SweetSuccess title="Room delete" message="The room has been permanently removed from your account. All associated data and chat history have been deleted." redirect="/admin/room" back="room" />}
    </>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/admin/room/edit/${id}`}>
      <button className="p-1  cursor-pointer rounded-full hover:bg-blue-950 hover:text-white">
        <IoPencilOutline className="size-5" />
      </button>
    </Link>
  );
};
