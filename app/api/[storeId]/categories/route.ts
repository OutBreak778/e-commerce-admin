import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = auth();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    const StoreId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!StoreId) {
      return new NextResponse("Unauthorized Access", { status: 403 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("Error in /api/stores/route.ts", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      if (!params.storeId) {
        return new NextResponse("Store ID is Required", { status: 400 });
      }
  
      const billboard = await prismadb.category.findMany({
        where: {
          storeId: params.storeId,
        },
      });
  
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("Error in /api/[storeId]/category/route.ts", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  