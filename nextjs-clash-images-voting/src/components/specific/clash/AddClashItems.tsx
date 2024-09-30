"use client";

import { Clash } from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
// import { fetchClashById } from "@/fetch/fetchClashById";
import axios, { AxiosResponse } from "axios";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AddClashItems({
    id,
    clashData,
}: {
    id: string;
    clashData: Clash | null;
}) {
    const router = useRouter();

    const [image1, setImage1] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const image1Ref = useRef<HTMLInputElement>(null);
    const image2Ref = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    const [_, setOpen] = useState(false);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // useEffect(() => {
    //     const fetchClashData = async () => {
    //         const clash = await fetchClashById(id as string);
    //         if (clash.clash) {
    //             setClashData(clash.clash);
    //         } else {
    //             setClashData(null);
    //         }
    //     };

    //     fetchClashData();
    // }, []);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("clashId", id as string);
        formData.append("images", image1 as File);
        formData.append("images", image2 as File);

        setLoading(true);

        try {
            const response: AxiosResponse = await axios.post(
                `http://localhost:5000/api/v1/clash/items`,
                formData,
                { withCredentials: true }
            );

            if (response.data?.error) {
                console.log(response.data.error);
                toast.error(response.data.error);
            } else {
                console.log(response.data);
                setLoading(false);
                toast.success("Clash item created successfully");

                router.replace("/dashboard");
            }
        } catch (error) {
            console.log("Error in ClashItemPage: handleSubmit: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center p-10">
                <div className="flex flex-row items-center justify-around">
                    <div
                        className="relative border rounded-lg w-96 h-72 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                            image1Ref.current && image1Ref.current.click()
                        }>
                        {image1 ? (
                            <Image
                                src={URL.createObjectURL(image1)}
                                width={500}
                                height={500}
                                alt="Image 1"
                                className="absolute object-cover w-fit h-full rounded-md"
                            />
                        ) : clashData?.clashItem.at(0)?.image ? (
                            <Image
                                src={
                                    clashData?.clashItem.at(0)?.image as string
                                }
                                width={500}
                                height={500}
                                alt="Image 1"
                                className="absolute object-cover w-fit h-full rounded-md"
                            />
                        ) : (
                            <>
                                <Upload />
                                <span className="ml-3">Upload Image</span>
                            </>
                        )}
                    </div>
                    <input
                        ref={image1Ref}
                        hidden
                        type="file"
                        onChange={(e) => handleImageChange(e, setImage1)}
                    />

                    <div className="font-bold text-3xl">VS</div>

                    <div
                        className="relative border rounded-lg w-96 h-72 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                            image2Ref.current && image2Ref.current.click()
                        }>
                        {image2 ? (
                            <Image
                                src={URL.createObjectURL(image2)}
                                width={500}
                                height={500}
                                alt="Image 2"
                                className="absolute object-cover w-full h-full rounded-md"
                            />
                        ) : clashData?.clashItem?.at(1)?.image ? (
                            <Image
                                src={
                                    clashData?.clashItem.at(1)?.image as string
                                }
                                width={500}
                                height={500}
                                alt="Image 2"
                                className="absolute object-cover w-full h-full rounded-md"
                            />
                        ) : (
                            <>
                                <Upload />
                                <span className="ml-3">Upload Image</span>
                            </>
                        )}
                    </div>
                    <input
                        ref={image2Ref}
                        hidden
                        type="file"
                        onChange={(e) => handleImageChange(e, setImage2)}
                    />
                </div>

                <div className="w-full flex justify-center mt-10">
                    <Button className="w-40" onClick={handleSubmit}>
                        {loading ? "Processing..." : "Submit"}
                    </Button>
                </div>
            </div>
        </>
    );
}
