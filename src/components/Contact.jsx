"use client"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

const Contact = () => {
  const t = useTranslations();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [defaultValue, setDefaultValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const quillRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      let Quill = require('quill');
      Quill = Quill.default ? Quill.default : Quill;
      const Delta = Quill.import('delta');
      setDefaultValue(new Delta());
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      if (res.ok) {
        setSent(true); // Lance l'animation
        setTimeout(() => setSent(false), 1200); // Réinitialise après l'animation
      } else {
        alert(t('error.sending'));
      }
    } finally {
      setLoading(false);
      setMessage('');
      setName('');
      setEmail('');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
      name="contact"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 600,
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.02)',
          p: 4,
          borderRadius: 2,
          boxShadow: 6,
        }}
      >
        <Box sx={{ pb: 3 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" sx={{
            fontWeight: 'bold',
            borderBottom: '4px solid #ec4899',
            fontSize: { xs: 28, md: 36 },
            display: 'inline-block',
          }}>
            {t('contact.title')}
          </Typography>
          <Typography variant="body1" sx={{ py: 1 }}>
            {t.rich('contact.desc', {
              link: (chunks) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://mail.google.com/mail/u/0/?fs=1&to=cedrikletarte@gmail.com&tf=cm"
                  style={{ textDecoration: 'underline', color: '#ec4899' }}
                >
                  {chunks}
                </a>
              ),
            })}
          </Typography>
        </Box>
        <TextField
          label={t('contact.name')}
          name="name"
          required
          variant="filled"
          sx={{
            mb: 2,
            bgcolor: '#ccd6f6',
            borderRadius: 1,
            '& .MuiInputLabel-root': {
              color: '#000000', // couleur du label
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000', // couleur du label quand focus
            },
          }}
          onChange={(e) => setName(e.target.value)}

        />
        <TextField
          label={t('contact.email')}
          name="email"
          required
          variant="filled"
          type="email"
          sx={{
            mb: 2,
            bgcolor: '#ccd6f6',
            borderRadius: 1,
            '& .MuiInputLabel-root': {
              color: '#000000', // couleur du label
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000', // couleur du label quand focus
            },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Editor
          ref={quillRef}
          defaultValue={defaultValue}
          onTextChange={(_delta, _oldDelta, source, quill) => {
            setMessage(quill.root.innerHTML);
          }}
          required
        />
        <Box sx={{ mb: 2 }}>
          {/* Champ caché pour envoyer le contenu Quill */}
          <input type="hidden" name="message" value={message} />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <MdSend className={sent ? 'send-fly' : ''} />}
          sx={{
            mt: 2,
            fontWeight: 'bold',
            alignSelf: 'center',
            px: 4,
            py: 1.5,
            bgcolor: '#ec4899',
            '&:hover': { bgcolor: '#db2777' },
            // Style personnalisé quand disabled
            '&.Mui-disabled': {
              bgcolor: '#a1a1aa',
              color: '#fff',
              opacity: 1,
            },
          }}
          disabled={loading}
        >
          {loading ? t('contact.buttonLoading') : t('contact.button')}
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;