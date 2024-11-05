import { Check } from 'lucide-react'
import { Dispatch, SetStateAction, useContext } from 'react'
import { ColorHeaderContext } from '@/components/context/ColorHeaderContext'

interface SaveButtonProps {
  color: string
  setOpenColorPicker: Dispatch<SetStateAction<boolean>>
}

export function SaveButton({ color, setOpenColorPicker }: SaveButtonProps) {
  const { setColor } = useContext(ColorHeaderContext)

  return (
    <div>
      <button
        disabled={color === ''}
        type="button"
        className="rounded-full p-1.5 transition-colors duration-75"
        style={{
          backgroundColor: color === '' ? '#1e293b' : '#22c55e',
          color: color === '' ? '#64748b' : 'white',
        }}
        onClick={() => {
          setOpenColorPicker(false)
          setColor(color)
        }}
      >
        <Check className="h-4 w-4" />
      </button>
    </div>
  )
}
