"use client"

import { useContext } from "react"
import { DesignerContext } from "../context/DesignerContext"

export function useDesigner(){
  const context = useContext(DesignerContext)

  if(!context) {
    throw new Error("useDesigner must be used within a DesignerContext")
  }

  return context
}