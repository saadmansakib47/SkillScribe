interface BillingFormProps {
  formData: {
    name: string;
    country: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export default function BillingForm({ formData, onFormChange }: BillingFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Billing Information */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Billing Information</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={formData.country}
            onChange={(e) => onFormChange('country', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select your country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="BD">Bangladesh</option>
            <option value="IN">India</option>
          </select>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Payment Method</h3>
        
        <div className="border border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="#094CA4" strokeWidth="2"/>
              <path d="M2 10h20" stroke="#094CA4" strokeWidth="2"/>
            </svg>
            <span className="font-medium">Card</span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => onFormChange('cardNumber', e.target.value)}
                placeholder="1234 1234 1234 1234"
                maxLength={19}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <svg width="32" height="20" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#1434CB"/>
                  <circle cx="18" cy="16" r="8" fill="#EB001B"/>
                  <circle cx="30" cy="16" r="8" fill="#FF5F00"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                value={formData.expirationDate}
                onChange={(e) => onFormChange('expirationDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Code
              </label>
              <input
                type="text"
                value={formData.securityCode}
                onChange={(e) => onFormChange('securityCode', e.target.value)}
                placeholder="CVC"
                maxLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            By providing your card information, you allow SkillScribe, Inc to charge your card for future payments in accordance with their terms.
          </p>
        </div>
      </div>
    </div>
  );
}
