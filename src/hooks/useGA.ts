import ReactGA from 'react-ga4';
import { useEffect } from 'react';

const GA_ID = import.meta.env.VITE_GA_ID;

export const useGA = () => {
  useEffect(() => {
    if (GA_ID) {
      ReactGA.initialize(GA_ID);
    }
  }, []);
};

export const trackPageView = (page: string) => {
  if (GA_ID) {
    ReactGA.send({ hitType: 'pageview', page });
  }
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (GA_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};


