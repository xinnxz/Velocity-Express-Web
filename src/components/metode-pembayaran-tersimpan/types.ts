
export type PaymentMethodType = 'credit_card' | 'ewallet' | 'bank_transfer'

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  name: string
  isDefault: boolean
  lastUsed: string
  issuer: string
  
  // Credit Card specific
  cardNumber?: string
  expiryDate?: string
  cardholderName?: string
  
  // E-Wallet specific
  accountNumber?: string
  
  // Bank Transfer specific
  bankName?: string
}
