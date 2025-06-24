"use client"

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { scroller } from 'react-scroll';

import Ai from './Ai';
import Gaming from './Gaming';
import Server from './Server';
import Website from './Website';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Text from '@mui/material/Typography';

function Projects() {
  // Initialize translation function
  const t = useTranslations();
  // State to track which project is selected
  const [nav, setnav] = useState('');

  // Function to scroll smoothly to a section by name
  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  // Handle click on a project card
  const handleClick = (e) => {
    if (nav !== e) {
      setnav(e);
      scrollTo('handleDetails'); // Scroll to details section
    } else {
      setnav('');
    }
  };

  // Render the selected project details component
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

  // List of projects to display as cards
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
      {/* Main container for the projects section */}
      <Box name="work" sx={{ width: '100%', minHeight: '100vh', bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, py: 6 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2 }}>
          {/* Section title and subtitle */}
          <Box sx={{ pb: 4 }}>
            <Text variant="h3" component="h2" fontWeight="bold" sx={{
              fontWeight: 'bold',
              borderBottom: '4px solid #ec4899',
              fontSize: { xs: 28, md: 36 },
              display: 'inline-block',
            }}>
              {t('work.projects')}
            </Text>
            <Text variant="subtitle1" sx={{ py: 2 }}>
              {t('work.recent')}
            </Text>
          </Box>
          {/* Grid of project cards */}
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
                {/* Project card with background image */}
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
                  {/* Card action area for click interaction */}
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
                    {/* Card content: project title and details button */}
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
                      <Text variant="h5" fontWeight="bold" gutterBottom >
                        {project.title}
                      </Text>
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
      {/* Section for displaying the selected project's details */}
      <Box id="handleDetails">{handleDetails()}</Box>
    </>
  );
}

// Export the Projects component as default
export default Projects;