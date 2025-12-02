
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentListPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function ShipmentListPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ShipmentListPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-border"
      >
        <SafeIcon name="ChevronLeft" className="w-4 h-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <Button
              key={pageNum}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className={
                isActive
                  ? 'neon-glow'
                  : 'border-border hover:bg-muted/50'
              }
            >
              {pageNum}
            </Button>
          )
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-border"
      >
        <SafeIcon name="ChevronRight" className="w-4 h-4" />
      </Button>

      {/* Info Text */}
      <div className="ml-4 text-sm text-muted-foreground">
        Halaman {currentPage} dari {totalPages}
      </div>
    </div>
  )
}
