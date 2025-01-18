export default function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  return <span>Product detail of the profuct {id}</span>;
}
