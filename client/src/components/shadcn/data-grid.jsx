import { useLayoutEffect, useRef } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@/components/geode/icons'

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

  return (
    <div className="geode-data-grid">
      <div className="geode-data-grid-scroll">
        <table>
          <colgroup>
            {checkboxSelection ? <col width="48" /> : null}
            {columns.map((column) => (
              <col key={column.field} width={column.width || undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {checkboxSelection ? (
                <th>
                  <input
                    ref={headerCheck}
                    className="geode-grid-check"
                    type="checkbox"
                    aria-label="Select all rows"
                    onChange={togglePage}
                  />
                </th>
              ) : null}
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={column.headerClassName}
                  data-align={column.headerAlign || column.align || 'left'}
                >
                  {column.sortable === false ? column.headerName : (
                    <button type="button" className="geode-grid-sort" onClick={() => toggleSort(column.field)}>
                      {column.headerName}
                      {sortField === column.field ? (
                        sortDirection === 'desc' ? <ChevronDown /> : <ChevronUp />
                      ) : null}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (checkboxSelection ? 1 : 0)}>
                  {localeText?.noRowsLabel || 'No rows'}
                </td>
              </tr>
            ) : visibleRows.map((row, index) => {
              const id = getRowId(row)
              const className = getRowClassName?.({ row, id, indexRelativeToCurrentPage: index }) || ''
              return (
                <tr
                  key={id}
                  className={`${className}${selected.has(id) ? ' geode-row-selected' : ''}`}
                  onClick={(event) => {
                    if (event.target.closest('button, a, input, label, select')) return
                    onRowClick?.({ row, id })
                  }}
                >
                  {checkboxSelection ? (
                    <td>
                      <input
                        className="geode-grid-check"
                        type="checkbox"
                        aria-label="Select row"
                        checked={selected.has(id)}
                        onChange={() => toggleRow(id)}
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => {
                    const value = cellValue(column, row)
                    return (
                      <td key={column.field} className={column.cellClassName} data-align={column.align || 'left'}>
                        {column.renderCell
                          ? column.renderCell({ row, value, id, field: column.field })
                          : value}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {hideFooterPagination ? null : (
        <div className="geode-data-grid-footer">
          <label className="geode-data-grid-page-size">
            Rows per page
            <select
              aria-label="Rows per page"
              value={pageSize}
              onChange={(event) => onPaginationModelChange?.({ page: 0, pageSize: Number(event.target.value) })}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <span>{from}–{to} of {total}</span>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 0}
            onClick={() => onPaginationModelChange?.({ page: page - 1, pageSize })}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next page"
            disabled={page + 1 >= pageCount}
            onClick={() => onPaginationModelChange?.({ page: page + 1, pageSize })}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

export { DataGrid }
export default DataGrid
