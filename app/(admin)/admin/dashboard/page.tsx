"use client"
import { useAuthRedirect } from '@/app/hooks/useAuthRedirect';
import React from 'react'

const Page = () => {
  useAuthRedirect();
  return (
    <div>page</div>
  )
}

export default Page