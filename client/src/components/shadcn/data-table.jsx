import { useEffect, useState } from 'react'
import { Button } from '@/components/shadcn/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table'

const PAGE_SIZES = [5, 10, 20]

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

function DataTable({ columns, rows = [], getRowId, onRowClick, emptyLabel, isLoading }) {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))
  const page = Math.min(pageIndex, pageCount - 1)
  const start = page * pageSize
  const visible = rows.slice(start, start + pageSize)

  useEffect(() => {
    setPageIndex(0)
  }, [rows, pageSize])

  const openRow = (row) => {
    if (onRowClick) onRowClick(row)
  }

  return (
    <div className="flex flex-col gap-geode-3">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={alignClass[column.align] || alignClass.left}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>Loading…</TableCell>
            </TableRow>
          ) : visible.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>{emptyLabel}</TableCell>
            </TableRow>
          ) : (
            visible.map((row) => (
              <TableRow
                key={getRowId(row)}
                tabIndex={onRowClick ? 0 : undefined}
                className={onRowClick ? 'cursor-pointer hover:bg-geode-muted-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-geode-focus' : undefined}
                onClick={onRowClick ? () => openRow(row) : undefined}
                onKeyDown={onRowClick ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openRow(row)
                  }
                } : undefined}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className={alignClass[column.align] || alignClass.left}>
                    {column.render ? column.render(row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-geode-2">
        <p className="font-geode text-geode-small text-geode-muted">
          {rows.length === 0 ? '0 results' : `${start + 1}–${Math.min(start + pageSize, rows.length)} of ${rows.length}`}
        </p>
        <div className="flex flex-wrap items-center gap-geode-2">
          {PAGE_SIZES.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={size === pageSize ? 'primary' : 'outline'}
              onClick={() => setPageSize(size)}
              aria-pressed={size === pageSize}
            >
              {size}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => setPageIndex(page - 1)} disabled={page === 0}>
            Previous
          </Button>
          <Button size="sm" variant="outline" onClick={() => setPageIndex(page + 1)} disabled={page >= pageCount - 1}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export { DataTable }
