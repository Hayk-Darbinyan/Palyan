import { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

const FaqPage = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const mainQuestions: FAQItem[] = [
    { id: '1', questionKey: 'whoCanUse', answerKey: 'whoCanUseAnswer' },
    { id: '2', questionKey: 'wholesaleOnly', answerKey: 'wholesaleOnlyAnswer' },
    { id: '3', questionKey: 'certified', answerKey: 'certifiedAnswer' },
    { id: '4', questionKey: 'productRange', answerKey: 'productRangeAnswer' },
    { id: '5', questionKey: 'placeOrder', answerKey: 'placeOrderAnswer' },
    { id: '6', questionKey: 'delivery', answerKey: 'deliveryAnswer' },
    { id: '7', questionKey: 'consultation', answerKey: 'consultationAnswer' },
    { id: '8', questionKey: 'becomePartner', answerKey: 'becomePartnerAnswer' }
  ];

  const otherQuestions: FAQItem[] = [
    { id: '9', questionKey: 'documents', answerKey: 'documentsAnswer' },
    { id: '10', questionKey: 'storage', answerKey: 'storageAnswer' },
    { id: '11', questionKey: 'vaccineStorage', answerKey: 'vaccineStorageAnswer' },
    { id: '12', questionKey: 'deliveryTime', answerKey: 'deliveryTimeAnswer' },
    { id: '13', questionKey: 'minOrder', answerKey: 'minOrderAnswer' },
    { id: '14', questionKey: 'discounts', answerKey: 'discountsAnswer' },
    { id: '15', questionKey: 'regions', answerKey: 'regionsAnswer' },
    { id: '16', questionKey: 'startCoopDocs', answerKey: 'startCoopDocsAnswer' },
    { id: '17', questionKey: 'customOrder', answerKey: 'customOrderAnswer' },
    { id: '18', questionKey: 'contactSpecialist', answerKey: 'contactSpecialistAnswer' }
  ];

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0] pb-16">

      {/* FAQ Content - Flex row on large screens, column on small */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
        {/* Main Questions - Full width on small screens */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#0E99A2] rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#404A3D]">
              {t('faq.mainQuestions')}
            </h2>
          </div>
          
          <div className="space-y-4">
            {mainQuestions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors ${
                    expandedItems.has(item.id) 
                      ? 'bg-[#0E99A2] text-white' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <h3 className={`text-lg font-semibold flex-1 pr-4 ${
                    expandedItems.has(item.id) ? 'text-white' : 'text-[#404A3D]'
                  }`}>
                    {t(`faq.questions.${item.questionKey}`)}
                  </h3>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-white shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#0E99A2] shrink-0" />
                  )}
                </button>
                
                {expandedItems.has(item.id) && (
                  <div className="px-6 pb-5 pt-4 animate-in fade-in border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {t(`faq.questions.${item.answerKey}`)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other Questions - Full width on small screens */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#5B8C51] rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#404A3D]">
              {t('faq.otherQuestions')}
            </h2>
          </div>
          
          <div className="space-y-4">
            {otherQuestions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors ${
                    expandedItems.has(item.id) 
                      ? 'bg-[#0E99A2] text-white' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <h3 className={`text-lg font-semibold flex-1 pr-4 ${
                    expandedItems.has(item.id) ? 'text-white' : 'text-[#404A3D]'
                  }`}>
                    {t(`faq.questions.${item.questionKey}`)}
                  </h3>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-white shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#0E99A2] shrink-0" />
                  )}
                </button>
                
                {expandedItems.has(item.id) && (
                  <div className="px-6 pb-5 pt-4 animate-in fade-in border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {t(`faq.questions.${item.answerKey}`)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto w-full mt-8">
        <div className="bg-linear-to-r from-[#F8F7F0] to-[#F0F4EE] rounded-3xl p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-4xl font-bold text-[#404A3D] mb-4">
                {t('faq.contactTitle')}
              </h3>
              <p className="text-base lg:text-lg text-gray-600">
                {t('faq.contactText')}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              <a
                href="tel:+37400000000"
                className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group w-full lg:w-auto"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#0E99A2] rounded-full flex items-center justify-center group-hover:bg-[#0d8a92] transition-colors shrink-0">
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">{t('header.contact.call')}</p>
                  <p className="text-base lg:text-lg font-semibold text-[#404A3D]">+374 00 000000</p>
                </div>
              </a>
              
              <a
                href="mailto:info@palyan.am"
                className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group w-full lg:w-auto"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#5B8C51] rounded-full flex items-center justify-center group-hover:bg-[#4a7a43] transition-colors shrink-0">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">{t('header.contact.email_us')}</p>
                  <p className="text-base lg:text-lg font-semibold text-[#404A3D]">info@palyan.am</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;