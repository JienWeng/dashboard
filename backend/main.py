from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime, timedelta
import pandas as pd
import os
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Agricultural Data API", version="1.0.0")

# CORS middleware for frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data models ---
class HarvestData(BaseModel):
    totalHarvest: float
    trend: str

class MonthlyHarvestData(BaseModel):
    month: str
    harvestYield: float

class SoilHealthData(BaseModel):
    substance: str
    amount: float

class SoilHealthResponse(BaseModel):
    chartData: List[SoilHealthData]
    healthScore: float
    healthTrend: str

class DashboardResponse(BaseModel):
    harvestSummary: HarvestData
    monthlyHarvest: List[MonthlyHarvestData]
    soilHealth: SoilHealthResponse

# --- Helper functions ---
def load_csv_data() -> pd.DataFrame:
    """Load data from CSV file"""
    try:
        csv_path = os.path.join(os.path.dirname(__file__), "sample_data.csv")
        df = pd.read_csv(csv_path)
        df['date'] = pd.to_datetime(df['date'])
        return df
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return pd.DataFrame()

def filter_data_by_timeframe(df: pd.DataFrame, days: int) -> pd.DataFrame:
    """Filter dataframe based on number of days from today"""
    if df.empty:
        return pd.DataFrame()
    cutoff_date = datetime.now() - timedelta(days=days)
    return df[df['date'] >= cutoff_date]

def calculate_trend(values: List[float]) -> str:
    """
    Calculate percentage trend comparing recent vs older period within filtered data.
    - First half = older data
    - Second half = recent data
    """
    if not values or len(values) < 2:
        return "+0%"

    mid = len(values) // 2
    older_avg = sum(values[:mid]) / mid if mid > 0 else 0
    recent_avg = sum(values[mid:]) / (len(values) - mid) if mid < len(values) else older_avg

    if older_avg == 0:
        return "+0%"

    change = ((recent_avg - older_avg) / older_avg) * 100
    sign = "+" if change >= 0 else ""
    return f"{sign}{change:.1f}%"

# --- API Endpoints ---
@app.get("/")
async def root():
    return {"message": "Agricultural Data API is running"}

@app.get("/api/dashboard", response_model=DashboardResponse)
async def get_dashboard_data(days: int = Query(30, description="Number of days to query data for")):
    df = load_csv_data()
    if df.empty:
        return DashboardResponse(
            harvestSummary=HarvestData(totalHarvest=0, trend="+0%"),
            monthlyHarvest=[],
            soilHealth=SoilHealthResponse(chartData=[], healthScore=0, healthTrend="+0%")
        )

    filtered_df = filter_data_by_timeframe(df, days)
    if filtered_df.empty:
        filtered_df = df.tail(min(12, len(df)))

    # --- Harvest Summary ---
    harvest_yields = filtered_df['harvest_yield'].tolist()
    total_harvest = sum(harvest_yields)
    harvest_summary = HarvestData(
        totalHarvest=round(total_harvest, 2),
        trend=calculate_trend(harvest_yields)
    )

    # --- Monthly Harvest ---
    monthly_harvest = []
    for _, row in filtered_df.iterrows():
        month_name = row['date'].strftime('%B')
        monthly_harvest.append(MonthlyHarvestData(
            month=month_name,
            harvestYield=round(row['harvest_yield'], 1)
        ))

    # --- Soil Health ---
    soil_substances = ['nitrogen', 'co2', 'organic_matter', 'ph_level', 'phosphorus', 'potassium']
    soil_chart_data = []
    soil_values = []
    for substance in soil_substances:
        if substance in filtered_df.columns:
            avg_amount = filtered_df[substance].mean()
            display_name = substance.replace('_', ' ').title()
            soil_chart_data.append(SoilHealthData(substance=display_name, amount=round(avg_amount, 1)))
            soil_values.extend(filtered_df[substance].tolist())

    health_score = sum(soil_values) / len(soil_values) if soil_values else 0
    soil_health_response = SoilHealthResponse(
        chartData=soil_chart_data,
        healthScore=round(health_score, 1),
        healthTrend=calculate_trend(soil_values)
    )

    return DashboardResponse(
        harvestSummary=harvest_summary,
        monthlyHarvest=monthly_harvest[:12],
        soilHealth=soil_health_response
    )

@app.get("/api/harvest-summary")
async def get_harvest_summary(days: int = Query(30)):
    df = load_csv_data()
    if df.empty:
        return {"totalHarvest": 0, "trend": "+0%"}
    filtered_df = filter_data_by_timeframe(df, days)
    if filtered_df.empty:
        filtered_df = df.tail(min(10, len(df)))
    yields = filtered_df['harvest_yield'].tolist()
    return {"totalHarvest": round(sum(yields), 2), "trend": calculate_trend(yields)}

@app.get("/api/monthly-harvest")
async def get_monthly_harvest(days: int = Query(30)):
    df = load_csv_data()
    if df.empty:
        return []
    filtered_df = filter_data_by_timeframe(df, days)
    if filtered_df.empty:
        filtered_df = df.tail(min(12, len(df)))
    result = []
    for _, row in filtered_df.iterrows():
        month_name = row['date'].strftime('%B')
        result.append({"month": month_name, "harvestYield": round(row['harvest_yield'], 1)})
    return result[:12]

@app.get("/api/soil-health")
async def get_soil_health(days: int = Query(30)):
    df = load_csv_data()
    if df.empty:
        return {"chartData": [], "healthScore": 0, "healthTrend": "+0%"}
    filtered_df = filter_data_by_timeframe(df, days)
    if filtered_df.empty:
        filtered_df = df.tail(min(10, len(df)))
    soil_substances = ['nitrogen', 'co2', 'organic_matter', 'ph_level', 'phosphorus', 'potassium']
    chart_data = []
    soil_values = []
    for substance in soil_substances:
        if substance in filtered_df.columns:
            avg_amount = filtered_df[substance].mean()
            display_name = substance.replace('_', ' ').title()
            chart_data.append({"substance": display_name, "amount": round(avg_amount, 1)})
            soil_values.extend(filtered_df[substance].tolist())
    health_score = sum(soil_values) / len(soil_values) if soil_values else 0
    return {"chartData": chart_data, "healthScore": round(health_score, 1), "healthTrend": calculate_trend(soil_values)}

@app.get("/api/time-ranges")
async def get_available_time_ranges():
    return {
        "ranges": [
            {"label": "Last 7 days", "days": 7},
            {"label": "Last 30 days", "days": 30},
            {"label": "Last 90 days", "days": 90},
            {"label": "Last 6 months", "days": 180},
            {"label": "Last year", "days": 365}
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)