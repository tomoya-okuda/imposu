'use client'

import {
  Badge,
  Box,
  Flex,
  Icon,
  Image,
  ListItem,
  ListRoot,
  Text,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react'

import { Button } from '@/components/ui/Button'

// アニメーションの定義
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
  75% { transform: scale(0.98); }
`

export function FV() {
  return (
    <Box
      id={'hero'}
      className={'max6XL px7'}
      py={{ base: 8, md: 12 }}
      px={7}
      h={'460px'}
      position={'relative'}
      overflow={'hidden'}
    >
      <Box position={'relative'} zIndex={10}>
        <Flex
          alignItems={'center'}
          gap={'1px'}
          mb={2}
          opacity={0}
          css={{
            animation: `${slideLeft} 0.3s ease-out forwards`,
            animationDelay: '0.1s',
          }}
        >
          <Text fontWeight={'900'} fontSize={'xs'} color={'DarkGray.100'}>
            Powerd by
          </Text>
          <Box position={'relative'} w={'42px'} pt={'2px'}>
            <Image
              src={'/common/stripe-logo.svg'}
              alt={'Stripeのロゴ'}
              width={42}
              height={18}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Flex>
        <Text
          as={'h1'}
          fontSize={'3xl'}
          fontWeight={'900'}
          opacity={0}
          css={{
            animation: `${slideLeft} 0.3s ease-out forwards`,
            animationDelay: '0.2s',
          }}
        >
          請求書発行の手間と
          <Box as={'span'} display={{ base: 'inline', md: 'none' }}>
            <br />
          </Box>
          <Box as={'span'}>コストをゼロに。</Box>
        </Text>
        <Text
          fontWeight={'700'}
          color={'DarkGray.100'}
          mt={4}
          mb={6}
          opacity={0}
          css={{
            animation: `${slideLeft} 0.3s ease-out forwards`,
            animationDelay: '0.3s',
          }}
        >
          <Badge
            as={'span'}
            fontWeight={'900'}
            border={'1px solid'}
            borderColor={'DarkGray.100'}
            color={'DarkGray.100'}
            px={3}
            py={1}
            fontSize={'sm'}
            borderRadius={'full'}
            mr={1}
          >
            発行
          </Badge>
          も
          <Badge
            as={'span'}
            fontWeight={'900'}
            border={'1px solid'}
            borderColor={'DarkGray.100'}
            color={'DarkGray.100'}
            px={3}
            py={1}
            fontSize={'sm'}
            borderRadius={'full'}
            ml={1}
            mr={1}
          >
            編集
          </Badge>
          も、お客様にお任せ
        </Text>
        <Text
          color={'Black.100'}
          fontSize={'sm'}
          mt={4}
          fontWeight={'900'}
          opacity={0}
          css={{
            animation: `${slideLeft} 0.3s ease-out forwards`,
            animationDelay: '0.4s',
          }}
        >
          <Box as={'span'} color={'Primary.100'} fontWeight={'900'} mr={'2px'}>
            Stripe請求書
          </Box>
          クラウド発行サービス
        </Text>
        <ListRoot
          listStyleType={'none'}
          mt={6}
          mb={12}
          fontSize={'13px'}
          color={'DarkGray.100'}
          fontWeight={'900'}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
        >
          <ListItem
            display={'flex'}
            alignItems={'center'}
            gap={1}
            opacity={0}
            css={{
              animation: `${slideUp} 0.2s ease-out forwards`,
              animationDelay: '0.5s',
            }}
          >
            <Icon color={'Secondary.100'}>
              <IconRosetteDiscountCheckFilled />
            </Icon>
            <Text>Stripe請求書の0.4%手数料をゼロに</Text>
          </ListItem>
          <ListItem
            display={'flex'}
            alignItems={'center'}
            gap={1}
            opacity={0}
            css={{
              animation: `${slideUp} 0.2s ease-out forwards`,
              animationDelay: '0.6s',
            }}
          >
            <Icon color={'Secondary.100'}>
              <IconRosetteDiscountCheckFilled />
            </Icon>
            <Text>ノーコードで簡単設定</Text>
          </ListItem>
          <ListItem
            display={'flex'}
            alignItems={'center'}
            gap={1}
            opacity={0}
            css={{
              animation: `${slideUp} 0.2s ease-out forwards`,
              animationDelay: '0.7s',
            }}
          >
            <Icon color={'Secondary.100'}>
              <IconRosetteDiscountCheckFilled />
            </Icon>
            <Text>ワンクリックで請求送付</Text>
          </ListItem>
        </ListRoot>
        <Flex
          justifyContent={'center'}
          opacity={0}
          css={{
            animation: `${fadeIn} 0.5s ease-out forwards`,
            animationDelay: '0.8s',
          }}
        >
          <Button
            url={'/checkout'}
            variant={'cta'}
            w={'full'}
            h={'48px'}
            css={{
              animation: `${bounce} 0.6s ease-in-out`,
              animationDelay: '1.2s',
            }}
          >
            今すぐ手数料0.4%をゼロにする
          </Button>
        </Flex>
      </Box>

      {/* 右下の直角三角形 */}
      <Box
        position={'absolute'}
        bottom={0}
        right={0}
        width={'210px'}
        height={'300px'}
        bgColor={'Primary.100'}
        zIndex={0}
        clipPath={'polygon(100% 0, 100% 100%, 0 100%)'}
      />
    </Box>
  )
}
