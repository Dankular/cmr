import type { CollectionConfig } from 'payload'

export const CMRs: CollectionConfig = {
  slug: 'cmrs',
  admin: {
    useAsTitle: 'cmrNumber',
    defaultColumns: ['cmrNumber', 'status', 'carrierCompany', 'customerCompany', 'createdAt'],
  },
  upload: {
    staticDir: 'media/cmr-documents',
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    adminThumbnail: 'thumbnail',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false

      // Admins and managers can see all CMRs
      if (user.role === 'admin' || user.role === 'manager') return true

      // Carriers can see CMRs they uploaded
      if (user.role === 'carrier') {
        return {
          carrierCompany: {
            equals: user.company,
          },
        }
      }

      // Customers can only see accepted CMRs for their company
      if (user.role === 'customer') {
        return {
          and: [
            {
              customerCompany: {
                equals: user.company,
              },
            },
            {
              status: {
                equals: 'accepted',
              },
            },
          ],
        }
      }

      return false
    },
    create: ({ req: { user } }) => {
      // Only carriers can upload CMRs
      return user?.role === 'carrier' || user?.role === 'admin'
    },
    update: ({ req: { user } }) => {
      if (!user) return false

      // Managers and admins can update (for approval workflow)
      if (user.role === 'admin' || user.role === 'manager') return true

      // Carriers can only update their own pending CMRs
      if (user.role === 'carrier') {
        return {
          and: [
            {
              carrierCompany: {
                equals: user.company,
              },
            },
            {
              status: {
                equals: 'pending',
              },
            },
          ],
        }
      }

      return false
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete CMRs
      return user?.role === 'admin'
    },
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        // Auto-set carrier company when creating CMR
        if (operation === 'create' && req.user) {
          if (req.user.role === 'carrier') {
            data.carrierCompany = req.user.company
            data.uploadedBy = req.user.id
          }
        }

        // Track who approved/declined the CMR
        if (operation === 'update' && req.user) {
          if (data.status === 'accepted' || data.status === 'declined') {
            data.reviewedBy = req.user.id
            data.reviewedAt = new Date().toISOString()
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'cmrNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique CMR document number',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Declined', value: 'declined' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Approval status of the CMR',
      },
      access: {
        update: ({ req: { user } }) => {
          // Only managers and admins can change status
          return user?.role === 'admin' || user?.role === 'manager'
        },
      },
    },
    {
      name: 'carrierCompany',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      filterOptions: {
        type: {
          equals: 'carrier',
        },
      },
      admin: {
        position: 'sidebar',
        description: 'Transport company that uploaded this CMR',
        readOnly: true,
      },
    },
    {
      name: 'customerCompany',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      filterOptions: {
        type: {
          equals: 'customer',
        },
      },
      admin: {
        description: 'Customer/shipper company for this load',
      },
    },
    {
      name: 'loadDetails',
      type: 'group',
      fields: [
        {
          name: 'pickupAddress',
          type: 'textarea',
          required: true,
        },
        {
          name: 'deliveryAddress',
          type: 'textarea',
          required: true,
        },
        {
          name: 'pickupDate',
          type: 'date',
          required: true,
        },
        {
          name: 'deliveryDate',
          type: 'date',
        },
        {
          name: 'goodsDescription',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Description of goods transported',
          },
        },
        {
          name: 'weight',
          type: 'number',
          admin: {
            description: 'Weight in kg',
          },
        },
        {
          name: 'numberOfPackages',
          type: 'number',
        },
      ],
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'User who uploaded this CMR',
      },
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Manager who reviewed this CMR',
      },
    },
    {
      name: 'reviewedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'declineReason',
      type: 'textarea',
      admin: {
        condition: (data) => data.status === 'declined',
        description: 'Reason for declining this CMR',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Additional notes or comments',
      },
    },
  ],
}
