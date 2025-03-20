import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import { IconChevronLeft } from '@tabler/icons-react'

import { SignInForm } from '@/components/features/SignInForm'
import { ImposuMark } from '@/components/layout/(common)/ImposuMark'
import { Link } from '@/components/ui/Link'

export default function SignInPage() {
  return (
    <>
      <Box
        as={'header'}
        display={'inline-block'}
        position={'absolute'}
        top={{ base: 4, md: 8 }}
        left={{ base: 4, md: 8 }}
        zIndex={10}
      >
        <Link href={'/'} display={'flex'} alignItems={'center'} gap={'2px'}>
          <Icon boxSize={'16px'} mt={'1px'} color={'LightGray.200'}>
            <IconChevronLeft />
          </Icon>
          <Text color={'DarkGray.100'} fontWeight={'bold'} fontSize={'sm'}>
            HOME
          </Text>
        </Link>
      </Box>
      <Box
        as={'main'}
        maxW={'540px'}
        mx={'auto'}
        py={20}
        px={7}
        mt={{ base: 0, md: 100 }}
      >
        <VStack gap={8} align={{ base: 'center', md: 'flex-start' }}>
          <ImposuMark />
          <Box>
            <Heading
              as="h1"
              size="xl"
              textAlign={{ base: 'center', md: 'left' }}
            >
              ログイン to インポス請求
            </Heading>

            <Text
              color="DarkGray.200"
              fontSize="sm"
              textAlign={{ base: 'center', md: 'left' }}
              mt={2}
            >
              マジックリンクで簡単ログイン
            </Text>
          </Box>

          <Box w="full" maxW="md">
            <SignInForm buttonName="マジックリンクを送信" />
          </Box>
        </VStack>
      </Box>
    </>
  )
}
