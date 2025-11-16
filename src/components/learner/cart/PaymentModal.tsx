interface PaymentModalProps {
  total: number;
  itemsCount: number;
  pin: string;
  onPinChange: (pin: string) => void;
  onConfirm: () => void;
  onClose: () => void;
  isProcessing: boolean;
  paymentSuccess: boolean;
}

export default function PaymentModal({
  total,
  itemsCount,
  pin,
  onPinChange,
  onConfirm,
  onClose,
  isProcessing,
  paymentSuccess
}: PaymentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
        {!paymentSuccess ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#094CA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Payment</h2>
              <p className="text-gray-600">Enter your 4-digit PIN to complete the purchase</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500">
                {itemsCount} {itemsCount === 1 ? 'course' : 'courses'}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => onPinChange(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2 text-center">Use your 4-digit PIN to complete the payment</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isProcessing || pin.length !== 4}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                  isProcessing || pin.length !== 4
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#094CA4' }}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Payment'
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Your courses have been added to your library</p>
          </div>
        )}
      </div>
    </div>
  );
}
