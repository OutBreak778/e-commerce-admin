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
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label and Image is Required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Label and Image is Required", { status: 400 });
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
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
  
      const billboard = await prismadb.billboard.findMany({
        where: {
          storeId: params.storeId,
        },
      });
  
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("Error in /api/[storeId]/billboard/route.ts", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  