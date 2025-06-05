import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json")

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function readQuotes(): Promise<any[]> {
  console.log("Чтение файла заявок:", QUOTES_FILE)
  try {
    await ensureDataDir()
    const data = await fs.readFile(QUOTES_FILE, "utf-8")
    console.log("Прочитанные данные:", data)
    return JSON.parse(data)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("Файл заявок не существует. Создаем новый файл.")
      await writeQuotes([])
      return []
    }
    console.error("Ошибка при чтении файла:", error)
    throw error
  }
}

async function writeQuotes(quotes: any[]) {
  console.log("Запись заявок в файл:", QUOTES_FILE)
  try {
    await ensureDataDir()
    await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2))
    console.log("Заявки успешно записаны в файл")
  } catch (error) {
    console.error("Ошибка при записи файла:", error)
    throw error
  }
}

export async function POST(req: NextRequest) {
  console.log("Получен POST-запрос на /api/quotes")
  try {
    const body = await req.json()
    console.log("Получена новая заявка:", body)
    const quotes = await readQuotes()
    const newQuote = {
      id: Date.now(),
      ...body,
      country: body.country,
      status: "Новая",
      createdAt: new Date().toISOString(),
    }
    quotes.push(newQuote)
    await writeQuotes(quotes)
    console.log("Заявка добавлена:", newQuote)
    return NextResponse.json(newQuote, { status: 201 })
  } catch (error) {
    console.error("Ошибка при обработке заявки:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  console.log("Получен GET-запрос на /api/quotes")
  try {
    const authHeader = req.headers.get("authorization")
    if (authHeader !== "Basic YWRtaW46MTIzNDU2") {
      console.log("Неверная авторизация:", authHeader)
      return new NextResponse("Unauthorized", { status: 401 })
    }

    console.log("Запрос на получение всех заявок")
    const quotes = await readQuotes()
    console.log("Отправляемые заявки:", JSON.stringify(quotes))
    return NextResponse.json(quotes)
  } catch (error) {
    console.error("Ошибка при получении заявок:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

