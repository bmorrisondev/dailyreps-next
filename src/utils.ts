export function secondsToTimestamp(seconds: number) {
  return `${seconds < 60 ? '0' : Math.ceil(seconds/60)}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`
}