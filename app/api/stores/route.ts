import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const body = await req.json()
        const {userId} = auth()
        const {name} = body


        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!name) {
            return new NextResponse("Name is Required", {status: 400})
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log("Error in /api/stores/route.ts",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

