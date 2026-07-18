import { useEffect, useRef } from "react";

export default function GridScan() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrame;

        const mouse = {
            x: width / 2,
            y: height / 2,
            tx: width / 2,
            ty: height / 2,
        };

        const resize = () => {
            width = window.innerWidth;

            height = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight,
                window.innerHeight
            );

            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resize();

        window.addEventListener("resize", resize);

        window.addEventListener("mousemove", (e) => {
            mouse.tx = e.clientX;
            mouse.ty = e.clientY;
        });

        const spacing = 40;
        const radius = 180;

        function draw() {
            animationFrame = requestAnimationFrame(draw);

            mouse.x += (mouse.tx - mouse.x) * 0.12;
            mouse.y += (mouse.ty - mouse.y) * 0.12;

            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "#fbfbfa";
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = "rgba(0,0,0,0.12)";
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x <= width; x += spacing) {
                ctx.beginPath();

                for (let y = 0; y <= height; y += 8) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let offset = 0;

                    if (dist < radius) {
                        offset =
                            Math.sin((radius - dist) / 25) *
                            ((radius - dist) / radius) *
                            18;
                    }

                    if (y === 0)
                        ctx.moveTo(x + (dx > 0 ? offset : -offset), y);
                    else
                        ctx.lineTo(x + (dx > 0 ? offset : -offset), y);
                }

                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y <= height; y += spacing) {
                ctx.beginPath();

                for (let x = 0; x <= width; x += 8) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let offset = 0;

                    if (dist < radius) {
                        offset =
                            Math.sin((radius - dist) / 25) *
                            ((radius - dist) / radius) *
                            18;
                    }

                    if (x === 0)
                        ctx.moveTo(x, y + (dy > 0 ? offset : -offset));
                    else
                        ctx.lineTo(x, y + (dy > 0 ? offset : -offset));
                }

                ctx.stroke();
            }
        }

        draw();
        window.addEventListener("scroll", resize);
        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />
    );
}