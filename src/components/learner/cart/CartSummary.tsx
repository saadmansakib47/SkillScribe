interface CartSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ subtotal, discount, total, onCheckout }: CartSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
      
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

      <button
        onClick={onCheckout}
        className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
        style={{ backgroundColor: '#094CA4' }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
