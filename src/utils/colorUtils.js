import { defaultRadius } from '../actions/firebaseVars';

const VISIBILITY_LIMIT = defaultRadius;
// const TIME_LIMIT_DAYS = 15;
// const TIME_LIMIT = TIME_LIMIT_DAYS * 24 * 60 * 60 * 1000;

export function getOpacity(memory) {
  // const now = (new Date()).valueOf();
  // const timeDecayFactor = 0.5 * (now - memory.createdAt) / TIME_LIMIT;
  const distanceFactor = memory.distance / VISIBILITY_LIMIT;
  // let opacity = 1 - (timeDecayFactor + distanceFactor);
  let opacity = 1 - distanceFactor;
  if (opacity < 0) {
    opacity = 0.02;
  }
  return opacity;
}

export function getColorFromReactions(reactions) {
  let rgb = {r:255, g:255, b:255};
  const EMOTIONS = {
    'smile': 'yellow',
    'meh': 'red',
    'frown': 'blue'
  };
  const COLORS = {
    yellow: {r:255, g:222, b:23},
    red: {r:237, g:28, b:36},
    blue: {r:33, g:64, b:154}
  };

  let nS = reactions.smile || 0;
  let nF = reactions.frown || 0;
  let nM = reactions.meh || 0;
  while ((nS + nF + nM) > 0) {      // for each emotional reaction, take a 10% step towards a primary color, alternating
    if (nS > 0) {
      rgb = {
        r: Math.floor(rgb.r + (COLORS[EMOTIONS.smile].r - rgb.r) / 10),
        g: Math.floor(rgb.g + (COLORS[EMOTIONS.smile].g - rgb.g) / 10),
        b: Math.floor(rgb.b + (COLORS[EMOTIONS.smile].b - rgb.b) / 10)
      };
      nS--;
    }
    if (nF > 0) {
      rgb = {
        r: Math.floor(rgb.r + (COLORS[EMOTIONS.frown].r - rgb.r) / 10),
        g: Math.floor(rgb.g + (COLORS[EMOTIONS.frown].g - rgb.g) / 10),
        b: Math.floor(rgb.b + (COLORS[EMOTIONS.frown].b - rgb.b) / 10)
      };
      nF--;
    }
    if (nM > 0) {
      rgb = {
        r: Math.floor(rgb.r + (COLORS[EMOTIONS.meh].r - rgb.r) / 10),
        g: Math.floor(rgb.g + (COLORS[EMOTIONS.meh].g - rgb.g) / 10),
        b: Math.floor(rgb.b + (COLORS[EMOTIONS.meh].b - rgb.b) / 10)
      };
      nM--;
    }
  }
  return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)';
}
