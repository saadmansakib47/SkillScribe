export type PolicyType = 'terms' | 'privacy' | 'refund';
export type PolicyStatus = 'draft' | 'published';

export interface Policy {
  id: string;
  type: PolicyType;
  title: string;
  content: string;
  status: PolicyStatus;
  lastUpdated: string;
  version: number;
}

// Mock policies data
export const POLICIES: Policy[] = [
  {
    id: 'terms-1',
    type: 'terms',
    title: 'Terms and Conditions',
    content: `<h2>Terms and Conditions</h2>
<p>Welcome to SkillScribe. By accessing and using our platform, you agree to be bound by these Terms and Conditions.</p>

<h3>1. Account Registration</h3>
<p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.</p>

<h3>2. User Conduct</h3>
<p>Users must not:</p>
<ul>
<li>Violate any laws or regulations</li>
<li>Infringe on intellectual property rights</li>
<li>Upload malicious content or viruses</li>
<li>Harass or abuse other users</li>
</ul>

<h3>3. Course Content</h3>
<p>All course content is provided for educational purposes. Unauthorized distribution or reproduction is prohibited.</p>

<h3>4. Payment Terms</h3>
<p>Course fees are non-refundable unless otherwise stated in our Refund Policy. All payments are processed securely.</p>

<h3>5. Termination</h3>
<p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

<p><strong>Last Updated:</strong> November 20, 2025</p>`,
    status: 'published',
    lastUpdated: '2025-11-20',
    version: 1
  },
  {
    id: 'privacy-1',
    type: 'privacy',
    title: 'Privacy Policy',
    content: `<h2>Privacy Policy</h2>
<p>At SkillScribe, we are committed to protecting your privacy and ensuring the security of your personal information.</p>

<h3>1. Information We Collect</h3>
<p>We collect the following types of information:</p>
<ul>
<li><strong>Personal Information:</strong> Name, email address, payment information</li>
<li><strong>Usage Data:</strong> Course progress, quiz scores, learning analytics</li>
<li><strong>Technical Data:</strong> IP address, browser type, device information</li>
</ul>

<h3>2. How We Use Your Information</h3>
<p>Your information is used to:</p>
<ul>
<li>Provide and improve our services</li>
<li>Process payments and transactions</li>
<li>Send important notifications and updates</li>
<li>Personalize your learning experience</li>
</ul>

<h3>3. Data Sharing</h3>
<p>We do not sell your personal information. We may share data with:</p>
<ul>
<li>Service providers (payment processors, email services)</li>
<li>Legal authorities when required by law</li>
</ul>

<h3>4. Data Security</h3>
<p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction.</p>

<h3>5. Your Rights</h3>
<p>You have the right to access, modify, or delete your personal information. Contact us at privacy@skillscribe.com for requests.</p>

<p><strong>Last Updated:</strong> November 20, 2025</p>`,
    status: 'published',
    lastUpdated: '2025-11-20',
    version: 1
  },
  {
    id: 'refund-1',
    type: 'refund',
    title: 'Refund Policy',
    content: `<h2>Refund Policy</h2>
<p>We want you to be satisfied with your learning experience at SkillScribe. This policy outlines our refund procedures.</p>

<h3>1. Eligibility for Refunds</h3>
<p>You may request a refund within <strong>14 days</strong> of purchase if:</p>
<ul>
<li>You have completed less than 20% of the course</li>
<li>You have not downloaded any course materials or certificates</li>
<li>The course content significantly differs from the description</li>
</ul>

<h3>2. Non-Refundable Items</h3>
<p>The following are not eligible for refunds:</p>
<ul>
<li>Courses purchased more than 14 days ago</li>
<li>Completed courses or courses with more than 20% completion</li>
<li>Subscription fees (unless canceled before renewal)</li>
<li>Promotional or discounted courses</li>
</ul>

<h3>3. Refund Process</h3>
<ol>
<li>Submit a refund request through your account dashboard</li>
<li>Our team will review your request within 3-5 business days</li>
<li>If approved, refunds will be processed to the original payment method within 7-10 business days</li>
</ol>

<h3>4. Exceptional Circumstances</h3>
<p>We may grant refunds outside these guidelines on a case-by-case basis for technical issues or extenuating circumstances.</p>

<h3>5. Contact Us</h3>
<p>For refund inquiries, contact our support team at support@skillscribe.com</p>

<p><strong>Last Updated:</strong> November 20, 2025</p>`,
    status: 'published',
    lastUpdated: '2025-11-20',
    version: 1
  }
];

// Helper functions
export function getPolicyByType(type: PolicyType): Policy | undefined {
  return POLICIES.find(policy => policy.type === type && policy.status === 'published');
}

export function getAllPolicies(): Policy[] {
  return POLICIES;
}
