import { Tracker } from 'react-tracker';
const tracker = new Tracker();

const anOtherTracker = new Tracker([
    pageViewListener,
    productClickListener,
    
  ]);
  const pageViewListener = (event, trackingHistory) {
    window.dataLayer.push(event);
  };
  tracker.on('PAGE_VIEW', pageViewListener);
  const pageViewEvent = (pageId, userId) => ({
    type: 'PAGE_VIEW',
    data: {
      pageId,
      userId
    }
  });
  
  