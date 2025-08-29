export function getDateRange(centerISO, daysBefore=4, daysAfter=4){
  const center = new Date(centerISO);
  const arr=[];
  for(let i=-daysBefore;i<=daysAfter;i++){
    const d = new Date(center);
    d.setDate(center.getDate()+i);
    arr.push(d.toISOString().slice(0,10));
  }
  return arr;
}

export function formatDisplay(iso){
  const d = new Date(iso+ 'T00:00:00');
  const day = d.getDate();
  const weekday = d.toLocaleDateString(undefined,{weekday:'short'});
  return { day, weekday };
}
