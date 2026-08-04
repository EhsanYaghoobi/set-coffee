import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { username, score, email, body, productID } = reqBody;
    console.log(reqBody);
    // Validation

    const comment = await CommentModel.create({
      username,
      score,
      email,
      body,
      productID,
    });

    await ProductModel.findOneAndUpdate(
      { _id: productID },
      {
        $push: {
          comments: comment._id,
        },
      },
    );

    return Response.json(
      {
        message: "Comment created successfully :))",
        data: comment,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    return Response.json(
      { message: "Internal Server Error !!" },
      { status: 500 },
    );
  }
}
export async function GET() {
  const comments = await CommentModel.find({}, "-__v");
  return Response.json(comments);
}
