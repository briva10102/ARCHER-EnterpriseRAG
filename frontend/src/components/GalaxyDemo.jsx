import Galaxy from "./Galaxy";

export default function GalaxyDemo() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "auto",
            }}
        >
            <Galaxy
                density={2}          // was 0.55
                glowIntensity={0.1}   // was 0.08
                saturation={0}
                hueShift={9}
                twinkleIntensity={0.2} // was 0.08
                rotationSpeed={0.05}   // was 0.04
                repulsionStrength={10}  // was 1
                starSpeed={0.45}       // was 0.18
                speed={1}            // was 0.25
            />
        </div>
    );
}