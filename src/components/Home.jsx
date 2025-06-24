"use client"

import { useTranslations } from 'next-intl'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { scroller } from 'react-scroll'
import { ReactTyped } from 'react-typed'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Home = () => {
  const t = useTranslations()

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  return (
    <Box
      name="home"
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: { xs: 'auto', md: '100%' },
        }}
      >
        <Typography sx={{ color: '#ec4899', fontWeight: 600, mb: { xs: 1, md: 2 }, fontSize: { xs: 18, md: 22 } }}>
          {t('home.hello')}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: 32, sm: 40, md: 56 },
            mb: { xs: 1, md: 2 },
            lineHeight: 1.1,
          }}
        >
          Cédrik
        </Typography>
        <Typography
          component="div"
          sx={{
            fontWeight: 500,
            color: '#6fc2b0',
            fontSize: { xs: 32, sm: 40, md: 56 },
            mb: { xs: 2, md: 3 },
            minHeight: 40,
          }}
        >
          <ReactTyped
            strings={t.raw('home.typed')}
            typeSpeed={100}
            backSpeed={50}
            loop
          />
        </Typography>
        <Typography sx={{ py: 2, maxWidth: 900, textAlign: 'justify', fontSize: { xs: 15, md: 18 } }}>
          {t('home.desc')}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => scrollTo('work')}
          sx={{
            borderColor: '#ec4899',
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
            mt: 2,
            fontWeight: 500,
            fontSize: { xs: 14, md: 16 },
            '&:hover': {
              bgcolor: '#ec4899',
              borderColor: '#ec4899',
              color: '#0a192f',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            transition: 'all 0.3s',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center' },
          }}
        >
          {t('home.cta')}
        </Button>
      </Box>
    </Box>
  )
}

export default Home