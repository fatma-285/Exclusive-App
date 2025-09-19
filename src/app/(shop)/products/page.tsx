import React from "react";
import { getProducts } from "../../../services/products.service";
import { IProduct } from "../../../interfaces/product.interface";
import SectionTitle from "../../../components/shared/SectionTitle";
import ProductItem from "../../../components/Products/ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <SectionTitle title="Our Products" subTitle="Explore Our Products" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {products &&
            products.map((product: IProduct) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
