// src/components/payments/HistoryRow.tsx
export function HistoryRow({ title, date, amount, status }: any) {
    const isPending = status === "Pending" || title.includes("Scheduled");

    return (
        <div className="flex justify-between items-start py-4 px-6 border-b border-gray-200 last:border-0">
            <div>
                <p className={`font-semibold text-base ${isPending ? 'text-[#F59E0B]' : 'text-black'}`}>
                    {title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {date}
                </p>
            </div>
            <p className={`font-medium text-sm ${isPending ? 'text-[#F59E0B]' : 'text-gray-900'}`}>
                {amount}
            </p>
        </div>
    );
}