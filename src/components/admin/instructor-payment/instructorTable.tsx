import { InstructorRow } from "@/components/admin/instructor-payment/instructorRow";


export function InstructorTable({ instructors }: any) {
    return (
        <div className="bg-white rounded-xl border border-black/10 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-black/10 text-lg font-semibold">Instructor List</div>
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-[#F1F5F9] text-gray-700">
                        <th className="p-3">Instructor Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Courses</th>
                        <th className="p-3">Total Paid</th>
                        <th className="p-3">Total Due</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map((ins: any, i: number) => (
                        <InstructorRow key={i} ins={ins} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}