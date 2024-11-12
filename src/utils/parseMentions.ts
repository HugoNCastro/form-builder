import { AttemptData } from "@/types";

export function parseMentions(text: string, data: AttemptData): string {
    try {
      const parsedData = JSON.parse(data.js_segmentacao);
  
      const parsedDataUpperCaseKeys = Object.fromEntries(
        Object.entries(parsedData).map(([key, value]) => [key.toUpperCase(), value])
      );
  
      return text.replace(/@(\w+)/g, (_, key) => {
        const upperKey = key.toUpperCase();
        console.log(`Key: ${upperKey}, Value: ${parsedDataUpperCaseKeys[upperKey]}`, 'log');
        
        return parsedDataUpperCaseKeys[upperKey] !== undefined 
          ? String(parsedDataUpperCaseKeys[upperKey]) 
          : `@${key}`;
      });
    } catch (error) {
      console.error("Erro ao fazer o parse do objeto attemptData:", error);
      return text;
    }
  }
  