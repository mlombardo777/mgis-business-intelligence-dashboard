# Business Intelligence Dashboard - Competitor Stock Tracking

A professional business intelligence dashboard that provides real-time stock performance tracking for major technology companies. Designed for deployment on Vercel with serverless architecture.

## 🎯 Overview

This dashboard helps business professionals quickly assess competitive positioning by comparing stock performance across major technology companies. Built with vanilla JavaScript for optimal performance and ease of deployment.

## 🏢 Tracked Companies

- **Apple Inc.** (AAPL)
- **Microsoft Corporation** (MSFT)
- **Alphabet Inc. / Google** (GOOGL)
- **Meta Platforms Inc.** (META)
- **Amazon.com Inc.** (AMZN)

## ✨ Features

### Dashboard Features
- **Real-time Stock Data**: Live stock prices from API Ninjas
- **Visual Highlighting**: Highest prices in green, lowest in red
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Data Export**: Download data as CSV for reports and presentations
- **Auto-refresh**: Manual refresh with loading indicators
- **Accessibility**: WCAG AA compliant with keyboard shortcuts
- **Professional UI**: High-contrast design suitable for business presentations

### Technical Features
- **Serverless Architecture**: Scalable Vercel serverless functions
- **Secure API Calls**: API keys stored in environment variables
- **Error Handling**: Comprehensive error states and retry logic
- **Loading States**: Professional loading animations
- **CORS Support**: Cross-origin resource sharing enabled

## 🚀 Deployment Guide

### Prerequisites
- Vercel account ([sign up here](https://vercel.com))
- API Ninjas API key ([get one here](https://api-ninjas.com))

### Step 1: Get API Key
1. Visit [API Ninjas](https://api-ninjas.com)
2. Sign up for a free account
3. Navigate to "API Keys" section
4. Copy your API key

### Step 2: Deploy to Vercel

#### Option A: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy the project
vercel

# Set environment variable
vercel env add API_KEY
# Paste your API Ninjas key when prompted

# Deploy to production
vercel --prod
```

#### Option B: Deploy via GitHub
1. Push this repository to GitHub
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Add Environment Variable:
   - **Name**: `API_KEY`
   - **Value**: Your API Ninjas key
6. Click "Deploy"

### Step 3: Verify Deployment
1. Visit your deployed URL (provided by Vercel)
2. Dashboard should load and display stock data
3. Test the "Refresh Data" and "Export to CSV" buttons

## 📁 Project Structure

```
mgis-business-intelligence-dashboard/
├── api/
│   └── stocks.js           # Serverless function for API calls
├── index.html              # Main dashboard interface
├── vercel.json             # Vercel deployment configuration
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables
Set the following environment variable in Vercel:

- `API_KEY`: Your API Ninjas API key

### Modifying Tracked Companies
To track different companies, edit the `COMPANIES` array in `api/stocks.js`:

```javascript
const COMPANIES = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  // Add or modify companies here
];
```

## 🎨 Customization

### Styling
All styles are contained in `index.html`. Key customization points:

- **Colors**: Modify the gradient values in the CSS `:root` section
- **Fonts**: Change the `font-family` in the `body` selector
- **Layout**: Adjust `max-width` in `.container` class

### Features
- **Change Indicator Logic**: Modify `generateChangeIndicator()` function
- **Refresh Interval**: Add auto-refresh by implementing `setInterval()`
- **Additional Data**: Extend API call to include volume, market cap, etc.

## 🔐 Security

- API keys are stored as environment variables (never in code)
- CORS headers properly configured
- Input validation on all API endpoints
- Error messages don't expose sensitive information

## ♿ Accessibility

- WCAG AA compliant contrast ratios (minimum 4.5:1)
- Keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- Reduced motion support for accessibility preferences

### Keyboard Shortcuts
- `Ctrl/Cmd + R`: Refresh data
- `Ctrl/Cmd + E`: Export to CSV
- `Tab`: Navigate between buttons

## 📊 Data Export

The "Export to CSV" feature allows you to:
- Download current stock data as CSV
- Include timestamps for each data point
- Use data in Excel, Google Sheets, or presentations
- Maintain historical records of stock prices

## 🐛 Troubleshooting

### "Unable to load data" Error
1. Verify API_KEY environment variable is set in Vercel
2. Check API Ninjas API key is valid
3. Ensure you haven't exceeded API rate limits
4. Check Vercel function logs for detailed errors

### Data Not Updating
1. Click "Refresh Data" button manually
2. Check browser console for JavaScript errors
3. Verify network connectivity
4. Clear browser cache and reload

### Styling Issues
1. Ensure you're using a modern browser
2. Clear browser cache
3. Check for CSS conflicts if embedded in another site

## 🔄 API Rate Limits

API Ninjas free tier includes:
- 10,000 requests per month
- Sufficient for continuous monitoring

To optimize API usage:
- Cache responses on client side
- Implement rate limiting for refresh button
- Consider upgrading API plan for high-traffic deployments

## 📈 Future Enhancements

Potential improvements for this dashboard:

- [ ] Historical price charts
- [ ] Percentage change calculations
- [ ] Market cap and volume data
- [ ] Custom company selection
- [ ] Email alerts for price changes
- [ ] Multi-currency support
- [ ] Dark/light theme toggle
- [ ] Real-time WebSocket updates

## 📝 License

This project is created for educational purposes as part of a business intelligence class project.

## 🤝 Contributing

This is a class project, but suggestions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Consult API Ninjas documentation

## 🎓 Academic Context

This project was created as part of a Management Information Systems (MGIS) business intelligence course to demonstrate:
- Real-time data integration
- Professional dashboard design
- Serverless architecture
- Business intelligence reporting
- Data visualization best practices

---

**Built with ❤️ for Business Intelligence**
