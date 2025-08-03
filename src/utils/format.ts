
export const truncate = (text: string, limit = 120) =>
    text.length > limit ? text.slice(0, limit).trimEnd() + '…' : text
  
  export const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(iso))
  