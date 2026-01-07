import React, { useState, useEffect } from 'react';
import { X, Loader, Mail, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { EMAILJS_CONFIG } from '@/config/emailjsConfig';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contactType: 'info' | 'sales';
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactType: 'info',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  }, []);

  // Contact information
  const contactInfo = {
    info: {
      email: 'info@palyan.am',
      phone: '+374 (00) 000-000',
      label: t('contact.generalInfo'),
    },
    sales: {
      email: 'sales@palyan.am',
      phone: '+374 (11) 111-111',
      label: t('contact.salesDept'),
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Check if EmailJS is configured
    if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
      setError(t('contact.errorConfig'));
      setLoading(false);
      return;
    }

    try {
      // Send email using EmailJS
      const templateParams = {
        to_email: contactInfo[formData.contactType].email,
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        contact_type: formData.contactType === 'info' ? 'General Information' : 'Sales',
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          contactType: 'info',
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again or contact us directly.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedContact = contactInfo[formData.contactType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-[#404A3D]">{t('contact.title')}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#404A3D] mb-2">
                {t('contact.successTitle')}
              </h3>
              <p className="text-gray-600">
                {t('contact.successText')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#404A3D] mb-6">
                  {t('contact.contactInfo')}
                </h3>

                {/* Contact Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.department')}
                  </label>
                  <select
                    name="contactType"
                    value={formData.contactType}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50"
                  >
                    <option value="info">{t('contact.generalInfo')}</option>
                    <option value="sales">{t('contact.salesDept')}</option>
                  </select>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#0E99A2] shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{t('contact.email')}</p>
                      <p className="font-medium text-gray-900">
                        {selectedContact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#0E99A2] shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{t('contact.phone')}</p>
                      <p className="font-medium text-gray-900">
                        {selectedContact.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mt-6">
                  <p>
                    {t('contact.additionalInfo')}
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.fullName')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder={t('contact.fullNamePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.emailAddress')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder={t('contact.subjectPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50 resize-none"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0E99A2] text-white py-3 px-4 rounded-xl hover:bg-[#0d8a92] transition-colors font-medium disabled:opacity-50 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    t('contact.sendMessage')
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
