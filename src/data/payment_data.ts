
        
import { OrderSummaryModel } from './order_data';

// --- Interfaces ---

interface PaymentMethodModel {
    id: number;
    name: string;
    type: 'Card' | 'Transfer' | 'E-Wallet';
    iconName: string;
    description: string;
    logoUrl?: string;
}

interface BankTransferInstructionModel {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    totalAmountIDR: number;
    paymentInstructions: string[];
    deadline: string;
}

interface TransactionConfirmationModel {
    transactionId: string;
    orderId: string;
    amountPaidIDR: number;
    paymentMethod: string;
    timestamp: string;
}

interface PaymentFailureModel {
    errorCode: string;
    message: string;
    suggestedAction: string;
}

// --- Data ---
export const MOCK_PAYMENT_METHODS: PaymentMethodModel[] = [
    {
        id: 1,
        name: "Kartu Kredit / Debit",
        type: 'Card',
        iconName: "CreditCard",
        description: "Visa, Mastercard, JCB. Diproses aman dan cepat.",
    },
    {
        id: 2,
        name: "Transfer Bank Otomatis",
        type: 'Transfer',
        iconName: "Landmark",
        description: "Virtual Account BCA, Mandiri, BNI, Permata.",
    },
    {
        id: 3,
        name: "E-Wallet SentraPay",
        type: 'E-Wallet',
        iconName: "Wallet",
        description: "Pembayaran instan dengan dompet digital SentraPay.",
        logoUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/37097574-a897-4f1b-8e63-501713520f7e.png"
    },
];

export const MOCK_BANK_TRANSFER_INSTRUCTIONS: BankTransferInstructionModel = {
    bankName: "Mega Sentra Bank (BMS)",
    accountNumber: "987 654 321 000 1234",
    accountHolder: "PT. Sentra Digital Logistik",
    totalAmountIDR: 142500,
    paymentInstructions: [
        "Pastikan jumlah transfer tepat Rp 142.500.",
        "Transfer dapat dilakukan ke Virtual Account di atas.",
        "Batas waktu pembayaran: 2 jam sejak pesanan dibuat (02 Des 2025, 19:30 WIB).",
    ],
    deadline: "2025-12-02T19:30:00Z",
};

export const MOCK_SUCCESS_TRANSACTION: TransactionConfirmationModel = {
    transactionId: "TRX-1234567890",
    orderId: 'SNT-20251202-001234',
    amountPaidIDR: 142500,
    paymentMethod: "Transfer Bank Sentra",
    timestamp: new Date().toISOString(),
};

export const MOCK_FAILURE_DETAILS: PaymentFailureModel = {
    errorCode: "E401-TIMEOUT",
    message: "Pembayaran gagal diproses. Server bank mungkin mengalami maintenance atau waktu pembayaran telah habis.",
    suggestedAction: "Silakan coba lagi dengan metode pembayaran yang berbeda atau hubungi layanan dukungan kami.",
};

// Re-export for convenience
export type { PaymentMethodModel, BankTransferInstructionModel, TransactionConfirmationModel, PaymentFailureModel };
        
      