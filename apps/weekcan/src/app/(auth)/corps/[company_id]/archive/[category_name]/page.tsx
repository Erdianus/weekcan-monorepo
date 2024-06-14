export default function Page({
  params,
}: {
  params: { category_name: string };
}) {
  return <>{params.category_name}</>;
}
