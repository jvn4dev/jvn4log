import colors from '@/themes/colors';
import { device } from '@/themes/device';
import fontSizes from '@/themes/fontSizes';
import letterSpacings from '@/themes/letterSpacings';
import lineHeights from '@/themes/lineHeights';
import space from '@/themes/spaces';

export const theme = {
  space,
  lineHeights,
  letterSpacings,
  fontSizes,
  colors,
  device,
} as const;
