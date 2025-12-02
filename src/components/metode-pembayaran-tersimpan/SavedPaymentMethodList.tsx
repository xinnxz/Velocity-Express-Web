
import { useState } from 'react'
import SavedPaymentMethodCard from './SavedPaymentMethodCard'
import EditPaymentMethodDialog from './EditPaymentMethodDialog'
import type { PaymentMethod } from './types'

interface SavedPaymentMethodListProps {
  methods: PaymentMethod[]
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
  onEdit: (id: string, data: Partial<PaymentMethod>) => void
  selectedMethod: PaymentMethod | null
  onSelectMethod: (method: PaymentMethod | null) => void
}

export default function SavedPaymentMethodList({
  methods,
  onDelete,
  onSetDefault,
  onEdit,
  selectedMethod,
  onSelectMethod
}: SavedPaymentMethodListProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditClick = (method: PaymentMethod) => {
    onSelectMethod(method)
    setIsEditDialogOpen(true)
  }

  const handleEditSave = (updatedData: Partial<PaymentMethod>) => {
    if (selectedMethod) {
      onEdit(selectedMethod.id, updatedData)
      setIsEditDialogOpen(false)
    }
  }

  return (
    <>
      <div className="grid gap-4">
        {methods.map((method) => (
          <SavedPaymentMethodCard
            key={method.id}
            method={method}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
            onEdit={() => handleEditClick(method)}
          />
        ))}
      </div>

      {selectedMethod && (
        <EditPaymentMethodDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          method={selectedMethod}
          onSave={handleEditSave}
        />
      )}
    </>
  )
}
