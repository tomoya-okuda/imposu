import { Box, Stack, Text } from '@chakra-ui/react'

import { signIn } from '@/app/auth'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'

export function SignInForm({ buttonName }: { buttonName: string }) {
  return (
    <form
      action={async (formData) => {
        'use server'
        formData.append('timestamp', Date.now().toString())
        formData.append('callbackUrl', '/dashboard')
        await signIn('forwardemail', formData)
      }}
    >
      <Box bg={'White.100'} py={{ base: 10, md: 16 }} px={7}>
        <Stack gap={6}>
          <Field label={'メールアドレス'}>
            <Input type="text" name="email" placeholder="email@imposu.jp" />
          </Field>
          <Button type={'submit'} variant={'primary'} alignSelf={'center'}>
            {buttonName}
          </Button>
          <Text fontSize="xs" color="gray.500" textAlign="center">
            ※マジックリンクの有効期限は15分です
          </Text>
        </Stack>
      </Box>
    </form>
  )
}
