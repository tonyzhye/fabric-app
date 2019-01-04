import { isMobile } from '../config';

export function getWebSiginUrl(): string {
  return (isMobile) ? '/m/signin' : '/signin';
}
