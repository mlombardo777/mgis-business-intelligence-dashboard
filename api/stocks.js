/**
 * Serverless Function: Stock Price Fetcher
 *
 * This function fetches real-time stock prices for major technology competitors
 * from the API Ninjas Stock Price endpoint. It's designed for deployment on Vercel
 * and handles API authentication securely using environment variables.
 *
 * Endpoint: /api/stocks
 * Method: GET
 * Returns: JSON array of stock data with company info, prices, and timestamps
 */

// Configuration: Companies to track
const COMPANIES = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  { ticker: 'GOOGL', name: 'Alphabet Inc. (Google)' },
  { ticker: 'META', name: 'Meta Platforms Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.' }
];

/**
 * Fetches stock price for a single ticker from API Ninjas
 * @param {string} ticker - Stock ticker symbol
 * @param {string} apiKey - API authentication key
 * @returns {Promise<Object>} Stock price data
 */
async function fetchStockPrice(ticker, apiKey) {
  const url = `https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`;

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
    console.error(`Error fetching ${ticker}:`, error.message);
    throw error;
  }
}

/**
 * Main serverless function handler
 * Fetches stock data for all tracked companies and returns formatted results
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

  try {
    // Fetch stock prices for all companies in parallel for better performance
    const stockPromises = COMPANIES.map(async (company) => {
      try {
        const priceData = await fetchStockPrice(company.ticker, apiKey);

        return {
          ticker: company.ticker,
          name: company.name,
          price: priceData.price,
          timestamp: new Date().toISOString(),
          success: true
        };
      } catch (error) {
        // Return error info for individual stock failures
        return {
          ticker: company.ticker,
          name: company.name,
          price: null,
          timestamp: new Date().toISOString(),
          success: false,
          error: error.message
        };
      }
    });

    // Wait for all requests to complete
    const results = await Promise.all(stockPromises);

    // Check if all requests failed
    const successfulResults = results.filter(r => r.success);
    if (successfulResults.length === 0) {
      return res.status(503).json({
        error: 'Service unavailable',
        message: 'Unable to fetch stock data from provider',
        details: results
      });
    }

    // Return successful results with metadata
    return res.status(200).json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
      count: results.length,
      successCount: successfulResults.length
    });

  } catch (error) {
    console.error('Unexpected error in stock handler:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred while fetching stock data',
      details: error.message
    });
  }
}
