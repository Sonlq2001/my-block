const SHS_B = (e: any, sc: number, eAmt: number, start: number, y: number) => {
  e.scrollLeft = eAmt * sc + start;
};

export const smoothHorizontalScroll = (
  e: any,
  time: number,
  amount: number,
  start: number
) => {
  const eAmt = amount / 100;
  let curTime = 0;
  let scrollCounter = 0;
  const y = window.scrollY;

  while (curTime <= time) {
    window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start, y);
    curTime += time / 100;
    scrollCounter++;
  }
  window.scrollTo(0, y);
};
