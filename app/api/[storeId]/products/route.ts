import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const {
      name,
      price,
      categoryId,
      manufacturerId,
      images,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!categoryId)
      return new NextResponse("Category ID is required", { status: 400 });

    if (!manufacturerId)
      return new NextResponse("Manufacturer ID is required", { status: 400 });

    if (!images || !images.length)
      return new NextResponse("Images are required", { status: 400 });

    if (!price) return new NextResponse("Price is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        manufacturerId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const manufacturerId = searchParams.get("manufacturerId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        manufacturerId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        manufacturer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
