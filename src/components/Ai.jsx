"use client"

import { Box, List, ListItem, ListItemText, Paper, Grid } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import MemoryIcon from '@mui/icons-material/Memory';
import HubIcon from '@mui/icons-material/Hub';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import FunctionsIcon from '@mui/icons-material/Functions';

// Ai component definition
const Ai = () => {

  // Initialize the translation function
  const t = useTranslations();

  return (
    // Main container with centered content and background styling
    <Box
      sx={{
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 10,
        px: 3,
        position:'relative'
      }}
    >
      <Box sx={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'radial-gradient(circle at 50% 35%, rgba(236,72,153,0.18), transparent 70%)', filter:'blur(60px)', opacity:.6, pointerEvents:'none' }} />
      {/* Paper component for card-like appearance */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 3, md: 5 },
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position:'relative',
          overflow:'hidden'
        }}
      >
        <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', '&:before':{content:'""', position:'absolute', inset:0, background:'linear-gradient(150deg, rgba(236,72,153,0.1), transparent 55%)'}}} />
        <Reveal direction="up" distance={40}>
          <Text
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: 'inline-block',
              mb: 3,
              textAlign: 'center',
              width: '100%',
              position:'relative'
            }}
          >
            <Box component="span" sx={{ position:'relative', display:'inline-block', px:.5 }}>
              {t('ai.title')}
              <Box sx={{ position:'absolute', left:0, bottom:-6, height:4, width:'100%', borderRadius:2, background:'#ec4899' }} />
            </Box>
          </Text>
        </Reveal>

        {/* Introduction text, justified alignment */}
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 4, width: '100%', lineHeight:1.65 }}>
            {t('ai.intro')}
          </Text>
        </Reveal>

        {/* Technologies section title */}
        <Reveal direction="up" distance={50}>
          <Text variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'left', mt: 2 }}>
            {t('ai.techTitle')}
          </Text>
        </Reveal>
        <Grid container spacing={3} sx={{ mt:1 }}>
          {[{
            icon:<FunctionsIcon />,
            text:t('ai.minimax')
          },{
            icon:<QueryStatsIcon />,
            text:t('ai.heuristic')
          },{
            icon:<MemoryIcon />,
            text:t('ai.moves')
          },{
            icon:<HubIcon />,
            text:t('ai.network')
          }].map((item,i)=>(
            <Grid key={i} size={{ xs:12, sm:6 }}>
              <Reveal direction="up" distance={55} delay={0.05 + i*0.05}>
                <Paper variant="outlined" sx={{ p:2.2, height:'100%', borderColor:'rgba(236,72,153,0.35)', background:(theme)=>theme.palette.mode==='dark'?'rgba(255,255,255,0.03)':'rgba(236,72,153,0.04)', backdropFilter:'blur(4px)', position:'relative', overflow:'hidden', display:'flex', gap:1.2 }}>
                  <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(circle at 65% 25%, rgba(236,72,153,0.12), transparent 70%)', opacity:.85 }} />
                  <Box sx={{ color:'#ec4899', display:'flex', alignItems:'center' }}>{item.icon}</Box>
                  <Text variant="body2" sx={{ lineHeight:1.55, textAlign:'justify' }}>{item.text}</Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Image section, centered */}
        <Reveal direction="up" distance={60}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Box
              component="img"
              src="/assets/tictactoe.png"
              alt="Tic-Tac-Toe Géant"
              sx={{ maxWidth: '100%', height: 'auto', borderRadius: 3, boxShadow:'0 10px 30px -6px rgba(0,0,0,0.45)', border:'1px solid rgba(236,72,153,0.35)' }}
            />
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Ai;