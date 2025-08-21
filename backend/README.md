# Agricultural Data API

A FastAPI backend that serves agricultural data based on time ranges for harvest yields and soil health metrics.

## Features

- **Time-based Data Filtering**: Query data for 7, 30, 90, 180, or 365 days
- **Harvest Data**: Total harvest amounts and trends
- **Monthly Harvest**: Monthly breakdown of harvest yields
- **Soil Health Metrics**: Nitrogen, CO2, organic matter, pH level, phosphorus, and potassium levels
- **Health Scoring**: Overall soil health score with trend analysis

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the API

```bash
# Using the CSV-based API
python main.py
```

The API will be available at: `http://localhost:8000`

## API Endpoints

### Main Dashboard Data
- `GET /api/dashboard?days=30` - Get all dashboard data for specified timeframe

### Individual Endpoints
- `GET /api/harvest-summary?days=30` - Get harvest summary with trend
- `GET /api/monthly-harvest?days=30` - Get monthly harvest data
- `GET /api/soil-health?days=30` - Get soil health metrics
- `GET /api/time-ranges` - Get available time range options

### Parameters
- `days` (optional): Number of days to query (default: 30)
  - Options: 7, 30, 90, 180, 365

## Data Format

### Harvest Summary Response
```json
{
  "totalHarvest": 1250.50,
  "trend": "+12.5%"
}
```

### Monthly Harvest Response
```json
[
  { "month": "January", "harvestYield": 186.5 },
  { "month": "February", "harvestYield": 305.2 }
]
```

### Soil Health Response
```json
{
  "chartData": [
    { "substance": "Nitrogen", "amount": 186 },
    { "substance": "CO2", "amount": 305 }
  ],
  "healthScore": 245.8,
  "healthTrend": "+5.2%"
}
```

## CSV Data Format

The API reads from `sample_data.csv` with the following columns:
- `date`: Date in YYYY-MM-DD format
- `harvest_yield`: Harvest yield amount
- `nitrogen`: Nitrogen levels
- `co2`: CO2 levels
- `organic_matter`: Organic matter content
- `ph_level`: pH level
- `phosphorus`: Phosphorus content
- `potassium`: Potassium content

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (Next.js default)
- `http://localhost:3001`

Update the CORS origins in the code if your frontend runs on a different port.

## Development

To extend this API:
1. Modify the CSV data structure in `sample_data.csv`
2. Update the data models in the Python files
3. Add new endpoints as needed
4. Update the frontend integration accordingly
