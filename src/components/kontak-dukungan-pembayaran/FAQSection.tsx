
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import SafeIcon from '@/components/common/SafeIcon'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Pembayaran Umum',
    question: 'Metode pembayaran apa saja yang diterima?',
    answer: 'Kami menerima berbagai metode pembayaran termasuk kartu kredit/debit (Visa, Mastercard, American Express), transfer bank, e-wallet (GCash, OVO, Dana, LinkAja), dan cicilan tanpa bunga melalui mitra fintech kami.'
  },
  {
    id: 'faq-2',
    category: 'Pembayaran Umum',
    question: 'Berapa lama waktu pemrosesan pembayaran?',
    answer: 'Pembayaran online biasanya diproses dalam hitungan detik hingga beberapa menit. Untuk transfer bank, proses verifikasi dapat memakan waktu 1-2 jam. Kami akan mengirimkan notifikasi konfirmasi melalui email dan SMS.'
  },
  {
    id: 'faq-3',
    category: 'Pembayaran Umum',
    question: 'Apakah pembayaran saya aman?',
    answer: 'Ya, semua transaksi dilindungi dengan enkripsi SSL 256-bit dan teknologi keamanan tingkat bank. Kami juga mematuhi standar PCI DSS untuk keamanan data kartu kredit. Data pribadi Anda tidak akan pernah dibagikan kepada pihak ketiga.'
  },
  {
    id: 'faq-4',
    category: 'Masalah Pembayaran',
    question: 'Pembayaran saya ditolak, apa yang harus saya lakukan?',
    answer: 'Pembayaran dapat ditolak karena beberapa alasan: saldo kartu tidak cukup, kartu sudah kadaluarsa, atau ada pembatasan dari bank Anda. Silakan periksa saldo kartu Anda, pastikan tanggal kadaluarsa benar, atau hubungi bank Anda untuk menghapus pembatasan transaksi online.'
  },
  {
    id: 'faq-5',
    category: 'Masalah Pembayaran',
    question: 'Saya sudah membayar tapi pesanan belum dikonfirmasi?',
    answer: 'Biasanya konfirmasi otomatis terjadi dalam beberapa menit. Jika belum menerima konfirmasi setelah 30 menit, silakan cek email spam Anda atau hubungi tim dukungan kami. Kami akan memverifikasi status pembayaran Anda secara manual.'
  },
  {
    id: 'faq-6',
    category: 'Masalah Pembayaran',
    question: 'Bagaimana cara membatalkan pembayaran?',
    answer: 'Pembayaran yang sudah diproses tidak dapat dibatalkan secara langsung. Namun, Anda dapat membatalkan pesanan dan meminta pengembalian dana. Proses refund biasanya memakan waktu 3-5 hari kerja tergantung bank Anda.'
  },
  {
    id: 'faq-7',
    category: 'Cicilan & Promosi',
    question: 'Apakah ada opsi cicilan?',
    answer: 'Ya, kami menawarkan cicilan 0% untuk pembelian di atas Rp 500.000 melalui mitra fintech kami. Anda dapat memilih tenor cicilan 3, 6, atau 12 bulan saat memilih metode pembayaran.'
  },
  {
    id: 'faq-8',
    category: 'Cicilan & Promosi',
    question: 'Bagaimana cara menggunakan kode promo?',
    answer: 'Masukkan kode promo di halaman ringkasan pesanan sebelum melakukan pembayaran. Diskon akan langsung diterapkan pada total biaya. Pastikan kode promo masih berlaku dan memenuhi syarat minimum pembelian.'
  },
  {
    id: 'faq-9',
    category: 'Refund & Pengembalian',
    question: 'Berapa lama proses refund?',
    answer: 'Proses refund biasanya memakan waktu 3-5 hari kerja setelah kami memproses permintaan Anda. Waktu tambahan mungkin diperlukan tergantung pada bank atau penyedia e-wallet Anda.'
  },
  {
    id: 'faq-10',
    category: 'Refund & Pengembalian',
    question: 'Bagaimana cara mengajukan refund?',
    answer: 'Hubungi tim dukungan kami melalui email atau live chat dengan nomor pesanan Anda. Jelaskan alasan refund dan kami akan memproses permintaan Anda dalam waktu 24 jam. Refund akan dikembalikan ke metode pembayaran asli Anda.'
  }
]

const categories = Array.from(new Set(faqItems.map(item => item.category)))

export default function FAQSection() {
  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryItems = faqItems.filter(item => item.category === category)
        
        return (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <SafeIcon name="HelpCircle" className="w-5 h-5 text-primary" />
              {category}
            </h3>

            <Accordion type="single" collapsible className="space-y-2">
              {categoryItems.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id}
                  className="glass-effect border-primary/20 rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:text-primary transition-colors py-4">
                    <span className="text-left">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}
