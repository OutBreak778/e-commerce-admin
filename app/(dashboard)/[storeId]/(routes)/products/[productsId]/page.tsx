import prismadb from "@/lib/prismadb";
import React from "react";
import ProductForm from "./components/ProductsForm";

const ProductPage = async ({
  params,
}: {
  params: { productsId: string; storeId: string };
}) => {
  const Products = await prismadb.product.findUnique({
    where: {
      id: params.productsId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={Products}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
