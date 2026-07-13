export type ModeType = 'principles' | 'tokens' | 'components' | 'layouts' | 'interaction' | 'content' | 'accessibility' | 'tooling';

export interface Principle {
  id: string;
  name: string;
  description: string;
  roakDetail: string;
  m3Equivalent: string;
  m3Detail: string;
  safetyRating: 'critical' | 'high' | 'medium';
  iconName: string;
}

export interface TypographyToken {
  name: string;
  family: string;
  weight: string;
  size: string;
  lineHeight: string;
  useCase: string;
  letterSpacing?: string;
  decoration?: string;
}

export interface MapAsset {
  id: string;
  name: string;
  type: 'vehicle' | 'static-gate' | 'static-camera' | 'stationary-dump';
  status: 'online' | 'warning' | 'critical' | 'offline';
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  info: string;
}

export interface SpacingPreset {
  name: string;
  value: string;
  description: string;
}
