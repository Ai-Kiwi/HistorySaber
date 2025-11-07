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
    const sorted_arr_1 = arr1.slice().sort();
    const sorted_arr_2 = arr2.slice().sort();
  
    for (let i = 0; i < sorted_arr_1.length; i++) {
      if (sorted_arr_1[i] !== sorted_arr_2[i]) {
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
  const target_date : Date = new Date('2025-03-10');
  const current_date : Date = new Date();
  const time_difference = current_date.getTime() - target_date.getTime();
  const days_difference = Math.floor(time_difference / (1000 * 60 * 60 * 24));
  return days_difference;
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

export function parseLevelDifficulties(difficulty : number) {
  if (difficulty == 1) {
      return "Easy"
  }else if (difficulty == 3) {
      return "Normal"
  }else if (difficulty == 5) {
      return "Hard"
  }else if (difficulty == 7) {
      return "Expert"
  }else if (difficulty == 9) {
      return "Expert+"
  }else {
    return "Unknown"
  }
}