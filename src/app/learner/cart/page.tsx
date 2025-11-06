"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../../contexts/CartContext';
import { COURSES } from '../../../lib/courses';

type TabType = 'cart' | 'billing';

export default function ShoppingCartPage() {
  const { items, removeFromCart, subtotal, discount, total, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<TabType>('cart');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get some recommended courses (courses not in cart)
  const recommendedCourses = COURSES.filter(
    course => !items.some(item => item.course.id === course.id)
  ).slice(0, 3);

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open payment confirmation modal
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    if (pin.length !== 4) {
      alert('Please enter a 4-digit PIN');
      return;
    }

    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // After showing success, clear cart and close modal
      setTimeout(() => {
        clearCart();
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        setPin('');
        setActiveTab('cart');
      }, 2000);
    }, 1500);
  };

  const handleCloseModal = () => {
    if (!isProcessing) {
      setShowPaymentModal(false);
      setPin('');
      setPaymentSuccess(false);
    }
  };

  // Check if all form fields are filled
  const isFormValid = formData.name.trim() !== '' && 
                      formData.country !== '' && 
                      formData.cardNumber.trim() !== '' && 
                      formData.expirationDate.trim() !== '' && 
                      formData.securityCode.trim() !== '';

  if (activeTab === 'billing' as TabType) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F3' }}>
        {/* Tab Navigation */}
        <div style={{ backgroundColor: '#FAF7F3' }} className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('cart')}
                className="py-4 px-2 border-b-2 font-medium text-gray-500 border-transparent hover:text-gray-700"
              >
                Shopping Cart
              </button>
              <button className="py-4 px-2 border-b-2 font-medium text-blue-600 border-blue-600">
                Billing Information
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, securityCode: e.target.value })}
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
                </form>
              </div>
            </div>

            {/* Order Details */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map(({ course }) => (
                    <div key={course.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <p className="text-xs text-gray-600">{course.instructorName}</p>
                      </div>
                      <span className="font-semibold">${course.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

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
                  onClick={handleSubmit}
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
            </div>
          </div>
        </div>

        {/* Payment Confirmation Modal */}
        {showPaymentModal && (
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
                      {items.length} {items.length === 1 ? 'course' : 'courses'}
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
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">Use your 4-digit PIN to complete the payment</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseModal}
                      disabled={isProcessing}
                      className="flex-1 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePaymentConfirm}
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
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F3' }}>
      {/* Tab Navigation */}
      <div style={{ backgroundColor: '#FAF7F3' }} className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('cart')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'cart'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Shopping Cart
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'billing'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Billing Information
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-gray-400">
              <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Browse our courses and add some to your cart!</p>
            <Link
              href="/learner/allcourses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all"
              style={{ backgroundColor: '#094CA4' }}
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h2 className="text-xl font-semibold">Course & Instructor</h2>
                <h2 className="text-xl font-semibold">Price</h2>
              </div>

              <div className="space-y-4">
                {items.map(({ course }) => (
                  <div key={course.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.instructorName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900">${course.price.toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(course.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove from cart"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {recommendedCourses.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Recommendation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative w-full h-40">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-center">{course.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Cart Totals */}
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
                onClick={() => setActiveTab('billing')}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#094CA4' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
