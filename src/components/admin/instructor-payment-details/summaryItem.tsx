// src/components/payments/SummaryItem.tsx
export function SummaryItem({ label, value, note }: any) {
    return (
        <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <span className="text-gray-600 text-sm font-medium">{label}</span>
            <div className="text-right">
                <p className="font-semibold text-gray-800">{value}</p>
                {note && <p className="text-xs text-gray-500">{note}</p>}
            </div>
        </div>
    );
}