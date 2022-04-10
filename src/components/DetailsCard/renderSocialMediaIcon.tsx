import React, { ReactElement } from 'react';
import { Facebook, GitHub, Instagram, Twitter, Linkedin } from 'react-feather';

import type { SocialMediaName } from './DetailsCard.types';

const socialMediaIcons = {
  facebook: Facebook,
  github: GitHub,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export const renderSocialMediaIcon = (socialMediaName: SocialMediaName, className: string): ReactElement => {
  const Icon = socialMediaIcons[socialMediaName];

  return <Icon className={className} />;
};
