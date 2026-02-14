import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'email', 'phone'],
  },
  access: {
    // Admins and managers can read all companies
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      // Users can only read their own company
      return {
        id: {
          equals: user.company,
        },
      }
    },
    create: ({ req: { user } }) => {
      // Only admins and managers can create companies
      return user?.role === 'admin' || user?.role === 'manager'
    },
    update: ({ req: { user } }) => {
      // Only admins and managers can update companies
      return user?.role === 'admin' || user?.role === 'manager'
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete companies
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Transport Company (Carrier)', value: 'carrier' },
        { label: 'Customer/Shipper', value: 'customer' },
      ],
      admin: {
        description: 'Type of company',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
      ],
    },
    {
      name: 'vatNumber',
      type: 'text',
      admin: {
        description: 'VAT/Tax identification number',
      },
    },
    {
      name: 'registrationNumber',
      type: 'text',
      admin: {
        description: 'Company registration number',
      },
    },
  ],
}
