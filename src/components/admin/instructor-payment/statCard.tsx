import React from "react";
import { Card, CardContent } from "@/components/ui/card";


export function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <Card className="shadow-sm rounded-xl border border-black/10 bg-white">
            <CardContent className="p-4 flex flex-col gap-1">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-2xl font-semibold">{value}</span>
            </CardContent>
        </Card>
    );
}