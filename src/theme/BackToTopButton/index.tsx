import { translate } from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useBackToTopButton } from '@docusaurus/theme-common/internal';
import clsx from 'clsx';
import { type ReactNode } from 'react';

import { IconArrowUpDashed } from '@tabler/icons-react';
import styles from './styles.module.css';

export default function BackToTopButton(): ReactNode {
  const {shown, scrollToTop} = useBackToTopButton({threshold: 300});
  return (
    <button
      aria-label={translate({
        id: 'theme.BackToTopButton.buttonAriaLabel',
        message: 'Scroll back to top',
        description: 'The ARIA label for the back to top button',
      })}
      className={clsx(
        'clean-btn',
        ThemeClassNames.common.backToTopButton,
        styles.backToTopButton,
        shown && styles.backToTopButtonShow,

      )}
      type="button"
      onClick={scrollToTop}
    >
      <IconArrowUpDashed className='size-6 text-(--ifm-color-emphasis-1000) opacity-50' />
    </button>
  );
}
