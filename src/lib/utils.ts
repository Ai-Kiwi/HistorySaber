// Function to format date as yyyy-mm-dd
export function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function haveSameValues(arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) return false;
  
    // Sort both arrays and compare element by element
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
  
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }
  
    return true;
}

export function getDateWithoutTime(date: Date) {
  date.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
  return date;
}

export function daysSinceRankCollectStart() {
  const targetDate : Date = new Date('2025-03-10');
  const currentDate : Date = new Date();
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatNumberShort(num : number) {
  const formatCash = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 2
  }).format(num);
  return formatCash
}