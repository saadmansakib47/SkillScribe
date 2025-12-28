// src/components/payments/CourseCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "lucide-react";

export function CourseCard({ title, students, rating, earned, paid, due }: any) {
    return (
        <Card className="border border-gray-300 rounded-xl shadow-sm bg-white">
            <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Layout className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                        <div className="flex items-center gap-6 text-sm text-gray-500 mt-1">
                            <span>Students: {students}</span>
                            <span>Rating: {rating}</span>
                            <span>Started in: Jun 24, 2024</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 my-5"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Total Earned</p>
                        <p className="text-xl font-bold text-[#094CA4]">{earned}</p>
                    </div>
                    <div className="p-4 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                        <p className="text-xl font-bold text-[#094CA4]">{paid}</p>
                    </div>
                    <div className="p-4 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Amount Due</p>
                        <p className="text-xl font-bold text-[#094CA4]">{due}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}