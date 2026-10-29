import { useLayoutEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from '@/components/geode/icons'
import { Button } from '@/components/shadcn/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table'
import { cn } from '@/lib/utils'

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

function cellValue(column, row) {
  const raw = row?.[column.field]
  if (typeof column.valueGetter === 'function') return column.valueGetter(raw, row, column)
  return raw
}

function DataGrid({
  rows = [],
  columns = [],
  getRowId = (row) => row.id,
  paginationMode,
  sortModel = [],
  onSortModelChange,
  paginationModel,
  onPaginationModelChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
  checkboxSelection = false,
  rowSelectionModel = [],
  onRowSelectionModelChange,
  onRowClick,
  rowCount,
  getRowClassName,
  localeText,
  hideFooterPagination = false,
}) {
  const page = paginationModel?.page ?? 0
  const pageSize = paginationModel?.pageSize ?? (rows.length || 10)
  const server = paginationMode === 'server'
  const total = server ? (rowCount ?? rows.length) : rows.length
  const pageCount = Math.max(1, Math.ceil(total / (pageSize || 1)) || 1)
  const visibleRows = server || hideFooterPagination
    ? rows
    : rows.slice(page * pageSize, page * pageSize + pageSize)
  const ids = visibleRows.map((row) => getRowId(row))
  const selected = new Set(rowSelectionModel || [])
  const headerCheck = useRef(null)

  useLayoutEffect(() => {
    if (!headerCheck.current) return
    const all = ids.length > 0 && ids.every((id) => selected.has(id))
    const some = ids.some((id) => selected.has(id))
    headerCheck.current.indeterminate = some && !all
    headerCheck.current.checked = all
  })

  const toggleSort = (field) => {
    if (!onSortModelChange) return
    const current = sortModel?.[0]
    if (!current || current.field !== field) onSortModelChange([{ field, sort: 'asc' }])
    else if (current.sort === 'asc') onSortModelChange([{ field, sort: 'desc' }])
    else onSortModelChange([])
  }

  const toggleRow = (id) => {
    if (!onRowSelectionModelChange) return
    const next = selected.has(id)
      ? rowSelectionModel.filter((item) => item !== id)
      : [...rowSelectionModel, id]
    onRowSelectionModelChange(next)
  }

  const togglePage = () => {
    if (!onRowSelectionModelChange) return
    const all = ids.length > 0 && ids.every((id) => selected.has(id))
    if (all) onRowSelectionModelChange(rowSelectionModel.filter((id) => !ids.includes(id)))
    else onRowSelectionModelChange([...new Set([...rowSelectionModel, ...ids])])
  }

  const from = total === 0 ? 0 : page * pageSize + 1
  const to = Math.min(total, page * pageSize + visibleRows.length)
  const sortField = sortModel?.[0]?.field
  const sortDirection = sortModel?.[0]?.sort
  const columnCount = columns.length + (checkboxSelection ? 1 : 0)

  return (
    <div className="geode-data-grid flex w-full flex-col gap-geode-3">
      <Table>
        <TableHeader>
          <TableRow>
            {checkboxSelection ? (
              <TableHead>
                <input
                  ref={headerCheck}
                  className="geode-grid-check"
                  type="checkbox"
                  aria-label="Select all rows"
                  onChange={togglePage}
                />
              </TableHead>
            ) : null}
            {columns.map((column) => {
              const align = alignClass[column.headerAlign || column.align] || alignClass.left
              const active = sortField === column.field
              return (
                <TableHead key={column.field} className={cn(align, column.headerClassName)}>
                  {column.sortable === false ? column.headerName : (
                    <button
                      type="button"
                      className="geode-grid-sort"
                      data-active={active ? 'true' : 'false'}
                      onClick={() => toggleSort(column.field)}
                    >
                      {column.headerName}
                      {active ? (
                        sortDirection === 'desc'
                          ? <ChevronDown aria-hidden="true" />
                          : <ChevronUp aria-hidden="true" />
                      ) : null}
                    </button>
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnCount}>
                {localeText?.noRowsLabel || 'No rows'}
              </TableCell>
            </TableRow>
          ) : visibleRows.map((row, index) => {
            const id = getRowId(row)
            const className = getRowClassName?.({ row, id, indexRelativeToCurrentPage: index }) || ''
            return (
              <TableRow
                key={id}
                tabIndex={onRowClick ? 0 : undefined}
                className={cn(
                  className,
                  selected.has(id) && 'bg-geode-muted-bg',
                  onRowClick && 'hover:bg-geode-muted-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-geode-focus',
                )}
                onClick={(event) => {
                  if (event.target.closest('button, a, input, label, select')) return
                  onRowClick?.({ row, id })
                }}
                onKeyDown={onRowClick ? (event) => {
                  if (event.target.closest('button, a, input, label, select')) return
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onRowClick({ row, id })
                  }
                } : undefined}
              >
                {checkboxSelection ? (
                  <TableCell>
                    <input
                      className="geode-grid-check"
                      type="checkbox"
                      aria-label="Select row"
                      checked={selected.has(id)}
                      onChange={() => toggleRow(id)}
                    />
                  </TableCell>
                ) : null}
                {columns.map((column) => {
                  const value = cellValue(column, row)
                  const align = alignClass[column.align] || alignClass.left
                  return (
                    <TableCell key={column.field} className={cn(align, column.cellClassName)}>
                      {column.renderCell
                        ? column.renderCell({ row, value, id, field: column.field })
                        : value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {hideFooterPagination ? null : (
        <div className="flex flex-wrap items-center justify-between gap-geode-2">
          <p className="font-geode text-geode-small text-geode-muted">
            {total === 0 ? '0 results' : `${from}–${to} of ${total}`}
          </p>
          <div className="flex flex-wrap items-center gap-geode-2">
            {pageSizeOptions.map((size) => (
              <Button
                key={size}
                size="sm"
                variant={Number(size) === Number(pageSize) ? 'secondary' : 'outline'}
                onClick={() => onPaginationModelChange?.({ page: 0, pageSize: Number(size) })}
                aria-pressed={Number(size) === Number(pageSize)}
              >
                {size}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPaginationModelChange?.({ page: page - 1, pageSize })}
              disabled={page <= 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPaginationModelChange?.({ page: page + 1, pageSize })}
              disabled={page + 1 >= pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataGrid }
export default DataGrid
