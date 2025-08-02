// Converts ISO date to 'DD/MM/YYYY'
export  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-GB');
  };
  
  // Converts ISO time to 'HH:mm'
  export  const formatTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculates duration in hours (decimal)
  export  const getDurationInHours = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e.getTime() - s.getTime()) / (1000 * 60 * 60); // milliseconds to hours
    return Math.max(0, diff);
  };
  
  // Formats decimal hours to "Xh Ym"
  export  const formatHours = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };
  