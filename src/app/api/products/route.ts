import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";
import ProductModel from "@/models/Product";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 },
    );
  } catch (err) {
    return new Response("Internal Server Error !!", { status: 500 });
  }
}

export async function GET() {
  const products = await ProductModel.find({}, "-__v").populate("comments")
  return Response.json(products)
}
