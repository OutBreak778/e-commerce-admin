import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req: Request, {params}: { params: {sizeId: string}}) {
    try {
  
        if(!params.sizeId) {
            return new NextResponse("Size ID is Required",{status: 401})
        }


        const Size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            },
        })
        
        return NextResponse.json(Size)
        
    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[sizeId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}: { params: {storeId: string,sizeId: string}}) {
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

        if(!params.sizeId) {
            return new NextResponse("Size ID is Required",{status: 401})
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

        const Size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {name, value}
        })
        
        return NextResponse.json(Size)

    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[billboardId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}




export async function DELETE(
    req: Request,
    { params }: { params: { sizeId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.sizeId) {
        return new NextResponse("Size id is required", { status: 400 });
      }
  
      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        }
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const billboard = await prismadb.size.deleteMany({
        where: {
          id: params.sizeId,
        }
      });
    
      return NextResponse.json(billboard);
    } catch (error) {
      console.log('[BILLBOARD_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };


  

// export async function PATCH(
//   req: Request,
//   { params }: { params: { categoryId: string, storeId: string } }
// ) {
//   try {   
//     const { userId } = auth();

//     const body = await req.json();
    
//     const { name, billboardId } = body;
    
//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 403 });
//     }

//     if (!billboardId) {
//       return new NextResponse("Billboard ID is required", { status: 400 });
//     }

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     if (!params.categoryId) {
//       return new NextResponse("Category id is required", { status: 400 });
//     }

//     const storeByUserId = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         userId,
//       }
//     });

//     if (!storeByUserId) {
//       return new NextResponse("Unauthorized", { status: 405 });
//     }

//     const category = await prismadb.category.update({
//       where: {
//         id: params.categoryId,
//       },
//       data: {
//         name,
//         billboardId
//       }
//     });
  
//     return NextResponse.json(category);
//   } catch (error) {
//     console.log('[CATEGORY_PATCH]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };