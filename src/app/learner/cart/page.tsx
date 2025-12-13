"use client";

import { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { COURSES } from '../../../lib/courses';
import CartItem from '@/components/learner/cart/CartItem';
import CartSummary from '@/components/learner/cart/CartSummary';
import BillingForm from '@/components/learner/cart/BillingForm';
import OrderSummary from '@/components/learner/cart/OrderSummary';
import OrderDetails from '@/components/learner/cart/OrderDetails';
import PaymentModal from '@/components/learner/cart/PaymentModal';
import RecommendedCourses from '@/components/learner/cart/RecommendedCourses';
import EmptyState from '@/components/learner/common/EmptyState';
import { Search } from 'lucide-react';

type TabType = 'cart' | 'billing';

export default function ShoppingCartPage() {
  const { items, removeFromCart, subtotal, discount, total, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<TabType>('cart');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  // ✅ FIXED: no event argument — matches OrderSummary type
  const handleSubmit = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    if (pin.length !== 4) {
      alert('Please enter a 4-digit PIN');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

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

  const isFormValid = formData.name.trim() !== '' && 
                      formData.country !== '' && 
                      formData.cardNumber.trim() !== '' && 
                      formData.expirationDate.trim() !== '' && 
                      formData.securityCode.trim() !== '';

  if (activeTab === 'billing' as TabType) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F3' }}>
        
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div>
              <BillingForm
                formData={formData}
                onFormChange={(field, value) => setFormData({ ...formData, [field]: value })}
              />
            </div>

            <div>
              <OrderDetails items={items} />
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                isFormValid={isFormValid}
                onProceed={handleSubmit}  
              />
            </div>

          </div>
        </div>

        {showPaymentModal && (
          <PaymentModal
            total={total}
            itemsCount={items.length}
            pin={pin}
            onPinChange={setPin}
            onConfirm={handlePaymentConfirm}
            onClose={handleCloseModal}
            isProcessing={isProcessing}
            paymentSuccess={paymentSuccess}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F3' }}>
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        
        {items.length === 0 ? (
          <>
            <EmptyState
              icon={Search}
              title="Your shopping cart is empty"
              description="Explore our wide range of courses and start building your skills today. Add courses to your cart and begin your learning journey!"
              primaryAction={{
                label: 'Browse Courses',
                href: '/learner/allcourses',
                icon: Search
              }}
            />

            <div className="mt-8">
              <RecommendedCourses courses={recommendedCourses} />
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h2 className="text-xl font-semibold">Course & Instructor</h2>
                <h2 className="text-xl font-semibold">Price</h2>
              </div>

              <div className="space-y-4">
                {items.map(({ course }) => (
                  <CartItem
                    key={course.id}
                    course={course}
                    onRemove={() => removeFromCart(course.id)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <RecommendedCourses
                courses={recommendedCourses}
                title="Recommendation"
                subtitle=""
              />
            </div>

            <CartSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              onCheckout={() => setActiveTab('billing')}
            />
          </>
        )}

      </div>
    </div>
  );
}
