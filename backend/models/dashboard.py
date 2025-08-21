from pydantic import BaseModel
from typing import List
from .harvest import HarvestData, MonthlyHarvestData
from .soil_health import SoilHealthResponse

class DashboardResponse(BaseModel):
    harvestSummary: HarvestData
    monthlyHarvest: List[MonthlyHarvestData]
    soilHealth: SoilHealthResponse
