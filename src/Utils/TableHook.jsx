import React, { useMemo } from 'react'

function TableHook() {
  const columns=useMemo(
    () => [
        {
            accessorKey: 'id',
            header: 'ID',
            size:20
          },
          {
            accessorKey: 'name',
            header: 'Name',
            filterVariant: 'autocomplete',
          },
          {
            accessorKey: 'category',
            header: 'Category',
            filterVariant: 'multi-select',
            size:30
          },
          {
            accessorKey: 'subcategory',
            header: 'Sub Category',
            filterVariant: 'multi-select',
            size:40,
             multiple:true
          },
          {
            accessorKey: 'createdAt',
            header: 'Created At',
            filterVariant: 'range',
          },
          {
            accessorKey: 'updatedAt',
            header: 'Updated At',
            filterVariant: 'range',
          },
          {
            accessorKey: 'price',
            header: 'price',
            filterVariant: 'range-slider',
            size:20

          },
          {
            accessorKey: 'sale_price',
            header: 'Sale Price',
            filterVariant: 'range-slider',
            size:20

          },
  ], [])

  return{columns}
}

export default TableHook