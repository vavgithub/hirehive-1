import * as React from 'react'
import { cn } from '@/lib/utils'

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto">
    <table ref={ref} className={cn('w-full border-collapse text-left font-geode text-geode-small', className)} {...props} />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('text-geode-muted', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn('border-b border-geode-border last:border-0', className)} {...props} />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={cn('whitespace-nowrap px-geode-3 py-geode-2 font-geode-heading', className)}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('whitespace-nowrap px-geode-3 py-geode-2 text-geode-text', className)} {...props} />
))
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
