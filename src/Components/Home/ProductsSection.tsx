import { Separator } from "@radix-ui/react-separator";
import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { getProducts } from "@/services/products.service";
import { IProduct } from "@/interfaces/product.interface";

import { Button } from "@/Components/ui/button";
import Link from "next/link";
import ProductItem from "../Products/ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);
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
        <div className="flex justify-center">
          <Button variant={"destructive"} asChild>
            <Link href="/products">View All Prpducts</Link>
          </Button>
        </div>
        <Separator />
      </div>
    </section>
  );
}
