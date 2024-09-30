import { Clash } from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ClashMenuBar from "./ClashMenuBar";
import Link from "next/link";

export default function ClashCard({ clash }: { clash: Clash }) {
    return (
        <Card className="bg-gray-50">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{clash.title}</CardTitle>
                <ClashMenuBar clash={clash} />
            </CardHeader>
            <CardContent>
                <Image
                    src={clash.image}
                    width={150}
                    height={150}
                    alt="Clash Image"
                    className="rounded-md w-full object-contain"
                />
                <CardDescription>{clash.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/clash/items/${clash.id}`}>
                    <Button>See Clash</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
