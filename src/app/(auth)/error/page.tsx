'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Button,
  Code,
  Spinner,
} from '@chakra-ui/react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// 検索パラメータからエラー情報を取得するコンポーネント
function ErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  // エラーメッセージのマッピング
  const errorMessages: Record<string, string> = {
    Configuration: '認証システムの設定エラーが発生しました',
    AccessDenied: 'アクセスが拒否されました',
    Verification:
      '認証リンクの検証に失敗しました。リンクの有効期限(15分)が切れた可能性があります。',
    TokenExpired:
      '認証リンクの有効期限(15分)が切れました。再度ログインしてください。',
    Default: '認証中に問題が発生しました',
  }

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default

  return (
    <VStack gap={8} align="center">
      <Icon as={IconAlertTriangle} boxSize={16} color="red.500" />

      <Heading as="h1" size="xl" textAlign="center">
        認証エラー
      </Heading>

      <Text fontSize="lg" textAlign="center">
        {errorMessage}
      </Text>

      {error && (
        <Box
          borderWidth={1}
          borderColor="gray.200"
          p={3}
          borderRadius="md"
          bg="gray.50"
        >
          <Code fontSize="sm" colorScheme="red">
            エラーコード: {error}
          </Code>
        </Box>
      )}

      <Button variant="outline" onClick={() => router.push('/sign-in')}>
        ログインページに戻る
      </Button>
    </VStack>
  )
}

// Suspenseでラップした親コンポーネント
export default function ErrorPage() {
  return (
    <Container maxW="container.md" py={16}>
      <Suspense
        fallback={
          <VStack h="50vh" justify="center" align="center">
            <Spinner size="xl" color="blue.500" />
            <Text mt={4}>読み込み中...</Text>
          </VStack>
        }
      >
        <ErrorContent />
      </Suspense>
    </Container>
  )
}
