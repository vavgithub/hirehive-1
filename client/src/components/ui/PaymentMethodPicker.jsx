import React, { useEffect, useRef, useState } from 'react'
import { Plus, Edit2, Check, CreditCard } from 'lucide-react'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcJcb, FaCcDinersClub } from 'react-icons/fa6'
import IconWrapper from '../Cards/IconWrapper'
import StyledCard from '../Cards/StyledCard'

const CARD_BRAND_LOGOS = {
  visa: FaCcVisa,
  mastercard: FaCcMastercard,
  amex: FaCcAmex,
  'american express': FaCcAmex,
  discover: FaCcDiscover,
  jcb: FaCcJcb,
  diners: FaCcDinersClub,
  'diners club': FaCcDinersClub,
}

const CARD_BRAND_COLORS = {
  visa: '#1A1F71',
  mastercard: '#EB001B',
  amex: '#1F72CD',
  'american express': '#1F72CD',
  discover: '#FF6000',
  jcb: '#0B4EA2',
  diners: '#0079BE',
  'diners club': '#0079BE',
}

export const CardBrandLogo = ({ brand, size = 'md' }) => {
  const key = (brand || '').toLowerCase()
  const Logo = CARD_BRAND_LOGOS[key]
  const isSmall = size === 'sm'
  const chip = isSmall ? 'h-6 w-9' : 'h-7 w-11'
  const glyph = isSmall ? 20 : 26

  if (Logo) {
    return (
      <span className={`flex items-center justify-center rounded-md bg-white shrink-0 ${chip}`}>
        <Logo size={glyph} style={{ color: CARD_BRAND_COLORS[key] || '#1A1F71' }} />
      </span>
    )
  }

  return (
    <span className={`flex items-center justify-center rounded-md bg-background-70 shrink-0 ${chip}`}>
      <IconWrapper icon={CreditCard} inheritColor size={0} customIconSize={2} className='text-font-gray' />
    </span>
  )
}

const PaymentMethodPicker = ({
  paymentMethods = [],
  selectedPaymentMethod,
  onSelect,
  onAddPaymentMethod,
  isUpdating = false,
  title = 'Default Payment Method',
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleSelect = (method) => {
    setOpen(false)
    onSelect?.(method)
  }

  return (
    <StyledCard padding={3} backgroundColor='bg-background-100' extraStyles='w-full flex flex-col gap-3'>
      <p className='typography-body text-font-main'>{title}</p>
      {selectedPaymentMethod ? (
        <div className='relative' ref={containerRef}>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 min-w-0'>
              <CardBrandLogo brand={selectedPaymentMethod.brand} />
              <span className='typography-body text-font-main uppercase truncate'>
                {selectedPaymentMethod.brand}
              </span>
            </div>
            <div className='flex items-center gap-3 shrink-0'>
              <span className='typography-body text-font-gray'>•••• {selectedPaymentMethod.last4}</span>
              <button
                type='button'
                onClick={() => setOpen((value) => !value)}
                disabled={isUpdating}
                aria-label='Change payment method'
                className='bg-background-80 text-font-main h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-70 disabled:opacity-50'
              >
                <IconWrapper icon={Edit2} inheritColor size={0} customIconSize={3} />
              </button>
            </div>
          </div>
          {open && (
            <div className='flex flex-col gap-1 mt-3 pt-3 border-t border-divider-100'>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type='button'
                  onClick={() => handleSelect(method)}
                  className='w-full flex items-center justify-between gap-2 px-2 h-11 rounded-lg hover:bg-background-80 text-left'
                >
                  <span className='flex items-center gap-2 min-w-0'>
                    <CardBrandLogo brand={method.brand} size='sm' />
                    <span className='typography-body text-font-main truncate'>
                      {method.brand} •••• {method.last4}
                    </span>
                  </span>
                  {selectedPaymentMethod?.id === method.id && (
                    <IconWrapper icon={Check} inheritColor size={0} customIconSize={3} className='text-accent-100' />
                  )}
                </button>
              ))}
              <button
                type='button'
                onClick={onAddPaymentMethod}
                className='w-full flex items-center gap-2 px-2 h-11 rounded-lg hover:bg-background-80 text-left text-blue-600'
              >
                <IconWrapper icon={Plus} inheritColor size={0} customIconSize={3} />
                <span className='typography-body'>Add payment method</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type='button'
          onClick={onAddPaymentMethod}
          className='flex items-center gap-2 typography-body text-blue-600 hover:underline'
        >
          <IconWrapper icon={Plus} inheritColor size={0} customIconSize={3} />
          Add a payment method
        </button>
      )}
    </StyledCard>
  )
}

export default PaymentMethodPicker
