import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";
import WishlistModel from "@/models/Wishlist";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const { user, product } = body;

    // Validation

    const wish = await WishlistModel.findOne({ user, product });

    if (!wish) {
      await WishlistModel.create({ user, product });
    }

    return Response.json(
      {
        message: "Product added to wishlist successfully :))",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      { message: error },
      {
        status: 500,
      },
    );
  }
}
