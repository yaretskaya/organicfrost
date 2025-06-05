import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(12) // Using 12 rounds for better security
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    console.error("Error hashing password:", error)
    throw new Error("Failed to hash password")
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword)
    return isValid
  } catch (error) {
    console.error("Error verifying password:", error)
    throw new Error("Failed to verify password")
  }
}

