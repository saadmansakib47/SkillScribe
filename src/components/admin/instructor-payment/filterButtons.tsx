import { Button } from "@/components/ui/button";


export function FilterButtons() {
    const types = ["All", "Has Due", "Fully Paid", "Partial Paid"];
    return (
        <div className="flex items-center gap-2">
            {types.map((t) => (
                <Button
                    key={t}
                    variant="outline"
                    className="rounded-xl border border-black/20 text-sm"
                >
                    {t}
                </Button>
            ))}
        </div>
    );
}