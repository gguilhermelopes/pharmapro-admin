import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      manufacturerId: string;
    };
  }
) {
  try {
    if (!params.manufacturerId)
      return new NextResponse("Manufacturer ID is required.", {
        status: 400,
      });

    const manufacturer = await prismadb.manufacturer.findUnique({
      where: {
        id: params.manufacturerId,
      },
    });

    return NextResponse.json(manufacturer);
  } catch (error) {
    console.log("[MANUFACTURER_GET]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      manufacturerId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId)
      return new NextResponse("Unauthorized user", {
        status: 401,
      });

    if (!name)
      return new NextResponse("Name is required.", {
        status: 400,
      });

    if (!params.manufacturerId)
      return new NextResponse("Manufacturer ID is required.", {
        status: 400,
      });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const manufacturer = await prismadb.manufacturer.updateMany({
      where: {
        id: params.manufacturerId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(manufacturer);
  } catch (error) {
    console.log("[MANUFACTURER_PATCH]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      manufacturerId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("Unauthorized user", {
        status: 401,
      });

    if (!params.manufacturerId)
      return new NextResponse("Manufacturer ID is required.", {
        status: 400,
      });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const manufacturer = await prismadb.manufacturer.deleteMany({
      where: {
        id: params.manufacturerId,
      },
    });

    return NextResponse.json(manufacturer);
  } catch (error) {
    console.log("[MANUFACTURER_DELETE]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
