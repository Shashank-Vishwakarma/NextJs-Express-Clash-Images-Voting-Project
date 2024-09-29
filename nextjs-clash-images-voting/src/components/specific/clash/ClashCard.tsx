import { Clash } from "@/app/dashboard/page";

export default function ClashCard({ clash }: { clash: Clash }) {
    return <div>{clash.title}</div>;
}
