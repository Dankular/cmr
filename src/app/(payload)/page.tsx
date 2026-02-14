import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        CMR Transport Management System
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', maxWidth: '600px' }}>
        Streamline your transport documentation process. Carriers upload CMR documents,
        managers review and approve them, and customers access their accepted documents.
      </p>
      <Link
        href="/admin"
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
      >
        Go to Admin Panel
      </Link>
      <div style={{ marginTop: '3rem', color: '#999' }}>
        <p>System Features:</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          <li>✓ Carrier document upload</li>
          <li>✓ Manager approval workflow</li>
          <li>✓ Customer document access</li>
          <li>✓ Role-based security</li>
        </ul>
      </div>
    </div>
  )
}
