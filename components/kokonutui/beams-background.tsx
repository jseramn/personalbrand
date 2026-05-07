import dynamic from "next/dynamic"

const BeamsBackgroundClient = dynamic(
  () => import("@/components/kokonutui/beams-background-client"),
  {
    loading: () => null,
  }
)

export default function BeamsBackground({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <BeamsBackgroundClient />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
