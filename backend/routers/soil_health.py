from fastapi import APIRouter, Query
from utils.utils import load_csv_data, filter_data_by_timeframe, calculate_trend

router = APIRouter()

@router.get("/soil-health")
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
