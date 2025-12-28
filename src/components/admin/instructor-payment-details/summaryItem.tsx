// src/components/payments/SummaryItem.tsx
export function SummaryItem({ label, value, note }: any) {
    return (
        <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 last:border-0">
            <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">{label}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
            {note && <p className="text-sm font-medium text-gray-800">{note}</p>}
        </div>
    );
}