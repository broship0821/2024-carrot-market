import { notFound } from "next/navigation";

async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 90000));
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const product = await getProduct();
  return <span>Product detail of the profuct {id}</span>;
}
