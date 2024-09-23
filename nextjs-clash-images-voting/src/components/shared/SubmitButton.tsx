import { Button } from "../ui/button";

export default function SubmitButton({
    pending,
    text,
}: {
    pending: boolean;
    text: string;
}) {
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Loading..." : text}
        </Button>
    );
}
