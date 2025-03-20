import { Box, BoxProps, Text } from '@chakra-ui/react'
import Image from 'next/image'

import { Link, LinkProps } from '@/components/ui/Link'
import { APP_NAME } from '@/const/pageData'

type LogoLinkProps = BoxProps & Omit<LinkProps, 'href' | 'children'> & {}

export function LogoLink({ ...props }: LogoLinkProps) {
  return (
    <Link
      href="/"
      display={'flex'}
      flexDir={'column'}
      alignItems={'flex-start'}
      gap={1}
      _focus={{
        outline: 'none',
        boxShadow: 'none',
      }}
      {...props}
    >
      <Text
        fontSize={'9px'}
        fontWeight={'900'}
        color={'DarkGray.200'}
        lineHeight={'10px'}
      >
        Stripe手数料がタダになる
      </Text>
      <Box position={'relative'} w={'158px'} h={'22px'}>
        <Image
          src={'/common/imposu-logo.svg'}
          alt={`${APP_NAME}のロゴ`}
          priority
          fill
          sizes="158px"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
    </Link>
  )
}
