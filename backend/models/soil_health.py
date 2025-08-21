from pydantic import BaseModel
from typing import List

class SoilHealthData(BaseModel):
    substance: str
    amount: float

class SoilHealthResponse(BaseModel):
    chartData: List[SoilHealthData]
    healthScore: float
    healthTrend: str
