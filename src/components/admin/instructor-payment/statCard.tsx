import React from "react";
import { Card, CardContent } from "@/components/ui/card";


export function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <Card className="shadow-sm rounded-xl border border-blue-800 bg-white cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
            <CardContent className="p-4 flex flex-col gap-1">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-2xl font-semibold">{value}</span>
            </CardContent>
        </Card>
    );
}