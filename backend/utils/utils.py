from typing import List
from datetime import datetime, timedelta
import pandas as pd
import os

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