import Link from 'next/link';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  isFormValid: boolean;
  onProceed: () => void;
}

export default function OrderSummary({ subtotal, discount, total, isFormValid, onProceed }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">SubTotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-semibold">${discount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        By completing your purchase, you agree to these{' '}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Use
        </Link>
        .
      </p>

      <button
        onClick={onProceed}
        disabled={!isFormValid}
        className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
          isFormValid 
            ? 'hover:opacity-90 cursor-pointer' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        style={{ backgroundColor: '#094CA4' }}
      >
        Proceed
      </button>
    </div>
  );
}
