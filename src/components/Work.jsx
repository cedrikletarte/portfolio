"use client"

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { scroller } from 'react-scroll';
import Ai from './Ai';
import Gaming from './Gaming';
import Server from './Server';
import Website from './Website';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Work() {
  const t = useTranslations();
  const [nav, setnav] = useState('');

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const handleClick = (e) => {
    if (nav !== e) {
      setnav(e);
      scrollTo('handleDetails');
    } else {
      setnav('');
    }
  };

  const handleDetails = () => {
    if (nav === 'server') {
      return <Server />
    }
    if (nav === 'website') {
      return <Website />
    }
    if (nav === 'gaming') {
      return <Gaming />
    }
    if (nav === 'AI') {
      return <Ai />
    }
    return null;
  }

  const projects = [
    {
      key: 'server',
      title: t('work.server'),
      image: '/assets/undraw_server.svg',
    },
    {
      key: 'website',
      title: t('work.website'),
      image: '/assets/undraw_website2.png',
    },
    {
      key: 'gaming',
      title: t('work.gaming'),
      image: '/assets/undraw_gaming.svg',
    },
    {
      key: 'AI',
      title: t('work.ai'),
      image: '/assets/undraw_visionary.svg',
    },
  ];

  return (
    <>
      <Box name="work" sx={{ width: '100%', minHeight: '100vh', bgcolor: '#0a192f', color: 'grey.300', py: 6 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2 }}>
          <Box sx={{ pb: 4 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" sx={{
              fontWeight: 'bold',
              borderBottom: '4px solid #ec4899',
              color: '#e2e8f0',
              fontSize: { xs: 28, md: 36 },
              display: 'inline-block',
            }}>
              {t('work.projects')}
            </Typography>
            <Typography variant="subtitle1" sx={{ py: 2 }}>
              {t('work.recent')}
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            {projects.map((project) => (
              <Grid
                key={project.key}
                item
                xs={12}
                sm={6}
                md="auto"
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Card
                  sx={{
                    height: 300,
                    width: 300,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: 6,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  elevation={6}
                >
                  <CardActionArea
                    onClick={() => handleClick(project.key)}
                    sx={{
                      height: '100%',
                      width: '100%',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      transition: 'background 0.3s',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {project.title}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          fontWeight: 'bold',
                          bgcolor: '#ec4899',
                          color: 'white',
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          display: 'inline-block',
                        }}
                      >
                        {t('work.details')}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box id="handleDetails">{handleDetails()}</Box>
    </>
  );
}

export default Work