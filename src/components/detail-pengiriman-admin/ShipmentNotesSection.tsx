
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentNotesSectionProps {}

export default function ShipmentNotesSection({}: ShipmentNotesSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(
    'Paket berisi elektronik sensitif. Pastikan penanganan dengan hati-hati. Penerima meminta pengiriman sebelum jam 6 sore.'
  )
  const [tempNotes, setTempNotes] = useState(notes)

  const handleSave = () => {
    setNotes(tempNotes)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempNotes(notes)
    setIsEditing(false)
  }

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <SafeIcon name="FileText" className="w-5 h-5 text-primary" />
              Catatan Internal
            </CardTitle>
            <CardDescription>Catatan khusus untuk penanganan pengiriman</CardDescription>
          </div>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              placeholder="Masukkan catatan internal..."
              className="min-h-[120px] bg-background/50"
            />
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline"
                onClick={handleCancel}
              >
                Batal
              </Button>
              <Button 
                onClick={handleSave}
                className="neon-glow"
              >
                <SafeIcon name="Save" className="w-4 h-4 mr-2" />
                Simpan
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-background/30 rounded-lg border border-border/50">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {notes || 'Tidak ada catatan'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
