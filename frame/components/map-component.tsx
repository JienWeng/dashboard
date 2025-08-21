// components/map-component.tsx
import { IconMap } from "@tabler/icons-react"

export function MapComponent() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg border border-dashed border-blue-300 h-full">
      <div className="flex items-center gap-2 mb-2">
        <IconMap className="size-5 text-blue-700" />
        <h3 className="font-semibold text-blue-800">Geographical Map</h3>
      </div>
      <p className="text-sm text-blue-600 mb-4">User distribution and regional performance</p>
      
      {/* Map Visualization Area */}
      <div className="bg-white p-6 rounded-lg border border-blue-200 flex flex-col items-center justify-center h-64">
        <div className="text-center text-gray-400 mb-4">
          <IconMap className="size-12 mx-auto mb-2" />
          <p>Map visualization will be implemented here</p>
        </div>
        
        {/* Sample Map Grid (placeholder) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-blue-100 border border-blue-200 rounded flex items-center justify-center"
            >
              <span className="text-xs text-blue-600">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Controls (placeholder) */}
      <div className="flex gap-2 mt-4">
        <div className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
          Zoom: 100%
        </div>
        <div className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
          Regions: 12
        </div>
        <div className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
          Active Users: 45.6K
        </div>
      </div>
    </div>
  )
}