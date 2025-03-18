'use client'

import { Text, VStack, Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export function Benefits() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0,
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <VStack
      id={'benefits'}
      className={'max6XL px7'}
      py={{ base: 12, md: 16 }}
      px={7}
      ref={ref}
    >
      <Box
        opacity={isVisible ? 1 : 0}
        css={{
          animation: isVisible ? `${fadeInUp} 0.5s ease-out forwards` : 'none',
        }}
        width={'100%'}
      >
        <Text
          as={'h2'}
          fontSize={'20px'}
          fontWeight={'900'}
          textAlign={'center'}
        >
          Stripeの請求書、 手数料0.4%
          <br />
          払う必要ありますか？
        </Text>
      </Box>
    </VStack>
  )
}
