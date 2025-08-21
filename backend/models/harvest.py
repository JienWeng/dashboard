from pydantic import BaseModel
from typing import List

class HarvestData(BaseModel):
    totalHarvest: float
    trend: str

class MonthlyHarvestData(BaseModel):
    month: str
    harvestYield: float
