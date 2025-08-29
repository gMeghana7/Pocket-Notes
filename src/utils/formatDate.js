export const formatDateTime = (date = new Date()) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-GB', { month: 'short' });
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  return `${day} ${month} ${year} • ${time}`;
};