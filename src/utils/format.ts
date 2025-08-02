export const truncate = (text: string, limit = 120) =>
    text.length > limit ? text.slice(0, limit).trimEnd() + '…' : text
  