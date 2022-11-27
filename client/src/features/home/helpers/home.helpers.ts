export const truncateText = (text: string, max: number) =>
  text.length > max ? `${text.substr(0, max)}...` : text;
