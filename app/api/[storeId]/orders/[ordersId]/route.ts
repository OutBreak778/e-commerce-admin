import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req: Request, {params}: { params: {billboardId: string}}) {
    try {
  
        if(!params.billboardId) {
            return new NextResponse("Billboard ID is Required",{status: 401})
        }


        const billboard = await prismadb.store.findUnique({
            where: {
                id: params.billboardId,
            },
        })
        
        return NextResponse.json(billboard)
        
    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[billboardId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}: { params: {storeId: string,billboardId: string}}) {
    try {

        const body = await  req.json()
        const {userId} = auth()
        const {label, imageUrl} = body

        if(!userId) {
            return new NextResponse("Unauthorized",{status: 401})
        }
        
        if(!label) {
            return new NextResponse("Name is Required",{status: 400})
        }
        
        if(!imageUrl) {
            return new NextResponse("Label is Required",{status: 400})
        }

        if(!params.billboardId) {
            return new NextResponse("Billboard ID is Required",{status: 401})
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {label, imageUrl}
        })
        
        return NextResponse.json(billboard)

    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[billboardId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}




export async function DELETE(
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.billboardId) {
        return new NextResponse("Billboard id is required", { status: 400 });
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
  
      const billboard = await prismadb.billboard.delete({
        where: {
          id: params.billboardId,
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