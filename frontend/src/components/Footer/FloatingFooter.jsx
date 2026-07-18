import "./FloatingFooter.css";

function FloatingFooter() {
    return (
        <footer className="floating-footer">

            <div className="footer-section">

                <span className="footer-label">
                    Powered by
                </span>

                <p>
                    Gemini 2.5 Flash • FastAPI • ChromaDB • Neon
                </p>

            </div>

            <div className="footer-center">

                <span className="footer-label">
                    Created by
                </span>

                <h2 className="footer-name">
                    briva
                </h2>

            </div>

            <div className="footer-section">

                <span className="footer-label">
                    Engineered with
                </span>

                <p>
                    JWT • RBAC • BCrypt • Semantic RAG
                </p>

            </div>

        </footer>
    );
}

export default FloatingFooter;