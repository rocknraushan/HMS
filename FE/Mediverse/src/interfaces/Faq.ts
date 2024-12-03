export interface FaqCategory {
  id: number;
  faq: Faq[];
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  faqsCategory: string;
}

export interface Faq {
  faqQuestion: string;
  answer: string;
}
