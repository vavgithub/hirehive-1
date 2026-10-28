import { useEffect, useState } from 'react'
import { Button } from '@/components/shadcn/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table'

const PAGE_SIZES = [5, 10, 20]

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

function DataTable({ columns, rows = [], getRowId, onRowClick, emptyLabel, isLoading, searchable = false, columnToggle = false }) {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [pageIndex, setPageIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [hidden, setHidden] = useState({})
  const activeColumns = columns.filter((column) => !hidden[column.key])
  const filtered = rows.filter((row) => {
    const needle = query.trim().toLowerCase()
    if (!needle) return true
    return columns.some((column) => String(row[column.key] ?? '').toLowerCase().includes(needle))
  })
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const page = Math.min(pageIndex, pageCount - 1)
  const start = page * pageSize
  const visible = filtered.slice(start, start + pageSize)

  useEffect(() => {
    setPageIndex(0)
  }, [rows, pageSize, query])

  const openRow = (row) => {
    if (onRowClick) onRowClick(row)
  }

  const toggleColumn = (key) => {
    setHidden((current) => {
      const next = { ...current, [key]: !current[key] }
      const visibleCount = columns.filter((column) => !next[column.key]).length
      if (visibleCount === 0) return current
      return next
    })
  }

  return (
    <div className="flex flex-col gap-geode-3">
      {searchable || columnToggle ? (
        <div className="flex flex-wrap items-center justify-between gap-geode-3">
          {searchable ? (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search"
              placeholder="Search"
              className="h-geode-sm w-full max-w-xs rounded-geode-control border border-geode-border bg-geode-card px-geode-3 font-geode text-geode-small text-geode-text outline-none placeholder:text-geode-muted focus-visible:ring-2 focus-visible:ring-geode-focus"
            />
          ) : <span />}
          {columnToggle ? (
            <details className="relative">
              <summary className="flex h-geode-sm list-none items-center rounded-geode-control border border-geode-border bg-geode-card px-geode-3 font-geode text-geode-small text-geode-text">
                Columns
              </summary>
              <div className="absolute right-0 z-10 mt-geode-1 flex min-w-44 flex-col gap-geode-1 rounded-geode border border-geode-border bg-geode-card p-geode-2">
                {columns.map((column) => (
                  <label key={column.key} className="flex items-center gap-geode-2 font-geode text-geode-small text-geode-text">
                    <input
                      type="checkbox"
                      checked={!hidden[column.key]}
                      onChange={() => toggleColumn(column.key)}
                    />
                    {column.header}
                  </label>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      ) : null}
      <Table>
        <TableHeader>
          <TableRow>
            {activeColumns.map((column) => (
              <TableHead key={column.key} className={alignClass[column.align] || alignClass.left}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={activeColumns.length}>Loading…</TableCell>
            </TableRow>
          ) : visible.length === 0 ? (
            <TableRow>
              <TableCell colSpan={activeColumns.length}>{emptyLabel}</TableCell>
            </TableRow>
          ) : (
            visible.map((row) => (
              <TableRow
                key={getRowId(row)}
                tabIndex={onRowClick ? 0 : undefined}
                className={onRowClick ? 'hover:bg-geode-muted-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-geode-focus' : undefined}
                onClick={onRowClick ? () => openRow(row) : undefined}
                onKeyDown={onRowClick ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openRow(row)
                  }
                } : undefined}
              >
                {activeColumns.map((column) => (
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
          {filtered.length === 0 ? '0 results' : `${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}`}
        </p>
        <div className="flex flex-wrap items-center gap-geode-2">
          {PAGE_SIZES.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={size === pageSize ? 'secondary' : 'outline'}
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
