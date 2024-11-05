import { Check } from 'lucide-react'
import { Input } from './input'

export function CustomView() {
  return (
    <div className="relative flex my-4 items-center">
      <div className="flex flex-col gap-1 items-center">
        <Input label="HEX" />
        <Input label="R" />
        <Input label="G" />
        <Input label="B" />
      </div>
      <div className="absolute -bottom-4 right-0">
        <button
          className="rounded-full p-1.5 transition-colors duration-75"
          style={{
            backgroundColor: '#22c55e',
            color: 'white',
          }}
          type="button"
        >
          <Check className="h-4 w-4 " />
        </button>
      </div>
    </div>
  )
}
