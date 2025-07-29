"use client";
import { useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { type PutBlobResult } from "@vercel/blob";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import { Amenities } from "@prisma/client";
import { updateRoom } from "@/lib/action";
import clsx from "clsx";
import { RoomProps } from "@/types/room";
import { useEffect } from "react";
import SweetSuccess from "@/components/sweet-success";

const EditForm = ({ amenities, room }: { amenities: Amenities[]; room: RoomProps }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "put",
          body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message);
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${image}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {}
    });
  };

  const [state, formAction, isPending] = useActionState(updateRoom.bind(null, room.id, image), null);
  const checkAmenities = room.RoomAmenities.map((item) => item.amenitiesId);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
    }
  });

  return (
    <>
      <form action={formAction}>
        {/* General Message */}
        {state?.message ? (
          <div className="mb-4 bg-red-200 p-2">
            <span className="text-sm text-gray-700 mt-2">{state.message}</span>
          </div>
        ) : null}
        <div className="grid md:grid-cols-12 gap-5">
          <div className="col-span-6 md:col-span-8 bg-white p-4">
            <div className="mb-4">
              <input type="text" name="name" defaultValue={room.name} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Room Name" />
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">{state?.error?.name}</span>
              </div>
            </div>
            <div className="mb-4">
              <textarea name="description" defaultValue={room.description} className="py-2 px-4 rounded-sm border border-gray-400 w-full" rows={8} placeholder="Description" />
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">{state?.error?.description}</span>
              </div>
            </div>
            <div className="mb-4 grid md:grid-cols-3">
              {amenities.map((item) => (
                <div className="flex items-center mb-4" key={item.id}>
                  <input type="checkbox" id={`ameniti-${item.id}`} name="amenities" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" defaultValue={item.id} defaultChecked={checkAmenities.includes(item.id)} />
                  <label className="ms-2 text-sm font-medium text-gray-900 capitalize" htmlFor={`ameniti-${item.id}`}>
                    {item.name}
                  </label>
                </div>
              ))}
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">{state?.error?.amenities}</span>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 bg-white p-4">
            <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
              <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                {pending ? <BarLoader /> : null}
                {image ? (
                  <button type="button" onClick={() => deleteImage(image)} className="flex items-center justify-center bg-red-400 size-6 rounded-full absolute right-1 top-1 text-white hover:bg-red-400 cursor-pointer">
                    <IoCloseOutline className="size-4 text-white" />
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <IoCloudUploadOutline className="size-8" />
                    <p className="mb-1 text-sm font-bold">Select Image</p>
                    {message ? <p className="text-xs text-red-500">{message}</p> : <p>SVG, PNG, JPG, GIF, or Others (Max: 4MB)</p>}
                  </div>
                )}
              </div>
              {!image ? (
                <input type="file" ref={inputFileRef} onChange={handleUpload} id="input-file" className="hidden" />
              ) : (
                <Image src={image} alt="image" width={640} height={340} className="rounded-md absolute aspect-video object-cover" />
              )}
            </label>
            <div className="mb-4">
              <input type="text" name="capacity" defaultValue={room.capacity} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Capacity" />
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">{state?.error?.capacity}</span>
              </div>
            </div>
            <div className="mb-4">
              <input type="text" name="price" defaultValue={room.price} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Price" />
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">{state?.error?.price}</span>
              </div>
            </div>
            <button
              type="submit"
              className={clsx("bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer", {
                "opacity-50 cursor-progress": isPending,
              })}
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>

      {showSuccess && <SweetSuccess title="Update room" message="Update completed successfully. All changes have been applied" redirect="/admin/room" back="room" />}
    </>
  );
};

export default EditForm;
