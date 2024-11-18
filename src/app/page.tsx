'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const route = useRouter()
  route.push('/pages/recipeList')
  return (
    <div>

    </div>
  )
}

export default Page
