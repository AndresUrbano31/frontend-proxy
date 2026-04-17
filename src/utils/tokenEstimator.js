/**
 * Estimates the number of tokens in a string.
 * A rough rule of thumb is that 1 token is approximately 4 characters or 0.75 words.
 * For this utility, we'll use a slightly conservative estimation.
 */
export const estimateTokens = (text) => {
  if (!text) return 0;
  
  // Basic estimation: ~4 characters per token for English/Code
  // Or ~1.3 tokens per word
  const words = text.trim().split(/\s+/).length;
  const chars = text.length;
  
  const tokenEstimate = Math.ceil(Math.max(words * 1.3, chars / 4));
  
  return tokenEstimate;
};
