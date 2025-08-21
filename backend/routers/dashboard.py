from fastapi import APIRouter, Query
from models.dashboard import DashboardResponse
from models.harvest import HarvestData, MonthlyHarvestData
from models.soil_health import SoilHealthResponse, SoilHealthData
from utils.utils import load_csv_data, filter_data_by_timeframe, calculate_trend

router = APIRouter()

@router.get("/dashboard", response_model=DashboardResponse)
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
