// src/components/payments/CourseCard.tsx
import { Card, CardContent } from "@/components/ui/card";


export function CourseCard({ title, students, rating, earned, paid, due }: any) {
    return (
        <Card className="border border-gray-300 rounded-xl shadow-sm bg-white">
            <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-md" />
                    <div>
                        <h3 className="font-semibold text-gray-800">{title}</h3>
                        <p className="text-xs text-gray-500">
                            Students: {students} · Rating: {rating} · Started in Jan 24, 2024
                        </p>
                    </div>
                </div>


                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <p className="text-xs text-gray-500">Total Earned</p>
                        <p className="font-semibold text-gray-700">{earned}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <p className="text-xs text-gray-500">Total Paid</p>
                        <p className="font-semibold text-gray-700">{paid}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <p className="text-xs text-gray-500">Amount Due</p>
                        <p className="font-semibold text-gray-700">{due}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}