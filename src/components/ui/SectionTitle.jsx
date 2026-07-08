'use client';

import Text from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Reveal from './Reveal';

// Shared "section title (+ optional description)" block repeated at the top
// of About, Skills, Projects, GithubStats and Contact: a bold heading with
// an accent-colored underline, revealed on scroll, with an optional
// description revealed just after it. `description` accepts a node (not
// just a string) so callers like Contact can pass rich/translated JSX.
export default function SectionTitle({
  title,
  titleVariant = 'h3',
  titleComponent = 'h2',
  titleSx,
  description,
  descriptionVariant = 'subtitle1',
  descriptionSx,
}) {
  const theme = useTheme();

  return (
    <>
      <Reveal direction="up" distance={40}>
        <Text
          variant={titleVariant}
          component={titleComponent}
          fontWeight="bold"
          sx={{
            borderBottom: `4px solid ${theme.palette.primary.main}`,
            fontSize: { xs: 28, md: 36 },
            display: 'inline-block',
            ...titleSx,
          }}
        >
          {title}
        </Text>
      </Reveal>
      {description ? (
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant={descriptionVariant} component="p" sx={{ py: 2, ...descriptionSx }}>
            {description}
          </Text>
        </Reveal>
      ) : null}
    </>
  );
}
