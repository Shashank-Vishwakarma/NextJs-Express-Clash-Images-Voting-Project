import AddClashItems from "@/components/specific/clash/AddClashItems";
import ViewClashItems from "@/components/specific/clash/ViewClashItems";
import { fetchClashById } from "@/fetch/fetchClashById";
import React from "react";

export default async function ClashItemPage({
    params,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    params: { id: string };
}) {
    const { clash } = await fetchClashById(params.id as string);

    return (
        <>
            {clash?.clashItem && clash.clashItem.length > 0 ? (
                <ViewClashItems clash={clash} />
            ) : (
                <AddClashItems id={params.id as string} clashData={clash} />
            )}
        </>
    );
}
