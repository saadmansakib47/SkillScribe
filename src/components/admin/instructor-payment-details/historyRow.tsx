// src/components/payments/HistoryRow.tsx
export function HistoryRow({ title, date, amount, status }: any) {
    return (
        <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
            <div>
                <p className="font-medium text-gray-700">{title}</p>
                <p className="text-xs text-gray-500">{date}</p>
            </div>
            <p className="font-semibold text-gray-700">{amount}</p>
            <p className={`text-xs ${status === "Pending" ? "text-red-500" : "text-green-600"}`}>
                {status}
            </p>
        </div>
    );
}