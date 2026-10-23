import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="wp-site-header">
      <Navbar {...props} />
      <p className="wp-site-description">{siteConfig.tagline}</p>
      <div className="wp-header-image">
        <img src={useBaseUrl('/img/header.jpg')} alt="" width={1920} height={499} />
      </div>
    </header>
  );
}
