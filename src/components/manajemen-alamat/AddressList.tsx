
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import AddressCard from '@/components/manajemen-alamat/AddressCard'
import type { Address } from '@/components/manajemen-alamat/AddressManagementPage'

interface AddressListProps {
  addresses: Address[]
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export default function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSetDefault
}: AddressListProps) {
  // Separate default and other addresses
  const defaultAddress = addresses.find(a => a.isDefault)
  const otherAddresses = addresses.filter(a => !a.isDefault)

  return (
    <div className="space-y-6">
      {/* Default Address */}
      {defaultAddress && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <SafeIcon name="Star" className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Alamat Default</h3>
          </div>
          <AddressCard
            address={defaultAddress}
            isDefault={true}
            onEdit={() => onEdit(defaultAddress)}
            onDelete={() => onDelete(defaultAddress.id)}
            onSetDefault={() => {}}
          />
        </div>
      )}

      {/* Other Addresses */}
      {otherAddresses.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Alamat Lainnya</h3>
          <div className="space-y-3">
            {otherAddresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isDefault={false}
                onEdit={() => onEdit(address)}
                onDelete={() => onDelete(address.id)}
                onSetDefault={() => onSetDefault(address.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
