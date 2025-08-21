from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import harvest, soil_health, dashboard
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

# Include routers
app.include_router(harvest.router, prefix="/api")
app.include_router(soil_health.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Agricultural Data API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)