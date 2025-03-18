import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink from 'next/link'

type LinkProps = {
  href: string
  children: React.ReactNode
  external?: boolean
} & ChakraLinkProps

export function Link({
  href,
  children,
  external = false,
  ...props
}: LinkProps) {
  return (
    <ChakraLink
      asChild
      _focus={{ outline: 'none', boxShadow: 'none' }}
      _hover={{ textDecoration: 'none' }}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      <NextLink href={href} passHref>
        {children}
      </NextLink>
    </ChakraLink>
  )
}

export type { LinkProps }
