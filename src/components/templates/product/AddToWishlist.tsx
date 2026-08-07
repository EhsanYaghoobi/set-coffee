"use client";
import { IProduct } from "@/models/Product";
import { errorAlert, successAlert } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

interface User {
  _id: string;
}

function AddToWishlist({ productID }: IProduct) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser({ ...data });
      }
    };

    authUser();
  }, []);

  const addToWishlist = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!user?._id) {
      return errorAlert("ابتدا لاگین کنید");
    }

    const wish = {
      user: user._id,
      product: productID,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    if (res.status === 201) {
      successAlert("محصول به علاقه مندی ها اضافه شد", "باشه");
    }
  };

  return (
    <div onClick={addToWishlist}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishlist;
