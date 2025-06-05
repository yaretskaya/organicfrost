import { createContext, useContext, useState, type ReactNode } from "react"

interface DropdownMenuPrimitiveProps {
  children: ReactNode
  onOpenChange?: (isOpen: boolean) => void
}

const DropdownMenuContext = createContext<{
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
} | null>(null)

export const DropdownMenuPrimitive: React.FC<DropdownMenuPrimitiveProps> = ({ children, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const contextValue = {
    isOpen,
    onOpenChange: (isOpen) => {
      setIsOpen(isOpen)
      onOpenChange?.(isOpen)
    },
  }

  return <DropdownMenuContext.Provider value={contextValue}>{children}</DropdownMenuContext.Provider>
}

export const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext)
  if (context === null) {
    throw new Error("useDropdownMenu must be used within a DropdownMenuPrimitive")
  }
  return context
}

export const DropdownMenuPrimitiveButton = () => {
  const { isOpen, onOpenChange } = useDropdownMenu()
  return <button onClick={() => onOpenChange(!isOpen)}>{isOpen ? "Close" : "Open"}</button>
}

export const DropdownMenuPrimitiveContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useDropdownMenu()
  return isOpen ? <div>{children}</div> : null
}

