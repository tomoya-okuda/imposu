'use client'

import { Box, Heading, Text, VStack, Icon, Button } from '@chakra-ui/react'
import { IconMail } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

export default function VerifyRequestPage() {
  const router = useRouter()

  return (
    <Box as={'main'} maxW={'620px'} mx={'auto'} py={20} px={7}>
      <VStack gap={8} align="center">
        <Icon as={IconMail} boxSize={16} color="blue.500" />

        <Heading as="h1" size="xl" textAlign="center">
          メールをご確認ください
        </Heading>

        <Text fontSize="md" textAlign="center">
          ログイン用のリンクを記載したメール宛にお送りしました。
          メールに記載されたリンクをクリックして、ログインを完了してください。
        </Text>

        <Box
          borderWidth={1}
          borderColor="gray.200"
          p={5}
          borderRadius="md"
          bg="gray.50"
          w="full"
        >
          <VStack gap={3} align="start">
            <Text fontWeight="bold">注意事項：</Text>
            <Text>• メールが届くまで数分かかる場合があります</Text>
            <Text>• 迷惑メールフォルダもご確認ください</Text>
            <Text>• リンクの有効期限は15分です</Text>
            <Text>• 有効期限が切れた場合は再度ログインをお試しください</Text>
          </VStack>
        </Box>

        <Button variant="outline" onClick={() => router.back()}>
          戻る
        </Button>
      </VStack>
    </Box>
  )
}
