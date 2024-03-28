export const useFormatLongText = (text: string, start: number, end: number): string => {
    const words = text.split(" ");
    const truncatedWords = words.slice(start, end);
    const truncatedText = truncatedWords.join(" ");
    return truncatedText;
  };
  