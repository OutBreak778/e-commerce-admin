import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req: Request, {params}: { params: {categoryId: string}}) {
    try {
  
        if(!params.categoryId) {
            return new NextResponse("Category ID is Required",{status: 401})
        }


        const Category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
              billboard: true
            }
        })
        
        return NextResponse.json(Category)
        
    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[billboardId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}: { params: {storeId: string,categoryId: string}}) {
    try {
        const body = await  req.json()
        const {userId} = auth()
        const {name, billboardId} = body

        if(!userId) {
            return new NextResponse("Unauthorized",{status: 401})
        }
        
        if(!name) {
            return new NextResponse("Name is Required",{status: 400})
        }
        
        if(!billboardId) {
            return new NextResponse("Billbord ID is Required",{status: 400})
        }

        if(!params.categoryId) {
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

        const Category = await prismadb.category.update({
            where: {
                id: params.categoryId,
            },
            data: {name, billboardId}
        })
        
        return NextResponse.json(Category)

    } catch (error) {
        console.log("Error in api/[storeId]/billboard/[billboardId]/route.ts",error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}





export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

// import prismadb from "@/lib/prismadb";

// export async function GET(
//   req: Request,
//   { params }: { params: { categoryId: string } }
// ) {
//   try {
//     if (!params.categoryId) {
//       return new NextResponse("Category id is required", { status: 400 });
//     }

//     const category = await prismadb.category.findUnique({
//       where: {
//         id: params.categoryId
//       },
//       include: {
//         billboard: true
//       }
//     });
  
//     return NextResponse.json(category);
//   } catch (error) {
//     console.log('[CATEGORY_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

// export async function DELETE(
//   req: Request,
//   { params }: { params: { categoryId: string, storeId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 403 });
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

//     const category = await prismadb.category.delete({
//       where: {
//         id: params.categoryId,
//       }
//     });
  
//     return NextResponse.json(category);
//   } catch (error) {
//     console.log('[CATEGORY_DELETE]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };


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