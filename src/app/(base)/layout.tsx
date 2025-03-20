import { Box } from '@chakra-ui/react'

import { FooterLP } from '@/components/layout/(base)/FooterLP'
import { HeaderLP } from '@/components/layout/(base)/HeaderLP'

export default function LPLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeaderLP />
      <Box as={'main'}>{children}</Box>
      <FooterLP />
    </>
  )
}
