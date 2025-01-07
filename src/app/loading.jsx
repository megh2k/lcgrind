"use client";

export default async function Loading() {
  const { helix } = await import("ldrs");
  helix.register();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <l-helix color="coral">
      </l-helix>
    </div>
  );
}
