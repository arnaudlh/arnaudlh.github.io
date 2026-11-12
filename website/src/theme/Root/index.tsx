import type {ReactNode} from 'react';
import AnalyticsConsent from '@site/src/components/AnalyticsConsent';

export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <AnalyticsConsent />
    </>
  );
}
