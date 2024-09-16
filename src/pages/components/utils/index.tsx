export function shortenSuiAddress(address: string): string {

    // Remove '0x' prefix, take the first 4 and last 4 characters
    const addressWithoutPrefix = address.slice(2);
    const start = addressWithoutPrefix.slice(0, 10);
    const end = addressWithoutPrefix.slice(-10);
  
    // Combine the parts with '0x' prefix and '...' in between
    return `0x${start}...${end}`;
  }
  
