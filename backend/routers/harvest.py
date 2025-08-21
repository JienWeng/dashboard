from fastapi import APIRouter, Query
from utils.utils import load_csv_data, filter_data_by_timeframe, calculate_trend

router = APIRouter()

@router.get("/harvest-summary")
async def get_harvest_summary(days: int = Query(30)):
    df = load_csv_data()
    if df.empty:
        return {"totalHarvest": 0, "trend": "+0%"}
    filtered_df = filter_data_by_timeframe(df, days)
    if filtered_df.empty:
        filtered_df = df.tail(min(10, len(df)))
    yields = filtered_df['harvest_yield'].tolist()
    return {"totalHarvest": round(sum(yields), 2), "trend": calculate_trend(yields)}

@router.get("/monthly-harvest")
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
