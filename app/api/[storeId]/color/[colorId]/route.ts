import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req: Request, {params}: { params: {colorId: string}}) {
    try {
  
        if(!params.colorId) {
            return new NextResponse("Color ID is Required",{status: 401})
        }


        const Color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        })
        
        return NextResponse.json(Color)
        
    } catch (error) {
        console.log("Error in api/[storeId]/color/[ColorId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}: { params: {storeId: string,colorId: string}}) {
    try {

        const body = await  req.json()
        const {userId} = auth()
        const {name, value} = body

        if(!userId) {
            return new NextResponse("Unauthorized",{status: 401})
        }
        
        if(!name) {
            return new NextResponse("Name is Required",{status: 400})
        }
        
        if(!value) {
            return new NextResponse("Value is Required",{status: 400})
        }

        if(!params.colorId) {
            return new NextResponse("Color ID is Required",{status: 401})
        }

        const BillboardId = await prismadb.store.findFirst({
            where: {
              id: params.storeId,
              userId,
            },
          });

          if (!BillboardId) {
            return new NextResponse("Unauthorized Access", { status: 403 });
          }

        const Color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {name, value}
        })
        
        return NextResponse.json(Color)

    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[billboardId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}




export async function DELETE(
    req: Request,
    { params }: { params: { colorId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.colorId) {
        return new NextResponse("Color id is required", { status: 400 });
      }
  
      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
        }
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const Color = await prismadb.color.deleteMany({
        where: {
          id: params.colorId,
        }
      });
    
      return NextResponse.json(Color);
    } catch (error) {
      console.log('[BILLBOARD_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };


  