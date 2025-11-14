/**
 * Serverless Function: Earnings Call Transcript Fetcher
 *
 * This function fetches earnings call transcripts from API Ninjas
 * for specified company tickers. Designed for deployment on Vercel.
 *
 * Endpoint: /api/earnings?ticker=TICKER
 * Method: GET
 * Query Parameters:
 *   - ticker: Stock ticker symbol (required)
 * Returns: JSON with earnings call transcript data
 */

/**
 * Fetches earnings call transcript for a ticker from API Ninjas
 * @param {string} ticker - Stock ticker symbol
 * @param {string} apiKey - API authentication key
 * @returns {Promise<Object>} Earnings transcript data
 */
async function fetchEarningsTranscript(ticker, apiKey) {
  const url = `https://api.api-ninjas.com/v1/earningstranscript?ticker=${ticker}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed for ${ticker}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching earnings transcript for ${ticker}:`, error.message);
    throw error;
  }
}

/**
 * Main serverless function handler
 * Fetches earnings transcript for the specified ticker
 */
export default async function handler(req, res) {
  // Enable CORS for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'This endpoint only accepts GET requests'
    });
  }

  // Validate API key is configured
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('API_KEY environment variable is not configured');
    return res.status(500).json({
      error: 'Configuration error',
      message: 'API authentication is not properly configured'
    });
  }

  // Get ticker from query parameters
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({
      error: 'Bad request',
      message: 'Ticker parameter is required. Usage: /api/earnings?ticker=MSFT'
    });
  }

  try {
    // Fetch earnings transcript
    const transcriptData = await fetchEarningsTranscript(ticker.toUpperCase(), apiKey);

    // Check if we got valid data
    if (!transcriptData || Object.keys(transcriptData).length === 0) {
      return res.status(404).json({
        error: 'Not found',
        message: `No earnings transcript found for ticker ${ticker}`,
        ticker: ticker.toUpperCase()
      });
    }

    // Return successful result
    return res.status(200).json({
      success: true,
      ticker: ticker.toUpperCase(),
      data: transcriptData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in earnings handler:', error);

    // Handle specific error cases
    if (error.message.includes('404')) {
      return res.status(404).json({
        error: 'Not found',
        message: `No earnings transcript found for ticker ${ticker}`,
        ticker: ticker.toUpperCase()
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred while fetching earnings transcript',
      details: error.message,
      ticker: ticker.toUpperCase()
    });
  }
}
