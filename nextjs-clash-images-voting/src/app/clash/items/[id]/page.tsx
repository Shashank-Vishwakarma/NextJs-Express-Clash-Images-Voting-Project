import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/specific/clash/AddClashItems";
import { fetchClashById } from "@/fetch/fetchClashById";
import React from "react";

export default async function ClashItemPage({
    setOpen,
    params,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    params: { id: string };
}) {
    const { clash } = await fetchClashById(params.id as string);

    return (
        <>
            <Navbar setOpen={setOpen} />
            <div className="flex justify-center items-center flex-col m-4">
                <h1 className="font-bold text-2xl">{clash?.title}</h1>
                <p>{clash?.description}</p>
            </div>

            {clash?.clashItem && clash.clashItem.length > 0 ? (
                <AddClashItems id={params.id as string} clashData={clash} />
            ) : (
                <>Hold on</>
            )}
        </>
    );
}
