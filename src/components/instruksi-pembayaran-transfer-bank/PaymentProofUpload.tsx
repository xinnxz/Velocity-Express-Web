
import { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'

interface PaymentProofUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
}

export default function PaymentProofUpload({
  onFileSelect,
  selectedFile
}: PaymentProofUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  const maxSize = 5 * 1024 * 1024 // 5MB

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan JPG, PNG, WebP, atau PDF.')
      return false
    }
    if (file.size > maxSize) {
      setError('Ukuran file terlalu besar. Maksimal 5MB.')
      return false
    }
    setError(null)
    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="FileUp" className="w-5 h-5 text-primary" />
          Unggah Bukti Transfer
        </CardTitle>
        <CardDescription>
          Unggah screenshot atau file PDF bukti transfer bank Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                <SafeIcon name="Upload" className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Klik untuk memilih atau seret file ke sini
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WebP, atau PDF (Maksimal 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert className="border-destructive/50 bg-destructive/10">
            <SafeIcon name="AlertCircle" className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive/90">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Selected File */}
        {selectedFile && (
          <div className="p-4 rounded-lg bg-background/50 border border-primary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
                {selectedFile.type === 'application/pdf' ? (
                  <SafeIcon name="FileText" className="w-5 h-5 text-primary" />
                ) : (
                  <SafeIcon name="Image" className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
                // Reset file selection
                const event = new Event('change', { bubbles: true })
                fileInputRef.current?.dispatchEvent(event)
              }}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Hapus file"
            >
              <SafeIcon name="X" className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Info */}
        <Alert className="border-border/50 bg-muted/20">
          <SafeIcon name="Info" className="h-4 w-4 text-muted-foreground" />
          <AlertDescription className="text-muted-foreground text-xs">
            Pastikan bukti transfer jelas menampilkan: tanggal transfer, jumlah, nomor rekening tujuan, dan status berhasil.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
