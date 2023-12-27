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
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is Required", { status: 400 });
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

    const Size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(Size);
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
        return new NextResponse("Size ID is Required", { status: 400 });
      }
  
      const Size = await prismadb.size.findMany({
        where: {
          storeId: params.storeId,
        },
      });
  
      return NextResponse.json(Size);
    } catch (error) {
      console.log("Error in /api/[storeId]/billboard/route.ts", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  

//   import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs';

// import prismadb from '@/lib/prismadb';
 
// export async function POST(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     const body = await req.json();

//     const { name, value } = body;

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 403 });
//     }

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     if (!value) {
//       return new NextResponse("Value is required", { status: 400 });
//     }

//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const storeByUserId = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         userId
//       }
//     });

//     if (!storeByUserId) {
//       return new NextResponse("Unauthorized", { status: 405 });
//     }

//     const size = await prismadb.size.create({
//       data: {
//         name,
//         value,
//         storeId: params.storeId
//       }
//     });
  
//     return NextResponse.json(size);
//   } catch (error) {
//     console.log('[SIZES_POST]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const sizes = await prismadb.size.findMany({
//       where: {
//         storeId: params.storeId
//       }
//     });
  
//     return NextResponse.json(sizes);
//   } catch (error) {
//     console.log('[SIZES_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };