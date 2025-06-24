"use client"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';

// Dynamically import the Editor component (Quill-based), only on client side
const Editor = dynamic(() => import('./Editor'), { ssr: false });

const Contact = () => {
  // Initialize translation function
  const t = useTranslations();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // State for Quill default value
  const [defaultValue, setDefaultValue] = useState(null);

  // State for loading and sent animation
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Ref for the Quill editor
  const quillRef = useRef();

  // Initialize Quill Delta for the editor's default value on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      let Quill = require('quill');
      Quill = Quill.default ? Quill.default : Quill;
      const Delta = Quill.import('delta');
      setDefaultValue(new Delta());
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send form data to the API endpoint
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
        setSent(true);
        setTimeout(() => setSent(false), 1200);
      } else {
        const error = await res.json();
        alert(error.error || t('error.sending'));
      }
    } finally {
      setLoading(false);
      setMessage('');
      setName('');
      setEmail('');
      if (quillRef.current) {
        quillRef.current.setContents([]);
      }
    }
  };

  return (
    // Main container with centered form and background styling
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
      name="contact"
    >
      {/* Contact form box */}
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
        {/* Title and description */}
        <Box sx={{ pb: 3 }}>
          <Text variant="h4" component="h2" fontWeight="bold" sx={{
            fontWeight: 'bold',
            borderBottom: '4px solid #ec4899',
            fontSize: { xs: 28, md: 36 },
            display: 'inline-block',
          }}>
            {t('contact.title')}
          </Text>
          <Text variant="body1" sx={{ py: 1 }}>
            {/* Rich translation with clickable mailto link */}
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
          </Text>
        </Box>
        {/* Name input field */}
        <TextField
          label={t('contact.name')}
          name="name"
          required
          variant="filled"
          value={name}
          sx={{
            mb: 2,
            bgcolor: '#ccd6f6',
            borderRadius: 1,
            '& .MuiInputLabel-root': {
              color: '#000000',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000',
            },
            '& .MuiInputBase-input': {
              color: '#000000', // <-- texte noir
            },
          }}
          onChange={(e) => setName(e.target.value)}

        />
        {/* Email input field */}
        <TextField
          label={t('contact.email')}
          name="email"
          required
          variant="filled"
          type="email"
          value={email}
          sx={{
            mb: 2,
            bgcolor: '#ccd6f6',
            borderRadius: 1,
            '& .MuiInputLabel-root': {
              color: '#000000',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000',
            },
            '& .MuiInputBase-input': {
              color: '#000000', // <-- texte noir
            },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Rich text editor for the message */}
        <Editor
          ref={quillRef}
          defaultValue={defaultValue}
          onTextChange={(_delta, _oldDelta, source, quill) => {
            setMessage(quill.root.innerHTML);
          }}

          required
        />
        <Box sx={{ mb: 2 }}>
          {/* Hidden input to send Quill content */}
          <input type="hidden" name="message" value={message} />
        </Box>
        {/* Submit button with loading and sent animation */}
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