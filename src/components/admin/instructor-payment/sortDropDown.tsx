import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";


export function SortDropdown() {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">Sort By:</span>
            <Button
                variant="outline"
                className="rounded-xl border border-black/20 flex items-center gap-1 text-sm"
            >
                Highest Due <ChevronDown size={16} />
            </Button>
        </div>
    );
}